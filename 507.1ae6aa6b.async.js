(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[507],{52822:function(d){d.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},5882:function(d){d.exports={listItem:"listItem___vtDXn",eye:"eye___AsLBS",roundBall:"roundBall___1J_R3",popover:"popover___1x-2R",delete:"delete___WHPf2",listItemActive:"listItemActive___3FRb7"}},56131:function(d){d.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},78677:function(d){d.exports={container:"container___G0FNe"}},80961:function(d){d.exports={leftToolbar:"leftToolbar___1xi4t",rightToolbar:"rightToolbar___3dNSB"}},82499:function(d){d.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},63097:function(d,E,n){"use strict";var N=n(20136),c=n(55241),u=n(2824),i=n(67294),r=n(52822),l=n.n(r),a=n(63144),C=n(85893),F=function(L){var o=(0,i.useState)(L.color||"#FFF"),A=(0,u.Z)(o,2),R=A[0],e=A[1];return(0,i.useEffect)(function(){e(L.color||"#FFF")},[L]),L.changeable?(0,C.jsx)(c.Z,{getPopupContainer:function(S){return S.parentElement||document.body},overlayClassName:l().popover,openClassName:l().popoverOpenClassName,placement:"bottom",content:(0,C.jsx)(a.xS,{disableAlpha:!0,color:R,onChange:function(S){e(S.hex)},onChangeComplete:L.onChange}),trigger:"click",children:(0,C.jsx)("div",{className:l().roundBall,style:{backgroundColor:R}})}):(0,C.jsx)("div",{className:l().roundBall,style:{backgroundColor:R}})};E.Z=F},5041:function(d,E,n){"use strict";n.d(E,{Z:function(){return ee}});var N=n(54421),c=n(38272),u=n(57663),i=n(71577),r=n(2824),l=n(67294),a=n(56131),C=n.n(a),F=n(49111),z=n(19650),L=n(8870),o=n(5882),A=n.n(o),R=n(63097),e=n(85893),H=function(t){var s=(0,L.Z)({},t.label),f=(0,l.useState)(s.invisible),m=(0,r.Z)(f,2),P=m[0],U=m[1],D=(0,l.useState)(0),T=(0,r.Z)(D,2),B=T[0],y=T[1],g=t.hideEye?" ":(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("a",{className:A().eye,style:{backgroundImage:P?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(b){b.stopPropagation(),U(!P),t.onLabelModify(s)}})," "]}),M=t.hideColorPicker?(0,e.jsx)(e.Fragment,{}):(0,e.jsx)(R.Z,{color:s.color,changeable:!0,onChange:function(b){s.color=b.hex,t.onLabelModify(s)}}),Z=(0,e.jsxs)(c.ZP.Item,{className:"".concat(A().listItem," ").concat(t.active?A().listItemActive:""),unselectable:"on",onClick:function(){t.onClick(s)},children:[(0,e.jsxs)(z.Z,{align:"center",size:5,children:[g,s.name,M]}),(0,e.jsx)("a",{className:A().delete,onClick:function(b){b.stopPropagation();var I=new Date().getTime();I-B<300||(y(I),t.onLabelDelete(s))}})]});return Z},S=H,Q=n(71194),Y=n(50146),x=n(47673),p=n(24044),q=n(9715),j=n(93766),X=n(48971),J=["#FF0000","#008000","#0000FF","#FFFF00","#FFA500","#00FFFF","#8B00FF","#FFC0CB","#7CFC00","#007FFF","#800080","#36BF36","#DAA520","#800000","#008B8B","#B22222","#E6D933","#000080","#FF00FF","#FFFF99","#87CEEB","#5C50E6","#CD5C5C","#20B2AA","#E680FF","#4D1F00","#006374","#B399FF","#8B4513","#BA55D3","#C0C0C0","#808080","#000000"],G=function(t){var s,f,m=(0,X.YB)(),P=m.formatMessage({id:"component.PPAddLabelModal.selectColor"}),U=m.formatMessage({id:"component.PPAddLabelModal.addLabel"}),D=m.formatMessage({id:"component.PPAddLabelModal.labelName"}),T=m.formatMessage({id:"component.PPCreater.cancel"}),B=m.formatMessage({id:"component.PPSegMode.ok"}),y=(0,l.useState)(((s=t.defaultLabel)===null||s===void 0?void 0:s.color)||J[t.order||0]),g=(0,r.Z)(y,2),M=g[0],Z=g[1];(0,l.useEffect)(function(){var W;Z(((W=t.defaultLabel)===null||W===void 0?void 0:W.color)||J[t.order||0])},[t]);var O=t.hideColorPicker?(0,e.jsx)(e.Fragment,{}):(0,e.jsx)(j.Z.Item,{label:P,name:"color",children:(0,e.jsx)(R.Z,{color:M,onChange:function(h){Z(h.hex)}})}),b=j.Z.useForm(),I=(0,r.Z)(b,1),K=I[0];return(0,e.jsx)(Y.Z,{title:U,visible:t.visible,onCancel:t.onCancel,footer:null,children:(0,e.jsxs)(j.Z,{form:K,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1,labelname:(f=t.defaultLabel)===null||f===void 0?void 0:f.name},onFinish:function(h){var $={name:h.labelname,color:M};t.onLabelAdd($),K.resetFields()},autoComplete:"off",children:[(0,e.jsx)(j.Z.Item,{label:D,name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,e.jsx)(p.Z,{})}),O,(0,e.jsx)(j.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,e.jsxs)(z.Z,{children:[(0,e.jsx)(i.Z,{onClick:function(){var h;(h=t.onCancel)===null||h===void 0||h.call(0),K.resetFields()},children:T}),(0,e.jsx)(i.Z,{type:"primary",htmlType:"submit",children:B})]})})]})})},w=G,k=function(t){var s,f=(0,X.YB)(),m=f.formatMessage({id:"component.PPLabelList.addLabel"}),P=f.formatMessage({id:"component.PPLabelList.labelList"}),U=(0,l.useState)(!1),D=(0,r.Z)(U,2),T=D[0],B=D[1];return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(c.ZP,{className:C().labelList,size:"large",header:(0,e.jsx)("div",{className:C().listHeader,children:P}),footer:(0,e.jsx)("div",{children:(0,e.jsx)(i.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){B(!0)},block:!0,children:m})}),bordered:!0,dataSource:t.labels,renderItem:function(g){var M;return(0,e.jsx)(S,{hideColorPicker:t.hideColorPicker,hideEye:t.hideEye,onClick:t.onLabelSelect,label:g,active:(M=t.activeIds)===null||M===void 0?void 0:M.has(g.labelId),onLabelDelete:t.onLabelDelete,onLabelModify:t.onLabelModify})}}),(0,e.jsx)(w,{hideColorPicker:t.hideColorPicker,order:(s=t.labels)===null||s===void 0?void 0:s.length,visible:T,onLabelAdd:function(g){t.onLabelAdd(g),B(!1)},onCancel:function(){B(!1)}})]})},ee=k},8088:function(d,E,n){"use strict";var N=n(67294),c=n(78677),u=n.n(c),i=n(85893),r=function(a){return(0,i.jsx)("div",{className:"".concat(u().container," ").concat(a.className),children:a.children})};E.Z=r},57436:function(d,E,n){"use strict";var N=n(91220),c=n(2824),u=n(67294),i=n(65031),r=n(84420),l=n.n(r),a=n(85893),C="./pics/basketball.jpg";function F(L){switch(L){case"mover":return"move";case"rectangle":case"polygon":return"crosshair";default:return"default"}}var z=function(o){var A=l()(o.imgSrc||""),R=(0,c.Z)(A,1),e=R[0],H=(e==null?void 0:e.width)||0,S=(e==null?void 0:e.height)||0,Q=o.transparency==null?0:o.transparency*.01,Y=void 0;o.currentTool=="polygon"?Y=o.drawTool.polygon:o.currentTool=="brush"&&(Y=o.drawTool.brush);var x=Y,p=(0,u.useState)(0),q=(0,c.Z)(p,2),j=q[0],X=q[1],J=(0,u.useState)(0),G=(0,c.Z)(J,2),w=G[0],k=G[1],ee=(0,u.useState)({x:0,y:0}),V=(0,c.Z)(ee,2),t=V[0],s=V[1],f=(0,u.useRef)(null),m=(0,u.useRef)(null),P=(0,u.useRef)(null);function U(){var v=document.getElementById("dr");v&&(X(v.clientWidth),k(v.clientHeight))}(0,u.useEffect)(function(){window.removeEventListener("resize",U),window.addEventListener("resize",U);var v=document.getElementById("dr");v&&(X(v.clientWidth),k(v.clientHeight))},[]),(0,u.useEffect)(function(){!f.current||(f.current.container().style.cursor=F(o.currentTool))},[o.currentTool]);var D=function(_){return{e:_,mouseX:(_.evt.offsetX-t.x-j/2)/o.scale+H/2,mouseY:(_.evt.offsetY-t.y-w/2)/o.scale+S/2,offsetX:-H/2,offsetY:-S/2,canvasRef:P,layerRef:m}},T=function(_){x==null||x.onMouseDown(D(_))},B=function(_){x==null||x.onMouseMove(D(_))},y=function(_){x==null||x.onMouseUp(D(_))},g=function(_){_.cancelBubble=!0,_.evt.preventDefault()},M=[];if(o.annotations){var Z,O,b={onDrag:o.onAnnotationModify,onDragEnd:o.onAnnotationModifyComplete,scale:o.scale,currentTool:o.currentTool,onSelect:o.setCurrentAnnotation,stageRef:f,currentAnnotation:o.currentAnnotation,transparency:Q,canvasRef:P},I=(Z=P.current)===null||Z===void 0?void 0:Z.getContext("2d");I&&I.clearRect(0,0,I.canvas.width,I.canvas.height);var K=(0,N.Z)(o.annotations),W;try{for(K.s();!(W=K.n()).done;){var h=W.value;if(!!h){b.annotation=h;var $=void 0;if(h.type=="polygon")$=o.drawTool.polygon.drawAnnotation(b);else if(h.type=="brush"||h.type=="rubber")$=o.drawTool.brush.drawAnnotation(b);else continue;M.push($)}}}catch(v){K.e(v)}finally{K.f()}(O=m.current)===null||O===void 0||O.batchDraw()}var ne=o.currentTool=="mover";return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("canvas",{style:{display:"none"},id:"virtualCanvas",width:e==null?void 0:e.width,height:e==null?void 0:e.height}),(0,a.jsx)("canvas",{style:{display:"none"},id:"singleLineCanvas",width:e==null?void 0:e.width,height:e==null?void 0:e.height}),(0,a.jsx)("canvas",{style:{display:"none"},id:"canvasId",ref:P,width:e==null?void 0:e.width,height:e==null?void 0:e.height}),(0,a.jsx)("svg",{width:"0",height:"0",style:{position:"absolute",zIndex:"-1"},children:(0,a.jsx)("defs",{children:(0,a.jsx)("filter",{id:"remove-alpha",x:"0",y:"0",width:"100%",height:"100%",children:(0,a.jsx)("feComponentTransfer",{children:(0,a.jsx)("feFuncA",{type:"discrete",tableValues:"0 1"})})})})}),(0,a.jsxs)(i.Hf,{width:j,height:w,offsetX:-j/2,offsetY:-w/2,className:"stage",ref:f,draggable:ne,onDragMove:function(_){o.currentTool=="mover"},onDragEnd:function(_){o.currentTool=="mover"&&s({x:_.target.x(),y:_.target.y()})},children:[(0,a.jsx)(i.mh,{onMouseDown:T,onMouseMove:B,onMouseUp:y,onContextMenu:g,scaleX:o.scale,scaleY:o.scale,draggable:!1,children:(0,a.jsx)(i.Ee,{name:"baseImage",draggable:!1,image:e,x:-((e==null?void 0:e.width)||0)/2,y:-((e==null?void 0:e.height)||0)/2})}),(0,a.jsxs)(i.mh,{ref:m,name:"annotation",scaleX:o.scale,scaleY:o.scale,onMouseDown:T,onMouseMove:B,onMouseUp:y,onContextMenu:g,opacity:Q,children:[(0,a.jsx)(i.Ee,{x:-((e==null?void 0:e.width)||0)/2,y:-((e==null?void 0:e.height)||0)/2,image:P.current||void 0}),M]})]})]})};E.Z=z},44434:function(d,E,n){"use strict";var N=n(67294),c=n(80961),u=n.n(c),i=n(85893),r=function(a){var C=u().leftToolbar;return a.disLoc=="right"&&(C=u().rightToolbar),(0,i.jsx)("div",{className:C,children:a.children})};E.Z=r},61541:function(d,E,n){"use strict";var N=n(49111),c=n(19650),u=n(67294),i=n(82499),r=n.n(i),l=n(85893),a=function(F){return(0,l.jsx)("div",{unselectable:"on",className:"".concat(r().toolBarButtonContainerWrapper," ").concat(F.active&&r().toolBarButtonContainerWrapperActive),onClick:F.onClick,children:(0,l.jsx)(c.Z,{align:"center",className:r().toolBarButtonContainer,size:0,children:(0,l.jsxs)(c.Z,{align:"center",direction:"vertical",className:r().toolBarButton,size:0,children:[(0,l.jsx)("img",{src:F.imgSrc}),(0,l.jsx)("div",{className:r().buttonText,children:F.children})]})})})};E.Z=a}}]);
