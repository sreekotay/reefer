!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t){(function(){function e(t,o,i,s){if(!(t instanceof Node)&&(!t&&this.__xs__&&(t=this),t)){var u=!!t.__xs__;i&&(s=s&&s.concat()||[]).push(i),o=a(o,t,s);var f=r(t).v;for(var d in f)d in t||(delete f[d],l("delete",t,d,null,null));for(d in t)u&&!(d in f)&&l("add",t,d,t[d],null),n(t,d,o,s);return Array.isArray(t)&&function(t,r){if(t.__xs__.arrhelpers)return;t.__xs__.arrhelpers=!0;for(var n=function(r){var n=Array.prototype[r];c(t,r,(function(){var t=this,o=t.__xs__;o.pause=!0;var i=n.apply(t,arguments);return o.pause=!1,l(r,t,arguments,t,null),h(o.s,t,e),i}))},o=["pop","push","shift","unshift","splice","reverse","sort"],i=0;i<o.length;i++)n(o[i])}(t),t.__observe__||void 0!==s||void 0!==i||c(t,"__observe__",e),t}}var t=0;function r(e){e.__xs__||c(e,"__xs__",{s:"@"+t++,v:{}});return e.__xs__}function n(t,n,o,i){var s=r(t),u=s.v;o!==t&&(o=a(o,t));var c=t[n];if(!(n in u)){u[n]=c;Object.defineProperty(t,n,{get:function(){return u[n]},set:function(r){var a=u[n];return u[n]=r,"object"!=typeof r||null===r||r.__xs__||h(s.s,t,(function(){e(r,o,{o:t,p:n},i)}),!0),l("set",t,n,r,a),r},enumerable:!0,configurable:!0})}"object"==typeof c&&e(c,o,{o:t,p:n},i)}var o,i=0;function a(e,t,n){if(e===t||!e)return t;e="object"==typeof e?r(e).h:[{rootobj:t,f:e,path:n,s:"#"+i++}];var o=r(t);return function(e,t,r){if(e===t)return;for(var n=r||"",o=0;o<t.length;o++){var i=t[o].s;e[i]||(void 0===n&&(n=r.reduce((function(e,t){return e+(e&&".")+t.p}),"")),e[i]=!0,e.push({f:t[o].f,s:t[o].s,path:r,dotpath:n}))}}(o.h=o.h||[],e,n),t}function s(e,t){if(t===e.obj)return e.prop;for(var r=e.chain,n=0;n<r.length;n++)if(r[n].o===t)return r[n].p;return null}function l(e,t,r,n,o){var i=t.__xs__;if(i&&i.h&&!i.pause)for(var a=i.h,l=0;l<a.length;l++){var u=a[l],c={rootobj:u.rootobj,obj:t,action:e,prop:r,value:n,prev:o,chain:u.path,path:u.dotpath?u.dotpath+"."+r:void 0,find:s};u.f.call(t,c)}}function u(e,t){if(void 0===t)return e;if("object"!=typeof t||null===t)return t;var r=Object.prototype.toString.call(t);if("[object RegExp]"===r||"[object Date]"===r||t instanceof Node)return t;if("[object Array]"===r){"[object Array]"!==Object.prototype.toString.call(e)&&(e=[]);var n=[];for(var o in t)o in e||(n[o]=t[o]);for(o in n)e[o]=n[o];return e}for(var i in"object"!=typeof e&&(e={}),t)e[i]=u(e[i],t[i]);return e}function c(e,t,r,n){return Object.defineProperty(e,t,{value:r,enumerable:!1,configurable:!0,writable:!!n}),r}var f={};function d(){o=null;var e=f;for(var t in f={},e)e[t]&&e[t].f.call(e[t].o,e[t].o)}function h(e,t,r,n){return o?(e in f||n?f[e]={f:r,o:t}:(r.call(t,t),f[e]=null),!1):(n?f[e]={f:r,o:t}:r.call(t,t),o=setTimeout(d,0),!0)}var p=window;p.xs=p.xs||{},p.xs.observe=e,p.xs.unobserve=function e(t,r){if(t.__xs__){for(var n=t.__xs__.h,o=n.length-1;o>=0;o--){n[o].f===r&&n.splice(o,1)}for(var i in t)"object"==typeof i&&null!==i&&e(i[t],r)}},p.xs.alias=function(e,t,r,n,o){var i=function(r){r.chain&&r.chain.length&&r.chain[0].p===n?(1===r.chain.length&&e[t]!==r.obj&&(e[t]=r.obj),r.chain[0].p=t,o(r),r.chain[0].p=n):r.chain||r.prop!==n||(r.value!==e[t]&&(e[t]=r.value),r.prop=t,o(r),r.prop=n)};if(r instanceof Node){t in e||(e[t]=e[t]),e.__observer__||xs.observe(e);var a=Object.getOwnPropertyDescriptor(e,t);return Object.defineProperty(e,t,{get:function(){return r[n]},set:function(e){return r[n]=e,a.set(e)},enumerable:!0,configurable:!0}),null}n in r||(r[n]=r[n]),xs.observe(r,i),e[t]=r[n],xs.observe(e);var s=Object.getOwnPropertyDescriptor(r,n),l=s.get,u=s.set;return Object.defineProperty(e,t,{get:l,set:u,enumerable:!0,configurable:!0}),i},p.xs.assign=function(){for(var e=arguments,t=0,r=e[0];++t<e.length;)r=u(r,e[t]);return r},p.xs.clone=function(){for(var e=arguments,t=-1,r={};++t<e.length;)r=u(r,e[t]);return r},p.xs.debounce=h,p.xs.privateprop=c}).call(this)},function(e,t,r){var n=!document.currentScript,o=null;window.reeferHTML=function(e){var t;(t=e)&&t.constructor&&t.call&&t.apply&&(e=e.toString().split("\n").slice(1,-1).join("\n"));var r=n?null:document.currentScript;r||(r=o),r||(r=(r=document.getElementsByTagName("script"))[r.length-1]),o=null;var i=r.reefCB;void 0===i?r.outerHTML=e:i(e),r.parentNode&&r.parentNode.removeChild(r)},ReeferFactory=function(e){e=e||{};var t=0,r={},i=0,a={"":{template:function(){var e=this.slots||{};if(e.default){if(!this.data.datasrc)return"done";var t,r=this.data,n="datactx"in r?this.dotpath(r.datactx).value:{},o="datasrc"in r?this.dotpath(r.datasrc).value:this,a=this.data.genkey,s=o&&e[r.dataslot||"default"]||e.empty&&e.empty.text||{text:"<div> </div>"},l=r.datakey;Array.isArray(o)||(o=[o]),e.header&&this.html(-1,e.header.script?e.header(n):e.header.text);for(var u=0;u<o.length;u++){var c=typeof o[u];o[u]&&(t=void 0===l?o[u].__key__:o[u][l]),a&&void 0===t&&"object"===c&&(t=xs.privateprop(o[u],"__key__","k"+i++));var f=s.script?s.script(o[u],u,n):s.text;this.html(t||u,f)}e.footer&&this.html(-2,e.footer.script?e.footer(n):e.footer.text)}}}};function s(){console.error(arguments)}function l(){throw console.error(arguments),Error("REEF FAULT")}function u(e,t){return e[t]=e[t]||{},e[t]}function c(e){for(var t=e||document,r=[],n=t.querySelectorAll(":not([reef-stage])[reef]"),o=0;o<n.length;o++)if(!n[o].reef){var i=f(n[o],t.reef);i&&i.render_(),r.push(i)}return r}function f(e,t){if(!e)return null;var r=e.getAttribute("reef");try{var n=function(e){for(var t,r=e.attributes,n=0;n<r.length;n++){var o=r[n],i=o.name+"";if(0===i.indexOf("reef-p")){t=t||{};var a=o.value,s=i[6],l=a.split(s+s);a=l[0],l=l[1];var c=i.substring(7),f=d(c,a);try{a=JSON.parse(a)}catch(e){}f?u(t,"bind")[c]=f:u(t,"props")[c]=a,l&&(u(t,"events")[c]=l)}else if(0===i.indexOf("reef@")){var h=i.substring(5);u(t=t||{},"listeners")[h]=o.value}}return t}(e),o=e.cloneNode(!0);if(o&&(n=n||{},o.children))for(var i=0;i<o.children.length;i++){var a=u(n,"slots"),l=o.children[i],c=l.getAttribute,f=c&&c.call(l,"reef-slot")||"default",p=a[f]=a[f]||[];if(p.push(l),p.text=(p.text||"")+(c?l.outerHTML:l.data),"SCRIPT"===l.nodeName&&0===l.type.indexOf("reef-")){try{var v=l.getAttribute("type"),_=v.match(/\(([^)]*)\)/);_=_?_[1]:"";var g=l.innerHTML.trim();if(g)switch(v.split("(")[0].trim()){case"reef-function":l.reefScript=new Function(_,g);break;case"reef-template":l.reefScript=R(_,g);break;default:s("unknown reef slot type")}}catch(e){s("reef-slot script parsing ERROR:",g||l.type,l,e)}"el"in p||(p.el=l),!("script"in p)&&l.reefScript&&(p.script=l.reefScript)}}return h(e,r,n,t)}catch(t){s("Reefer failed to mount: ",r,e,t)}return null}function d(e,t){if("~"!==t[0])return!1;var r=t.split("~");return{prop:r[1],selector:r.length<2?"^":r[2]}}function h(t,n,o,i){o=o||{},a[n]||l("Reefer NOT registered: ",n);var s=a[n],u=t.reef=new e.use(t,s,o);if(u.name=n,t.setAttribute("reef-stage","mounted"),u.listeners){var c=u.listeners;for(var f in c){var d=f.split("@"),h=d[0];r[h]||(r[h]=p(h),document.addEventListener(h,r[h],!1)),c[h]=c[f],"stop"===c[d[1]]&&(c[h].reefStop=!0)}u.listeners=null}return u}function p(e){return function(t){for(var r,n,o,i=t.detail&&t.detail.reefEmitRootEl||t.target,s="reef@"+e,l=[];i;){var u=i.getAttribute&&i.getAttribute(s);u&&(u=u.split("@"),l.push(u));var c=i.reef;if(t.reef||(t.reef=c),c&&l.length)for(var f=0;f<l.length;f++){var d=l[f],h=d[0].trim(),p=(n=h,o=void 0,o=n.match(/\(([^)]*)\)/),o&&o[1]||"").split(",");if(p){h=h.split("(")[0];var _=p.indexOf("$event");_>=0&&(p[_]=t)}var g,b=c.dotpath(h);if(void 0!==b.value&&(v(b.value)?g=b.value.apply(b.obj,p||[t]):c.dotpath(h,p[0]),"stop"===g||"stop"===d[1]))return}var m=c&&c.name;if(a[m]&&(r=a[m]).listeners&&r.listeners[e]&&("stop"===r.listeners[e].call(c,t)||r.listeners[e].reefStop))return;i=i.parentNode}}}function v(e){return!!(e&&e.constructor&&e.call&&e.apply)}function _(e,t){if(!Array.isArray(e))return e;for(var r={},n=0;n<e.length;n++)r[e[n]]=arguments.length<=1||t;return r}function g(e,t,r,n){for(var o=0;o<t.length;o++){var i=t[o],a=i in n?n[i]:r[i];void 0!==a&&(e[i]=xs.clone(a))}}function b(e,r,n){r=r||{},n=n||{};var o=this,i=this.__={};g(i,["template","update","bind"],r,n),g(this,["methods","observers","listeners","mutate"],r,n),"shared"in r&&(this.shared=r.shared),(r.events||n.events)&&(i.events=xs.assign({},_(r.events),n.events)),(r.decorators||n.decorators)&&(i.decorators=xs.assign({},_(r.decorators),_(n.decorators))),(r.slots||n.slots)&&xs.assign(u(this,"slots"),r.slots,n.slots),"super"in r&&(this.super=a[r.super]);var s=this.methods;if(s)for(var l in s)s[l]=v(s[l])?s[l].bind(o):s[l];this.rootEl=e,i.obsf=function(){b.prototype.react.apply(o,arguments)};var c=this.data=xs.observe({},i.obsf);for(l in xs.assign(c,i.decorators,r.data,n.props),this.observers)l in c||(c[l]=void 0);for(l in i.bind)N(this,"data."+l,i.bind[l].selector,i.bind[l].prop);return c.__observe__(),this.sym="$"+t++,this}function m(e,t,r){var n=this,o=(r=r||{}).xhr||new XMLHttpRequest;return o.onerror=function(e){console.log("REEF HTTP LOAD",e),w(n.rootEl,"reefLoadDataFail",{url:t})},o.onload=function(t){if(200==this.status){var r=this.response;try{r=JSON.parse(r)}catch(e){}n.dotpath(e,r)}else this.status&&o.onerror(t)},o.open(r.method||"GET",t,!0),o.send(null),o}function y(e,t){var r=this;if("loading"!==document.readyState){var n=document.createElement("script");n.src=t,document.getElementsByTagName("head")[0].appendChild(n)}else document.write('<script src="'+t+'"></script'),n=(n=document.getElementsByTagName("script"))[n.length-1];return n.onerror=function(e){console.log("REEF SCRIPT LOAD",e),n.parentNode.removeChild(n),w(r.rootEl,"reefLoadHTMLFail",{url:t})},n.reefCB=function(t){r.dotpath(e,t)},o=n,n}function x(e,t){if(sp=T(e,t),sp.obj)return sp;for(var r=t.split("."),n=e,o=0;o<r.length;o++){var i=n[r[o]];null!=i&&"object"==typeof i||(n[r[o]]=o==r.length-1?void 0:{}),n=n[r[o]]}return T(e,t)}function N(e,t,r,n,o){var i,a;r=r||"^";var s=u(e.__,"bind"),c=u(s,t);if(n=n||t,c.proppath!==t||c.selector!==r||c.prop!==n){switch(r[0]){case"^":a=x(e,n);break;case"#":case".":case"[":var f=(o||document).querySelector(r);(i=f&&f.reef)||l("unable to locate reef for bind"),a=x(i,n);break;case"$":f=r.substring(1,6);var d=r.substring(6);switch(s[t]={proppath:t,selector:r,prop:n},f){case"json:":return m.call(e,t,d);case"html:":return y.call(e,t,d)}default:l("unknown data bind: "+t+": "+r)}var h=T(e,t);h.obj||l("data bind not found: "+t);var p=xs.alias(h.obj,h.key,a.obj,a.key,(function(t){e.rootEl&&e.rootEl.getRootNode()===document?e.react(t):e.unmount()}));s[t]={proppath:t,selector:r,prop:n,sp:a,unobs:p}}}function E(){var e=new Date,t=this.rootEl;if(t&&t.getRootNode()===document){var r=this.__.template;if(r){var n=this.__.fcounter;n&&this.htmlBegin(),n=this.__.fcounter;var o=r.call(this,this.slots)||"";this.__.harr?this.htmlEnd():"string"==typeof o?"done"!==o&&(t.innerHTML=o):(t.innerHTML="",Array.isArray(o)?o.forEach((function(e){t.appendChild(e)})):t.appendChild(o)),t.parentNode.classList.contains("container")&&(t=t),c(t),t.parentNode.classList.contains("container")&&console.log("render",new Date-e)}}else this.unmount()}function j(){var e=function(e){var t=document.activeElement;if(t)for(var r=t.selectionStart,n=t.selectionEnd,o=[];t&&t!==e&&t.parentNode;)o.push((i=t,[].indexOf.call(i.parentNode.childNodes,i))),t=t.parentNode;var i;return function(){if(t){for(t=e;t&&o.length;){var i=o.pop();t=t.childNodes[i]}if(t){t.focus&&t.focus();try{t.selectionStart=r,t.selectionEnd=n}catch(e){}}}}}(this.rootEl);E.call(this),e()}function S(e){switch(e.nodeName){case"TABLE":return e.childNodes?e.childNodes[0]:e;default:return e}}function A(e){for(var t=0,r=e.length,n=0;n<r;n++){t=(t<<5)-t+e.charCodeAt(n),t|=0}return t}function O(e,t){return e.nodeName===t.nodeName&&function e(t,r){if(3===t.nodeType)return t.nodeValue!==r.nodeValue&&(t.nodeValue=r.nodeValue),!0;if(t.childNodes.length||r.childNodes.length){for(var n,o=t.childNodes,i=r.childNodes,a=n=Math.min(o.length,i.length);--n>=0;){var s=o[n],l=i[n];s.isEqualNode(l)||(s.nodeName===l.nodeName&&e(s,l)||t.replaceChild(l,s))}for(;a<o.length;)t.removeChild(o[a++]);for(;a<i.length;)t.appendChild(i[a++])}return!r.hasAttribute||function(e,t){try{for(var r,n={},o=t.attributes,i=0;i<o.length;i++)n[(r=o[i]).name]=!0,e.getAttribute(r.name)!==r.value&&e.setAttribute(r.name,r.value);var a=e.getAttributeNames();if(a.length===o.length)return!0;for(i=0;i<a.length;i++)n[r=a[i]]||e.removeAttribute(r);return!0}catch(e){}return!1}(t,r)}(e,t)?e:(e.parentNode.replaceChild(t,e),t)}function T(e,t,r){"string"==typeof e&&(r=t,t=e,e=this);for(var n,o=e,i=t.split("."),a=i.length,s=e,l=0;l<a&&(void 0!==e||!l);l++)n=i[l],s=e,e=e&&n in e?e[n]:void 0;if(arguments.length>(o===this?1:2)){if(l!==a)throw Error("full chain path does not exist");s[n]=r}var u={value:e,key:n,obj:s};return l===a?u:{last:u}}function w(e,t,r){r=r||{},(e=function e(t,r){return"string"!=typeof t?t:e(r||document).querySelector(t)}(e))&&(r.reefEmitRootEl=e),document.dispatchEvent(new CustomEvent(t,{detail:r}))}function L(e){"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?e():document.addEventListener("DOMContentLoaded",e)}b.prototype.unmount=function(){var e=this.__||{};if(xs.unobserve(this.data,e.obsf),e.bind)for(var t in e.bind){var r=e.bind[t];r.obsf&&xs.unobserve(r.sp.obj,r.obsf)}},b.prototype.react=function(e){e.reef=this;var t,r=this.__,n=e.root=e.path?e.path.split(".")[0]:e.prop,o=this.observers;if(o){if(r.obsrx=r.obsrx||function(e){var t="";for(var r in e)t+=":xs:"+r+"\n";return t}(o),e.path){var i="(:xs:(("+e.path.replace(/\./g,"\\.)|(\\*\\.))*((")+")|(\\*)))\n",a=new RegExp(i,"g"),s=r.obsrx.match(a);if(s){for(var l=s[0],u=1;u<s.length;u++)s[u].length>l.length&&(l=s[u]);n=l.substring(4,l.length-1)}}var c=o[n];if(c)if(v(c))t=c.call(this,e);else if(!e.path&&("set"===e.action||"add"===e.action)){var f=this.dotpath(c);v(f.value)?f.value.call(this):f.obj[f.key]=e.value}}var d,h=r.events;if(h&&h[n]){var p=r.name+"."+(!0===h[n]?n:h[n]);w(this.rootEl,p,e)}if(e.value!==e.prev){this.mutate&&(d=this.mutate.call(this,e));var _=r.decorators;this.sym&&("done"===t||"done"===d||_&&(_[n]||_[l])||this.rerender())}},b.prototype.observe=function(e,t){u(this,"observers")[e]=t,this.__.obsrx=null},b.prototype.decorate=function(e,t){u(this,"decorators")[e]=!1!==t&&0!==t},b.prototype.events=function(e,t){u(this.__,"events")[e]=!1!==t&&0!==t&&t,this.__.evrx=null},b.prototype.watch=function(e,t){this.data[e]=t,this.data.__observe__()},b.prototype.bind=function(e,t,r,n){N(this,e,t,r,n)},b.prototype.emit=function(e,t){w(this.rootEl,e,t)},b.prototype.render_=E,b.prototype.render=function(){xs.debounce(this.sym+"_rr",this,E)},b.prototype.rerender=function(){xs.debounce(this.sym+"_rr",this,j,!0)},b.prototype.htmlBegin=function(e){this.__.harr&&!e||(this.__.hmap={},this.__.hgeneration=-1),this.__.harr=[],this.__.hgeneration++,this.__.fcounter=0},b.prototype.htmlUpdate=function(e,t,r){var n=this.__.hmap;if(n){var o=A(r);if((t=null==t?o:t)in n||l("updateing non-existent element"),n[t].hsh!==o||e!==n[t].idx){var i=S(this.rootEl)||this.rootEl,a=n[t].el;a.getAttribute?(n[t].hsh=o,n[t].idx=e,n[t].el=function(e,t){var r=e.previousSibling,n=r||e.parentNode;return e.getAttribute?e.outerHTML=t:e.nodeValue=t,r?r.nextSibling:n.childNodes[0]}(i.childNodes[e],r)):a.nodeValue!==r&&(a.nodeValue=r)}}},b.prototype.htmlEnd=function(){var e=this.__,t=e.hgeneration,r="",n=e.harr,o=e.hmap;if(n){var i=this.__.fcounter,a=null;if(0===i)return this.htmlBegin(!0),void(this.rootEl.innerHTML="");for(var s in 0!==t&&0!==i||(this.rootEl.innerHTML=""),o){var u=o[s];u.generation!==t&&(u.el&&u.el.parentNode.removeChild(u.el),delete o[s])}for(var c=S(this.rootEl)||this.rootEl,f=document.createElement(c.nodeName),d={},h="",p=0,v=0;v<i;v++){var _=n[v];_.h?(d[v]=p++,h+=_.h):d[v]=null}p&&(f.innerHTML=h),p=0;for(v=0;v<i;v++){var g=n[v].el,b=n[v].h;b&&(v>=c.childNodes.length?r+=b:g?(n[v].el=f.childNodes[d[v]-p++],n[v].el=O(g,n[v].el),n[v].el===g&&p--):(f.innerHTML=b,n[v].el=f.childNodes[0]),n[v].h=null),0!==v&&null===a&&n[v].el&&l("htmlEnd() logic error"),!(g=n[v].el)||g.parentNode===c&&g.previousSibling===a||(a?a.parentNode.insertBefore(g,a.nextSibling):c.childNodes&&c.childNodes[0]===g||c.insertBefore(g,c.childNodes&&c.childNodes[0])),a=g}n.length=i,r&&c.insertAdjacentHTML("beforeend",r),(c=S(this.rootEl))&&n.length!=c.childNodes.length&&console.error("must be 1 html() entity for hmtl()"),o={};for(v=0;v<n.length;v++)o[n[v].id]=n[v],n[v].el=c.childNodes[v],n[v].idx=v;return"done"}},b.prototype.htmlKeyToIdx=function(e){var t=this.__.hmap;return t&&t[e]?t[e].idx:null},b.prototype.html=function(e,t){this.__.harr||this.htmlBegin();var r=this.__,n=r.harr,o=r.hmap,i=r.fcounter++,a=r.hgeneration,s=A(t);if(o[e=null==e?s:e]){var u=o[e];if(u.generation===a&&l("duplicate html() id"),u.generation=a,n[i]=u,u.hsh===s)return;u.h=t,u.hsh=s}else{var c={h:t,hsh:s,idx:i,id:e,generation:a};n.splice(i,0,c),o[e]=c}},b.prototype.dotpath=T,b.prototype.styleBag=function(e){var t=this.rootEl,r=A(JSON.stringify(e));if(t.__xs__style!==r){for(var n in e)t.style[n]=e[n];t.__xs__style=r}},e.autorun&&L((function(){c()})),e.use=e.use||b;var R=n?function(e,t){return t=t.split("\n").join("\\\n").replace(/"/g,'\\"'),new Function(e,'var f=function (_, exp) {return eval(exp)}; f.bind(this); return "'+t+'".replace(/\\${(.*?)}/g, f)')}:function(e,t){return new Function(e,"return `"+t+"`;")};return{register:function(e,t,r){var n="*"===e[0]?e.substring(1):e;if(r=r||"",t.data=_(t.data,void 0),!a[n])return a[r]||l("Super Reef NOT registered: "+r),a[n]=xs.assign({},a[r],t),a[n].name=n,a[n].super=r,!0;e===n&&l("Reefer already registered: "+n)},mount:h,run:c,template:R,ready:L,emit:w,registry:function(e){return e?a[e]:a},find:function(e,t){return(e=this.findAll(e,t))?e[0]:null},findAll:function(e,t){var r=0;if(e=[].slice.call((t||document).querySelectorAll(e)))for(var n=0;n<e.length;n++)e[r]=e[n].reef,r+=e[r]?1:0;return r?(e.length=r,e):null}}},window.reefer=ReeferFactory({autorun:!0})},,,,,,function(e,t,r){r(0),e.exports=r(1)}]);
//# sourceMappingURL=reefer-min.js.map