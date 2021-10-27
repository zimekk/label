/*! For license information please see 51.js.LICENSE.txt */
(self.webpackChunk_dev_web=self.webpackChunk_dev_web||[]).push([[51],{6953:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>I});var n=a(2784),s=a(9570),l=a(7234),i=a(9239);const r=784,c=10,o=Math.floor(54166.66666666667),d=65e3-o;class h{constructor(){this.shuffledTrainIndex=0,this.shuffledTestIndex=0}async load(){const e=new Image,t=document.createElement("canvas"),a=t.getContext("2d"),n=new Promise(((n,s)=>{e.crossOrigin="",e.onload=()=>{e.width=e.naturalWidth,e.height=e.naturalHeight;const s=new ArrayBuffer(20384e4),l=5e3;t.width=e.width,t.height=l;for(let n=0;n<13;n++){const i=new Float32Array(s,n*r*l*4,392e4);a.drawImage(e,0,n*l,e.width,l,0,0,e.width,l);const c=a.getImageData(0,0,t.width,t.height);for(let e=0;e<c.data.length/4;e++)i[e]=c.data[4*e]/255}this.datasetImages=new Float32Array(s),n()},e.src="https://storage.googleapis.com/learnjs-data/model-builder/mnist_images.png"})),s=fetch("https://storage.googleapis.com/learnjs-data/model-builder/mnist_labels_uint8"),[l,h]=await Promise.all([n,s]);this.datasetLabels=new Uint8Array(await h.arrayBuffer()),this.trainIndices=i.D5U.createShuffledIndices(o),this.testIndices=i.D5U.createShuffledIndices(d),this.trainImages=this.datasetImages.slice(0,r*o),this.testImages=this.datasetImages.slice(r*o),this.trainLabels=this.datasetLabels.slice(0,c*o),this.testLabels=this.datasetLabels.slice(c*o)}nextTrainBatch(e){return this.nextBatch(e,[this.trainImages,this.trainLabels],(()=>(this.shuffledTrainIndex=(this.shuffledTrainIndex+1)%this.trainIndices.length,this.trainIndices[this.shuffledTrainIndex])))}nextTestBatch(e){return this.nextBatch(e,[this.testImages,this.testLabels],(()=>(this.shuffledTestIndex=(this.shuffledTestIndex+1)%this.testIndices.length,this.testIndices[this.shuffledTestIndex])))}nextBatch(e,t,a){const n=new Float32Array(e*r),s=new Uint8Array(e*c);for(let l=0;l<e;l++){const e=a(),i=t[0].slice(e*r,e*r+r);n.set(i,l*r);const o=t[1].slice(e*c,e*c+c);s.set(o,l*c)}return{xs:i.odF(n,[e,r]),labels:i.odF(s,[e,c])}}}const u=i.p_j.sgd(.1),m=i.VD$(i.nGf([5,5,1,8],0,.1)),f=i.VD$(i.nGf([5,5,8,16],0,.1)),g=i.VD$(i.nGf([784,10],0,1/Math.sqrt(784))),p=i.VD$(i.lls([10]));function x(e){const t=e.as4D(-1,28,28,1),a=i.lub((()=>t.conv2d(m,1,"same").relu().maxPool([2,2],2,0)));return i.lub((()=>a.conv2d(f,1,"same").relu().maxPool([2,2],2,0))).as2D(-1,g.shape[0]).matMul(g).add(p)}var w=a(4427);function I(){const e=(0,n.useRef)(null),t=(0,n.useCallback)((()=>e.current.clearCanvas()),[e]),a=(0,n.useCallback)((()=>e.current.exportImage("png").then(console.log).catch(console.error)),[e]);return(0,n.useEffect)((()=>{const t=document.getElementById("status"),a=document.getElementById("message"),n=document.getElementById("images"),s=[];function l(e,t){const[a,n]=[28,28];t.width=a,t.height=n;const s=t.getContext("2d"),l=new ImageData(a,n),i=e.dataSync();for(let e=0;e<n*a;++e){const t=4*e;l.data[t+0]=255*i[e],l.data[t+1]=255*i[e],l.data[t+2]=255*i[e],l.data[t+3]=255}s.putImageData(l,0,0)}const r=function(){t.innerText="Training..."},c=function(e,t){a.innerText=`loss[${t}]: ${e}`,s.push({x:t,y:e});const n={values:s,series:["loss"]};w.render.linechart({name:"Loss",tab:"Training"},n,{xLabel:"Training Step",yLavel:"Loss"})},o=function(e,s,i){t.innerText="Testing...";const r=e.xs.shape[0];let c=0;for(let t=0;t<r;t++){const a=e.xs.slice([t,0],[1,e.xs.shape[1]]),r=document.createElement("div");r.className="pred-container";const o=document.createElement("canvas");l(a.flatten(),o);const d=document.createElement("div"),h=s[t],u=h===i[t];u&&c++,d.className="pred "+(u?"pred-correct":"pred-incorrect"),d.innerText=`pred: ${h}`,r.appendChild(d),r.appendChild(o),n.appendChild(r)}const o=`Accuracy: ${(100*c/r).toFixed(2)}% (${c} / ${r})`;a.innerText=`${o}\n`,console.log(o)};let d;!async function(){await async function(){d=new h,await d.load()}(),await async function(){r(),await async function(e,t){for(let a=0;a<100;a++)t(u.minimize((()=>{const t=e.nextTrainBatch(64);return a=t.labels,n=x(t.xs),i.MB5.softmaxCrossEntropy(a,n).mean();var a,n}),!0).dataSync(),a),await i.glt()}(d,c)}(),async function(){const e=d.nextTestBatch(50),t=function(e){const t=i.lub((()=>x(e).argMax(1)));return Array.from(t.dataSync())}(e.xs),a=function(e){const t=e.argMax(1);return Array.from(t.dataSync())}(e.labels);o(e,t,a)}()}(),console.log({canvasRef:e})}),[]),n.createElement("section",{className:l.Z.Section},n.createElement("h2",null,"Draw"),n.createElement("button",{onClick:t},"Clear"),n.createElement("button",{onClick:a},"Export"),n.createElement(s.x,{ref:e,className:l.Z.Canvas,width:"100",height:"100",strokeWidth:10,strokeColor:"red"}),n.createElement("section",{className:"title-area"},n.createElement("h1",null,"TensorFlow.js: Train MNIST with the Core API")),n.createElement("section",null,n.createElement("p",{className:"section-head"},"Description"),n.createElement("p",null,"This examples demonstrates training a handwritten digit recognizer using a Convolutional Neural Network implemented with TensorFlow.js' lower level API."),n.createElement("p",null,"The MNIST dataset is used as training data.")),n.createElement("section",null,n.createElement("p",{className:"section-head"},"Status"),n.createElement("div",{id:"status"},"Loading data..."),n.createElement("div",{id:"message"})),n.createElement("section",null,n.createElement("p",{className:"section-head"},"Test Samples"),n.createElement("div",{id:"images"})))}},5995:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>r});var n=a(9601),s=a.n(n),l=a(2609),i=a.n(l)()(s());i.push([e.id,".XimR9tM6ZsT9xHiUSMoX{color:blue}.HJEKkQwJ7Pb7rMrsBN3G{width:640px;height:480px}",""]),i.locals={Section:"XimR9tM6ZsT9xHiUSMoX",Canvas:"HJEKkQwJ7Pb7rMrsBN3G"};const r=i},7234:(e,t,a)=>{"use strict";a.d(t,{Z:()=>T});var n=a(6062),s=a.n(n),l=a(4036),i=a.n(l),r=a(6793),c=a.n(r),o=a(7892),d=a.n(o),h=a(1173),u=a.n(h),m=a(2464),f=a.n(m),g=a(5995),p={};p.styleTagTransform=f(),p.setAttributes=d(),p.insert=c().bind(null,"head"),p.domAPI=i(),p.insertStyleElement=u();var x=s()(g.default,p);if(!g.default.locals||e.hot.invalidate){var w=!g.default.locals,I=w?g:g.default.locals;e.hot.accept(5995,(t=>{g=a(5995),function(e,t,a){if(!e&&t||e&&!t)return!1;var n;for(n in e)if((!a||"default"!==n)&&e[n]!==t[n])return!1;for(n in t)if(!(a&&"default"===n||e[n]))return!1;return!0}(I,w?g:g.default.locals,w)?(I=w?g:g.default.locals,x(g.default)):e.hot.invalidate()}))}e.hot.dispose((function(){x()}));const T=g.default&&g.default.locals?g.default.locals:void 0},327:()=>{},6843:()=>{},7796:()=>{},451:()=>{},9182:()=>{},660:()=>{}}]);