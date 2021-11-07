/*! For license information please see 374.js.LICENSE.txt */
(self.webpackChunk_dev_web=self.webpackChunk_dev_web||[]).push([[374],{6775:function(t,e,i){(function(){"use strict";function t(t){var e=0;return function(){return e<t.length?{done:!1,value:t[e++]}:{done:!0}}}var e="function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,i){return t==Array.prototype||t==Object.prototype||(t[e]=i.value),t},r=function(t){t=["object"==typeof globalThis&&globalThis,t,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof i.g&&i.g];for(var e=0;e<t.length;++e){var r=t[e];if(r&&r.Math==Math)return r}throw Error("Cannot find global object")}(this);function n(t,i){if(i)t:{var n=r;t=t.split(".");for(var o=0;o<t.length-1;o++){var a=t[o];if(!(a in n))break t;n=n[a]}(i=i(o=n[t=t[t.length-1]]))!=o&&null!=i&&e(n,t,{configurable:!0,writable:!0,value:i})}}function o(e){var i="undefined"!=typeof Symbol&&Symbol.iterator&&e[Symbol.iterator];return i?i.call(e):{next:t(e)}}var a="function"==typeof Object.assign?Object.assign:function(t,e){for(var i=1;i<arguments.length;i++){var r=arguments[i];if(r)for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t};function s(t){return t||Array.prototype.fill}n("Object.assign",(function(t){return t||a})),n("Array.prototype.fill",(function(t){return t||function(t,e,i){var r=this.length||0;for(0>e&&(e=Math.max(0,r+e)),(null==i||i>r)&&(i=r),0>(i=Number(i))&&(i=Math.max(0,r+i)),e=Number(e||0);e<i;e++)this[e]=t;return this}})),n("Int8Array.prototype.fill",s),n("Uint8Array.prototype.fill",s),n("Uint8ClampedArray.prototype.fill",s),n("Int16Array.prototype.fill",s),n("Uint16Array.prototype.fill",s),n("Int32Array.prototype.fill",s),n("Uint32Array.prototype.fill",s),n("Float32Array.prototype.fill",s),n("Float64Array.prototype.fill",s);var c=this||self;function l(t,e){t=t.split(".");var i,r=c;t[0]in r||void 0===r.execScript||r.execScript("var "+t[0]);for(;t.length&&(i=t.shift());)t.length||void 0===e?r=r[i]&&r[i]!==Object.prototype[i]?r[i]:r[i]={}:r[i]=e}var d={color:"white",lineWidth:4,radius:6,visibilityMin:.5};function u(t){return t=t||{},Object.assign(Object.assign(Object.assign({},d),{fillColor:t.color}),t)}function h(t,e){return t instanceof Function?t(e):t}function f(t,e,i){return Math.max(Math.min(e,i),Math.min(Math.max(e,i),t))}l("clamp",f),l("drawLandmarks",(function(t,e,i){if(e){i=u(i),t.save();for(var r=t.canvas,n=0,a=(e=o(e)).next();!a.done;a=e.next())if(void 0!==(a=a.value)&&(void 0===a.visibility||a.visibility>i.visibilityMin)){t.fillStyle=h(i.fillColor,{index:n,from:a}),t.strokeStyle=h(i.color,{index:n,from:a}),t.lineWidth=h(i.lineWidth,{index:n,from:a});var s=new Path2D;s.arc(a.x*r.width,a.y*r.height,h(i.radius,{index:n,from:a}),0,2*Math.PI),t.fill(s),t.stroke(s),++n}t.restore()}})),l("drawConnectors",(function(t,e,i,r){if(e&&i){r=u(r),t.save();for(var n=t.canvas,a=0,s=(i=o(i)).next();!s.done;s=i.next()){var c=s.value;t.beginPath(),s=e[c[0]],c=e[c[1]],s&&c&&(void 0===s.visibility||s.visibility>r.visibilityMin)&&(void 0===c.visibility||c.visibility>r.visibilityMin)&&(t.strokeStyle=h(r.color,{index:a,from:s,to:c}),t.lineWidth=h(r.lineWidth,{index:a,from:s,to:c}),t.moveTo(s.x*n.width,s.y*n.height),t.lineTo(c.x*n.width,c.y*n.height)),++a,t.stroke()}t.restore()}})),l("drawRectangle",(function(t,e,i){i=u(i),t.save();var r=t.canvas;t.beginPath(),t.lineWidth=h(i.lineWidth,{}),t.strokeStyle=h(i.color,{}),t.fillStyle=h(i.fillColor,{}),t.translate(e.xCenter*r.width,e.yCenter*r.height),t.rotate(e.rotation*Math.PI/180),t.rect(-e.width/2*r.width,-e.height/2*r.height,e.width*r.width,e.height*r.height),t.translate(-e.xCenter*r.width,-e.yCenter*r.height),t.stroke(),t.fill(),t.restore()})),l("lerp",(function(t,e,i,r,n){return f(r*(1-(t-e)/(i-e))+n*(1-(i-t)/(i-e)),r,n)}))}).call(this)},8709:function(t,e,i){var r;r=function(t){return function(t){var e={};function i(r){if(e[r])return e[r].exports;var n=e[r]={i:r,l:!1,exports:{}};return t[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,r){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(r,n,function(e){return t[e]}.bind(null,n));return r},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s="./src/react-webcam.tsx")}({"./src/react-webcam.tsx":function(t,e,i){"use strict";i.r(e);var r,n=i("react"),o=(r=function(t,e){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),a=function(){return(a=Object.assign||function(t){for(var e,i=1,r=arguments.length;i<r;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)};function s(){return!(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)}"undefined"!=typeof window&&(void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(t){var e=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia;return e?new Promise((function(i,r){e.call(navigator,t,i,r)})):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}));var c=function(t){function e(e){var i=t.call(this,e)||this;return i.canvas=null,i.ctx=null,i.unmounted=!1,i.state={hasUserMedia:!1},i}return o(e,t),e.prototype.componentDidMount=function(){var t=this.state,e=this.props;s()?t.hasUserMedia||this.requestUserMedia():e.onUserMediaError("getUserMedia not supported")},e.prototype.componentDidUpdate=function(t){var e=this.props;if(s()){var i=JSON.stringify(t.audioConstraints)!==JSON.stringify(e.audioConstraints),r=JSON.stringify(t.videoConstraints)!==JSON.stringify(e.videoConstraints),n=t.minScreenshotWidth!==e.minScreenshotWidth,o=t.minScreenshotHeight!==e.minScreenshotHeight;(r||n||o)&&(this.canvas=null,this.ctx=null),(i||r)&&(this.stopAndCleanup(),this.requestUserMedia())}else e.onUserMediaError("getUserMedia not supported")},e.prototype.componentWillUnmount=function(){this.unmounted=!0,this.stopAndCleanup()},e.stopMediaStream=function(t){t&&(t.getVideoTracks&&t.getAudioTracks?(t.getVideoTracks().map((function(e){t.removeTrack(e),e.stop()})),t.getAudioTracks().map((function(e){t.removeTrack(e),e.stop()}))):t.stop())},e.prototype.stopAndCleanup=function(){var t=this.state;t.hasUserMedia&&(e.stopMediaStream(this.stream),t.src&&window.URL.revokeObjectURL(t.src))},e.prototype.getScreenshot=function(t){var e=this.state,i=this.props;if(!e.hasUserMedia)return null;var r=this.getCanvas(t);return r&&r.toDataURL(i.screenshotFormat,i.screenshotQuality)},e.prototype.getCanvas=function(t){var e=this.state,i=this.props;if(!this.video)return null;if(!e.hasUserMedia||!this.video.videoHeight)return null;if(!this.ctx){var r=this.video.videoWidth,n=this.video.videoHeight;if(!this.props.forceScreenshotSourceSize){var o=r/n;n=(r=i.minScreenshotWidth||this.video.clientWidth)/o,i.minScreenshotHeight&&n<i.minScreenshotHeight&&(r=(n=i.minScreenshotHeight)*o)}this.canvas=document.createElement("canvas"),this.canvas.width=(null==t?void 0:t.width)||r,this.canvas.height=(null==t?void 0:t.height)||n,this.ctx=this.canvas.getContext("2d")}var a=this.ctx,s=this.canvas;return a&&s&&(i.mirrored&&(a.translate(s.width,0),a.scale(-1,1)),a.imageSmoothingEnabled=i.imageSmoothing,a.drawImage(this.video,0,0,(null==t?void 0:t.width)||s.width,(null==t?void 0:t.height)||s.height),i.mirrored&&(a.scale(-1,1),a.translate(-s.width,0))),s},e.prototype.requestUserMedia=function(){var t=this,i=this.props,r=function(r,n){var o={video:void 0===n||n};i.audio&&(o.audio=void 0===r||r),navigator.mediaDevices.getUserMedia(o).then((function(i){t.unmounted?e.stopMediaStream(i):t.handleUserMedia(null,i)})).catch((function(e){t.handleUserMedia(e)}))};if("mediaDevices"in navigator)r(i.audioConstraints,i.videoConstraints);else{var n=function(t){return{optional:[{sourceId:t}]}},o=function(t){var e=t.deviceId;return"string"==typeof e?e:Array.isArray(e)&&e.length>0?e[0]:"object"==typeof e&&e.ideal?e.ideal:null};MediaStreamTrack.getSources((function(t){var e=null,a=null;t.forEach((function(t){"audio"===t.kind?e=t.id:"video"===t.kind&&(a=t.id)}));var s=o(i.audioConstraints);s&&(e=s);var c=o(i.videoConstraints);c&&(a=c),r(n(e),n(a))}))}},e.prototype.handleUserMedia=function(t,e){var i=this.props;if(t||!e)return this.setState({hasUserMedia:!1}),void i.onUserMediaError(t);this.stream=e;try{this.video&&(this.video.srcObject=e),this.setState({hasUserMedia:!0})}catch(t){this.setState({hasUserMedia:!0,src:window.URL.createObjectURL(e)})}i.onUserMedia(e)},e.prototype.render=function(){var t=this,e=this.state,i=this.props,r=i.audio,o=(i.forceScreenshotSourceSize,i.onUserMedia,i.onUserMediaError,i.screenshotFormat,i.screenshotQuality,i.minScreenshotWidth,i.minScreenshotHeight,i.audioConstraints,i.videoConstraints,i.imageSmoothing,i.mirrored),s=i.style,c=void 0===s?{}:s,l=function(t,e){var i={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(i[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(t);n<r.length;n++)e.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(t,r[n])&&(i[r[n]]=t[r[n]])}return i}(i,["audio","forceScreenshotSourceSize","onUserMedia","onUserMediaError","screenshotFormat","screenshotQuality","minScreenshotWidth","minScreenshotHeight","audioConstraints","videoConstraints","imageSmoothing","mirrored","style"]),d=o?a(a({},c),{transform:(c.transform||"")+" scaleX(-1)"}):c;return n.createElement("video",a({autoPlay:!0,src:e.src,muted:!r,playsInline:!0,ref:function(e){t.video=e},style:d},l))},e.defaultProps={audio:!1,forceScreenshotSourceSize:!1,imageSmoothing:!0,mirrored:!1,onUserMedia:function(){},onUserMediaError:function(){},screenshotFormat:"image/webp",screenshotQuality:.92},e}(n.Component);e.default=c},react:function(e,i){e.exports=t}}).default},t.exports=r(i(2784))}}]);