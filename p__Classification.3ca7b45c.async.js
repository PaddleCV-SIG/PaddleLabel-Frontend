(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[672],{41435:function(v,l,e){"use strict";e.d(l,{Z:function(){return C}});var r=e(94663),B=e(80112);function j(h){return Function.toString.call(h).indexOf("[native code]")!==-1}var Z=e(18597);function T(h,i,A){return(0,Z.Z)()?T=Reflect.construct:T=function(p,E,d){var M=[null];M.push.apply(M,E);var x=Function.bind.apply(p,M),c=new x;return d&&(0,B.Z)(c,d.prototype),c},T.apply(null,arguments)}function C(h){var i=typeof Map=="function"?new Map:void 0;return C=function(o){if(o===null||!j(o))return o;if(typeof o!="function")throw new TypeError("Super expression must either be null or a function");if(typeof i!="undefined"){if(i.has(o))return i.get(o);i.set(o,p)}function p(){return T(o,arguments,(0,r.Z)(this).constructor)}return p.prototype=Object.create(o.prototype,{constructor:{value:p,enumerable:!1,writable:!0,configurable:!0}}),(0,B.Z)(p,o)},C(h)}},6277:function(v){v.exports={modal:"modal___26yNn"}},45092:function(v){v.exports={modal:"modal___1H_FQ"}},73199:function(){},85871:function(v,l,e){"use strict";var r=e(71194),B=e(50146),j=e(49111),Z=e(19650),T=e(57663),C=e(71577),h=e(13062),i=e(71230),A=e(89032),o=e(15746),p=e(77883),E=e(70507),d=e(34792),M=e(48086),x=e(9715),c=e(93766),I=e(2824),n=e(67294),D=e(48971),Y=e(6277),t=e.n(Y),a=e(85893),V=function(f){var _=(0,D.YB)(),U=(0,n.useState)(60),R=(0,I.Z)(U,2),g=R[0],W=R[1],O=(0,n.useState)(20),m=(0,I.Z)(O,2),u=m[0],P=m[1],Q=(0,n.useState)(20),$=(0,I.Z)(Q,2),y=$[0],z=$[1],G=(0,n.useState)(!1),S=(0,I.Z)(G,2),J=S[0],F=S[1],X=(0,D.YB)().formatMessage({id:"pages.toolBar.divideData"}),N=(0,D.YB)().formatMessage({id:"component.PPDivideDataModal.train"}),k=(0,D.YB)().formatMessage({id:"component.PPDivideDataModal.validation"}),w=(0,D.YB)().formatMessage({id:"component.PPDivideDataModal.test"}),q=(0,D.YB)().formatMessage({id:"component.PPCreater.cancel"}),ee=(0,D.YB)().formatMessage({id:"component.PPSegMode.ok"}),te=c.Z.useForm(),ae=(0,I.Z)(te,1),H=ae[0];return(0,a.jsx)(B.Z,{className:t().modal,title:X,visible:f.visible,onCancel:f.onCancel,footer:null,children:(0,a.jsxs)(c.Z,{form:H,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(){if(g+u+y!=100){M.default.error("Train, Validation and Test total percent should equal 100!");return}console.log("x trainData: ".concat(g,", validationData: ").concat(u,", testData: ").concat(y,", props.project.curr.projectId: ").concat(f.project.curr.projectId)),F(!0),f.splitDataset(f.project.curr.projectId,{train:g*.01,validation:u*.01,test:y*.01}).then(function(){var L;console.log("success"),M.default.success(_.formatMessage({id:"component.PPDivideDataModal.success"})),(L=f.onFinish)===null||L===void 0||L.call(0)}).finally(function(){F(!1)})},autoComplete:"off",layout:"vertical",children:[(0,a.jsxs)(i.Z,{children:[(0,a.jsx)(o.Z,{span:8,children:(0,a.jsx)(c.Z.Item,{label:N,name:"train",children:(0,a.jsx)(E.Z,{addonAfter:"%",defaultValue:60,precision:0,min:0,max:100,value:g,onChange:W})})}),(0,a.jsx)(o.Z,{span:8,children:(0,a.jsx)(c.Z.Item,{label:k,name:"validation",children:(0,a.jsx)(E.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:u,onChange:P})})}),(0,a.jsx)(o.Z,{span:8,children:(0,a.jsx)(c.Z.Item,{label:w,name:"test",children:(0,a.jsx)(E.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:y,onChange:z})})})]}),(0,a.jsx)(c.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,a.jsxs)(Z.Z,{children:[(0,a.jsx)(C.Z,{onClick:function(){var L;(L=f.onCancel)===null||L===void 0||L.call(0),H.resetFields()},children:q}),(0,a.jsx)(C.Z,{type:"primary",htmlType:"submit",loading:J,children:ee})]})})]})})};l.Z=V},62850:function(v,l,e){"use strict";var r=e(71194),B=e(50146),j=e(49111),Z=e(19650),T=e(57663),C=e(71577),h=e(47673),i=e(24044),A=e(34792),o=e(48086),p=e(9715),E=e(93766),d=e(2824),M=e(67294),x=e(48971),c=e(45092),I=e.n(c),n=e(85893),D=function(t){var a=(0,x.YB)(),V=(0,M.useState)(!1),K=(0,d.Z)(V,2),f=K[0],_=K[1],U=(0,x.YB)().formatMessage({id:"component.PPCreater.cancel"}),R=E.Z.useForm(),g=(0,d.Z)(R,1),W=g[0];return(0,n.jsx)(B.Z,{className:I().modal,title:(0,x.YB)().formatMessage({id:"component.PPExportModal.title"}),visible:t.visible,onCancel:t.onCancel,footer:null,children:(0,n.jsxs)(E.Z,{form:W,name:"basic",labelCol:{span:6},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(m){console.log(m);var u=m.path;if(!u){o.default.error(a.formatMessage({id:"component.PPExportModal.pathNotNull"}));return}_(!0),t.exportDataset(t.project.curr.projectId,u).then(function(){var P;o.default.success(a.formatMessage({id:"component.PPExportModal.exportSuccess"})),(P=t.onFinish)===null||P===void 0||P.call(0)}).finally(function(){_(!1)})},autoComplete:"off",children:[(0,n.jsx)(E.Z.Item,{label:a.formatMessage({id:"component.PPExportModal.path"}),name:"path",children:(0,n.jsx)(i.Z,{})}),(0,n.jsx)(E.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,n.jsxs)(Z.Z,{children:[(0,n.jsx)(C.Z,{onClick:function(){var m;(m=t.onCancel)===null||m===void 0||m.call(0),W.resetFields()},children:U}),(0,n.jsx)(C.Z,{type:"primary",htmlType:"submit",loading:f,children:a.formatMessage({id:"component.PPExportModal.export"})})]})})]})})};l.Z=D},29214:function(v,l,e){"use strict";e.r(l);var r=e(11849),B=e(20228),j=e(11382),Z=e(34669),T=e(54458),C=e(34792),h=e(48086),i=e(2824),A=e(67294),o=e(73199),p=e.n(o),E=e(8088),d=e(61541),M=e(44434),x=e(5041),c=e(57436),I=e(64322),n=e(48971),D=e(85871),Y=e(62850),t=e(85893),a=function(){var K,f=(0,I.$L)(A.useState,A.useEffect,{label:{oneHot:!1,postSetCurr:ne},tool:{defaultTool:"mover"},effectTrigger:{postTaskChange:L}}),_=(0,i.Z)(f,10),U=_[0],R=_[1],g=_[2],W=_[3],O=_[4],m=_[5],u=_[6],P=_[7],Q=_[8],$=_[9],y=(0,A.useState)(!1),z=(0,i.Z)(y,2),G=z[0],S=z[1],J=(0,A.useState)(!1),F=(0,i.Z)(J,2),X=F[0],N=F[1],k=(0,n.YB)().formatMessage({id:"pages.toolBar.zoomIn"}),w=(0,n.YB)().formatMessage({id:"pages.toolBar.zoomOut"}),q=(0,n.YB)().formatMessage({id:"pages.toolBar.move"}),ee=(0,n.YB)().formatMessage({id:"pages.toolBar.save"}),te=(0,n.YB)().formatMessage({id:"pages.toolBar.autoSave"}),ae=(0,n.YB)().formatMessage({id:"pages.toolBar.divideData"}),H=(0,n.YB)().formatMessage({id:"pages.toolBar.export"});function ne(s){if(P.isActive(s))W.create({taskId:O.curr.taskId,labelId:s.labelId,dataId:m.curr.dataId});else{var b=W.all.filter(function(oe){return oe.labelId==s.labelId})[0];W.remove(b.annotationId)}}function L(s,b){R.setCurr(!0),!(!s||!b)&&(P.initActive(b),R.setCurr(!1))}return(0,t.jsxs)(E.Z,{className:p().classes,children:[(0,t.jsxs)(M.Z,{children:[(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){g.change(.1)},children:k}),(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){g.change(-.1)},children:w}),(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/save.png",onClick:function(){h.default.success(te)},children:ee}),(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/move.png",active:U.curr=="mover",onClick:function(){U.setCurr("mover")},children:q})]}),(0,t.jsx)("div",{id:"dr",className:"mainStage",children:(0,t.jsxs)(j.Z,{tip:"loading",spinning:R.curr,children:[(0,t.jsx)("div",{className:"draw",children:(0,t.jsx)(c.Z,{scale:g.curr,currentTool:U.curr,setCurrentAnnotation:function(){},onAnnotationModify:function(){},onAnnotationModifyComplete:function(){},imgSrc:m.imgSrc})}),(0,t.jsx)("div",{className:"pblock",children:(0,t.jsxs)("div",{className:"progress",children:[(0,t.jsx)(T.Z,{className:"progressBar",percent:u.progress,status:"active",showInfo:!1})," ",(0,t.jsxs)("span",{className:"progressDesc",children:["Current labeling ",O.currIdx==null?1:O.currIdx+1," of"," ",(K=O.all)===null||K===void 0?void 0:K.length,". Already labeled ",O.finished(u.progress)||0,"."]})]})}),(0,t.jsx)("div",{className:"prevTask",onClick:O.prevTask}),(0,t.jsx)("div",{className:"nextTask",onClick:O.nextTask})]})}),(0,t.jsxs)(M.Z,{disLoc:"right",children:[(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/data_division.png",onClick:function(){S(!0)},children:ae}),(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/export.png",onClick:function(){N(!0)},children:H})]}),(0,t.jsx)("div",{className:"rightSideBar",children:(0,t.jsx)(x.Z,{labels:P.all,activeIds:P.activeIds,onLabelSelect:P.onSelect,onLabelAdd:function(b){return P.create((0,r.Z)((0,r.Z)({},b),{},{projectId:u.curr.projectId}))},onLabelDelete:P.remove,onLabelModify:function(){},hideColorPicker:!0,hideEye:!0})}),(0,t.jsx)(D.Z,{visible:G,splitDataset:Q,project:u,onCancel:function(){S(!1)},onFinish:function(){S(!1)}}),(0,t.jsx)(Y.Z,{visible:X,exportDataset:$,project:u,onCancel:function(){N(!1)},onFinish:function(){N(!1)}})]})};l.default=a},15746:function(v,l,e){"use strict";var r=e(21584);l.Z=r.Z},89032:function(v,l,e){"use strict";var r=e(38663),B=e.n(r),j=e(6999)},71230:function(v,l,e){"use strict";var r=e(92820);l.Z=r.Z},13062:function(v,l,e){"use strict";var r=e(38663),B=e.n(r),j=e(6999)}}]);
