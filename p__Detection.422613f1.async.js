(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[18],{41435:function(H,w,o){"use strict";o.d(w,{Z:function(){return U}});var P=o(94663),Y=o(80112);function X(D){return Function.toString.call(D).indexOf("[native code]")!==-1}var _=o(18597);function L(D,y,b){return(0,_.Z)()?L=Reflect.construct:L=function(v,$,l){var N=[null];N.push.apply(N,$);var z=Function.bind.apply(v,N),F=new z;return l&&(0,Y.Z)(F,l.prototype),F},L.apply(null,arguments)}function U(D){var y=typeof Map=="function"?new Map:void 0;return U=function(g){if(g===null||!X(g))return g;if(typeof g!="function")throw new TypeError("Super expression must either be null or a function");if(typeof y!="undefined"){if(y.has(g))return y.get(g);y.set(g,v)}function v(){return L(g,arguments,(0,P.Z)(this).constructor)}return v.prototype=Object.create(g.prototype,{constructor:{value:v,enumerable:!1,writable:!0,configurable:!0}}),(0,Y.Z)(v,g)},U(D)}},72285:function(H){H.exports={det:"det___3GOn8",mainStage:"mainStage___36l4G",draw:"draw___1EIyT",pblock:"pblock___107zJ",progress:"progress___vIcpV",rightSideBar:"rightSideBar___3n2bi",determinOutline:"determinOutline___1p2xS"}},80212:function(H,w,o){"use strict";o.r(w),o.d(w,{default:function(){return yn}});var P=o(11849),Y=o(57663),X=o(71577),_=o(20228),L=o(11382),U=o(34669),D=o(54458),y=o(2824),b=o(67294),g=o(72285),v=o.n(g),$=o(8088),l=o(61541),N=o(44434),z=o(5041),F=o(57436),sn=o(14836),n=o(85893),cn=function(i){return(0,n.jsx)(l.Z,{active:i.active,imgSrc:i.imgSrc||"./pics/buttons/rectangle.png",onClick:i.onClick,children:i.children})},ln=cn,un=o(91220),W=o(65031);function dn(t){var i=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return i?{r:parseInt(i[1],16),g:parseInt(i[2],16),b:parseInt(i[3],16)}:null}function nn(t,i){if(!(!t||!i))return{color:t,points:i}}function fn(t,i,A,u,m,x,d){if(!t||!t.lines||!t.lines[0])return[(0,n.jsx)(n.Fragment,{})];var a=t.lines[0].points,f=t.lines[0].color,p=dn(f);if(!p)return[(0,n.jsx)(n.Fragment,{})];var O=(d==null?void 0:d.annotationId)==t.annotationId,h=O?.5:.1,j=void 0,Z=[];return a.forEach(function(S,C){if(!j){j=S;return}Z.push((0,n.jsx)(W.Cd,{onMouseDown:function(){m=="mover"&&x(t)},draggable:m=="mover",onDragMove:function(k){console.log("Circle onDrageMove");var G=k.evt.offsetX/u,B=k.evt.offsetY/u;a[C-1]=G,a[C]=B;var K=(0,P.Z)((0,P.Z)({},t),{},{lines:[{color:f,points:a}]});i(K)},onMouseOver:function(){console.log("Circle onMouseOver"),m=="mover"&&(document.body.style.cursor="pointer")},onMouseOut:function(){console.log("Circle onMouseOut"),document.body.style.cursor="default"},x:j,y:S,radius:5,fill:f})),console.log(C,a),a.length>4&&a.splice(C+1,2),j=void 0}),[(0,n.jsxs)(W.ZA,{children:[(0,n.jsx)(W.UL,{onMouseOver:function(){m=="mover"&&(document.body.style.cursor="pointer")},onMouseOut:function(){document.body.style.cursor="default"},onClick:function(){m=="mover"&&x(t)},stroke:f,strokeWidth:2,globalCompositeOperation:"source-over",lineCap:"round",x:a[0],y:a[1],width:a[2]-a[0],height:a[3]-a[1],closed:!0,fill:"rgba(".concat(p.r,", ").concat(p.g,", ").concat(p.b,", ").concat(h,")")}),Z]},t.annotationId)]}function vn(t){var i=0,A=(0,un.Z)(t),u;try{for(A.s();!(u=A.n()).done;){var m=u.value;!m||m.annotationId>i&&(i=m.annotationId)}}catch(x){A.e(x)}finally{A.f()}return i}function gn(t){var i=function(d,a){var f,p=d.evt.offsetX/a,O=d.evt.offsetY/a,h=nn((f=t.currentLabel)===null||f===void 0?void 0:f.color,[p,O]);!h||t.onAnnotationAdd({tool:"polygon",annotationId:vn(t.annotations)+1,label:t.currentLabel,lines:[h]})},A=function(d,a){var f,p;if(!!t.currentAnnotation){var O=d.evt.offsetX/a,h=d.evt.offsetY/a,j=t.currentAnnotation.lines||[],Z=nn((f=t.currentLabel)===null||f===void 0?void 0:f.color,(p=j[0])===null||p===void 0?void 0:p.points.concat([O,h]));if(!!Z){var S={tool:"polygon",annotationId:t.currentAnnotation.annotationId,label:t.currentAnnotation.label,lines:[Z]};t.onAnnotationModify(S)}}},u=function(d,a){t.currentTool=="polygon"&&(t.currentAnnotation?A(d,a):i(d,a))},m=function(){t.currentTool=="polygon"&&t.onMouseUp()};return{onMouseDown:u,onMouseMove:function(){},onMouseUp:m,createElementsFunc:fn}}var mn=o(64322),J=40,pn=function(){var i,A=(0,mn.$L)(b.useState,b.useEffect,{label:{oneHot:!0},effectTrigger:{}}),u=(0,y.Z)(A,8),m=u[0],x=u[1],d=u[2],a=u[3],f=u[4],p=u[5],O=u[6],h=u[7],j=(0,b.useState)(void 0),Z=(0,y.Z)(j,2),S=Z[0],C=Z[1],T=(0,b.useState)({color:"",name:""}),k=(0,y.Z)(T,2),G=k[0],B=k[1],K=(0,b.useState)(),tn=(0,y.Z)(K,2),R=tn[0],V=tn[1],hn=(0,b.useState)([]),en=(0,y.Z)(hn,2),M=en[0],E=en[1],I=function(e){V(e),e!=null&&e.label&&B(e.label)};(0,b.useEffect)(function(){localStorage.removeItem("history"),Q([])},[]);function Q(c,e){var r=localStorage.getItem("history"),s=r?JSON.parse(r):{index:-1,items:[]},an={currentAnnotation:e,annotations:c};if(JSON.stringify(s.items[s.index])!=JSON.stringify(an)){var Mn=s.index>J?s.index-J:0,bn=s.items.splice(Mn,s.index==0?1:s.index+1);s.items=bn.concat([an]),s.index<=J?s.index++:s.index=J+1,localStorage.setItem("history",JSON.stringify(s))}}var Sn=function(){var e=localStorage.getItem("history");if(!!e){var r=JSON.parse(e);if(!!r&&!(r.index>=r.items.length-1)){r.index++,localStorage.setItem("history",JSON.stringify(r));var s=r.items[r.index];V(s.currentAnnotation),E(s.annotations)}}},xn=function(){var e=localStorage.getItem("history");if(!!e){var r=JSON.parse(e);if(!(!r||!r.index)&&!(r.index<=0)){r.index--,localStorage.setItem("history",JSON.stringify(r));var s=r.items[r.index];V(s.currentAnnotation),E(s.annotations)}}},on=function(e){for(var r=[],s=0;s<M.length;s++)M[s].annotationId==e.annotationId?r.push(e):r.push(M[s]);I(e),E(r)},rn=gn({currentLabel:G,currentTool:S,annotations:M,currentAnnotation:R,onAnnotationAdd:function(e){var r=M.concat([e]);E(r),R||I(e)},onAnnotationModify:on,onMouseUp:function(){Q(M,R)}}),q=rn;return(0,n.jsxs)($.Z,{className:v().det,children:[(0,n.jsxs)(N.Z,{children:[(0,n.jsx)(ln,{active:S=="polygon",onClick:function(){C("polygon"),I(void 0)},children:"Rectangle"}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/edit.png",children:"Edit"}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){d.change(.1)},children:"Zoom in"}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){d.change(-.1)},children:"Zoom out"}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/save.png",children:"Save"}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/move.png",onClick:function(){C("mover")},children:"Move"}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/prev.png",onClick:function(){xn()},children:"Undo"}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/next.png",onClick:function(){Sn()},children:"Redo"}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:"Clear Mark"})]}),(0,n.jsx)("div",{id:"dr",className:v().mainStage,children:(0,n.jsxs)(L.Z,{tip:"loading",spinning:m,children:[(0,n.jsx)("div",{className:v().draw,children:(0,n.jsx)(F.Z,{width:(i=document.getElementById("dr"))===null||i===void 0?void 0:i.clientWidth,scale:d.curr,annotations:M,currentTool:S,currentAnnotation:R,setCurrentAnnotation:I,onAnnotationModify:on,onAnnotationModifyComplete:function(){Q(M,R)},onMouseDown:q.onMouseDown,onMouseMove:q.onMouseMove,onMouseUp:q.onMouseUp,createPolygonFunc:rn.createElementsFunc,imgSrc:p.imgSrc})}),(0,n.jsx)("div",{className:v().pblock,children:(0,n.jsx)("div",{className:v().progress,children:(0,n.jsx)(D.Z,{percent:50,status:"active"})})})]})}),(0,n.jsxs)(N.Z,{disLoc:"right",children:[(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/data_division.png",children:"Divide Data"}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/export.png",children:"Export"}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/next.png",onClick:f.nextTask,children:"Next"}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/prev.png",onClick:f.prevTask,children:"Prev"})]}),(0,n.jsxs)("div",{className:v().rightSideBar,children:[(0,n.jsx)("div",{className:v().determinOutline,children:(0,n.jsx)(X.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",block:!0,onClick:function(){I(void 0)},children:"Determine Outline"})}),(0,n.jsx)(z.Z,{labels:h.all,onLabelSelect:function(e){h.onSelect(e),B(e),I(void 0)},onLabelModify:function(){},onLabelDelete:h.remove,onLabelAdd:function(e){return h.create((0,P.Z)((0,P.Z)({},e),{},{projectId:O.curr.projectId}))}}),(0,n.jsx)(sn.Z,{selectedAnnotation:R,annotations:M,onAnnotationSelect:function(e){e!=null&&e.delete||I(e)},onAnnotationAdd:function(){},onAnnotationModify:function(){},onAnnotationDelete:function(e){E(M.filter(function(r){return r.annotationId!=e.annotationId})),I(void 0)}})]})]})},yn=pn}}]);