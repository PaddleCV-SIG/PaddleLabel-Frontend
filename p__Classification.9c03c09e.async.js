(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[672],{41435:function(v,l,e){"use strict";e.d(l,{Z:function(){return C}});var r=e(94663),I=e(80112);function W(T){return Function.toString.call(T).indexOf("[native code]")!==-1}var U=e(18597);function L(T,i,h){return(0,U.Z)()?L=Reflect.construct:L=function(p,E,d){var M=[null];M.push.apply(M,E);var A=Function.bind.apply(p,M),c=new A;return d&&(0,I.Z)(c,d.prototype),c},L.apply(null,arguments)}function C(T){var i=typeof Map=="function"?new Map:void 0;return C=function(o){if(o===null||!W(o))return o;if(typeof o!="function")throw new TypeError("Super expression must either be null or a function");if(typeof i!="undefined"){if(i.has(o))return i.get(o);i.set(o,p)}function p(){return L(o,arguments,(0,r.Z)(this).constructor)}return p.prototype=Object.create(o.prototype,{constructor:{value:p,enumerable:!1,writable:!0,configurable:!0}}),(0,I.Z)(p,o)},C(T)}},6277:function(v){v.exports={modal:"modal___26yNn"}},45092:function(v){v.exports={modal:"modal___1H_FQ"}},73199:function(){},85871:function(v,l,e){"use strict";var r=e(71194),I=e(50146),W=e(49111),U=e(19650),L=e(57663),C=e(71577),T=e(13062),i=e(71230),h=e(89032),o=e(15746),p=e(77883),E=e(70507),d=e(34792),M=e(48086),A=e(9715),c=e(93766),B=e(2824),s=e(67294),D=e(48971),N=e(6277),t=e.n(N),a=e(85893),Y=function(f){var _=(0,D.YB)(),K=(0,s.useState)(60),x=(0,B.Z)(K,2),g=x[0],R=x[1],O=(0,s.useState)(20),m=(0,B.Z)(O,2),u=m[0],P=m[1],H=(0,s.useState)(20),V=(0,B.Z)(H,2),Z=V[0],$=V[1],Q=(0,s.useState)(!1),y=(0,B.Z)(Q,2),G=y[0],b=y[1],J=(0,D.YB)().formatMessage({id:"pages.toolBar.divideData"}),F=(0,D.YB)().formatMessage({id:"component.PPDivideDataModal.train"}),X=(0,D.YB)().formatMessage({id:"component.PPDivideDataModal.validation"}),k=(0,D.YB)().formatMessage({id:"component.PPDivideDataModal.test"}),w=(0,D.YB)().formatMessage({id:"component.PPCreater.cancel"}),q=(0,D.YB)().formatMessage({id:"component.PPSegMode.ok"}),ee=c.Z.useForm(),te=(0,B.Z)(ee,1),z=te[0];return(0,a.jsx)(I.Z,{className:t().modal,title:J,visible:f.visible,onCancel:f.onCancel,footer:null,children:(0,a.jsxs)(c.Z,{form:z,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(){if(g+u+Z!=100){M.default.error("Train, Validation and Test total percent should equal 100!");return}console.log("x trainData: ".concat(g,", validationData: ").concat(u,", testData: ").concat(Z,", props.project.curr.projectId: ").concat(f.project.curr.projectId)),b(!0),f.splitDataset(f.project.curr.projectId,{train:g*.01,validation:u*.01,test:Z*.01}).then(function(){var n;console.log("success"),M.default.success(_.formatMessage({id:"component.PPDivideDataModal.success"})),(n=f.onFinish)===null||n===void 0||n.call(0)}).finally(function(){b(!1)})},autoComplete:"off",layout:"vertical",children:[(0,a.jsxs)(i.Z,{children:[(0,a.jsx)(o.Z,{span:8,children:(0,a.jsx)(c.Z.Item,{label:F,name:"train",children:(0,a.jsx)(E.Z,{addonAfter:"%",defaultValue:60,precision:0,min:0,max:100,value:g,onChange:R})})}),(0,a.jsx)(o.Z,{span:8,children:(0,a.jsx)(c.Z.Item,{label:X,name:"validation",children:(0,a.jsx)(E.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:u,onChange:P})})}),(0,a.jsx)(o.Z,{span:8,children:(0,a.jsx)(c.Z.Item,{label:k,name:"test",children:(0,a.jsx)(E.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:Z,onChange:$})})})]}),(0,a.jsx)(c.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,a.jsxs)(U.Z,{children:[(0,a.jsx)(C.Z,{onClick:function(){var n;(n=f.onCancel)===null||n===void 0||n.call(0),z.resetFields()},children:w}),(0,a.jsx)(C.Z,{type:"primary",htmlType:"submit",loading:G,children:q})]})})]})})};l.Z=Y},62850:function(v,l,e){"use strict";var r=e(71194),I=e(50146),W=e(49111),U=e(19650),L=e(57663),C=e(71577),T=e(47673),i=e(24044),h=e(34792),o=e(48086),p=e(9715),E=e(93766),d=e(2824),M=e(67294),A=e(48971),c=e(45092),B=e.n(c),s=e(85893),D=function(t){var a=(0,A.YB)(),Y=(0,M.useState)(!1),j=(0,d.Z)(Y,2),f=j[0],_=j[1],K=(0,A.YB)().formatMessage({id:"component.PPCreater.cancel"}),x=E.Z.useForm(),g=(0,d.Z)(x,1),R=g[0];return(0,s.jsx)(I.Z,{className:B().modal,title:(0,A.YB)().formatMessage({id:"component.PPExportModal.title"}),visible:t.visible,onCancel:t.onCancel,footer:null,children:(0,s.jsxs)(E.Z,{form:R,name:"basic",labelCol:{span:6},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(m){console.log(m);var u=m.path;if(!u){o.default.error(a.formatMessage({id:"component.PPExportModal.pathNotNull"}));return}_(!0),t.exportDataset(t.project.curr.projectId,u).then(function(){var P;o.default.success(a.formatMessage({id:"component.PPExportModal.exportSuccess"})),(P=t.onFinish)===null||P===void 0||P.call(0)}).finally(function(){_(!1)})},autoComplete:"off",children:[(0,s.jsx)(E.Z.Item,{label:a.formatMessage({id:"component.PPExportModal.path"}),name:"path",children:(0,s.jsx)(i.Z,{})}),(0,s.jsx)(E.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,s.jsxs)(U.Z,{children:[(0,s.jsx)(C.Z,{onClick:function(){var m;(m=t.onCancel)===null||m===void 0||m.call(0),R.resetFields()},children:K}),(0,s.jsx)(C.Z,{type:"primary",htmlType:"submit",loading:f,children:a.formatMessage({id:"component.PPExportModal.export"})})]})})]})})};l.Z=D},29214:function(v,l,e){"use strict";e.r(l);var r=e(11849),I=e(20228),W=e(11382),U=e(34669),L=e(54458),C=e(34792),T=e(48086),i=e(2824),h=e(67294),o=e(73199),p=e.n(o),E=e(8088),d=e(61541),M=e(44434),A=e(5041),c=e(57436),B=e(64322),s=e(48971),D=e(85871),N=e(62850),t=e(85893),a=function(){var j,f=(0,B.$L)(h.useState,h.useEffect,{label:{oneHot:!1,postSetCurr:z},tool:{defaultTool:"mover"},effectTrigger:{postTaskChange:ne}}),_=(0,i.Z)(f,10),K=_[0],x=_[1],g=_[2],R=_[3],O=_[4],m=_[5],u=_[6],P=_[7],H=_[8],V=_[9],Z=(0,h.useState)(!1),$=(0,i.Z)(Z,2),Q=$[0],y=$[1],G=(0,h.useState)(!1),b=(0,i.Z)(G,2),J=b[0],F=b[1],X=(0,s.YB)().formatMessage({id:"pages.toolBar.zoomIn"}),k=(0,s.YB)().formatMessage({id:"pages.toolBar.zoomOut"}),w=(0,s.YB)().formatMessage({id:"pages.toolBar.move"}),q=(0,s.YB)().formatMessage({id:"pages.toolBar.save"}),ee=(0,s.YB)().formatMessage({id:"pages.toolBar.divideData"}),te=(0,s.YB)().formatMessage({id:"pages.toolBar.export"});function z(n){if(P.isActive(n))R.create({taskId:O.curr.taskId,labelId:n.labelId,dataId:m.curr.dataId});else{var S=R.all.filter(function(ae){return ae.labelId==n.labelId})[0];R.remove(S.annotationId)}}function ne(n,S){x.setCurr(!0),!(!n||!S)&&(P.initActive(S),x.setCurr(!1))}return(0,t.jsxs)(E.Z,{className:p().classes,children:[(0,t.jsxs)(M.Z,{children:[(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/zoom_in.png",onClick:function(){g.change(.1)},children:X}),(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/zoom_out.png",onClick:function(){g.change(-.1)},children:k}),(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/save.png",onClick:function(){T.default.success("Save Success")},children:q}),(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/move.png",active:K.curr=="mover",onClick:function(){K.setCurr("mover")},children:w})]}),(0,t.jsx)("div",{id:"dr",className:"mainStage",children:(0,t.jsxs)(W.Z,{tip:"loading",spinning:x.curr,children:[(0,t.jsx)("div",{className:"draw",children:(0,t.jsx)(c.Z,{scale:g.curr,currentTool:K.curr,setCurrentAnnotation:function(){},onAnnotationModify:function(){},onAnnotationModifyComplete:function(){},imgSrc:m.imgSrc})}),(0,t.jsx)("div",{className:"pblock",children:(0,t.jsxs)("div",{className:"progress",children:[(0,t.jsx)(L.Z,{className:"progressBar",percent:u.progress,status:"active",showInfo:!1})," ",(0,t.jsxs)("span",{className:"progressDesc",children:["Current labeling ",O.currIdx==null?1:O.currIdx+1," of"," ",(j=O.all)===null||j===void 0?void 0:j.length,". Already labeled ",O.finished(u.progress)||0,"."]})]})}),(0,t.jsx)("div",{className:"prevTask",onClick:O.prevTask}),(0,t.jsx)("div",{className:"nextTask",onClick:O.nextTask})]})}),(0,t.jsxs)(M.Z,{disLoc:"right",children:[(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/data_division.png",onClick:function(){y(!0)},children:ee}),(0,t.jsx)(d.Z,{imgSrc:"./pics/buttons/export.png",onClick:function(){F(!0)},children:te})]}),(0,t.jsx)("div",{className:"rightSideBar",children:(0,t.jsx)(A.Z,{labels:P.all,activeIds:P.activeIds,onLabelSelect:P.onSelect,onLabelAdd:function(S){return P.create((0,r.Z)((0,r.Z)({},S),{},{projectId:u.curr.projectId}))},onLabelDelete:P.remove,onLabelModify:function(){},hideColorPicker:!0,hideEye:!0})}),(0,t.jsx)(D.Z,{visible:Q,splitDataset:H,project:u,onCancel:function(){y(!1)},onFinish:function(){y(!1)}}),(0,t.jsx)(N.Z,{visible:J,exportDataset:V,project:u,onCancel:function(){F(!1)},onFinish:function(){F(!1)}})]})};l.default=a},15746:function(v,l,e){"use strict";var r=e(21584);l.Z=r.Z},89032:function(v,l,e){"use strict";var r=e(38663),I=e.n(r),W=e(6999)},71230:function(v,l,e){"use strict";var r=e(92820);l.Z=r.Z},13062:function(v,l,e){"use strict";var r=e(38663),I=e.n(r),W=e(6999)}}]);
