(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[89],{57560:function(y){y.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___147XP",toolBarButtonContainer:"toolBarButtonContainer___ZEvhK",toolBarButton:"toolBarButton___1s2Rh",buttonText:"buttonText___3NTCv",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___2Utx8",popover:"popover___3PRoi"}},26647:function(y){y.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1FTWb",toolBarButtonContainer:"toolBarButtonContainer___1Vahn",toolBarButton:"toolBarButton___3mR2H",buttonText:"buttonText___Y0WDm",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3lRZ8",popover:"popover___3zzu2",popoverLeft:"popoverLeft___15lGe"}},6277:function(y){y.exports={modal:"modal___26yNn"}},45092:function(y){y.exports={modal:"modal___1H_FQ"}},43801:function(y,b,n){"use strict";n.d(b,{Z:function(){return C}});var p=n(11849),T=n(2824),S=n(91220),A=n(67294),W=n(65031),i=n(85893);function u(e,m,d,O){if(!(!e||!m||!d||!O))return{width:e,color:m,points:d,tool:O}}function g(e,m,d,O,l,E,_){if(console.log("drawLine: ",e),!e||!e.points)return(0,i.jsx)(i.Fragment,{});var t=(_==null?void 0:_.annotationId)==e.annotationId,h=t&&l=="mover",M=[],r=(0,S.Z)(e.points),o;try{for(r.s();!(o=r.n()).done;){var v=o.value;console.log("rendering line: ",v),!(!v.width||!v.color||!v.tool)&&M.push((0,i.jsx)(W.x1,{stroke:v.color,strokeWidth:v.width,globalCompositeOperation:v.tool==="brush"?"source-over":"destination-out",lineCap:"round",points:v.points,tension:0,onDragMove:function(){},onDragEnd:function(){d()},shadowColor:"red",shadowBlur:10,shadowOffset:{x:5,y:5},shadowOpacity:h?1:0}))}}catch(f){r.e(f)}finally{r.f()}return(0,i.jsx)(W.ZA,{draggable:h,children:M})}function B(e,m){return e=="rubber"||m==2?"rubber":"brush"}function a(e){var m=0,d=(0,S.Z)(e),O;try{for(d.s();!(O=d.n()).done;){var l=O.value;!l||!l.frontendId||l.frontendId>m&&(m=l.frontendId+1)}}catch(E){d.e(E)}finally{d.f()}return m}function C(e){var m=(0,A.useState)(),d=(0,T.Z)(m,2),O=d[0],l=d[1],E=function(M,r,o,v){var f;if(!(e.currentTool!="brush"&&e.currentTool!="rubber"||!e.currentLabel.color)){var c=(M.evt.offsetX+r)/v,D=(M.evt.offsetY+o)/v,I=B(e.currentTool,M.evt.button),L=u(e.brushSize||10,(f=e.currentLabel)===null||f===void 0?void 0:f.color,[c,D,c,D],I);if(!!L)if(l(I),e.currentAnnotation){var U,X={tool:"brush",annotationId:e.currentAnnotation.annotationId,label:e.currentAnnotation.label,points:(U=e.currentAnnotation.points)===null||U===void 0?void 0:U.concat([L])};e.onAnnotationModify(X)}else{if(I=="rubber")return;e.onAnnotationAdd({type:I,annotationId:a(e.annotations)+1,label:e.currentLabel,points:[L]})}}},_=function(M,r,o,v){var f;if(!(!O||!e.currentAnnotation||!e.currentLabel.color)){var c=(M.evt.offsetX+r)/v,D=(M.evt.offsetY+o)/v,I=[c,D],L=[];(f=e.currentAnnotation)!==null&&f!==void 0&&f.points&&(I=e.currentAnnotation.points[e.currentAnnotation.points.length-1].points.concat(I),L=e.currentAnnotation.points);var U=u(e.brushSize||10,e.currentLabel.color,I,O);!U||(L.pop(),L.push(U),e.onAnnotationModify((0,p.Z)((0,p.Z)({},e.currentAnnotation),{},{points:L})))}},t=function(){e.currentTool!="brush"&&e.currentTool!="rubber"||(l(void 0),e.onMouseUp())};return{onMouseDown:E,onMouseMove:_,onMouseUp:t,createElementsFunc:g}}},58967:function(y,b,n){"use strict";var p=n(20136),T=n(55241),S=n(77883),A=n(70507),W=n(57663),i=n(71577),u=n(2824),g=n(67294),B=n(61541),a=n(57560),C=n.n(a),e=n(85893),m=1,d=50,O=10;function l(_){return _?_<=m?m:_>=d?d:_:O}var E=function(t){var h=(0,g.useState)(l(t.size)),M=(0,u.Z)(h,2),r=M[0],o=M[1],v=function(c){o(l(c))};return(0,g.useEffect)(function(){v(t.size)},[t.size]),(0,e.jsxs)(T.Z,{overlayClassName:C().popover,placement:"right",content:(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(i.Z,{type:"text",onClick:function(){var c,D=l(r-1);v(D),(c=t.onChange)===null||c===void 0||c.call(0,D)},children:"-"}),(0,e.jsx)(A.Z,{min:m,max:d,value:r,onChange:function(c){var D;(D=t.onChange)===null||D===void 0||D.call(0,c)},controls:!1,style:{textAlign:"center"}}),(0,e.jsx)(i.Z,{type:"text",onClick:function(){var c,D=l(r+1);v(D),(c=t.onChange)===null||c===void 0||c.call(0,D)},children:"+"})]}),trigger:t.active?"hover":"click",children:[" ",(0,e.jsx)(B.Z,{active:t.active,imgSrc:t.imgSrc||"./pics/buttons/brush.png",onClick:t.onClick,children:t.children||"Brush"})]})};b.Z=E},27992:function(y,b,n){"use strict";var p=n(20136),T=n(55241),S=n(77883),A=n(70507),W=n(57663),i=n(71577),u=n(2824),g=n(67294),B=n(61541),a=n(26647),C=n.n(a),e=n(85893),m=1,d=100,O=10;function l(_){return _?_<=m?m:_>=d?d:_:O}var E=function(t){var h=(0,g.useState)(l(t.size)),M=(0,u.Z)(h,2),r=M[0],o=M[1],v=function(c){o(l(c))};return(0,g.useEffect)(function(){v(t.size)},[t.size]),(0,e.jsxs)(T.Z,{overlayClassName:"".concat(C().popover," ").concat(t.disLoc=="left"?C().popoverLeft:""),placement:t.disLoc||"right",content:(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(i.Z,{type:"text",onClick:function(){var c,D=l(r-1);v(D),(c=t.onChange)===null||c===void 0||c.call(0,D)},children:"-"}),(0,e.jsx)(A.Z,{min:m,max:d,value:r,onChange:function(c){var D;(D=t.onChange)===null||D===void 0||D.call(0,c)},controls:!1,style:{textAlign:"center"}}),(0,e.jsx)(i.Z,{type:"text",onClick:function(){var c,D=l(r+1);v(D),(c=t.onChange)===null||c===void 0||c.call(0,D)},children:"+"})]}),trigger:"hover",children:[" ",(0,e.jsx)(B.Z,{imgSrc:t.imgSrc,onClick:t.onClick,children:t.children})]})};b.Z=E},85871:function(y,b,n){"use strict";var p=n(71194),T=n(50146),S=n(49111),A=n(19650),W=n(57663),i=n(71577),u=n(13062),g=n(71230),B=n(89032),a=n(15746),C=n(77883),e=n(70507),m=n(34792),d=n(48086),O=n(9715),l=n(93766),E=n(2824),_=n(67294),t=n(48971),h=n(6277),M=n.n(h),r=n(85893),o=function(f){var c=(0,t.YB)(),D=(0,_.useState)(60),I=(0,E.Z)(D,2),L=I[0],U=I[1],X=(0,_.useState)(20),K=(0,E.Z)(X,2),Y=K[0],z=K[1],an=(0,_.useState)(20),Q=(0,E.Z)(an,2),J=Q[0],k=Q[1],rn=(0,_.useState)(!1),w=(0,E.Z)(rn,2),j=w[0],H=w[1],sn=(0,t.YB)().formatMessage({id:"pages.toolBar.divideData"}),q=(0,t.YB)().formatMessage({id:"component.PPDivideDataModal.train"}),$=(0,t.YB)().formatMessage({id:"component.PPDivideDataModal.validation"}),G=(0,t.YB)().formatMessage({id:"component.PPDivideDataModal.test"}),_n=(0,t.YB)().formatMessage({id:"component.PPCreater.cancel"}),nn=(0,t.YB)().formatMessage({id:"component.PPSegMode.ok"}),F=l.Z.useForm(),ln=(0,E.Z)(F,1),en=ln[0];return(0,r.jsx)(T.Z,{className:M().modal,title:sn,visible:f.visible,onCancel:f.onCancel,footer:null,children:(0,r.jsxs)(l.Z,{form:en,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(){if(L+Y+J!=100){d.default.error("Train, Validation and Test total percent should equal 100!");return}console.log("x trainData: ".concat(L,", validationData: ").concat(Y,", testData: ").concat(J,", props.project.curr.projectId: ").concat(f.project.curr.projectId)),H(!0),f.splitDataset(f.project.curr.projectId,{train:L*.01,validation:Y*.01,test:J*.01}).then(function(){var x;console.log("success"),d.default.success(c.formatMessage({id:"component.PPDivideDataModal.success"})),(x=f.onFinish)===null||x===void 0||x.call(0)}).finally(function(){H(!1)})},autoComplete:"off",layout:"vertical",children:[(0,r.jsxs)(g.Z,{children:[(0,r.jsx)(a.Z,{span:8,children:(0,r.jsx)(l.Z.Item,{label:q,name:"train",children:(0,r.jsx)(e.Z,{addonAfter:"%",defaultValue:60,precision:0,min:0,max:100,value:L,onChange:U})})}),(0,r.jsx)(a.Z,{span:8,children:(0,r.jsx)(l.Z.Item,{label:$,name:"validation",children:(0,r.jsx)(e.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:Y,onChange:z})})}),(0,r.jsx)(a.Z,{span:8,children:(0,r.jsx)(l.Z.Item,{label:G,name:"test",children:(0,r.jsx)(e.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:J,onChange:k})})})]}),(0,r.jsx)(l.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,r.jsxs)(A.Z,{children:[(0,r.jsx)(i.Z,{onClick:function(){var x;(x=f.onCancel)===null||x===void 0||x.call(0),en.resetFields()},children:_n}),(0,r.jsx)(i.Z,{type:"primary",htmlType:"submit",loading:j,children:nn})]})})]})})};b.Z=o},62850:function(y,b,n){"use strict";var p=n(71194),T=n(50146),S=n(49111),A=n(19650),W=n(57663),i=n(71577),u=n(47673),g=n(24044),B=n(34792),a=n(48086),C=n(9715),e=n(93766),m=n(2824),d=n(67294),O=n(48971),l=n(45092),E=n.n(l),_=n(85893),t=function(M){var r=(0,O.YB)(),o=(0,d.useState)(!1),v=(0,m.Z)(o,2),f=v[0],c=v[1],D=(0,O.YB)().formatMessage({id:"component.PPCreater.cancel"}),I=e.Z.useForm(),L=(0,m.Z)(I,1),U=L[0];return(0,_.jsx)(T.Z,{className:E().modal,title:(0,O.YB)().formatMessage({id:"component.PPExportModal.title"}),visible:M.visible,onCancel:M.onCancel,footer:null,children:(0,_.jsxs)(e.Z,{form:U,name:"basic",labelCol:{span:6},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(K){console.log(K);var Y=K.path;if(!Y){a.default.error(r.formatMessage({id:"component.PPExportModal.pathNotNull"}));return}c(!0),M.exportDataset(M.project.curr.projectId,Y).then(function(){var z;a.default.success(r.formatMessage({id:"component.PPExportModal.exportSuccess"})),(z=M.onFinish)===null||z===void 0||z.call(0)}).finally(function(){c(!1)})},autoComplete:"off",children:[(0,_.jsx)(e.Z.Item,{label:r.formatMessage({id:"component.PPExportModal.path"}),name:"path",children:(0,_.jsx)(g.Z,{})}),(0,_.jsx)(e.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,_.jsxs)(A.Z,{children:[(0,_.jsx)(i.Z,{onClick:function(){var K;(K=M.onCancel)===null||K===void 0||K.call(0),U.resetFields()},children:D}),(0,_.jsx)(i.Z,{type:"primary",htmlType:"submit",loading:f,children:r.formatMessage({id:"component.PPExportModal.export"})})]})})]})})};b.Z=t},13931:function(y,b,n){"use strict";n.d(b,{Z:function(){return B}});var p=n(91220),T=n(11849),S=n(65031),A=n(85893);function W(a){var C=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);return C?{r:parseInt(C[1],16),g:parseInt(C[2],16),b:parseInt(C[3],16)}:null}function i(a,C){if(!(!a||!C))return{color:a,points:C}}function u(a,C,e,m,d,O,l){if(!a||!a.lines||!a.lines[0])return[(0,A.jsx)(A.Fragment,{})];var E=a.lines[0].points,_=a.lines[0].color,t=W(_);if(!t)return[(0,A.jsx)(A.Fragment,{})];var h=(l==null?void 0:l.annotationId)==a.annotationId,M=h?.5:.1,r=void 0,o=[];return E.forEach(function(v,f){if(!r){r=v;return}o.push((0,A.jsx)(S.Cd,{onMouseDown:function(){d=="mover"&&O(a)},draggable:d=="mover",onDragMove:function(D){console.log("Circle onDrageMove");var I=D.evt.offsetX/m,L=D.evt.offsetY/m;E[f-1]=I,E[f]=L;var U=(0,T.Z)((0,T.Z)({},a),{},{lines:[{color:_,points:E}]});C(U)},onMouseOver:function(){console.log("Circle onMouseOver"),d=="mover"&&(document.body.style.cursor="pointer")},onMouseOut:function(){console.log("Circle onMouseOut"),document.body.style.cursor="default"},x:r,y:v,radius:5,fill:_})),r=void 0}),[(0,A.jsxs)(S.ZA,{children:[(0,A.jsx)(S.x1,{onMouseOver:function(){d=="mover"&&(document.body.style.cursor="pointer")},onMouseOut:function(){document.body.style.cursor="default"},onClick:function(){d=="mover"&&O(a)},stroke:_,strokeWidth:2,globalCompositeOperation:"source-over",lineCap:"round",points:E,tension:0,closed:!0,fill:"rgba(".concat(t.r,", ").concat(t.g,", ").concat(t.b,", ").concat(M,")")}),o]},a.annotationId)]}function g(a){var C=0,e=(0,p.Z)(a),m;try{for(e.s();!(m=e.n()).done;){var d=m.value;!d||d.annotationId>C&&(C=d.annotationId)}}catch(O){e.e(O)}finally{e.f()}return C}function B(a){var C=function(l,E){var _,t=l.evt.offsetX/E,h=l.evt.offsetY/E,M=i((_=a.currentLabel)===null||_===void 0?void 0:_.color,[t,h]);!M||a.onAnnotationAdd({tool:"polygon",annotationId:g(a.annotations)+1,label:a.currentLabel,lines:[M]})},e=function(l,E){var _,t;if(!!a.currentAnnotation){var h=l.evt.offsetX/E,M=l.evt.offsetY/E,r=a.currentAnnotation.lines||[],o=i((_=a.currentLabel)===null||_===void 0?void 0:_.color,(t=r[0])===null||t===void 0?void 0:t.points.concat([h,M]));if(!!o){var v={tool:"polygon",annotationId:a.currentAnnotation.annotationId,label:a.currentAnnotation.label,lines:[o]};a.onAnnotationModify(v)}}},m=function(l,E){a.currentTool=="polygon"&&(a.currentAnnotation?e(l,E):C(l,E))},d=function(){a.currentTool=="polygon"&&a.onMouseUp()};return{onMouseDown:m,onMouseMove:function(){},onMouseUp:d,createElementsFunc:u}}},29919:function(y,b,n){"use strict";var p=n(67294),T=n(61541),S=n(85893),A=function(i){return(0,S.jsx)(T.Z,{active:i.active,imgSrc:i.imgSrc||"./pics/buttons/polygon.png",onClick:i.onClick,children:i.children})};b.Z=A},91861:function(y,b,n){"use strict";n.d(b,{Ad:function(){return T},k3:function(){return S},Vd:function(){return A},td:function(){return W}});var p=40;function T(){localStorage.removeItem("history"),S([])}function S(i){var u=localStorage.getItem("history"),g=u?JSON.parse(u):{index:-1,items:[]};if(JSON.stringify(g.items[g.index])!=JSON.stringify(i)){var B=g.index>p?g.index-p:0,a=g.items.splice(B,g.index==0?1:g.index+1);g.items=a.concat([i]),g.index<=p?g.index++:g.index=p+1,localStorage.setItem("history",JSON.stringify(g))}}function A(){var i=localStorage.getItem("history");if(!!i){var u=JSON.parse(i);if(!!u&&!(u.index>=u.items.length-1))return u.index++,localStorage.setItem("history",JSON.stringify(u)),u.items[u.index]}}function W(){var i=localStorage.getItem("history");if(!!i){var u=JSON.parse(i);if(!(!u||!u.index)&&!(u.index<=0))return u.index--,localStorage.setItem("history",JSON.stringify(u)),u.items[u.index]}}},86089:function(y,b,n){"use strict";n.r(b),n.d(b,{MOST_HISTORY_STEPS:function(){return v}});var p=n(91220),T=n(57663),S=n(71577),A=n(34669),W=n(54458),i=n(2824),u=n(67294),g=n(8088),B=n(61541),a=n(44434),C=n(58967),e=n(27992),m=n(5041),d=n(57436),O=n(14836),l=n(29919),E=n(43801),_=n(13931),t=n(48971),h=n(91861),M=n(85871),r=n(62850),o=n(85893),v=40,f=function(){var D=(0,u.useState)([]),I=(0,i.Z)(D,2),L=I[0],U=I[1],X=(0,u.useState)(!1),K=(0,i.Z)(X,2),Y=K[0],z=K[1],an=(0,u.useState)(!1),Q=(0,i.Z)(an,2),J=Q[0],k=Q[1],rn=(0,u.useState)(void 0),w=(0,i.Z)(rn,2),j=w[0],H=w[1],sn=(0,u.useState)(),q=(0,i.Z)(sn,2),$=q[0],G=q[1],_n=(0,u.useState)(),nn=(0,i.Z)(_n,2),F=nn[0],ln=nn[1],en=(0,u.useState)([]),tn=(0,i.Z)(en,2),x=tn[0],V=tn[1],Cn=(0,u.useState)(10),fn=(0,i.Z)(Cn,2),on=fn[0],Pn=fn[1],hn=(0,u.useState)(1),mn=(0,i.Z)(hn,2),un=mn[0],dn=mn[1],En=function(s){s||dn(1),s<.1||s>3?dn(1):dn(s)},R=function(s){ln(s),s!=null&&s.label&&G(s.label)};(0,u.useEffect)(function(){(0,h.Ad)()},[]);var cn=function(s){for(var Z=[],N=0;N<x.length;N++)x[N].annotationId==s.annotationId?Z.push(s):Z.push(x[N]);R(s),V(Z)},Mn=(0,E.Z)({currentLabel:$,brushSize:on,currentTool:j,annotations:x,currentAnnotation:F,onAnnotationAdd:function(s){var Z=x.concat([s]);V(Z),F||R(s)},onAnnotationModify:cn,onMouseUp:function(){(0,h.k3)({annos:x,currAnno:F})}}),Dn=(0,_.Z)({currentLabel:$,brushSize:on,currentTool:j,annotations:x,currentAnnotation:F,onAnnotationAdd:function(s){var Z=x.concat([s]);V(Z),F||R(s)},onAnnotationModify:cn,onMouseUp:function(){(0,h.k3)({annos:x,currAnno:F})}}),vn=j=="polygon"?Dn:Mn,Bn=(0,t.YB)().formatMessage({id:"pages.toolBar.polygon"}),An=(0,t.YB)().formatMessage({id:"pages.toolBar.brush"}),Ln=(0,t.YB)().formatMessage({id:"pages.toolBar.rubber"}),xn=(0,t.YB)().formatMessage({id:"pages.toolBar.zoomIn"}),bn=(0,t.YB)().formatMessage({id:"pages.toolBar.zoomOut"}),In=(0,t.YB)().formatMessage({id:"pages.toolBar.move"}),Tn=(0,t.YB)().formatMessage({id:"pages.toolBar.unDo"}),Sn=(0,t.YB)().formatMessage({id:"pages.toolBar.reDo"}),yn=(0,t.YB)().formatMessage({id:"pages.toolBar.save"}),pn=(0,t.YB)().formatMessage({id:"pages.toolBar.edit"}),Un=(0,t.YB)().formatMessage({id:"pages.toolBar.clearMark"}),Rn=(0,t.YB)().formatMessage({id:"pages.toolBar.interactor"}),Wn=(0,t.YB)().formatMessage({id:"pages.toolBar.segmentThreshold"}),jn=(0,t.YB)().formatMessage({id:"pages.toolBar.diaphaneity"}),Kn=(0,t.YB)().formatMessage({id:"pages.toolBar.visualRadius"}),Zn=(0,t.YB)().formatMessage({id:"pages.toolBar.determineOutline"}),Fn=(0,t.YB)().formatMessage({id:"pages.toolBar.divideData"}),Yn=(0,t.YB)().formatMessage({id:"pages.toolBar.export"});return(0,o.jsxs)(g.Z,{className:"segment",children:[(0,o.jsxs)(a.Z,{children:[(0,o.jsx)(l.Z,{active:j=="polygon",onClick:function(){H("polygon"),R(void 0)},children:Bn}),(0,o.jsx)(B.Z,{imgSrc:"./pics/buttons/edit.png",children:pn}),(0,o.jsx)(C.Z,{size:on,active:j=="brush",onClick:function(){j!="rubber"&&j!="brush"&&R(void 0),H("brush")},onChange:function(s){Pn(s)},children:An}),(0,o.jsx)(C.Z,{size:on,active:j=="rubber",onClick:function(){j!="rubber"&&j!="brush"&&R(void 0),H("rubber")},onChange:function(s){Pn(s)},imgSrc:"./pics/buttons/rubber.png",children:Ln}),(0,o.jsx)(B.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){En(un+.1)},children:xn}),(0,o.jsx)(B.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){En(un-.1)},children:bn}),(0,o.jsx)(B.Z,{imgSrc:"./pics/buttons/save.png",children:yn}),(0,o.jsx)(B.Z,{imgSrc:"./pics/buttons/move.png",onClick:function(){H("mover")},children:In}),(0,o.jsx)(B.Z,{imgSrc:"./pics/buttons/prev.png",onClick:function(){var s=(0,h.td)();s&&(V(s.annos),R(s.currAnno))},children:Tn}),(0,o.jsx)(B.Z,{imgSrc:"./pics/buttons/next.png",onClick:function(){var s=(0,h.Vd)();s&&(V(s.annos),R(s.currAnno))},children:Sn}),(0,o.jsx)(B.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:Un})]}),(0,o.jsxs)("div",{id:"dr",className:"mainStage",children:[(0,o.jsx)("div",{className:"draw",children:(0,o.jsx)(d.Z,{scale:un,annotations:x,currentTool:j,currentAnnotation:F,setCurrentAnnotation:R,onAnnotationModify:cn,onAnnotationModifyComplete:function(){(0,h.k3)({annos:x,currAnno:F})},onMouseDown:vn.onMouseDown,onMouseMove:vn.onMouseMove,onMouseUp:vn.onMouseUp,createPolygonFunc:Dn.createElementsFunc,createBrushFunc:Mn.createElementsFunc,imgSrc:void 0})}),(0,o.jsx)("div",{className:"pblock",children:(0,o.jsxs)("div",{className:"progress",children:[(0,o.jsx)(W.Z,{className:"progressBar",percent:10,status:"active",showInfo:!1})," ",(0,o.jsx)("span",{className:"progressDesc",children:"Current labeling 1 of 300. Already labeled 20."})]})}),(0,o.jsx)("div",{className:"prevTask",onClick:function(){!task.prevTask()||(R(void 0),V([]))}}),(0,o.jsx)("div",{className:"nextTask",onClick:function(){!task.nextTask()||(R(void 0),V([]))}})]}),(0,o.jsxs)(a.Z,{disLoc:"right",children:[(0,o.jsx)(B.Z,{imgSrc:"./pics/buttons/intelligent_interaction.png",children:Rn}),(0,o.jsx)(e.Z,{imgSrc:"./pics/buttons/threshold.png",disLoc:"left",children:Wn}),(0,o.jsx)(e.Z,{imgSrc:"./pics/buttons/alpha.png",disLoc:"left",children:jn}),(0,o.jsx)(e.Z,{imgSrc:"./pics/buttons/radius.png",disLoc:"left",children:Kn}),(0,o.jsx)(B.Z,{imgSrc:"./pics/buttons/data_division.png",onClick:function(){z(!0)},children:Fn}),(0,o.jsx)(B.Z,{imgSrc:"./pics/buttons/export.png",onClick:function(){k(!0)},children:Yn})]}),(0,o.jsxs)("div",{className:"rightSideBar",children:[(0,o.jsx)("div",{className:"determinOutline",children:(0,o.jsx)(S.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",block:!0,onClick:function(){R(void 0)},children:Zn})}),(0,o.jsx)(m.Z,{labels:L,activeIds:new Set([$]),onLabelSelect:function(s){G(s),R(void 0)},onLabelModify:function(){},onLabelDelete:function(s){var Z=[],N=(0,p.Z)(L),On;try{for(N.s();!(On=N.n()).done;){var gn=On.value;gn.labelId!=s.labelId&&Z.push(gn)}}catch(zn){N.e(zn)}finally{N.f()}U(Z),($==null?void 0:$.labelId)==s.labelId&&G(void 0)},onLabelAdd:function(s){L.push(s),U(L),G(s)}}),(0,o.jsx)(O.Z,{currAnnotation:F,annotations:x,onAnnotationSelect:function(s){s!=null&&s.delete||R(s)},onAnnotationAdd:function(){},onAnnotationModify:function(){},onAnnotationDelete:function(s){V(x.filter(function(Z){return Z.annotationId!=s.annotationId})),R(void 0)}})]}),(0,o.jsx)(M.Z,{visible:Y,onCancel:function(){z(!1)},onFinish:function(){z(!1)}}),(0,o.jsx)(r.Z,{visible:J,onCancel:function(){k(!1)},onFinish:function(){k(!1)}})]})};b.default=f}}]);
