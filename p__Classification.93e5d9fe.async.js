(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[672],{41435:function(u,M,e){"use strict";e.d(M,{Z:function(){return _}});var F=e(94663),P=e(80112);function C(m){return Function.toString.call(m).indexOf("[native code]")!==-1}var f=e(18597);function s(m,v,L){return(0,f.Z)()?s=Reflect.construct:s=function(E,p,n){var i=[null];i.push.apply(i,p);var t=Function.bind.apply(E,i),d=new t;return n&&(0,P.Z)(d,n.prototype),d},s.apply(null,arguments)}function _(m){var v=typeof Map=="function"?new Map:void 0;return _=function(g){if(g===null||!C(g))return g;if(typeof g!="function")throw new TypeError("Super expression must either be null or a function");if(typeof v!="undefined"){if(v.has(g))return v.get(g);v.set(g,E)}function E(){return s(g,arguments,(0,F.Z)(this).constructor)}return E.prototype=Object.create(g.prototype,{constructor:{value:E,enumerable:!1,writable:!0,configurable:!0}}),(0,P.Z)(E,g)},_(m)}},52822:function(u){u.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},5882:function(u){u.exports={listItem:"listItem___vtDXn",eye:"eye___AsLBS",roundBall:"roundBall___1J_R3",popover:"popover___1x-2R",listItemActive:"listItemActive___3FRb7"}},56131:function(u){u.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},78677:function(u){u.exports={container:"container___G0FNe"}},83930:function(u){u.exports={stage:"stage___3H5QL"}},80961:function(u){u.exports={leftToolbar:"leftToolbar___1xi4t",rightToolbar:"rightToolbar___3dNSB"}},82499:function(u){u.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},73199:function(u){u.exports={classes:"classes___3trCU",mainStage:"mainStage___3ajeT",prevTask:"prevTask___1O-ND",nextTask:"nextTask___2SQX8",draw:"draw___3nlFC",pblock:"pblock___2fZaD",progress:"progress___K3vmc",rightSideBar:"rightSideBar___aFTer"}},63097:function(u,M,e){"use strict";var F=e(20136),P=e(55241),C=e(2824),f=e(67294),s=e(52822),_=e.n(s),m=e(63144),v=e(85893),L=function(E){var p=(0,f.useState)(E.color||"#FFF"),n=(0,C.Z)(p,2),i=n[0],t=n[1];return(0,f.useEffect)(function(){t(E.color||"#FFF")},[E]),E.changeable?(0,v.jsx)(P.Z,{getPopupContainer:function(S){return S.parentElement||document.body},overlayClassName:_().popover,openClassName:_().popoverOpenClassName,placement:"bottom",content:(0,v.jsx)(m.xS,{disableAlpha:!0,color:i,onChange:function(S){t(S.hex)},onChangeComplete:E.onChange}),trigger:"click",children:(0,v.jsx)("div",{className:_().roundBall,style:{backgroundColor:i}})}):(0,v.jsx)("div",{className:_().roundBall,style:{backgroundColor:i}})};M.Z=L},5041:function(u,M,e){"use strict";e.d(M,{Z:function(){return U}});var F=e(54421),P=e(38272),C=e(57663),f=e(71577),s=e(2824),_=e(67294),m=e(56131),v=e.n(m),L=e(49111),g=e(19650),E=e(11849),p=e(5882),n=e.n(p),i=e(63097),t=e(85893),d=function(o){var c=(0,E.Z)({},o.label),A=(0,_.useState)(c.invisible),D=(0,s.Z)(A,2),T=D[0],O=D[1],B=(0,t.jsx)(P.ZP.Item,{className:"".concat(n().listItem," ").concat(c.active?n().listItemActive:""),unselectable:"on",onClick:function(){o.onClick(c)},children:(0,t.jsxs)(g.Z,{align:"center",size:5,children:[(0,t.jsx)("a",{className:n().eye,style:{backgroundImage:T?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(){O(!T),o.onLabelModify(c)}})," ",c.name,(0,t.jsx)(i.Z,{color:c.color,changeable:!0,onChange:function(b){c.color=b.hex,o.onLabelModify(c)}}),(0,t.jsx)("a",{className:n().eye,style:{backgroundImage:"url(./pics/delete.png)"},onClick:function(b){b.stopPropagation(),o.onLabelDelete(c)}})]})});return B},S=d,W=e(71194),H=e(50146),z=e(47673),V=e(24044),X=e(9715),h=e(93766),l=["#FF0000","#008000","#0000FF","#FFFF00","#FFA500","#00FFFF","#8B00FF","#FFC0CB","#7CFC00","#007FFF","#800080","#36BF36","#DAA520","#800000","#008B8B","#B22222","#E6D933","#000080","#FF00FF","#FFFF99","#87CEEB","#5C50E6","#CD5C5C","#20B2AA","#E680FF","#4D1F00","#006374","#B399FF","#8B4513","#BA55D3","#C0C0C0","#808080","#000000"],Y=function(o){var c,A,D=(0,_.useState)(((c=o.defaultLabel)===null||c===void 0?void 0:c.color)||l[o.order||0]),T=(0,s.Z)(D,2),O=T[0],B=T[1];(0,_.useEffect)(function(){var y;B(((y=o.defaultLabel)===null||y===void 0?void 0:y.color)||l[o.order||0])},[o]);var a=h.Z.useForm(),b=(0,s.Z)(a,1),R=b[0];return(0,t.jsx)(H.Z,{title:"Add Label",visible:o.visible,onCancel:o.onCancel,footer:null,children:(0,t.jsxs)(h.Z,{form:R,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1,labelname:(A=o.defaultLabel)===null||A===void 0?void 0:A.name},onFinish:function(x){var r={name:x.labelname,color:O};o.onLabelAdd(r),R.resetFields()},autoComplete:"off",children:[(0,t.jsx)(h.Z.Item,{label:"Label Name",name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,t.jsx)(V.Z,{})}),(0,t.jsx)(h.Z.Item,{label:"Select Color",name:"color",children:(0,t.jsx)(i.Z,{color:O,onChange:function(x){B(x.hex)}})}),(0,t.jsx)(h.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,t.jsxs)(g.Z,{children:[(0,t.jsx)(f.Z,{onClick:function(){var x;(x=o.onCancel)===null||x===void 0||x.call(0),R.resetFields()},children:"\u53D6\u6D88"}),(0,t.jsx)(f.Z,{type:"primary",htmlType:"submit",children:"\u786E\u5B9A"})]})})]})})},$=Y,J=function(o){var c;console.log("render pplabellist");var A=(0,_.useState)(!1),D=(0,s.Z)(A,2),T=D[0],O=D[1];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(P.ZP,{className:v().labelList,size:"large",header:(0,t.jsx)("div",{className:v().listHeader,children:"Label List"}),footer:(0,t.jsx)("div",{children:(0,t.jsx)(f.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){O(!0)},block:!0,children:"Add Label"})}),bordered:!0,dataSource:o.labels,renderItem:function(a){return(0,t.jsx)(S,{onClick:o.onLabelSelect,label:a,onLabelDelete:o.onLabelDelete,onLabelModify:o.onLabelModify})}}),(0,t.jsx)($,{order:(c=o.labels)===null||c===void 0?void 0:c.length,visible:T,onLabelAdd:function(a){o.onLabelAdd(a),O(!1)},onCancel:function(){O(!1)}})]})},U=J},8088:function(u,M,e){"use strict";var F=e(67294),P=e(78677),C=e.n(P),f=e(85893),s=function(m){return(0,f.jsx)("div",{className:"".concat(C().container," ").concat(m.className),children:m.children})};M.Z=s},57436:function(u,M,e){"use strict";var F=e(91220),P=e(2824),C=e(67294),f=e(65031),s=e(84420),_=e.n(s),m=e(83930),v=e.n(m),L=e(85893),g="./pics/basketball.jpg",E=function(n){var i=_()(n.imgSrc||""),t=(0,P.Z)(i,1),d=t[0],S=(d==null?void 0:d.width)||0,W=(d==null?void 0:d.height)||0,H=(0,C.useState)(),z=(0,P.Z)(H,2),V=z[0],X=z[1],h=(0,C.useState)(),l=(0,P.Z)(h,2),Y=l[0],$=l[1],J=(0,C.useState)({x:0,y:0}),U=(0,P.Z)(J,2),Z=U[0],o=U[1];function c(){var a=document.getElementById("dr");a&&(X(a.clientWidth),$(a.clientHeight))}(0,C.useEffect)(function(){window.removeEventListener("resize",c),window.addEventListener("resize",c);var a=document.getElementById("dr");a&&(X(a.clientWidth),$(a.clientHeight),o({x:a.clientWidth/2,y:a.clientHeight/2}))},[]);var A=[];if(n.annotations){var D=(0,F.Z)(n.annotations),T;try{for(D.s();!(T=D.n()).done;){var O=T.value;if(!!O){var B=O.tool=="polygon"?n.createPolygonFunc:n.createBrushFunc;B&&A.push(B(O,n.onAnnotationModify,n.onAnnotationModifyComplete,n.scale,n.currentTool,n.setCurrentAnnotation,n.currentAnnotation))}}}catch(a){D.e(a)}finally{D.f()}}return(0,L.jsx)(f.Hf,{width:V,height:Y,className:v().stage,children:(0,L.jsx)(f.mh,{onMouseDown:function(b){n.onMouseDown&&n.onMouseDown(b,n.scale)},onMouseMove:function(b){n.onMouseMove&&n.onMouseMove(b,n.scale)},onMouseUp:function(b){n.onMouseUp&&n.onMouseUp(b,n.scale)},onContextMenu:function(b){b.evt.preventDefault()},draggable:!1,children:(0,L.jsxs)(f.ZA,{draggable:n.currentTool=="mover",onDragEnd:function(b){},children:[(0,L.jsx)(f.Ee,{draggable:!1,image:d,x:Z.x,y:Z.y,offsetX:S/2,offsetY:W/2,scaleX:n.scale,scaleY:n.scale}),A]})})})};M.Z=E},44434:function(u,M,e){"use strict";var F=e(67294),P=e(80961),C=e.n(P),f=e(85893),s=function(m){var v=C().leftToolbar;return m.disLoc=="right"&&(v=C().rightToolbar),(0,f.jsx)("div",{className:v,children:m.children})};M.Z=s},61541:function(u,M,e){"use strict";var F=e(49111),P=e(19650),C=e(67294),f=e(82499),s=e.n(f),_=e(85893),m=function(L){return(0,_.jsx)("div",{unselectable:"on",className:"".concat(s().toolBarButtonContainerWrapper," ").concat(L.active&&s().toolBarButtonContainerWrapperActive),onClick:L.onClick,children:(0,_.jsx)(P.Z,{align:"center",className:s().toolBarButtonContainer,size:0,children:(0,_.jsxs)(P.Z,{align:"center",direction:"vertical",className:s().toolBarButton,size:0,children:[(0,_.jsx)("img",{src:L.imgSrc}),(0,_.jsx)("div",{className:s().buttonText,children:L.children})]})})})};M.Z=m},29214:function(u,M,e){"use strict";e.r(M);var F=e(11849),P=e(20228),C=e(11382),f=e(34669),s=e(54458),_=e(34792),m=e(48086),v=e(86582),L=e(91220),g=e(3182),E=e(2824),p=e(94043),n=e.n(p),i=e(67294),t=e(73199),d=e.n(t),S=e(8088),W=e(61541),H=e(44434),z=e(5041),V=e(57436),X=e(37071),h=e(64322),l=e(85893),Y=localStorage.getItem("basePath"),$=function(){var U,Z,o,c=(0,i.useState)("mover"),A=(0,E.Z)(c,2),D=A[0],T=A[1],O=(0,i.useState)(!1),B=(0,E.Z)(O,2),a=B[0],b=B[1],R=X.Z.getQueryVariable("projectId"),y=(0,h._D)(i.useState),x=(0,h.CV)(i.useState),r=(0,h.iA)(i.useState),w=(0,h.A5)(i.useState),te=(0,h.Gd)(i.useState),ue=function(K){if(console.log("selectLabel",r.curr,w.curr,x.all),K.active)x.create({taskId:r.curr.taskId,labelId:K.labelId,dataId:w.curr.dataId});else{var G=x.all.filter(function(q){return q.labelId==K.labelId})[0];console.log("filter ann ",G),x.remove(G.annotationId)}console.log("selectlabel",K)},j=(0,h.jL)(i.useState,{oneHot:!1,pageOnSelect:ue});return(0,i.useEffect)(function(){te.getCurr(R),j.getAll(R),r.getAll(R),r.getProgress(R)},[]),(0,i.useEffect)(function(){r.all&&r.all.length!=0&&r.turnTo(0)},[r.all]),(0,i.useEffect)(function(){if(r.currIdx!=null){var I=function(){var K=(0,g.Z)(n().mark(function G(){var q,ne,de,oe,ae,Q,le,re,k,se,_e;return n().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:return console.log("onTaskChange",r.curr,j.all,r.progress),r.getProgress(r.curr.projectId),N.next=4,w.getAll(r.curr.taskId,0);case 4:return q=N.sent,ne=(0,E.Z)(q,2),de=ne[0],oe=ne[1],N.next=10,x.getAll(oe.dataId);case 10:ae=N.sent,Q=(0,L.Z)(j.all);try{for(Q.s();!(le=Q.n()).done;)re=le.value,re.active=!1}catch(ee){Q.e(ee)}finally{Q.f()}k=(0,L.Z)(j.all);try{for(_e=function(){var ie=se.value,ce=ae.filter(function(me){return me.label.labelId==ie.labelId});ce.length!=0&&(ie.active=!0)},k.s();!(se=k.n()).done;)_e()}catch(ee){k.e(ee)}finally{k.f()}console.log("label.all toggled",j.all),j.setAll((0,v.Z)(j.all)),b(!1);case 18:case"end":return N.stop()}},G)}));return function(){return K.apply(this,arguments)}}();I()}},[r.currIdx]),(0,l.jsxs)(S.Z,{className:d().classes,children:[(0,l.jsxs)(H.Z,{children:[(0,l.jsx)(W.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){y.change(.1)},children:"Zoom in"}),(0,l.jsx)(W.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){y.change(-.1)},children:"Zoom out"}),(0,l.jsx)(W.Z,{imgSrc:"./pics/buttons/save.png",onClick:function(){m.default.info("Annotations are saved automatically. You don't need to click save.")},children:"Save"}),(0,l.jsx)(W.Z,{imgSrc:"./pics/buttons/move.png",onClick:function(){T("mover"),m.default.info("You can move the image now.")},children:"Move"})]}),(0,l.jsx)("div",{id:"dr",className:d().mainStage,children:(0,l.jsxs)(C.Z,{tip:"loading",spinning:a,children:[(0,l.jsx)("div",{className:d().draw,children:(0,l.jsx)(V.Z,{scale:y.curr,currentTool:D,setCurrentAnnotation:function(){},onAnnotationModify:function(){},onAnnotationModifyComplete:function(){},imgSrc:"".concat(Y,"/datas/").concat((U=w.curr)===null||U===void 0?void 0:U.dataId,"/image")})}),(0,l.jsx)("div",{className:d().pblock,children:(0,l.jsxs)("div",{className:d().progress,children:[(0,l.jsx)(s.Z,{percent:r.progress,status:"active"})," ",r.currIdx," ",(Z=r.all)===null||Z===void 0?void 0:Z.length," ",Math.floor(((o=r.all)===null||o===void 0?void 0:o.length)*r.progress/100)]})}),(0,l.jsx)("div",{className:d().prevTask,onClick:function(){return r.turnTo(r.currIdx-1)}}),(0,l.jsx)("div",{className:d().nextTask,onClick:function(){return r.turnTo(r.currIdx+1)}})]})}),(0,l.jsxs)(H.Z,{disLoc:"right",children:[(0,l.jsx)(W.Z,{imgSrc:"./pics/buttons/export.png",children:"Export"}),(0,l.jsx)(W.Z,{imgSrc:"./pics/buttons/data_division.png",children:"Split Dataset"})]}),(0,l.jsx)("div",{className:d().rightSideBar,children:(0,l.jsx)(z.Z,{labels:j.all,selectedLabel:j.curr,onLabelSelect:j.onSelect,onLabelAdd:function(K){return j.create((0,F.Z)((0,F.Z)({},K),{},{projectId:te.curr.projectId}))},onLabelDelete:j.remove,onLabelModify:function(){}})})]})};M.default=$}}]);
