(self.webpackChunkpp_labeling_frontend=self.webpackChunkpp_labeling_frontend||[]).push([[972],{91220:function(i,L,n){"use strict";n.d(L,{Z:function(){return C}});var g=n(64254);function C(s,P){var a;if(typeof Symbol=="undefined"||s[Symbol.iterator]==null){if(Array.isArray(s)||(a=(0,g.Z)(s))||P&&s&&typeof s.length=="number"){a&&(s=a);var r=0,m=function(){};return{s:m,n:function(){return r>=s.length?{done:!0}:{done:!1,value:s[r++]}},e:function(o){throw o},f:m}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var f=!0,b=!1,I;return{s:function(){a=s[Symbol.iterator]()},n:function(){var o=a.next();return f=o.done,o},e:function(o){b=!0,I=o},f:function(){try{!f&&a.return!=null&&a.return()}finally{if(b)throw I}}}}},85024:function(i){i.exports={listItem:"listItem___u4Q82",eye:"eye___BwaRm",delete:"delete___31JB_",roundBall:"roundBall___23A7l",popover:"popover___1BNET",annotationId:"annotationId___zAzX4",labelName:"labelName___2ohxn",listItemActive:"listItemActive___2QnA3"}},56159:function(i){i.exports={labelList:"labelList___v7C6K",listHeader:"listHeader___1aY8R",eye:"eye___2MKbp",roundBall:"roundBall___187XH"}},57560:function(i){i.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___147XP",toolBarButtonContainer:"toolBarButtonContainer___ZEvhK",toolBarButton:"toolBarButton___1s2Rh",buttonText:"buttonText___3NTCv",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___2Utx8",popover:"popover___3PRoi"}},52822:function(i){i.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},5882:function(i){i.exports={listItem:"listItem___vtDXn",eye:"eye___AsLBS",roundBall:"roundBall___1J_R3",popover:"popover___1x-2R",listItemActive:"listItemActive___3FRb7"}},56131:function(i){i.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},78677:function(i){i.exports={container:"container___G0FNe"}},83930:function(i){i.exports={stage:"stage___3H5QL"}},80961:function(i){i.exports={toolbar:"toolbar___3vxli"}},82499:function(i){i.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},14836:function(i,L,n){"use strict";n.d(L,{Z:function(){return u}});var g=n(54421),C=n(38272),s=n(57663),P=n(71577),a=n(67294),r=n(56159),m=n.n(r),f=n(49111),b=n(19650),I=n(2824),t=n(11849),o=n(85024),l=n.n(o),c=n(63097),e=n(85893),B=function(_){var v=(0,t.Z)({},_.annotation),A=(0,a.useState)(v.invisible),h=(0,I.Z)(A,2),x=h[0],d=h[1];(0,a.useEffect)(function(){d(_.annotation.invisible)},[_.annotation.invisible]);var M=(0,e.jsxs)(C.ZP.Item,{className:"".concat(l().listItem," ").concat(_.active?l().listItemActive:""),unselectable:"on",onClick:function(){_.onClick(v)},children:[(0,e.jsxs)(b.Z,{align:"center",size:5,children:[(0,e.jsx)("a",{className:l().eye,style:{backgroundImage:x?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(){d(!x),_.onAnnotationModify(v)}})," ",(0,e.jsx)("span",{className:l().annotationId,children:v.annotationId}),(0,e.jsx)("span",{className:l().labelName,children:v.label.name}),(0,e.jsx)(c.Z,{color:v.label.color})]}),(0,e.jsx)("a",{className:l().delete,onClick:function(){v.delete=!0,_.onAnnotationDelete(v)}})]});return M},j=B,D=function(_){return(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(C.ZP,{className:m().labelList,size:"large",header:(0,e.jsx)("div",{className:m().listHeader,children:"Annotation List"}),bordered:!0,dataSource:_.annotations,renderItem:function(A){var h;return(0,e.jsx)(j,{onClick:_.onAnnotationSelect,annotation:A,active:A.annotationId==((h=_.selectedAnnotation)===null||h===void 0?void 0:h.annotationId),onAnnotationDelete:_.onAnnotationDelete,onAnnotationModify:_.onAnnotationModify})},footer:(0,e.jsx)("div",{children:(0,e.jsx)(P.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){_.onAnnotationSelect(void 0)},block:!0,children:"Add Annotation"})})})})},u=D},43801:function(i,L,n){"use strict";n.d(L,{Z:function(){return I}});var g=n(11849),C=n(2824),s=n(91220),P=n(67294),a=n(65031),r=n(85893);function m(t,o,l,c){if(!(!t||!o||!l||!c))return{width:t,color:o,points:l,tool:c,element:(0,r.jsx)(a.x1,{stroke:o,strokeWidth:t,globalCompositeOperation:c==="brush"?"source-over":"destination-out",lineCap:"round",points:l,tension:.01})}}function f(t,o){return t=="rubber"||o==2?"rubber":"brush"}function b(t){var o=0,l=(0,s.Z)(t),c;try{for(l.s();!(c=l.n()).done;){var e=c.value;!e||e.annotationId>o&&(o=e.annotationId)}}catch(B){l.e(B)}finally{l.f()}return o}function I(t){var o=(0,P.useState)(),l=(0,C.Z)(o,2),c=l[0],e=l[1],B=function(O,_){var v;if(console.log(t.currentTool),!(t.currentTool!="brush"&&t.currentTool!="rubber")){var A=O.evt.offsetX/_,h=O.evt.offsetY/_,x=f(t.currentTool,O.evt.button),d=m(t.brushSize||10,(v=t.currentLabel)===null||v===void 0?void 0:v.color,[A,h,A,h],x);if(!!d)if(e(x),t.currentAnnotation){var M,N={annotationId:t.currentAnnotation.annotationId,label:t.currentAnnotation.label,lines:(M=t.currentAnnotation.lines)===null||M===void 0?void 0:M.concat([d])};t.onAnnotationModify(N)}else{if(x=="rubber")return;t.onAnnotationAdd({annotationId:b(t.annotations)+1,label:t.currentLabel,lines:[d]})}}},j=function(O,_){var v;if(!(!c||!t.currentAnnotation)){var A=O.evt.offsetX/_,h=O.evt.offsetY/_,x=[A,h],d=[];(v=t.currentAnnotation)!==null&&v!==void 0&&v.lines&&(x=t.currentAnnotation.lines[t.currentAnnotation.lines.length-1].points.concat(x),d=t.currentAnnotation.lines);var M=m(t.brushSize||10,t.currentLabel.color,x,c);!M||(d.pop(),d.push(M),t.onAnnotationModify((0,g.Z)((0,g.Z)({},t.currentAnnotation),{},{lines:d})))}},D=function(){t.currentTool!="brush"&&t.currentTool!="rubber"||e(void 0)};return{onMouseDown:B,onMouseMove:j,onMouseUp:D}}},58967:function(i,L,n){"use strict";var g=n(20136),C=n(55241),s=n(77883),P=n(70507),a=n(57663),r=n(71577),m=n(2824),f=n(67294),b=n(61541),I=n(57560),t=n.n(I),o=n(85893),l=1,c=50,e=10;function B(D){return D?D<=l?l:D>=c?c:D:e}var j=function(u){var O=(0,f.useState)(B(u.size)),_=(0,m.Z)(O,2),v=_[0],A=_[1],h=function(d){A(B(d))};return(0,f.useEffect)(function(){h(u.size)},[u.size]),(0,o.jsxs)(C.Z,{overlayClassName:t().popover,placement:"right",content:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r.Z,{type:"text",onClick:function(){var d,M=B(v-1);h(M),(d=u.onChange)===null||d===void 0||d.call(0,M)},children:"-"}),(0,o.jsx)(P.Z,{min:l,max:c,value:v,onChange:function(d){var M;(M=u.onChange)===null||M===void 0||M.call(0,d)},controls:!1,style:{textAlign:"center"}}),(0,o.jsx)(r.Z,{type:"text",onClick:function(){var d,M=B(v+1);h(M),(d=u.onChange)===null||d===void 0||d.call(0,M)},children:"+"})]}),trigger:u.active?"hover":"click",children:[" ",(0,o.jsx)(b.Z,{active:u.active,imgSrc:u.imgSrc||"./pics/buttons/brush.png",onClick:u.onClick,children:u.children||"Brush"})]})};L.Z=j},63097:function(i,L,n){"use strict";var g=n(20136),C=n(55241),s=n(2824),P=n(67294),a=n(52822),r=n.n(a),m=n(63144),f=n(85893),b=function(t){var o=(0,P.useState)(t.color||"#FFF"),l=(0,s.Z)(o,2),c=l[0],e=l[1];return(0,P.useEffect)(function(){e(t.color||"#FFF")},[t]),t.changeable?(0,f.jsx)(C.Z,{getPopupContainer:function(j){return j.parentElement||document.body},overlayClassName:r().popover,openClassName:r().popoverOpenClassName,placement:"bottom",content:(0,f.jsx)(m.xS,{disableAlpha:!0,color:c,onChange:function(j){e(j.hex)},onChangeComplete:t.onChange}),trigger:"click",children:(0,f.jsx)("div",{className:r().roundBall,style:{backgroundColor:c}})}):(0,f.jsx)("div",{className:r().roundBall,style:{backgroundColor:c}})};L.Z=b},5041:function(i,L,n){"use strict";n.d(L,{Z:function(){return X}});var g=n(54421),C=n(38272),s=n(57663),P=n(71577),a=n(2824),r=n(67294),m=n(56131),f=n.n(m),b=n(49111),I=n(19650),t=n(11849),o=n(5882),l=n.n(o),c=n(63097),e=n(85893),B=function(E){var T=(0,t.Z)({},E.label),U=(0,r.useState)(T.invisible),W=(0,a.Z)(U,2),R=W[0],z=W[1],S=(0,e.jsx)(C.ZP.Item,{className:"".concat(l().listItem," ").concat(E.active?l().listItemActive:""),unselectable:"on",onClick:function(){E.onClick(T)},children:(0,e.jsxs)(I.Z,{align:"center",size:5,children:[(0,e.jsx)("a",{className:l().eye,style:{backgroundImage:R?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(){z(!R),E.onLabelModify(T)}})," ",T.name,(0,e.jsx)(c.Z,{color:T.color,changeable:!0,onChange:function(Z){T.color=Z.hex,E.onLabelModify(T)}})]})});return S},j=B,D=n(71194),u=n(50146),O=n(47673),_=n(24044),v=n(9715),A=n(93766),h=["#FF0000","#008000","#0000FF","#FFFF00","#FFA500","#00FFFF","#8B00FF","#FFC0CB","#7CFC00","#007FFF","#800080","#36BF36","#DAA520","#800000","#008B8B","#B22222","#E6D933","#000080","#FF00FF","#FFFF99","#87CEEB","#5C50E6","#CD5C5C","#20B2AA","#E680FF","#4D1F00","#006374","#B399FF","#8B4513","#BA55D3","#C0C0C0","#808080","#000000"],x=function(E){var T,U,W=(0,r.useState)(((T=E.defaultLabel)===null||T===void 0?void 0:T.color)||h[E.order||0]),R=(0,a.Z)(W,2),z=R[0],S=R[1];(0,r.useEffect)(function(){var F;S(((F=E.defaultLabel)===null||F===void 0?void 0:F.color)||h[E.order||0])},[E]);var H=A.Z.useForm(),Z=(0,a.Z)(H,1),K=Z[0];return(0,e.jsx)(u.Z,{title:"Add Label",visible:E.visible,onCancel:E.onCancel,footer:null,children:(0,e.jsxs)(A.Z,{form:K,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1,labelname:(U=E.defaultLabel)===null||U===void 0?void 0:U.name},onFinish:function(y){var Y={name:y.labelname,color:z};E.onLabelAdd(Y),K.resetFields()},autoComplete:"off",children:[(0,e.jsx)(A.Z.Item,{label:"Label Name",name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,e.jsx)(_.Z,{})}),(0,e.jsx)(A.Z.Item,{label:"Select Color",name:"color",children:(0,e.jsx)(c.Z,{color:z,onChange:function(y){S(y.hex)}})}),(0,e.jsx)(A.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,e.jsxs)(I.Z,{children:[(0,e.jsx)(P.Z,{onClick:function(){var y;(y=E.onCancel)===null||y===void 0||y.call(0),K.resetFields()},children:"\u53D6\u6D88"}),(0,e.jsx)(P.Z,{type:"primary",htmlType:"submit",children:"\u786E\u5B9A"})]})})]})})},d=x,M=[{color:"#FF0000",name:"Label 1"},{color:"#008000",name:"Label 2"}],N=function(E){var T=(0,r.useState)(M),U=(0,a.Z)(T,2),W=U[0],R=U[1],z=(0,r.useState)(!1),S=(0,a.Z)(z,2),H=S[0],Z=S[1];return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(C.ZP,{className:f().labelList,size:"large",header:(0,e.jsx)("div",{className:f().listHeader,children:"Label List"}),footer:(0,e.jsx)("div",{children:(0,e.jsx)(P.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){Z(!0)},block:!0,children:"Add Label"})}),bordered:!0,dataSource:W,renderItem:function(F){var y;return(0,e.jsx)(j,{onClick:E.onLabelSelect,label:F,active:F.name==((y=E.selectedLabel)===null||y===void 0?void 0:y.name),onLabelDelete:E.onLabelDelete,onLabelModify:E.onLabelModify})}}),(0,e.jsx)(d,{order:W.length,visible:H,onLabelAdd:function(F){W.push(F),R(W),Z(!1)},onCancel:function(){Z(!1)}})]})},X=N},8088:function(i,L,n){"use strict";var g=n(67294),C=n(78677),s=n.n(C),P=n(85893),a=function(m){return(0,P.jsx)("div",{className:"".concat(s().container," ").concat(m.className),children:m.children})};L.Z=a},57436:function(i,L,n){"use strict";var g=n(2824),C=n(67294),s=n(65031),P=n(84420),a=n.n(P),r=n(83930),m=n.n(r),f=n(85893),b="./pics/basketball.jpg",I=function(o){var l=a()(b),c=(0,g.Z)(l,1),e=c[0],B=(e==null?void 0:e.width)||0,j=(e==null?void 0:e.height)||0;return(0,f.jsxs)(s.Hf,{width:B*o.scale,height:j*o.scale,className:m().stage,children:[(0,f.jsx)(s.mh,{scaleX:o.scale,scaleY:o.scale,children:(0,f.jsx)(s.Ee,{image:e})}),(0,f.jsxs)(s.mh,{scaleX:o.scale,scaleY:o.scale,onMouseDown:function(u){o.onMouseDown&&o.onMouseDown(u,o.scale)},onMouseMove:function(u){o.onMouseMove&&o.onMouseMove(u,o.scale)},onMouseUp:function(u){o.onMouseUp&&o.onMouseUp(u,o.scale)},onContextMenu:function(u){u.evt.preventDefault()},children:[(0,f.jsx)(s.Ee,{image:e}),o.annotations.map(function(D,u){var O;return(O=D.lines)===null||O===void 0?void 0:O.map(function(_,v){return _.element})})]})]})};L.Z=I},44434:function(i,L,n){"use strict";var g=n(67294),C=n(80961),s=n.n(C),P=n(85893),a=function(m){return(0,P.jsx)("div",{className:s().toolbar,children:m.children})};L.Z=a},61541:function(i,L,n){"use strict";var g=n(49111),C=n(19650),s=n(67294),P=n(82499),a=n.n(P),r=n(85893),m=function(b){return(0,r.jsx)("div",{unselectable:"on",className:"".concat(a().toolBarButtonContainerWrapper," ").concat(b.active&&a().toolBarButtonContainerWrapperActive),onClick:b.onClick,children:(0,r.jsx)(C.Z,{align:"center",className:a().toolBarButtonContainer,size:0,children:(0,r.jsxs)(C.Z,{align:"center",direction:"vertical",className:a().toolBarButton,size:0,children:[(0,r.jsx)("img",{src:b.imgSrc}),(0,r.jsx)("div",{className:a().buttonText,children:b.children})]})})})};L.Z=m}}]);