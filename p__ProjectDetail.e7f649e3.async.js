(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[498],{91220:function(N,B,r){"use strict";r.d(B,{Z:function(){return W}});var $=r(64254);function W(f,K){var d;if(typeof Symbol=="undefined"||f[Symbol.iterator]==null){if(Array.isArray(f)||(d=(0,$.Z)(f))||K&&f&&typeof f.length=="number"){d&&(f=d);var v=0,U=function(){};return{s:U,n:function(){return v>=f.length?{done:!0}:{done:!1,value:f[v++]}},e:function(D){throw D},f:U}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var u=!0,w=!1,_;return{s:function(){d=f[Symbol.iterator]()},n:function(){var D=d.next();return u=D.done,D},e:function(D){w=!0,_=D},f:function(){try{!u&&d.return!=null&&d.return()}finally{if(w)throw _}}}}},41435:function(N,B,r){"use strict";r.d(B,{Z:function(){return v}});var $=r(94663),W=r(80112);function f(U){return Function.toString.call(U).indexOf("[native code]")!==-1}var K=r(18597);function d(U,u,w){return(0,K.Z)()?d=Reflect.construct:d=function(j,D,O){var h=[null];h.push.apply(h,D);var z=Function.bind.apply(j,h),G=new z;return O&&(0,W.Z)(G,O.prototype),G},d.apply(null,arguments)}function v(U){var u=typeof Map=="function"?new Map:void 0;return v=function(_){if(_===null||!f(_))return _;if(typeof _!="function")throw new TypeError("Super expression must either be null or a function");if(typeof u!="undefined"){if(u.has(_))return u.get(_);u.set(_,j)}function j(){return d(_,arguments,(0,$.Z)(this).constructor)}return j.prototype=Object.create(_.prototype,{constructor:{value:j,enumerable:!1,writable:!0,configurable:!0}}),(0,W.Z)(j,_)},v(U)}},48627:function(N){N.exports={container:"container___2RXc3"}},18398:function(N){N.exports={_ppcard:"_ppcard___1sR0b",title:"title___2fjZe",shadow:"shadow___3SaOl",main:"main___IOVJu",block_l:"block_l___1ywNh",block_r:"block_r___Sg4L7",goup:"goup___1vznA"}},11428:function(N,B,r){"use strict";var $=r(67294),W=r(48627),f=r.n(W),K=r(85893),d=function(U){return(0,K.jsx)("div",{className:"".concat(f().container),style:{backgroundImage:"url(./pics/background.png)"},children:U.children})};B.Z=d},68370:function(N,B,r){"use strict";r.r(B),r.d(B,{default:function(){return P}});var $=r(34792),W=r(48086),f=r(67294),K=r(48971),d=r(57663),v=r(71577),U=r(88983),u=r(47933),w=r(36877),_=r(96607),j=r(47673),D=r(24044),O=r(9715),h=r(93766),z=r(2824),G=r(91220),J=r(89032),H=r(15746),x=r(11849),Q=r(13062),V=r(71230),R=r(11700),b=r(18398),p=r.n(b),L=r(37071),g=r(91156),F=r(64322),l=r(85893),S=[{value:"/app",label:"/app",children:[{value:"data",label:"data",children:[{value:"pplabel",label:"pplabel",children:[{value:"clas_single",label:"clas_single",children:[{value:"PetImages",label:"PetImages"}]}]}]}]}],A=function(a){return(0,l.jsxs)("div",{className:p()._ppcard,style:a.style,children:[(0,l.jsx)(V.Z,{className:p().titleRow,style:{display:a.title?void 0:"none"},children:(0,l.jsx)(R.Z,{className:p().title,children:a.title})}),(0,l.jsx)(V.Z,{style:{marginTop:26},children:(0,l.jsx)(H.Z,{span:24,style:(0,x.Z)({paddingLeft:30,paddingRight:30,textAlign:"center"},a.innerStyle),children:a.children})})]})};function k(i){var a="",c=(0,G.Z)(i),e;try{for(c.s();!(e=c.n()).done;){var n=e.value;n.endsWith("/")?a+=n:a+=n+"/"}}catch(t){c.e(t)}finally{c.f()}return a}var C=function(a){console.log("render ppcreater",a);var c=(0,F.Gd)(f.useState),e=L.Z.getQueryVariable("projectId");console.log("projectId",e);var n=function(T){e?c.update(e,{name:T.name,description:T.description,dataDir:k(T.dataDir),labelDir:T.labelDir}).then(function(){K.m8.push("/welcome")}):c.create({name:T.name,description:T.description,taskCategoryId:g.ux[a.taskCategory].id,dataDir:k(T.dataDir),labelDir:T.labelDir}).then(function(Z){K.m8.push("/".concat((0,g.LV)(a.taskCategory),"?projectId=").concat(Z.projectId))}).catch(function(){})},t=a.taskCategory?g.ux[a.taskCategory].name:null,s=h.Z.useForm(),o=(0,z.Z)(s,1),E=o[0];return(0,f.useEffect)(function(){c.getCurr(e).then(function(y){console.log("project",y);var T={name:y==null?void 0:y.name,description:y==null?void 0:y.description};E.setFieldsValue(T)})},[]),(0,l.jsxs)("div",{className:p().shadow,style:a.style,children:[(0,l.jsx)("div",{id:"left",className:p().block_l,children:(0,l.jsx)(A,{title:t,style:{height:760,padding:"1.25rem 0"},children:(0,l.jsxs)(h.Z,{form:E,layout:"horizontal",size:"large",style:{marginTop:"5.69rem"},onFinish:function(T){n(T)},children:[(0,l.jsx)(h.Z.Item,{name:"name",label:"Project Name",labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!0,message:"Please input project name!"}],style:{fontSize:"1.5rem"},children:(0,l.jsx)(D.Z,{size:"large",placeholder:"Words or numbers",style:{height:"3.13rem"}})}),(0,l.jsx)(h.Z.Item,{name:"dataDir",label:"Dataset Path",labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!0,message:"Please input dataset path!"}],style:{fontSize:"1.5rem"},children:(0,l.jsx)(_.Z,{options:S,onChange:function(T){console.log(T)},changeOnSelect:!0})}),(0,l.jsx)(h.Z.Item,{name:"description",label:"Description",labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!1}],style:{fontSize:"1.5rem"},children:(0,l.jsx)(D.Z,{size:"large",placeholder:"Words or numbers",style:{height:"3.13rem"}})}),(0,l.jsx)(h.Z.Item,{name:"maxPoints",label:"MaxPoints",labelCol:{span:6},wrapperCol:{span:16},rules:[{required:a.taskCategory=="keypointDetection",message:"Please input max points!"}],style:{fontSize:"1.5rem",display:a.taskCategory=="keypointDetection"?void 0:"none"},children:(0,l.jsx)(D.Z,{size:"large",placeholder:"Numbers (Int)",style:{height:"3.13rem"}})}),(0,l.jsx)(h.Z.Item,{name:"segmentationMode",label:"AnnotationMode",labelCol:{span:6},wrapperCol:{span:16},rules:[{required:a.taskCategory=="semanticSegmentation",message:"Please select task category!"}],style:{fontSize:"1.5rem",display:a.taskCategory=="semanticSegmentation"?void 0:"none"},children:(0,l.jsx)("div",{className:p().goup,children:(0,l.jsxs)(u.ZP.Group,{defaultValue:1,size:"large",style:{height:"3.13rem"},children:[(0,l.jsx)(u.ZP,{value:1,children:"Pixel model"}),(0,l.jsx)(u.ZP,{value:2,children:"Polygon mode"})]})})}),(0,l.jsxs)(h.Z.Item,{wrapperCol:{span:16,offset:6},children:[(0,l.jsx)(v.Z,{htmlType:"submit",type:"primary",style:{height:"2.5rem",width:"48%"},block:!0,children:e?"Update":"Create"}),"\xA0\xA0",(0,l.jsx)(v.Z,{htmlType:"button",style:{height:"2.5rem",width:"48%"},block:!0,onClick:function(){K.m8.push("/welcome")},children:"Cancel"})]})]})})}),(0,l.jsx)("div",{id:"right",className:p().block_r,children:(0,l.jsx)(A,{style:{height:"43.63rem",padding:"0.5rem 0"},children:(0,l.jsx)("img",{src:a.imgSrc,style:{height:"43.63rem",width:"60rem"}})})})]})},M=C,I=r(11428),m=function(){var a=(0,g.os)(L.Z.getQueryVariable("taskCategory"));return a||(W.default.error("Task Category not present in url"),K.m8.push("/project_creation")),a in g.ux||(W.default.error("Invalid task category "+a),K.m8.push("/project_creation")),(0,l.jsx)(I.Z,{children:(0,l.jsx)(M,{imgSrc:"./pics/illustration.jpg",taskCategory:a})})},P=m},91156:function(N,B,r){"use strict";r.d(B,{F$:function(){return h},LV:function(){return V},os:function(){return R},ux:function(){return b}});var $=r(34792),W=r(94043),f=r.n(W),K=r(37071),d=r(81139),v=r(63891),U=r(13868),u=r(70676),w=r(54919),_=r(6276),j=r(59124),D=localStorage.getItem("basePath"),O=new d.VK(D?{basePath:D}:void 0),h=new v.U(O),z=new U.v(O),G=new w.W(O),J=new _.s(O),H=new j.C(O);function x(e){return JSON.parse(JSON.stringify(e))}var Q=function(n,t,s){if(!s)return-1;for(var o=0;o<t.length;o++)if(n[s]==t[o][s])return o;return-1};function V(e){return e&&e.replace(/[A-Z]/g,function(n){return"_".concat(n.toLowerCase())})}function R(e){return e&&(e.toLowerCase().replace(/([-_][a-z])/g,function(n){return n.toUpperCase().replace("-","").replace("_","")}),e)}var b={classification:{name:"Image Classification",avatar:"./pics/classification.jpg",id:1},detection:{name:"Detection",avatar:"./pics/object_detection.jpg",id:2},semanticSegmentation:{name:"Semantic Segmentation",avatar:"./pics/semantic_segmentation.jpg",id:3},instanceSegmentation:{name:"Instance Segmentation",avatar:"./pics/instance_segmentation.jpg",id:4},keypointDetection:{name:"Keypoint Detection",avatar:"./pics/keypoint_detection.jpg",id:5}},p=function(n,t){var s=_toConsumableArray(n);for(var o in n)s[o].active=!1;for(var E in n)Q(n[E],t,"labelId")!=-1&&(s[E].active=!0);return console.log("activa labs",s),s};function L(e){return g.apply(this,arguments)}function g(){return g=_asyncToGenerator(_regeneratorRuntime.mark(function e(n){return _regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:h.getAll().then(function(o){console.log("get all projects",x(o)),n(x(o))}).catch(function(o){serviceUtils.parseError(o,_message)});case 1:case"end":return s.stop()}},e)})),g.apply(this,arguments)}function F(e){return l.apply(this,arguments)}function l(){return l=_asyncToGenerator(_regeneratorRuntime.mark(function e(n){var t,s=arguments;return _regeneratorRuntime.wrap(function(E){for(;;)switch(E.prev=E.next){case 0:t=s.length>1&&s[1]!==void 0?s[1]:null,console.log("get project id ",n),h.get(n).then(function(y){return console.log("getProject res",y),t&&t(y),y}).catch(function(y){console.log("getProject err",y),serviceUtils.parseError(y,_message)});case 3:case"end":return E.stop()}},e)})),l.apply(this,arguments)}function S(e,n){return A.apply(this,arguments)}function A(){return A=_asyncToGenerator(_regeneratorRuntime.mark(function e(n,t){return _regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:console.log("delete pj, pjid",n),h.remove(n).then(function(E){console.log("delete project",E),L(t)}).catch(function(E){console.log(E),serviceUtils.parseError(E,_message)});case 2:case"end":return o.stop()}},e)})),A.apply(this,arguments)}function k(e){return C.apply(this,arguments)}function C(){return C=_asyncToGenerator(_regeneratorRuntime.mark(function e(n){return _regeneratorRuntime.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:J.getAll().then(function(o){console.log("got tasks",o),n&&n(o)}).catch(function(o){console.log("get tasks err",o),serviceUtils.parseError(o,_message)});case 1:case"end":return s.stop()}},e)})),C.apply(this,arguments)}function M(e,n){return I.apply(this,arguments)}function I(){return I=_asyncToGenerator(_regeneratorRuntime.mark(function e(n,t){return _regeneratorRuntime.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:console.log("get task id",n),J.get(n).then(function(E){console.log("got task ",E),t&&t(E)});case 2:case"end":return o.stop()}},e)})),I.apply(this,arguments)}function m(e){return P.apply(this,arguments)}function P(){return P=_asyncToGenerator(_regeneratorRuntime.mark(function e(n){var t,s,o,E,y;return _regeneratorRuntime.wrap(function(Z){for(;;)switch(Z.prev=Z.next){case 0:if(n){Z.next=2;break}return Z.abrupt("return",0);case 2:return Z.prev=2,Z.next=5,h.getTasks(n);case 5:t=Z.sent,s=0,o=_createForOfIteratorHelper(t);try{for(o.s();!(E=o.n()).done;)y=E.value,y.annotations.length!=0&&s++}catch(X){o.e(X)}finally{o.f()}return console.log("progress",Math.ceil(s/t.length*100)),Z.abrupt("return",Math.ceil(s/t.length*100));case 13:return Z.prev=13,Z.t0=Z.catch(2),console.log("get progress err",Z.t0),serviceUtils.parseError(Z.t0,_message),Z.abrupt("return",0);case 18:case"end":return Z.stop()}},e,null,[[2,13]])})),P.apply(this,arguments)}function i(e,n){console.log("getLabels projectid",e),!!e&&h.getLabels(e).then(function(t){console.log("got labels ",t),n(x(t))}).catch(function(t){serviceUtils.parseError(t,_message)})}function a(e,n,t){var s=LabelFromJSON(n);s.projectId=e,z.create(s).then(function(){i(e,t)}).catch(function(o){serviceUtils.parseError(o,_message)})}function c(e,n){console.log("delete label",e),z.remove(e.labelId).then(function(){_message.error("Label "+e.name+" is deleted!"),i(e.projectId,n)}).catch(function(t){serviceUtils.parseError(t,_message)})}},64322:function(N,B,r){"use strict";r.d(B,{gu:function(){return z},_D:function(){return J},Gd:function(){return H},jL:function(){return x},iA:function(){return Q},A5:function(){return V}});var $=r(86582),W=r(91220),f=r(3182),K=r(34792),d=r(48086),v=r(2824),U=r(94043),u=r.n(U),w=r(37071),_=r(81139),j=localStorage.getItem("basePath"),D=new _.VK(j?{basePath:j}:void 0),O=new _.U(D),h=new _.sD(D),z=function(b){return JSON.parse(JSON.stringify(b))};function G(R){return R&&(R.toLowerCase().replace(/([-_][a-z])/g,function(b){return b.toUpperCase().replace("-","").replace("_","")}),R)}var J=function(b){var p=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[.1,3],L=b(1),g=(0,v.Z)(L,2),F=g[0],l=g[1],S=F,A=function(C){var M=F;M+=C,M<p[0]&&(M=p[0],d.default.error("Smallest scale is "+p[0])),M>p[1]&&(M=p[1],d.default.error("Largest scale is "+p[1])),l(M)};return{curr:S,change:A}},H=function(b){console.log("create project util");var p=b([]),L=(0,v.Z)(p,2),g=L[0],F=L[1],l=b(),S=(0,v.Z)(l,2),A=S[0],k=S[1],C=function(){var i=(0,f.Z)(u().mark(function a(){return u().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:O.getAll().then(function(n){F(n)}).catch(function(n){console.log("prject getall err",n),w.Z.parseError(n,d.default)});case 1:case"end":return e.stop()}},a)}));return function(){return i.apply(this,arguments)}}(),M=function(){var i=(0,f.Z)(u().mark(function a(c){var e;return u().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(console.log("get curr project"),c){t.next=3;break}return t.abrupt("return",void 0);case 3:return t.prev=3,t.next=6,O.get(c);case 6:return e=t.sent,k(e),t.abrupt("return",e);case 11:t.prev=11,t.t0=t.catch(3),console.log("prject getcurr err",t.t0),w.Z.parseError(t.t0,d.default);case 15:case"end":return t.stop()}},a,null,[[3,11]])}));return function(c){return i.apply(this,arguments)}}(),I=function(){var i=(0,f.Z)(u().mark(function a(c){return u().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:O.remove(c.projectId),C();case 2:case"end":return n.stop()}},a)}));return function(c){return i.apply(this,arguments)}}(),m=function(){var i=(0,f.Z)(u().mark(function a(c){var e;return u().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,O.create(c);case 3:return e=t.sent,console.log(e),t.abrupt("return",e);case 8:t.prev=8,t.t0=t.catch(0),console.log("project create err",t.t0),w.Z.parseError(t.t0,d.default);case 12:case"end":return t.stop()}},a,null,[[0,8]])}));return function(c){return i.apply(this,arguments)}}(),P=function(){var i=(0,f.Z)(u().mark(function a(c,e){return u().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:O.update(c,{name:e.name,description:e.description,dataDir:e.dataDir,labelDir:e.labelDir}).then(function(s){console.log("project update res",s)}).catch(function(s){console.log("project update err ",s),w.Z.parseError(s,d.default)});case 1:case"end":return t.stop()}},a)}));return function(c,e){return i.apply(this,arguments)}}();return{curr:A,all:g,getAll:C,getCurr:M,remove:I,create:m,update:P}},x=function(b,p){var L=p.pageOnSelect,g=b([]),F=(0,v.Z)(g,2),l=F[0],S=F[1],A=function(){var m=(0,f.Z)(u().mark(function P(i){return u().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:O.getLabels(i).then(function(e){var n=(0,W.Z)(e),t;try{for(n.s();!(t=n.n()).done;){var s=t.value;s.active=!0}}catch(o){n.e(o)}finally{n.f()}S(e)});case 1:case"end":return c.stop()}},P)}));return function(i){return m.apply(this,arguments)}}(),k=function(P){var i=l.filter(function(a){return a.labelId==P.labelId})[0];i.active=!i.active,L(i),S((0,$.Z)(l))},C=function(){},M=function(){},I=function(){};return{all:l,curr,getAll:A,onSelect:k,onAdd:C,onDelete:M,onModify:I}},Q=function(b){var p=b([]),L=(0,v.Z)(p,2),g=L[0],F=L[1],l=b(0),S=(0,v.Z)(l,2),A=S[0],k=S[1],C=function(m){if(console.log("turnto",g,m),g.length!=0){if(m==-1){d.default.error("This is the first image. No previous image.");return}if(m==g.length){d.default.error("This is the final image. No next image.");return}k(m)}},M=function(){var I=(0,f.Z)(u().mark(function m(P,i){var a;return u().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,O.getTasks(P);case 3:return a=e.sent,F(a),i!=null&&C(i),e.abrupt("return",a);case 9:e.prev=9,e.t0=e.catch(0),console.log("task getall err ",e.t0),w.Z.parseError(e.t0,d.default);case 13:case"end":return e.stop()}},m,null,[[0,9]])}));return function(P,i){return I.apply(this,arguments)}}();return{currIdx:A,all:g,turnTo:C,getAll:M,get curr(){if(this.all.length)return this.all[this.currIdx]}}},V=function(b){var p=b(0),L=(0,v.Z)(p,2),g=L[0],F=L[1],l=b([]),S=(0,v.Z)(l,2),A=S[0],k=S[1],C=function(){var I=(0,f.Z)(u().mark(function m(P){return u().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:F(P);case 1:case"end":return a.stop()}},m)}));return function(P){return I.apply(this,arguments)}}(),M=function(){var I=(0,f.Z)(u().mark(function m(P,i){var a;return u().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,h.getDatas(P);case 3:return a=e.sent,i!=null&&C(i),k(a),e.abrupt("return",a);case 9:e.prev=9,e.t0=e.catch(0),console.log("data getall err ",e.t0),w.Z.parseError(e.t0,d.default);case 13:case"end":return e.stop()}},m,null,[[0,9]])}));return function(P,i){return I.apply(this,arguments)}}();return{all:A,getAll:M,turnTo:C,get curr(){if(A.length!=0)return A[g]}}}}}]);
