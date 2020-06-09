

# Reefer
A lightweight fully reactive, low boilerplate UI library.
Inspired by Vue, Svelte, and (of course) Reef.

Reefer can be used both programatically and declaratively.

# Getting Started

No build is required. 
Check out some examples: <https://sreekotay.github.io/reefer/examples/>.

Simply include:
```
	<script src=reefer-min.js>
```
or 
```
	<script src=xs_observe.js>
	<script src=reefer.js>
```
This will add 3 items to your global namespace.
```
	reefer
	reeferHTML
	xs (this is the reactive observer used by reefer)
```

Note that the core of reefer runs with polyfill in IE11.  If you wish to use events, the a polyfill for custom events is required (provided here also.)
You can conditionally include with this line:
```
	  <script>window.MSInputMethodContext && document.documentMode && document.write('<script src="../../public/js/reeferIE11.js"><\x2fscript>');</script>
```

# Hello World #
```
<html>
<script src=reefer-min.js></script>
<body>
	example: <div reef=hello></div>		
</body>
<script>
	reefer.register ('hello', {
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
  <script src=reefer.js></script>
<body>
  example: <div reef=hello reef-p-name='Alice'></div>		
<script>
	var helloTempl = reefer.template ('name', 'Hello World ${name||""}!')
	reefer.register ('hello', {
		data: {
			name: 'Sree'
		},
		template: function() {
			this.html (0, helloTempl(this.data.name))
		}
	})
	setTimeout(function () {
		reefer.find('[reef=hello]').data.name = 'Bob'
	}, 2000)
</script>
</body>
</html>
```
Note that we both passed in the property `name` via HTML, as a default when registering the component and then reactively updated it via JS after a 2 second timeout.


# Sections #
- `data`: maybe object or array (will be converted to object with all properties undefined)
- `mutate`: function called whenever data is updates
- `template`: function() called when you should render to this.rootEl. The preferred model is to provide a series of html updates via `this.html()`
- `listeners`: map of function(props, el) DOM handlers
- `observers`: map of callback when props get updated
- `events`: array list of events to raise data.prop change (prepended by component-name) (not needed if you specify '--' after the VALUE, which you can you to rename the event also)
- `shared`: pass through blob every instance of component has access to 
- `methods`: functions will be bound to this automatically
- `decorators`: array list of data to NOT re-render always

# Reefer Component properties#
- rootEl
- data
- observers
- listeners
- methods
- shared (globally shared for this component)

# Reefer Component methods #
- render
- observe
- watch 
- bind
- emit

# Reefer Registiry #
- register
- find
- findAll
- dotpath
- emit

# Syntax #
- on HTML attributes `reef-p-PROPERTYNAME` = `VALUE`
	- where `PROPERTYNAME` is the data name in your javascript.
	- where `VALUE` is the value
- or `VALUE` may specific a refererence instead, if:
	- of the format `~PROPERTYREFERENCE~LOCATION`
		- `PROPERTYREFERENCE` is the name of the data in other component or store
		- `LOCATION` is a css selector to reach that `PROPERTYREFERENCE`
		- `~~LOCATION` may be used if if the `PROPERTYREFRENCE` is the same as the location, e.g:
		- `<div reef-p-whichtab="~~#othertabdiv"></div>`  
	- may end with ::EVENTNAME (where VALUE is literal or a reference
    - note that property events will be preprended by the registered component-name
    - for example, the following will set the initial value to 1, and fire a custom DOM event names `selectedtab` whenever the value `whichtab` changes in the component:
      -	`<div reef-p-whichtab="somelabel::selectedtab">`

		selector maybe: `.class` `#id` `[attribute...]` or `$json$PATH` or `$html$PATH` or `$json-raw$PATH` or `$jsonp$PATH` (where PATH should included the literal string `{JSONP}`
			one special selector `^` indicate "this" compomnent (may be extending to included parent with ^1 for parent for example)

#TODO
- rename to coral.ui
- style section in component def
- data => state
- data for non-reactive, state for reactive

reef.EVENTNAME=functionname(LITERAL,...,LITERAL)
reef.EVENTNAME=property(LITERAL)
reef.click@stop

# Events #
- includes the closest reef as `event.reef` in the event


# Slots #
- reef-slot -- slots.name.text (for string) or as array for dom elements
- type='reef()' for compiled function - available as reefFunc
- otherwise default
- update vs template (can force update by returning null)

#TODO: 
- dotted notation
- slots to elements
- decorators  