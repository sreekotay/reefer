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
})()
