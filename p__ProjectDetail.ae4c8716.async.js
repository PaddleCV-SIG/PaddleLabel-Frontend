(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[498],{91220:function(F,j,e){"use strict";e.d(j,{Z:function(){return f}});var p=e(64254);function f(t,d){var y;if(typeof Symbol=="undefined"||t[Symbol.iterator]==null){if(Array.isArray(t)||(y=(0,p.Z)(t))||d&&t&&typeof t.length=="number"){y&&(t=y);var I=0,S=function(){};return{s:S,n:function(){return I>=t.length?{done:!0}:{done:!1,value:t[I++]}},e:function(C){throw C},f:S}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var x=!0,R=!1,m;return{s:function(){y=t[Symbol.iterator]()},n:function(){var C=y.next();return x=C.done,C},e:function(C){R=!0,m=C},f:function(){try{!x&&y.return!=null&&y.return()}finally{if(R)throw m}}}}},41435:function(F,j,e){"use strict";e.d(j,{Z:function(){return I}});var p=e(94663),f=e(80112);function t(S){return Function.toString.call(S).indexOf("[native code]")!==-1}var d=e(18597);function y(S,x,R){return(0,d.Z)()?y=Reflect.construct:y=function(g,C,_){var O=[null];O.push.apply(O,C);var K=Function.bind.apply(g,O),b=new K;return _&&(0,f.Z)(b,_.prototype),b},y.apply(null,arguments)}function I(S){var x=typeof Map=="function"?new Map:void 0;return I=function(m){if(m===null||!t(m))return m;if(typeof m!="function")throw new TypeError("Super expression must either be null or a function");if(typeof x!="undefined"){if(x.has(m))return x.get(m);x.set(m,g)}function g(){return y(m,arguments,(0,p.Z)(this).constructor)}return g.prototype=Object.create(m.prototype,{constructor:{value:g,enumerable:!1,writable:!0,configurable:!0}}),(0,f.Z)(g,m)},I(S)}},48627:function(F){F.exports={container:"container___2RXc3"}},18398:function(F){F.exports={_ppcard:"_ppcard___1sR0b",title:"title___2fjZe",shadow:"shadow___3SaOl",main:"main___IOVJu",block_l:"block_l___1ywNh",block_r:"block_r___Sg4L7",goup:"goup___1vznA"}},44943:function(){},11428:function(F,j,e){"use strict";var p=e(67294),f=e(48627),t=e.n(f),d=e(85893),y=function(S){return(0,d.jsx)("div",{className:"".concat(t().container),style:{backgroundImage:"url(./pics/background.png)"},children:S.children})};j.Z=y},68370:function(F,j,e){"use strict";e.r(j),e.d(j,{default:function(){return U}});var p=e(34792),f=e(48086),t=e(67294),d=e(48971),y=e(20228),I=e(11382),S=e(57663),x=e(71577),R=e(88983),m=e(47933),g=e(47673),C=e(24044),_=e(9715),O=e(93766),K=e(2824),b=e(89032),v=e(15746),o=e(11849),Z=e(13062),W=e(71230),$=e(1870),w=e(11700),H=e(18398),k=e.n(H),Q=e(37071),E=e(98731),a=e(85893),n=function(l){return(0,a.jsxs)("div",{className:k()._ppcard,style:l.style,children:[(0,a.jsx)(W.Z,{className:k().titleRow,style:{display:l.title?void 0:"none"},children:(0,a.jsx)(w.Z,{className:k().title,children:l.title})}),(0,a.jsx)(W.Z,{style:{marginTop:26},children:(0,a.jsx)(v.Z,{span:24,style:(0,o.Z)({paddingLeft:30,paddingRight:30,textAlign:"center"},l.innerStyle),children:l.children})})]})},i=function(l){var h=(0,E.Gd)(t.useState),T=Q.Z.getQueryVariable("projectId"),J=(0,t.useState)(!1),G=(0,K.Z)(J,2),X=G[0],D=G[1],c=(0,E.Ad)("component.PPCreater"),V=function(M){D(!0),T?h.update(T,(0,o.Z)({},M)).then(function(){d.m8.push("/project_overview?projectId=".concat(T))}):h.create((0,o.Z)((0,o.Z)({},M),{},{taskCategoryId:E.ux[l.taskCategory].id})).catch(function(L){Q.Z.parseError(L,f.default),D(!1)}).then(function(L){L&&d.m8.push("/".concat((0,E.LV)(l.taskCategory),"?projectId=").concat(L.projectId))})},A=O.Z.useForm(),B=(0,K.Z)(A,1),Y=B[0];return(0,t.useEffect)(function(){h.getCurr(T).then(function(u){console.log("project",u);var M={name:u==null?void 0:u.name,description:u==null?void 0:u.description,dataDir:u==null?void 0:u.dataDir,labelDir:u==null?void 0:u.labelDir,labelFormat:u==null?void 0:u.labelFormat};console.log("values",M),Y.setFieldsValue(M)})},[]),(0,a.jsx)("div",{className:k().shadow,style:l.style,children:(0,a.jsxs)(I.Z,{tip:"Import in progress",spinning:X,children:[(0,a.jsx)("div",{id:"left",className:k().block_l,children:(0,a.jsx)(n,{title:c(l.taskCategory,"global")+c("project","global"),style:{height:760,padding:"1.25rem 0"},children:(0,a.jsxs)(O.Z,{form:Y,layout:"horizontal",size:"large",style:{marginTop:"5.69rem"},onFinish:function(M){console.log(M),V(M)},children:[(0,a.jsx)(O.Z.Item,{name:"name",label:c("projectName"),labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!0,message:"Please input project name!"}],style:{fontSize:"1.5rem"},children:(0,a.jsx)(C.Z,{size:"large",placeholder:c("anyString","global"),style:{height:"3.13rem"}})}),(0,a.jsx)(O.Z.Item,{name:"dataDir",label:(0,a.jsxs)("div",{children:[c("datasePath")," ",(0,a.jsx)($.Z,{style:{fontSize:"12px"},onClick:function(){return f.default.info({content:"The root directory of the dataset, where all images and labels are. Click here for more detail.",onClick:function(){return window.open("https://github.com/PaddleCV-SIG/PP-Label/blob/develop/doc/dataset_file_structure.md#".concat(l.taskCategory))}})}})]}),labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!0,message:"Please input dataset path!"}],style:{fontSize:"1.5rem"},children:(0,a.jsx)(C.Z,{size:"large",placeholder:c("absolutePath","global"),style:{height:"3.13rem"},disabled:T!=null})}),(0,a.jsx)(O.Z.Item,{name:"description",label:c("description"),labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!1}],style:{fontSize:"1.5rem"},children:(0,a.jsx)(C.Z,{size:"large",placeholder:c("anyString","global"),style:{height:"3.13rem"}})}),(0,a.jsx)(O.Z.Item,{name:"labelFormat",label:(0,a.jsxs)("div",{children:[c("labelFormat"),(0,a.jsx)($.Z,{style:{fontSize:"12px"},onClick:function(){return f.default.info({content:"Choose the format to import/export dataset. Click here to see details.",onClick:function(){window.open("https://github.com/PaddleCV-SIG/PP-Label/blob/develop/doc/dataset_file_structure.md#".concat(l.taskCategory))}})}})]}),labelCol:{span:6},wrapperCol:{span:16},rules:[{required:E.ux[l.taskCategory].labelFormats!=null,message:"Please choose a label import/export format"}],style:{fontSize:"1.5rem",display:E.ux[l.taskCategory].labelFormats!=null?void 0:"none"},children:(0,a.jsx)(m.ZP.Group,{size:"large",style:{height:"3.13rem"},children:Object.keys(E.ux[l.taskCategory].labelFormats).map(function(u){return(0,a.jsx)(m.ZP,{value:u,children:c((0,E.os)(u),"global.labelFormat")},u)})})}),(0,a.jsx)(O.Z.Item,{name:"maxPoints",label:c("maxPoints"),labelCol:{span:6},wrapperCol:{span:16},rules:[{required:l.taskCategory=="keypointDetection",message:"Please input max points!"}],style:{fontSize:"1.5rem",display:l.taskCategory=="keypointDetection"?void 0:"none"},children:(0,a.jsx)(C.Z,{size:"large",placeholder:"Numbers (Int)",style:{height:"3.13rem"}})}),(0,a.jsxs)(O.Z.Item,{wrapperCol:{span:16,offset:6},children:[(0,a.jsx)(x.Z,{htmlType:"submit",type:"primary",style:{height:"2.5rem",width:"48%"},block:!0,children:c(T?"update":"create")}),"\xA0\xA0",(0,a.jsx)(x.Z,{htmlType:"button",style:{height:"2.5rem",width:"48%"},block:!0,onClick:function(){d.m8.goBack()},children:c("cancel")})]})]})})}),(0,a.jsx)("div",{id:"right",className:k().block_r,children:(0,a.jsx)(n,{style:{height:"43.63rem",padding:"0.5rem 0"},children:(0,a.jsx)("img",{src:l.imgSrc,style:{width:"40rem"}})})})]})})},P=i,r=e(11428),s=function(){(0,E.bo)();var l=(0,E.Ad)("pages.projectDetail"),h=Q.Z.getQueryVariable("taskCategory");return console.log(h),h?h in E.ux?(0,a.jsx)(r.Z,{children:(0,a.jsx)(P,{imgSrc:"./pics/illustration.jpg",taskCategory:h})}):(f.default.error(l("invalidTaskCategory")+" "+h),d.m8.push("/"),null):(f.default.error(l("noTaskCategory")),d.m8.push("/"),null)},U=s},5467:function(F,j,e){"use strict";e.d(j,{Z:function(){return p}});function p(f){return Object.keys(f).reduce(function(t,d){return(d.substr(0,5)==="data-"||d.substr(0,5)==="aria-"||d==="role")&&d.substr(0,7)!=="data-__"&&(t[d]=f[d]),t},{})}},47933:function(F,j,e){"use strict";e.d(j,{ZP:function(){return a}});var p=e(96156),f=e(22122),t=e(67294),d=e(50132),y=e(94184),I=e.n(y),S=e(42550),x=e(65632),R=t.createContext(null),m=R.Provider,g=R,C=e(21687),_=function(n,i){var P={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&i.indexOf(r)<0&&(P[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)i.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(P[r[s]]=n[r[s]]);return P},O=function(i,P){var r,s=t.useContext(g),U=t.useContext(x.E_),z=U.getPrefixCls,l=U.direction,h=t.useRef(),T=(0,S.sQ)(P,h);t.useEffect(function(){(0,C.Z)(!("optionType"in i),"Radio","`optionType` is only support in Radio.Group.")},[]);var J=function(M){var L,q;(L=i.onChange)===null||L===void 0||L.call(i,M),(q=s==null?void 0:s.onChange)===null||q===void 0||q.call(s,M)},G=i.prefixCls,X=i.className,D=i.children,c=i.style,V=_(i,["prefixCls","className","children","style"]),A=z("radio",G),B=(0,f.Z)({},V);s&&(B.name=s.name,B.onChange=J,B.checked=i.value===s.value,B.disabled=i.disabled||s.disabled);var Y=I()("".concat(A,"-wrapper"),(r={},(0,p.Z)(r,"".concat(A,"-wrapper-checked"),B.checked),(0,p.Z)(r,"".concat(A,"-wrapper-disabled"),B.disabled),(0,p.Z)(r,"".concat(A,"-wrapper-rtl"),l==="rtl"),r),X);return t.createElement("label",{className:Y,style:c,onMouseEnter:i.onMouseEnter,onMouseLeave:i.onMouseLeave},t.createElement(d.Z,(0,f.Z)({},B,{type:"radio",prefixCls:A,ref:T})),D!==void 0?t.createElement("span",null,D):null)},K=t.forwardRef(O);K.displayName="Radio";var b=K,v=e(28481),o=e(21770),Z=e(97647),W=e(5467),$=t.forwardRef(function(n,i){var P=t.useContext(x.E_),r=P.getPrefixCls,s=P.direction,U=t.useContext(Z.Z),z=(0,o.Z)(n.defaultValue,{value:n.value}),l=(0,v.Z)(z,2),h=l[0],T=l[1],J=function(D){var c=h,V=D.target.value;"value"in n||T(V);var A=n.onChange;A&&V!==c&&A(D)},G=function(){var D,c=n.prefixCls,V=n.className,A=V===void 0?"":V,B=n.options,Y=n.optionType,u=n.buttonStyle,M=u===void 0?"outline":u,L=n.disabled,q=n.children,le=n.size,oe=n.style,se=n.id,ie=n.onMouseEnter,ue=n.onMouseLeave,te=r("radio",c),ee="".concat(te,"-group"),ne=q;if(B&&B.length>0){var ae=Y==="button"?"".concat(te,"-button"):te;ne=B.map(function(N){return typeof N=="string"||typeof N=="number"?t.createElement(b,{key:N.toString(),prefixCls:ae,disabled:L,value:N,checked:h===N},N):t.createElement(b,{key:"radio-group-value-options-".concat(N.value),prefixCls:ae,disabled:N.disabled||L,value:N.value,checked:h===N.value,style:N.style},N.label)})}var re=le||U,de=I()(ee,"".concat(ee,"-").concat(M),(D={},(0,p.Z)(D,"".concat(ee,"-").concat(re),re),(0,p.Z)(D,"".concat(ee,"-rtl"),s==="rtl"),D),A);return t.createElement("div",(0,f.Z)({},(0,W.Z)(n),{className:de,style:oe,onMouseEnter:ie,onMouseLeave:ue,id:se,ref:i}),ne)};return t.createElement(m,{value:{onChange:J,value:h,disabled:n.disabled,name:n.name}},G())}),w=t.memo($),H=function(n,i){var P={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&i.indexOf(r)<0&&(P[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)i.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(P[r[s]]=n[r[s]]);return P},k=function(i,P){var r=t.useContext(g),s=t.useContext(x.E_),U=s.getPrefixCls,z=i.prefixCls,l=H(i,["prefixCls"]),h=U("radio-button",z);return r&&(l.checked=i.value===r.value,l.disabled=i.disabled||r.disabled),t.createElement(b,(0,f.Z)({prefixCls:h},l,{type:"radio",ref:P}))},Q=t.forwardRef(k),E=b;E.Button=Q,E.Group=w;var a=E},88983:function(F,j,e){"use strict";var p=e(38663),f=e.n(p),t=e(44943),d=e.n(t)},50132:function(F,j,e){"use strict";var p=e(22122),f=e(96156),t=e(81253),d=e(28991),y=e(6610),I=e(5991),S=e(10379),x=e(81907),R=e(67294),m=e(94184),g=e.n(m),C=function(_){(0,S.Z)(K,_);var O=(0,x.Z)(K);function K(b){var v;(0,y.Z)(this,K),v=O.call(this,b),v.handleChange=function(Z){var W=v.props,$=W.disabled,w=W.onChange;$||("checked"in v.props||v.setState({checked:Z.target.checked}),w&&w({target:(0,d.Z)((0,d.Z)({},v.props),{},{checked:Z.target.checked}),stopPropagation:function(){Z.stopPropagation()},preventDefault:function(){Z.preventDefault()},nativeEvent:Z.nativeEvent}))},v.saveInput=function(Z){v.input=Z};var o="checked"in b?b.checked:b.defaultChecked;return v.state={checked:o},v}return(0,I.Z)(K,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"render",value:function(){var v,o=this.props,Z=o.prefixCls,W=o.className,$=o.style,w=o.name,H=o.id,k=o.type,Q=o.disabled,E=o.readOnly,a=o.tabIndex,n=o.onClick,i=o.onFocus,P=o.onBlur,r=o.onKeyDown,s=o.onKeyPress,U=o.onKeyUp,z=o.autoFocus,l=o.value,h=o.required,T=(0,t.Z)(o,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","onKeyDown","onKeyPress","onKeyUp","autoFocus","value","required"]),J=Object.keys(T).reduce(function(D,c){return(c.substr(0,5)==="aria-"||c.substr(0,5)==="data-"||c==="role")&&(D[c]=T[c]),D},{}),G=this.state.checked,X=g()(Z,W,(v={},(0,f.Z)(v,"".concat(Z,"-checked"),G),(0,f.Z)(v,"".concat(Z,"-disabled"),Q),v));return R.createElement("span",{className:X,style:$},R.createElement("input",(0,p.Z)({name:w,id:H,type:k,required:h,readOnly:E,disabled:Q,tabIndex:a,className:"".concat(Z,"-input"),checked:!!G,onClick:n,onFocus:i,onBlur:P,onKeyUp:U,onKeyDown:r,onKeyPress:s,onChange:this.handleChange,autoFocus:z,ref:this.saveInput,value:l},J)),R.createElement("span",{className:"".concat(Z,"-inner")}))}}],[{key:"getDerivedStateFromProps",value:function(v,o){return"checked"in v?(0,d.Z)((0,d.Z)({},o),{},{checked:v.checked}):null}}]),K}(R.Component);C.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){},onKeyDown:function(){},onKeyPress:function(){},onKeyUp:function(){}},j.Z=C}}]);
