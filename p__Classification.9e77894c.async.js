(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[672],{41435:function(i,M,e){"use strict";e.d(M,{Z:function(){return s}});var I=e(94663),v=e(80112);function g(c){return Function.toString.call(c).indexOf("[native code]")!==-1}var P=e(18597);function l(c,u,L){return(0,P.Z)()?l=Reflect.construct:l=function(f,S,n){var D=[null];D.push.apply(D,S);var t=Function.bind.apply(f,D),h=new t;return n&&(0,v.Z)(h,n.prototype),h},l.apply(null,arguments)}function s(c){var u=typeof Map=="function"?new Map:void 0;return s=function(E){if(E===null||!g(E))return E;if(typeof E!="function")throw new TypeError("Super expression must either be null or a function");if(typeof u!="undefined"){if(u.has(E))return u.get(E);u.set(E,f)}function f(){return l(E,arguments,(0,I.Z)(this).constructor)}return f.prototype=Object.create(E.prototype,{constructor:{value:f,enumerable:!1,writable:!0,configurable:!0}}),(0,v.Z)(f,E)},s(c)}},52822:function(i){i.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},5882:function(i){i.exports={listItem:"listItem___vtDXn",eye:"eye___AsLBS",roundBall:"roundBall___1J_R3",popover:"popover___1x-2R",delete:"delete___WHPf2",listItemActive:"listItemActive___3FRb7"}},56131:function(i){i.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},78677:function(i){i.exports={container:"container___G0FNe"}},83930:function(i){i.exports={stage:"stage___3H5QL"}},80961:function(i){i.exports={leftToolbar:"leftToolbar___1xi4t",rightToolbar:"rightToolbar___3dNSB"}},82499:function(i){i.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},73199:function(i){i.exports={classes:"classes___3trCU",mainStage:"mainStage___3ajeT",prevTask:"prevTask___1O-ND",nextTask:"nextTask___2SQX8",draw:"draw___3nlFC",pblock:"pblock___2fZaD",progress:"progress___K3vmc",rightSideBar:"rightSideBar___aFTer"}},63097:function(i,M,e){"use strict";var I=e(20136),v=e(55241),g=e(2824),P=e(67294),l=e(52822),s=e.n(l),c=e(63144),u=e(85893),L=function(f){var S=(0,P.useState)(f.color||"#FFF"),n=(0,g.Z)(S,2),D=n[0],t=n[1];return(0,P.useEffect)(function(){t(f.color||"#FFF")},[f]),f.changeable?(0,u.jsx)(v.Z,{getPopupContainer:function(j){return j.parentElement||document.body},overlayClassName:s().popover,openClassName:s().popoverOpenClassName,placement:"bottom",content:(0,u.jsx)(c.xS,{disableAlpha:!0,color:D,onChange:function(j){t(j.hex)},onChangeComplete:f.onChange}),trigger:"click",children:(0,u.jsx)("div",{className:s().roundBall,style:{backgroundColor:D}})}):(0,u.jsx)("div",{className:s().roundBall,style:{backgroundColor:D}})};M.Z=L},5041:function(i,M,e){"use strict";e.d(M,{Z:function(){return N}});var I=e(54421),v=e(38272),g=e(57663),P=e(71577),l=e(2824),s=e(67294),c=e(56131),u=e.n(c),L=e(49111),E=e(19650),f=e(11849),S=e(5882),n=e.n(S),D=e(63097),t=e(85893),h=function(o){var _=(0,f.Z)({},o.label),B=(0,s.useState)(_.invisible),m=(0,l.Z)(B,2),A=m[0],O=m[1],b=o.hideEye?" ":(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("a",{className:n().eye,style:{backgroundImage:A?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(){O(!A),o.onLabelModify(_)}})," "]}),a=o.hideColorPicker?(0,t.jsx)(t.Fragment,{}):(0,t.jsx)(D.Z,{color:_.color,changeable:!0,onChange:function(W){_.color=W.hex,o.onLabelModify(_)}}),d=(0,t.jsx)(v.ZP.Item,{className:"".concat(n().listItem," ").concat(_.active?n().listItemActive:""),unselectable:"on",onClick:function(){o.onClick(_)},children:(0,t.jsxs)(E.Z,{align:"center",size:5,children:[b,_.name,a,(0,t.jsx)("a",{className:n().delete,style:{backgroundImage:"url(./pics/delete.png)"},onClick:function(W){W.stopPropagation(),o.onLabelDelete(_)}})]})});return d},j=h,$=e(71194),z=e(50146),r=e(47673),X=e(24044),k=e(9715),Z=e(93766),F=["#FF0000","#008000","#0000FF","#FFFF00","#FFA500","#00FFFF","#8B00FF","#FFC0CB","#7CFC00","#007FFF","#800080","#36BF36","#DAA520","#800000","#008B8B","#B22222","#E6D933","#000080","#FF00FF","#FFFF99","#87CEEB","#5C50E6","#CD5C5C","#20B2AA","#E680FF","#4D1F00","#006374","#B399FF","#8B4513","#BA55D3","#C0C0C0","#808080","#000000"],U=function(o){var _,B,m=(0,s.useState)(((_=o.defaultLabel)===null||_===void 0?void 0:_.color)||F[o.order||0]),A=(0,l.Z)(m,2),O=A[0],b=A[1];(0,s.useEffect)(function(){var x;b(((x=o.defaultLabel)===null||x===void 0?void 0:x.color)||F[o.order||0])},[o]);var a=o.hideColorPicker?(0,t.jsx)(t.Fragment,{}):(0,t.jsx)(Z.Z.Item,{label:"Select Color",name:"color",children:(0,t.jsx)(D.Z,{color:O,onChange:function(C){b(C.hex)}})}),d=Z.Z.useForm(),y=(0,l.Z)(d,1),W=y[0];return(0,t.jsx)(z.Z,{title:"Add Label",visible:o.visible,onCancel:o.onCancel,footer:null,children:(0,t.jsxs)(Z.Z,{form:W,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1,labelname:(B=o.defaultLabel)===null||B===void 0?void 0:B.name},onFinish:function(C){var T={name:C.labelname,color:O};o.onLabelAdd(T),W.resetFields()},autoComplete:"off",children:[(0,t.jsx)(Z.Z.Item,{label:"Label Name",name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,t.jsx)(X.Z,{})}),a,(0,t.jsx)(Z.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,t.jsxs)(E.Z,{children:[(0,t.jsx)(P.Z,{onClick:function(){var C;(C=o.onCancel)===null||C===void 0||C.call(0),W.resetFields()},children:"\u53D6\u6D88"}),(0,t.jsx)(P.Z,{type:"primary",htmlType:"submit",children:"\u786E\u5B9A"})]})})]})})},K=U,p=function(o){var _;console.log("render pplabellist");var B=(0,s.useState)(!1),m=(0,l.Z)(B,2),A=m[0],O=m[1];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(v.ZP,{className:u().labelList,size:"large",header:(0,t.jsx)("div",{className:u().listHeader,children:"Label List"}),footer:(0,t.jsx)("div",{children:(0,t.jsx)(P.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){O(!0)},block:!0,children:"Add Label"})}),bordered:!0,dataSource:o.labels,renderItem:function(a){return(0,t.jsx)(j,{hideColorPicker:o.hideColorPicker,hideEye:o.hideEye,onClick:o.onLabelSelect,label:a,onLabelDelete:o.onLabelDelete,onLabelModify:o.onLabelModify})}}),(0,t.jsx)(K,{hideColorPicker:o.hideColorPicker,order:(_=o.labels)===null||_===void 0?void 0:_.length,visible:A,onLabelAdd:function(a){o.onLabelAdd(a),O(!1)},onCancel:function(){O(!1)}})]})},N=p},8088:function(i,M,e){"use strict";var I=e(67294),v=e(78677),g=e.n(v),P=e(85893),l=function(c){return(0,P.jsx)("div",{className:"".concat(g().container," ").concat(c.className),children:c.children})};M.Z=l},57436:function(i,M,e){"use strict";var I=e(91220),v=e(2824),g=e(67294),P=e(65031),l=e(84420),s=e.n(l),c=e(83930),u=e.n(c),L=e(85893),E="./pics/basketball.jpg",f=function(n){var D=s()(n.imgSrc||""),t=(0,v.Z)(D,1),h=t[0],j=(h==null?void 0:h.width)||0,$=(h==null?void 0:h.height)||0,z=(0,g.useState)(),r=(0,v.Z)(z,2),X=r[0],k=r[1],Z=(0,g.useState)(),F=(0,v.Z)(Z,2),U=F[0],K=F[1],p=(0,g.useState)({x:0,y:0}),N=(0,v.Z)(p,2),R=N[0],o=N[1];function _(){var a=document.getElementById("dr");a&&(k(a.clientWidth),K(a.clientHeight))}(0,g.useEffect)(function(){window.removeEventListener("resize",_),window.addEventListener("resize",_);var a=document.getElementById("dr");a&&(k(a.clientWidth),K(a.clientHeight),o({x:a.clientWidth/2,y:a.clientHeight/2}))},[]);var B=[];if(n.annotations){var m=(0,I.Z)(n.annotations),A;try{for(m.s();!(A=m.n()).done;){var O=A.value;if(!!O){var b=O.tool=="polygon"?n.createPolygonFunc:n.createBrushFunc;b&&B.push(b(O,n.onAnnotationModify,n.onAnnotationModifyComplete,n.scale,n.currentTool,n.setCurrentAnnotation,n.currentAnnotation))}}}catch(a){m.e(a)}finally{m.f()}}return(0,L.jsx)(P.Hf,{width:X,height:U,className:u().stage,children:(0,L.jsx)(P.mh,{onMouseDown:function(d){n.onMouseDown&&n.onMouseDown(d,n.scale)},onMouseMove:function(d){n.onMouseMove&&n.onMouseMove(d,n.scale)},onMouseUp:function(d){n.onMouseUp&&n.onMouseUp(d,n.scale)},onContextMenu:function(d){d.evt.preventDefault()},draggable:!1,children:(0,L.jsxs)(P.ZA,{draggable:n.currentTool=="mover",onDragEnd:function(d){},children:[(0,L.jsx)(P.Ee,{draggable:!1,image:h,x:R.x,y:R.y,offsetX:j/2,offsetY:$/2,scaleX:n.scale,scaleY:n.scale}),B]})})})};M.Z=f},44434:function(i,M,e){"use strict";var I=e(67294),v=e(80961),g=e.n(v),P=e(85893),l=function(c){var u=g().leftToolbar;return c.disLoc=="right"&&(u=g().rightToolbar),(0,P.jsx)("div",{className:u,children:c.children})};M.Z=l},61541:function(i,M,e){"use strict";var I=e(49111),v=e(19650),g=e(67294),P=e(82499),l=e.n(P),s=e(85893),c=function(L){return(0,s.jsx)("div",{unselectable:"on",className:"".concat(l().toolBarButtonContainerWrapper," ").concat(L.active&&l().toolBarButtonContainerWrapperActive),onClick:L.onClick,children:(0,s.jsx)(v.Z,{align:"center",className:l().toolBarButtonContainer,size:0,children:(0,s.jsxs)(v.Z,{align:"center",direction:"vertical",className:l().toolBarButton,size:0,children:[(0,s.jsx)("img",{src:L.imgSrc}),(0,s.jsx)("div",{className:l().buttonText,children:L.children})]})})})};M.Z=c},29214:function(i,M,e){"use strict";e.r(M);var I=e(11849),v=e(20228),g=e(11382),P=e(34669),l=e(54458),s=e(34792),c=e(48086),u=e(86582),L=e(91220),E=e(2824),f=e(67294),S=e(73199),n=e.n(S),D=e(8088),t=e(61541),h=e(44434),j=e(5041),$=e(57436),z=e(64322),r=e(85893),X=localStorage.getItem("basePath"),k=function(){var F,U,K=(0,f.useState)("mover"),p=(0,E.Z)(K,2),N=p[0],R=p[1],o=function(T){if(console.log("selectLabel",d.curr,y.curr,a.all),T.active)a.create({taskId:d.curr.taskId,labelId:T.labelId,dataId:y.curr.dataId});else{var Y=a.all.filter(function(H){return H.labelId==T.labelId})[0];console.log("filter ann ",Y),a.remove(Y.annotationId)}console.log("selectlabel",T)},_=function(T,Y){var H=(0,L.Z)(T),V;try{var G=function(){var Q=V.value,w=Y.filter(function(q){return q.label.labelId==Q.labelId});w.length!=0&&(Q.active=!0)};for(H.s();!(V=H.n()).done;)G()}catch(J){H.e(J)}finally{H.f()}console.log("label.all toggled",x.all),x.setAll((0,u.Z)(T))},B=(0,z.$L)(f.useState,f.useEffect,{label:{oneHot:!1,postOnSelect:o},effectTrigger:{postTaskChange:_}}),m=(0,E.Z)(B,8),A=m[0],O=m[1],b=m[2],a=m[3],d=m[4],y=m[5],W=m[6],x=m[7];return(0,r.jsxs)(D.Z,{className:n().classes,children:[(0,r.jsxs)(h.Z,{children:[(0,r.jsx)(t.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){b.change(.1)},children:"Zoom in"}),(0,r.jsx)(t.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){b.change(-.1)},children:"Zoom out"}),(0,r.jsx)(t.Z,{imgSrc:"./pics/buttons/save.png",onClick:function(){c.default.info("Annotations are saved automatically. You don't need to click save.")},children:"Save"}),(0,r.jsx)(t.Z,{imgSrc:"./pics/buttons/move.png",onClick:function(){R("mover"),c.default.info("You can move the image now.")},children:"Move"})]}),(0,r.jsx)("div",{id:"dr",className:n().mainStage,children:(0,r.jsxs)(g.Z,{tip:"loading",spinning:A,children:[(0,r.jsx)("div",{className:n().draw,children:(0,r.jsx)($.Z,{scale:b.curr,currentTool:N,setCurrentAnnotation:function(){},onAnnotationModify:function(){},onAnnotationModifyComplete:function(){},imgSrc:y.imgSrc})}),(0,r.jsx)("div",{className:n().pblock,children:(0,r.jsxs)("div",{className:n().progress,children:[(0,r.jsx)(l.Z,{percent:d.progress,status:"active"})," ",d.currIdx," ",(F=d.all)===null||F===void 0?void 0:F.length," ",Math.floor(((U=d.all)===null||U===void 0?void 0:U.length)*d.progress/100)]})}),(0,r.jsx)("div",{className:n().prevTask,onClick:d.prevTask}),(0,r.jsx)("div",{className:n().nextTask,onClick:d.nextTask})]})}),(0,r.jsxs)(h.Z,{disLoc:"right",children:[(0,r.jsx)(t.Z,{imgSrc:"./pics/buttons/export.png",children:"Export"}),(0,r.jsx)(t.Z,{imgSrc:"./pics/buttons/data_division.png",children:"Split Dataset"})]}),(0,r.jsx)("div",{className:n().rightSideBar,children:(0,r.jsx)(j.Z,{labels:x.all,onLabelSelect:x.onSelect,onLabelAdd:function(T){return x.create((0,I.Z)((0,I.Z)({},T),{},{projectId:W.curr.projectId}))},onLabelDelete:x.remove,onLabelModify:function(){},hideColorPicker:!0,hideEye:!0})})]})};M.default=k}}]);
