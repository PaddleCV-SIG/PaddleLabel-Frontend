(self.webpackChunkpp_labeling_frontend=self.webpackChunkpp_labeling_frontend||[]).push([[454],{57560:function(L){L.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___147XP",toolBarButtonContainer:"toolBarButtonContainer___ZEvhK",toolBarButton:"toolBarButton___1s2Rh",buttonText:"buttonText___3NTCv",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___2Utx8",popover:"popover___3PRoi"}},26647:function(L){L.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1FTWb",toolBarButtonContainer:"toolBarButtonContainer___1Vahn",toolBarButton:"toolBarButton___3mR2H",buttonText:"buttonText___Y0WDm",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3lRZ8",popover:"popover___3zzu2",popoverLeft:"popoverLeft___15lGe"}},8982:function(L){L.exports={RSPop1:"RSPop1___ei_bv",RSPop2:"RSPop2___9d5gM"}},75721:function(L){L.exports={segment:"segment___1EX9A",mainStage:"mainStage___nDwOp",draw:"draw___1Aue1",pblock:"pblock___19sdD",progress:"progress___1595f",rightSideBar:"rightSideBar___1JzJc",determinOutline:"determinOutline___2vG7S"}},43801:function(L,I,t){"use strict";t.d(I,{Z:function(){return P}});var K=t(11849),T=t(2824),p=t(91220),A=t(67294),z=t(65031),O=t(85893);function y(n,v,l,m){if(!(!n||!v||!l||!m))return{width:n,color:v,points:l,tool:m}}function x(n,v,l,m,u,h,d){if(!n||!n.lines)return(0,O.jsx)(O.Fragment,{});var i=(d==null?void 0:d.annotationId)==n.annotationId,b=i&&u=="mover",M=[],g=(0,p.Z)(n.lines),C;try{for(g.s();!(C=g.n()).done;){var _=C.value;!_.width||!_.color||!_.points||!_.tool||M.push((0,O.jsx)(z.x1,{stroke:_.color,strokeWidth:_.width,globalCompositeOperation:_.tool==="brush"?"source-over":"destination-out",lineCap:"round",points:_.points,tension:.01,onDragMove:function(){},onDragEnd:function(){l()},shadowColor:"red",shadowBlur:10,shadowOffset:{x:5,y:5},shadowOpacity:b?1:0}))}}catch(S){g.e(S)}finally{g.f()}return(0,O.jsx)(z.ZA,{draggable:b,children:M})}function R(n,v){return n=="rubber"||v==2?"rubber":"brush"}function o(n){var v=0,l=(0,p.Z)(n),m;try{for(l.s();!(m=l.n()).done;){var u=m.value;!u||u.annotationId>v&&(v=u.annotationId)}}catch(h){l.e(h)}finally{l.f()}return v}function P(n){var v=(0,A.useState)(),l=(0,T.Z)(v,2),m=l[0],u=l[1],h=function(M,g){var C;if(!(n.currentTool!="brush"&&n.currentTool!="rubber")){var _=M.evt.offsetX/g,S=M.evt.offsetY/g,a=R(n.currentTool,M.evt.button),s=y(n.brushSize||10,(C=n.currentLabel)===null||C===void 0?void 0:C.color,[_,S,_,S],a);if(!!s)if(u(a),n.currentAnnotation){var Z,W={tool:"brush",annotationId:n.currentAnnotation.annotationId,label:n.currentAnnotation.label,lines:(Z=n.currentAnnotation.lines)===null||Z===void 0?void 0:Z.concat([s])};n.onAnnotationModify(W)}else{if(a=="rubber")return;n.onAnnotationAdd({tool:"brush",annotationId:o(n.annotations)+1,label:n.currentLabel,lines:[s]})}}},d=function(M,g){var C;if(!(!m||!n.currentAnnotation)){var _=M.evt.offsetX/g,S=M.evt.offsetY/g,a=[_,S],s=[];(C=n.currentAnnotation)!==null&&C!==void 0&&C.lines&&(a=n.currentAnnotation.lines[n.currentAnnotation.lines.length-1].points.concat(a),s=n.currentAnnotation.lines);var Z=y(n.brushSize||10,n.currentLabel.color,a,m);!Z||(s.pop(),s.push(Z),n.onAnnotationModify((0,K.Z)((0,K.Z)({},n.currentAnnotation),{},{lines:s})))}},i=function(){n.currentTool!="brush"&&n.currentTool!="rubber"||(u(void 0),n.onMouseUp())};return{onMouseDown:h,onMouseMove:d,onMouseUp:i,createElementsFunc:x}}},58967:function(L,I,t){"use strict";var K=t(20136),T=t(55241),p=t(77883),A=t(70507),z=t(57663),O=t(71577),y=t(2824),x=t(67294),R=t(61541),o=t(57560),P=t.n(o),n=t(85893),v=1,l=50,m=10;function u(d){return d?d<=v?v:d>=l?l:d:m}var h=function(i){var b=(0,x.useState)(u(i.size)),M=(0,y.Z)(b,2),g=M[0],C=M[1],_=function(a){C(u(a))};return(0,x.useEffect)(function(){_(i.size)},[i.size]),(0,n.jsxs)(T.Z,{overlayClassName:P().popover,placement:"right",content:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(O.Z,{type:"text",onClick:function(){var a,s=u(g-1);_(s),(a=i.onChange)===null||a===void 0||a.call(0,s)},children:"-"}),(0,n.jsx)(A.Z,{min:v,max:l,value:g,onChange:function(a){var s;(s=i.onChange)===null||s===void 0||s.call(0,a)},controls:!1,style:{textAlign:"center"}}),(0,n.jsx)(O.Z,{type:"text",onClick:function(){var a,s=u(g+1);_(s),(a=i.onChange)===null||a===void 0||a.call(0,s)},children:"+"})]}),trigger:i.active?"hover":"click",children:[" ",(0,n.jsx)(R.Z,{active:i.active,imgSrc:i.imgSrc||"./pics/buttons/brush.png",onClick:i.onClick,children:i.children||"Brush"})]})};I.Z=h},27992:function(L,I,t){"use strict";var K=t(20136),T=t(55241),p=t(77883),A=t(70507),z=t(57663),O=t(71577),y=t(2824),x=t(67294),R=t(61541),o=t(26647),P=t.n(o),n=t(85893),v=1,l=100,m=10;function u(d){return d?d<=v?v:d>=l?l:d:m}var h=function(i){var b=(0,x.useState)(u(i.size)),M=(0,y.Z)(b,2),g=M[0],C=M[1],_=function(a){C(u(a))};return(0,x.useEffect)(function(){_(i.size)},[i.size]),(0,n.jsxs)(T.Z,{overlayClassName:"".concat(P().popover," ").concat(i.disLoc=="left"?P().popoverLeft:""),placement:i.disLoc||"right",content:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(O.Z,{type:"text",onClick:function(){var a,s=u(g-1);_(s),(a=i.onChange)===null||a===void 0||a.call(0,s)},children:"-"}),(0,n.jsx)(A.Z,{min:v,max:l,value:g,onChange:function(a){var s;(s=i.onChange)===null||s===void 0||s.call(0,a)},controls:!1,style:{textAlign:"center"}}),(0,n.jsx)(O.Z,{type:"text",onClick:function(){var a,s=u(g+1);_(s),(a=i.onChange)===null||a===void 0||a.call(0,s)},children:"+"})]}),trigger:"hover",children:[" ",(0,n.jsx)(R.Z,{imgSrc:i.imgSrc,onClick:i.onClick,children:i.children})]})};I.Z=h},13931:function(L,I,t){"use strict";t.d(I,{Z:function(){return R}});var K=t(91220),T=t(11849),p=t(65031),A=t(85893);function z(o){var P=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(o);return P?{r:parseInt(P[1],16),g:parseInt(P[2],16),b:parseInt(P[3],16)}:null}function O(o,P){if(!(!o||!P))return{color:o,points:P}}function y(o,P,n,v,l,m,u){if(!o||!o.lines||!o.lines[0])return[(0,A.jsx)(A.Fragment,{})];var h=o.lines[0].points,d=o.lines[0].color,i=z(d);if(!i)return[(0,A.jsx)(A.Fragment,{})];var b=(u==null?void 0:u.annotationId)==o.annotationId,M=b?.5:.1,g=void 0,C=[];return h.forEach(function(_,S){if(!g){g=_;return}C.push((0,A.jsx)(p.Cd,{onMouseDown:function(){l=="mover"&&m(o)},draggable:l=="mover",onDragMove:function(s){console.log("Circle onDrageMove");var Z=s.evt.offsetX/v,W=s.evt.offsetY/v;h[S-1]=Z,h[S]=W;var e=(0,T.Z)((0,T.Z)({},o),{},{lines:[{color:d,points:h}]});P(e)},onMouseOver:function(){console.log("Circle onMouseOver"),l=="mover"&&(document.body.style.cursor="pointer")},onMouseOut:function(){console.log("Circle onMouseOut"),document.body.style.cursor="default"},x:g,y:_,radius:5,fill:d})),g=void 0}),[(0,A.jsxs)(p.ZA,{children:[(0,A.jsx)(p.x1,{onMouseOver:function(){l=="mover"&&(document.body.style.cursor="pointer")},onMouseOut:function(){document.body.style.cursor="default"},onClick:function(){l=="mover"&&m(o)},stroke:d,strokeWidth:2,globalCompositeOperation:"source-over",lineCap:"round",points:h,tension:0,closed:!0,fill:"rgba(".concat(i.r,", ").concat(i.g,", ").concat(i.b,", ").concat(M,")")}),C]},o.annotationId)]}function x(o){var P=0,n=(0,K.Z)(o),v;try{for(n.s();!(v=n.n()).done;){var l=v.value;!l||l.annotationId>P&&(P=l.annotationId)}}catch(m){n.e(m)}finally{n.f()}return P}function R(o){var P=function(u,h){var d,i=u.evt.offsetX/h,b=u.evt.offsetY/h,M=O((d=o.currentLabel)===null||d===void 0?void 0:d.color,[i,b]);!M||o.onAnnotationAdd({tool:"polygon",annotationId:x(o.annotations)+1,label:o.currentLabel,lines:[M]})},n=function(u,h){var d,i;if(!!o.currentAnnotation){var b=u.evt.offsetX/h,M=u.evt.offsetY/h,g=o.currentAnnotation.lines||[],C=O((d=o.currentLabel)===null||d===void 0?void 0:d.color,(i=g[0])===null||i===void 0?void 0:i.points.concat([b,M]));if(!!C){var _={tool:"polygon",annotationId:o.currentAnnotation.annotationId,label:o.currentAnnotation.label,lines:[C]};o.onAnnotationModify(_)}}},v=function(u,h){o.currentTool=="polygon"&&(o.currentAnnotation?n(u,h):P(u,h))},l=function(){o.currentTool=="polygon"&&o.onMouseUp()};return{onMouseDown:v,onMouseMove:function(){},onMouseUp:l,createElementsFunc:y}}},21028:function(L,I,t){"use strict";t.r(I),t.d(I,{MOST_HISTORY_STEPS:function(){return X},default:function(){return mn}});var K=t(57663),T=t(71577),p=t(20136),A=t(55241),z=t(34669),O=t(54458),y=t(2824),x=t(67294),R=t(75721),o=t.n(R),P=t(8088),n=t(61541),v=t(44434),l=t(58967),m=t(27992),u=t(5041),h=t(57436),d=t(14836),i=t(29919),b=t(43801),M=t(13931),g=t(13062),C=t(71230),_=t(66126),S=t(75454),a=t(89032),s=t(15746),Z=t(8982),W=t.n(Z),e=t(85893),vn=function(F){return(0,e.jsxs)("div",{children:[(0,e.jsxs)(C.Z,{children:[(0,e.jsx)(s.Z,{span:6,className:W().Pop1,children:(0,e.jsx)("span",{children:"Ww"})}),(0,e.jsx)(s.Z,{span:18,className:W().Pop2,children:(0,e.jsx)(S.Z,{min:1,max:F.wwValue||100,defaultValue:37})})]}),(0,e.jsxs)(C.Z,{children:[(0,e.jsx)(s.Z,{span:6,className:W().Pop1,children:(0,e.jsx)("span",{children:"Wl"})}),(0,e.jsx)(s.Z,{span:18,className:W().Pop2,children:(0,e.jsx)(S.Z,{min:1,max:F.wlValue||100,defaultValue:37})})]})]})},_n=vn,X=40,fn=function(){var F,hn=(0,x.useState)(void 0),q=(0,y.Z)(hn,2),B=q[0],Y=q[1],Pn=(0,x.useState)({color:"",name:""}),nn=(0,y.Z)(Pn,2),J=nn[0],tn=nn[1],Mn=(0,x.useState)(),en=(0,y.Z)(Mn,2),U=en[0],V=en[1],Cn=(0,x.useState)([]),on=(0,y.Z)(Cn,2),D=on[0],En=on[1],Sn=(0,x.useState)(10),rn=(0,y.Z)(Sn,2),$=rn[0],an=rn[1],xn=(0,x.useState)(1),sn=(0,y.Z)(xn,2),G=sn[0],w=sn[1],ln=function(r){r||w(1),r<.1||r>3?w(1):w(r)},j=function(r){V(r),r!=null&&r.label&&tn(r.label)},N=function(r){En(r)};(0,x.useEffect)(function(){localStorage.removeItem("history"),H([])},[]);function H(c,r){var f=localStorage.getItem("history"),E=f?JSON.parse(f):{index:-1,items:[]},cn={currentAnnotation:r,annotations:c};if(JSON.stringify(E.items[E.index])!=JSON.stringify(cn)){var On=E.index>X?E.index-X:0,yn=E.items.splice(On,E.index==0?1:E.index+1);E.items=yn.concat([cn]),E.index<=X?E.index++:E.index=X+1,localStorage.setItem("history",JSON.stringify(E))}}var bn=function(){var r=localStorage.getItem("history");if(!!r){var f=JSON.parse(r);if(!!f&&!(f.index>=f.items.length-1)){f.index++,localStorage.setItem("history",JSON.stringify(f));var E=f.items[f.index];V(E.currentAnnotation),N(E.annotations)}}},An=function(){var r=localStorage.getItem("history");if(!!r){var f=JSON.parse(r);if(!(!f||!f.index)&&!(f.index<=0)){f.index--,localStorage.setItem("history",JSON.stringify(f));var E=f.items[f.index];V(E.currentAnnotation),N(E.annotations)}}},Q=function(r){for(var f=[],E=0;E<D.length;E++)D[E].annotationId==r.annotationId?f.push(r):f.push(D[E]);j(r),N(f)},un=(0,b.Z)({currentLabel:J,brushSize:$,currentTool:B,annotations:D,currentAnnotation:U,onAnnotationAdd:function(r){var f=D.concat([r]);N(f),U||j(r)},onAnnotationModify:Q,onMouseUp:function(){H(D,U)}}),dn=(0,M.Z)({currentLabel:J,brushSize:$,currentTool:B,annotations:D,currentAnnotation:U,onAnnotationAdd:function(r){var f=D.concat([r]);N(f),U||j(r)},onAnnotationModify:Q,onMouseUp:function(){H(D,U)}}),k=B=="polygon"?dn:un;return(0,e.jsxs)(P.Z,{className:o().segment,children:[(0,e.jsxs)(v.Z,{children:[(0,e.jsx)(i.Z,{active:B=="polygon",onClick:function(){Y("polygon"),j(void 0)},children:"Polygon"}),(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/edit.png",children:"Edit"}),(0,e.jsx)(l.Z,{size:$,active:B=="brush",onClick:function(){B!="rubber"&&B!="brush"&&j(void 0),Y("brush")},onChange:function(r){an(r)},children:"Brush"}),(0,e.jsx)(l.Z,{size:$,active:B=="rubber",onClick:function(){B!="rubber"&&B!="brush"&&j(void 0),Y("rubber")},onChange:function(r){an(r)},imgSrc:"./pics/buttons/rubber.png",children:"Rubber"}),(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){ln(G+.1)},children:"Zoom in"}),(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){ln(G-.1)},children:"Zoom out"}),(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/save.png",children:"Save"}),(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/move.png",onClick:function(){Y("mover")},children:"Move"}),(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/prev.png",onClick:function(){An()},children:"Undo"}),(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/next.png",onClick:function(){bn()},children:"Redo"}),(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:"Clear Mark"})]}),(0,e.jsxs)("div",{id:"dr",className:o().mainStage,children:[(0,e.jsx)("div",{className:o().draw,children:(0,e.jsx)(h.Z,{width:(F=document.getElementById("dr"))===null||F===void 0?void 0:F.clientWidth,scale:G,annotations:D,currentTool:B,currentAnnotation:U,setCurrentAnnotation:j,onAnnotationModify:Q,onAnnotationModifyComplete:function(){H(D,U)},onMouseDown:k.onMouseDown,onMouseMove:k.onMouseMove,onMouseUp:k.onMouseUp,createPolygonFunc:dn.createElementsFunc,createBrushFunc:un.createElementsFunc})}),(0,e.jsx)("div",{className:o().pblock,children:(0,e.jsx)("div",{className:o().progress,children:(0,e.jsx)(O.Z,{percent:50,status:"active"})})})]}),(0,e.jsxs)(v.Z,{disLoc:"right",children:[(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/intelligent_interaction.png",children:"Interactor"}),(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/export.png",children:"Export"}),(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/data_division.png",children:"Divide Data"}),(0,e.jsx)(m.Z,{imgSrc:"./pics/buttons/threshold.png",disLoc:"left",children:"Segment Threshold"}),(0,e.jsx)(m.Z,{imgSrc:"./pics/buttons/alpha.png",disLoc:"left",children:"Diaphaneity"}),(0,e.jsx)(m.Z,{imgSrc:"./pics/buttons/radius.png",disLoc:"left",children:"Visual Radius"}),(0,e.jsxs)(A.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Setting of medical",content:(0,e.jsx)(_n,{}),trigger:"hover",children:[" ",(0,e.jsx)(n.Z,{imgSrc:"./pics/buttons/medical_setting.png",children:"Medical Setting"})]})]}),(0,e.jsxs)("div",{className:o().rightSideBar,children:[(0,e.jsx)("div",{className:o().determinOutline,children:(0,e.jsx)(T.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",block:!0,onClick:function(){j(void 0)},children:"Determine Outline"})}),(0,e.jsx)(u.Z,{selectedLabel:J,onLabelSelect:function(r){tn(r),j(void 0)},onLabelModify:function(){},onLabelDelete:function(){},onLabelAdd:function(){}}),(0,e.jsx)(d.Z,{selectedAnnotation:U,annotations:D,onAnnotationSelect:function(r){r!=null&&r.delete||j(r)},onAnnotationAdd:function(){},onAnnotationModify:function(){},onAnnotationDelete:function(r){N(D.filter(function(f){return f.annotationId!=r.annotationId})),j(void 0)}})]})]})},mn=fn}}]);