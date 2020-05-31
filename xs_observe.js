;(function () {
  function deepObserver (obj, handler, ctxobj, path) {
    if (obj instanceof Node) return
    if (!obj && this.__xs__) obj = this // called via obj.__observe__()
    if (!obj) return
    var sendAdd = !!obj.__xs__

    // only one watcher
    if (ctxobj) {
      path = (path && path.concat()) || []
      path.push(ctxobj)
    }
    handler = attach(handler, obj, path)

    // do the work
    var isArray = Array.isArray(obj)
    var _obj = values(obj)
    var v = _obj.v
    for (var p in v) {
      if (p in obj) continue
      delete v[p]
      trigger('delete', obj, p, null, null)
    }
    for (p in obj) {
      if (sendAdd && !(p in v)) trigger('add', obj, p, obj[p], null)
      propertyObserver(obj, p, handler, path)
    }

    if (isArray) arrayObserverHelper(obj, handler)
    if (!obj.__observe__ && path === undefined && ctxobj === undefined) privateprop(obj, '__observe__', deepObserver)
    return obj
  }

  function deepUnobserver (obj, handler) {
    if (!obj.__xs__) return
    var h = obj.__xs__.h
    for (var i = h.length - 1; i >= 0; i--) {
      var ha = h[i]
      if (ha.f === handler) {
        h.splice(i, 1)
      }
    }
    for (var p in obj) if (typeof (p) === 'object' && p !== null) deepUnobserver(p[obj], handler)
  }

  function arrayObserverHelper (arr, handler) {
    if (arr.__xs__.arrhelpers) return
    arr.__xs__.arrhelpers = true
    var mbind = function (method) {
      var f = Array.prototype[method]
      var mf = function () {
        var o = this
        var _o = o.__xs__
        _o.pause = true
        var n = f.apply(o, arguments)
        _o.pause = false
        trigger(method, o, arguments, o, null)
        debounceObserve(_o.s, o, deepObserver)
        return n
      }
      privateprop(arr, method, mf)
    }
    var m = ['pop', 'push', 'shift', 'unshift', 'splice', 'reverse', 'sort']
    for (var i = 0; i < m.length; i++) mbind(m[i])
  }

  var __gidcounter = 0
  function values (obj) {
    if (!obj.__xs__) {
      var _w = {
        s: '@' + __gidcounter++,
        v: {} /*, // values for the object
        p: {}, // array of property symbols
        h: [] // handlers */ // but don't allocate them if not needed
      }
      privateprop(obj, '__xs__', _w)
    }
    return obj.__xs__
  }

  function propertyObserver (obj, p, handler, path) {
    var _obj = values(obj)
    var v = _obj.v
    if (handler !== obj) handler = attach(handler, obj)
    var pv = obj[p]
    if (!(p in v)) { // already done
      v[p] = pv
      var gf = function () { return v[p] }
      var sf = function (n) {
        var o = v[p]; v[p] = n
        // if (typeof (n) === 'object' && n!==null && !n.__xs__) deepObserver(n, handler, { o: obj, p: p }, path) // observer it
        if (typeof (n) === 'object' && n !== null && !n.__xs__) { debounceObserve(_obj.s, obj, function () { deepObserver(n, handler, { o: obj, p: p }, path) }) }
        trigger('set', obj, p, n, o)
        return n
      }
      // if (delete obj[p])
      { Object.defineProperty(obj, p, { get: gf, set: sf, enumerable: true, configurable: true }) }
    }
    if (typeof (pv) === 'object') deepObserver(pv, handler, { o: obj, p: p }, path)
  }

  var __ghsymbol = 0
  function attach (handler, obj, path) {
    if (!handler) return obj
    var sym = obj
    if (typeof (handler) === 'object') {
      if (handler === sym) return sym
      handler = values(handler).h
      if (!handler) return obj // throw new Error('unrecognized event symbol')
    } else if (!Array.isArray(handler)) { handler = [{ rootobj: obj, f: handler, path: path, s: '#' + __ghsymbol++ }] }

    var h = values(obj).h
    if (!h) { h = values(obj).h = [] }
    handlerMerge(h, handler, path)
    return obj
  }

  function handlerMerge (a, b, path) { // modifies original array
    if (a === b) return
    var dotpath = (path && path.reduce(function (p, n) { return p + (p && '.') + n.p }, '')) || ''
    for (var i = 0; i < b.length; i++) {
      var bs = b[i].s
      if (!a[bs]) {
        a[bs] = true
        a.push({ f: b[i].f, s: b[i].s, path: path, dotpath: dotpath })
      }
    }
  }

  function chainfind (upd, obj) { // for events
    if (obj == upd.obj) return upd.prop
    var uc = upd.chain
    for (var i = 0; i < uc.length; i++) if (uc[i].o === obj) return uc[i].p
    return null
  }

  function trigger (action, obj, p, n, o) {
    var _obj = obj.__xs__
    if (/* n === o || */!_obj || !_obj.h || _obj.pause) return // don't send event if value the same
    var h = _obj.h
    for (var i = 0; i < h.length; i++) {
      var ha = h[i]
      var upd = { rootobj: ha.rootobj, obj: obj, action: action, prop: p, value: n, prev: o, chain: ha.path, path: ha.dotpath ? ha.dotpath + '.' + p : undefined, find: chainfind }
      ha.f.call(obj, upd)
    }
  }

  function alias (obsobj, obsp, refobj, refp, listener) {
    var reflect = function (updates) {
      if (updates.chain && updates.chain.length && updates.chain[0].p === refp) {
        if (updates.chain.length === 1 && obsobj[obsp] !== updates.obj) obsobj[obsp] = updates.obj
        updates.chain[0].p = obsp // alias it
        listener(updates)
        updates.chain[0].p = refp // set it back
      } else if (!updates.chain && updates.prop === refp) {
        if (updates.value !== obsobj[obsp]) { obsobj[obsp] = updates.value }
        updates.prop = obsp // alias it
        listener(updates)
        updates.prop = refp
      }
    }
    if (refobj instanceof Node) {
      if (!(obsp in obsobj)) obsobj[obsp] = obsobj[obsp] // "realize" it
      if (!obsobj.__observer__) xs.observe(obsobj)
      var objpd = Object.getOwnPropertyDescriptor(obsobj, obsp)

      // if (delete obsobj[obsp])
      {
        Object.defineProperty(obsobj, obsp, {
          get: function () { return refobj[refp] },
          set: function (v) { refobj[refp] = v; return objpd.set(v) },
          enumerable: true,
          configurable: true })
      }
      return null
    }
    if (!(refp in refobj)) refobj[refp] = refobj[refp] // "realize" it
    xs.observe(refobj, reflect)
    obsobj[obsp] = refobj[refp] // copy the initial
    xs.observe(obsobj)

    // below makes it two way
    var refpd = Object.getOwnPropertyDescriptor(refobj, refp)
    var gf = refpd.get
    var sf = refpd.set
    // if (delete obsobj[obsp])
    { Object.defineProperty(obsobj, obsp, { get: gf, set: sf, enumerable: true, configurable: true }) }

    return reflect
  }

  // ==============
  // helper stuff
  // ==============
  function objmerge (a, b) {
    if (b === undefined) return a
    if (typeof (b) !== 'object' || b === null) return b
    var obtype = Object.prototype.toString.call(b)
    if (obtype === '[object RegExp]' || obtype === '[object Date]' || b instanceof Node) return b
    if (obtype === '[object Array]') {
      if (Object.prototype.toString.call(a) !== '[object Array]') a = [] // should we FORCE to array?
      var c = []
      for (var i in b) { if (!(i in a)) c[i] = b[i] }
      for (i in c) a[i] = c[i]
      return a
    }
    if (typeof (a) !== 'object') a = {}
    for (var k in b) a[k] = objmerge(a[k], b[k])
    return a
  }
  function objassign () { var a = arguments; var al = 0; var o = a[0]; while (++al < a.length) o = objmerge(o, a[al]); return o }
  function objclone () { var a = arguments; var al = -1; var o = {}; while (++al < a.length) o = objmerge(o, a[al]); return o }
  function privateprop (o, k, v, writable) { Object.defineProperty(o, k, { value: v, enumerable: false, configurable: true, writable: !!writable }) }

  var __gobt; var __gob = {}
  function resolveObserve () {
    __gobt = null; var gob = __gob; __gob = {}
    for (var k in gob) { if (gob[k]) gob[k].f.call(gob[k].o, gob[k].o) }
  }
  function debounceObserve (_s, o, f, delay) {
    // f.call(o, o); return true;
    if (__gobt) {
      if (!(_s in __gob) && !delay) {
        f.call(o, o)
        __gob[_s] = null
      } else __gob[_s] = { f: f, o: o }
      return false
    }
    if (!delay) f.call(o, o)
    else __gob[_s] = { f: f, o: o }
    __gobt = setTimeout(resolveObserve, 0)
    return true
  }

  // export
  var exp = window
  exp.xs = exp.xs || {}
  exp.xs.observe = deepObserver
  exp.xs.unobserve = deepUnobserver
  exp.xs.alias = alias
  exp.xs.assign = objassign
  exp.xs.clone = objclone
  exp.xs.debounce = debounceObserve
  exp.xs.privateprop = privateprop
}).call(this)
