(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[672],{41435:function(c,h,e){"use strict";e.d(h,{Z:function(){return r}});var j=e(94663),_=e(80112);function E(u){return Function.toString.call(u).indexOf("[native code]")!==-1}var f=e(18597);function l(u,v,L){return(0,f.Z)()?l=Reflect.construct:l=function(g,U,t){var B=[null];B.push.apply(B,U);var o=Function.bind.apply(g,B),D=new o;return t&&(0,_.Z)(D,t.prototype),D},l.apply(null,arguments)}function r(u){var v=typeof Map=="function"?new Map:void 0;return r=function(C){if(C===null||!E(C))return C;if(typeof C!="function")throw new TypeError("Super expression must either be null or a function");if(typeof v!="undefined"){if(v.has(C))return v.get(C);v.set(C,g)}function g(){return l(C,arguments,(0,j.Z)(this).constructor)}return g.prototype=Object.create(C.prototype,{constructor:{value:g,enumerable:!1,writable:!0,configurable:!0}}),(0,_.Z)(g,C)},r(u)}},52822:function(c){c.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},5882:function(c){c.exports={listItem:"listItem___vtDXn",eye:"eye___AsLBS",roundBall:"roundBall___1J_R3",popover:"popover___1x-2R",delete:"delete___WHPf2",listItemActive:"listItemActive___3FRb7"}},56131:function(c){c.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},78677:function(c){c.exports={container:"container___G0FNe"}},83930:function(c){c.exports={stage:"stage___3H5QL"}},80961:function(c){c.exports={leftToolbar:"leftToolbar___1xi4t",rightToolbar:"rightToolbar___3dNSB"}},82499:function(c){c.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},73199:function(){},63097:function(c,h,e){"use strict";var j=e(20136),_=e(55241),E=e(2824),f=e(67294),l=e(52822),r=e.n(l),u=e(63144),v=e(85893),L=function(g){var U=(0,f.useState)(g.color||"#FFF"),t=(0,E.Z)(U,2),B=t[0],o=t[1];return(0,f.useEffect)(function(){o(g.color||"#FFF")},[g]),g.changeable?(0,v.jsx)(_.Z,{getPopupContainer:function(Z){return Z.parentElement||document.body},overlayClassName:r().popover,openClassName:r().popoverOpenClassName,placement:"bottom",content:(0,v.jsx)(u.xS,{disableAlpha:!0,color:B,onChange:function(Z){o(Z.hex)},onChangeComplete:g.onChange}),trigger:"click",children:(0,v.jsx)("div",{className:r().roundBall,style:{backgroundColor:B}})}):(0,v.jsx)("div",{className:r().roundBall,style:{backgroundColor:B}})};h.Z=L},5041:function(c,h,e){"use strict";e.d(h,{Z:function(){return T}});var j=e(54421),_=e(38272),E=e(57663),f=e(71577),l=e(2824),r=e(67294),u=e(56131),v=e.n(u),L=e(49111),C=e(19650),g=e(11849),U=e(5882),t=e.n(U),B=e(63097),o=e(85893),D=function(n){var s=(0,g.Z)({},n.label),I=(0,r.useState)(s.invisible),y=(0,l.Z)(I,2),b=y[0],F=y[1],x=(0,r.useState)(0),M=(0,l.Z)(x,2),i=M[0],d=M[1],W=n.hideEye?" ":(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("a",{className:t().eye,style:{backgroundImage:b?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(R){R.stopPropagation(),F(!b),n.onLabelModify(s)}})," "]}),$=n.hideColorPicker?(0,o.jsx)(o.Fragment,{}):(0,o.jsx)(B.Z,{color:s.color,changeable:!0,onChange:function(R){s.color=R.hex,n.onLabelModify(s)}}),P=(0,o.jsxs)(_.ZP.Item,{className:"".concat(t().listItem," ").concat(n.active?t().listItemActive:""),unselectable:"on",onClick:function(){n.onClick(s)},children:[(0,o.jsxs)(C.Z,{align:"center",size:5,children:[W,s.name,$]}),(0,o.jsx)("a",{className:t().delete,onClick:function(R){R.stopPropagation();var X=new Date().getTime();X-i<300||(d(X),n.onLabelDelete(s))}})]});return P},Z=D,S=e(71194),a=e(50146),J=e(47673),G=e(24044),z=e(9715),O=e(93766),m=e(48971),K=["#FF0000","#008000","#0000FF","#FFFF00","#FFA500","#00FFFF","#8B00FF","#FFC0CB","#7CFC00","#007FFF","#800080","#36BF36","#DAA520","#800000","#008B8B","#B22222","#E6D933","#000080","#FF00FF","#FFFF99","#87CEEB","#5C50E6","#CD5C5C","#20B2AA","#E680FF","#4D1F00","#006374","#B399FF","#8B4513","#BA55D3","#C0C0C0","#808080","#000000"],p=function(n){var s,I,y=(0,m.YB)().formatMessage({id:"component.PPAddLabelModal.selectColor"}),b=(0,m.YB)().formatMessage({id:"component.PPAddLabelModal.addLabel"}),F=(0,m.YB)().formatMessage({id:"component.PPAddLabelModal.labelName"}),x=(0,m.YB)().formatMessage({id:"component.PPCreater.cancel"}),M=(0,m.YB)().formatMessage({id:"component.PPSegMode.ok"}),i=(0,r.useState)(((s=n.defaultLabel)===null||s===void 0?void 0:s.color)||K[n.order||0]),d=(0,l.Z)(i,2),W=d[0],$=d[1];(0,r.useEffect)(function(){var V;$(((V=n.defaultLabel)===null||V===void 0?void 0:V.color)||K[n.order||0])},[n]);var P=n.hideColorPicker?(0,o.jsx)(o.Fragment,{}):(0,o.jsx)(O.Z.Item,{label:y,name:"color",children:(0,o.jsx)(B.Z,{color:W,onChange:function(k){$(k.hex)}})}),A=O.Z.useForm(),R=(0,l.Z)(A,1),X=R[0];return(0,o.jsx)(a.Z,{title:b,visible:n.visible,onCancel:n.onCancel,footer:null,children:(0,o.jsxs)(O.Z,{form:X,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1,labelname:(I=n.defaultLabel)===null||I===void 0?void 0:I.name},onFinish:function(k){var Q={name:k.labelname,color:W};n.onLabelAdd(Q),X.resetFields()},autoComplete:"off",children:[(0,o.jsx)(O.Z.Item,{label:F,name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,o.jsx)(G.Z,{})}),P,(0,o.jsx)(O.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,o.jsxs)(C.Z,{children:[(0,o.jsx)(f.Z,{onClick:function(){var k;(k=n.onCancel)===null||k===void 0||k.call(0),X.resetFields()},children:x}),(0,o.jsx)(f.Z,{type:"primary",htmlType:"submit",children:M})]})})]})})},N=p,H=function(n){var s,I=(0,m.YB)().formatMessage({id:"component.PPLabelList.addLabel"}),y=(0,m.YB)().formatMessage({id:"component.PPLabelList.labelList"}),b=(0,r.useState)(!1),F=(0,l.Z)(b,2),x=F[0],M=F[1];return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(_.ZP,{className:v().labelList,size:"large",header:(0,o.jsx)("div",{className:v().listHeader,children:y}),footer:(0,o.jsx)("div",{children:(0,o.jsx)(f.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){M(!0)},block:!0,children:I})}),bordered:!0,dataSource:n.labels,renderItem:function(d){var W;return(0,o.jsx)(Z,{hideColorPicker:n.hideColorPicker,hideEye:n.hideEye,onClick:n.onLabelSelect,label:d,active:(W=n.activeIds)===null||W===void 0?void 0:W.has(d.labelId),onLabelDelete:n.onLabelDelete,onLabelModify:n.onLabelModify})}}),(0,o.jsx)(N,{hideColorPicker:n.hideColorPicker,order:(s=n.labels)===null||s===void 0?void 0:s.length,visible:x,onLabelAdd:function(d){n.onLabelAdd(d),M(!1)},onCancel:function(){M(!1)}})]})},T=H},8088:function(c,h,e){"use strict";var j=e(67294),_=e(78677),E=e.n(_),f=e(85893),l=function(u){return(0,f.jsx)("div",{className:"".concat(E().container," ").concat(u.className),children:u.children})};h.Z=l},57436:function(c,h,e){"use strict";var j=e(91220),_=e(2824),E=e(67294),f=e(65031),l=e(84420),r=e.n(l),u=e(83930),v=e.n(u),L=e(85893),C="./pics/basketball.jpg",g=function(t){var B=r()(t.imgSrc||""),o=(0,_.Z)(B,1),D=o[0],Z=(0,E.useState)(0),S=(0,_.Z)(Z,2),a=S[0],J=S[1],G=(0,E.useState)(0),z=(0,_.Z)(G,2),O=z[0],m=z[1],K=(0,E.useState)({x:0,y:0}),p=(0,_.Z)(K,2),N=p[0],H=p[1],T=(0,E.useState)({x:0,y:0}),Y=(0,_.Z)(T,2),n=Y[0],s=Y[1];function I(){var i=document.getElementById("dr");i&&(J(i.clientWidth),m(i.clientHeight))}(0,E.useEffect)(function(){window.removeEventListener("resize",I),window.addEventListener("resize",I);var i=document.getElementById("dr");i&&(J(i.clientWidth),m(i.clientHeight))},[]);var y=[];if(t.annotations){var b=(0,j.Z)(t.annotations),F;try{for(b.s();!(F=b.n()).done;){var x=F.value;if(!!x){console.log("PPStage rendering annotation:",x,"annotation.tool:",x.tool);var M=void 0;switch(x.type){case"polygon":M=t.createPolygonFunc;break;case"brush":M=t.createBrushFunc;break;case"rubber":M=t.createBrushFunc;break;case"rectangle":M=t.createRectangleFunc;break;default:M=null}M&&y.push(M(x,t.onAnnotationModify,t.onAnnotationModifyComplete,t.scale,t.currentTool,t.setCurrentAnnotation,t.currentAnnotation,{x:-a/2-n.x,y:-O/2-n.y}))}}}catch(i){b.e(i)}finally{b.f()}}return(0,L.jsx)(f.Hf,{width:a,height:O,offsetX:-a/2,offsetY:-O/2,className:v().stage,children:(0,L.jsx)(f.mh,{onMouseDown:function(d){t.onMouseDown&&t.onMouseDown(d,-a/2-n.x,-O/2-n.y,t.scale)},onMouseMove:function(d){t.onMouseMove&&t.onMouseMove(d,t.scale)},onMouseUp:function(d){t.onMouseUp&&t.onMouseUp(d,t.scale)},onContextMenu:function(d){d.evt.preventDefault()},draggable:!1,children:(0,L.jsxs)(f.ZA,{draggable:t.currentTool=="mover",scaleX:t.scale,scaleY:t.scale,onDragEnd:function(d){t.currentTool=="mover"&&s({x:d.evt.offsetX-N.x,y:d.evt.offsetY-N.y})},onDragStart:function(d){t.currentTool=="mover"&&H({x:d.evt.offsetX,y:d.evt.offsetY})},children:[(0,L.jsx)(f.Ee,{draggable:!1,image:D,x:-((D==null?void 0:D.width)||0)/2,y:-((D==null?void 0:D.height)||0)/2}),y]})})})};h.Z=g},44434:function(c,h,e){"use strict";var j=e(67294),_=e(80961),E=e.n(_),f=e(85893),l=function(u){var v=E().leftToolbar;return u.disLoc=="right"&&(v=E().rightToolbar),(0,f.jsx)("div",{className:v,children:u.children})};h.Z=l},61541:function(c,h,e){"use strict";var j=e(49111),_=e(19650),E=e(67294),f=e(82499),l=e.n(f),r=e(85893),u=function(L){return(0,r.jsx)("div",{unselectable:"on",className:"".concat(l().toolBarButtonContainerWrapper," ").concat(L.active&&l().toolBarButtonContainerWrapperActive),onClick:L.onClick,children:(0,r.jsx)(_.Z,{align:"center",className:l().toolBarButtonContainer,size:0,children:(0,r.jsxs)(_.Z,{align:"center",direction:"vertical",className:l().toolBarButton,size:0,children:[(0,r.jsx)("img",{src:L.imgSrc}),(0,r.jsx)("div",{className:l().buttonText,children:L.children})]})})})};h.Z=u},29214:function(c,h,e){"use strict";e.r(h);var j=e(11849),_=e(20228),E=e(11382),f=e(34669),l=e(54458),r=e(34792),u=e(48086),v=e(2824),L=e(67294),C=e(73199),g=e.n(C),U=e(8088),t=e(61541),B=e(44434),o=e(5041),D=e(57436),Z=e(64322),S=e(48971),a=e(85893),J=function(){var z,O=(0,Z.$L)(L.useState,L.useEffect,{label:{oneHot:!1,postSetCurr:W},tool:{defaultTool:"mover"},effectTrigger:{postTaskChange:$}}),m=(0,v.Z)(O,10),K=m[0],p=m[1],N=m[2],H=m[3],T=m[4],Y=m[5],n=m[6],s=m[7],I=m[8],y=m[9],b=(0,S.YB)().formatMessage({id:"pages.toolBar.zoomIn"}),F=(0,S.YB)().formatMessage({id:"pages.toolBar.zoomOut"}),x=(0,S.YB)().formatMessage({id:"pages.toolBar.move"}),M=(0,S.YB)().formatMessage({id:"pages.toolBar.save"}),i=(0,S.YB)().formatMessage({id:"pages.toolBar.divideData"}),d=(0,S.YB)().formatMessage({id:"pages.toolBar.export"});function W(P){if(s.isActive(P))H.create({taskId:T.curr.taskId,labelId:P.labelId,dataId:Y.curr.dataId});else{var A=H.all.filter(function(R){return R.labelId==P.labelId})[0];H.remove(A.annotationId)}}function $(P,A){p.setCurr(!0),!(!P||!A)&&(s.initActive(A),p.setCurr(!1))}return(0,a.jsxs)(U.Z,{className:g().classes,children:[(0,a.jsxs)(B.Z,{children:[(0,a.jsx)(t.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){N.change(.1)},children:b}),(0,a.jsx)(t.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){N.change(-.1)},children:F}),(0,a.jsx)(t.Z,{imgSrc:"./pics/buttons/save.png",onClick:function(){u.default.info("Annotations are saved automatically. You don't need to click save.")},children:M}),(0,a.jsx)(t.Z,{imgSrc:"./pics/buttons/move.png",active:K.curr=="mover",onClick:function(){K.setCurr("mover"),u.default.info("You can move the image now.")},children:x})]}),(0,a.jsx)("div",{id:"dr",className:"mainStage",children:(0,a.jsxs)(E.Z,{tip:"loading",spinning:p.curr,children:[(0,a.jsx)("div",{className:"draw",children:(0,a.jsx)(D.Z,{scale:N.curr,currentTool:K.curr,setCurrentAnnotation:function(){},onAnnotationModify:function(){},onAnnotationModifyComplete:function(){},imgSrc:Y.imgSrc})}),(0,a.jsx)("div",{className:"pblock",children:(0,a.jsxs)("div",{className:"progress",children:[(0,a.jsx)(l.Z,{className:"progressBar",percent:n.progress,status:"active",showInfo:!1})," ",(0,a.jsxs)("span",{className:"progressDesc",children:["Current labeling ",T.currIdx==null?1:T.currIdx+1," of"," ",(z=T.all)===null||z===void 0?void 0:z.length,". Already labeled ",T.finished(n.progress)||0,"."]})]})}),(0,a.jsx)("div",{className:"prevTask",onClick:T.prevTask}),(0,a.jsx)("div",{className:"nextTask",onClick:T.nextTask})]})}),(0,a.jsxs)(B.Z,{disLoc:"right",children:[(0,a.jsx)(t.Z,{imgSrc:"./pics/buttons/data_division.png",onClick:function(){return I(n.curr.projectId,{train:.5,validation:.3,test:.2})},children:i}),(0,a.jsx)(t.Z,{imgSrc:"./pics/buttons/export.png",onClick:function(){y(n.curr.projectId,"/home/lin/Desktop/data/pplabel/export/")},children:d})]}),(0,a.jsx)("div",{className:"rightSideBar",children:(0,a.jsx)(o.Z,{labels:s.all,activeIds:s.activeIds,onLabelSelect:s.onSelect,onLabelAdd:function(A){return s.create((0,j.Z)((0,j.Z)({},A),{},{projectId:n.curr.projectId}))},onLabelDelete:s.remove,onLabelModify:function(){},hideColorPicker:!0,hideEye:!0})})]})};h.default=J}}]);
