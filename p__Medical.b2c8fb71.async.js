(self.webpackChunkpp_labeling_frontend=self.webpackChunkpp_labeling_frontend||[]).push([[454],{26647:function(A){A.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1FTWb",toolBarButtonContainer:"toolBarButtonContainer___1Vahn",toolBarButton:"toolBarButton___3mR2H",buttonText:"buttonText___Y0WDm",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3lRZ8",popover:"popover___3zzu2"}},8982:function(A){A.exports={RSPop1:"RSPop1___ei_bv",RSPop2:"RSPop2___9d5gM"}},75721:function(A){A.exports={segment:"segment___1EX9A",mainStage:"mainStage___nDwOp",rightSideBar:"rightSideBar___1JzJc",determinOutline:"determinOutline___2vG7S"}},27992:function(A,j,n){"use strict";var R=n(20136),B=n(55241),O=n(77883),S=n(70507),x=n(57663),l=n(71577),p=n(2824),E=n(67294),e=n(61541),o=n(26647),u=n.n(o),i=n(85893),c=1,v=100,d=10;function f(m){return m?m<=c?c:m>=v?v:m:d}var P=function(s){var D=(0,E.useState)(f(s.size)),L=(0,p.Z)(D,2),b=L[0],y=L[1],W=function(h){y(f(h))};return(0,E.useEffect)(function(){W(s.size)},[s.size]),(0,i.jsxs)(B.Z,{overlayClassName:u().popover,placement:s.disLoc||"right",content:(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(l.Z,{type:"text",onClick:function(){var h,g=f(b-1);W(g),(h=s.onChange)===null||h===void 0||h.call(0,g)},children:"-"}),(0,i.jsx)(S.Z,{min:c,max:v,value:b,onChange:function(h){var g;(g=s.onChange)===null||g===void 0||g.call(0,h)},controls:!1,style:{textAlign:"center"}}),(0,i.jsx)(l.Z,{type:"text",onClick:function(){var h,g=f(b+1);W(g),(h=s.onChange)===null||h===void 0||h.call(0,g)},children:"+"})]}),trigger:"hover",children:[" ",(0,i.jsx)(e.Z,{imgSrc:s.imgSrc,onClick:s.onClick,children:s.children})]})};j.Z=P},13931:function(A,j,n){"use strict";n.d(j,{Z:function(){return E}});var R=n(91220),B=n(67294),O=n(65031),S=n(85893);function x(e){var o=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return o?{r:parseInt(o[1],16),g:parseInt(o[2],16),b:parseInt(o[3],16)}:null}function l(e,o){if(!(!e||!o)){var u=x(e);if(!!u){var i=void 0,c=[];return o.forEach(function(v){if(!i){i=v;return}c.push((0,S.jsx)(O.Cd,{x:i,y:v,radius:5,fill:e})),i=void 0}),{color:e,points:o,element:(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(O.x1,{stroke:e,strokeWidth:2,globalCompositeOperation:"source-over",lineCap:"round",points:o,tension:.01,closed:!0,fill:"rgba(".concat(u.r,", ").concat(u.g,", ").concat(u.b,", 0.5)")}),c]})}}}}function p(e){var o=0,u=(0,R.Z)(e),i;try{for(u.s();!(i=u.n()).done;){var c=i.value;!c||c.annotationId>o&&(o=c.annotationId)}}catch(v){u.e(v)}finally{u.f()}return o}function E(e){var o=function(d,f){var P,m=d.evt.offsetX/f,s=d.evt.offsetY/f;console.log("offsetX: ".concat(d.evt.offsetX,", offsetY: ").concat(d.evt.offsetY,", mouseX: ").concat(m,", mouseY: ").concat(s));var D=l((P=e.currentLabel)===null||P===void 0?void 0:P.color,[m,s]);!D||e.onAnnotationAdd({annotationId:p(e.annotations)+1,label:e.currentLabel,lines:[D]})},u=function(d,f){var P,m;if(!!e.currentAnnotation){var s=d.evt.offsetX/f,D=d.evt.offsetY/f;console.log("offsetX: ".concat(d.evt.offsetX,", offsetY: ").concat(d.evt.offsetY,", mouseX: ").concat(s,", mouseY: ").concat(D));var L=e.currentAnnotation.lines||[],b=l((P=e.currentLabel)===null||P===void 0?void 0:P.color,(m=L[0])===null||m===void 0?void 0:m.points.concat([s,D]));if(!!b){var y={annotationId:e.currentAnnotation.annotationId,label:e.currentAnnotation.label,lines:[b]};e.onAnnotationModify(y)}}},i=function(d,f){console.log(e.currentTool),e.currentTool=="polygon"&&(e.currentAnnotation?u(d,f):o(d,f))},c=function(){e.currentTool=="polygon"};return{onMouseDown:i,onMouseMove:function(){},onMouseUp:c}}},29919:function(A,j,n){"use strict";var R=n(67294),B=n(61541),O=n(85893),S=function(l){return(0,O.jsx)(B.Z,{active:l.active,imgSrc:l.imgSrc||"./pics/buttons/polygon.png",onClick:l.onClick,children:l.children})};j.Z=S},21028:function(A,j,n){"use strict";n.r(j),n.d(j,{default:function(){return rn}});var R=n(57663),B=n(71577),O=n(20136),S=n(55241),x=n(2824),l=n(67294),p=n(75721),E=n.n(p),e=n(8088),o=n(61541),u=n(44434),i=n(58967),c=n(27992),v=n(5041),d=n(57436),f=n(14836),P=n(29919),m=n(43801),s=n(13931),D=n(13062),L=n(71230),b=n(66126),y=n(75454),W=n(89032),Z=n(15746),h=n(8982),g=n.n(h),t=n(85893),on=function(U){return(0,t.jsxs)("div",{children:[(0,t.jsxs)(L.Z,{children:[(0,t.jsx)(Z.Z,{span:6,className:g().Pop1,children:(0,t.jsx)("span",{children:"Ww"})}),(0,t.jsx)(Z.Z,{span:18,className:g().Pop2,children:(0,t.jsx)(y.Z,{min:1,max:U.wwValue||100,defaultValue:37})})]}),(0,t.jsxs)(L.Z,{children:[(0,t.jsx)(Z.Z,{span:6,className:g().Pop1,children:(0,t.jsx)("span",{children:"Wl"})}),(0,t.jsx)(Z.Z,{span:18,className:g().Pop2,children:(0,t.jsx)(y.Z,{min:1,max:U.wlValue||100,defaultValue:37})})]})]})},en=on,an=function(){var U=(0,l.useState)(void 0),V=(0,x.Z)(U,2),M=V[0],N=V[1],ln=(0,l.useState)({color:"",name:""}),H=(0,x.Z)(ln,2),Y=H[0],J=H[1],un=(0,l.useState)(),G=(0,x.Z)(un,2),T=G[0],cn=G[1],dn=(0,l.useState)([]),Q=(0,x.Z)(dn,2),C=Q[0],z=Q[1],vn=(0,l.useState)(10),k=(0,x.Z)(vn,2),K=k[0],w=k[1],fn=(0,l.useState)(1),q=(0,x.Z)(fn,2),F=q[0],nn=q[1],_=function(a){cn(a),a!=null&&a.label&&J(a.label)},tn=function(a){for(var I=[],X=0;X<C.length;X++)C[X].annotationId==a.annotationId?I.push(a):I.push(C[X]);_(a),z(I)},mn=(0,m.Z)({currentLabel:Y,brushSize:K,currentTool:M,annotations:C,currentAnnotation:T,onAnnotationAdd:function(a){z(C.concat([a])),T||_(a)},onAnnotationModify:tn}),gn=(0,s.Z)({currentLabel:Y,brushSize:K,currentTool:M,annotations:C,currentAnnotation:T,onAnnotationAdd:function(a){z(C.concat([a])),T||_(a)},onAnnotationModify:tn}),$=M=="polygon"?gn:mn;return(0,t.jsxs)(e.Z,{className:E().segment,children:[(0,t.jsxs)(u.Z,{children:[(0,t.jsx)(o.Z,{imgSrc:"./pics/buttons/intelligent_interaction.png",children:"Intelligent Interaction"}),(0,t.jsx)(P.Z,{active:M=="polygon",onClick:function(){N("polygon"),_(void 0)},children:"Polygon"}),(0,t.jsx)(i.Z,{size:K,active:M=="brush",onClick:function(){M!="rubber"&&M!="brush"&&_(void 0),N("brush")},onChange:function(a){w(a)},children:"Brush"}),(0,t.jsx)(i.Z,{size:K,active:M=="rubber",onClick:function(){M!="rubber"&&M!="brush"&&_(void 0),N("rubber")},onChange:function(a){w(a)},imgSrc:"./pics/buttons/rubber.png",children:"Rubber"}),(0,t.jsx)(o.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){nn(F+.1)},children:"Zoom in"}),(0,t.jsx)(o.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){nn(F-.1)},children:"Zoom out"}),(0,t.jsx)(o.Z,{imgSrc:"./pics/buttons/save.png",children:"Save"}),(0,t.jsx)(o.Z,{imgSrc:"./pics/buttons/move.png",children:"Move"}),(0,t.jsx)(o.Z,{imgSrc:"./pics/buttons/export.png",children:"Export"}),(0,t.jsx)(o.Z,{imgSrc:"./pics/buttons/data_division.png",children:"Divide Data"}),(0,t.jsx)(o.Z,{imgSrc:"./pics/buttons/prev.png",children:"Undo"}),(0,t.jsx)(o.Z,{imgSrc:"./pics/buttons/next.png",children:"Redo"}),(0,t.jsx)(o.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:"Clear Mark"})]}),(0,t.jsx)("div",{className:E().mainStage,children:(0,t.jsx)(d.Z,{scale:F,annotations:C,onMouseDown:$.onMouseDown,onMouseMove:$.onMouseMove,onMouseUp:$.onMouseUp})}),(0,t.jsxs)(u.Z,{disLoc:"right",children:[(0,t.jsx)(c.Z,{imgSrc:"./pics/buttons/threshold.png",disLoc:"left",children:"Segment Threshold"}),(0,t.jsx)(c.Z,{imgSrc:"./pics/buttons/alpha.png",disLoc:"left",children:"Diaphaneity"}),(0,t.jsx)(c.Z,{imgSrc:"./pics/buttons/radius.png",disLoc:"left",children:"Visual Radius"}),(0,t.jsxs)(S.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Setting of medical",content:(0,t.jsx)(en,{}),trigger:"hover",children:[" ",(0,t.jsx)(o.Z,{imgSrc:"./pics/buttons/medical_setting.png",children:"Medical Setting"})]})]}),(0,t.jsxs)("div",{className:E().rightSideBar,children:[(0,t.jsx)("div",{className:E().determinOutline,children:(0,t.jsx)(B.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",block:!0,onClick:function(){_(void 0)},children:"Determine Outline"})}),(0,t.jsx)(v.Z,{selectedLabel:Y,onLabelSelect:function(a){J(a),_(void 0)},onLabelModify:function(){},onLabelDelete:function(){},onLabelAdd:function(){}}),(0,t.jsx)(f.Z,{selectedAnnotation:T,annotations:C,onAnnotationSelect:function(a){a!=null&&a.delete||_(a)},onAnnotationAdd:function(){},onAnnotationModify:function(){},onAnnotationDelete:function(a){z(C.filter(function(I){return I.annotationId!=a.annotationId})),_(void 0)}})]})]})},rn=an}}]);
