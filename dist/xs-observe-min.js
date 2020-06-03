!function(e){var r={};function n(t){if(r[t])return r[t].exports;var o=r[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=r,n.d=function(e,r,t){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)n.d(t,o,function(r){return e[r]}.bind(null,o));return t},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=0)}([function(e,r){(function(){function e(r,o,i,a){if(!(r instanceof Node)&&(!r&&this.__xs__&&(r=this),r)){var c=!!r.__xs__;i&&(a=a&&a.concat()||[]).push(i),o=u(o,r,a);var s=n(r);if(!s.skip){var p=s.v;for(var v in p)v in r||(delete p[v],f("delete",r,v,null,null));for(v in r)c&&!(v in p)&&f("add",r,v,r[v],null),t(r,v,o,a);return Array.isArray(r)&&function(r,n){if(r.__xs__.arrhelpers)return;r.__xs__.arrhelpers=!0;for(var t=function(n){r[n]=function(){var r=this,t=r.__xs__;t.pause=!0;var o=Array.prototype[n].apply(r,arguments);return t.pause=!1,f(n,r,arguments,r,null),_(t.s,r,e),o}},o=["pop","push","shift","unshift","splice","reverse","sort"],i=0;i<o.length;i++)t(o[i])}(r),r.__observe__||void 0!==a||void 0!==i||l(r,"__observe__",e),r}}}var r=0;function n(e){e.__xs__||l(e,"__xs__",{s:"@"+r++,v:{},h:[]});return e.__xs__}function t(r,t,o,i){var a=n(r),c=a.v;o!==r&&(o=u(o,r));var l=r[t];if(!(t in c)){c[t]=l;Object.defineProperty(r,t,{get:function(){return c[t]},set:function(n){var u=c[t];return c[t]=n,"object"!=typeof n||null===n||n.__xs__||_(a.s,r,(function(){e(n,o,{o:r,p:t},i)}),!0),f("set",r,t,n,u),n},enumerable:!0,configurable:!0})}"object"==typeof l&&e(l,o,{o:r,p:t},i)}var o,i=0;function u(e,r,t){return e!==r&&e?(e="object"==typeof e?n(e).h:[{rootobj:r,f:e,path:t,s:"#"+i++}],function(e,r,n){if(e===r)return;for(var t=n||"",o=0;o<r.length;o++){var i=r[o].s;e[i]||(void 0===t&&(t=n.reduce((function(e,r){return e+(e&&".")+r.p}),"")),e[i]=!0,e.push({f:r[o].f,s:r[o].s,path:n,dotpath:t}))}}(n(r).h,e,t),r):r}function a(e,r){if(r===e.obj)return e.prop;for(var n=e.chain,t=0;t<n.length;t++)if(n[t].o===r)return n[t].p;return null}function f(e,r,n,t,o){var i=r.__xs__;if(i&&i.h&&!i.pause)for(var u=i.h,f=0;f<u.length;f++){var c=u[f],l={rootobj:c.rootobj,obj:r,action:e,prop:n,value:t,prev:o,chain:c.path,path:c.dotpath?c.dotpath+"."+n:void 0,find:a};c.f.call(r,l)}}function c(e,r){if(void 0===r)return e;if("object"!=typeof r||null===r)return r;var n=Object.prototype.toString.call(r);if("[object RegExp]"===n||"[object Date]"===n||r instanceof Node)return r;if("[object Array]"===n){"[object Array]"!==Object.prototype.toString.call(e)&&(e=[]);var t=[];for(var o in r)o in e||(t[o]=r[o]);for(o in t)e[o]=t[o];return e}for(var i in"object"!=typeof e&&(e={}),r)e[i]=c(e[i],r[i]);return e}function l(e,r,n,t){return Object.defineProperty(e,r,{value:n,enumerable:!1,configurable:!0,writable:!!t}),n}var s={};function p(){o=null;var e=s;for(var r in s={},e)e[r]&&e[r].f.call(e[r].o,e[r].o)}function _(e,r,n,t){return o?(e in s||t?s[e]={f:n,o:r}:(n.call(r,r),s[e]=null),!1):(t?s[e]={f:n,o:r}:n.call(r,r),o=setTimeout(p,0),!0)}var v=window;v.xs=v.xs||{},v.xs.observe=e,v.xs.unobserve=function e(r,n){if(r.__xs__){for(var t=r.__xs__.h,o=t.length-1;o>=0;o--){t[o].f===n&&t.splice(o,1)}for(var i in r)"object"==typeof i&&null!==i&&e(i[r],n)}},v.xs.alias=function(e,r,n,t,o){var i=function(n){n.chain&&n.chain.length&&n.chain[0].p===t?(1===n.chain.length&&e[r]!==n.obj&&(e[r]=n.obj),n.chain[0].p=r,o(n),n.chain[0].p=t):n.chain||n.prop!==t||(n.value!==e[r]&&(e[r]=n.value),n.prop=r,o(n),n.prop=t)};if(n instanceof Node){r in e||(e[r]=e[r]),e.__observer__||xs.observe(e);var u=Object.getOwnPropertyDescriptor(e,r);return Object.defineProperty(e,r,{get:function(){return n[t]},set:function(e){return n[t]=e,u.set(e)},enumerable:!0,configurable:!0}),null}t in n||(n[t]=n[t]),xs.observe(n,i),e[r]=n[t],xs.observe(e);var a=Object.getOwnPropertyDescriptor(n,t),f=a.get,c=a.set;return Object.defineProperty(e,r,{get:f,set:c,enumerable:!0,configurable:!0}),i},v.xs.assign=function(){for(var e=arguments,r=0,n=e[0];++r<e.length;)n=c(n,e[r]);return n},v.xs.clone=function(){for(var e=arguments,r=-1,n={};++r<e.length;)n=c(n,e[r]);return n},v.xs.debounce=_,v.xs.privateprop=l}).call(this)}]);
//# sourceMappingURL=xs-observe-min.js.map