(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[672],{41435:function(d,E,e){"use strict";e.d(E,{Z:function(){return r}});var O=e(94663),m=e(80112);function C(c){return Function.toString.call(c).indexOf("[native code]")!==-1}var _=e(18597);function l(c,i,v){return(0,_.Z)()?l=Reflect.construct:l=function(f,W,t){var g=[null];g.push.apply(g,W);var o=Function.bind.apply(f,g),M=new o;return t&&(0,m.Z)(M,t.prototype),M},l.apply(null,arguments)}function r(c){var i=typeof Map=="function"?new Map:void 0;return r=function(P){if(P===null||!C(P))return P;if(typeof P!="function")throw new TypeError("Super expression must either be null or a function");if(typeof i!="undefined"){if(i.has(P))return i.get(P);i.set(P,f)}function f(){return l(P,arguments,(0,O.Z)(this).constructor)}return f.prototype=Object.create(P.prototype,{constructor:{value:f,enumerable:!1,writable:!0,configurable:!0}}),(0,m.Z)(f,P)},r(c)}},52822:function(d){d.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},5882:function(d){d.exports={listItem:"listItem___vtDXn",eye:"eye___AsLBS",roundBall:"roundBall___1J_R3",popover:"popover___1x-2R",delete:"delete___WHPf2",listItemActive:"listItemActive___3FRb7"}},56131:function(d){d.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},78677:function(d){d.exports={container:"container___G0FNe"}},83930:function(d){d.exports={stage:"stage___3H5QL"}},80961:function(d){d.exports={leftToolbar:"leftToolbar___1xi4t",rightToolbar:"rightToolbar___3dNSB"}},82499:function(d){d.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},73199:function(){},63097:function(d,E,e){"use strict";var O=e(20136),m=e(55241),C=e(2824),_=e(67294),l=e(52822),r=e.n(l),c=e(63144),i=e(85893),v=function(f){var W=(0,_.useState)(f.color||"#FFF"),t=(0,C.Z)(W,2),g=t[0],o=t[1];return(0,_.useEffect)(function(){o(f.color||"#FFF")},[f]),f.changeable?(0,i.jsx)(m.Z,{getPopupContainer:function(T){return T.parentElement||document.body},overlayClassName:r().popover,openClassName:r().popoverOpenClassName,placement:"bottom",content:(0,i.jsx)(c.xS,{disableAlpha:!0,color:g,onChange:function(T){o(T.hex)},onChangeComplete:f.onChange}),trigger:"click",children:(0,i.jsx)("div",{className:r().roundBall,style:{backgroundColor:g}})}):(0,i.jsx)("div",{className:r().roundBall,style:{backgroundColor:g}})};E.Z=v},5041:function(d,E,e){"use strict";e.d(E,{Z:function(){return F}});var O=e(54421),m=e(38272),C=e(57663),_=e(71577),l=e(2824),r=e(67294),c=e(56131),i=e.n(c),v=e(49111),P=e(19650),f=e(11849),W=e(5882),t=e.n(W),g=e(63097),o=e(85893),M=function(n){var a=(0,f.Z)({},n.label),A=(0,r.useState)(a.invisible),b=(0,l.Z)(A,2),U=b[0],S=b[1],u=n.hideEye?" ":(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("a",{className:t().eye,style:{backgroundImage:U?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(){S(!U),n.onLabelModify(a)}})," "]}),D=n.hideColorPicker?(0,o.jsx)(o.Fragment,{}):(0,o.jsx)(g.Z,{color:a.color,changeable:!0,onChange:function(j){a.color=j.hex,n.onLabelModify(a)}}),y=(0,o.jsxs)(m.ZP.Item,{className:"".concat(t().listItem," ").concat(n.active?t().listItemActive:""),unselectable:"on",onClick:function(){n.onClick(a)},children:[(0,o.jsxs)(P.Z,{align:"center",size:5,children:[u,a.name,D]}),(0,o.jsx)("a",{className:t().delete,style:{backgroundImage:"url(./pics/delete.png)"},onClick:function(j){j.stopPropagation(),n.onLabelDelete(a)}})]});return y},T=M,s=e(71194),Z=e(50146),$=e(47673),K=e(24044),Y=e(9715),B=e(93766),x=e(48971),N=["#FF0000","#008000","#0000FF","#FFFF00","#FFA500","#00FFFF","#8B00FF","#FFC0CB","#7CFC00","#007FFF","#800080","#36BF36","#DAA520","#800000","#008B8B","#B22222","#E6D933","#000080","#FF00FF","#FFFF99","#87CEEB","#5C50E6","#CD5C5C","#20B2AA","#E680FF","#4D1F00","#006374","#B399FF","#8B4513","#BA55D3","#C0C0C0","#808080","#000000"],H=function(n){var a,A,b=(0,x.YB)().formatMessage({id:"component.PPAddLabelModal.selectColor"}),U=(0,x.YB)().formatMessage({id:"component.PPAddLabelModal.addLabel"}),S=(0,x.YB)().formatMessage({id:"component.PPAddLabelModal.labelName"}),u=(0,x.YB)().formatMessage({id:"component.PPCreater.cancel"}),D=(0,x.YB)().formatMessage({id:"component.PPSegMode.ok"}),y=(0,r.useState)(((a=n.defaultLabel)===null||a===void 0?void 0:a.color)||N[n.order||0]),I=(0,l.Z)(y,2),j=I[0],V=I[1];(0,r.useEffect)(function(){var z;V(((z=n.defaultLabel)===null||z===void 0?void 0:z.color)||N[n.order||0])},[n]);var X=n.hideColorPicker?(0,o.jsx)(o.Fragment,{}):(0,o.jsx)(B.Z.Item,{label:b,name:"color",children:(0,o.jsx)(g.Z,{color:j,onChange:function(p){V(p.hex)}})}),J=B.Z.useForm(),G=(0,l.Z)(J,1),k=G[0];return(0,o.jsx)(Z.Z,{title:U,visible:n.visible,onCancel:n.onCancel,footer:null,children:(0,o.jsxs)(B.Z,{form:k,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1,labelname:(A=n.defaultLabel)===null||A===void 0?void 0:A.name},onFinish:function(p){var Q={name:p.labelname,color:j};n.onLabelAdd(Q),k.resetFields()},autoComplete:"off",children:[(0,o.jsx)(B.Z.Item,{label:S,name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,o.jsx)(K.Z,{})}),X,(0,o.jsx)(B.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,o.jsxs)(P.Z,{children:[(0,o.jsx)(_.Z,{onClick:function(){var p;(p=n.onCancel)===null||p===void 0||p.call(0),k.resetFields()},children:u}),(0,o.jsx)(_.Z,{type:"primary",htmlType:"submit",children:D})]})})]})})},L=H,R=function(n){var a;console.log("render labellist");var A=(0,x.YB)().formatMessage({id:"component.PPLabelList.addLabel"}),b=(0,x.YB)().formatMessage({id:"component.PPLabelList.labelList"}),U=(0,r.useState)(!1),S=(0,l.Z)(U,2),u=S[0],D=S[1];return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(m.ZP,{className:i().labelList,size:"large",header:(0,o.jsx)("div",{className:i().listHeader,children:b}),footer:(0,o.jsx)("div",{children:(0,o.jsx)(_.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){D(!0)},block:!0,children:A})}),bordered:!0,dataSource:n.labels,renderItem:function(I){var j;return(0,o.jsx)(T,{hideColorPicker:n.hideColorPicker,hideEye:n.hideEye,onClick:n.onLabelSelect,label:I,active:(j=n.activeIds)===null||j===void 0?void 0:j.has(I.labelId),onLabelDelete:n.onLabelDelete,onLabelModify:n.onLabelModify})}}),(0,o.jsx)(L,{hideColorPicker:n.hideColorPicker,order:(a=n.labels)===null||a===void 0?void 0:a.length,visible:u,onLabelAdd:function(I){n.onLabelAdd(I),D(!1)},onCancel:function(){D(!1)}})]})},F=R},8088:function(d,E,e){"use strict";var O=e(67294),m=e(78677),C=e.n(m),_=e(85893),l=function(c){return(0,_.jsx)("div",{className:"".concat(C().container," ").concat(c.className),children:c.children})};E.Z=l},57436:function(d,E,e){"use strict";var O=e(91220),m=e(2824),C=e(67294),_=e(65031),l=e(84420),r=e.n(l),c=e(83930),i=e.n(c),v=e(85893),P="./pics/basketball.jpg",f=function(t){var g=r()(t.imgSrc||""),o=(0,m.Z)(g,1),M=o[0],T=(0,C.useState)(0),s=(0,m.Z)(T,2),Z=s[0],$=s[1],K=(0,C.useState)(0),Y=(0,m.Z)(K,2),B=Y[0],x=Y[1];function N(){var n=document.getElementById("dr");n&&($(n.clientWidth),x(n.clientHeight))}(0,C.useEffect)(function(){window.removeEventListener("resize",N),window.addEventListener("resize",N);var n=document.getElementById("dr");n&&($(n.clientWidth),x(n.clientHeight))},[]);var H=[];if(t.annotations){var L=(0,O.Z)(t.annotations),R;try{for(L.s();!(R=L.n()).done;){var F=R.value;if(!!F){var h=void 0;switch(F.tool){case"polygon":h=t.createPolygonFunc;break;case"brush":h=t.createBrushFunc;break;case"rubber":h=t.createBrushFunc;break;case"rectangle":h=t.createRectangleFunc;break;default:h=null}h&&H.push(h(F,t.onAnnotationModify,t.onAnnotationModifyComplete,t.scale,t.currentTool,t.setCurrentAnnotation,t.currentAnnotation,{x:-Z/2,y:-B/2}))}}}catch(n){L.e(n)}finally{L.f()}}return(0,v.jsx)(_.Hf,{width:Z,height:B,offsetX:-Z/2,offsetY:-B/2,className:i().stage,children:(0,v.jsx)(_.mh,{onMouseDown:function(a){t.onMouseDown&&t.onMouseDown(a,-Z/2,-B/2,t.scale)},onMouseMove:function(a){t.onMouseMove&&t.onMouseMove(a,t.scale)},onMouseUp:function(a){t.onMouseUp&&t.onMouseUp(a,t.scale)},onContextMenu:function(a){a.evt.preventDefault()},draggable:!1,scaleX:t.scale,scaleY:t.scale,children:(0,v.jsxs)(_.ZA,{draggable:t.currentTool=="mover",onDragEnd:function(a){},children:[(0,v.jsx)(_.Ee,{draggable:!1,image:M,x:-((M==null?void 0:M.width)||0)/2,y:-((M==null?void 0:M.height)||0)/2}),H]})})})};E.Z=f},44434:function(d,E,e){"use strict";var O=e(67294),m=e(80961),C=e.n(m),_=e(85893),l=function(c){var i=C().leftToolbar;return c.disLoc=="right"&&(i=C().rightToolbar),(0,_.jsx)("div",{className:i,children:c.children})};E.Z=l},61541:function(d,E,e){"use strict";var O=e(49111),m=e(19650),C=e(67294),_=e(82499),l=e.n(_),r=e(85893),c=function(v){return(0,r.jsx)("div",{unselectable:"on",className:"".concat(l().toolBarButtonContainerWrapper," ").concat(v.active&&l().toolBarButtonContainerWrapperActive),onClick:v.onClick,children:(0,r.jsx)(m.Z,{align:"center",className:l().toolBarButtonContainer,size:0,children:(0,r.jsxs)(m.Z,{align:"center",direction:"vertical",className:l().toolBarButton,size:0,children:[(0,r.jsx)("img",{src:v.imgSrc}),(0,r.jsx)("div",{className:l().buttonText,children:v.children})]})})})};E.Z=c},29214:function(d,E,e){"use strict";e.r(E);var O=e(11849),m=e(20228),C=e(11382),_=e(34669),l=e(54458),r=e(34792),c=e(48086),i=e(2824),v=e(67294),P=e(73199),f=e.n(P),W=e(8088),t=e(61541),g=e(44434),o=e(5041),M=e(57436),T=e(64322),s=e(85893),Z=function(){var K,Y=(0,v.useState)("mover"),B=(0,i.Z)(Y,2),x=B[0],N=B[1],H=(0,T.$L)(v.useState,v.useEffect,{label:{oneHot:!1,postSetCurr:U},effectTrigger:{postTaskChange:S}}),L=(0,i.Z)(H,7),R=L[0],F=L[1],h=L[2],n=L[3],a=L[4],A=L[5],b=L[6];function U(u){if(b.isActive(u))h.create({taskId:n.curr.taskId,labelId:u.labelId,dataId:a.curr.dataId});else{var D=h.all.filter(function(y){return y.labelId==u.labelId})[0];h.remove(D.annotationId)}}function S(u,D){R.setCurr(!0),!(!u||!D)&&(b.initActive(D),R.setCurr(!1))}return(0,s.jsxs)(W.Z,{className:f().classes,children:[(0,s.jsxs)(g.Z,{children:[(0,s.jsx)(t.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){F.change(.1)},children:"Zoom in"}),(0,s.jsx)(t.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){F.change(-.1)},children:"Zoom out"}),(0,s.jsx)(t.Z,{imgSrc:"./pics/buttons/save.png",onClick:function(){c.default.info("Annotations are saved automatically. You don't need to click save.")},children:"Save"}),(0,s.jsx)(t.Z,{imgSrc:"./pics/buttons/move.png",onClick:function(){N("mover"),c.default.info("You can move the image now.")},children:"Move"})]}),(0,s.jsx)("div",{id:"dr",className:"mainStage",children:(0,s.jsxs)(C.Z,{tip:"loading",spinning:R.curr,children:[(0,s.jsx)("div",{className:"draw",children:(0,s.jsx)(M.Z,{scale:F.curr,currentTool:x,setCurrentAnnotation:function(){},onAnnotationModify:function(){},onAnnotationModifyComplete:function(){},imgSrc:a.imgSrc})}),(0,s.jsx)("div",{className:"pblock",children:(0,s.jsxs)("div",{className:"progress",children:[(0,s.jsx)(l.Z,{className:"progressBar",percent:A.progress,status:"active",showInfo:!1})," ",(0,s.jsxs)("span",{className:"progressDesc",children:["Current labeling ",n.currIdx==null?1:n.currIdx+1," of"," ",(K=n.all)===null||K===void 0?void 0:K.length,". Already labeled ",n.finished(A.progress)||0,"."]})]})}),(0,s.jsx)("div",{className:"prevTask",onClick:n.prevTask}),(0,s.jsx)("div",{className:"nextTask",onClick:n.nextTask})]})}),(0,s.jsxs)(g.Z,{disLoc:"right",children:[(0,s.jsx)(t.Z,{imgSrc:"./pics/buttons/export.png",children:"Export"}),(0,s.jsx)(t.Z,{imgSrc:"./pics/buttons/data_division.png",children:"Split Dataset"})]}),(0,s.jsx)("div",{className:"rightSideBar",children:(0,s.jsx)(o.Z,{labels:b.all,activeIds:b.activeIds,onLabelSelect:b.onSelect,onLabelAdd:function(D){return b.create((0,O.Z)((0,O.Z)({},D),{},{projectId:A.curr.projectId}))},onLabelDelete:b.remove,onLabelModify:function(){},hideColorPicker:!0,hideEye:!0})})]})};E.default=Z}}]);