(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[507],{52822:function(d){d.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},5882:function(d){d.exports={listItem:"listItem___vtDXn",eye:"eye___AsLBS",roundBall:"roundBall___1J_R3",popover:"popover___1x-2R",delete:"delete___WHPf2",listItemActive:"listItemActive___3FRb7"}},56131:function(d){d.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},78677:function(d){d.exports={container:"container___G0FNe"}},80961:function(d){d.exports={leftToolbar:"leftToolbar___1xi4t",rightToolbar:"rightToolbar___3dNSB"}},82499:function(d){d.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},63097:function(d,M,n){"use strict";var N=n(20136),u=n(55241),c=n(2824),i=n(67294),r=n(52822),l=n.n(r),a=n(63144),C=n(85893),F=function(L){var t=(0,i.useState)(L.color||"#FFF"),A=(0,c.Z)(t,2),R=A[0],e=A[1];return(0,i.useEffect)(function(){e(L.color||"#FFF")},[L]),L.changeable?(0,C.jsx)(u.Z,{getPopupContainer:function(S){return S.parentElement||document.body},overlayClassName:l().popover,openClassName:l().popoverOpenClassName,placement:"bottom",content:(0,C.jsx)(a.xS,{disableAlpha:!0,color:R,onChange:function(S){e(S.hex)},onChangeComplete:L.onChange}),trigger:"click",children:(0,C.jsx)("div",{className:l().roundBall,style:{backgroundColor:R}})}):(0,C.jsx)("div",{className:l().roundBall,style:{backgroundColor:R}})};M.Z=F},5041:function(d,M,n){"use strict";n.d(M,{Z:function(){return ee}});var N=n(54421),u=n(38272),c=n(57663),i=n(71577),r=n(2824),l=n(67294),a=n(56131),C=n.n(a),F=n(49111),X=n(19650),L=n(11849),t=n(5882),A=n.n(t),R=n(63097),e=n(85893),H=function(o){var s=(0,L.Z)({},o.label),f=(0,l.useState)(s.invisible),h=(0,r.Z)(f,2),P=h[0],U=h[1],D=(0,l.useState)(0),T=(0,r.Z)(D,2),B=T[0],y=T[1],g=o.hideEye?" ":(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("a",{className:A().eye,style:{backgroundImage:P?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(E){E.stopPropagation(),U(!P),o.onLabelModify(s)}})," "]}),b=o.hideColorPicker?(0,e.jsx)(e.Fragment,{}):(0,e.jsx)(R.Z,{color:s.color,changeable:!0,onChange:function(E){s.color=E.hex,o.onLabelModify(s)}}),Z=(0,e.jsxs)(u.ZP.Item,{className:"".concat(A().listItem," ").concat(o.active?A().listItemActive:""),unselectable:"on",onClick:function(){o.onClick(s)},children:[(0,e.jsxs)(X.Z,{align:"center",size:5,children:[g,s.name,b]}),(0,e.jsx)("a",{className:A().delete,onClick:function(E){E.stopPropagation();var I=new Date().getTime();I-B<300||(y(I),o.onLabelDelete(s))}})]});return Z},S=H,$=n(71194),z=n(50146),x=n(47673),p=n(24044),q=n(9715),j=n(93766),w=n(48971),G=["#FF0000","#008000","#0000FF","#FFFF00","#FFA500","#00FFFF","#8B00FF","#FFC0CB","#7CFC00","#007FFF","#800080","#36BF36","#DAA520","#800000","#008B8B","#B22222","#E6D933","#000080","#FF00FF","#FFFF99","#87CEEB","#5C50E6","#CD5C5C","#20B2AA","#E680FF","#4D1F00","#006374","#B399FF","#8B4513","#BA55D3","#C0C0C0","#808080","#000000"],k=function(o){var s,f,h=(0,w.YB)(),P=h.formatMessage({id:"component.PPAddLabelModal.selectColor"}),U=h.formatMessage({id:"component.PPAddLabelModal.addLabel"}),D=h.formatMessage({id:"component.PPAddLabelModal.labelName"}),T=h.formatMessage({id:"component.PPCreater.cancel"}),B=h.formatMessage({id:"component.PPSegMode.ok"}),y=(0,l.useState)(((s=o.defaultLabel)===null||s===void 0?void 0:s.color)||G[o.order||0]),g=(0,r.Z)(y,2),b=g[0],Z=g[1];(0,l.useEffect)(function(){var W;Z(((W=o.defaultLabel)===null||W===void 0?void 0:W.color)||G[o.order||0])},[o]);var O=o.hideColorPicker?(0,e.jsx)(e.Fragment,{}):(0,e.jsx)(j.Z.Item,{label:P,name:"color",children:(0,e.jsx)(R.Z,{color:b,changeable:!0,onChange:function(m){Z(m.hex)}})}),E=j.Z.useForm(),I=(0,r.Z)(E,1),K=I[0];return(0,e.jsx)(z.Z,{title:U,visible:o.visible,onCancel:o.onCancel,footer:null,children:(0,e.jsxs)(j.Z,{form:K,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1,labelname:(f=o.defaultLabel)===null||f===void 0?void 0:f.name},onFinish:function(m){var Y={name:m.labelname,color:b};o.onLabelAdd(Y),K.resetFields()},autoComplete:"off",children:[(0,e.jsx)(j.Z.Item,{label:D,name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,e.jsx)(p.Z,{})}),O,(0,e.jsx)(j.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,e.jsxs)(X.Z,{children:[(0,e.jsx)(i.Z,{onClick:function(){var m;(m=o.onCancel)===null||m===void 0||m.call(0),K.resetFields()},children:T}),(0,e.jsx)(i.Z,{type:"primary",htmlType:"submit",children:B})]})})]})})},V=k,Q=function(o){var s,f=(0,w.YB)(),h=f.formatMessage({id:"component.PPLabelList.addLabel"}),P=f.formatMessage({id:"component.PPLabelList.labelList"}),U=(0,l.useState)(!1),D=(0,r.Z)(U,2),T=D[0],B=D[1];return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(u.ZP,{className:C().labelList,size:"large",header:(0,e.jsx)("div",{className:C().listHeader,children:P}),footer:(0,e.jsx)("div",{children:(0,e.jsx)(i.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){B(!0)},block:!0,children:h})}),bordered:!0,dataSource:o.labels,renderItem:function(g){var b;return(0,e.jsx)(S,{hideColorPicker:o.hideColorPicker,hideEye:o.hideEye,onClick:o.onLabelSelect,label:g,active:(b=o.activeIds)===null||b===void 0?void 0:b.has(g.labelId),onLabelDelete:o.onLabelDelete,onLabelModify:o.onLabelModify})}}),(0,e.jsx)(V,{hideColorPicker:o.hideColorPicker,order:(s=o.labels)===null||s===void 0?void 0:s.length,visible:T,onLabelAdd:function(g){o.onLabelAdd(g),B(!1)},onCancel:function(){B(!1)}})]})},ee=Q},8088:function(d,M,n){"use strict";var N=n(67294),u=n(78677),c=n.n(u),i=n(85893),r=function(a){return(0,i.jsx)("div",{className:"".concat(c().container," ").concat(a.className),children:a.children})};M.Z=r},57436:function(d,M,n){"use strict";var N=n(91220),u=n(2824),c=n(67294),i=n(65031),r=n(84420),l=n.n(r),a=n(85893),C="./pics/basketball.jpg";function F(L){switch(L){case"mover":return"move";case"rectangle":case"polygon":return"crosshair";default:return"default"}}var X=function(t){var A=l()(t.imgSrc||"","anonymous"),R=(0,u.Z)(A,1),e=R[0],H=(e==null?void 0:e.width)||0,S=(e==null?void 0:e.height)||0,$=t.transparency==null?0:t.transparency*.01,z=void 0;t.currentTool=="polygon"||t.currentTool=="rectangle"||t.currentTool=="editor"?z=t.drawTool.polygon:t.currentTool=="brush"||t.currentTool=="rubber"?z=t.drawTool.brush:t.currentTool=="interactor"&&(z=t.drawTool.interactor);var x=z,p=(0,c.useState)(0),q=(0,u.Z)(p,2),j=q[0],w=q[1],G=(0,c.useState)(0),k=(0,u.Z)(G,2),V=k[0],Q=k[1],ee=(0,c.useState)({x:0,y:0}),J=(0,u.Z)(ee,2),o=J[0],s=J[1],f=(0,c.useRef)(null),h=(0,c.useRef)(null),P=(0,c.useRef)(null);function U(){var v=document.getElementById("dr");v&&(w(v.clientWidth),Q(v.clientHeight))}(0,c.useEffect)(function(){window.removeEventListener("resize",U),window.addEventListener("resize",U);var v=document.getElementById("dr");v&&(w(v.clientWidth),Q(v.clientHeight))},[]),(0,c.useEffect)(function(){!f.current||(f.current.container().style.cursor=F(t.currentTool))},[t.currentTool]);var D=function(_){return{e:_,mouseX:(_.evt.offsetX-o.x-j/2)/t.scale+H/2,mouseY:(_.evt.offsetY-o.y-V/2)/t.scale+S/2,offsetX:-H/2,offsetY:-S/2,canvasRef:P,stageRef:f}},T=function(_){x==null||x.onMouseDown(D(_))},B=function(_){x==null||x.onMouseMove(D(_))},y=function(_){x==null||x.onMouseUp(D(_))},g=function(_){_.cancelBubble=!0,_.evt.preventDefault()},b=[];if(t.annotations){var Z,O;console.log("PPStage rendering annotations:",t.annotations);var E={onDrag:t.onAnnotationModify,scale:t.scale,currentTool:t.currentTool,onSelect:t.setCurrentAnnotation,stageRef:f,currentAnnotation:t.currentAnnotation,transparency:$,threshold:t.threshold,canvasRef:P},I=(Z=P.current)===null||Z===void 0?void 0:Z.getContext("2d");I&&I.clearRect(0,0,I.canvas.width,I.canvas.height);var K=(0,N.Z)(t.annotations),W;try{for(K.s();!(W=K.n()).done;){var m=W.value;if(!!m){E.annotation=m;var Y=void 0;if(m.type=="polygon"||m.type=="rectangle")Y=t.drawTool.polygon.drawAnnotation(E);else if(m.type=="brush"||m.type=="rubber"){var ne;Y=(ne=t.drawTool.brush)===null||ne===void 0?void 0:ne.drawAnnotation(E)}else if(m.type=="interactor"){var te;Y=(te=t.drawTool.interactor)===null||te===void 0?void 0:te.drawAnnotation(E)}else continue;b.push(Y)}}}catch(v){K.e(v)}finally{K.f()}(O=h.current)===null||O===void 0||O.batchDraw()}var oe=t.currentTool=="mover";return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("canvas",{style:{display:"none"},id:"virtualCanvas",width:e==null?void 0:e.width,height:e==null?void 0:e.height}),(0,a.jsx)("canvas",{style:{display:"none"},id:"singleLineCanvas",width:e==null?void 0:e.width,height:e==null?void 0:e.height}),(0,a.jsx)("canvas",{style:{display:"none"},id:"canvasId",ref:P,width:e==null?void 0:e.width,height:e==null?void 0:e.height}),(0,a.jsx)("svg",{width:"0",height:"0",style:{position:"absolute",zIndex:"-1"},children:(0,a.jsx)("defs",{children:(0,a.jsx)("filter",{id:"remove-alpha",x:"0",y:"0",width:"100%",height:"100%",children:(0,a.jsx)("feComponentTransfer",{children:(0,a.jsx)("feFuncA",{type:"discrete",tableValues:"0 1"})})})})}),(0,a.jsxs)(i.Hf,{width:j,height:V,offsetX:-j/2,offsetY:-V/2,className:"stage",ref:f,draggable:oe,onDragMove:function(_){t.currentTool=="mover"},onDragEnd:function(_){t.currentTool=="mover"&&s({x:_.target.x(),y:_.target.y()})},children:[(0,a.jsx)(i.mh,{onMouseDown:T,onMouseMove:B,onMouseUp:y,onContextMenu:g,scaleX:t.scale,scaleY:t.scale,draggable:!1,children:(0,a.jsx)(i.Ee,{name:"baseImage",draggable:!1,image:e,x:-((e==null?void 0:e.width)||0)/2,y:-((e==null?void 0:e.height)||0)/2})}),(0,a.jsxs)(i.mh,{ref:h,name:"annotation",scaleX:t.scale,scaleY:t.scale,onMouseDown:T,onMouseMove:B,onMouseUp:y,onContextMenu:g,opacity:$,children:[(0,a.jsx)(i.Ee,{x:-((e==null?void 0:e.width)||0)/2,y:-((e==null?void 0:e.height)||0)/2,image:P.current||void 0}),b]})]})]})};M.Z=X},44434:function(d,M,n){"use strict";var N=n(67294),u=n(80961),c=n.n(u),i=n(85893),r=function(a){var C=c().leftToolbar;return a.disLoc=="right"&&(C=c().rightToolbar),(0,i.jsx)("div",{className:C,children:a.children})};M.Z=r},61541:function(d,M,n){"use strict";var N=n(49111),u=n(19650),c=n(67294),i=n(82499),r=n.n(i),l=n(85893),a=function(F){return(0,l.jsx)("div",{unselectable:"on",className:"".concat(r().toolBarButtonContainerWrapper," ").concat(F.active&&r().toolBarButtonContainerWrapperActive),onClick:F.onClick,children:(0,l.jsx)(u.Z,{align:"center",className:r().toolBarButtonContainer,size:0,children:(0,l.jsxs)(u.Z,{align:"center",direction:"vertical",className:r().toolBarButton,size:0,children:[(0,l.jsx)("img",{src:F.imgSrc}),(0,l.jsx)("div",{className:r().buttonText,children:F.children})]})})})};M.Z=a}}]);