(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[498],{91220:function(F,Z,e){"use strict";e.d(Z,{Z:function(){return f}});var E=e(64254);function f(t,u){var g;if(typeof Symbol=="undefined"||t[Symbol.iterator]==null){if(Array.isArray(t)||(g=(0,E.Z)(t))||u&&t&&typeof t.length=="number"){g&&(t=g);var D=0,_=function(){};return{s:_,n:function(){return D>=t.length?{done:!0}:{done:!1,value:t[D++]}},e:function(m){throw m},f:_}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var O=!0,I=!1,v;return{s:function(){g=t[Symbol.iterator]()},n:function(){var m=g.next();return O=m.done,m},e:function(m){I=!0,v=m},f:function(){try{!O&&g.return!=null&&g.return()}finally{if(I)throw v}}}}},41435:function(F,Z,e){"use strict";e.d(Z,{Z:function(){return D}});var E=e(94663),f=e(80112);function t(_){return Function.toString.call(_).indexOf("[native code]")!==-1}var u=e(18597);function g(_,O,I){return(0,u.Z)()?g=Reflect.construct:g=function(C,m,M){var U=[null];U.push.apply(U,m);var k=Function.bind.apply(C,U),h=new k;return M&&(0,f.Z)(h,M.prototype),h},g.apply(null,arguments)}function D(_){var O=typeof Map=="function"?new Map:void 0;return D=function(v){if(v===null||!t(v))return v;if(typeof v!="function")throw new TypeError("Super expression must either be null or a function");if(typeof O!="undefined"){if(O.has(v))return O.get(v);O.set(v,C)}function C(){return g(v,arguments,(0,E.Z)(this).constructor)}return C.prototype=Object.create(v.prototype,{constructor:{value:C,enumerable:!1,writable:!0,configurable:!0}}),(0,f.Z)(C,v)},D(_)}},48627:function(F){F.exports={container:"container___2RXc3"}},18398:function(F){F.exports={_ppcard:"_ppcard___1sR0b",title:"title___2fjZe",shadow:"shadow___3SaOl",main:"main___IOVJu",block_l:"block_l___1ywNh",block_r:"block_r___Sg4L7",goup:"goup___1vznA"}},44943:function(){},11428:function(F,Z,e){"use strict";var E=e(67294),f=e(48627),t=e.n(f),u=e(85893),g=function(_){return(0,u.jsx)("div",{className:"".concat(t().container),style:{backgroundImage:"url(./pics/background.png)"},children:_.children})};Z.Z=g},68370:function(F,Z,e){"use strict";e.r(Z),e.d(Z,{default:function(){return r}});var E=e(34792),f=e(48086),t=e(67294),u=e(48971),g=e(57663),D=e(71577),_=e(88983),O=e(47933),I=e(47673),v=e(24044),C=e(9715),m=e(93766),M=e(2824),U=e(89032),k=e(15746),h=e(11849),y=e(13062),d=e(71230),x=e(1870),z=e(11700),w=e(18398),R=e.n(w),W=e(37071),S=e(98731),a=e(85893),G=function(l){return(0,a.jsxs)("div",{className:R()._ppcard,style:l.style,children:[(0,a.jsx)(d.Z,{className:R().titleRow,style:{display:l.title?void 0:"none"},children:(0,a.jsx)(z.Z,{className:R().title,children:l.title})}),(0,a.jsx)(d.Z,{style:{marginTop:26},children:(0,a.jsx)(k.Z,{span:24,style:(0,h.Z)({paddingLeft:30,paddingRight:30,textAlign:"center"},l.innerStyle),children:l.children})})]})},X=function(l){var T=(0,S.Gd)(t.useState),P=W.Z.getQueryVariable("projectId"),c=(0,u.YB)(),V=c.formatMessage({id:"component.PPCreater.projectName"}),Q=c.formatMessage({id:"component.PPCreater.datasePath"}),$=c.formatMessage({id:"component.PPCreater.description"}),Y=c.formatMessage({id:"component.PPCreater.maxPoints"}),j=c.formatMessage({id:"component.PPCreater.update"}),K=c.formatMessage({id:"component.PPCreater.create"}),L=c.formatMessage({id:"component.PPCreater.cancel"}),N=function(p){P?T.update(P,(0,h.Z)({},p)).then(function(){u.m8.push("/project_overview?projectId=".concat(P))}):T.create((0,h.Z)((0,h.Z)({},p),{},{taskCategoryId:S.ux[l.taskCategory].id})).then(function(J){u.m8.push("/".concat((0,S.LV)(l.taskCategory),"?projectId=").concat(J.projectId))}).catch(function(){})},B=l.taskCategory?S.ux[l.taskCategory].name:null,q=m.Z.useForm(),ee=(0,M.Z)(q,1),H=ee[0];return(0,t.useEffect)(function(){T.getCurr(P).then(function(s){console.log("project",s);var p={name:s==null?void 0:s.name,description:s==null?void 0:s.description,dataDir:s==null?void 0:s.dataDir,labelDir:s==null?void 0:s.labelDir,labelFormat:s==null?void 0:s.labelFormat};console.log("values",p),H.setFieldsValue(p)})},[]),(0,a.jsxs)("div",{className:R().shadow,style:l.style,children:[(0,a.jsx)("div",{id:"left",className:R().block_l,children:(0,a.jsx)(G,{title:B,style:{height:760,padding:"1.25rem 0"},children:(0,a.jsxs)(m.Z,{form:H,layout:"horizontal",size:"large",style:{marginTop:"5.69rem"},onFinish:function(p){console.log(p),N(p)},children:[(0,a.jsx)(m.Z.Item,{name:"name",label:V,labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!0,message:"Please input project name!"}],style:{fontSize:"1.5rem"},children:(0,a.jsx)(v.Z,{size:"large",placeholder:"Words or numbers",style:{height:"3.13rem"}})}),(0,a.jsx)(m.Z.Item,{name:"dataDir",label:(0,a.jsxs)("div",{children:[Q," ",(0,a.jsx)(x.Z,{style:{fontSize:"12px"},onClick:function(){return f.default.info({content:"The root directory of the dataset, where all images and labels are. Click here for more detail.",onClick:function(){return window.open("https://github.com/PaddleCV-SIG/PP-Label/blob/develop/doc/dataset_file_structure.md#".concat(l.taskCategory))}})}})]}),labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!0,message:"Please input dataset path!"}],style:{fontSize:"1.5rem"},children:(0,a.jsx)(v.Z,{size:"large",placeholder:"Dataset Path",style:{height:"3.13rem"},disabled:P!=null})}),(0,a.jsx)(m.Z.Item,{name:"description",label:$,labelCol:{span:6},wrapperCol:{span:16},rules:[{required:!1}],style:{fontSize:"1.5rem"},children:(0,a.jsx)(v.Z,{size:"large",placeholder:"Project description",style:{height:"3.13rem"}})}),(0,a.jsx)(m.Z.Item,{name:"labelFormat",label:(0,a.jsxs)("div",{children:[" ","Label Format",(0,a.jsx)(x.Z,{style:{fontSize:"12px"},onClick:function(){return f.default.info({content:"Choose the format to import/export dataset. Click here to see details.",onClick:function(){window.open("https://github.com/PaddleCV-SIG/PP-Label/blob/develop/doc/dataset_file_structure.md#".concat(l.taskCategory))}})}})]}),labelCol:{span:6},wrapperCol:{span:16},rules:[{required:S.ux[l.taskCategory].labelFormats!=null,message:"Please choose a label import/export format"}],style:{fontSize:"1.5rem",display:S.ux[l.taskCategory].labelFormats!=null?void 0:"none"},children:(0,a.jsx)(O.ZP.Group,{size:"large",style:{height:"3.13rem"},children:Object.entries(S.ux[l.taskCategory].labelFormats).map(function(s){var p=(0,M.Z)(s,2),J=p[0],ne=p[1];return(0,a.jsx)(O.ZP,{value:J,children:ne},J)})})}),(0,a.jsx)(m.Z.Item,{name:"maxPoints",label:Y,labelCol:{span:6},wrapperCol:{span:16},rules:[{required:l.taskCategory=="keypointDetection",message:"Please input max points!"}],style:{fontSize:"1.5rem",display:l.taskCategory=="keypointDetection"?void 0:"none"},children:(0,a.jsx)(v.Z,{size:"large",placeholder:"Numbers (Int)",style:{height:"3.13rem"}})}),(0,a.jsxs)(m.Z.Item,{wrapperCol:{span:16,offset:6},children:[(0,a.jsx)(D.Z,{htmlType:"submit",type:"primary",style:{height:"2.5rem",width:"48%"},block:!0,children:P?j:K}),"\xA0\xA0",(0,a.jsx)(D.Z,{htmlType:"button",style:{height:"2.5rem",width:"48%"},block:!0,onClick:function(){u.m8.goBack()},children:L})]})]})})}),(0,a.jsx)("div",{id:"right",className:R().block_r,children:(0,a.jsx)(G,{style:{height:"43.63rem",padding:"0.5rem 0"},children:(0,a.jsx)("img",{src:l.imgSrc,style:{width:"40rem"}})})})]})},n=X,i=e(11428),b=function(){(0,S.bo)();var l=(0,u.YB)(),T=l.formatMessage({id:"pages.ProjectDetail.noTaskCategory"}),P=l.formatMessage({id:"pages.ProjectDetail.invalidTaskCategory"}),c=W.Z.getQueryVariable("taskCategory");if(console.log(c),!c){f.default.error(T),u.m8.push("/");return}if(!(c in S.ux)){f.default.error(P+" "+c),u.m8.push("/");return}return(0,a.jsx)(i.Z,{children:(0,a.jsx)(n,{imgSrc:"./pics/illustration.jpg",taskCategory:c})})},r=b},5467:function(F,Z,e){"use strict";e.d(Z,{Z:function(){return E}});function E(f){return Object.keys(f).reduce(function(t,u){return(u.substr(0,5)==="data-"||u.substr(0,5)==="aria-"||u==="role")&&u.substr(0,7)!=="data-__"&&(t[u]=f[u]),t},{})}},47933:function(F,Z,e){"use strict";e.d(Z,{ZP:function(){return X}});var E=e(96156),f=e(22122),t=e(67294),u=e(50132),g=e(94184),D=e.n(g),_=e(42550),O=e(65632),I=t.createContext(null),v=I.Provider,C=I,m=e(21687),M=function(n,i){var b={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&i.indexOf(r)<0&&(b[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(n);o<r.length;o++)i.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(n,r[o])&&(b[r[o]]=n[r[o]]);return b},U=function(i,b){var r,o=t.useContext(C),l=t.useContext(O.E_),T=l.getPrefixCls,P=l.direction,c=t.useRef(),V=(0,_.sQ)(b,c);t.useEffect(function(){(0,m.Z)(!("optionType"in i),"Radio","`optionType` is only support in Radio.Group.")},[]);var Q=function(H){var s,p;(s=i.onChange)===null||s===void 0||s.call(i,H),(p=o==null?void 0:o.onChange)===null||p===void 0||p.call(o,H)},$=i.prefixCls,Y=i.className,j=i.children,K=i.style,L=M(i,["prefixCls","className","children","style"]),N=T("radio",$),B=(0,f.Z)({},L);o&&(B.name=o.name,B.onChange=Q,B.checked=i.value===o.value,B.disabled=i.disabled||o.disabled);var q=D()("".concat(N,"-wrapper"),(r={},(0,E.Z)(r,"".concat(N,"-wrapper-checked"),B.checked),(0,E.Z)(r,"".concat(N,"-wrapper-disabled"),B.disabled),(0,E.Z)(r,"".concat(N,"-wrapper-rtl"),P==="rtl"),r),Y);return t.createElement("label",{className:q,style:K,onMouseEnter:i.onMouseEnter,onMouseLeave:i.onMouseLeave},t.createElement(u.Z,(0,f.Z)({},B,{type:"radio",prefixCls:N,ref:V})),j!==void 0?t.createElement("span",null,j):null)},k=t.forwardRef(U);k.displayName="Radio";var h=k,y=e(28481),d=e(21770),x=e(97647),z=e(5467),w=t.forwardRef(function(n,i){var b=t.useContext(O.E_),r=b.getPrefixCls,o=b.direction,l=t.useContext(x.Z),T=(0,d.Z)(n.defaultValue,{value:n.value}),P=(0,y.Z)(T,2),c=P[0],V=P[1],Q=function(j){var K=c,L=j.target.value;"value"in n||V(L);var N=n.onChange;N&&L!==K&&N(j)},$=function(){var j,K=n.prefixCls,L=n.className,N=L===void 0?"":L,B=n.options,q=n.optionType,ee=n.buttonStyle,H=ee===void 0?"outline":ee,s=n.disabled,p=n.children,J=n.size,ne=n.style,se=n.id,ie=n.onMouseEnter,ue=n.onMouseLeave,ae=r("radio",K),te="".concat(ae,"-group"),re=p;if(B&&B.length>0){var oe=q==="button"?"".concat(ae,"-button"):ae;re=B.map(function(A){return typeof A=="string"||typeof A=="number"?t.createElement(h,{key:A.toString(),prefixCls:oe,disabled:s,value:A,checked:c===A},A):t.createElement(h,{key:"radio-group-value-options-".concat(A.value),prefixCls:oe,disabled:A.disabled||s,value:A.value,checked:c===A.value,style:A.style},A.label)})}var le=J||l,de=D()(te,"".concat(te,"-").concat(H),(j={},(0,E.Z)(j,"".concat(te,"-").concat(le),le),(0,E.Z)(j,"".concat(te,"-rtl"),o==="rtl"),j),N);return t.createElement("div",(0,f.Z)({},(0,z.Z)(n),{className:de,style:ne,onMouseEnter:ie,onMouseLeave:ue,id:se,ref:i}),re)};return t.createElement(v,{value:{onChange:Q,value:c,disabled:n.disabled,name:n.name}},$())}),R=t.memo(w),W=function(n,i){var b={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&i.indexOf(r)<0&&(b[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(n);o<r.length;o++)i.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(n,r[o])&&(b[r[o]]=n[r[o]]);return b},S=function(i,b){var r=t.useContext(C),o=t.useContext(O.E_),l=o.getPrefixCls,T=i.prefixCls,P=W(i,["prefixCls"]),c=l("radio-button",T);return r&&(P.checked=i.value===r.value,P.disabled=i.disabled||r.disabled),t.createElement(h,(0,f.Z)({prefixCls:c},P,{type:"radio",ref:b}))},a=t.forwardRef(S),G=h;G.Button=a,G.Group=R;var X=G},88983:function(F,Z,e){"use strict";var E=e(38663),f=e.n(E),t=e(44943),u=e.n(t)},50132:function(F,Z,e){"use strict";var E=e(22122),f=e(96156),t=e(81253),u=e(28991),g=e(6610),D=e(5991),_=e(10379),O=e(81907),I=e(67294),v=e(94184),C=e.n(v),m=function(M){(0,_.Z)(k,M);var U=(0,O.Z)(k);function k(h){var y;(0,g.Z)(this,k),y=U.call(this,h),y.handleChange=function(x){var z=y.props,w=z.disabled,R=z.onChange;w||("checked"in y.props||y.setState({checked:x.target.checked}),R&&R({target:(0,u.Z)((0,u.Z)({},y.props),{},{checked:x.target.checked}),stopPropagation:function(){x.stopPropagation()},preventDefault:function(){x.preventDefault()},nativeEvent:x.nativeEvent}))},y.saveInput=function(x){y.input=x};var d="checked"in h?h.checked:h.defaultChecked;return y.state={checked:d},y}return(0,D.Z)(k,[{key:"focus",value:function(){this.input.focus()}},{key:"blur",value:function(){this.input.blur()}},{key:"render",value:function(){var y,d=this.props,x=d.prefixCls,z=d.className,w=d.style,R=d.name,W=d.id,S=d.type,a=d.disabled,G=d.readOnly,X=d.tabIndex,n=d.onClick,i=d.onFocus,b=d.onBlur,r=d.onKeyDown,o=d.onKeyPress,l=d.onKeyUp,T=d.autoFocus,P=d.value,c=d.required,V=(0,t.Z)(d,["prefixCls","className","style","name","id","type","disabled","readOnly","tabIndex","onClick","onFocus","onBlur","onKeyDown","onKeyPress","onKeyUp","autoFocus","value","required"]),Q=Object.keys(V).reduce(function(j,K){return(K.substr(0,5)==="aria-"||K.substr(0,5)==="data-"||K==="role")&&(j[K]=V[K]),j},{}),$=this.state.checked,Y=C()(x,z,(y={},(0,f.Z)(y,"".concat(x,"-checked"),$),(0,f.Z)(y,"".concat(x,"-disabled"),a),y));return I.createElement("span",{className:Y,style:w},I.createElement("input",(0,E.Z)({name:R,id:W,type:S,required:c,readOnly:G,disabled:a,tabIndex:X,className:"".concat(x,"-input"),checked:!!$,onClick:n,onFocus:i,onBlur:b,onKeyUp:l,onKeyDown:r,onKeyPress:o,onChange:this.handleChange,autoFocus:T,ref:this.saveInput,value:P},Q)),I.createElement("span",{className:"".concat(x,"-inner")}))}}],[{key:"getDerivedStateFromProps",value:function(y,d){return"checked"in y?(0,u.Z)((0,u.Z)({},d),{},{checked:y.checked}):null}}]),k}(I.Component);m.defaultProps={prefixCls:"rc-checkbox",className:"",style:{},type:"checkbox",defaultChecked:!1,onFocus:function(){},onBlur:function(){},onChange:function(){},onKeyDown:function(){},onKeyPress:function(){},onKeyUp:function(){}},Z.Z=m}}]);
