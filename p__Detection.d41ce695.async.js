(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[18],{41435:function(X,L,a){"use strict";a.d(L,{Z:function(){return T}});var D=a(94663),$=a(80112);function G(O){return Function.toString.call(O).indexOf("[native code]")!==-1}var _=a(18597);function k(O,I,P){return(0,_.Z)()?k=Reflect.construct:k=function(b,K,E){var u=[null];u.push.apply(u,K);var J=Function.bind.apply(b,u),F=new J;return E&&(0,$.Z)(F,E.prototype),F},k.apply(null,arguments)}function T(O){var I=typeof Map=="function"?new Map:void 0;return T=function(l){if(l===null||!G(l))return l;if(typeof l!="function")throw new TypeError("Super expression must either be null or a function");if(typeof I!="undefined"){if(I.has(l))return I.get(l);I.set(l,b)}function b(){return k(l,arguments,(0,D.Z)(this).constructor)}return b.prototype=Object.create(l.prototype,{constructor:{value:b,enumerable:!1,writable:!0,configurable:!0}}),(0,$.Z)(b,l)},T(O)}},72285:function(X){X.exports={det:"det___3GOn8",mainStage:"mainStage___36l4G",draw:"draw___1EIyT",pblock:"pblock___107zJ",progress:"progress___vIcpV",rightSideBar:"rightSideBar___3n2bi",determinOutline:"determinOutline___1p2xS"}},33549:function(X,L,a){"use strict";a.r(L),a.d(L,{default:function(){return pn}});var D=a(11849),$=a(20228),G=a(11382),_=a(34669),k=a(54458),T=a(34792),O=a(48086),I=a(91220),P=a(2824),l=a(67294),b=a(72285),K=a.n(b),E=a(8088),u=a(61541),J=a(44434),F=a(5041),en=a(57436),on=a(14836),e=a(85893),rn=function(t){return(0,e.jsx)(u.Z,{active:t.active,imgSrc:t.imgSrc||"./pics/buttons/rectangle.png",onClick:t.onClick,children:t.children})},an=rn,W=a(65031);function sn(n){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(n);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}function cn(n){if(!(!n||n.length<2))return{xmin:n[0],ymin:n[1],xmax:n[2]||void 0,ymax:n[3]||void 0}}function dn(n,t,c,d,i,S,f,g){if(console.log("drawRectangle, annotation:",n),!n||!n.points||!n.label||!n.label.color)return[(0,e.jsx)(e.Fragment,{})];var r=n.points,v=n.label.color,x=sn(v);if(!x)return[(0,e.jsx)(e.Fragment,{})];console.log("drawRectangle, points:",r,"color:",v);var p=(f==null?void 0:f.annotationId)==n.annotationId,A=p?.5:.1,N=r.xmax!=null&&r.ymax!=null?(0,e.jsx)(W.UL,{onMouseOver:function(){i=="mover"&&(document.body.style.cursor="pointer")},onMouseOut:function(){document.body.style.cursor="default"},onClick:function(){i=="mover"&&S(n)},stroke:v,strokeWidth:2,globalCompositeOperation:"source-over",lineCap:"round",x:r.xmin,y:r.ymin,width:r.xmax-r.xmin,height:r.ymax-r.ymin,closed:!0,fill:"rgba(".concat(x.r,", ").concat(x.g,", ").concat(x.b,", ").concat(A,")")}):(0,e.jsx)(e.Fragment,{});function z(M){if(!M&&(r.xmax==null||r.ymax==null))return(0,e.jsx)(e.Fragment,{});var C=function(H){if(i=="editor"){var R=(H.evt.offsetX+((g==null?void 0:g.x)||0))/d,h=(H.evt.offsetY+((g==null?void 0:g.y)||0))/d;M?(r.xmin=R,r.ymin=h):(r.xmax=R,r.ymax=h);var Z=(0,D.Z)((0,D.Z)({},n),{},{points:r});t(Z)}};return(0,e.jsx)(W.Cd,{onMouseDown:function(){(i=="editor"||i=="mover")&&S(n)},draggable:i=="editor",onDragMove:C,onDragEnd:C,onMouseOver:function(){i=="editor"&&(document.body.style.cursor="pointer")},onMouseOut:function(){document.body.style.cursor="default"},x:M?r.xmin:r.xmax,y:M?r.ymin:r.ymax,radius:5,fill:v})}return[(0,e.jsxs)(W.ZA,{children:[N,z(!0),z(!1)]},n.annotationId)]}function ln(n){var t=1;if(!n||n.length==0)return t;var c=(0,I.Z)(n),d;try{for(c.s();!(d=c.n()).done;){var i=d.value;i.frontendId&&t<=i.frontendId&&(t=i.frontendId+1)}}catch(S){c.e(S)}finally{c.f()}return t}function un(n){var t=function(f,g,r,v){var x=(f.evt.offsetX+g)/v,p=(f.evt.offsetY+r)/v,A=cn([x,p]);!A||n.onAnnotationAdd({frontendId:ln(n.annotations),type:"rectangle",label:n.currentLabel,points:A})},c=function(f,g,r,v){if(!(!n.currentAnnotation||!n.currentAnnotation.points)){var x=(f.evt.offsetX+g)/v,p=(f.evt.offsetY+r)/v,A=n.currentAnnotation.points;if(!!A){A.xmax=x,A.ymax=p;var N={type:"rectangle",frontendId:n.currentAnnotation.frontendId,label:n.currentAnnotation.label,points:A};n.onAnnotationModify(N)}}},d=function(f,g,r,v){n.currentTool=="rectangle"&&(n.currentAnnotation?c(f,g,r,v):t(f,g,r,v))},i=function(){n.currentTool=="rectangle"&&n.onMouseUp()};return{onMouseDown:d,onMouseMove:function(){},onMouseUp:i,createElementsFunc:dn}}var fn=a(64322),U=40;function vn(){localStorage.removeItem("history"),V([])}function V(n){var t=localStorage.getItem("history"),c=t?JSON.parse(t):{index:-1,items:[]};if(JSON.stringify(c.items[c.index])!=JSON.stringify(n)){var d=c.index>U?c.index-U:0,i=c.items.splice(d,c.index==0?1:c.index+1);c.items=i.concat([n]),c.index<=U?c.index++:c.index=U+1,localStorage.setItem("history",JSON.stringify(c))}}function gn(){var n=localStorage.getItem("history");if(!!n){var t=JSON.parse(n);if(!!t&&!(t.index>=t.items.length-1))return t.index++,localStorage.setItem("history",JSON.stringify(t)),t.items[t.index]}}function mn(){var n=localStorage.getItem("history");if(!!n){var t=JSON.parse(n);if(!(!t||!t.index)&&!(t.index<=0))return t.index--,localStorage.setItem("history",JSON.stringify(t)),t.items[t.index]}}var y=a(48971),xn=function(){var t,c=(0,fn.$L)(l.useState,l.useEffect,{label:{oneHot:!0},effectTrigger:{postTaskChange:vn}}),d=(0,P.Z)(c,10),i=d[0],S=d[1],f=d[2],g=d[3],r=d[4],v=d[5],x=d[6],p=d[7],A=d[8],N=d[9],z=(0,l.useState)(),M=(0,P.Z)(z,2),C=M[0],m=M[1],H=(0,l.useState)([]),R=(0,P.Z)(H,2),h=R[0],Z=R[1],yn=function(o){if(!o.frontendId)throw new Error("addAnnotation, Annotation frontendId not generated: "+JSON.stringify(o));h.push(o),Z(h),m(o)},hn=function(o){if(!o.frontendId)throw new Error("addAnnotation, Annotation frontendId not generated: "+JSON.stringify(o));var B=[],j=(0,I.Z)(h),Y;try{for(j.s();!(Y=j.n()).done;){var w=Y.value;w.frontendId==o.frontendId?B.push(o):B.push(w)}}catch(q){j.e(q)}finally{j.f()}console.log("modifyAnnotation, newAnnos:",B,"anno:",o),Z(B),m(o)},Sn=function(o){if(!o.frontendId)throw new Error("addAnnotation, Annotation frontendId not generated: "+JSON.stringify(o));var B=[],j=(0,I.Z)(h),Y;try{for(j.s();!(Y=j.n()).done;){var w=Y.value;w.frontendId!=o.frontendId&&B.push(w)}}catch(q){j.e(q)}finally{j.f()}Z(B),m(void 0)},Nn=function(o){!o||(console.log("modifyAnnotation",o,"anno.label:",o==null?void 0:o.label),o.taskId=r.curr.taskId,o.dataId=v.curr.dataId,g.modify(o))},nn=function(o){console.log("onAnnotationModify"),hn(o)},tn=un({currentLabel:p.curr,currentTool:i.curr,annotations:h,currentAnnotation:C,onAnnotationAdd:yn,onAnnotationModify:nn,onMouseUp:function(){V({annos:h,currAnno:C})}}),Q=tn,An=(0,y.YB)().formatMessage({id:"pages.toolBar.rectangle"}),Mn=(0,y.YB)().formatMessage({id:"pages.toolBar.zoomIn"}),In=(0,y.YB)().formatMessage({id:"pages.toolBar.zoomOut"}),jn=(0,y.YB)().formatMessage({id:"pages.toolBar.move"}),bn=(0,y.YB)().formatMessage({id:"pages.toolBar.unDo"}),Cn=(0,y.YB)().formatMessage({id:"pages.toolBar.reDo"}),On=(0,y.YB)().formatMessage({id:"pages.toolBar.save"}),Zn=(0,y.YB)().formatMessage({id:"pages.toolBar.edit"}),Bn=(0,y.YB)().formatMessage({id:"pages.toolBar.clearMark"}),Dn=(0,y.YB)().formatMessage({id:"pages.toolBar.undef"}),kn=(0,y.YB)().formatMessage({id:"pages.toolBar.divideData"}),Pn=(0,y.YB)().formatMessage({id:"pages.toolBar.export"});return(0,e.jsxs)(E.Z,{className:K().det,children:[(0,e.jsxs)(J.Z,{children:[(0,e.jsx)(an,{active:i.curr=="rectangle",onClick:function(){if(!p.curr){O.default.error("Please choose a label category first!");return}i.setCurr("rectangle"),m(void 0)},children:An}),(0,e.jsx)(u.Z,{active:i.curr=="editor",imgSrc:"./pics/buttons/edit.png",onClick:function(){i.setCurr("editor")},children:Zn}),(0,e.jsx)(u.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){f.change(.1)},children:Mn}),(0,e.jsx)(u.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){f.change(-.1)},children:In}),(0,e.jsx)(u.Z,{imgSrc:"./pics/buttons/save.png",onClick:function(){O.default.info("Annotations are saved automatically. You don't need to click save.")},children:On}),(0,e.jsx)(u.Z,{imgSrc:"./pics/buttons/move.png",active:i.curr=="mover",onClick:function(){i.setCurr("mover")},children:jn}),(0,e.jsx)(u.Z,{imgSrc:"./pics/buttons/prev.png",onClick:function(){var o=mn();!o||(m(o.currAnno),Z(o.annos))},children:bn}),(0,e.jsx)(u.Z,{imgSrc:"./pics/buttons/next.png",onClick:function(){var o=gn();!o||(m(o.currAnno),Z(o.annos))},children:Cn}),(0,e.jsx)(u.Z,{imgSrc:"./pics/buttons/clear_mark.png",onClick:function(){return console.log("clear")},children:Bn})]}),(0,e.jsx)("div",{id:"dr",className:"mainStage",children:(0,e.jsxs)(G.Z,{tip:"loading",spinning:!!S.curr,children:[(0,e.jsx)("div",{className:"draw",children:(0,e.jsx)(en.Z,{scale:f.curr,annotations:h,currentTool:i.curr,currentAnnotation:C,setCurrentAnnotation:m,onAnnotationModify:nn,onAnnotationModifyComplete:function(){V({annos:h,currAnno:C})},onMouseDown:Q.onMouseDown,onMouseMove:Q.onMouseMove,onMouseUp:Q.onMouseUp,createRectangleFunc:tn.createElementsFunc,imgSrc:v.imgSrc})}),(0,e.jsx)("div",{className:"pblock",children:(0,e.jsxs)("div",{className:"progress",children:[(0,e.jsx)(k.Z,{className:"progressBar",percent:x.progress,status:"active",showInfo:!1})," ",(0,e.jsxs)("span",{className:"progressDesc",children:["Current labeling ",r.currIdx==null?1:r.currIdx+1," of"," ",(t=r.all)===null||t===void 0?void 0:t.length,". Already labeled ",r.finished(x.progress)||0,"."]})]})}),(0,e.jsx)("div",{className:"prevTask",onClick:r.prevTask}),(0,e.jsx)("div",{className:"nextTask",onClick:r.nextTask})]})}),(0,e.jsxs)(J.Z,{disLoc:"right",children:[(0,e.jsx)(u.Z,{imgSrc:"./pics/buttons/data_division.png",onClick:function(){A(x.curr.projectId,{train:.5,validation:.3,test:.2})},children:kn}),(0,e.jsx)(u.Z,{imgSrc:"./pics/buttons/export.png",onClick:function(){N(x.curr.projectId,"/home/lin/Desktop/data/pplabel/export/")},children:Pn}),(0,e.jsx)(u.Z,{imgSrc:"./pics/buttons/data_division.png",onClick:function(){m(void 0)},children:Dn})]}),(0,e.jsxs)("div",{className:"rightSideBar",children:[(0,e.jsx)(F.Z,{labels:p.all,activeIds:p.activeIds,onLabelSelect:function(o){p.onSelect(o),m(void 0)},onLabelModify:function(){},onLabelDelete:p.remove,onLabelAdd:function(o){return p.create((0,D.Z)((0,D.Z)({},o),{},{projectId:x.curr.projectId}))}}),(0,e.jsx)(on.Z,{annotations:h,currAnnotation:C,onAnnotationSelect:m,onAnnotationAdd:function(){m(void 0)},onAnnotationModify:function(){},onAnnotationDelete:function(o){Sn(o)}})]})]})},pn=xn}}]);