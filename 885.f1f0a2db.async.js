(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[885],{85024:function(b){b.exports={listItem:"listItem___u4Q82",eye:"eye___BwaRm",delete:"delete___31JB_",roundBall:"roundBall___23A7l",popover:"popover___1BNET",annotationId:"annotationId___zAzX4",labelName:"labelName___2ohxn",listItemActive:"listItemActive___2QnA3"}},56159:function(b){b.exports={labelList:"labelList___v7C6K",listHeader:"listHeader___1aY8R",eye:"eye___2MKbp",roundBall:"roundBall___187XH"}},57560:function(b){b.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___147XP",toolBarButtonContainer:"toolBarButtonContainer___ZEvhK",toolBarButton:"toolBarButton___1s2Rh",buttonText:"buttonText___3NTCv",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___2Utx8",popover:"popover___3PRoi"}},26647:function(b){b.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1FTWb",toolBarButtonContainer:"toolBarButtonContainer___1Vahn",toolBarButton:"toolBarButton___3mR2H",buttonText:"buttonText___Y0WDm",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3lRZ8",popover:"popover___3zzu2",popoverLeft:"popoverLeft___15lGe"}},14836:function(b,B,t){"use strict";t.d(B,{Z:function(){return M}});var R=t(54421),D=t(38272),L=t(57663),h=t(71577),I=t(67294),C=t(56159),x=t.n(C),T=t(49111),j=t(19650),e=t(2824),f=t(11849),n=t(85024),_=t.n(n),l=t(63097),o=t(85893),a=function(s){var v=(0,f.Z)({},s.annotation),E=(0,I.useState)(v.invisible),c=(0,e.Z)(E,2),i=c[0],u=c[1],g=(0,I.useState)(0),O=(0,e.Z)(g,2),A=O[0],y=O[1];(0,I.useEffect)(function(){u(s.annotation.invisible)},[s.annotation.invisible]);var W=(0,o.jsxs)(D.ZP.Item,{className:"".concat(_().listItem," ").concat(s.active?_().listItemActive:""),unselectable:"on",onClick:function(){s.onClick(v)},children:[(0,o.jsxs)(j.Z,{align:"center",size:5,children:[(0,o.jsx)("a",{className:_().eye,style:{backgroundImage:i?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(S){S.stopPropagation(),u(!i),s.onAnnotationModify(v)}})," ",(0,o.jsx)("span",{className:_().annotationId,children:v.frontendId}),(0,o.jsx)("span",{className:_().labelName,children:v.label.name}),(0,o.jsx)(l.Z,{color:v.label.color})]}),(0,o.jsx)("a",{className:_().delete,onClick:function(S){S.stopPropagation();var K=new Date().getTime();K-A<300||(y(K),s.onAnnotationDelete(v))}})]});return W},m=a,d=t(48971),r=function(s){var v=(0,d.YB)().formatMessage({id:"component.PPAnnotationList.annotationList"}),E=(0,d.YB)().formatMessage({id:"component.PPAnnotationList.addAnnotation"});return(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(D.ZP,{className:x().labelList,size:"large",header:(0,o.jsx)("div",{className:x().listHeader,children:v}),bordered:!0,dataSource:s.annotations,renderItem:function(i){var u;return(0,o.jsx)(m,{onClick:s.onAnnotationSelect,annotation:i,active:i.frontendId==((u=s.currAnnotation)===null||u===void 0?void 0:u.frontendId),onAnnotationDelete:s.onAnnotationDelete,onAnnotationModify:s.onAnnotationModify})},footer:(0,o.jsx)("div",{children:(0,o.jsx)(h.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){s.onAnnotationAdd()},block:!0,children:E})})})})},M=r},43801:function(b,B,t){"use strict";t.d(B,{Z:function(){return f}});var R=t(11849),D=t(2824),L=t(91220),h=t(67294),I=t(65031),C=t(85893);function x(n,_,l,o){if(!(!n||!_||!l||!o))return{width:n,color:_,points:l,tool:o}}function T(n){if(!n||!n.points)return(0,C.jsx)(C.Fragment,{});var _=[],l=(0,L.Z)(n.points),o;try{for(l.s();!(o=l.n()).done;){var a=o.value;!a.width||!a.color||!a.tool||_.push((0,C.jsx)(I.x1,{stroke:a.color,strokeWidth:a.width,globalCompositeOperation:a.tool==="brush"?"source-over":"destination-out",lineCap:"round",points:a.points,tension:1}))}}catch(m){l.e(m)}finally{l.f()}return(0,C.jsx)(I.ZA,{draggable:!1,children:_})}function j(n,_){return n=="rubber"||_==2?"rubber":"brush"}function e(n){var _=0,l=(0,L.Z)(n),o;try{for(l.s();!(o=l.n()).done;){var a=o.value;!a||!a.frontendId||a.frontendId>_&&(_=a.frontendId)}}catch(m){l.e(m)}finally{l.f()}return _}function f(n){var _=(0,h.useState)(),l=(0,D.Z)(_,2),o=l[0],a=l[1],m=function(P,s,v,E){var c,i;if(!(n.currentTool!="brush"&&n.currentTool!="rubber"||!((c=n.currentLabel)!==null&&c!==void 0&&c.color))){var u=(P.evt.offsetX+s)/E,g=(P.evt.offsetY+v)/E,O=j(n.currentTool,P.evt.button),A=x(n.brushSize||10,(i=n.currentLabel)===null||i===void 0?void 0:i.color,[u,g,u,g],O);if(!!A)if(a(O),n.currentAnnotation){var y,W={type:"brush",frontendId:n.currentAnnotation.frontendId,label:n.currentAnnotation.label,points:(y=n.currentAnnotation.points)===null||y===void 0?void 0:y.concat([A])};n.onAnnotationModify(W)}else{if(O=="rubber")return;n.onAnnotationAdd({type:O,frontendId:e(n.annotations)+1,label:n.currentLabel,points:[A]})}}},d=function(P,s,v,E){var c;if(!(!o||!n.currentAnnotation||!n.currentLabel.color)){var i=(P.evt.offsetX+s)/E,u=(P.evt.offsetY+v)/E,g=[i,u],O=[];(c=n.currentAnnotation)!==null&&c!==void 0&&c.points&&(g=n.currentAnnotation.points[n.currentAnnotation.points.length-1].points.concat(g),O=n.currentAnnotation.points);var A=x(n.brushSize||10,n.currentLabel.color,g,o);!A||(O.pop(),O.push(A),n.onAnnotationModify((0,R.Z)((0,R.Z)({},n.currentAnnotation),{},{points:O,type:o})))}},r=function(){n.currentTool!="brush"&&n.currentTool!="rubber"||(a(void 0),n.onMouseUp())};return{onMouseDown:m,onMouseMove:d,onMouseUp:r,createElementsFunc:T}}},58967:function(b,B,t){"use strict";var R=t(20136),D=t(55241),L=t(77883),h=t(70507),I=t(57663),C=t(71577),x=t(2824),T=t(67294),j=t(61541),e=t(57560),f=t.n(e),n=t(85893),_=1,l=50,o=10;function a(d){return d?d<=_?_:d>=l?l:d:o}var m=function(r){var M=(0,T.useState)(a(r.size)),P=(0,x.Z)(M,2),s=P[0],v=P[1],E=function(i){v(a(i))};return(0,T.useEffect)(function(){E(r.size)},[r.size]),(0,n.jsxs)(D.Z,{overlayClassName:f().popover,placement:"right",content:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(C.Z,{type:"text",onClick:function(){var i,u=a(s-1);E(u),(i=r.onChange)===null||i===void 0||i.call(0,u)},children:"-"}),(0,n.jsx)(h.Z,{min:_,max:l,value:s,onChange:function(i){var u;(u=r.onChange)===null||u===void 0||u.call(0,i)},controls:!1,style:{textAlign:"center"}}),(0,n.jsx)(C.Z,{type:"text",onClick:function(){var i,u=a(s+1);E(u),(i=r.onChange)===null||i===void 0||i.call(0,u)},children:"+"})]}),trigger:r.active?"hover":"click",children:[" ",(0,n.jsx)(j.Z,{active:r.active,imgSrc:r.imgSrc||"./pics/buttons/brush.png",onClick:r.onClick,children:r.children||"Brush"})]})};B.Z=m},27992:function(b,B,t){"use strict";var R=t(20136),D=t(55241),L=t(77883),h=t(70507),I=t(57663),C=t(71577),x=t(2824),T=t(67294),j=t(61541),e=t(26647),f=t.n(e),n=t(85893),_=1,l=100,o=10;function a(d){return d?d<=_?_:d>=l?l:d:o}var m=function(r){var M=(0,T.useState)(a(r.size)),P=(0,x.Z)(M,2),s=P[0],v=P[1],E=function(i){v(a(i))};return(0,T.useEffect)(function(){E(r.size)},[r.size]),(0,n.jsxs)(D.Z,{overlayClassName:"".concat(f().popover," ").concat(r.disLoc=="left"?f().popoverLeft:""),placement:r.disLoc||"right",content:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(C.Z,{type:"text",onClick:function(){var i,u=a(s-1);E(u),(i=r.onChange)===null||i===void 0||i.call(0,u)},children:"-"}),(0,n.jsx)(h.Z,{min:_,max:l,value:s,onChange:function(i){var u;(u=r.onChange)===null||u===void 0||u.call(0,i)},controls:!1,style:{textAlign:"center"}}),(0,n.jsx)(C.Z,{type:"text",onClick:function(){var i,u=a(s+1);E(u),(i=r.onChange)===null||i===void 0||i.call(0,u)},children:"+"})]}),trigger:"hover",children:[" ",(0,n.jsx)(j.Z,{imgSrc:r.imgSrc,onClick:r.onClick,children:r.children})]})};B.Z=m},13931:function(b,B,t){"use strict";t.d(B,{Z:function(){return j}});var R=t(91220),D=t(11849),L=t(65031),h=t(85893);function I(e){var f=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return f?{r:parseInt(f[1],16),g:parseInt(f[2],16),b:parseInt(f[3],16)}:null}function C(e,f){if(!(!e||!f))return{color:e,points:f}}function x(e,f,n,_,l,o,a,m){if(!e||!e.points||!e.points[0])return[(0,h.jsx)(h.Fragment,{})];var d=e.points[0].points,r=e.points[0].color,M=I(r);if(!M)return[(0,h.jsx)(h.Fragment,{})];var P=(m==null?void 0:m.frontendId)==e.frontendId,s=P?.5:.1,v=void 0,E=[];return d.forEach(function(c,i){if(!v){v=c;return}E.push((0,h.jsx)(L.Cd,{onMouseDown:function(){l=="editor"&&o(e)},draggable:l=="editor",onDragMove:function(g){g.cancelBubble=!0;var O=a==null?void 0:a.current,A=O.findOne(".baseImage"),y=!1,W=g.target.x();W>A.width()/2&&(W=A.width()/2,y=!0),W<-A.width()/2&&(W=-A.width()/2,y=!0);var U=g.target.y();U>A.height()/2&&(U=A.height()/2,y=!0),U<-A.height()/2&&(U=-A.height()/2,y=!0),y&&g.target.setPosition({x:W,y:U}),d[i-1]=W,d[i]=U;var S=(0,D.Z)((0,D.Z)({},e),{},{points:[{color:r,points:d}]});f(S)},onMouseOver:function(){l=="editor"&&(document.body.style.cursor="pointer")},onMouseOut:function(){document.body.style.cursor="default"},x:v,y:c,radius:5/_,fill:r})),v=void 0}),[(0,h.jsxs)(L.ZA,{children:[(0,h.jsx)(L.x1,{onMouseOver:function(){l=="editor"&&(document.body.style.cursor="pointer")},onMouseOut:function(){document.body.style.cursor="default"},onClick:function(){l=="editor"&&o(e)},stroke:r,strokeWidth:2/_,globalCompositeOperation:"source-over",lineCap:"round",points:d,tension:0,closed:!0,fill:"rgba(".concat(M.r,", ").concat(M.g,", ").concat(M.b,", ").concat(s,")")}),E]},e.frontendId)]}function T(e){var f=0,n=(0,R.Z)(e),_;try{for(n.s();!(_=n.n()).done;){var l=_.value;!l||!l.frontendId||l.frontendId>f&&(f=l.frontendId)}}catch(o){n.e(o)}finally{n.f()}return f}function j(e){var f=function(a,m,d,r){var M,P=(a.evt.offsetX+m)/r,s=(a.evt.offsetY+d)/r,v=C((M=e.currentLabel)===null||M===void 0?void 0:M.color,[P,s]);!v||e.onAnnotationAdd({type:"polygon",frontendId:T(e.annotations)+1,label:e.currentLabel,points:[v]})},n=function(a,m,d,r){var M,P;if(!!e.currentAnnotation){var s=(a.evt.offsetX+m)/r,v=(a.evt.offsetY+d)/r,E=e.currentAnnotation.points||[],c=C((M=e.currentLabel)===null||M===void 0?void 0:M.color,(P=E[0])===null||P===void 0?void 0:P.points.concat([s,v]));if(!!c){var i={type:"polygon",frontendId:e.currentAnnotation.frontendId,label:e.currentAnnotation.label,points:[c]};e.onAnnotationModify(i)}}},_=function(a,m,d,r){e.currentTool=="polygon"&&(e.currentAnnotation?n(a,m,d,r):f(a,m,d,r))},l=function(){e.currentTool=="polygon"&&e.onMouseUp()};return{onMouseDown:_,onMouseMove:function(){},onMouseUp:l,createElementsFunc:x}}},29919:function(b,B,t){"use strict";var R=t(67294),D=t(61541),L=t(85893),h=function(C){return(0,L.jsx)(D.Z,{active:C.active,imgSrc:C.imgSrc||"./pics/buttons/polygon.png",onClick:C.onClick,children:C.children})};B.Z=h}}]);
