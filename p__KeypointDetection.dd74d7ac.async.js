(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[267],{85024:function(y){y.exports={listItem:"listItem___u4Q82",eye:"eye___BwaRm",delete:"delete___31JB_",roundBall:"roundBall___23A7l",popover:"popover___1BNET",annotationId:"annotationId___zAzX4",labelName:"labelName___2ohxn",listItemActive:"listItemActive___2QnA3"}},56159:function(y){y.exports={labelList:"labelList___v7C6K",listHeader:"listHeader___1aY8R",eye:"eye___2MKbp",roundBall:"roundBall___187XH"}},71212:function(y){y.exports={key:"key___HbxlB",mainStage:"mainStage___2kPY7",draw:"draw___1d3zf",pblock:"pblock___13HlD",progress:"progress___1iogf",rightSideBar:"rightSideBar___2SKvQ",finished:"finished___nNiaq"}},14836:function(y,O,t){"use strict";t.d(O,{Z:function(){return W}});var w=t(54421),j=t(38272),q=t(57663),Z=t(71577),p=t(91220),m=t(67294),T=t(56159),v=t.n(T),F=t(49111),l=t(19650),L=t(2824),N=t(11849),R=t(85024),_=t.n(R),K=t(63097),n=t(85893),I=function(s){var d=(0,N.Z)({},s.annotation),D=(0,m.useState)(d.invisible),C=(0,L.Z)(D,2),P=C[0],A=C[1],S=(0,m.useState)(0),M=(0,L.Z)(S,2),c=M[0],f=M[1];(0,m.useEffect)(function(){A(s.annotation.invisible)},[s.annotation.invisible]);var E=(0,n.jsxs)(j.ZP.Item,{className:"".concat(_().listItem," ").concat(s.active?_().listItemActive:""),unselectable:"on",onClick:function(){s.onClick(d)},children:[(0,n.jsxs)(l.Z,{align:"center",size:5,children:[(0,n.jsx)("a",{className:_().eye,style:{backgroundImage:P?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(r){r.stopPropagation(),A(!P),s.onAnnotationModify(d)}})," ",(0,n.jsx)("span",{className:_().annotationId,children:d.frontendId}),(0,n.jsx)("span",{className:_().labelName,children:d.label.name}),(0,n.jsx)(K.Z,{color:d.label.color})]}),(0,n.jsx)("a",{className:_().delete,onClick:function(r){r.stopPropagation();var h=new Date().getTime();h-c<300||(f(h),s.onAnnotationDelete(d))}})]});return E},U=I,Y=t(48971),B=function(s){var d=(0,Y.YB)(),D=d.formatMessage({id:"component.PPAnnotationList.annotationList"}),C=d.formatMessage({id:"component.PPAnnotationList.addAnnotation"}),P=new Set,A=[],S=(0,p.Z)(s.annotations),M;try{for(S.s();!(M=S.n()).done;){var c=M.value;P.has(c.frontendId)||(A.push(c),P.add(c.frontendId))}}catch(f){S.e(f)}finally{S.f()}return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(j.ZP,{className:v().labelList,size:"large",header:(0,n.jsx)("div",{className:v().listHeader,children:D}),bordered:!0,dataSource:A,renderItem:function(E){var g;return(0,n.jsx)(U,{onClick:s.onAnnotationSelect,annotation:E,active:E.frontendId==((g=s.currAnnotation)===null||g===void 0?void 0:g.frontendId),onAnnotationDelete:s.onAnnotationDelete,onAnnotationModify:s.onAnnotationModify})},footer:function(){return s.onAnnotationAdd?(0,n.jsx)("div",{children:(0,n.jsx)(Z.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){s.onAnnotationAdd()},block:!0,children:C})}):(0,n.jsx)("div",{})}})})},W=B},82881:function(y,O,t){"use strict";t.r(O);var w=t(57663),j=t(71577),q=t(34669),Z=t(54458),p=t(2824),m=t(67294),T=t(71212),v=t.n(T),F=t(8088),l=t(61541),L=t(44434),N=t(5041),R=t(57436),_=t(14836),K=t(48971),n=t(85893),I=40,U=function(){var B,W=(0,m.useState)(void 0),b=(0,p.Z)(W,2),s=b[0],d=b[1],D=(0,m.useState)({color:"",name:""}),C=(0,p.Z)(D,2),P=C[0],A=C[1],S=(0,m.useState)(),M=(0,p.Z)(S,2),c=M[0],f=M[1],E=(0,m.useState)([]),g=(0,p.Z)(E,2),r=g[0],h=g[1],nn=(0,m.useState)(1),Q=(0,p.Z)(nn,2),k=Q[0],H=Q[1],X=function(o){o||H(1),o<.1||o>3?H(1):H(o)},x=function(o){f(o),o!=null&&o.label&&A(o.label)};(0,m.useEffect)(function(){localStorage.removeItem("history"),z([])},[]);function z(a,o){var e=localStorage.getItem("history"),i=e?JSON.parse(e):{index:-1,items:[]},V={currentAnnotation:o,annotations:a};if(JSON.stringify(i.items[i.index])!=JSON.stringify(V)){var _n=i.index>I?i.index-I:0,Pn=i.items.splice(_n,i.index==0?1:i.index+1);i.items=Pn.concat([V]),i.index<=I?i.index++:i.index=I+1,localStorage.setItem("history",JSON.stringify(i))}}var tn=function(){var o=localStorage.getItem("history");if(!!o){var e=JSON.parse(o);if(!!e&&!(e.index>=e.items.length-1)){e.index++,localStorage.setItem("history",JSON.stringify(e));var i=e.items[e.index];f(i.currentAnnotation),h(i.annotations)}}},on=function(){var o=localStorage.getItem("history");if(!!o){var e=JSON.parse(o);if(!(!e||!e.index)&&!(e.index<=0)){e.index--,localStorage.setItem("history",JSON.stringify(e));var i=e.items[e.index];f(i.currentAnnotation),h(i.annotations)}}},$=function(o){for(var e=[],i=0;i<r.length;i++)r[i].annotationId==o.annotationId?e.push(o):e.push(r[i]);x(o),h(e)},G=drawPolygon({currentLabel:P,currentTool:s,annotations:r,currentAnnotation:c,onAnnotationAdd:function(o){var e=r.concat([o]);h(e),c||x(o)},onAnnotationModify:$,onMouseUp:function(){z(r,c)}}),J=G,u=(0,K.YB)(),en=u.formatMessage({id:"pages.toolBar.polygon"}),an=u.formatMessage({id:"pages.toolBar.zoomIn"}),sn=u.formatMessage({id:"pages.toolBar.zoomOut"}),rn=u.formatMessage({id:"pages.toolBar.move"}),ln=u.formatMessage({id:"pages.toolBar.unDo"}),dn=u.formatMessage({id:"pages.toolBar.reDo"}),cn=u.formatMessage({id:"pages.toolBar.save"}),un=u.formatMessage({id:"pages.toolBar.edit"}),mn=u.formatMessage({id:"pages.toolBar.clearMark"}),vn=u.formatMessage({id:"pages.toolBar.determineOutline"}),fn=u.formatMessage({id:"pages.toolBar.divideData"}),gn=u.formatMessage({id:"pages.toolBar.export"});return(0,n.jsxs)(F.Z,{className:v().key,children:[(0,n.jsxs)(L.Z,{children:[(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/polygon.png",active:s=="polygon",onClick:function(){d("polygon"),x(void 0)},children:en}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/edit.png",children:un}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){X(k+.1)},children:an}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){X(k-.1)},children:sn}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/save.png",children:cn}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/move.png",onClick:function(){d("mover")},children:rn}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/prev.png",onClick:function(){on()},children:ln}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/next.png",onClick:function(){tn()},children:dn}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:mn})]}),(0,n.jsxs)("div",{id:"dr",className:v().mainStage,children:[(0,n.jsx)("div",{className:v().draw,children:(0,n.jsx)(R.Z,{width:(B=document.getElementById("dr"))===null||B===void 0?void 0:B.clientWidth,scale:k,annotations:r,currentTool:s,currentAnnotation:c,setCurrentAnnotation:x,onAnnotationModify:$,onAnnotationModifyComplete:function(){z(r,c)},onMouseDown:J.onMouseDown,onMouseMove:J.onMouseMove,onMouseUp:J.onMouseUp,createPolygonFunc:G.createElementsFunc})}),(0,n.jsx)("div",{className:v().pblock,children:(0,n.jsx)("div",{className:v().progress,children:(0,n.jsx)(Z.Z,{percent:50,status:"active"})})})]}),(0,n.jsxs)(L.Z,{disLoc:"right",children:[(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/data_division.png",children:fn}),(0,n.jsx)(l.Z,{imgSrc:"./pics/buttons/export.png",children:gn})]}),(0,n.jsxs)("div",{className:v().rightSideBar,children:[(0,n.jsx)("div",{className:v().finished,children:(0,n.jsx)(j.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",block:!0,onClick:function(){x(void 0)},children:vn})}),(0,n.jsx)(N.Z,{selectedLabel:P,onLabelSelect:function(o){A(o),x(void 0)},onLabelModify:function(){},onLabelDelete:function(){},onLabelAdd:function(){}}),(0,n.jsx)(_.Z,{selectedAnnotation:c,annotations:r,onAnnotationSelect:function(o){o!=null&&o.delete||x(o)},onAnnotationAdd:function(){},onAnnotationModify:function(){},onAnnotationDelete:function(o){h(r.filter(function(e){return e.annotationId!=o.annotationId})),x(void 0)}})]})]})};O.default=U}}]);
