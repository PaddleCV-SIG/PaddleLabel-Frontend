(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[991],{41180:function(A){A.exports={ppcard:"ppcard___27hGd",title:"title___22R8f"}},48627:function(A){A.exports={container:"container___2RXc3"}},26389:function(A){A.exports={modal:"modal___2gJ6d"}},21331:function(A){A.exports={modal:"modal___3tkEl"}},1041:function(A){A.exports={modal:"modal___2cw4O"}},31982:function(A,j,t){"use strict";var G=t(89032),D=t(15746),S=t(11849),U=t(13062),v=t(71230),N=t(11700),c=t(67294),F=t(41180),_=t.n(F),o=t(85893),i=function(g){return(0,o.jsxs)("div",{className:_().ppcard,style:g.style,hidden:g.hidden,children:[(0,o.jsx)(v.Z,{className:_().titleRow,style:{display:g.title?void 0:"none"},children:(0,o.jsx)(N.Z,{className:_().title,children:g.title})}),(0,o.jsx)(v.Z,{style:{marginTop:26},children:(0,o.jsx)(D.Z,{span:24,style:(0,S.Z)({paddingLeft:30,paddingRight:30,textAlign:"center"},g.innerStyle),children:g.children})})]})};j.Z=i},11428:function(A,j,t){"use strict";var G=t(67294),D=t(48627),S=t.n(D),U=t(85893),v=function(c){return(0,U.jsx)("div",{className:"".concat(S().container),style:{backgroundImage:"url(./pics/background.png)"},children:c.children})};j.Z=v},35261:function(A,j,t){"use strict";var G=t(71194),D=t(50146),S=t(49111),U=t(19650),v=t(47673),N=t(24044),c=t(34792),F=t(48086),_=t(57663),o=t(71577),i=t(9715),m=t(93766),g=t(2824),J=t(67294),V=t(48971),at=t(26389),z=t.n(at),nt=t(98731),E=t(85893),et=function(X){var r=(0,V.YB)(),$=(0,J.useState)(!1),b=(0,g.Z)($,2),P=b[0],a=b[1],w=(0,J.useState)(!1),W=(0,g.Z)(w,2),st=W[0],K=W[1],lt=r.formatMessage({id:"component.PPCreater.cancel"}),Y=m.Z.useForm(),rt=(0,g.Z)(Y,1),O=rt[0];return(0,E.jsxs)("span",{hidden:X.visible==!1,children:[(0,E.jsx)(o.Z,{type:"primary",onClick:function(){return K(!0)},children:"Export Dataset"}),(0,E.jsx)(D.Z,{className:z().modal,title:r.formatMessage({id:"component.PPExportModal.title"}),visible:st,onCancel:function(){return K(!1)},footer:null,children:(0,E.jsxs)(m.Z,{form:O,name:"basic",labelCol:{span:6},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(q){var H=q.path;if(!H){F.default.error(r.formatMessage({id:"component.PPExportModal.pathNotNull"}));return}a(!0),(0,nt.Tr)(X.project.projectId,H).then(function(){F.default.success(r.formatMessage({id:"component.PPExportModal.exportSuccess"})),K(!1)}).finally(function(){a(!1)})},autoComplete:"off",children:[(0,E.jsx)(m.Z.Item,{label:r.formatMessage({id:"component.PPExportModal.path"}),name:"path",children:(0,E.jsx)(N.Z,{})}),(0,E.jsx)(m.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,E.jsxs)(U.Z,{children:[(0,E.jsx)(o.Z,{onClick:function(){K(!1),O.resetFields()},children:lt}),(0,E.jsx)(o.Z,{type:"primary",htmlType:"submit",loading:P,children:r.formatMessage({id:"component.PPExportModal.export"})})]})})]})})]})};j.Z=et},50542:function(A,j,t){"use strict";t.r(j),t.d(j,{default:function(){return vt}});var G=t(8963),D=t(34441),S=t(86582),U=t(34792),v=t(48086),N=t(57663),c=t(71577),F=t(12968),_=t(62462),o=t(2824),i=t(67294),m=t(48971),g=t(11428),J=t(31982),V=t(35261),at=t(71194),z=t(50146),nt=t(49111),E=t(19650),et=t(47673),ot=t(24044),X=t(9715),r=t(93766),$=t(21331),b=t.n($),P=t(98731),a=t(85893),w=function(u){var d=(0,m.YB)(),x=(0,i.useState)(!1),I=(0,o.Z)(x,2),p=I[0],s=I[1],l=(0,i.useState)(!1),y=(0,o.Z)(l,2),Q=y[0],f=y[1],R=d.formatMessage({id:"component.PPCreater.cancel"}),T=r.Z.useForm(),h=(0,o.Z)(T,1),M=h[0];return(0,a.jsxs)("span",{hidden:u.visible==!1,children:[(0,a.jsx)(c.Z,{type:"primary",onClick:function(){return f(!0)},children:"Import Additional Data"}),(0,a.jsx)(z.Z,{className:b().modal,title:"Import Additional Data",visible:Q,footer:null,onCancel:function(){return f(!1)},children:(0,a.jsxs)(r.Z,{form:M,name:"basic",labelCol:{span:6},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(L){var n=L.path;if(!n){v.default.error(d.formatMessage({id:"component.PPExportModal.pathNotNull"}));return}s(!0),(0,P.Nu)(u.project.projectId,n).then(function(){f(!1),u.onFinish()}).finally(function(){s(!1)})},autoComplete:"off",children:[(0,a.jsx)(r.Z.Item,{label:"Dataset Path",name:"path",children:(0,a.jsx)(ot.Z,{})}),(0,a.jsx)(r.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,a.jsxs)(E.Z,{children:[(0,a.jsx)(c.Z,{onClick:function(){f(!1),M.resetFields()},children:R}),(0,a.jsx)(c.Z,{type:"primary",htmlType:"submit",loading:p,children:"Import"})]})})]})})]})},W=w,st=t(13062),K=t(71230),lt=t(89032),Y=t(15746),rt=t(77883),O=t(70507),k=t(1041),q=t.n(k),H=function(u){var d=(0,m.YB)(),x=(0,i.useState)(!1),I=(0,o.Z)(x,2),p=I[0],s=I[1],l=(0,i.useState)(60),y=(0,o.Z)(l,2),Q=y[0],f=y[1],R=(0,i.useState)(20),T=(0,o.Z)(R,2),h=T[0],M=T[1],Z=(0,i.useState)(20),L=(0,o.Z)(Z,2),n=L[0],e=L[1],C=(0,i.useState)(!1),B=(0,o.Z)(C,2),dt=B[0],At=B[1],Pt=d.formatMessage({id:"pages.toolBar.divideData"}),ft=d.formatMessage({id:"component.PPDivideDataModal.train"}),ht=d.formatMessage({id:"component.PPDivideDataModal.validation"}),Ct=d.formatMessage({id:"component.PPDivideDataModal.test"}),It=d.formatMessage({id:"component.PPCreater.cancel"}),Qt=d.formatMessage({id:"component.PPSegMode.ok"}),jt=r.Z.useForm(),Mt=(0,o.Z)(jt,1),ct=Mt[0];return(0,a.jsxs)("span",{hidden:u.visible==!1,children:[(0,a.jsx)(c.Z,{type:"primary",onClick:function(){return s(!0)},children:"Split Dataset"}),(0,a.jsx)(z.Z,{className:q().modal,title:Pt,visible:p,onCancel:function(){return s(!1)},footer:null,children:(0,a.jsxs)(r.Z,{form:ct,name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(){if(Q+h+n!=100){v.default.error("Train, Validation and Test percent should sum up to 100!");return}console.log("x trainData: ".concat(Q,", validationData: ").concat(h,", testData: ").concat(n,", props.project.curr.projectId: ").concat(u.project.projectId)),At(!0),(0,P.FX)(u.project.projectId,{train:Q*.01,val:h*.01,test:n*.01}).then(function(){v.default.success(d.formatMessage({id:"component.PPDivideDataModal.success"})),s(!1)}).finally(function(){u.onFinish&&u.onFinish(),At(!1)})},autoComplete:"off",layout:"vertical",children:[(0,a.jsxs)(K.Z,{children:[(0,a.jsx)(Y.Z,{span:8,children:(0,a.jsx)(r.Z.Item,{label:ft,name:"train",children:(0,a.jsx)(O.Z,{addonAfter:"%",defaultValue:60,precision:0,min:0,max:100,value:Q,onChange:f})})}),(0,a.jsx)(Y.Z,{span:8,children:(0,a.jsx)(r.Z.Item,{label:ht,name:"validation",children:(0,a.jsx)(O.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:h,onChange:M})})}),(0,a.jsx)(Y.Z,{span:8,children:(0,a.jsx)(r.Z.Item,{label:Ct,name:"test",children:(0,a.jsx)(O.Z,{addonAfter:"%",defaultValue:20,precision:0,min:0,max:100,value:n,onChange:e})})})]}),(0,a.jsx)(r.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,a.jsxs)(E.Z,{children:[(0,a.jsx)(c.Z,{onClick:function(){s(!1),ct.resetFields()},children:It}),(0,a.jsx)(c.Z,{type:"primary",htmlType:"submit",loading:dt,children:Qt})]})})]})})]})},Et=H,ut=t(37071),mt="data:image/png;base64,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",gt=function(){var u,d,x,I,p,s=(0,P.iA)(i.useState),l=(0,P.Gd)(i.useState),y=(0,i.useState)(0),Q=(0,o.Z)(y,2),f=Q[0],R=Q[1],T={"0":"train","1":"validation","2":"test"},h=localStorage.getItem("basePath"),M=ut.Z.getQueryVariable("projectId"),Z=function(e,C,B,dt){localStorage.setItem("orderBy",B.field+" "+B.order)},L=[{title:"ID",dataIndex:"taskId",key:"taskId",width:"25%",align:"center",render:function(e){return(0,a.jsx)(a.Fragment,{children:e})},sorter:function(e,C){return e.taskId-C.taskId}},{title:"Annotation Count",dataIndex:"annotations",key:"taskId",width:"25%",align:"center",render:function(e){return(0,a.jsx)(a.Fragment,{children:e.length})},sorter:function(e,C){return e.annotations.length-C.annotations.length}},{title:"Set",dataIndex:"set",key:"taskId",width:"25%",align:"center",render:function(e){return(0,a.jsx)(a.Fragment,{children:T[e]})},sorter:function(e,C){return e.set-C.set}},{title:"Image",dataIndex:"dataPaths",key:"taskId",width:"25%",align:"center",render:function(e){return(0,a.jsx)(_.Z,{src:"".concat(h).concat(e[0]),height:40,onError:function(B){B.target.src=mt,setTimeout(function(){B.target.src="".concat(h).concat(e[0],"reload"),console.log("".concat(h).concat(e[0]," reload"))},1e3)}})}},{dataIndex:"taskId",key:"taskId",align:"center",render:function(e){return(0,a.jsx)(c.Z,{type:"primary",onClick:function(){localStorage.setItem("currTaskId",e),m.m8.push("/".concat((0,P.LV)(l.curr.taskCategory.name),"?projectId=").concat(l.curr.projectId))},children:"Label"})}}];return(0,i.useEffect)(function(){l.getCurr(M),s.getAll(M).then(function(n){console.log("tasks",n)})},[]),M||(v.default.error("No valid project id"),m.m8.push("/")),(0,a.jsxs)(g.Z,{children:[(0,a.jsxs)(J.Z,{children:[(0,a.jsx)(c.Z,{type:"primary",onClick:function(){m.m8.push("/".concat((0,P.LV)(l.curr.taskCategory.name),"?projectId=").concat(l.curr.projectId))},hidden:((u=s.all)===null||u===void 0?void 0:u.length)==0,children:"Label"}),(0,a.jsx)(c.Z,{type:"primary",onClick:function(){console.log("project",l.curr),m.m8.push("/project_detail?taskCategory=".concat((0,P.os)(l.curr.taskCategory.name),"&projectId=").concat(l.curr.projectId))},children:"Project Detail"}),(0,a.jsx)(Et,{project:l.curr,visible:((d=s.all)===null||d===void 0?void 0:d.length)!=0,onFinish:function(){return s.getAll(l.curr.projectId)}}),(0,a.jsx)(V.Z,{project:l.curr,visible:((x=s.all)===null||x===void 0?void 0:x.length)!=0}),(0,a.jsx)(W,{project:l.curr,onFinish:function(){s.getAll(l.curr.projectId),R(f+1)},visible:((I=s.all)===null||I===void 0?void 0:I.length)!=0})]}),(0,a.jsxs)(J.Z,{title:"Tasks",children:[(0,a.jsx)("p",{children:"Task Count: ".concat((p=s.all)===null||p===void 0?void 0:p.length,` 
`)}),function(){var n;return((n=s.all)===null||n===void 0?void 0:n.length)==0?(0,a.jsx)(W,{project:l.curr,onFinish:function(){s.getAll(l.curr.projectId),R(f+1)}}):(0,a.jsxs)("span",{id:f,children:[(0,a.jsx)(D.Z,{columns:L,dataSource:(0,S.Z)((0,P.gu)(s.all)),onChange:Z})," "]})}()]})]})},vt=gt}}]);
