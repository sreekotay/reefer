(function () {
  if (typeof window === 'undefined') {
    return
  }

  function getRootNode (opt) {
    var composed = typeof opt === 'object' && Boolean(opt.composed)

    return composed ? getShadowIncludingRoot(this) : getRoot(this)
  }

  function getShadowIncludingRoot (node) {
    var root = getRoot(node)

    if (isShadowRoot(root)) {
      return getShadowIncludingRoot(root.host)
    }

    return root
  }

  function getRoot (node) {
    if (node.parentNode != null) {
      return getRoot(node.parentNode)
    }

    return node
  }

  function isShadowRoot (node) {
    return node.nodeName === '#document-fragment' && node.constructor.name === 'ShadowRoot'
  }

  if (!Node.prototype.getRoodNode) {
    Object.defineProperty(Node.prototype, 'getRootNode', {
      enumerable: false,
      configurable: false,
      value: getRootNode
    })
  }

  try {
    var ce = new window.CustomEvent('test', { cancelable: true })
    ce.preventDefault()
    if (ce.defaultPrevented !== true) {
      // IE has problems with .preventDefault() on custom events
      // http://stackoverflow.com/questions/23349191
      throw new Error('Could not prevent default')
    }
  } catch (e) {
    var CustomEvent = function (event, params) {
      var evt, origPrevent
      params = params || {}
      params.bubbles = !!params.bubbles
      params.cancelable = !!params.cancelable

      evt = document.createEvent('CustomEvent')
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      )
      origPrevent = evt.preventDefault
      evt.preventDefault = function () {
        origPrevent.call(this)
        try {
          Object.defineProperty(this, 'defaultPrevented', {
            get: function () {
              return true
            }
          })
        } catch (e) {
          this.defaultPrevented = true
        }
      }
      return evt
    }

    CustomEvent.prototype = window.Event.prototype
    window.CustomEvent = CustomEvent // expose definition to window
  }
})()
