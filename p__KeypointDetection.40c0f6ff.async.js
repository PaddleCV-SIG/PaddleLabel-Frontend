(self.webpackChunkpp_labeling_frontend=self.webpackChunkpp_labeling_frontend||[]).push([[267],{71212:function(A){A.exports={key:"key___HbxlB",mainStage:"mainStage___2kPY7",draw:"draw___1d3zf",pblock:"pblock___13HlD",progress:"progress___1iogf",rightSideBar:"rightSideBar___2SKvQ",finished:"finished___nNiaq"}},82881:function(A,y,a){"use strict";a.r(y);var tn=a(57663),B=a(71577),on=a(34669),U=a(54458),u=a(2824),c=a(67294),R=a(71212),_=a.n(R),K=a(8088),r=a(61541),W=a(44434),N=a(5041),k=a(57436),H=a(14836),J=a(29919),F=a(13931),e=a(85893),f=40,Y=function(){var w=(0,c.useState)(void 0),h=(0,u.Z)(w,2),m=h[0],p=h[1],z=(0,c.useState)({color:"",name:""}),x=(0,u.Z)(z,2),O=x[0],D=x[1],Q=(0,c.useState)(),C=(0,u.Z)(Q,2),d=C[0],g=C[1],G=(0,c.useState)([]),L=(0,u.Z)(G,2),s=L[0],P=L[1],V=(0,c.useState)(1),b=(0,u.Z)(V,2),v=b[0],S=b[1],I=function(n){n||S(1),n<.1||n>3?S(1):S(n)},l=function(n){g(n),n!=null&&n.label&&D(n.label)};(0,c.useEffect)(function(){localStorage.removeItem("history"),M([])},[]);function M(o,n){var t=localStorage.getItem("history"),i=t?JSON.parse(t):{index:-1,items:[]},Z={currentAnnotation:n,annotations:o};if(JSON.stringify(i.items[i.index])!=JSON.stringify(Z)){var q=i.index>f?i.index-f:0,nn=i.items.splice(q,i.index==0?1:i.index+1);i.items=nn.concat([Z]),i.index<=f?i.index++:i.index=f+1,localStorage.setItem("history",JSON.stringify(i))}}var X=function(){var n=localStorage.getItem("history");if(!!n){var t=JSON.parse(n);if(!!t&&!(t.index>=t.items.length-1)){t.index++,localStorage.setItem("history",JSON.stringify(t));var i=t.items[t.index];g(i.currentAnnotation),P(i.annotations)}}},$=function(){var n=localStorage.getItem("history");if(!!n){var t=JSON.parse(n);if(!(!t||!t.index)&&!(t.index<=0)){t.index--,localStorage.setItem("history",JSON.stringify(t));var i=t.items[t.index];g(i.currentAnnotation),P(i.annotations)}}},T=function(n){for(var t=[],i=0;i<s.length;i++)s[i].annotationId==n.annotationId?t.push(n):t.push(s[i]);l(n),P(t)},j=(0,F.Z)({currentLabel:O,currentTool:m,annotations:s,currentAnnotation:d,onAnnotationAdd:function(n){var t=s.concat([n]);P(t),d||l(n)},onAnnotationModify:T,onMouseUp:function(){M(s,d)}}),E=j;return(0,e.jsxs)(K.Z,{className:_().key,children:[(0,e.jsxs)(W.Z,{children:[(0,e.jsx)(J.Z,{active:m=="polygon",onClick:function(){p("polygon"),l(void 0)},children:"Polygon"}),(0,e.jsx)(r.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){I(v+.1)},children:"Zoom in"}),(0,e.jsx)(r.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){I(v-.1)},children:"Zoom out"}),(0,e.jsx)(r.Z,{imgSrc:"./pics/buttons/save.png",children:"Save"}),(0,e.jsx)(r.Z,{imgSrc:"./pics/buttons/move.png",onClick:function(){p("mover")},children:"Move"}),(0,e.jsx)(r.Z,{imgSrc:"./pics/buttons/export.png",children:"Export"}),(0,e.jsx)(r.Z,{imgSrc:"./pics/buttons/data_division.png",children:"Divide Data"}),(0,e.jsx)(r.Z,{imgSrc:"./pics/buttons/prev.png",onClick:function(){$()},children:"Undo"}),(0,e.jsx)(r.Z,{imgSrc:"./pics/buttons/next.png",onClick:function(){X()},children:"Redo"}),(0,e.jsx)(r.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:"Clear Mark"})]}),(0,e.jsxs)("div",{className:_().mainStage,children:[(0,e.jsx)("div",{className:_().draw,children:(0,e.jsx)(k.Z,{scale:v,annotations:s,currentTool:m,currentAnnotation:d,setCurrentAnnotation:l,onAnnotationModify:T,onAnnotationModifyComplete:function(){M(s,d)},onMouseDown:E.onMouseDown,onMouseMove:E.onMouseMove,onMouseUp:E.onMouseUp,createPolygonFunc:j.createElementsFunc})}),(0,e.jsx)("div",{className:_().pblock,children:(0,e.jsx)("div",{className:_().progress,children:(0,e.jsx)(U.Z,{percent:50,status:"active"})})})]}),(0,e.jsxs)("div",{className:_().rightSideBar,children:[(0,e.jsx)("div",{className:_().finished,children:(0,e.jsx)(B.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",block:!0,onClick:function(){l(void 0)},children:"Determine Outline"})}),(0,e.jsx)(N.Z,{selectedLabel:O,onLabelSelect:function(n){D(n),l(void 0)},onLabelModify:function(){},onLabelDelete:function(){},onLabelAdd:function(){}}),(0,e.jsx)(H.Z,{selectedAnnotation:d,annotations:s,onAnnotationSelect:function(n){n!=null&&n.delete||l(n)},onAnnotationAdd:function(){},onAnnotationModify:function(){},onAnnotationDelete:function(n){P(s.filter(function(t){return t.annotationId!=n.annotationId})),l(void 0)}})]})]})};y.default=Y}}]);
