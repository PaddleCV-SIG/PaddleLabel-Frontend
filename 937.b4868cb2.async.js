(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[937],{85024:function(a){a.exports={listItem:"listItem___u4Q82",eye:"eye___BwaRm",delete:"delete___31JB_",roundBall:"roundBall___23A7l",popover:"popover___1BNET",annotationId:"annotationId___zAzX4",labelName:"labelName___2ohxn",listItemActive:"listItemActive___2QnA3"}},56159:function(a){a.exports={labelList:"labelList___v7C6K",listHeader:"listHeader___1aY8R",eye:"eye___2MKbp",roundBall:"roundBall___187XH"}},52822:function(a){a.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},5882:function(a){a.exports={listItem:"listItem___vtDXn",eye:"eye___AsLBS",roundBall:"roundBall___1J_R3",popover:"popover___1x-2R",delete:"delete___WHPf2",listItemActive:"listItemActive___3FRb7"}},56131:function(a){a.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},78677:function(a){a.exports={container:"container___G0FNe"}},83930:function(a){a.exports={stage:"stage___3H5QL"}},80961:function(a){a.exports={leftToolbar:"leftToolbar___1xi4t",rightToolbar:"rightToolbar___3dNSB"}},82499:function(a){a.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},14836:function(a,P,e){"use strict";e.d(P,{Z:function(){return K}});var F=e(54421),d=e(38272),m=e(57663),c=e(71577),i=e(67294),s=e(56159),_=e.n(s),v=e(49111),C=e(19650),Z=e(2824),A=e(11849),S=e(85024),t=e.n(S),g=e(63097),n=e(85893),E=function(u){var f=(0,A.Z)({},u.annotation),h=(0,i.useState)(f.invisible),j=(0,Z.Z)(h,2),R=j[0],y=j[1];(0,i.useEffect)(function(){y(u.annotation.invisible)},[u.annotation.invisible]);var H=(0,n.jsxs)(d.ZP.Item,{className:"".concat(t().listItem," ").concat(u.active?t().listItemActive:""),unselectable:"on",onClick:function(){u.onClick(f)},children:[(0,n.jsxs)(C.Z,{align:"center",size:5,children:[(0,n.jsx)("a",{className:t().eye,style:{backgroundImage:R?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(){y(!R),u.onAnnotationModify(f)}})," ",(0,n.jsx)("span",{className:t().annotationId,children:f.annotationId}),(0,n.jsx)("span",{className:t().labelName,children:f.label.name}),(0,n.jsx)(g.Z,{color:f.label.color})]}),(0,n.jsx)("a",{className:t().delete,onClick:function(){f.delete=!0,u.onAnnotationDelete(f)}})]});return H},I=E,X=function(u){return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(d.ZP,{className:_().labelList,size:"large",header:(0,n.jsx)("div",{className:_().listHeader,children:"Annotation List"}),bordered:!0,dataSource:u.annotations,renderItem:function(h){return(0,n.jsx)(I,{onClick:u.onAnnotationSelect,annotation:h,active:h.active,onAnnotationDelete:u.onAnnotationDelete,onAnnotationModify:u.onAnnotationModify})},footer:(0,n.jsx)("div",{children:(0,n.jsx)(c.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){u.onAnnotationSelect(void 0)},block:!0,children:"Add Annotation"})})})})},K=X},63097:function(a,P,e){"use strict";var F=e(20136),d=e(55241),m=e(2824),c=e(67294),i=e(52822),s=e.n(i),_=e(63144),v=e(85893),C=function(A){var S=(0,c.useState)(A.color||"#FFF"),t=(0,m.Z)(S,2),g=t[0],n=t[1];return(0,c.useEffect)(function(){n(A.color||"#FFF")},[A]),A.changeable?(0,v.jsx)(d.Z,{getPopupContainer:function(I){return I.parentElement||document.body},overlayClassName:s().popover,openClassName:s().popoverOpenClassName,placement:"bottom",content:(0,v.jsx)(_.xS,{disableAlpha:!0,color:g,onChange:function(I){n(I.hex)},onChangeComplete:A.onChange}),trigger:"click",children:(0,v.jsx)("div",{className:s().roundBall,style:{backgroundColor:g}})}):(0,v.jsx)("div",{className:s().roundBall,style:{backgroundColor:g}})};P.Z=C},5041:function(a,P,e){"use strict";e.d(P,{Z:function(){return O}});var F=e(54421),d=e(38272),m=e(57663),c=e(71577),i=e(2824),s=e(67294),_=e(56131),v=e.n(_),C=e(49111),Z=e(19650),A=e(11849),S=e(5882),t=e.n(S),g=e(63097),n=e(85893),E=function(o){var r=(0,A.Z)({},o.label),D=(0,s.useState)(r.invisible),L=(0,i.Z)(D,2),b=L[0],x=L[1],B=o.hideEye?" ":(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("a",{className:t().eye,style:{backgroundImage:b?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(){x(!b),o.onLabelModify(r)}})," "]}),l=o.hideColorPicker?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(g.Z,{color:r.color,changeable:!0,onChange:function(T){r.color=T.hex,o.onLabelModify(r)}}),M=(0,n.jsx)(d.ZP.Item,{className:"".concat(t().listItem," ").concat(r.active?t().listItemActive:""),unselectable:"on",onClick:function(){o.onClick(r)},children:(0,n.jsxs)(Z.Z,{align:"center",size:5,children:[B,r.name,l,(0,n.jsx)("a",{className:t().delete,style:{backgroundImage:"url(./pics/delete.png)"},onClick:function(T){T.stopPropagation(),o.onLabelDelete(r)}})]})});return M},I=E,X=e(71194),K=e(50146),N=e(47673),u=e(24044),f=e(9715),h=e(93766),j=["#FF0000","#008000","#0000FF","#FFFF00","#FFA500","#00FFFF","#8B00FF","#FFC0CB","#7CFC00","#007FFF","#800080","#36BF36","#DAA520","#800000","#008B8B","#B22222","#E6D933","#000080","#FF00FF","#FFFF99","#87CEEB","#5C50E6","#CD5C5C","#20B2AA","#E680FF","#4D1F00","#006374","#B399FF","#8B4513","#BA55D3","#C0C0C0","#808080","#000000"],R=function(o){var r,D,L=(0,s.useState)(((r=o.defaultLabel)===null||r===void 0?void 0:r.color)||j[o.order||0]),b=(0,i.Z)(L,2),x=b[0],B=b[1];(0,s.useEffect)(function(){var U;B(((U=o.defaultLabel)===null||U===void 0?void 0:U.color)||j[o.order||0])},[o]);var l=o.hideColorPicker?(0,n.jsx)(n.Fragment,{}):(0,n.jsx)(h.Z.Item,{label:"Select Color",name:"color",children:(0,n.jsx)(g.Z,{color:x,onChange:function(W){B(W.hex)}})}),M=h.Z.useForm(),$=(0,i.Z)(M,1),T=$[0];return(0,n.jsx)(K.Z,{title:"Add Label",visible:o.visible,onCancel:o.onCancel,footer:null,children:(0,n.jsxs)(h.Z,{form:T,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1,labelname:(D=o.defaultLabel)===null||D===void 0?void 0:D.name},onFinish:function(W){var J={name:W.labelname,color:x};o.onLabelAdd(J),T.resetFields()},autoComplete:"off",children:[(0,n.jsx)(h.Z.Item,{label:"Label Name",name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,n.jsx)(u.Z,{})}),l,(0,n.jsx)(h.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,n.jsxs)(Z.Z,{children:[(0,n.jsx)(c.Z,{onClick:function(){var W;(W=o.onCancel)===null||W===void 0||W.call(0),T.resetFields()},children:"\u53D6\u6D88"}),(0,n.jsx)(c.Z,{type:"primary",htmlType:"submit",children:"\u786E\u5B9A"})]})})]})})},y=R,H=function(o){var r;console.log("render pplabellist");var D=(0,s.useState)(!1),L=(0,i.Z)(D,2),b=L[0],x=L[1];return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(d.ZP,{className:v().labelList,size:"large",header:(0,n.jsx)("div",{className:v().listHeader,children:"Label List"}),footer:(0,n.jsx)("div",{children:(0,n.jsx)(c.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){x(!0)},block:!0,children:"Add Label"})}),bordered:!0,dataSource:o.labels,renderItem:function(l){return(0,n.jsx)(I,{hideColorPicker:o.hideColorPicker,hideEye:o.hideEye,onClick:o.onLabelSelect,label:l,onLabelDelete:o.onLabelDelete,onLabelModify:o.onLabelModify})}}),(0,n.jsx)(y,{hideColorPicker:o.hideColorPicker,order:(r=o.labels)===null||r===void 0?void 0:r.length,visible:b,onLabelAdd:function(l){o.onLabelAdd(l),x(!1)},onCancel:function(){x(!1)}})]})},O=H},8088:function(a,P,e){"use strict";var F=e(67294),d=e(78677),m=e.n(d),c=e(85893),i=function(_){return(0,c.jsx)("div",{className:"".concat(m().container," ").concat(_.className),children:_.children})};P.Z=i},57436:function(a,P,e){"use strict";var F=e(91220),d=e(2824),m=e(67294),c=e(65031),i=e(84420),s=e.n(i),_=e(83930),v=e.n(_),C=e(85893),Z="./pics/basketball.jpg",A=function(t){var g=s()(t.imgSrc||""),n=(0,d.Z)(g,1),E=n[0],I=(E==null?void 0:E.width)||0,X=(E==null?void 0:E.height)||0,K=(0,m.useState)(),N=(0,d.Z)(K,2),u=N[0],f=N[1],h=(0,m.useState)(),j=(0,d.Z)(h,2),R=j[0],y=j[1],H=(0,m.useState)({x:0,y:0}),O=(0,d.Z)(H,2),z=O[0],o=O[1];function r(){var l=document.getElementById("dr");l&&(f(l.clientWidth),y(l.clientHeight))}(0,m.useEffect)(function(){window.removeEventListener("resize",r),window.addEventListener("resize",r);var l=document.getElementById("dr");l&&(f(l.clientWidth),y(l.clientHeight),o({x:l.clientWidth/2,y:l.clientHeight/2}))},[]);var D=[];if(t.annotations){var L=(0,F.Z)(t.annotations),b;try{for(L.s();!(b=L.n()).done;){var x=b.value;if(!!x){var B=x.tool=="polygon"?t.createPolygonFunc:t.createBrushFunc;B&&D.push(B(x,t.onAnnotationModify,t.onAnnotationModifyComplete,t.scale,t.currentTool,t.setCurrentAnnotation,t.currentAnnotation))}}}catch(l){L.e(l)}finally{L.f()}}return(0,C.jsx)(c.Hf,{width:u,height:R,className:v().stage,children:(0,C.jsx)(c.mh,{onMouseDown:function(M){t.onMouseDown&&t.onMouseDown(M,t.scale)},onMouseMove:function(M){t.onMouseMove&&t.onMouseMove(M,t.scale)},onMouseUp:function(M){t.onMouseUp&&t.onMouseUp(M,t.scale)},onContextMenu:function(M){M.evt.preventDefault()},draggable:!1,children:(0,C.jsxs)(c.ZA,{draggable:t.currentTool=="mover",onDragEnd:function(M){},children:[(0,C.jsx)(c.Ee,{draggable:!1,image:E,x:z.x,y:z.y,offsetX:I/2,offsetY:X/2,scaleX:t.scale,scaleY:t.scale}),D]})})})};P.Z=A},44434:function(a,P,e){"use strict";var F=e(67294),d=e(80961),m=e.n(d),c=e(85893),i=function(_){var v=m().leftToolbar;return _.disLoc=="right"&&(v=m().rightToolbar),(0,c.jsx)("div",{className:v,children:_.children})};P.Z=i},61541:function(a,P,e){"use strict";var F=e(49111),d=e(19650),m=e(67294),c=e(82499),i=e.n(c),s=e(85893),_=function(C){return(0,s.jsx)("div",{unselectable:"on",className:"".concat(i().toolBarButtonContainerWrapper," ").concat(C.active&&i().toolBarButtonContainerWrapperActive),onClick:C.onClick,children:(0,s.jsx)(d.Z,{align:"center",className:i().toolBarButtonContainer,size:0,children:(0,s.jsxs)(d.Z,{align:"center",direction:"vertical",className:i().toolBarButton,size:0,children:[(0,s.jsx)("img",{src:C.imgSrc}),(0,s.jsx)("div",{className:i().buttonText,children:C.children})]})})})};P.Z=_}}]);
