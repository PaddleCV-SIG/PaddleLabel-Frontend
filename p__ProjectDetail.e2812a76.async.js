(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[498],{91220:function(N,I,e){"use strict";e.d(I,{Z:function(){return _}});var R=e(64254);function _(o,m){var b;if(typeof Symbol=="undefined"||o[Symbol.iterator]==null){if(Array.isArray(o)||(b=(0,R.Z)(o))||m&&o&&typeof o.length=="number"){b&&(o=b);var A=0,L=function(){};return{s:L,n:function(){return A>=o.length?{done:!0}:{done:!1,value:o[A++]}},e:function(p){throw p},f:L}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var M=!0,U=!1,h;return{s:function(){b=o[Symbol.iterator]()},n:function(){var p=b.next();return M=p.done,p},e:function(p){U=!0,h=p},f:function(){try{!M&&b.return!=null&&b.return()}finally{if(U)throw h}}}}},41435:function(N,I,e){"use strict";e.d(I,{Z:function(){return A}});var R=e(94663),_=e(80112);function o(L){return Function.toString.call(L).indexOf("[native code]")!==-1}var m=e(18597);function b(L,M,U){return(0,m.Z)()?b=Reflect.construct:b=function(O,p,x){var T=[null];T.push.apply(T,p);var B=Function.bind.apply(O,T),j=new B;return x&&(0,_.Z)(j,x.prototype),j},b.apply(null,arguments)}function A(L){var M=typeof Map=="function"?new Map:void 0;return A=function(h){if(h===null||!o(h))return h;if(typeof h!="function")throw new TypeError("Super expression must either be null or a function");if(typeof M!="undefined"){if(M.has(h))return M.get(h);M.set(h,O)}function O(){return b(h,arguments,(0,R.Z)(this).constructor)}return O.prototype=Object.create(h.prototype,{constructor:{value:O,enumerable:!1,writable:!0,configurable:!0}}),(0,_.Z)(O,h)},A(L)}},48627:function(N){N.exports={container:"container___2RXc3"}},18398:function(N){N.exports={_ppcard:"_ppcard___1sR0b",title:"title___2fjZe",shadow:"shadow___3SaOl",main:"main___IOVJu",block_l:"block_l___1ywNh",block_r:"block_r___Sg4L7",goup:"goup___1vznA"}},44943:function(){},11428:function(N,I,e){"use strict";var R=e(67294),_=e(48627),o=e.n(_),m=e(85893),b=function(L){return(0,m.jsx)("div",{className:"".concat(o().container),style:{backgroundImage:"url(./pics/background.png)"},children:L.children})};I.Z=b},68370:function(N,I,e){"use strict";e.r(I),e.d(I,{default:function(){return z}});var R=e(34792),_=e(48086),o=e(67294),m=e(48971),b=e(57663),A=e(71577),L=e(88983),M=e(47933),U=e(47673),h=e(24044),O=e(9715),p=e(93766),x=e(2824),T=e(91220),B=e(89032),j=e(15746),y=e(11849),g=e(13062),C=e(71230),G=e(11700),J=e(18398),S=e.n(J),$=e(37071),V=e(91156),H=e(64322),i=e(85893),X=function(u){return(0,i.jsxs)("div",{className:S()._ppcard,style:u.style,children:[(0,i.jsx)(C.Z,{className:S().titleRow,style:{display:u.title?void 0:"none"},children:(0,i.jsx)(G.Z,{className:S().title,children:u.title})}),(0,i.jsx)(C.Z,{style:{marginTop:26},children:(0,i.jsx)(j.Z,{span:24,style:(0,y.Z)({paddingLeft:30,paddingRight:30,textAlign:"center"},u.innerStyle),children:u.children})})]})};function s(K){var u="",P=(0,T.Z)(K),Z;try{for(P.s();!(Z=P.n()).done;){var F=Z.value;F.endsWith("/")?u+=F:u+=F+"/"}}catch(w){P.e(w)}finally{P.f()}return u}var v=function(u){console.log("render ppcreater",u);var P=(0,H.Gd)(o.useState),Z=$.Z.getQueryVariable("projectId");console.log("projectId",Z);var F=function(t){Z?P.update(Z,{name:t.name,description:t.description,dataDir:s(t.dataDir),labelDir:t.labelDir}).then(function(){m.m8.push("/welcome")}):P.create({name:t.name,description:t.description,taskCategoryId:V.ux[u.taskCategory].id,dataDir:s(t.dataDir),labelDir:t.labelDir}).then(function(f){m.m8.push("/".concat((0,V.LV)(u.taskCategory),"?projectId=").concat(f.projectId))}).catch(function(){})},w=u.taskCategory?V.ux[u.taskCategory].name:null,r=p.Z.useForm(),n=(0,x.Z)(r,1),l=n[0];return(0,o.useEffect)(function(){P.getCurr(Z).then(function(a){console.log("project",a);var t={name:a==null?void 0:a.name,description:a==null?void 0:a.description};l.setFieldsValue(t)})},[]),(0,i.jsxs)("div",{className:S().shadow,style:u.style,children:[(0,i.jsx)("div",{id:"left",className:S().block_l,children:(0,i.jsx)(X,{title:w,style:{height:760,padding:"1.25rem 0"},children:(0,i.jsxs)(p.Z,{form:l,layout:"horizontal",size:"large",style:{marginTop:"5.69rem"},onFinish:function(t){F(t)},children:[(0,i.jsx)(p.Z.Item,{name:"name",label:"Project Name",labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!0,message:"Please input project name!"}],style:{fontSize:"1.5rem"},children:(0,i.jsx)(h.Z,{size:"large",placeholder:"Words or numbers",style:{height:"3.13rem"}})}),(0,i.jsx)(p.Z.Item,{name:"dataDir",label:"Dataset Path",labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!0,message:"Please input dataset path!"}],style:{fontSize:"1.5rem"},children:(0,i.jsx)(h.Z,{size:"large",placeholder:"Dataset Path",style:{height:"3.13rem"}})}),(0,i.jsx)(p.Z.Item,{name:"description",label:"Description",labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!1}],style:{fontSize:"1.5rem"},children:(0,i.jsx)(h.Z,{size:"large",placeholder:"Words or numbers",style:{height:"3.13rem"}})}),(0,i.jsx)(p.Z.Item,{name:"maxPoints",label:"MaxPoints",labelCol:{span:6},wrapperCol:{span:16},rules:[{required:u.taskCategory=="keypointDetection",message:"Please input max points!"}],style:{fontSize:"1.5rem",display:u.taskCategory=="keypointDetection"?void 0:"none"},children:(0,i.jsx)(h.Z,{size:"large",placeholder:"Numbers (Int)",style:{height:"3.13rem"}})}),(0,i.jsx)(p.Z.Item,{name:"segmentationMode",label:"AnnotationMode",labelCol:{span:6},wrapperCol:{span:16},rules:[{required:u.taskCategory=="semanticSegmentation",message:"Please select task category!"}],style:{fontSize:"1.5rem",display:u.taskCategory=="semanticSegmentation"?void 0:"none"},children:(0,i.jsx)("div",{className:S().goup,children:(0,i.jsxs)(M.ZP.Group,{defaultValue:1,size:"large",style:{height:"3.13rem"},children:[(0,i.jsx)(M.ZP,{value:1,children:"Pixel model"}),(0,i.jsx)(M.ZP,{value:2,children:"Polygon mode"})]})})}),(0,i.jsxs)(p.Z.Item,{wrapperCol:{span:16,offset:6},children:[(0,i.jsx)(A.Z,{htmlType:"submit",type:"primary",style:{height:"2.5rem",width:"48%"},block:!0,children:Z?"Update":"Create"}),"\xA0\xA0",(0,i.jsx)(A.Z,{htmlType:"button",style:{height:"2.5rem",width:"48%"},block:!0,onClick:function(){m.m8.push("/welcome")},children:"Cancel"})]})]})})}),(0,i.jsx)("div",{id:"right",className:S().block_r,children:(0,i.jsx)(X,{style:{height:"43.63rem",padding:"0.5rem 0"},children:(0,i.jsx)("img",{src:u.imgSrc,style:{height:"43.63rem",width:"60rem"}})})})]})},E=v,c=e(11428),d=function(){var u=(0,V.os)($.Z.getQueryVariable("taskCategory"));return u||(_.default.error("Task Category not present in url"),m.m8.push("/project_creation")),u in V.ux||(_.default.error("Invalid task category "+u),m.m8.push("/project_creation")),(0,i.jsx)(c.Z,{children:(0,i.jsx)(E,{imgSrc:"./pics/illustration.jpg",taskCategory:u})})},z=d},91156:function(N,I,e){"use strict";e.d(I,{F$:function(){return T},LV:function(){return J},os:function(){return S},ux:function(){return $}});var R=e(34792),_=e(94043),o=e.n(_),m=e(37071),b=e(81139),A=e(63891),L=e(13868),M=e(70676),U=e(54919),h=e(6276),O=e(59124),p=localStorage.getItem("basePath"),x=new b.VK(p?{basePath:p}:void 0),T=new A.U(x),B=new L.v(x),j=new U.W(x),y=new h.s(x),g=new O.C(x);function C(r){return JSON.parse(JSON.stringify(r))}var G=function(n,l,a){if(!a)return-1;for(var t=0;t<l.length;t++)if(n[a]==l[t][a])return t;return-1};function J(r){return r&&r.replace(/[A-Z]/g,function(n){return"_".concat(n.toLowerCase())})}function S(r){return r&&(r.toLowerCase().replace(/([-_][a-z])/g,function(n){return n.toUpperCase().replace("-","").replace("_","")}),r)}var $={classification:{name:"Image Classification",avatar:"./pics/classification.jpg",id:1},detection:{name:"Detection",avatar:"./pics/object_detection.jpg",id:2},semanticSegmentation:{name:"Semantic Segmentation",avatar:"./pics/semantic_segmentation.jpg",id:3},instanceSegmentation:{name:"Instance Segmentation",avatar:"./pics/instance_segmentation.jpg",id:4},keypointDetection:{name:"Keypoint Detection",avatar:"./pics/keypoint_detection.jpg",id:5}},V=function(n,l){var a=_toConsumableArray(n);for(var t in n)a[t].active=!1;for(var f in n)G(n[f],l,"labelId")!=-1&&(a[f].active=!0);return console.log("activa labs",a),a};function H(r){return i.apply(this,arguments)}function i(){return i=_asyncToGenerator(_regeneratorRuntime.mark(function r(n){return _regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:T.getAll().then(function(t){console.log("get all projects",C(t)),n(C(t))}).catch(function(t){serviceUtils.parseError(t,_message)});case 1:case"end":return a.stop()}},r)})),i.apply(this,arguments)}function X(r){return s.apply(this,arguments)}function s(){return s=_asyncToGenerator(_regeneratorRuntime.mark(function r(n){var l,a=arguments;return _regeneratorRuntime.wrap(function(f){for(;;)switch(f.prev=f.next){case 0:l=a.length>1&&a[1]!==void 0?a[1]:null,console.log("get project id ",n),T.get(n).then(function(W){return console.log("getProject res",W),l&&l(W),W}).catch(function(W){console.log("getProject err",W),serviceUtils.parseError(W,_message)});case 3:case"end":return f.stop()}},r)})),s.apply(this,arguments)}function v(r,n){return E.apply(this,arguments)}function E(){return E=_asyncToGenerator(_regeneratorRuntime.mark(function r(n,l){return _regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:console.log("delete pj, pjid",n),T.remove(n).then(function(f){console.log("delete project",f),H(l)}).catch(function(f){console.log(f),serviceUtils.parseError(f,_message)});case 2:case"end":return t.stop()}},r)})),E.apply(this,arguments)}function c(r){return d.apply(this,arguments)}function d(){return d=_asyncToGenerator(_regeneratorRuntime.mark(function r(n){return _regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:y.getAll().then(function(t){console.log("got tasks",t),n&&n(t)}).catch(function(t){console.log("get tasks err",t),serviceUtils.parseError(t,_message)});case 1:case"end":return a.stop()}},r)})),d.apply(this,arguments)}function z(r,n){return K.apply(this,arguments)}function K(){return K=_asyncToGenerator(_regeneratorRuntime.mark(function r(n,l){return _regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:console.log("get task id",n),y.get(n).then(function(f){console.log("got task ",f),l&&l(f)});case 2:case"end":return t.stop()}},r)})),K.apply(this,arguments)}function u(r){return P.apply(this,arguments)}function P(){return P=_asyncToGenerator(_regeneratorRuntime.mark(function r(n){var l,a,t,f,W;return _regeneratorRuntime.wrap(function(D){for(;;)switch(D.prev=D.next){case 0:if(n){D.next=2;break}return D.abrupt("return",0);case 2:return D.prev=2,D.next=5,T.getTasks(n);case 5:l=D.sent,a=0,t=_createForOfIteratorHelper(l);try{for(t.s();!(f=t.n()).done;)W=f.value,W.annotations.length!=0&&a++}catch(Q){t.e(Q)}finally{t.f()}return console.log("progress",Math.ceil(a/l.length*100)),D.abrupt("return",Math.ceil(a/l.length*100));case 13:return D.prev=13,D.t0=D.catch(2),console.log("get progress err",D.t0),serviceUtils.parseError(D.t0,_message),D.abrupt("return",0);case 18:case"end":return D.stop()}},r,null,[[2,13]])})),P.apply(this,arguments)}function Z(r,n){console.log("getLabels projectid",r),!!r&&T.getLabels(r).then(function(l){console.log("got labels ",l),n(C(l))}).catch(function(l){serviceUtils.parseError(l,_message)})}function F(r,n,l){var a=LabelFromJSON(n);a.projectId=r,B.create(a).then(function(){Z(r,l)}).catch(function(t){serviceUtils.parseError(t,_message)})}function w(r,n){console.log("delete label",r),B.remove(r.labelId).then(function(){_message.error("Label "+r.name+" is deleted!"),Z(r.projectId,n)}).catch(function(l){serviceUtils.parseError(l,_message)})}},5467:function(N,I,e){"use strict";e.d(I,{Z:function(){return R}});function R(_){return Object.keys(_).reduce(function(o,m){return(m.substr(0,5)==="data-"||m.substr(0,5)==="aria-"||m==="role")&&m.substr(0,7)!=="data-__"&&(o[m]=_[m]),o},{})}},47933:function(N,I,e){"use strict";e.d(I,{ZP:function(){return X}});var R=e(96156),_=e(22122),o=e(67294),m=e(50132),b=e(94184),A=e.n(b),L=e(42550),M=e(65632),U=o.createContext(null),h=U.Provider,O=U,p=e(21687),x=function(s,v){var E={};for(var c in s)Object.prototype.hasOwnProperty.call(s,c)&&v.indexOf(c)<0&&(E[c]=s[c]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var d=0,c=Object.getOwnPropertySymbols(s);d<c.length;d++)v.indexOf(c[d])<0&&Object.prototype.propertyIsEnumerable.call(s,c[d])&&(E[c[d]]=s[c[d]]);return E},T=function(v,E){var c,d=o.useContext(O),z=o.useContext(M.E_),K=z.getPrefixCls,u=z.direction,P=o.useRef(),Z=(0,L.sQ)(E,P);o.useEffect(function(){(0,p.Z)(!("optionType"in v),"Radio","`optionType` is only support in Radio.Group.")},[]);var F=function(D){var Q,Y;(Q=v.onChange)===null||Q===void 0||Q.call(v,D),(Y=d==null?void 0:d.onChange)===null||Y===void 0||Y.call(d,D)},w=v.prefixCls,r=v.className,n=v.children,l=v.style,a=x(v,["prefixCls","className","children","style"]),t=K("radio",w),f=(0,_.Z)({},a);d&&(f.name=d.name,f.onChange=F,f.checked=v.value===d.value,f.disabled=v.disabled||d.disabled);var W=A()("".concat(t,"-wrapper"),(c={},(0,R.Z)(c,"".concat(t,"-wrapper-checked"),f.checked),(0,R.Z)(c,"".concat(t,"-wrapper-disabled"),f.disabled),(0,R.Z)(c,"".concat(t,"-wrapper-rtl"),u==="rtl"),c),r);return o.createElement("label",{className:W,style:l,onMouseEnter:v.onMouseEnter,onMouseLeave:v.onMouseLeave},o.createElement(m.Z,(0,_.Z)({},f,{type:"radio",prefixCls:t,ref:Z})),n!==void 0?o.createElement("span",null,n):null)},B=o.forwardRef(T);B.displayName="Radio";var j=B,y=e(28481),g=e(21770),C=e(97647),G=e(5467),J=o.forwardRef(function(s,v){var E=o.useContext(M.E_),c=E.getPrefixCls,d=E.direction,z=o.useContext(C.Z),K=(0,g.Z)(s.defaultValue,{value:s.value}),u=(0,y.Z)(K,2),P=u[0],Z=u[1],F=function(n){var l=P,a=n.target.value;"value"in s||Z(a);var t=s.onChange;t&&a!==l&&t(n)},w=function(){var n,l=s.prefixCls,a=s.className,t=a===void 0?"":a,f=s.options,W=s.optionType,q=s.buttonStyle,D=q===void 0?"outline":q,Q=s.disabled,Y=s.children,oe=s.size,se=s.style,le=s.id,ie=s.onMouseEnter,ce=s.onMouseLeave,te=c("radio",l),ee="".concat(te,"-group"),ne=Y;if(f&&f.length>0){var re=W==="button"?"".concat(te,"-button"):te;ne=f.map(function(k){return typeof k=="string"||typeof k=="number"?o.createElement(j,{key:k.toString(),prefixCls:re,disabled:Q,value:k,checked:P===k},k):o.createElement(j,{key:"radio-group-value-options-".concat(k.value),prefixCls:re,disabled:k.disabled||Q,value:k.value,checked:P===k.value,style:k.style},k.label)})}var ae=oe||z,ue=A()(ee,"".concat(ee,"-").concat(D),(n={},(0,R.Z)(n,"".concat(ee,"-").concat(ae),ae),(0,R.Z)(n,"".concat(ee,"-rtl"),d==="rtl"),n),t);return o.createElement("div",(0,_.Z)({},(0,G.Z)(s),{className:ue,style:se,onMouseEnter:ie,onMouseLeave:ce,id:le,ref:v}),ne)};return o.createElement(h,{value:{onChange:F,value:P,disabled:s.disabled,name:s.name}},w())}),S=o.memo(J),$=function(s,v){var E={};for(var c in s)Object.prototype.hasOwnProperty.call(s,c)&&v.indexOf(c)<0&&(E[c]=s[c]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var d=0,c=Object.getOwnPropertySymbols(s);d<c.length;d++)v.indexOf(c[d])<0&&Object.prototype.propertyIsEnumerable.call(s,c[d])&&(E[c[d]]=s[c[d]]);return E},V=function(v,E){var c=o.useContext(O),d=o.useContext(M.E_),z=d.getPrefixCls,K=v.prefixCls,u=$(v,["prefixCls"]),P=z("radio-button",K);return c&&(u.checked=v.value===c.value,u.disabled=v.disabled||c.disabled),o.createElement(j,(0,_.Z)({prefixCls:P},u,{type:"radio",ref:E}))},H=o.forwardRef(V),i=j;i.Button=H,i.Group=S;var X=i},88983:function(N,I,e){"use strict";var R=e(38663),_=e.n(R),o=e(44943),m=e.n(o)},50132:function(N,I,e){"use strict";var R=e(22122),_=e(96156),o=e(81253),m=e(28991),b=e(6610),A=e(5991),L=e(10379),M=e(81907),U=e(67294),h=e(94184),O=e.n(h),p=function(x){(0,L.Z)(B,x);var T=(0,M.Z)(B);function B(j){var y;(0,b.Z)(this,B),y=T.call(this,j),y.handleChange=function(C){var G=y.props,J=G.disabled,S=G.onChange;J||("checked"in y.props||y.setState({checked:C.target.checked}),S&&S({target:(0,m.Z)((0,m.Z)({},y.props),{},{checked:C.target.checked}),stopPropagation:function(){C.stopPropagation()},preventDefault:function(){C.preventDefault()},nativeEvent:C.nativeEvent}))},y.saveInput=function(C){y.input=C};var g="checked"in j?j.checked:j.defaultChecked;return y.state={checked:g},y}return(0,A.Z)(B,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"render",value:function(){var y,g=this.props,C=g.prefixCls,G=g.className,J=g.style,S=g.name,$=g.id,V=g.type,H=g.disabled,i=g.readOnly,X=g.tabIndex,s=g.onClick,v=g.onFocus,E=g.onBlur,c=g.onKeyDown,d=g.onKeyPress,z=g.onKeyUp,K=g.autoFocus,u=g.value,P=g.required,Z=(0,o.Z)(g,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","onKeyDown","onKeyPress","onKeyUp","autoFocus","value","required"]),F=Object.keys(Z).reduce(function(n,l){return(l.substr(0,5)==="aria-"||l.substr(0,5)==="data-"||l==="role")&&(n[l]=Z[l]),n},{}),w=this.state.checked,r=O()(C,G,(y={},(0,_.Z)(y,"".concat(C,"-checked"),w),(0,_.Z)(y,"".concat(C,"-disabled"),H),y));return U.createElement("span",{className:r,style:J},U.createElement("input",(0,R.Z)({name:S,id:$,type:V,required:P,readOnly:i,disabled:H,tabIndex:X,className:"".concat(C,"-input"),checked:!!w,onClick:s,onFocus:v,onBlur:E,onKeyUp:z,onKeyDown:c,onKeyPress:d,onChange:this.handleChange,autoFocus:K,ref:this.saveInput,value:u},F)),U.createElement("span",{className:"".concat(C,"-inner")}))}}],[{key:"getDerivedStateFromProps",value:function(y,g){return"checked"in y?(0,m.Z)((0,m.Z)({},g),{},{checked:y.checked}):null}}]),B}(U.Component);p.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){},onKeyDown:function(){},onKeyPress:function(){},onKeyUp:function(){}},I.Z=p}}]);