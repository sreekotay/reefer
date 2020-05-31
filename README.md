

# Reefer
A lightweight fully reactive, low boilerplate UI library.
Inspired by Vue, Svelte, and (of course) Reef.

Reefer can be used both programatically and declaratively.

# Getting Started

No build is required. Run reeferhello for an example
Either include:
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
	xs (this is the reactive obsserver used by reefer)
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

# Sections #
- data: maybe object or array (will be converted to object)
- mutate: function
- template: function(slots) return: string or els --- or call this.html()
- listeners: map of function(props, el) DOM handlers
- observers: map of callback when props get updated
- events: array list of events to raise data.prop change (prepended by component-name) (not needed if you specify '--' after the VALUE, which you can you to rename the event also)
- shared: pass through blob every instance of component has access to 
- methods: functions will be bound to this automatically
- decorators: array list of data to NOT re-render always

**Reef properties**
- rootEl
- data
- observers
- listeners
- methods
- shared

**Reef methods**
- render
- rerender
- observe
- watch 
- bind
- emit

**Reefer**
- register
- find
- findAll
- dotpath
- emit


**Syntax**
	
- on HTML attributes **reef-p**-PROPERTYNAME = VALUE
- where PROPERTYNAME is the data name in your javascript.
- where VALUE is the value
- or VALUE may specific a refererence instead, if:
	- of the format **~PROPERTYREFERENCE~LOCATION**
		- PROPERTYREFERENCE is the name of the data in other component or store
		- LOCATION is a css selector to reach that PROPERTYREFERENCE
		- **~~LOCATION** may be used if if the PROPERTYREFRENCE is the same as the location, e.g:
		- &lt;div **reef-p-whichtab**="**~~#othertabdiv**">&lt;/div>  
	- may end with ::EVENTNAME (where VALUE is literal or a reference
    - note that property events will be preprended by the registered component-name
    - for example, the following will set the initial value to 1, and fire a custom DOM event names **selectedtab** whenever the value **whichtab** changes in the component:
      -	&lt;div **reef-p-whichtab**="**1::selectedtab**">

		selector maybe: '.class' '#id' '[attribute...]' or '$json:PATH' or '$html:PATH'


	 
    

reef@EVENTNAME=functionname(LITERAL,...,LITERAL)
reef@EVENTNAME=property(LITERAL)



**Slots**
- reef-slot -- slots.name.text (for string) or as array for dom elements
- type='reef()' for compiled function - available as reefFunc
- otherwise default
- update vs template (can force update by returning null)

#TODO: 
- dotted notation
- slots to elements
- decorators  