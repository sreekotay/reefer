// ===================================================================================
//
//  coral.q() .... function (selector) || (elem, selector) || (array)
//       .f() .... function (dotpath) || (dotpath, setvalue) || (func, 'dotpath')
//       .o   .... property - alias to first item
// ===================================================================================

(function () {
  var xs = window.coral = window.coral || {}

  // ====================================
  // ==================================== dot --- dotpath
  // ====================================
  function dot (obj, spl) {
    if (typeof (spl) === 'string') spl = spl.split('.')
    var ctx = obj; var l = spl.length; var key
    for (var i = 0; i < l && (obj !== undefined || !i); i++) {
      key = spl[i]; ctx = obj
      obj = (obj && key in obj) ? obj[key] : undefined
    }
    var ret = { value: obj, prop: key, obj: ctx }
    return (i === l) ? ret : { last: ret }
  }
  xs_dot = dot

  // ====================================
  // ==================================== q --- query
  // ====================================
  var limited = /^(#?[\w-]+|\.[\w-.]+)$/
  var dotspace = /\./g
  var slice = [].slice
  xs.q = function (ctx, selector) {
    var a
    if (typeof (ctx) === 'object' && !(ctx instanceof Node)) a = ctx
    else {
      if (!selector) { selector = ctx; ctx = document }
      if (limited.test(selector)) {
        switch (selector[0]) {
          case '#': a = [document.getElementById(selector.substr(1))]; break
          case '.': a = slice.call(ctx.getElementsByClassName(selector.substr(1).replace(dotspace, ' '))); break
          default: a = slice.call(ctx.getElementsByTagName(selector))
        }
      } else a = slice.call(ctx.querySelectorAll(selector))
    }
    a.f = _xsf
    Object.defineProperty(a, 'o', { get: function () { return a[0] } })
    return a
  }

  // ====================================
  // ==================================== .f () --- function
  // ====================================
  function isfunction (obj) { return !!(obj && obj.constructor && obj.call && obj.apply) }
  function _xsf (path, value) {
    var arr = this; var spl
    if (arguments.length === 1) {
      if (typeof (path) !== 'string') throw ('path must be a string')
      spl = path.split('.')
      return function () {
        var arg = arguments
        var al = arr.length
        var aout = []
        for (var i = 0; i < al; i++) {
          var v = dot(arr[i], spl)
          if (isfunction(v.value)) aout.push(v.value.apply(v.obj, arg))
          else if (arg.length > 0 && v.obj) aout.push(v.obj[v.prop] = arg[0]) // assign (=) is intentional
          else aout.push(v.value)
        }
        return aout
      }
    } else if (isfunction(path)) {
      if (typeof (value) !== 'string') throw ('value must be the path')
      var f = path; path = value
      spl = path.split('.')
      return function () {
        var al = arr.length
        for (var i = 0; i < al; i++) {
          var v = dot(arr[i], spl)
          if (v.value && typeof (v.value) === 'object') f.apply(v.value, arguments)
        }
        return arr
      }
    } else {
      spl = path.split('.')
      var al = arr.length
      for (var i = 0; i < al; i++) {
        var v = dot(arr[i], spl)
        if (v.obj) v.obj[v.prop] = value
      }
    }
    return this
  }

  // ====================================
  // ==================================== .tweens
  // ====================================
  var tweens = {
    linear: 't',
    quad: 't*t',
    cube: 't*t*t',
    quart: 't*t*t*t',
    quint: 't*t*t*t*t',
    sin: '-Math.cos(t*Math.PI/2)+1',
    expo: 'Math.pow(2,10*(t/d-1))',
    circ: '-(Math.sqrt(1-t*t)-1)'
  }

  function gentweener (f) {
    var t = {}
    t.in = 'return ' + f
    t.out = 't=1-t;' + 'return 1-(' + f + ')'
    t.inout = 't*=2;if(t<1) return 0.5*(' + f + '); t-=2; return 1-0.5*Math.abs(' + f + ')'
    for (var k in t) t[k] = new Function('t', t[k])
    return t
  }

  (function () { for (var t in tweens) tweens[t] = gentweener(tweens[t]) })()

  // ====================================
  // ==================================== .T --- new T()
  // ====================================
  function Tweener (start, end, duration, tween, cb) {
    this.t1 = Date.now()
    this.d = duration
    this.b = start
    this.c = (end - start)
    this.tween = tween
    this.cb = cb
    this.done = false
  }
  Tweener.prototype.reset = function () {
    this.t1 = Date.now()
    this.done = false
  }
  Tweener.prototype.get = function () {
    var t2 = Date.now()
    var t = (t2 - this.t1) / this.d
    if (t > 1) {
      switch (this.type) {
        case 'repeat': t = t % 1; break
        case 'loop': t = t % 2; if (t > 1) t = 2 - t; break
        default: t = 1; break
      }
    }
    this.v = (t < 1 ? this.tween(t) : 1) * this.c + this.b
    return this.v
  }
  xs.tweens = tweens
  xs.T = Tweener

  xs.apply = function (o) { for (var k in o) if (this[k] !== o[k]) this[k] = o[k] }
})()
