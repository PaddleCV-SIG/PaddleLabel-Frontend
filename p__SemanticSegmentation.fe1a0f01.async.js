(self.webpackChunkpp_labeling_frontend=self.webpackChunkpp_labeling_frontend||[]).push([[540],{54777:function(E){E.exports={segment:"segment___1YMcl",mainStage:"mainStage___2otee",rightSideBar:"rightSideBar___2X7jK",determinOutline:"determinOutline___2ls57"}},86089:function(E,f,e){"use strict";e.r(f);var Y=e(57663),x=e(71577),_=e(2824),l=e(67294),Z=e(54777),u=e.n(Z),j=e(8088),i=e(61541),B=e(44434),h=e(58967),I=e(5041),T=e(57436),R=e(14836),U=e(31154),t=e(85893),y=function(){var K=(0,l.useState)(void 0),v=(0,_.Z)(K,2),c=v[0],P=v[1],W=(0,l.useState)({color:"",name:""}),S=(0,_.Z)(W,2),A=S[0],L=S[1],z=(0,l.useState)(),D=(0,_.Z)(z,2),g=D[0],N=D[1],F=(0,l.useState)([]),p=(0,_.Z)(F,2),a=p[0],m=p[1],k=(0,l.useState)(10),C=(0,_.Z)(k,2),M=C[0],O=C[1],s=function(n){N(n),n!=null&&n.label&&L(n.label)},X=function(n){for(var r=[],d=0;d<a.length;d++)a[d].annotationId==n.annotationId?r.push(n):r.push(a[d]);s(n),m(r)},b=(0,U.Z)({currentLabel:A,brushSize:M,currentTool:c,annotations:a,currentAnnotation:g,onAnnotationAdd:function(n){m(a.concat([n])),g||s(n)},onAnnotationModify:X});return(0,t.jsxs)(j.Z,{className:u().segment,children:[(0,t.jsxs)(B.Z,{children:[(0,t.jsx)(i.Z,{imgSrc:"./pics/buttons/intelligent_interaction.png",children:"Intelligent Interaction"}),(0,t.jsx)(i.Z,{active:c=="polygon",imgSrc:"./pics/buttons/polygon.png",onClick:function(){P("polygon")},children:"Polygon"}),(0,t.jsx)(h.Z,{size:M,active:c=="brush",onClick:function(){P("brush")},onChange:function(n){O(n)},children:"Brush"}),(0,t.jsx)(h.Z,{size:M,active:c=="rubber",onClick:function(){P("rubber")},onChange:function(n){O(n)},imgSrc:"./pics/buttons/rubber.png",children:"Rubber"}),(0,t.jsx)(i.Z,{imgSrc:"./pics/buttons/zoom_in.png",children:"Zoom in"}),(0,t.jsx)(i.Z,{imgSrc:"./pics/buttons/zoom_out.png",children:"Zoom out"}),(0,t.jsx)(i.Z,{imgSrc:"./pics/buttons/save.png",children:"Save"}),(0,t.jsx)(i.Z,{imgSrc:"./pics/buttons/move.png",children:"Move"}),(0,t.jsx)(i.Z,{imgSrc:"./pics/buttons/export.png",children:"Export"}),(0,t.jsx)(i.Z,{imgSrc:"./pics/buttons/data_division.png",children:"Divide Data"}),(0,t.jsx)(i.Z,{imgSrc:"./pics/buttons/prev.png",children:"Undo"}),(0,t.jsx)(i.Z,{imgSrc:"./pics/buttons/next.png",children:"Redo"}),(0,t.jsx)(i.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:"Clear Mark"})]}),(0,t.jsx)("div",{className:u().mainStage,children:(0,t.jsx)(T.Z,{annotations:a,onMouseDown:b.onMouseDown,onMouseMove:b.onMouseMove,onMouseUp:b.onMouseUp})}),(0,t.jsxs)("div",{className:u().rightSideBar,children:[(0,t.jsx)("div",{className:u().determinOutline,children:(0,t.jsx)(x.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",block:!0,onClick:function(){s(void 0)},children:"Determine Outline"})}),(0,t.jsx)(I.Z,{selectedLabel:A,onLabelSelect:function(n){L(n),s(void 0)},onLabelModify:function(){},onLabelDelete:function(){},onLabelAdd:function(){}}),(0,t.jsx)(R.Z,{selectedAnnotation:g,annotations:a,onAnnotationSelect:function(n){n!=null&&n.delete||s(n)},onAnnotationAdd:function(){},onAnnotationModify:function(){},onAnnotationDelete:function(n){m(a.filter(function(r){return r.annotationId!=n.annotationId})),s(void 0)}})]})]})};f.default=y}}]);
