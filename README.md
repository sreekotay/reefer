# THIS REPOSITORY HAS MOVED. #

Please visit: 
https://github.com/sreekotay/coral-ui

# THIS REPOSITORY HAS MOVED. #

# coral.ui (formerly REEFER)
A lightweight fully reactive, low boilerplate UI library.
Inspired by Vue, Svelte, and (of course) Reef.

coral.ui can be used both programatically and declaratively.

# Getting Started

No build is required. 
Check out some examples: <https://sreekotay.github.io/coral.ui/examples/>.

Simply include:
```
	<script src=coral-ui-min.js>
```
or 
```
	<script src=coral-observe.js>
	<script src=coral-ui.js>
```
This will add 1 item to your global namespace.
```
	coral
```

Note that the core of coral.ui runs with polyfill in IE11.  If you wish to use events, the a polyfill for custom events is required (provided here also.)
You can conditionally include with this line:
```
	  <script>window.MSInputMethodContext && document.documentMode && document.write('<script src="../../public/js/coral.uiIE11.js"><\x2fscript>');</script>
```

# Hello World #
```
<html>
<script src=coral.ui-min.js></script>
<body>
	example: <div coral=hello></div>		
</body>
<script>
	coral.ui.register ('hello', {
		template: function() {
			this.html (0, 'Hello World!')
		}
	})
</script>
</html>
```
and a slightly more complicated example
```
<html>
  <script src=xs_observe.js></script>
  <script src=coral.ui.js></script>
<body>
  example: <div coral=hello coral-p-name='Alice'></div>		
<script>
	var helloTempl = coral.ui.template ('name', 'Hello World ${name||""}!')
	coral.ui.register ('hello', {
		data: {
			name: 'Sree'
		},
		template: function() {
			this.html (0, helloTempl(this.data.name))
		}
	})
	setTimeout(function () {
		coral.ui.find('[coral=hello]').data.name = 'Bob'
	}, 2000)
</script>
</body>
</html>
```
Note that we both passed in the property `name` via HTML, as a default when registering the component and then reactively updated it via JS after a 2 second timeout.


# Sections #
- `state`: maybe object or array (will be converted to object with all properties undefined)
- `data`: your non-reactive component data
- `mutate`: function called whenever data is updates
- `template`: function() called when you should render to this.rootEl. The preferred model is to provide a series of html updates via `this.html()`
- `listeners`: map of function(props, el) DOM handlers
- `observers`: map of callback when props get updated
- `events`: array list of events to raise data.prop change (prepended by component-name) (not needed if you specify '--' after the VALUE, which you can you to rename the event also)
- `shared`: pass through blob every instance of component has access to 
- `methods`: functions will be bound to this automatically
- `decorators`: array list of data to NOT re-render always

# coral.ui Component properties#
- rootEl
- data
- observers
- listeners
- methods
- shared (globally shared for this component)

# coral.ui Component methods #
- render
- observe
- watch 
- bind
- emit

# coral.ui Registiry #
- register
- find
- findAll
- dotpath
- emit

# Syntax #
- on HTML attributes `coral-s-PROPERTYNAME` = `VALUE`
	- where `PROPERTYNAME` is the state name in your javascript.
	- where `VALUE` is the value
- or `VALUE` may specific a refererence instead, if:
	- of the format `~PROPERTYREFERENCE~LOCATION`
		- `PROPERTYREFERENCE` is the name of the data in other component or store
		- `LOCATION` is a css selector to reach that `PROPERTYREFERENCE`
		- `~~LOCATION` may be used if if the `PROPERTYREFRENCE` is the same as the location, e.g:
		- `<div coral-s-whichtab="~~#othertabdiv"></div>`  
	- may end with ::EVENTNAME (where VALUE is literal or a reference
    - note that property events will be preprended by the registered component-name
    - for example, the following will set the initial value to 1, and fire a custom DOM event names `selectedtab` whenever the value `whichtab` changes in the component:
      -	`<div coral-s-whichtab="somelabel::selectedtab">`

		selector maybe: `.class` `#id` `[attribute...]` or `$json$PATH` or `$html$PATH` or `$json-raw$PATH` or `$jsonp$PATH` (where PATH should included the literal string `{JSONP}`
			one special selector `^` indicate "this" compomnent (may be extending to included parent with ^1 for parent for example)

#TODO
- rename to coral.ui
- style section in component def
- data => state
- data for non-reactive, state for reactive

coral-on-EVENTNAME=functionname(LITERAL,...,LITERAL)
coral-on-EVENTNAME=property(LITERAL)
coral-on-click.stop

# Events #
- includes the closest coral as `event.coral` in the event


# Slots #
- coral-slot -- slots.name.text (for string) or as array for dom elements
- type='coral()' for compiled function - available as coralFunc
- otherwise default
- update vs template (can force update by returning null)

#TODO: 
- dotted notation
- slots to elements
- decorators  