(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[507],{52822:function(i){i.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},5882:function(i){i.exports={listItem:"listItem___vtDXn",eye:"eye___AsLBS",roundBall:"roundBall___1J_R3",popover:"popover___1x-2R",delete:"delete___WHPf2",listItemActive:"listItemActive___3FRb7"}},56131:function(i){i.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},78677:function(i){i.exports={container:"container___G0FNe"}},83930:function(i){i.exports={stage:"stage___3H5QL"}},80961:function(i){i.exports={leftToolbar:"leftToolbar___1xi4t",rightToolbar:"rightToolbar___3dNSB"}},82499:function(i){i.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},63097:function(i,E,e){"use strict";var U=e(20136),d=e(55241),_=e(2824),u=e(67294),c=e(52822),r=e.n(c),P=e(63144),C=e(85893),M=function(x){var H=(0,u.useState)(x.color||"#FFF"),n=(0,_.Z)(H,2),A=n[0],a=n[1];return(0,u.useEffect)(function(){a(x.color||"#FFF")},[x]),x.changeable?(0,C.jsx)(d.Z,{getPopupContainer:function(y){return y.parentElement||document.body},overlayClassName:r().popover,openClassName:r().popoverOpenClassName,placement:"bottom",content:(0,C.jsx)(P.xS,{disableAlpha:!0,color:A,onChange:function(y){a(y.hex)},onChangeComplete:x.onChange}),trigger:"click",children:(0,C.jsx)("div",{className:r().roundBall,style:{backgroundColor:A}})}):(0,C.jsx)("div",{className:r().roundBall,style:{backgroundColor:A}})};E.Z=M},5041:function(i,E,e){"use strict";e.d(E,{Z:function(){return I}});var U=e(54421),d=e(38272),_=e(57663),u=e(71577),c=e(2824),r=e(67294),P=e(56131),C=e.n(P),M=e(49111),Z=e(19650),x=e(11849),H=e(5882),n=e.n(H),A=e(63097),a=e(85893),g=function(o){var s=(0,x.Z)({},o.label),L=(0,r.useState)(s.invisible),D=(0,c.Z)(L,2),f=D[0],l=D[1],t=(0,r.useState)(0),b=(0,c.Z)(t,2),F=b[0],O=b[1],j=o.hideEye?" ":(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("a",{className:n().eye,style:{backgroundImage:f?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(T){T.stopPropagation(),l(!f),o.onLabelModify(s)}})," "]}),$=o.hideColorPicker?(0,a.jsx)(a.Fragment,{}):(0,a.jsx)(A.Z,{color:s.color,changeable:!0,onChange:function(T){s.color=T.hex,o.onLabelModify(s)}}),Q=(0,a.jsxs)(d.ZP.Item,{className:"".concat(n().listItem," ").concat(o.active?n().listItemActive:""),unselectable:"on",onClick:function(){o.onClick(s)},children:[(0,a.jsxs)(Z.Z,{align:"center",size:5,children:[j,s.name,$]}),(0,a.jsx)("a",{className:n().delete,onClick:function(T){T.stopPropagation();var R=new Date().getTime();R-F<300||(O(R),o.onLabelDelete(s))}})]});return Q},y=g,V=e(71194),h=e(50146),X=e(47673),k=e(24044),J=e(9715),v=e(93766),B=e(48971),z=["#FF0000","#008000","#0000FF","#FFFF00","#FFA500","#00FFFF","#8B00FF","#FFC0CB","#7CFC00","#007FFF","#800080","#36BF36","#DAA520","#800000","#008B8B","#B22222","#E6D933","#000080","#FF00FF","#FFFF99","#87CEEB","#5C50E6","#CD5C5C","#20B2AA","#E680FF","#4D1F00","#006374","#B399FF","#8B4513","#BA55D3","#C0C0C0","#808080","#000000"],Y=function(o){var s,L,D=(0,B.YB)().formatMessage({id:"component.PPAddLabelModal.selectColor"}),f=(0,B.YB)().formatMessage({id:"component.PPAddLabelModal.addLabel"}),l=(0,B.YB)().formatMessage({id:"component.PPAddLabelModal.labelName"}),t=(0,B.YB)().formatMessage({id:"component.PPCreater.cancel"}),b=(0,B.YB)().formatMessage({id:"component.PPSegMode.ok"}),F=(0,r.useState)(((s=o.defaultLabel)===null||s===void 0?void 0:s.color)||z[o.order||0]),O=(0,c.Z)(F,2),j=O[0],$=O[1];(0,r.useEffect)(function(){var S;$(((S=o.defaultLabel)===null||S===void 0?void 0:S.color)||z[o.order||0])},[o]);var Q=o.hideColorPicker?(0,a.jsx)(a.Fragment,{}):(0,a.jsx)(v.Z.Item,{label:D,name:"color",children:(0,a.jsx)(A.Z,{color:j,onChange:function(W){$(W.hex)}})}),N=v.Z.useForm(),T=(0,c.Z)(N,1),R=T[0];return(0,a.jsx)(h.Z,{title:f,visible:o.visible,onCancel:o.onCancel,footer:null,children:(0,a.jsxs)(v.Z,{form:R,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1,labelname:(L=o.defaultLabel)===null||L===void 0?void 0:L.name},onFinish:function(W){var w={name:W.labelname,color:j};o.onLabelAdd(w),R.resetFields()},autoComplete:"off",children:[(0,a.jsx)(v.Z.Item,{label:l,name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,a.jsx)(k.Z,{})}),Q,(0,a.jsx)(v.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,a.jsxs)(Z.Z,{children:[(0,a.jsx)(u.Z,{onClick:function(){var W;(W=o.onCancel)===null||W===void 0||W.call(0),R.resetFields()},children:t}),(0,a.jsx)(u.Z,{type:"primary",htmlType:"submit",children:b})]})})]})})},m=Y,G=function(o){var s,L=(0,B.YB)().formatMessage({id:"component.PPLabelList.addLabel"}),D=(0,B.YB)().formatMessage({id:"component.PPLabelList.labelList"}),f=(0,r.useState)(!1),l=(0,c.Z)(f,2),t=l[0],b=l[1];return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(d.ZP,{className:C().labelList,size:"large",header:(0,a.jsx)("div",{className:C().listHeader,children:D}),footer:(0,a.jsx)("div",{children:(0,a.jsx)(u.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){b(!0)},block:!0,children:L})}),bordered:!0,dataSource:o.labels,renderItem:function(O){var j;return(0,a.jsx)(y,{hideColorPicker:o.hideColorPicker,hideEye:o.hideEye,onClick:o.onLabelSelect,label:O,active:(j=o.activeIds)===null||j===void 0?void 0:j.has(O.labelId),onLabelDelete:o.onLabelDelete,onLabelModify:o.onLabelModify})}}),(0,a.jsx)(m,{hideColorPicker:o.hideColorPicker,order:(s=o.labels)===null||s===void 0?void 0:s.length,visible:t,onLabelAdd:function(O){o.onLabelAdd(O),b(!1)},onCancel:function(){b(!1)}})]})},I=G},8088:function(i,E,e){"use strict";var U=e(67294),d=e(78677),_=e.n(d),u=e(85893),c=function(P){return(0,u.jsx)("div",{className:"".concat(_().container," ").concat(P.className),children:P.children})};E.Z=c},57436:function(i,E,e){"use strict";var U=e(91220),d=e(2824),_=e(67294),u=e(65031),c=e(84420),r=e.n(c),P=e(83930),C=e.n(P),M=e(85893),Z="./pics/basketball.jpg",x=function(n){var A=r()(n.imgSrc||Z),a=(0,d.Z)(A,1),g=a[0],y=(0,_.useState)(0),V=(0,d.Z)(y,2),h=V[0],X=V[1],k=(0,_.useState)(0),J=(0,d.Z)(k,2),v=J[0],B=J[1],z=(0,_.useState)({x:0,y:0}),Y=(0,d.Z)(z,2),m=Y[0],G=Y[1],I=(0,_.useRef)(null);function K(){var l=document.getElementById("dr");l&&(X(l.clientWidth),B(l.clientHeight))}(0,_.useEffect)(function(){window.removeEventListener("resize",K),window.addEventListener("resize",K);var l=document.getElementById("dr");l&&(X(l.clientWidth),B(l.clientHeight))},[]);var o=[];if(n.annotations){console.log("PPStage rendering annotations:",n.annotations);var s=(0,U.Z)(n.annotations),L;try{for(s.s();!(L=s.n()).done;){var D=L.value;if(!!D){var f=void 0;switch(D.type){case"polygon":f=n.createPolygonFunc;break;case"brush":f=n.createBrushFunc;break;case"rubber":f=n.createBrushFunc;break;case"rectangle":f=n.createRectangleFunc;break;default:f=null}f&&o.push(f(D,n.onAnnotationModify,n.onAnnotationModifyComplete,n.scale,n.currentTool,n.setCurrentAnnotation,I,n.currentAnnotation))}}}catch(l){s.e(l)}finally{s.f()}}return(0,M.jsxs)(u.Hf,{width:h,height:v,offsetX:-h/2,offsetY:-v/2,className:C().stage,ref:I,children:[(0,M.jsx)(u.mh,{onMouseDown:function(t){t.cancelBubble=!0,n.onMouseDown&&n.onMouseDown(t,-h/2-m.x,-v/2-m.y,n.scale)},onMouseMove:function(t){t.cancelBubble=!0,n.onMouseMove&&n.onMouseMove(t,-h/2-m.x,-v/2-m.y,n.scale)},onMouseUp:function(t){t.cancelBubble=!0,n.onMouseUp&&n.onMouseUp(t,-h/2-m.x,-v/2-m.y,n.scale)},onContextMenu:function(t){t.cancelBubble=!0,t.evt.preventDefault()},draggable:!1,children:(0,M.jsx)(u.ZA,{draggable:n.currentTool=="mover",scaleX:n.scale,scaleY:n.scale,onDragStart:function(){if(n.currentTool=="mover"&&!!I.current){var t=I.current,b=t.findOne(".annotation");b.setDraggable(!0),b.startDrag()}},onDragEnd:function(t){if(n.currentTool=="mover"&&(G({x:t.target.x(),y:t.target.y()}),!!I.current)){var b=I.current,F=b.findOne(".annotation");F.setDraggable(!1)}},children:(0,M.jsx)(u.Ee,{name:"baseImage",draggable:!1,image:g,x:-((g==null?void 0:g.width)||0)/2,y:-((g==null?void 0:g.height)||0)/2})})}),(0,M.jsx)(u.mh,{name:"annotation",onMouseDown:function(t){t.cancelBubble=!0,n.onMouseDown&&n.onMouseDown(t,-h/2-m.x,-v/2-m.y,n.scale)},onMouseMove:function(t){t.cancelBubble=!0,t.evt.cancelBubble=!0,n.onMouseMove&&n.onMouseMove(t,-h/2-m.x,-v/2-m.y,n.scale)},onMouseUp:function(t){t.cancelBubble=!0,t.evt.cancelBubble=!0,n.onMouseUp&&n.onMouseUp(t,-h/2-m.x,-v/2-m.y,n.scale)},onContextMenu:function(t){t.cancelBubble=!0,t.evt.cancelBubble=!0,t.evt.preventDefault()},children:o})]})};E.Z=x},44434:function(i,E,e){"use strict";var U=e(67294),d=e(80961),_=e.n(d),u=e(85893),c=function(P){var C=_().leftToolbar;return P.disLoc=="right"&&(C=_().rightToolbar),(0,u.jsx)("div",{className:C,children:P.children})};E.Z=c},61541:function(i,E,e){"use strict";var U=e(49111),d=e(19650),_=e(67294),u=e(82499),c=e.n(u),r=e(85893),P=function(M){return(0,r.jsx)("div",{unselectable:"on",className:"".concat(c().toolBarButtonContainerWrapper," ").concat(M.active&&c().toolBarButtonContainerWrapperActive),onClick:M.onClick,children:(0,r.jsx)(d.Z,{align:"center",className:c().toolBarButtonContainer,size:0,children:(0,r.jsxs)(d.Z,{align:"center",direction:"vertical",className:c().toolBarButton,size:0,children:[(0,r.jsx)("img",{src:M.imgSrc}),(0,r.jsx)("div",{className:c().buttonText,children:M.children})]})})})};E.Z=P}}]);
