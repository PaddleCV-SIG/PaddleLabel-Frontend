(self.webpackChunkPaddleLabel_Frontend=self.webpackChunkPaddleLabel_Frontend||[]).push([[185],{41180:function(l){l.exports={ppcard:"ppcard___27hGd",title:"title___22R8f"}},9238:function(l){l.exports={button:"button___3gM4r"}},70362:function(l){l.exports={card:"card___CFZWU",thumbnail:"thumbnail___1gIPM",button:"button___g0lkO"}},48627:function(l){l.exports={container:"container___2RXc3"}},17969:function(l){l.exports={col:"col___yKN-b"}},24141:function(l){l.exports={pagination:"pagination___1KJhU",pageSizeSelector:"pageSizeSelector___2XZ11"}},81013:function(l){l.exports={createBtn:"createBtn___UiGiR"}},75534:function(l){l.exports={table:"table___BHQO2"}},31982:function(l,E,e){"use strict";var I=e(89032),M=e(15746),D=e(11849),i=e(13062),C=e(71230),f=e(11700),d=e(67294),L=e(41180),P=e.n(L),a=e(85893),h=function(c){return(0,a.jsxs)("div",{className:P().ppcard,style:c.style,hidden:c.hidden,children:[(0,a.jsx)(C.Z,{className:P().titleRow,style:{display:c.title?void 0:"none"},children:(0,a.jsx)(f.Z,{className:P().title,children:c.title})}),(0,a.jsx)(C.Z,{style:{marginTop:26},children:(0,a.jsx)(M.Z,{span:24,style:(0,D.Z)({paddingLeft:30,paddingRight:30,textAlign:"center"},c.innerStyle),children:c.children})})]})};E.Z=h},40318:function(l,E,e){"use strict";var I=e(57663),M=e(71577),D=e(48971),i=e(67294),C=e(70362),f=e.n(C),d=e(85893),L=function(a){return(0,d.jsxs)("div",{className:f().card,style:{height:a.height,width:a.width},onClick:a.onClick?a.onClick:function(){return D.m8.push(a.href?a.href:"")},children:[(0,d.jsx)("img",{className:f().thumbnail,alt:a.wording||f().thumbnail,src:a.imgSrc,style:{height:a.height,width:a.width}}),(0,d.jsx)(M.Z,{className:f().button,style:{width:a.width},children:a.children})]})};E.Z=L},11428:function(l,E,e){"use strict";var I=e(67294),M=e(48627),D=e.n(M),i=e(85893),C=function(d){return(0,i.jsx)("div",{className:"".concat(D().container),style:{backgroundImage:"url(./pics/background.png)"},children:d.children})};E.Z=C},52940:function(l,E,e){"use strict";var I=e(11849),M=e(89032),D=e(15746),i=e(2824),C=e(67294),f=e(17969),d=e.n(f),L=e(85893),P=function(h){var U=(0,C.useState)(!1),c=(0,i.Z)(U,2),x=c[0],O=c[1];return(0,L.jsx)(D.Z,(0,I.Z)((0,I.Z)({},h),{},{className:"".concat(d().col," ").concat(h.className),style:{zIndex:x?11:10,width:"100%"},onMouseOver:function(){O(!0)},onMouseLeave:function(){O(!1)},children:h.children}))};E.Z=P},5011:function(l,E,e){"use strict";e.r(E),e.d(E,{default:function(){return ve}});var I=e(20228),M=e(11382),D=e(57663),i=e(71577),C=e(34792),f=e(48086),d=e(2824),L=e(13062),P=e(71230),a=e(89032),h=e(15746),U=e(49111),c=e(19650),x=e(67294),O=e(48971),b=e(11428),$=e(40318),N=e(31982),T=e(11849),ge=e(66456),Y=e(4421),p=e(75534),k=e.n(p),fe=e(14781),w=e(40308),_e=e(43358),J=e(34041),q=e(24141),F=e.n(q),t=e(85893),A=J.Z.Option;function ee(Z){var n=Z.formatMessage({id:"component.PPTable.prev",defaultMessage:"Previous"}),u=Z.formatMessage({id:"component.PPTable.next",defaultMessage:"Next"});return function(s,r,_){return r==="prev"?(0,t.jsx)(i.Z,{children:n}):r==="next"?(0,t.jsx)(i.Z,{children:u}):_}}var te=function(n){var u=n.totalNum,s=(0,x.useState)(n.pageSize||10),r=(0,d.Z)(s,2),_=r[0],m=r[1],v=(0,x.useState)(n.currentPage||1),o=(0,d.Z)(v,2),j=o[0],R=o[1];return(0,t.jsx)("div",{className:"".concat(F().pagination),children:(0,t.jsxs)(c.Z,{align:"center",children:[(0,O.YB)().formatMessage({id:"component.PPTable.pageTotal"},{total:u,show:(0,t.jsxs)(J.Z,{value:_+"",className:F().pageSizeSelector,onChange:function(g){m(parseInt(g)),n.onChange&&n.onChange(j,parseInt(g))},children:[(0,t.jsx)(A,{value:"10",children:"10"}),(0,t.jsx)(A,{value:"20",children:"20"}),(0,t.jsx)(A,{value:"30",children:"30"}),(0,t.jsx)(A,{value:"40",children:"40"}),(0,t.jsx)(A,{value:"50",children:"50"})]})}),(0,t.jsx)(w.Z,{className:F().pagination,current:j,pageSize:_,total:u,itemRender:ee((0,O.YB)()),onChange:function(g,S){console.log("Pagination: ".concat(S,"/").concat(g)),R(g),n.onChange&&n.onChange(g,S)}})]})})},ne=te,le=function(n){var u,s=((u=n.dataSource)===null||u===void 0?void 0:u.length)||0,r=(0,x.useState)(10),_=(0,d.Z)(r,2),m=_[0],v=_[1],o=(0,x.useState)(1),j=(0,d.Z)(o,2),R=j[0],B=j[1],g=n.dataSource,S=[];if(n.dataSource){var G,H,W=m*(R-1),K=m;W+m>s&&(K=s-W+1),g=(G=n.dataSource)===null||G===void 0?void 0:G.slice(W,W+K/2),S=(H=n.dataSource)===null||H===void 0?void 0:H.slice(W+K/2,W+K)}return(0,t.jsxs)("div",{className:"".concat(k().table),children:[(0,t.jsxs)(P.Z,{children:[(0,t.jsx)(h.Z,{span:12,style:{borderRight:"0.063rem solid rgba(151,151,151,0.27)"},children:(0,t.jsx)(Y.Z,(0,T.Z)((0,T.Z)({},n),{},{dataSource:g,pagination:!1,rowSelection:void 0}))}),(0,t.jsx)(h.Z,{span:12,children:(0,t.jsx)(Y.Z,(0,T.Z)((0,T.Z)({},n),{},{dataSource:S,pagination:!1,rowSelection:void 0}))})]}),(0,t.jsx)(P.Z,{style:{marginTop:"1.75rem"},children:(0,t.jsx)(h.Z,{span:24,children:(0,t.jsx)(c.Z,{align:"center",children:(0,t.jsx)(ne,{totalNum:s,pageSize:m,currentPage:R,onChange:function(V,X){v(X),(V-1)*X>s?B(1):B(V),n.onChange&&n.onChange(V,X)}})})})})]})},ae=le,oe=e(9238),de=e.n(oe),se=function(n){return(0,t.jsx)(i.Z,(0,T.Z)((0,T.Z)({},n),{},{style:{color:n.color,width:n.width,height:n.height,borderColor:n.color},className:"".concat(de().button),children:n.children}))},z=se,re=e(81013),ie=e.n(re),ce=function(n){return(0,t.jsx)(i.Z,{onClick:n.onClick,size:"large",id:"".concat(ie().createBtn),children:n.children})},ue=ce,Pe=e(52940),y=e(15156),Q=e(36505),he=function(n){var u,s=(0,Q.I)("pages.welcome");console.log("render projects");var r=(0,y.Gd)(x.useState);(0,x.useEffect)(function(){(0,y.bo)().then(function(m){m!=!1&&r.getAll()})},[]);var _=[{title:"ID",dataIndex:"projectId",key:"projectId",width:"4.5rem",align:"center",render:function(v){return(0,t.jsx)(t.Fragment,{children:v})}},{title:"Name",dataIndex:"name",key:"projectId"},{title:"Project Category",key:"projectId",render:function(v){console.log("pj",v);var o=(0,y.os)(v.taskCategory.name);return console.log("categoryName",o),y.ux[o].name}},{title:"Actions",key:"projectId",width:"15rem",align:"center",render:function(v,o){return(0,t.jsxs)(c.Z,{size:"middle",children:[(0,t.jsx)(z,{width:"4.375rem",height:"1.875rem",color:"rgba(241,162,0,1)",onClick:function(){O.m8.push("/project_overview?projectId=".concat(o.projectId))},children:s("overview")}),(0,t.jsx)(z,{width:"4.375rem",height:"1.875rem",color:"rgba(0,100,248,1)",onClick:function(){O.m8.push("/".concat(o.taskCategory.name,"?projectId=").concat(o.projectId))},children:s("label")}),(0,t.jsx)(z,{width:"4.375rem",height:"1.875rem",color:"rgba(207,63,0,1)",onClick:function(){n.setDeleting(!0),r.remove(o).then(function(){return n.setDeleting(!1)})},children:s("remove")})]})}}];return(u=r.all)!==null&&u!==void 0&&u.length?(console.log("all pjs",(0,y.gu)(r.all)),(0,t.jsx)(P.Z,{style:{marginTop:20},children:(0,t.jsx)(h.Z,{span:24,children:(0,t.jsx)(N.Z,{title:s("myProjects"),children:(0,t.jsx)(ae,{columns:_,dataSource:(0,y.gu)(r.all),showHeader:!1})})})})):""},me=function(){var n=(0,Q.I)("pages.welcome"),u=(0,x.useState)(!1),s=(0,d.Z)(u,2),r=s[0],_=s[1];function m(){for(var v=[],o=0,j=Object.entries(y.ux);o<j.length;o++){var R=j[o],B=(0,d.Z)(R,2),g=B[0],S=B[1];v.push((0,t.jsx)(Pe.Z,{span:4,children:(0,t.jsx)($.Z,{imgSrc:S.avatar,href:"/project_detail?taskCategory="+g,onClick:g!="keypointDetection"?void 0:function(){f.default.info(n("underDevelopment","global"))},children:n(g,"global")})}))}return v}return(0,t.jsxs)(b.Z,{children:[(0,t.jsx)(P.Z,{gutter:[20,20],children:(0,t.jsx)(h.Z,{span:24,children:(0,t.jsx)(ue,{onClick:function(){O.m8.push("/sample_project")},children:n("sampleProject")})})}),(0,t.jsxs)(P.Z,{gutter:[20,20],style:{marginTop:20},children:[(0,t.jsx)(h.Z,{span:17,children:(0,t.jsx)(N.Z,{title:n("createProject"),style:{height:430},children:(0,t.jsx)(P.Z,{children:m()})})}),(0,t.jsx)(h.Z,{span:7,children:(0,t.jsx)(N.Z,{title:n("trainingKnowledge"),style:{height:430},children:(0,t.jsxs)(c.Z,{direction:"vertical",style:{width:"100%"},size:10,children:[(0,t.jsx)(i.Z,{type:"primary",style:{height:"3.125rem",lineHeight:"3.125rem"},href:"https://github.com/PaddleCV-SIG/PaddleLabel/blob/develop/doc/PPLabel_PaddleClas.md",block:!0,children:n("paddleClas")}),(0,t.jsx)(i.Z,{type:"primary",style:{height:"3.125rem",lineHeight:"3.125rem"},href:"https://github.com/PaddleCV-SIG/PaddleLabel/blob/develop/doc/PPLabel_PaddleDet.md",block:!0,children:n("paddleDet")}),(0,t.jsx)(i.Z,{type:"primary",style:{height:"3.125rem",lineHeight:"3.125rem"},href:"https://github.com/PaddleCV-SIG/PaddleLabel/blob/develop/doc/PPLabel_PaddleSeg.md",block:!0,children:n("paddleSeg")}),(0,t.jsx)(i.Z,{type:"primary",style:{height:"3.125rem",lineHeight:"3.125rem"},href:"https://github.com/PaddleCV-SIG/PaddleLabel/blob/develop/doc/PPLabel_PaddleX.md",block:!0,children:n("paddleX")})]})})})]}),(0,t.jsx)(M.Z,{tip:"Deleting",spinning:r,children:he({setDeleting:_})})]})},ve=me}}]);
