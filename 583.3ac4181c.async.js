(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[583],{85024:function(z){z.exports={listItem:"listItem___u4Q82",eye:"eye___BwaRm",delete:"delete___31JB_",roundBall:"roundBall___23A7l",popover:"popover___1BNET",annotationId:"annotationId___zAzX4",labelName:"labelName___2ohxn",listItemActive:"listItemActive___2QnA3"}},56159:function(z){z.exports={labelList:"labelList___v7C6K",listHeader:"listHeader___1aY8R",eye:"eye___2MKbp",roundBall:"roundBall___187XH"}},26647:function(z){z.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1FTWb",toolBarButtonContainer:"toolBarButtonContainer___1Vahn",toolBarButton:"toolBarButton___3mR2H",buttonText:"buttonText___Y0WDm",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3lRZ8",popover:"popover___3zzu2",slider:"slider___ALra-",popoverLeft:"popoverLeft___15lGe"}},6277:function(z){z.exports={modal:"modal___26yNn"}},45092:function(z){z.exports={modal:"modal___1H_FQ"}},8978:function(z,H,n){"use strict";n.d(H,{Z:function(){return q}});var k=n(8870),Y=n(2824),sn=n(91220),X=n(67294),M=n(85893);function g(t){if(!t||!t.width||!t.color||!t.points||t.points.length<2||t.frontendId==null)return"";var f=t.type=="rubber"?0:t.frontendId;return"".concat(t.width,",").concat(f,",").concat(t.points.join(","))}function d(t){var f,a=t.canvasRef,c=t.annotation,s=c.result;if(!s)return(0,M.jsx)(M.Fragment,{});var D=(f=a.current)===null||f===void 0?void 0:f.getContext("2d");if(!D)return(0,M.jsx)(M.Fragment,{});for(var C=[],O=0,i=0;i<s.length;i++)s.at(i)==","?(C.push(parseFloat(s.slice(O,i))),O=i+1):s.at(i)=="|"?(C.push(parseFloat(s.slice(O,i))),P(C,D,c),C=[],O=i+1):i==s.length-1&&(C.push(parseFloat(s.slice(O,s.length))),P(C,D,c));return(0,M.jsx)(M.Fragment,{})}function P(t,f,a){var c;if(t.length<4){console.log("found incorrect points:",t);return}var s=t[0],D=t[1];if(s==0){var C;K(f,t.slice(2),(C=a.label)===null||C===void 0?void 0:C.color);return}if(D==0){y(f,s,t.slice(2),void 0);return}y(f,s,t.slice(2),(c=a.label)===null||c===void 0?void 0:c.color)}function y(t,f,a,c){t.beginPath(),t.moveTo(a[0],a[1]);for(var s=0;s<=a.length/2-1;s++){var D=a[2*s],C=a[2*s+1];t.lineTo(D,C)}t.lineCap="round",t.lineJoin="round",t.lineWidth=f,c&&(t.strokeStyle=c),t.globalCompositeOperation=c?"source-over":"destination-out",t.stroke()}function K(t,f,a){t.globalCompositeOperation=a?"source-over":"destination-out",a&&(t.fillStyle=a);for(var c=0;c<=f.length/2-1;c++){var s=f[2*c],D=f[2*c+1];t.fillRect(s,D,1,1)}}function V(t){if(!t||t.length==0)return 0;var f=0,a=(0,sn.Z)(t),c;try{for(a.s();!(c=a.n()).done;){var s=c.value;s.frontendId>f&&(f=s.frontendId)}}catch(D){a.e(D)}finally{a.f()}return f}function F(t,f){return t=="rubber"||f==2?"rubber":"brush"}function q(t){var f=(0,X.useState)(),a=(0,Y.Z)(f,2),c=a[0],s=a[1],D=function(_){var m,A;if(!(t.currentTool!="brush"&&t.currentTool!="rubber"||!((m=t.currentLabel)!==null&&m!==void 0&&m.color)||!t.brushSize)){var o=_.mouseX,B=_.mouseY,T=F(t.currentTool,_.e.evt.button),h=t.frontendIdOps.frontendId>0?t.frontendIdOps.frontendId:V(t.annotations)+1;h!=t.frontendIdOps.frontendId&&t.frontendIdOps.setFrontendId(h);var R=g({width:t.brushSize||10,color:(A=t.currentLabel)===null||A===void 0?void 0:A.color,points:[o,B,o,B],type:T,frontendId:h});if(!!R){s(T);var x={dataId:t.dataId,label:t.currentLabel,frontendId:h,result:R};t.onAnnotationAdd(x)}}},C=function(_){var m;if(!(!c||!t.currentAnnotation||!t.currentAnnotation.result||t.currentAnnotation.result.length<2||!((m=t.currentLabel)!==null&&m!==void 0&&m.color))){var A=_.mouseX,o=_.mouseY,B=t.currentAnnotation.result+",".concat(A,",").concat(o);t.onAnnotationModify((0,k.Z)((0,k.Z)({},t.currentAnnotation),{},{result:B}))}},O=function(){t.currentTool!="brush"&&t.currentTool!="rubber"||(s(void 0),t.onMouseUp())};return{onMouseDown:D,onMouseMove:C,onMouseUp:O,drawAnnotation:d}}},14836:function(z,H,n){"use strict";n.d(H,{Z:function(){return O}});var k=n(54421),Y=n(38272),sn=n(57663),X=n(71577),M=n(91220),g=n(67294),d=n(56159),P=n.n(d),y=n(49111),K=n(19650),V=n(2824),F=n(8870),q=n(85024),t=n.n(q),f=n(63097),a=n(85893),c=function(_){var m=(0,F.Z)({},_.annotation),A=(0,g.useState)(m.invisible),o=(0,V.Z)(A,2),B=o[0],T=o[1],h=(0,g.useState)(0),R=(0,V.Z)(h,2),x=R[0],L=R[1];(0,g.useEffect)(function(){T(_.annotation.invisible)},[_.annotation.invisible]);var S=(0,a.jsxs)(Y.ZP.Item,{className:"".concat(t().listItem," ").concat(_.active?t().listItemActive:""),unselectable:"on",onClick:function(){_.onClick(m)},children:[(0,a.jsxs)(K.Z,{align:"center",size:5,children:[(0,a.jsx)("a",{className:t().eye,style:{backgroundImage:B?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(e){e.stopPropagation(),T(!B),_.onAnnotationModify(m)}})," ",(0,a.jsx)("span",{className:t().annotationId,children:m.frontendId}),(0,a.jsx)("span",{className:t().labelName,children:m.label.name}),(0,a.jsx)(f.Z,{color:m.label.color})]}),(0,a.jsx)("a",{className:t().delete,onClick:function(e){e.stopPropagation();var l=new Date().getTime();l-x<300||(L(l),_.onAnnotationDelete(m))}})]});return S},s=c,D=n(48971),C=function(_){var m=(0,D.YB)(),A=m.formatMessage({id:"component.PPAnnotationList.annotationList"}),o=m.formatMessage({id:"component.PPAnnotationList.addAnnotation"}),B=new Set,T=[],h=(0,M.Z)(_.annotations),R;try{for(h.s();!(R=h.n()).done;){var x=R.value;B.has(x.frontendId)||(T.push(x),B.add(x.frontendId))}}catch(L){h.e(L)}finally{h.f()}return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(Y.ZP,{className:P().labelList,size:"large",header:(0,a.jsx)("div",{className:P().listHeader,children:A}),bordered:!0,dataSource:T,renderItem:function(S){var J;return(0,a.jsx)(s,{onClick:_.onAnnotationSelect,annotation:S,active:S.frontendId==((J=_.currAnnotation)===null||J===void 0?void 0:J.frontendId),onAnnotationDelete:_.onAnnotationDelete,onAnnotationModify:_.onAnnotationModify})},footer:(0,a.jsx)("div",{children:(0,a.jsx)(X.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){_.onAnnotationAdd()},block:!0,children:o})})})})},O=C},27992:function(z,H,n){"use strict";var k=n(20136),Y=n(55241),sn=n(13062),X=n(71230),M=n(77883),g=n(70507),d=n(89032),P=n(15746),y=n(66126),K=n(75454),V=n(2824),F=n(67294),q=n(61541),t=n(26647),f=n.n(t),a=n(85893),c=0,s=100,D=10,C=function(i){var _=(0,F.useState)(R(i.size)),m=(0,V.Z)(_,2),A=m[0],o=m[1];function B(x){o(R(x))}var T=i.minSize==null?c:i.minSize,h=i.maxSize==null?s:i.maxSize;function R(x){return x==null?D:x<=T?T:x>=h?h:x}return(0,F.useEffect)(function(){B(i.size)},[i.size]),(0,a.jsxs)(Y.Z,{overlayClassName:"".concat(f().popover," ").concat(i.disLoc=="left"?f().popoverLeft:""),placement:i.disLoc||"right",content:(0,a.jsxs)(X.Z,{children:[(0,a.jsx)(P.Z,{span:16,children:(0,a.jsx)(K.Z,{className:f().slider,value:A,max:h,min:T,onChange:function(L){var S;(S=i.onChange)===null||S===void 0||S.call(0,L)},tooltipVisible:!1})}),(0,a.jsx)(P.Z,{span:8,children:(0,a.jsx)(g.Z,{min:T,max:h,value:A,onChange:function(L){var S;(S=i.onChange)===null||S===void 0||S.call(0,L)},step:10})})]}),trigger:"hover",children:[" ",(0,a.jsx)(q.Z,{imgSrc:i.imgSrc||"",onClick:i.onClick,active:i.active,children:i.children})]})};H.Z=C},85871:function(z,H,n){"use strict";var k=n(71194),Y=n(50146),sn=n(49111),X=n(19650),M=n(57663),g=n(71577),d=n(13062),P=n(71230),y=n(89032),K=n(15746),V=n(77883),F=n(70507),q=n(34792),t=n(48086),f=n(9715),a=n(93766),c=n(2824),s=n(67294),D=n(48971),C=n(6277),O=n.n(C),i=n(85893),_=function(A){var o=(0,D.YB)(),B=(0,s.useState)(60),T=(0,c.Z)(B,2),h=T[0],R=T[1],x=(0,s.useState)(20),L=(0,c.Z)(x,2),S=L[0],J=L[1],e=(0,s.useState)(20),l=(0,c.Z)(e,2),v=l[0],I=l[1],E=(0,s.useState)(!1),p=(0,c.Z)(E,2),U=p[0],nn=p[1],j=o.formatMessage({id:"pages.toolBar.divideData"}),Q=o.formatMessage({id:"component.PPDivideDataModal.train"}),an=o.formatMessage({id:"component.PPDivideDataModal.validation"}),Z=o.formatMessage({id:"component.PPDivideDataModal.test"}),tn=o.formatMessage({id:"component.PPCreater.cancel"}),un=o.formatMessage({id:"component.PPSegMode.ok"}),G=a.Z.useForm(),b=(0,c.Z)(G,1),$=b[0];return(0,i.jsx)(Y.Z,{className:O().modal,title:j,visible:A.visible,onCancel:A.onCancel,footer:null,children:(0,i.jsxs)(a.Z,{form:$,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(){if(h+S+v!=100){t.default.error("Train, Validation and Test total percent should equal 100!");return}console.log("x trainData: ".concat(h,", validationData: ").concat(S,", testData: ").concat(v,", props.project.curr.projectId: ").concat(A.project.curr.projectId)),nn(!0),A.splitDataset(A.project.curr.projectId,{train:h*.01,val:S*.01,test:v*.01}).then(function(){var w;console.log("success"),t.default.success(o.formatMessage({id:"component.PPDivideDataModal.success"})),(w=A.onFinish)===null||w===void 0||w.call(0)}).finally(function(){nn(!1)})},autoComplete:"off",layout:"vertical",children:[(0,i.jsxs)(P.Z,{children:[(0,i.jsx)(K.Z,{span:8,children:(0,i.jsx)(a.Z.Item,{label:Q,name:"train",children:(0,i.jsx)(F.Z,{addonAfter:"%",defaultValue:60,precision:0,min:0,max:100,value:h,onChange:R})})}),(0,i.jsx)(K.Z,{span:8,children:(0,i.jsx)(a.Z.Item,{label:an,name:"validation",children:(0,i.jsx)(F.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:S,onChange:J})})}),(0,i.jsx)(K.Z,{span:8,children:(0,i.jsx)(a.Z.Item,{label:Z,name:"test",children:(0,i.jsx)(F.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:v,onChange:I})})})]}),(0,i.jsx)(a.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,i.jsxs)(X.Z,{children:[(0,i.jsx)(g.Z,{onClick:function(){var w;(w=A.onCancel)===null||w===void 0||w.call(0),$.resetFields()},children:tn}),(0,i.jsx)(g.Z,{type:"primary",htmlType:"submit",loading:U,children:un})]})})]})})};H.Z=_},62850:function(z,H,n){"use strict";var k=n(71194),Y=n(50146),sn=n(49111),X=n(19650),M=n(57663),g=n(71577),d=n(47673),P=n(24044),y=n(34792),K=n(48086),V=n(9715),F=n(93766),q=n(2824),t=n(67294),f=n(48971),a=n(45092),c=n.n(a),s=n(85893),D=function(O){var i=(0,f.YB)(),_=(0,t.useState)(!1),m=(0,q.Z)(_,2),A=m[0],o=m[1],B=i.formatMessage({id:"component.PPCreater.cancel"}),T=F.Z.useForm(),h=(0,q.Z)(T,1),R=h[0];return(0,s.jsx)(Y.Z,{className:c().modal,title:i.formatMessage({id:"component.PPExportModal.title"}),visible:O.visible,onCancel:O.onCancel,footer:null,children:(0,s.jsxs)(F.Z,{form:R,name:"basic",labelCol:{span:6},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(L){console.log(L);var S=L.path;if(!S){K.default.error(i.formatMessage({id:"component.PPExportModal.pathNotNull"}));return}o(!0),O.exportDataset(O.project.curr.projectId,S).then(function(){var J;K.default.success(i.formatMessage({id:"component.PPExportModal.exportSuccess"})),(J=O.onFinish)===null||J===void 0||J.call(0)}).finally(function(){o(!1)})},autoComplete:"off",children:[(0,s.jsx)(F.Z.Item,{label:i.formatMessage({id:"component.PPExportModal.path"}),name:"path",children:(0,s.jsx)(P.Z,{})}),(0,s.jsx)(F.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,s.jsxs)(X.Z,{children:[(0,s.jsx)(g.Z,{onClick:function(){var L;(L=O.onCancel)===null||L===void 0||L.call(0),R.resetFields()},children:B}),(0,s.jsx)(g.Z,{type:"primary",htmlType:"submit",loading:A,children:i.formatMessage({id:"component.PPExportModal.export"})})]})})]})})};H.Z=D},91861:function(z,H,n){"use strict";n.d(H,{Ad:function(){return Y},k3:function(){return sn},Vd:function(){return X},td:function(){return M}});var k=40;function Y(){localStorage.removeItem("history"),sn([])}function sn(g){var d=localStorage.getItem("history"),P=d?JSON.parse(d):{index:-1,items:[]};if(JSON.stringify(P.items[P.index])!=JSON.stringify(g)){var y=P.index>k?P.index-k:0,K=P.items.splice(y,P.index==0?1:P.index+1);P.items=K.concat([g]),P.index<=k?P.index++:P.index=k+1,localStorage.setItem("history",JSON.stringify(P))}}function X(){var g=localStorage.getItem("history");if(!!g){var d=JSON.parse(g);if(!!d&&!(d.index>=d.items.length-1))return d.index++,localStorage.setItem("history",JSON.stringify(d)),d.items[d.index]}}function M(){var g=localStorage.getItem("history");if(!!g){var d=JSON.parse(g);if(!(!d||!d.index)&&!(d.index<=0))return d.index--,localStorage.setItem("history",JSON.stringify(d)),d.items[d.index]}}},44583:function(z,H,n){"use strict";n.r(H),n.d(H,{MOST_HISTORY_STEPS:function(){return x},default:function(){return J}});var k=n(57663),Y=n(71577),sn=n(34669),X=n(54458),M=n(2824),g=n(91220),d=n(67294),P=n(8088),y=n(61541),K=n(44434),V=n(27992),F=n(5041),q=n(57436),t=n(14836),f=n(48971),a=n(91861),c=n(85871),s=n(62850),D=n(8978),C=n(8870),O=n(65031);function i(e){var l=0;if(!e)return l;var v=_createForOfIteratorHelper(e),I;try{for(v.s();!(I=v.n()).done;){var E=I.value;!E||!E.frontendId||E.frontendId>l&&(l=E.frontendId)}}catch(p){v.e(p)}finally{v.f()}return l}function _(e){var l=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return l?{r:parseInt(l[1],16),g:parseInt(l[2],16),b:parseInt(l[3],16)}:null}function m(e){var l=e.toString(16);return l.length==1?"0"+l:l}function A(e,l,v){return"#"+m(e)+m(l)+m(v)}var o=n(85893);function B(e,l){if(!(!e||!l))return l.join(",")}function T(e){var l;if(!e.annotation||!e.annotation.result||e.annotation.result.length<2||!((l=e.annotation.label)!==null&&l!==void 0&&l.color))return(0,o.jsx)(o.Fragment,{});var v=e.annotation.result.split(","),I=e.annotation.label.color,E=_(I);if(!E)return(0,o.jsx)(o.Fragment,{});var p=.3,U=void 0,nn=[];return v.forEach(function(j,Q){if(!U){U=parseInt(j);return}nn.push((0,o.jsx)(O.Cd,{onMouseDown:function(){e.currentTool=="editor"&&e.onSelect(e.annotation)},draggable:e.currentTool=="editor",onDragMove:function(Z){var tn;Z.cancelBubble=!0;var un=(tn=e.stageRef)===null||tn===void 0?void 0:tn.current,G=un.findOne(".baseImage"),b=!1,$=Z.target.x();$>G.width()/2&&($=G.width()/2,b=!0),$<-G.width()/2&&($=-G.width()/2,b=!0);var rn=Z.target.y();rn>G.height()/2&&(rn=G.height()/2,b=!0),rn<-G.height()/2&&(rn=-G.height()/2,b=!0),b&&Z.target.setPosition({x:$,y:rn}),v[Q-1]=$,v[Q]=rn;var w=(0,C.Z)((0,C.Z)({},e.annotation),{},{points:[{color:I,points:v}]});e.onDrag(w)},onMouseOver:function(){var Z;e.currentTool=="editor"&&(Z=e.stageRef)!==null&&Z!==void 0&&Z.current&&(e.stageRef.current.container().style.cursor="cell")},onMouseOut:function(){var Z;e.currentTool=="editor"&&(Z=e.stageRef)!==null&&Z!==void 0&&Z.current&&(e.stageRef.current.container().style.cursor="default")},x:U,y:j,radius:5/e.scale,fill:I})),U=void 0}),(0,o.jsxs)(O.ZA,{children:[(0,o.jsx)(O.x1,{onMouseOver:function(){e.currentTool=="editor"&&(document.body.style.cursor="pointer")},onMouseOut:function(){document.body.style.cursor="default"},onClick:function(){e.currentTool=="editor"&&e.onSelect(e.annotation)},stroke:I,strokeWidth:2/e.scale,globalCompositeOperation:"source-over",lineCap:"round",points:v,tension:0,closed:!0,fill:"rgba(".concat(E.r,", ").concat(E.g,", ").concat(E.b,", ").concat(p,")")}),nn]},e.annotation.frontendId)}function h(e){var l=0;if(!e)return l;var v=(0,g.Z)(e),I;try{for(v.s();!(I=v.n()).done;){var E=I.value;!E||!E.frontendId||E.frontendId>l&&(l=E.frontendId)}}catch(p){v.e(p)}finally{v.f()}return l}function R(e){var l=function(U,nn){var j,Q=B((j=e.currentLabel)===null||j===void 0?void 0:j.color,[U,nn]);!Q||e.onAnnotationAdd({dataId:e.dataId,type:"polygon",frontendId:h(e.annotations)+1,label:e.currentLabel,result:Q})},v=function(U,nn){var j,Q;if(!!e.currentAnnotation){var an=e.currentAnnotation.lines||[],Z=B((j=e.currentLabel)===null||j===void 0?void 0:j.color,(Q=an[0])===null||Q===void 0?void 0:Q.points.concat([U,nn]));if(!!Z){var tn={dataId:e.dataId,type:"polygon",frontendId:e.currentAnnotation.frontendId,label:e.currentAnnotation.label,points:[Z]};e.onAnnotationModify(tn)}}},I=function(U){e.currentTool=="polygon"&&(e.currentAnnotation?v(U.mouseX,U.mouseY):l(U.mouseX,U.mouseY))},E=function(){e.currentTool=="polygon"&&e.onMouseUp()};return{onMouseDown:I,onMouseMove:function(){},onMouseUp:E,drawAnnotation:T}}var x=40;function L(e){var l=0;if(!e)return l;var v=(0,g.Z)(e),I;try{for(v.s();!(I=v.n()).done;){var E=I.value;!E.labelId||E.labelId>l&&(l=E.labelId)}}catch(p){v.e(p)}finally{v.f()}return l}var S=function(){var l=(0,d.useState)([]),v=(0,M.Z)(l,2),I=v[0],E=v[1],p=(0,d.useState)(!1),U=(0,M.Z)(p,2),nn=U[0],j=U[1],Q=(0,d.useState)(!1),an=(0,M.Z)(Q,2),Z=an[0],tn=an[1],un=(0,d.useState)(void 0),G=(0,M.Z)(un,2),b=G[0],$=G[1],rn=(0,d.useState)(new Set),w=(0,M.Z)(rn,2),mn=w[0],Bn=w[1],jn=(0,d.useState)(),Mn=(0,M.Z)(jn,2),dn=Mn[0],Zn=Mn[1],Rn=(0,d.useState)([]),hn=(0,M.Z)(Rn,2),en=hn[0],ln=hn[1],Un=(0,d.useState)(0),En=(0,M.Z)(Un,2),Cn=En[0],cn=En[1],Wn=(0,d.useState)(10),In=(0,M.Z)(Wn,2),Pn=In[0],Dn=In[1],Kn=(0,d.useState)(60),On=(0,M.Z)(Kn,2),An=On[0],Fn=On[1],pn=(0,d.useState)(1),xn=(0,M.Z)(pn,2),fn=xn[0],gn=xn[1],Sn=function(r){r||gn(1),r<.1||r>20?gn(1):gn(r)},vn=function(r){var on=new Set;r!=null&&r.labelId&&on.add(r.labelId),Bn(on)},N=function(r){Zn(r),r!=null&&r.label&&vn(r.label),cn(r?r.frontendId:0)};(0,d.useEffect)(function(){(0,a.Ad)()},[]);var yn=function(r){en.pop(),en.push(r),N(r),ln(en)},Ln={dataId:0,currentLabel:I.find(function(u){return u.labelId==mn.values().next().value}),brushSize:Pn,scale:fn,currentTool:b,annotations:en,currentAnnotation:dn,onAnnotationAdd:function(r){var on=en.concat([r]);ln(on),N(r)},onAnnotationModify:yn,onMouseUp:function(){(0,a.k3)({annos:en,currAnno:dn})},frontendIdOps:{frontendId:Cn,setFrontendId:cn}},W=(0,f.YB)(),Nn=(0,D.Z)(Ln),zn=R(Ln),$n=b=="polygon"?zn:Nn;return(0,o.jsxs)(P.Z,{className:"segment",children:[(0,o.jsxs)(K.Z,{children:[(0,o.jsx)(y.Z,{imgSrc:"./pics/buttons/polygon.png",active:b=="polygon",onClick:function(){$("polygon"),N(void 0)},children:W.formatMessage({id:"pages.toolBar.polygon"})}),(0,o.jsx)(y.Z,{active:b=="editor",imgSrc:"./pics/buttons/edit.png",onClick:function(){$("editor"),N(void 0)},children:W.formatMessage({id:"pages.toolBar.edit"})}),(0,o.jsx)(V.Z,{imgSrc:"./pics/buttons/brush.png",size:Pn,active:b=="brush",onClick:function(){b!="rubber"&&b!="brush"&&N(void 0),$("brush")},onChange:function(r){Dn(r)},children:W.formatMessage({id:"pages.toolBar.brush"})}),(0,o.jsx)(V.Z,{size:Pn,active:b=="rubber",onClick:function(){b!="rubber"&&b!="brush"&&N(void 0),$("rubber")},onChange:function(r){Dn(r)},imgSrc:"./pics/buttons/rubber.png",children:W.formatMessage({id:"pages.toolBar.rubber"})}),(0,o.jsx)(y.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){Sn(fn+.1)},children:W.formatMessage({id:"pages.toolBar.zoomIn"})}),(0,o.jsx)(y.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){Sn(fn-.1)},children:W.formatMessage({id:"pages.toolBar.zoomOut"})}),(0,o.jsx)(y.Z,{imgSrc:"./pics/buttons/save.png",children:W.formatMessage({id:"pages.toolBar.save"})}),(0,o.jsx)(y.Z,{active:b=="mover",imgSrc:"./pics/buttons/move.png",onClick:function(){$("mover")},children:W.formatMessage({id:"pages.toolBar.move"})}),(0,o.jsx)(y.Z,{imgSrc:"./pics/buttons/prev.png",onClick:function(){var r=(0,a.td)();r&&(ln(r.annos),N(r.currAnno))},children:W.formatMessage({id:"pages.toolBar.unDo"})}),(0,o.jsx)(y.Z,{imgSrc:"./pics/buttons/next.png",onClick:function(){var r=(0,a.Vd)();r&&(ln(r.annos),N(r.currAnno))},children:W.formatMessage({id:"pages.toolBar.reDo"})}),(0,o.jsx)(y.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:W.formatMessage({id:"pages.toolBar.clearMark"})})]}),(0,o.jsxs)("div",{id:"dr",className:"mainStage",children:[(0,o.jsx)("div",{className:"draw",children:(0,o.jsx)(q.Z,{scale:fn,annotations:en,currentTool:b,currentAnnotation:dn,setCurrentAnnotation:N,onAnnotationModify:yn,onAnnotationModifyComplete:function(){(0,a.k3)({annos:en,currAnno:dn})},frontendIdOps:{frontendId:Cn,setFrontendId:cn},imgSrc:void 0,transparency:An,onAnnotationAdd:function(r){var on=en.concat([r]);ln(on),dn||N(r)},drawTool:$n})}),(0,o.jsx)("div",{className:"pblock",children:(0,o.jsxs)("div",{className:"progress",children:[(0,o.jsx)(X.Z,{className:"progressBar",percent:10,status:"active",showInfo:!1})," ",(0,o.jsx)("span",{className:"progressDesc",children:"Current labeling 1 of 300. Already labeled 20."})]})}),(0,o.jsx)("div",{className:"prevTask",onClick:function(){!task.prevTask()||(N(void 0),ln([]))}}),(0,o.jsx)("div",{className:"nextTask",onClick:function(){!task.nextTask()||(N(void 0),ln([]))}})]}),(0,o.jsxs)(K.Z,{disLoc:"right",children:[(0,o.jsx)(y.Z,{imgSrc:"./pics/buttons/intelligent_interaction.png",children:W.formatMessage({id:"pages.toolBar.interactor"})}),(0,o.jsx)(V.Z,{imgSrc:"./pics/buttons/threshold.png",disLoc:"left",children:W.formatMessage({id:"pages.toolBar.segmentThreshold"})}),(0,o.jsx)(V.Z,{imgSrc:"./pics/buttons/alpha.png",disLoc:"left",size:An,maxSize:100,minSize:0,onChange:function(r){Fn(r)},children:W.formatMessage({id:"pages.toolBar.transparency"})}),(0,o.jsx)(V.Z,{imgSrc:"./pics/buttons/radius.png",disLoc:"left",children:W.formatMessage({id:"pages.toolBar.visualRadius"})}),(0,o.jsx)(y.Z,{imgSrc:"./pics/buttons/data_division.png",onClick:function(){j(!0)},children:W.formatMessage({id:"pages.toolBar.divideData"})}),(0,o.jsx)(y.Z,{imgSrc:"./pics/buttons/export.png",onClick:function(){tn(!0)},children:W.formatMessage({id:"pages.toolBar.export"})})]}),(0,o.jsxs)("div",{className:"rightSideBar",children:[(0,o.jsx)("div",{className:"determinOutline",children:(0,o.jsx)(Y.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",block:!0,onClick:function(){N(void 0)},children:W.formatMessage({id:"pages.toolBar.determineOutline"})})}),(0,o.jsx)(F.Z,{labels:I,activeIds:mn,onLabelSelect:function(r){vn(r),N(void 0)},onLabelModify:function(){},onLabelDelete:function(r){var on=[],_n=(0,g.Z)(I),Tn;try{for(_n.s();!(Tn=_n.n()).done;){var bn=Tn.value;bn.labelId!=r.labelId&&on.push(bn)}}catch(Hn){_n.e(Hn)}finally{_n.f()}E(on),r.labelId&&mn.has(r.labelId)&&vn(void 0)},onLabelAdd:function(r){r.labelId||(r.labelId=L(I)+1),I.push(r),E(I),vn(r),N(void 0)}}),(0,o.jsx)(t.Z,{currAnnotation:dn,annotations:en,onAnnotationSelect:function(r){r!=null&&r.delete||N(r)},onAnnotationAdd:function(){},onAnnotationModify:function(){},onAnnotationDelete:function(r){ln(en.filter(function(on){return on.frontendId!=r.frontendId})),N(void 0)}})]}),(0,o.jsx)(c.Z,{visible:nn,onCancel:function(){j(!1)},onFinish:function(){j(!1)}}),(0,o.jsx)(s.Z,{visible:Z,onCancel:function(){tn(!1)},onFinish:function(){tn(!1)}})]})},J=S}}]);
