(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[267],{85024:function(S){S.exports={listItem:"listItem___u4Q82",eye:"eye___BwaRm",delete:"delete___31JB_",roundBall:"roundBall___23A7l",popover:"popover___1BNET",annotationId:"annotationId___zAzX4",labelName:"labelName___2ohxn",listItemActive:"listItemActive___2QnA3"}},56159:function(S){S.exports={labelList:"labelList___v7C6K",listHeader:"listHeader___1aY8R",eye:"eye___2MKbp",roundBall:"roundBall___187XH"}},71212:function(S){S.exports={key:"key___HbxlB",mainStage:"mainStage___2kPY7",draw:"draw___1d3zf",pblock:"pblock___13HlD",progress:"progress___1iogf",rightSideBar:"rightSideBar___2SKvQ",finished:"finished___nNiaq"}},14836:function(S,E,n){"use strict";n.d(E,{Z:function(){return p}});var V=n(54421),L=n(38272),w=n(57663),N=n(71577),u=n(67294),v=n(56159),I=n.n(v),f=n(49111),R=n(19650),l=n(2824),D=n(11849),K=n(85024),g=n.n(K),U=n(63097),o=n(85893),e=function(r){var d=(0,D.Z)({},r.annotation),h=(0,u.useState)(d.invisible),x=(0,l.Z)(h,2),_=x[0],m=x[1],b=(0,u.useState)(0),j=(0,l.Z)(b,2),Z=j[0],P=j[1];(0,u.useEffect)(function(){m(r.annotation.invisible)},[r.annotation.invisible]);var B=(0,o.jsxs)(L.ZP.Item,{className:"".concat(g().listItem," ").concat(r.active?g().listItemActive:""),unselectable:"on",onClick:function(){r.onClick(d)},children:[(0,o.jsxs)(R.Z,{align:"center",size:5,children:[(0,o.jsx)("a",{className:g().eye,style:{backgroundImage:_?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(y){y.stopPropagation(),m(!_),r.onAnnotationModify(d)}})," ",(0,o.jsx)("span",{className:g().annotationId,children:d.frontendId}),(0,o.jsx)("span",{className:g().labelName,children:d.label.name}),(0,o.jsx)(U.Z,{color:d.label.color})]}),(0,o.jsx)("a",{className:g().delete,onClick:function(y){y.stopPropagation();var c=new Date().getTime();c-Z<300||(P(c),r.onAnnotationDelete(d))}})]});return B},M=e,O=n(48971),J=function(r){var d=(0,O.YB)().formatMessage({id:"component.PPAnnotationList.annotationList"}),h=(0,O.YB)().formatMessage({id:"component.PPAnnotationList.addAnnotation"});return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(L.ZP,{className:I().labelList,size:"large",header:(0,o.jsx)("div",{className:I().listHeader,children:d}),bordered:!0,dataSource:r.annotations,renderItem:function(_){var m;return(0,o.jsx)(M,{onClick:r.onAnnotationSelect,annotation:_,active:_.frontendId==((m=r.currAnnotation)===null||m===void 0?void 0:m.frontendId),onAnnotationDelete:r.onAnnotationDelete,onAnnotationModify:r.onAnnotationModify})},footer:(0,o.jsx)("div",{children:(0,o.jsx)(N.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){r.onAnnotationAdd()},block:!0,children:h})})})})},p=J},82881:function(S,E,n){"use strict";n.r(E);var V=n(57663),L=n(71577),w=n(34669),N=n(54458),u=n(2824),v=n(67294),I=n(71212),f=n.n(I),R=n(8088),l=n(61541),D=n(44434),K=n(5041),g=n(57436),U=n(14836),o=n(48971),e=n(85893),M=40,O=function(){var p,W=(0,v.useState)(void 0),r=(0,u.Z)(W,2),d=r[0],h=r[1],x=(0,v.useState)({color:"",name:""}),_=(0,u.Z)(x,2),m=_[0],b=_[1],j=(0,v.useState)(),Z=(0,u.Z)(j,2),P=Z[0],B=Z[1],T=(0,v.useState)([]),y=(0,u.Z)(T,2),c=y[0],C=y[1],q=(0,v.useState)(1),F=(0,u.Z)(q,2),Y=F[0],k=F[1],Q=function(t){t||k(1),t<.1||t>3?k(1):k(t)},A=function(t){B(t),t!=null&&t.label&&b(t.label)};(0,v.useEffect)(function(){localStorage.removeItem("history"),H([])},[]);function H(i,t){var a=localStorage.getItem("history"),s=a?JSON.parse(a):{index:-1,items:[]},G={currentAnnotation:t,annotations:i};if(JSON.stringify(s.items[s.index])!=JSON.stringify(G)){var gn=s.index>M?s.index-M:0,_n=s.items.splice(gn,s.index==0?1:s.index+1);s.items=_n.concat([G]),s.index<=M?s.index++:s.index=M+1,localStorage.setItem("history",JSON.stringify(s))}}var nn=function(){var t=localStorage.getItem("history");if(!!t){var a=JSON.parse(t);if(!!a&&!(a.index>=a.items.length-1)){a.index++,localStorage.setItem("history",JSON.stringify(a));var s=a.items[a.index];B(s.currentAnnotation),C(s.annotations)}}},tn=function(){var t=localStorage.getItem("history");if(!!t){var a=JSON.parse(t);if(!(!a||!a.index)&&!(a.index<=0)){a.index--,localStorage.setItem("history",JSON.stringify(a));var s=a.items[a.index];B(s.currentAnnotation),C(s.annotations)}}},X=function(t){for(var a=[],s=0;s<c.length;s++)c[s].annotationId==t.annotationId?a.push(t):a.push(c[s]);A(t),C(a)},$=drawPolygon({currentLabel:m,currentTool:d,annotations:c,currentAnnotation:P,onAnnotationAdd:function(t){var a=c.concat([t]);C(a),P||A(t)},onAnnotationModify:X,onMouseUp:function(){H(c,P)}}),z=$,on=(0,o.YB)().formatMessage({id:"pages.toolBar.polygon"}),en=(0,o.YB)().formatMessage({id:"pages.toolBar.zoomIn"}),an=(0,o.YB)().formatMessage({id:"pages.toolBar.zoomOut"}),sn=(0,o.YB)().formatMessage({id:"pages.toolBar.move"}),rn=(0,o.YB)().formatMessage({id:"pages.toolBar.unDo"}),ln=(0,o.YB)().formatMessage({id:"pages.toolBar.reDo"}),dn=(0,o.YB)().formatMessage({id:"pages.toolBar.save"}),cn=(0,o.YB)().formatMessage({id:"pages.toolBar.edit"}),un=(0,o.YB)().formatMessage({id:"pages.toolBar.clearMark"}),mn=(0,o.YB)().formatMessage({id:"pages.toolBar.determineOutline"}),vn=(0,o.YB)().formatMessage({id:"pages.toolBar.divideData"}),fn=(0,o.YB)().formatMessage({id:"pages.toolBar.export"});return(0,e.jsxs)(R.Z,{className:f().key,children:[(0,e.jsxs)(D.Z,{children:[(0,e.jsx)(l.Z,{imgSrc:"./pics/buttons/polygon.png",active:d=="polygon",onClick:function(){h("polygon"),A(void 0)},children:on}),(0,e.jsx)(l.Z,{imgSrc:"./pics/buttons/edit.png",children:cn}),(0,e.jsx)(l.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){Q(Y+.1)},children:en}),(0,e.jsx)(l.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){Q(Y-.1)},children:an}),(0,e.jsx)(l.Z,{imgSrc:"./pics/buttons/save.png",children:dn}),(0,e.jsx)(l.Z,{imgSrc:"./pics/buttons/move.png",onClick:function(){h("mover")},children:sn}),(0,e.jsx)(l.Z,{imgSrc:"./pics/buttons/prev.png",onClick:function(){tn()},children:rn}),(0,e.jsx)(l.Z,{imgSrc:"./pics/buttons/next.png",onClick:function(){nn()},children:ln}),(0,e.jsx)(l.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:un})]}),(0,e.jsxs)("div",{id:"dr",className:f().mainStage,children:[(0,e.jsx)("div",{className:f().draw,children:(0,e.jsx)(g.Z,{width:(p=document.getElementById("dr"))===null||p===void 0?void 0:p.clientWidth,scale:Y,annotations:c,currentTool:d,currentAnnotation:P,setCurrentAnnotation:A,onAnnotationModify:X,onAnnotationModifyComplete:function(){H(c,P)},onMouseDown:z.onMouseDown,onMouseMove:z.onMouseMove,onMouseUp:z.onMouseUp,createPolygonFunc:$.createElementsFunc})}),(0,e.jsx)("div",{className:f().pblock,children:(0,e.jsx)("div",{className:f().progress,children:(0,e.jsx)(N.Z,{percent:50,status:"active"})})})]}),(0,e.jsxs)(D.Z,{disLoc:"right",children:[(0,e.jsx)(l.Z,{imgSrc:"./pics/buttons/data_division.png",children:vn}),(0,e.jsx)(l.Z,{imgSrc:"./pics/buttons/export.png",children:fn})]}),(0,e.jsxs)("div",{className:f().rightSideBar,children:[(0,e.jsx)("div",{className:f().finished,children:(0,e.jsx)(L.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",block:!0,onClick:function(){A(void 0)},children:mn})}),(0,e.jsx)(K.Z,{selectedLabel:m,onLabelSelect:function(t){b(t),A(void 0)},onLabelModify:function(){},onLabelDelete:function(){},onLabelAdd:function(){}}),(0,e.jsx)(U.Z,{selectedAnnotation:P,annotations:c,onAnnotationSelect:function(t){t!=null&&t.delete||A(t)},onAnnotationAdd:function(){},onAnnotationModify:function(){},onAnnotationDelete:function(t){C(c.filter(function(a){return a.annotationId!=t.annotationId})),A(void 0)}})]})]})};E.default=O}}]);
