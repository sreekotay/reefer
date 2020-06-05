var legacy = !document.currentScript
var rf_script = null
window.reeferHTML = function (data) {
  function isfunction (obj) { return !!(obj && obj.constructor && obj.call && obj.apply) }
  if (isfunction(data)) data = data.toString().split('\n').slice(1, -1).join('\n')
  var dsc = legacy ? null : document.currentScript
  if (!dsc) dsc = rf_script
  if (!dsc) { // IE11 support
    dsc = document.getElementsByTagName('script')
    dsc = dsc[dsc.length - 1]
  }
  rf_script = null
  var cb = dsc.reefCB
  if (cb === undefined) dsc.outerHTML = data
  else cb(data)
  if (dsc.parentNode) dsc.parentNode.removeChild(dsc)
}

ReeferFactory = function (opts) {
  opts = opts || {}
  var rf_counter = 0 // used for 'symbol'
  var rf_listeners = {}
  var rf_key = 0
  const rf_registry = {
    '': {
      template: function () {
        var slots = this.slots || {}
        if (!slots.default) return// 'done'
        if (!this.data.datasrc) return 'done'
        var _d = this.data
        var dc = ('datactx' in _d) ? this.dot(_d.datactx).value : {}
        var dl = ('datasrc' in _d) ? this.dot(_d.datasrc).value : this
        var gk = this.data.genkey
        var gen = (dl && slots[_d.dataslot || 'default']) || (slots.empty && slots.empty.text) || { text: '<div> </div>' }
        var key = _d.datakey; var uk
        if (!Array.isArray(dl)) dl = [dl]
        if (slots.header) this.html(-1, slots.header.script ? slots.header(dc) : slots.header.text)
        var hm = this.__.hmap || {}
        dc.__hmap__ = hm
        for (var i = 0; i < dl.length; i++) {
          var t = typeof (dl[i])
          if (dl[i]) uk = key === undefined ? dl[i].__key__ : dl[i][key]
          if (gk && uk === undefined && t === 'object') uk = xs.privateprop(dl[i], '__key__', 'k' + rf_key++)
          var row = gen.script ? gen.script(dl[i], i, dc) : gen.text
          this.html(uk || i, row)
        }
        delete dc.__hmap__
        if (slots.footer) this.html(-2, slots.footer.script ? slots.footer(dc) : slots.footer.text)
      }
    }
  }

  function reefWarn () { console.error(arguments) }
  function reefError () { console.error(arguments); throw Error('REEF FAULT') }
  function alwaysobj (rf, n) { rf[n] = rf[n] || {}; return rf[n] }

  // ===========
  // dom
  // ===========
  function run (arg) {
    var d = (arg || document)
    var r = []
    var rels = d.querySelectorAll(':not([reef-stage])[reef]')
    for (var i = 0; i < rels.length; i++) {
      if (!rels[i].reef) {
        var rr = reeferDOM(rels[i], d.reef)
        publishLF(rr, 'mount')
        if (rr) rr.render_()
        r.push(rr)
      }
    }
    return r
  }

  function reeferDOM (el, parentReef) {
    if (!el) return null
    var reefName = el.getAttribute('reef')
    try {
      var attrBag = getAttributes(el)
      var cloneEl = el.cloneNode(true) // deep copy
      if (cloneEl) {
        attrBag = attrBag || {}
        if (cloneEl.children) {
          for (var i = 0; i < cloneEl.children.length; i++) {
            var slots = alwaysobj(attrBag, 'slots')
            var c = cloneEl.children[i]
            var ga = c.getAttribute
            var attr = (ga && ga.call(c, 'reef-slot')) || 'default'
            var sa = slots[attr] = slots[attr] || []
            sa.push(c)
            sa.text = (sa.text || '') + (ga ? c.outerHTML : c.data) // convenience
            if (c.nodeName === 'SCRIPT' && c.type.indexOf('reef-') === 0) {
              try {
                var type = c.getAttribute('type')
                var args = type.match(/\(([^)]*)\)/); args = args ? args[1] : ''
                var ftext = c.innerHTML.trim()
                if (ftext) {
                  switch (type.split('(')[0].trim()) {
                    case 'reef-function': c.reefScript = new Function(args, ftext); break
                    case 'reef-template': c.reefScript = templateEngine(args, ftext); break
                    default: reefWarn('unknown reef slot type')
                  }
                }
              } catch (err) { reefWarn('reef-slot script parsing ERROR:', ftext || c.type, c, err) }
              if (!('el' in sa)) sa.el = c // convenience
              if (!('script' in sa) && c.reefScript) sa.script = c.reefScript // convenience
            }
          }
        }
      }

      return mount(el, reefName, attrBag, parentReef)
    } catch (err) {
      reefWarn('Reefer failed to mount: ', reefName, el, err)
    }
    return null
  }

  function publishLF (reef, lf) {
    return reef.lifecycle && reef.lifecycle(lf)
  }
  /*
  function parseArgs (str) {
    var argsets = str.match(/\(([^)]*)\)/)
    return (argsets && argsets[1]) || ''
  }
*/
  function getAttributes (el) {
    var attrBag
    var attrlist = el.attributes
    for (var i = 0; i < attrlist.length; i++) {
      var attr = attrlist[i]
      var n = attr.name + ''
      if (n.indexOf('reef-p') === 0) {
        attrBag = attrBag || { }
        var val = attr.value
        var spl = n[6] // whatever the character is... use two of those to split - 6 is len of 'reef-p'
        var ev = val.split(spl + spl); val = ev[0]; ev = ev[1]
        var p = n.substring(7) // 7 is len of 'reef-pX' (note the 'X')
        var d = determineDataBinding(p, val)
        try { val = JSON.parse(val) } catch (err) {}
        if (!d) alwaysobj(attrBag, 'props')[p] = val; else alwaysobj(attrBag, 'bind')[p] = d
        if (ev) alwaysobj(attrBag, 'events')[p] = ev
      } else if (n.indexOf('reef@') === 0) {
        var lis = n.substring(5)
        attrBag = attrBag || { }
        alwaysobj(attrBag, 'listeners')[lis] = attr.value
      }
    }
    return attrBag
  }

  function determineDataBinding (k, v) {
    if (v[0] !== '~') return false
    var s = v.split('~')
    return { prop: s[1], selector: (s.length < 2) ? '^' : s[2] }
  }

  function templateGenerator (args, templateString) {
    return new Function(args, 'return `' + templateString + '`;')
  }

  function templateGeneratorES5 (args, templateString) {
    templateString = templateString.split('\n').join('\\\n').replace(/"/g, '\\"') // multiline and escape double quotes and slashes
    return new Function(args, 'var f=function (_, exp) {return eval(exp)}; f.bind(this); return "' + templateString + '".replace(/\\${(.*?)}/g, f)')
  }

  function mount (el, name, localData, parentReef) {
    localData = localData || {}
    if (!rf_registry[name]) reefError('Reefer NOT registered: ', name)

    // make Reefer
    var defaultData = rf_registry[name]
    var reef = el.reef = new opts.use(el, defaultData, localData)
    reef.name = name
    el.setAttribute('reef-stage', 'mounted')

    // register listeners
    if (reef.listeners) {
      var rl = reef.listeners
      for (var k in rl) {
        var ev = k.split('@')
        var e = ev[0]
        if (!rf_listeners[e]) { // we only need to add it once
          rf_listeners[e] = listenerFactory(e)
          document.addEventListener(e, rf_listeners[e], false)
        }
        rl[e] = rl[k]
        if (rl[ev[1]] === 'stop') rl[e].reefStop = true
      }
      reef.listeners = null // keep the tag so we know we had listeners - but they are source from the registry
    }

    return reef
  }

  function listenerFactory (type) {
    return function (event) {
      var el = (event.detail && event.detail.reefEmitRootEl) || event.target; var rr
      var evattr = 'reef@' + type
      var handlers = []
      while (el) {
        var evvalue = el.getAttribute && el.getAttribute(evattr)
        if (evvalue) { evvalue = evvalue.split('@'); handlers.push(evvalue) }
        var reef = el.reef
        if (!event.reef) event.reef = reef
        if (reef && handlers.length) { // parse the handler for the event
          for (var i = 0; i < handlers.length; i++) {
            var ev = handlers[i]
            var fn = ev[0].trim()
            /*
            var func = function (event) { eval(fn) }
            try { func.call(reef, event) } catch (err) { reefWarn('reef@Error') }
            /* // old syntax - you do do prop(value)
            */
            var parseArgs = function (str) {
              var argsets = str.match(/\(([^)]*)\)/)
              return (argsets && argsets[1]) || ''
            }
            var args = parseArgs(fn).split(',')
            if (args) {
              fn = fn.split('(')[0]
              var idx = args.indexOf('$event') // allow substition
              if (idx >= 0) args[idx] = event
            }
            var f = reef.dot(fn); var rval
            if (f.value !== undefined) {
              if (isfunction(f.value)) rval = f.value.apply(f.obj, args || [event])
              else reef.dot(fn, args[0])
              if (rval === 'stop' || ev[1] === 'stop') return
            }
          }
        }
        var rn = reef && reef.name
        if (rf_registry[rn]) {
          rr = rf_registry[rn]
          if (rr.listeners && rr.listeners[type]) {
            if (rr.listeners[type].call(reef, event) === 'stop' || rr.listeners[type].reefStop) { return } // hmm - should we support bubbling?
          }
        }
        el = el.parentNode
      }
    }
  }

  function register (inname, reefData, superReef) {
    var name = (inname[0] === '*') ? inname.substring(1) : inname
    superReef = superReef || ''
    reefData.data = arrtoobj(reefData.data, undefined)
    if (rf_registry[name]) { if (inname === name) reefError('Reefer already registered: ' + name); return }
    if (!rf_registry[superReef]) reefError('Super Reef NOT registered: ' + superReef)
    rf_registry[name] = xs.assign({}, rf_registry[superReef], reefData)
    rf_registry[name].name = name
    rf_registry[name].super = superReef
    return true
  }

  // ===========
  // Reefer - helpers
  // ===========
  function resolveEl (el, ctx) { if (typeof (el) !== 'string') return el; return resolveEl(ctx || document).querySelector(el) }
  function isfunction (obj) { return !!(obj && obj.constructor && obj.call && obj.apply) }
  function arrtoobj (arr, v) { if (!Array.isArray(arr)) return arr; var o = {}; for (var i = 0; i < arr.length; i++) o[arr[i]] = (arguments.length <= 1 ? true : v); return o }
  function cif (o, props, o1, o2) {
    for (var i = 0; i < props.length; i++) {
      var p = props[i]
      var np = (p in o2) ? o2[p] : o1[p]
      if (np === undefined) continue
      o[p] = xs.clone(o1[p], o2[p])
    }
  }

  // =============
  // Reefer - constructor
  // =============
  function Reefer (rootEl, setup, localSetup) {
    setup = setup || {}
    localSetup = localSetup || {}
    var rf = this
    var _ = this.__ = {}
    cif(_, ['template', 'update', 'bind'], setup, localSetup)
    cif(this, ['methods', 'observers', 'listeners', 'mutate', 'lifecycle'], setup, localSetup) // intentional shallow copies
    if ('shared' in setup) this.shared = setup.shared
    if (setup.events || localSetup.events) _.events = xs.assign({}, arrtoobj(setup.events), localSetup.events)
    if (setup.decorators || localSetup.decorators) _.decorators = xs.assign({}, arrtoobj(setup.decorators), arrtoobj(localSetup.decorators))
    if (setup.slots || localSetup.slots) xs.assign(alwaysobj(this, 'slots'), setup.slots, localSetup.slots)
    if ('super' in setup) this.super = rf_registry[setup.super]

    var sh = this.methods; if (sh) for (var k in sh) sh[k] = isfunction(sh[k]) ? sh[k].bind(rf) : sh[k] // bind to reef
    // sh = this.observers; if (sh) for (k in sh) sh[k] = isfunction(sh[k]) ? sh[k].bind(rf) : sh[k] // bind to reef
    this.rootEl = rootEl
    _.obsf = function () { Reefer.prototype.react.apply(rf, arguments) }
    var _d = this.data = xs.observe({}, _.obsf) // public as well -- our main "react" core
    xs.assign(_d, _.decorators, setup.data, localSetup.props) // make our data
    for (k in this.observers) if (!(k in _d)) _d[k] = undefined
    for (k in _.bind) doDataBind(this, 'data.' + k, _.bind[k].selector, _.bind[k].prop)
    _d.__observe__() // trigger observers
    this.sym = '$' + rf_counter++
    return this
  }
  Reefer.prototype.unmount = function () {
    publishLF(this, 'umnount')
    var _ = this.__ || {}
    xs.unobserve(this.data, _.obsf)
    if (_.bind) {
      for (var k in _.bind) {
        var b = _.bind[k]
        if (b.obsf) xs.unobserve(b.sp.obj, b.obsf)
      }
    }
  }

  function regexprep (o) { var s = ''; for (var k in o) { s += ':xs:' + k + '\n' }; return s }

  // =============
  // react
  // =============
  Reefer.prototype.react = function (updates) { // core event engine
    // if (updates.value === updates.prev) return
    updates.reef = this
    var _ = this.__
    var status
    var p = updates.root = updates.path ? updates.path.split('.')[0] : updates.prop
    var _obs = this.observers
    if (_obs) {
      _.obsrx = _.obsrx || regexprep(_obs)
      if (updates.path) {
        var str = '(:xs:((' + updates.path.replace(/\./g, '\\.)|(\\*\\.))*((') + ')|(\\*)))\n'
        var regx = new RegExp(str, 'g')
        var m = _.obsrx.match(regx)
        if (m) {
          var mp = m[0]
          for (var i = 1; i < m.length; i++) if (m[i].length > mp.length) mp = m[i]
          p = mp.substring(4, mp.length - 1) // skipe the ':xs:
        }
      }
      var op = _obs[p]
      if (op) {
        if (isfunction(op)) status = op.call(this, updates)
        else {
          if (!updates.path && (updates.action === 'set' || updates.action === 'add')) {
            var o = this.dot(op)
            if (isfunction(o.value)) o.value.call(this)
            else o.obj[o.prop] = updates.value
          }
        }
      }
    }
    var _ev = _.events
    if (_ev && _ev[p]) {
      var e = _.name + '.' + (_ev[p] === true ? p : _ev[p])
      emit(this.rootEl, e, updates)
    }

    var mstatus
    if (updates.value === updates.prev) return
    if (this.mutate) mstatus = this.mutate.call(this, updates)
    var _d = _.decorators
    if (!this.sym) return // we are still constructing
    if (status !== 'done' && mstatus !== 'done' && (!_d || (!_d[p] && !_d[mp]))) this.rerender() // re-render
  }
  Reefer.prototype.observe = function (k, cb) { var _o = alwaysobj(this, 'observers'); _o[k] = cb; this.__.obsrx = null }
  Reefer.prototype.decorate = function (k, set) { var _d = alwaysobj(this, 'decorators'); _d[k] = (set !== false && set !== 0) }
  Reefer.prototype.events = function (k, set) { var _e = alwaysobj(this.__, 'events'); _e[k] = (set !== false && set !== 0 && set); this.__.evrx = null }
  Reefer.prototype.watch = function (k, o) { this.data[k] = o; this.data.__observe__() }
  Reefer.prototype.bind = function (k, sel, copyk, ctx) { doDataBind(this, k, sel, copyk, ctx) }
  Reefer.prototype.emit = function (ev, detail) { emit(this.rootEl, ev, detail) }
  function loadData (datapath, url, opts) { // this must be Reefer
    var rf = this
    opts = opts || {}
    var rf = this
    var xhr = opts.xhr || new XMLHttpRequest()
    /* if (!opts.xhr || opts.responseType) // either it's new or it's passed in
    { xhr.responseType = opts.responseType || 'json' } */
    xhr.onerror = function (err) { console.log('REEF HTTP LOAD', err); emit(rf.rootEl, 'reefLoadDataFail', { url: url }) }
    xhr.onload = function (ev) {
      if (this.status === 200) {
        var res = this.response
        try { res = JSON.parse(res) } catch (err) {}
        rf.dot(datapath, res)
      } else if (this.status) xhr.onerror(ev)
    }
    xhr.open(opts.method || 'GET', url, true)
    xhr.send(null)
    return xhr
  }
  function loadHTML (datapath, url) { // this must be Reefer
    var rf = this
    if (document.readyState !== 'loading') {
      var script = document.createElement('script')
      script.src = url
      document.getElementsByTagName('head')[0].appendChild(script)
    } else {
      document.write('<script src="' + url + '"></script')
      script = document.getElementsByTagName('script')
      script = script[script.length - 1]
    }
    script.onerror = function (err) { console.log('REEF SCRIPT LOAD', err); script.parentNode.removeChild(script); emit(rf.rootEl, 'reefLoadHTMLFail', { url: url }) }
    script.reefCB = function (data) { rf.dot(datapath, data) }
    rf_script = script
    return script
  }

  function realizeSource (refobj, copyprop) {
    var pp = copyprop.split('.')
    sp = dot(refobj, pp)
    if (sp.obj) return sp
    var fp = copyprop.split('.'); var oc = refobj
    for (var i = 0; i < fp.length; i++) {
      var nc = oc[fp[i]]; if (nc === undefined || nc === null || typeof (nc) !== 'object') oc[fp[i]] = (i == fp.length - 1 ? undefined : {}); oc = oc[fp[i]]
    }
    return dot(refobj, pp)
  }

  function doDataBind (rf, proppath, sel, copyprop, selctx) {
    var refobj, sp
    sel = sel || '^'
    var _ = rf.__
    var _b = alwaysobj(_, 'bind')
    var _bp = alwaysobj(_b, proppath)
    copyprop = copyprop || proppath
    if (_bp.proppath === proppath && _bp.selector === sel && _bp.prop === copyprop) return
    switch (sel[0]) {
      case '^':
        sp = realizeSource(rf, copyprop)
        break
      case '#':
      case '.':
      case '[':
        var el = (selctx || document).querySelector(sel)
        refobj = el && el.reef
        if (!refobj) reefError('unable to locate reef for bind')
        sp = realizeSource(refobj, copyprop)
        break
      case '$':
        el = sel.substring(1, 6)
        var url = sel.substring(6)
        _b[proppath] = { proppath: proppath, selector: sel, prop: copyprop }
        switch (el) {
          case 'json:': return loadData.call(rf, proppath, url)
          case 'html:': return loadHTML.call(rf, proppath, url)
        }
        // fall through
      default:
        reefError('unknown data bind: ' + proppath + ': ' + sel)
    }

    var dp = dot(rf, proppath)
    if (!dp.obj) reefError('data bind not found: ' + proppath)
    var f = function (u) {
      if (!rf.rootEl || rf.rootEl.getRootNode() !== document) {
        rf.unmount()
        return
      }
      rf.react(u)
    }
    var obsf = xs.alias(dp.obj, dp.prop, sp.obj, sp.prop, f)
    _b[proppath] = { proppath: proppath, selector: sel, prop: copyprop, sp: sp, unobs: obsf }
  }

  // =============
  // render
  // =============
  Reefer.prototype.render_ = render
  Reefer.prototype.render = function () {
    xs.debounce(this.sym + '_rr', this, render)
  }
  function render () {
    publishLF(this, 'beforeRender')
    var t = new Date()
    var rel = this.rootEl
    if (!rel || rel.getRootNode() !== document) {
      this.unmount()
      return
    }
    var template = this.__.template
    if (template) {
      var fc = this.__.fcounter
      if (fc) this.htmlBegin()
      fc = this.__.fcounter //  reset it
      var res = template.call(this, this.slots) || ''
      if (this.__.harr) this.htmlEnd()
      else if (typeof (res) === 'string') {
        if (res !== 'done') rel.innerHTML = res // a way to "out"
      } else {
        rel.innerHTML = ''
        if (Array.isArray(res)) res.forEach(function (e) { rel.appendChild(e) })
        else rel.appendChild(res)
      }
      if (rel.parentNode.classList.contains('container')) { rel = rel }
      run(rel) // hydrate nested components (should we only do this if we have a template?)
      if (rel.parentNode.classList.contains('container')) { console.log('render', new Date() - t) }
    }
    publishLF(this, 'afterRender')
  }
  Reefer.prototype.rerender = function () {
    this.__.renderflag = (this.__.renderflag || 0) + 1
    xs.debounce(this.sym + '_rr', this, rerender, true)
  }
  function rerender () {
    if (this.__.renderflag === 0) return
    var sel = saveSelection(this.rootEl)
    render.call(this)
    sel()
    this.__.renderflag = 0
  }
  function getAttachPoint (el) {
    switch (el.nodeName) {
      case 'TABLE': return (el.childNodes && el.childNodes[0]) || el
      default: return el
    }
  }
  function hash (str) {
    var hash = 0
    var l = str.length
    for (var i = 0; i < l; i++) {
      var char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash | 0
    }
    return hash
  }
  Reefer.prototype.htmlBegin = function (forceClean) {
    if (!this.__.harr || forceClean) {
      this.__.hmap = {}
      this.__.hgeneration = -1
    }
    this.__.harr = []
    this.__.hgeneration++
    this.__.fcounter = 0
  }

  function replaceNode (c, nch) {
    var p = c.previousSibling
    var pn = p || c.parentNode
    if (!c.getAttribute && 0) { c.nodeValue = nch } else { c.outerHTML = nch }
    return p ? p.nextSibling : pn.childNodes[0]
  }

  function copyAttributes (c, n) {
    try {
      var a = {}; var at
      var na = n.attributes; var nal = na.length
      for (var i = 0; i < nal; i++) {
        at = na[i]; a[at.name] = true
        if (c.getAttribute(at.name) !== at.value) c.setAttribute(at.name, at.value)
      }
      var ca = c.attributes; var cal = ca.length
      if (cal === nal) return true
      for (i = 0; i < cal; i++) {
        at = ca[i]; if (a[at.name]) continue
        c.removeAttribute(at.name)
      }
    } catch (err) { return true }
  }
  function attemptMerge (c, n) {
    if (c.nodeType === 3 && n.nodeType === 3) {
      c.nodeValue = n.nodeValue
      return true
    }
    if ((c.nodeName !== n.nodeName) ||
        (!copyAttributes(c, n))) return false
    if (c.childNodes.length || n.childNodes.length) {
      var i
      var cc = c.childNodes
      var nc = n.childNodes
      var il = i = Math.min(cc.length, nc.length)
      while (--i >= 0) {
        var ccn = cc[i]
        var ncn = nc[i]
        if (ccn.nodeType === 3 && ncn.nodeType === 3) { if (ccn.nodeValue !== ncn.nodeValue) ccn.nodeValue = ncn.nodeValue; continue }
        if (ccn.isEqualNode(ncn)) continue
        if (ccn.nodeName !== ncn.nodeName || !attemptMerge(ccn, ncn)) {
          c.replaceChild(ncn, ccn)
        }
      }
      while (il < cc.length) c.removeChild(cc[il++])
      while (il < nc.length) c.appendChild(nc[il++])
    }
    return true
  }

  function mergeNode (c, n) {
    if (c.nodeName !== n.nodeName || !attemptMerge(c, n)) {
      c.parentNode.replaceChild(n, c)
      return n
    }
    return c
  }

  Reefer.prototype.htmlUpdate = function (idx, id, htmlGen) {
    var _ = this.__
    var hm = _.hmap
    if (!hm) return
    var hsh = hash(htmlGen)
    id = (id === undefined || id === null) ? hsh : id
    if (!(id in hm)) reefError('updateing non-existent element')
    if (hm[id].hsh === hsh && idx === hm[id].idx) return
    var root = getAttachPoint(this.rootEl)
    var c = hm[id].el
    if (!c.getAttribute) { if (c.nodeValue !== htmlGen) c.nodeValue = htmlGen; return } // cheat
    hm[id].el = mergeNode(root.childNodes[idx], hydrate(root.nodeName, htmlGen))
    hm[id].hsh = hsh
    hm[id].idx = idx
  }

  Reefer.prototype.htmlEnd = function () {
    var _ = this.__
    var genid = _.hgeneration
    var hta = ''
    var ha = _.harr
    var hm = _.hmap
    if (!ha) return
    var fl = this.__.fcounter
    var prev = null
    if (fl === 0) {
      this.htmlBegin(true) // reset
      this.rootEl.innerHTML = ''
      return
    }
    if (genid === 0 || fl === 0) this.rootEl.innerHTML = '' // do this first
    for (var k in hm) { // delete untouched
      var hc = hm[k]
      if (hc.generation === genid) continue
      if (hc.el) hc.el.parentNode.removeChild(hc.el)
      delete hm[k]
    }

    var root = getAttachPoint(this.rootEl)
    var div = document.createElement(root.nodeName)

    var ah = {}; var htaa = ''; var cnt = 0
    for (var i = 0; i < fl; i++) {
      var hc = ha[i]
      if (!hc.h) { ah[i] = null; continue }
      ah[i] = cnt++
      htaa += hc.h
    }
    if (cnt) {
      div.innerHTML = htaa
      /*
      __range.selectNode(root)
      div = __range.createContextualFragment(htaa)
      if (root.nodeName=='TBODY') div = div.childNodes[0]
      */
    }

    cnt = 0
    var rcl = root.childNodes.length
    for (var i = 0; i < fl; i++) {
      var hc = ha[i]
      var c = hc.el
      var h = hc.h
      if (h) {
        if (i >= rcl) {
          hta += h
        } else {
          var n = div.childNodes[ah[i] - cnt]
          if (c) n = mergeNode(c, n)
          if (n !== c) {
            hc.el = n
            cnt++
          }
        }
        hc.h = ''
        c = hc.el
      }
      if (c) {
        if (c.parentNode !== root || c.previousSibling !== prev) { // clean up placement
          if (prev) {
            prev.parentNode.insertBefore(c, prev.nextSibling)
          } else if (!root.childNodes || root.childNodes[0] !== c) {
            root.insertBefore(c, root.childNodes && root.childNodes[0])
          }
        }
        prev = c
      }
    }
    ha.length = fl

    if (hta) root.insertAdjacentHTML('beforeend', hta) // end insert
    root = getAttachPoint(this.rootEl)
    if (root && ha.length != root.childNodes.length) {
      console.error('must be 1 html() entity for hmtl()')
      debugger
    }
    hm = {}
    for (var i = 0; i < ha.length; i++) {
      var hc = ha[i]
      hm[hc.id] = hc
      hc.el = root.childNodes[i]
      hc.idx = i
    }
    return 'done'
  }
  Reefer.prototype.htmlKeyToIdx = function (id) {
    var hm = this.__.hmap
    if (!hm || !hm[id]) return null
    return hm[id].idx | 0
  }
  Reefer.prototype.htmlFromKey = function (id) {
    var hm = this.__.hmap
    if (!hm || !hm[id]) return null
    return hm[id].el
  }

  // const typecache = {}
  const __range = document.createRange()
  function hydrate (type, h) {
    return __range.createContextualFragment(h).childNodes[0]
    /*
  }
    var t = typecache[type]
    if (!t) t = typecache[type] = document.createElement(type)
    if (!h) return t
    t.innerHTML = h
    return t.childNodes[0]
*/ }
  Reefer.prototype.html = function (id, htmlGen) {
    if (!this.__.harr) this.htmlBegin()
    var _ = this.__
    var ha = _.harr
    var hm = _.hmap
    var idx = _.fcounter++
    var genid = _.hgeneration
    var hsh = hash(htmlGen); var hc
    id = (id === undefined || id === null) ? hsh : id
    if (hm[id]) {
      hc = hm[id]
      if (hc.generation === genid) reefError('duplicate html() id')
      hc.generation = genid
      ha[idx] = hc // set the position
      if (hc.hsh === hsh) return
      hc.h = htmlGen
      hc.hsh = hsh
    } else {
      hc = { h: htmlGen, hsh: hsh, idx: idx, id: id, generation: genid }
      ha.splice(idx, 0, hc)
      hm[id] = hc
    }

    /*
    if (genid === 0) {
      genid = ++_.hgeneration
      this.rootEl.innerHTML = '' // do this first
    }
    var root = getAttachPoint(this.rootEl)
    var curchild = root.childNodes.length ? root.childNodes[idx] : null

    if (hm[id]) {
      var hc = hm[id]
      if (hc.generation === genid) { reefError('duplicate html() id') }
      hc.generation = genid
      if (hc.hsh === hsh && hc.idx === idx) return

      var n = hydrate(root.nodeName, htmlGen)
      // root.replaceChild(n, hc.el); hc.el = n
      n = hc.el = mergeNode(hc.el, n)
      if (curchild) {
        if (n.prevSibling !== curchild.prevSibling) {
          root.insertBefore(n, curchild)
        }
      } else { root.appendChild(n) }
      hc.hsh = hsh
      hc.idx = idx
      ha[idx] = hc
    } else {
      var o = { hsh: hsh, idx: idx, id: id, generation: genid }
      ha.splice(idx, 0, o)
      n = hydrate(root.nodeName, htmlGen)
      if (curchild) {
        root.insertBefore(n, curchild)
      } else { root.appendChild(n) }
      if (!curchild) root = getAttachPoint(this.rootEl)
      o.el = root.childNodes[idx]
      hm[id] = o
    } */
  }

  Reefer.prototype.dot = function (path, value) {
    var v = dot(this, path)
    if (arguments.length > 1) {
      if (!v.obj) throw ('chain path missing')
      v.obj[v.prop] = value
    }
    return v
  }
  Reefer.prototype.styleBag = function (e, s) {
    var rel = e instanceof Node ? e : this.rootEl
    if (rel === this.rootEl) s = e
    var hsh = hash(JSON.stringify(s))
    if (rel.__xs__style === hsh) return
    for (var k in s) rel.style[k] = s[k]
    rel.__xs__style = hsh
  }

  // ===========
  // utilities
  // ===========
  /*
  function hoist (o, f) {
    if (o[f].__hoisted__) return false
    var _f = function () { f.apply(p, arguments) }
    o[f] = _f
    xs.privateprop(o, '__hoisted__', true)
    return true
  } */
  /*
  function dotpath (obj, path, value) {
    if (typeof (obj) === 'string') { value = path; path = obj; obj = this }
    var inobj = obj
    var spl = path.split('.')
    var l = spl.length
    var ctx = obj; var key
    for (var i = 0; i < l && (obj !== undefined || !i); i++) {
      key = spl[i]
      ctx = obj
      obj = (obj && key in obj) ? obj[key] : undefined
    }
    if (arguments.length > (inobj === this ? 1 : 2)) {
      if (i !== l) throw Error('full chain path does not exist')
      ctx[key] = value
    }
    var ret = { value: obj, key: key, obj: ctx }
    return (i === l) ? ret : { last: ret }
  }
  */
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

  function getChildIndex (node) { return [].indexOf.call(node.parentNode.childNodes, node) }
  function saveSelection (rootEl) { // save the text selection (call the ret() as func to retore)
    var ael = document.activeElement
    if (ael) {
      var startPosition = ael.selectionStart
      var endPosition = ael.selectionEnd
      var aeindex = []
      while (ael && ael !== rootEl && ael.parentNode) {
        aeindex.push(getChildIndex(ael))
        ael = ael.parentNode
      }
    }
    return function () {
      if (ael) {
        ael = rootEl
        while (ael && aeindex.length) {
          var ind = aeindex.pop()
          ael = ael.childNodes[ind]
        }
        if (ael) {
          if (ael.focus) ael.focus()
          try {
            ael.selectionStart = startPosition
            ael.selectionEnd = endPosition
          } catch (err) {}
        }
      }
    }
  }

  /*
  function createCSS (name, rules) {
    var style = document.createElement('style')
    style.type = 'text/css'
    document.getElementsByTagName('head')[0].appendChild(style)
    if (!(style.sheet || {}).insertRule) { (style.styleSheet || style.sheet).addRule(name, rules) } else { style.sheet.insertRule(name + '{' + rules + '}', 0) }
  }

  createCSS('reef-helper', 'display:none;')
*/
  function emit (el, ev, detail) {
    el = resolveEl(el); detail = detail || {}
    if (el) { detail.reefEmitRootEl = el }
    document.dispatchEvent(new CustomEvent(ev, { detail: detail }))
  }

  function ready (cb) {
    if (document.readyState === 'complete' ||
      (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
      cb()
    } else {
      document.addEventListener('DOMContentLoaded', cb)
    }
  }
  if (opts.autorun) {
    ready(function () {
      run()
    })
  }

  opts.use = opts.use || Reefer
  var templateEngine = legacy ? templateGeneratorES5 : templateGenerator

  // ===========
  // exports
  // ===========
  return {
    register: register,
    mount: mount,
    run: run,
    template: templateEngine,
    ready: ready,
    emit: emit,
    styleBag: Reefer.prototype.styleBag,
    registry: function (name) { return name ? rf_registry[name] : rf_registry },
    find: function (a, ctx) { a = this.findAll(a, ctx); return a ? a[0] : null },
    findAll: function (a, ctx) { a = [].slice.call((ctx || document).querySelectorAll(a)); var j = 0; if (a) for (var i = 0; i < a.length; i++) { a[j] = a[i].reef; j += a[j] ? 1 : 0 } return j ? (a.length = j, a) : null }
  }
}

window.reefer = ReeferFactory({ autorun: true })