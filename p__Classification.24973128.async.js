(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[672],{41435:function(s,m,e){"use strict";e.d(m,{Z:function(){return _}});var h=e(94663),v=e(80112);function L(g){return Function.toString.call(g).indexOf("[native code]")!==-1}var M=e(18597);function r(g,c,B){return(0,M.Z)()?r=Reflect.construct:r=function(x,W,t){var I=[null];I.push.apply(I,W);var a=Function.bind.apply(x,I),f=new a;return t&&(0,v.Z)(f,t.prototype),f},r.apply(null,arguments)}function _(g){var c=typeof Map=="function"?new Map:void 0;return _=function(P){if(P===null||!L(P))return P;if(typeof P!="function")throw new TypeError("Super expression must either be null or a function");if(typeof c!="undefined"){if(c.has(P))return c.get(P);c.set(P,x)}function x(){return r(P,arguments,(0,h.Z)(this).constructor)}return x.prototype=Object.create(P.prototype,{constructor:{value:x,enumerable:!1,writable:!0,configurable:!0}}),(0,v.Z)(x,P)},_(g)}},52822:function(s){s.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},6277:function(s){s.exports={modal:"modal___26yNn"}},45092:function(s){s.exports={modal:"modal___1H_FQ"}},5882:function(s){s.exports={listItem:"listItem___vtDXn",eye:"eye___AsLBS",roundBall:"roundBall___1J_R3",popover:"popover___1x-2R",delete:"delete___WHPf2",listItemActive:"listItemActive___3FRb7"}},56131:function(s){s.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},78677:function(s){s.exports={container:"container___G0FNe"}},83930:function(s){s.exports={stage:"stage___3H5QL"}},80961:function(s){s.exports={leftToolbar:"leftToolbar___1xi4t",rightToolbar:"rightToolbar___3dNSB"}},82499:function(s){s.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},73199:function(){},63097:function(s,m,e){"use strict";var h=e(20136),v=e(55241),L=e(2824),M=e(67294),r=e(52822),_=e.n(r),g=e(63144),c=e(85893),B=function(x){var W=(0,M.useState)(x.color||"#FFF"),t=(0,L.Z)(W,2),I=t[0],a=t[1];return(0,M.useEffect)(function(){a(x.color||"#FFF")},[x]),x.changeable?(0,c.jsx)(v.Z,{getPopupContainer:function(R){return R.parentElement||document.body},overlayClassName:_().popover,openClassName:_().popoverOpenClassName,placement:"bottom",content:(0,c.jsx)(g.xS,{disableAlpha:!0,color:I,onChange:function(R){a(R.hex)},onChangeComplete:x.onChange}),trigger:"click",children:(0,c.jsx)("div",{className:_().roundBall,style:{backgroundColor:I}})}):(0,c.jsx)("div",{className:_().roundBall,style:{backgroundColor:I}})};m.Z=B},85871:function(s,m,e){"use strict";var h=e(71194),v=e(50146),L=e(49111),M=e(19650),r=e(57663),_=e(71577),g=e(13062),c=e(71230),B=e(89032),P=e(15746),x=e(77883),W=e(70507),t=e(34792),I=e(48086),a=e(9715),f=e(93766),R=e(2824),D=e(67294),T=e(48971),G=e(6277),o=e.n(G),u=e(85893),y=function(U){var A=(0,T.YB)(),F=(0,D.useState)(60),N=(0,R.Z)(F,2),K=N[0],p=N[1],n=(0,D.useState)(20),l=(0,R.Z)(n,2),C=l[0],E=l[1],j=(0,D.useState)(20),i=(0,R.Z)(j,2),O=i[0],S=i[1],$=(0,D.useState)(!1),Z=(0,R.Z)($,2),Y=Z[0],X=Z[1],k=(0,T.YB)().formatMessage({id:"pages.toolBar.divideData"}),z=(0,T.YB)().formatMessage({id:"component.PPDivideDataModal.train"}),H=(0,T.YB)().formatMessage({id:"component.PPDivideDataModal.validation"}),J=(0,T.YB)().formatMessage({id:"component.PPDivideDataModal.test"}),Q=(0,T.YB)().formatMessage({id:"component.PPCreater.cancel"}),V=(0,T.YB)().formatMessage({id:"component.PPSegMode.ok"}),q=f.Z.useForm(),te=(0,R.Z)(q,1),ee=te[0];return(0,u.jsx)(v.Z,{className:o().modal,title:k,visible:U.visible,onCancel:U.onCancel,footer:null,children:(0,u.jsxs)(f.Z,{form:ee,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(){if(K+C+O!=100){I.default.error("Train, Validation and Test total percent should equal 100!");return}console.log("x trainData: ".concat(K,", validationData: ").concat(C,", testData: ").concat(O,", props.project.curr.projectId: ").concat(U.project.curr.projectId)),X(!0),U.splitDataset(U.project.curr.projectId,{train:K*.01,validation:C*.01,test:O*.01}).then(function(){var d;console.log("success"),I.default.success(A.formatMessage({id:"component.PPDivideDataModal.success"})),(d=U.onFinish)===null||d===void 0||d.call(0)}).finally(function(){X(!1)})},autoComplete:"off",layout:"vertical",children:[(0,u.jsxs)(c.Z,{children:[(0,u.jsx)(P.Z,{span:8,children:(0,u.jsx)(f.Z.Item,{label:z,name:"train",children:(0,u.jsx)(W.Z,{addonAfter:"%",defaultValue:60,precision:0,min:0,max:100,value:K,onChange:p})})}),(0,u.jsx)(P.Z,{span:8,children:(0,u.jsx)(f.Z.Item,{label:H,name:"validation",children:(0,u.jsx)(W.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:C,onChange:E})})}),(0,u.jsx)(P.Z,{span:8,children:(0,u.jsx)(f.Z.Item,{label:J,name:"test",children:(0,u.jsx)(W.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:O,onChange:S})})})]}),(0,u.jsx)(f.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,u.jsxs)(M.Z,{children:[(0,u.jsx)(_.Z,{onClick:function(){var d;(d=U.onCancel)===null||d===void 0||d.call(0),ee.resetFields()},children:Q}),(0,u.jsx)(_.Z,{type:"primary",htmlType:"submit",loading:Y,children:V})]})})]})})};m.Z=y},62850:function(s,m,e){"use strict";var h=e(71194),v=e(50146),L=e(49111),M=e(19650),r=e(57663),_=e(71577),g=e(47673),c=e(24044),B=e(34792),P=e(48086),x=e(9715),W=e(93766),t=e(2824),I=e(67294),a=e(48971),f=e(45092),R=e.n(f),D=e(85893),T=function(o){var u=(0,a.YB)(),y=(0,I.useState)(!1),b=(0,t.Z)(y,2),U=b[0],A=b[1],F=(0,a.YB)().formatMessage({id:"component.PPCreater.cancel"}),N=W.Z.useForm(),K=(0,t.Z)(N,1),p=K[0];return(0,D.jsx)(v.Z,{className:R().modal,title:(0,a.YB)().formatMessage({id:"component.PPExportModal.title"}),visible:o.visible,onCancel:o.onCancel,footer:null,children:(0,D.jsxs)(W.Z,{form:p,name:"basic",labelCol:{span:6},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(l){console.log(l);var C=l.path;if(!C){P.default.error(u.formatMessage({id:"component.PPExportModal.pathNotNull"}));return}A(!0),o.exportDataset(o.project.curr.projectId,C).then(function(){var E;P.default.success(u.formatMessage({id:"component.PPExportModal.exportSuccess"})),(E=o.onFinish)===null||E===void 0||E.call(0)}).finally(function(){A(!1)})},autoComplete:"off",children:[(0,D.jsx)(W.Z.Item,{label:u.formatMessage({id:"component.PPExportModal.path"}),name:"path",children:(0,D.jsx)(c.Z,{})}),(0,D.jsx)(W.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,D.jsxs)(M.Z,{children:[(0,D.jsx)(_.Z,{onClick:function(){var l;(l=o.onCancel)===null||l===void 0||l.call(0),p.resetFields()},children:F}),(0,D.jsx)(_.Z,{type:"primary",htmlType:"submit",loading:U,children:u.formatMessage({id:"component.PPExportModal.export"})})]})})]})})};m.Z=T},5041:function(s,m,e){"use strict";e.d(m,{Z:function(){return K}});var h=e(54421),v=e(38272),L=e(57663),M=e(71577),r=e(2824),_=e(67294),g=e(56131),c=e.n(g),B=e(49111),P=e(19650),x=e(11849),W=e(5882),t=e.n(W),I=e(63097),a=e(85893),f=function(n){var l=(0,x.Z)({},n.label),C=(0,_.useState)(l.invisible),E=(0,r.Z)(C,2),j=E[0],i=E[1],O=(0,_.useState)(0),S=(0,r.Z)(O,2),$=S[0],Z=S[1],Y=n.hideEye?" ":(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("a",{className:t().eye,style:{backgroundImage:j?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(H){H.stopPropagation(),i(!j),n.onLabelModify(l)}})," "]}),X=n.hideColorPicker?(0,a.jsx)(a.Fragment,{}):(0,a.jsx)(I.Z,{color:l.color,changeable:!0,onChange:function(H){l.color=H.hex,n.onLabelModify(l)}}),k=(0,a.jsxs)(v.ZP.Item,{className:"".concat(t().listItem," ").concat(n.active?t().listItemActive:""),unselectable:"on",onClick:function(){n.onClick(l)},children:[(0,a.jsxs)(P.Z,{align:"center",size:5,children:[Y,l.name,X]}),(0,a.jsx)("a",{className:t().delete,onClick:function(H){H.stopPropagation();var J=new Date().getTime();J-$<300||(Z(J),n.onLabelDelete(l))}})]});return k},R=f,D=e(71194),T=e(50146),G=e(47673),o=e(24044),u=e(9715),y=e(93766),b=e(48971),U=["#FF0000","#008000","#0000FF","#FFFF00","#FFA500","#00FFFF","#8B00FF","#FFC0CB","#7CFC00","#007FFF","#800080","#36BF36","#DAA520","#800000","#008B8B","#B22222","#E6D933","#000080","#FF00FF","#FFFF99","#87CEEB","#5C50E6","#CD5C5C","#20B2AA","#E680FF","#4D1F00","#006374","#B399FF","#8B4513","#BA55D3","#C0C0C0","#808080","#000000"],A=function(n){var l,C,E=(0,b.YB)().formatMessage({id:"component.PPAddLabelModal.selectColor"}),j=(0,b.YB)().formatMessage({id:"component.PPAddLabelModal.addLabel"}),i=(0,b.YB)().formatMessage({id:"component.PPAddLabelModal.labelName"}),O=(0,b.YB)().formatMessage({id:"component.PPCreater.cancel"}),S=(0,b.YB)().formatMessage({id:"component.PPSegMode.ok"}),$=(0,_.useState)(((l=n.defaultLabel)===null||l===void 0?void 0:l.color)||U[n.order||0]),Z=(0,r.Z)($,2),Y=Z[0],X=Z[1];(0,_.useEffect)(function(){var Q;X(((Q=n.defaultLabel)===null||Q===void 0?void 0:Q.color)||U[n.order||0])},[n]);var k=n.hideColorPicker?(0,a.jsx)(a.Fragment,{}):(0,a.jsx)(y.Z.Item,{label:E,name:"color",children:(0,a.jsx)(I.Z,{color:Y,onChange:function(V){X(V.hex)}})}),z=y.Z.useForm(),H=(0,r.Z)(z,1),J=H[0];return(0,a.jsx)(T.Z,{title:j,visible:n.visible,onCancel:n.onCancel,footer:null,children:(0,a.jsxs)(y.Z,{form:J,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1,labelname:(C=n.defaultLabel)===null||C===void 0?void 0:C.name},onFinish:function(V){var q={name:V.labelname,color:Y};n.onLabelAdd(q),J.resetFields()},autoComplete:"off",children:[(0,a.jsx)(y.Z.Item,{label:i,name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,a.jsx)(o.Z,{})}),k,(0,a.jsx)(y.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,a.jsxs)(P.Z,{children:[(0,a.jsx)(M.Z,{onClick:function(){var V;(V=n.onCancel)===null||V===void 0||V.call(0),J.resetFields()},children:O}),(0,a.jsx)(M.Z,{type:"primary",htmlType:"submit",children:S})]})})]})})},F=A,N=function(n){var l,C=(0,b.YB)().formatMessage({id:"component.PPLabelList.addLabel"}),E=(0,b.YB)().formatMessage({id:"component.PPLabelList.labelList"}),j=(0,_.useState)(!1),i=(0,r.Z)(j,2),O=i[0],S=i[1];return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(v.ZP,{className:c().labelList,size:"large",header:(0,a.jsx)("div",{className:c().listHeader,children:E}),footer:(0,a.jsx)("div",{children:(0,a.jsx)(M.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){S(!0)},block:!0,children:C})}),bordered:!0,dataSource:n.labels,renderItem:function(Z){var Y;return(0,a.jsx)(R,{hideColorPicker:n.hideColorPicker,hideEye:n.hideEye,onClick:n.onLabelSelect,label:Z,active:(Y=n.activeIds)===null||Y===void 0?void 0:Y.has(Z.labelId),onLabelDelete:n.onLabelDelete,onLabelModify:n.onLabelModify})}}),(0,a.jsx)(F,{hideColorPicker:n.hideColorPicker,order:(l=n.labels)===null||l===void 0?void 0:l.length,visible:O,onLabelAdd:function(Z){n.onLabelAdd(Z),S(!1)},onCancel:function(){S(!1)}})]})},K=N},8088:function(s,m,e){"use strict";var h=e(67294),v=e(78677),L=e.n(v),M=e(85893),r=function(g){return(0,M.jsx)("div",{className:"".concat(L().container," ").concat(g.className),children:g.children})};m.Z=r},57436:function(s,m,e){"use strict";var h=e(91220),v=e(2824),L=e(67294),M=e(65031),r=e(84420),_=e.n(r),g=e(83930),c=e.n(g),B=e(85893),P="./pics/basketball.jpg",x=function(t){var I=_()(t.imgSrc||P),a=(0,v.Z)(I,1),f=a[0],R=(0,L.useState)(0),D=(0,v.Z)(R,2),T=D[0],G=D[1],o=(0,L.useState)(0),u=(0,v.Z)(o,2),y=u[0],b=u[1],U=(0,L.useState)({x:0,y:0}),A=(0,v.Z)(U,2),F=A[0],N=A[1],K=(0,L.useRef)(null);function p(){var i=document.getElementById("dr");i&&(console.log("parentSize: ",i.clientWidth,i.clientHeight),G(i.clientWidth),b(i.clientHeight))}(0,L.useEffect)(function(){window.removeEventListener("resize",p),window.addEventListener("resize",p);var i=document.getElementById("dr");i&&(G(i.clientWidth),b(i.clientHeight))},[]);var n=[];if(t.annotations){var l=(0,h.Z)(t.annotations),C;try{for(l.s();!(C=l.n()).done;){var E=C.value;if(!!E){console.log("PPStage rendering annotation:",E,"annotation.tool:",E.tool);var j=void 0;switch(E.type){case"polygon":j=t.createPolygonFunc;break;case"brush":j=t.createBrushFunc;break;case"rubber":j=t.createBrushFunc;break;case"rectangle":j=t.createRectangleFunc;break;default:j=null}j&&n.push(j(E,t.onAnnotationModify,t.onAnnotationModifyComplete,t.scale,t.currentTool,t.setCurrentAnnotation,K,t.currentAnnotation))}}}catch(i){l.e(i)}finally{l.f()}}return(0,B.jsx)(M.Hf,{width:T,height:y,offsetX:-T/2,offsetY:-y/2,className:c().stage,ref:K,children:(0,B.jsx)(M.mh,{onMouseDown:function(O){t.onMouseDown&&t.onMouseDown(O,-T/2-F.x,-y/2-F.y,t.scale)},onMouseMove:function(O){t.onMouseMove&&t.onMouseMove(O,-T/2-F.x,-y/2-F.y,t.scale)},onMouseUp:function(O){t.onMouseUp&&t.onMouseUp(O,-T/2-F.x,-y/2-F.y,t.scale)},onContextMenu:function(O){O.evt.preventDefault()},draggable:!1,children:(0,B.jsxs)(M.ZA,{draggable:t.currentTool=="mover",scaleX:t.scale,scaleY:t.scale,onDragEnd:function(O){t.currentTool=="mover"&&N({x:O.target.x(),y:O.target.y()})},children:[(0,B.jsx)(M.Ee,{name:"baseImage",draggable:!1,image:f,x:-((f==null?void 0:f.width)||0)/2,y:-((f==null?void 0:f.height)||0)/2}),n]})})})};m.Z=x},44434:function(s,m,e){"use strict";var h=e(67294),v=e(80961),L=e.n(v),M=e(85893),r=function(g){var c=L().leftToolbar;return g.disLoc=="right"&&(c=L().rightToolbar),(0,M.jsx)("div",{className:c,children:g.children})};m.Z=r},61541:function(s,m,e){"use strict";var h=e(49111),v=e(19650),L=e(67294),M=e(82499),r=e.n(M),_=e(85893),g=function(B){return(0,_.jsx)("div",{unselectable:"on",className:"".concat(r().toolBarButtonContainerWrapper," ").concat(B.active&&r().toolBarButtonContainerWrapperActive),onClick:B.onClick,children:(0,_.jsx)(v.Z,{align:"center",className:r().toolBarButtonContainer,size:0,children:(0,_.jsxs)(v.Z,{align:"center",direction:"vertical",className:r().toolBarButton,size:0,children:[(0,_.jsx)("img",{src:B.imgSrc}),(0,_.jsx)("div",{className:r().buttonText,children:B.children})]})})})};m.Z=g},29214:function(s,m,e){"use strict";e.r(m);var h=e(11849),v=e(20228),L=e(11382),M=e(34669),r=e(54458),_=e(34792),g=e(48086),c=e(2824),B=e(67294),P=e(73199),x=e.n(P),W=e(8088),t=e(61541),I=e(44434),a=e(5041),f=e(57436),R=e(64322),D=e(48971),T=e(85871),G=e(62850),o=e(85893),u=function(){var b,U=(0,R.$L)(B.useState,B.useEffect,{label:{oneHot:!1,postSetCurr:ee},tool:{defaultTool:"mover"},effectTrigger:{postTaskChange:ne}}),A=(0,c.Z)(U,10),F=A[0],N=A[1],K=A[2],p=A[3],n=A[4],l=A[5],C=A[6],E=A[7],j=A[8],i=A[9],O=(0,B.useState)(!1),S=(0,c.Z)(O,2),$=S[0],Z=S[1],Y=(0,B.useState)(!1),X=(0,c.Z)(Y,2),k=X[0],z=X[1],H=(0,D.YB)().formatMessage({id:"pages.toolBar.zoomIn"}),J=(0,D.YB)().formatMessage({id:"pages.toolBar.zoomOut"}),Q=(0,D.YB)().formatMessage({id:"pages.toolBar.move"}),V=(0,D.YB)().formatMessage({id:"pages.toolBar.save"}),q=(0,D.YB)().formatMessage({id:"pages.toolBar.divideData"}),te=(0,D.YB)().formatMessage({id:"pages.toolBar.export"});function ee(d){if(E.isActive(d))p.create({taskId:n.curr.taskId,labelId:d.labelId,dataId:l.curr.dataId});else{var w=p.all.filter(function(ae){return ae.labelId==d.labelId})[0];p.remove(w.annotationId)}}function ne(d,w){N.setCurr(!0),!(!d||!w)&&(E.initActive(w),N.setCurr(!1))}return(0,o.jsxs)(W.Z,{className:x().classes,children:[(0,o.jsxs)(I.Z,{children:[(0,o.jsx)(t.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){K.change(.1)},children:H}),(0,o.jsx)(t.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){K.change(-.1)},children:J}),(0,o.jsx)(t.Z,{imgSrc:"./pics/buttons/save.png",onClick:function(){g.default.success("Save Success")},children:V}),(0,o.jsx)(t.Z,{imgSrc:"./pics/buttons/move.png",active:F.curr=="mover",onClick:function(){F.setCurr("mover")},children:Q})]}),(0,o.jsx)("div",{id:"dr",className:"mainStage",children:(0,o.jsxs)(L.Z,{tip:"loading",spinning:N.curr,children:[(0,o.jsx)("div",{className:"draw",children:(0,o.jsx)(f.Z,{scale:K.curr,currentTool:F.curr,setCurrentAnnotation:function(){},onAnnotationModify:function(){},onAnnotationModifyComplete:function(){},imgSrc:l.imgSrc})}),(0,o.jsx)("div",{className:"pblock",children:(0,o.jsxs)("div",{className:"progress",children:[(0,o.jsx)(r.Z,{className:"progressBar",percent:C.progress,status:"active",showInfo:!1})," ",(0,o.jsxs)("span",{className:"progressDesc",children:["Current labeling ",n.currIdx==null?1:n.currIdx+1," of"," ",(b=n.all)===null||b===void 0?void 0:b.length,". Already labeled ",n.finished(C.progress)||0,"."]})]})}),(0,o.jsx)("div",{className:"prevTask",onClick:n.prevTask}),(0,o.jsx)("div",{className:"nextTask",onClick:n.nextTask})]})}),(0,o.jsxs)(I.Z,{disLoc:"right",children:[(0,o.jsx)(t.Z,{imgSrc:"./pics/buttons/data_division.png",onClick:function(){Z(!0)},children:q}),(0,o.jsx)(t.Z,{imgSrc:"./pics/buttons/export.png",onClick:function(){z(!0)},children:te})]}),(0,o.jsx)("div",{className:"rightSideBar",children:(0,o.jsx)(a.Z,{labels:E.all,activeIds:E.activeIds,onLabelSelect:E.onSelect,onLabelAdd:function(w){return E.create((0,h.Z)((0,h.Z)({},w),{},{projectId:C.curr.projectId}))},onLabelDelete:E.remove,onLabelModify:function(){},hideColorPicker:!0,hideEye:!0})}),(0,o.jsx)(T.Z,{visible:$,splitDataset:j,project:C,onCancel:function(){Z(!1)},onFinish:function(){Z(!1)}}),(0,o.jsx)(G.Z,{visible:k,exportDataset:i,project:C,onCancel:function(){z(!1)},onFinish:function(){z(!1)}})]})};m.default=u},15746:function(s,m,e){"use strict";var h=e(21584);m.Z=h.Z},89032:function(s,m,e){"use strict";var h=e(38663),v=e.n(h),L=e(6999)},71230:function(s,m,e){"use strict";var h=e(92820);m.Z=h.Z},13062:function(s,m,e){"use strict";var h=e(38663),v=e.n(h),L=e(6999)}}]);
