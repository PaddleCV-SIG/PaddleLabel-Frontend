(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[275],{88769:function(d){d.exports={createBtn:"createBtn___L_oKa"}},41180:function(d){d.exports={ppcard:"ppcard___27hGd",title:"title___22R8f"}},9238:function(d){d.exports={button:"button___3gM4r"}},70362:function(d){d.exports={card:"card___CFZWU",thumbnail:"thumbnail___1gIPM",button:"button___g0lkO"}},17969:function(d){d.exports={col:"col___yKN-b"}},24141:function(d){d.exports={pagination:"pagination___1KJhU",pageSizeSelector:"pageSizeSelector___2XZ11"}},75534:function(d){d.exports={table:"table___BHQO2"}},31982:function(d,Z,e){"use strict";var p=e(89032),o=e(15746),T=e(11849),j=e(13062),E=e(71230),r=e(11700),B=e(67294),O=e(41180),_=e.n(O),s=e(85893),M=function(m){return(0,s.jsxs)("div",{className:_().ppcard,style:m.style,children:[(0,s.jsx)(E.Z,{className:_().titleRow,style:{display:m.title?void 0:"none"},children:(0,s.jsx)(r.Z,{className:_().title,children:m.title})}),(0,s.jsx)(E.Z,{style:{marginTop:26},children:(0,s.jsx)(o.Z,{span:24,style:(0,T.Z)({paddingLeft:30,paddingRight:30,textAlign:"center"},m.innerStyle),children:m.children})})]})};Z.Z=M},40318:function(d,Z,e){"use strict";var p=e(57663),o=e(71577),T=e(48971),j=e(67294),E=e(70362),r=e.n(E),B=e(85893),O=function(s){return(0,B.jsxs)("div",{className:r().card,style:{height:s.height,width:s.width},onClick:function(){return T.m8.push(s.href?s.href:"")},children:[(0,B.jsx)("img",{className:r().thumbnail,alt:s.wording||r().thumbnail,src:s.imgSrc,style:{height:s.height,width:s.width}}),(0,B.jsx)(o.Z,{className:r().button,style:{width:s.width},children:s.children})]})};Z.Z=O},52940:function(d,Z,e){"use strict";var p=e(11849),o=e(89032),T=e(15746),j=e(2824),E=e(67294),r=e(17969),B=e.n(r),O=e(85893),_=function(M){var R=(0,E.useState)(!1),m=(0,j.Z)(R,2),C=m[0],x=m[1];return(0,O.jsx)(T.Z,(0,p.Z)((0,p.Z)({},M),{},{className:"".concat(B().col," ").concat(M.className),style:{zIndex:C?11:10,width:"100%"},onMouseOver:function(){x(!0)},onMouseLeave:function(){x(!1)},children:M.children}))};Z.Z=_},3275:function(d,Z,e){"use strict";e.r(Z),e.d(Z,{PROJECT_INFO_KEY:function(){return k},default:function(){return xe},refreshProject:function(){return je}});var p=e(57663),o=e(71577),T=e(13062),j=e(71230),E=e(89032),r=e(15746),B=e(49111),O=e(19650),_=e(2824),s=e(34792),M=e(48086),R=e(3182),m=e(94043),C=e.n(m),x=e(67294),H=e(11428),S=e(40318),W=e(31982),D=e(11849),ae=e(8963),b=e(34441),re=e(75534),J=e.n(re),le=e(14781),Q=e(40308),l=e(43358),u=e(34041),a=e(48971),v=e(24141),i=e.n(v),t=e(85893),K=u.Z.Option;function V(y){var n=y.formatMessage({id:"component.PPTable.prev",defaultMessage:"Previous"}),h=y.formatMessage({id:"component.PPTable.next",defaultMessage:"Next"});return function(P,g,f){return g==="prev"?(0,t.jsx)(o.Z,{children:n}):g==="next"?(0,t.jsx)(o.Z,{children:h}):f}}var se=function(n){var h=n.totalNum,P=(0,x.useState)(n.pageSize||10),g=(0,_.Z)(P,2),f=g[0],L=g[1],c=(0,x.useState)(n.currentPage||1),A=(0,_.Z)(c,2),U=A[0],$=A[1];return(0,t.jsx)("div",{className:"".concat(i().pagination),children:(0,t.jsxs)(O.Z,{align:"center",children:[(0,a.YB)().formatMessage({id:"component.PPTable.pageTotal"},{total:h,show:(0,t.jsxs)(u.Z,{value:f+"",className:i().pageSizeSelector,onChange:function(I){L(parseInt(I)),n.onChange&&n.onChange(U,parseInt(I))},children:[(0,t.jsx)(K,{value:"10",children:"10"}),(0,t.jsx)(K,{value:"20",children:"20"}),(0,t.jsx)(K,{value:"30",children:"30"}),(0,t.jsx)(K,{value:"40",children:"40"}),(0,t.jsx)(K,{value:"50",children:"50"})]})}),(0,t.jsx)(Q.Z,{className:i().pagination,current:U,pageSize:f,total:h,itemRender:V((0,a.YB)()),onChange:function(I,z){console.log("Pagination: ".concat(z,"/").concat(I)),$(I),n.onChange&&n.onChange(I,z)}})]})})},ie=se,ce=function(n){var h,P=((h=n.dataSource)===null||h===void 0?void 0:h.length)||0,g=(0,x.useState)(10),f=(0,_.Z)(g,2),L=f[0],c=f[1],A=(0,x.useState)(1),U=(0,_.Z)(A,2),$=U[0],Y=U[1],I=n.dataSource,z=[];if(n.dataSource){var q,ee,N=L*($-1),G=L;N+L>P&&(G=P-N+1),I=(q=n.dataSource)===null||q===void 0?void 0:q.slice(N,N+G/2),z=(ee=n.dataSource)===null||ee===void 0?void 0:ee.slice(N+G/2,N+G)}return(0,t.jsxs)("div",{className:"".concat(J().table),children:[(0,t.jsxs)(j.Z,{children:[(0,t.jsx)(r.Z,{span:12,style:{borderRight:"0.063rem solid rgba(151,151,151,0.27)"},children:(0,t.jsx)(b.Z,(0,D.Z)((0,D.Z)({},n),{},{dataSource:I,pagination:!1,rowSelection:void 0}))}),(0,t.jsx)(r.Z,{span:12,children:(0,t.jsx)(b.Z,(0,D.Z)((0,D.Z)({},n),{},{dataSource:z,pagination:!1,rowSelection:void 0}))})]}),(0,t.jsx)(j.Z,{style:{marginTop:"1.75rem"},children:(0,t.jsx)(r.Z,{span:24,children:(0,t.jsx)(O.Z,{align:"center",children:(0,t.jsx)(ie,{totalNum:P,pageSize:L,currentPage:$,onChange:function(te,ne){c(ne),(te-1)*ne>P?Y(1):Y(te),n.onChange&&n.onChange(te,ne)}})})})})]})},de=ce,ue=e(9238),he=e.n(ue),Pe=function(n){return(0,t.jsx)(o.Z,(0,D.Z)((0,D.Z)({},n),{},{style:{color:n.color,width:n.width,height:n.height,borderColor:n.color},className:"".concat(he().button),children:n.children}))},X=Pe,_e=e(49101),me=e(88769),ve=e.n(me),ge=function(n){return(0,t.jsx)(o.Z,{onClick:n.onClick,icon:(0,t.jsx)(_e.Z,{}),size:"large",id:"".concat(ve().createBtn),children:n.children})},oe=ge,F=e(52940),fe=e(37071),w=e(91156),k="projectInfo",je=function(){var y=(0,R.Z)(C().mark(function n(h){var P,g,f;return C().wrap(function(c){for(;;)switch(c.prev=c.next){case 0:if(P=h==null?fe.Z.getQueryVariable("projectId"):h,P){c.next=5;break}return M.default.error("projectId isn't passed in nor present in url!"),a.m8.push("/"),c.abrupt("return");case 5:if(g=localStorage.getItem(k),!g){c.next=8;break}return c.abrupt("return",JSON.parse(g));case 8:return c.next=10,w.F$.get(P);case 10:if(f=c.sent,f){c.next=15;break}return M.default.error("Cannot find project: ".concat(P,"!")),a.m8.push("/"),c.abrupt("return");case 15:return localStorage.setItem(k,JSON.stringify(f)),c.abrupt("return",f);case 17:case"end":return c.stop()}},n)}));return function(h){return y.apply(this,arguments)}}(),Ee=function(){var n=x.useState([]),h=(0,_.Z)(n,2),P=h[0],g=h[1],f=[{title:"ID",dataIndex:"projectId",key:"projectId",width:"4.5rem",align:"center",render:function(c){return(0,t.jsx)(t.Fragment,{children:c})}},{title:"Name",dataIndex:"name",key:"projectId"},{title:"Actions",key:"projectId",width:"15rem",align:"center",render:function(c,A){return(0,t.jsxs)(O.Z,{size:"middle",children:[(0,t.jsx)(X,{width:"4.375rem",height:"1.875rem",color:"rgba(241,162,0,1)",children:"Modify"}),(0,t.jsx)(X,{width:"4.375rem",height:"1.875rem",color:"rgba(0,100,248,1)",onClick:function(){a.m8.push("/".concat(A.taskCategory.name,"?projectId=").concat(A.projectId))},children:"Label"}),(0,t.jsx)(X,{width:"4.375rem",height:"1.875rem",color:"rgba(207,63,0,1)",onClick:function(){(0,w.th)(A.projectId,g)},children:"Delete"})]})}}];return x.useEffect(function(){(0,w.mW)(g)},[]),P.length==0?(0,t.jsx)(j.Z,{style:{marginTop:20},children:(0,t.jsx)(r.Z,{span:24,children:(0,t.jsx)(W.Z,{title:"My Projects",children:(0,t.jsx)(oe,{onClick:function(){a.m8.push("/project_creation")},children:"Create Project"})})})}):(0,t.jsx)(j.Z,{style:{marginTop:20},children:(0,t.jsx)(r.Z,{span:24,children:(0,t.jsx)(W.Z,{title:"My Projects",children:(0,t.jsx)(de,{columns:f,dataSource:P,showHeader:!1})})})})},Oe=function(){return(0,t.jsxs)(H.Z,{children:[(0,t.jsx)(j.Z,{gutter:[20,20],children:(0,t.jsx)(r.Z,{span:24,children:(0,t.jsx)(oe,{onClick:function(){a.m8.push("/project_creation")},children:"Create Project"})})}),(0,t.jsxs)(j.Z,{gutter:[20,20],style:{marginTop:20},children:[(0,t.jsx)(r.Z,{span:17,children:(0,t.jsx)(W.Z,{title:"Sample Project",style:{height:430},children:(0,t.jsxs)(j.Z,{children:[(0,t.jsx)(F.Z,{span:4,children:(0,t.jsx)(S.Z,{imgSrc:"./pics/classification.jpg",children:"Image Classification"})}),(0,t.jsx)(F.Z,{span:4,children:(0,t.jsx)(S.Z,{imgSrc:"./pics/object_detection.jpg",children:"Object Detection"})}),(0,t.jsx)(F.Z,{span:4,children:(0,t.jsx)(S.Z,{imgSrc:"./pics/instance_segmentation.jpg",children:"Instance Segmentation"})}),(0,t.jsx)(F.Z,{span:4,children:(0,t.jsx)(S.Z,{imgSrc:"./pics/semantic_segmentation.jpg",children:"Semantic Segmentation"})}),(0,t.jsx)(F.Z,{span:4,children:(0,t.jsx)(S.Z,{imgSrc:"./pics/keypoint_detection.jpg",children:"Keypoint Detection"})})]})})}),(0,t.jsx)(r.Z,{span:7,children:(0,t.jsx)(W.Z,{title:"Model Training Knowledge",style:{height:430},children:(0,t.jsxs)(O.Z,{direction:"vertical",style:{width:"100%"},size:10,children:[(0,t.jsx)(o.Z,{type:"primary",style:{height:"3.125rem"},block:!0,children:"How to tran using paddleclas"}),(0,t.jsx)(o.Z,{type:"primary",style:{height:"3.125rem"},block:!0,children:"How to tran using paddledet"}),(0,t.jsx)(o.Z,{type:"primary",style:{height:"3.125rem"},block:!0,children:"How to tran using paddleseg"}),(0,t.jsx)(o.Z,{type:"primary",style:{height:"3.125rem"},block:!0,children:"How to tran using paddlex"})]})})})]}),Ee()]})},xe=Oe},91156:function(d,Z,e){"use strict";e.d(Z,{F$:function(){return C},mW:function(){return W},th:function(){return ae},jc:function(){return le},SP:function(){return Q}});var p=e(34792),o=e(48086),T=e(3182),j=e(94043),E=e.n(j),r=e(37071),B=e(78583),O=e(63891),_=e(13868),s=e(70676),M=e(54919),R=localStorage.getItem("basePath"),m=new B.VK(R?{basePath:R}:void 0),C=new O.U(m),x=new _.v(m),H=new M.W(m);function S(l){return JSON.parse(JSON.stringify(l))}function W(l){return D.apply(this,arguments)}function D(){return D=(0,T.Z)(E().mark(function l(u){return E().wrap(function(v){for(;;)switch(v.prev=v.next){case 0:C.getAll().then(function(i){console.log("get all projects",S(i)),u(S(i))}).catch(function(i){r.Z.parseError(i,o.default)});case 1:case"end":return v.stop()}},l)})),D.apply(this,arguments)}function ae(l,u){return b.apply(this,arguments)}function b(){return b=(0,T.Z)(E().mark(function l(u,a){return E().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:console.log("delete pj, pjid",u),C.remove(u).then(function(t){console.log("delete project",t),W(a)}).catch(function(t){console.log(t),r.Z.parseError(t,o.default)});case 2:case"end":return i.stop()}},l)})),b.apply(this,arguments)}function re(l,u){l==null&&u(0),C.getTasks(l).then(function(a){console.log(a);var v=0,i=_createForOfIteratorHelper(a),t;try{for(i.s();!(t=i.n()).done;){var K=t.value;K.annotations.length!=0&&v++}}catch(V){i.e(V)}finally{i.f()}console.log("res",v,a.length,Math.ceil(v/a.length*100)),u(Math.ceil(v/a.length*100))}).catch(function(a){serviceUtils.parseError(a,_message),u(0)})}function J(l,u){console.log("getLabels projectid",l),!!l&&C.getLabels(l).then(function(a){console.log("got labels ",a),u(S(a))}).catch(function(a){r.Z.parseError(a,o.default)})}function le(l,u,a){var v=(0,s.$3)(u);v.projectId=l,x.create(v).then(function(){J(l,a)}).catch(function(i){r.Z.parseError(i,o.default)})}function Q(l,u){console.log("delete label",l),x.remove(l.labelId).then(function(){o.default.error("Label "+l.name+" is deleted!"),J(l.projectId,u)}).catch(function(a){r.Z.parseError(a,o.default)})}}}]);
