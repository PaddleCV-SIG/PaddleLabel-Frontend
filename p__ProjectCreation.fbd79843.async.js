(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[112],{91220:function(h,v,t){"use strict";t.d(v,{Z:function(){return l}});var a=t(64254);function l(s,d){var _;if(typeof Symbol=="undefined"||s[Symbol.iterator]==null){if(Array.isArray(s)||(_=(0,a.Z)(s))||d&&s&&typeof s.length=="number"){_&&(s=_);var f=0,E=function(){};return{s:E,n:function(){return f>=s.length?{done:!0}:{done:!1,value:s[f++]}},e:function(u){throw u},f:E}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var P=!0,M=!1,n;return{s:function(){_=s[Symbol.iterator]()},n:function(){var u=_.next();return P=u.done,u},e:function(u){M=!0,n=u},f:function(){try{!P&&_.return!=null&&_.return()}finally{if(M)throw n}}}}},41435:function(h,v,t){"use strict";t.d(v,{Z:function(){return f}});var a=t(94663),l=t(80112);function s(E){return Function.toString.call(E).indexOf("[native code]")!==-1}var d=t(18597);function _(E,P,M){return(0,d.Z)()?_=Reflect.construct:_=function(o,u,e){var R=[null];R.push.apply(R,u);var O=Function.bind.apply(o,R),c=new O;return e&&(0,l.Z)(c,e.prototype),c},_.apply(null,arguments)}function f(E){var P=typeof Map=="function"?new Map:void 0;return f=function(n){if(n===null||!s(n))return n;if(typeof n!="function")throw new TypeError("Super expression must either be null or a function");if(typeof P!="undefined"){if(P.has(n))return P.get(n);P.set(n,o)}function o(){return _(n,arguments,(0,a.Z)(this).constructor)}return o.prototype=Object.create(n.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),(0,l.Z)(o,n)},f(E)}},41180:function(h){h.exports={ppcard:"ppcard___27hGd",title:"title___22R8f"}},70362:function(h){h.exports={card:"card___CFZWU",thumbnail:"thumbnail___1gIPM",button:"button___g0lkO"}},17969:function(h){h.exports={col:"col___yKN-b"}},80638:function(){},31982:function(h,v,t){"use strict";var a=t(89032),l=t(15746),s=t(11849),d=t(13062),_=t(71230),f=t(11700),E=t(67294),P=t(41180),M=t.n(P),n=t(85893),o=function(e){return(0,n.jsxs)("div",{className:M().ppcard,style:e.style,children:[(0,n.jsx)(_.Z,{className:M().titleRow,style:{display:e.title?void 0:"none"},children:(0,n.jsx)(f.Z,{className:M().title,children:e.title})}),(0,n.jsx)(_.Z,{style:{marginTop:26},children:(0,n.jsx)(l.Z,{span:24,style:(0,s.Z)({paddingLeft:30,paddingRight:30,textAlign:"center"},e.innerStyle),children:e.children})})]})};v.Z=o},40318:function(h,v,t){"use strict";var a=t(57663),l=t(71577),s=t(48971),d=t(67294),_=t(70362),f=t.n(_),E=t(85893),P=function(n){return(0,E.jsxs)("div",{className:f().card,style:{height:n.height,width:n.width},onClick:function(){return s.m8.push(n.href?n.href:"")},children:[(0,E.jsx)("img",{className:f().thumbnail,alt:n.wording||f().thumbnail,src:n.imgSrc,style:{height:n.height,width:n.width}}),(0,E.jsx)(l.Z,{className:f().button,style:{width:n.width},children:n.children})]})};v.Z=P},52940:function(h,v,t){"use strict";var a=t(11849),l=t(89032),s=t(15746),d=t(2824),_=t(67294),f=t(17969),E=t.n(f),P=t(85893),M=function(o){var u=(0,_.useState)(!1),e=(0,d.Z)(u,2),R=e[0],O=e[1];return(0,P.jsx)(s.Z,(0,a.Z)((0,a.Z)({},o),{},{className:"".concat(E().col," ").concat(o.className),style:{zIndex:R?11:10,width:"100%"},onMouseOver:function(){O(!0)},onMouseLeave:function(){O(!1)},children:o.children}))};v.Z=M},12405:function(h,v,t){"use strict";t.r(v);var a=t(89032),l=t(15746),s=t(13062),d=t(71230),_=t(2824),f=t(67294),E=t(40318),P=t(31982),M=t(11428),n=t(52940),o=t(93120),u=t(85893),e=function(){function O(){for(var c=[],r=0,g=Object.entries(o.ux);r<g.length;r++){var D=g[r],i=(0,_.Z)(D,2),x=i[0],B=i[1];c.push((0,u.jsx)(n.Z,{span:4,children:(0,u.jsx)(E.Z,{height:360,width:310,imgSrc:B.avatar,href:"/project_detail?taskCategory="+x,children:B.name})}))}return c}return(0,u.jsx)(M.Z,{children:(0,u.jsx)(d.Z,{style:{marginTop:20},children:(0,u.jsx)(l.Z,{span:24,children:(0,u.jsx)(P.Z,{style:{height:500},children:(0,u.jsx)(d.Z,{children:O()})})})})})};v.default=e},99134:function(h,v,t){"use strict";var a=t(67294),l=(0,a.createContext)({});v.Z=l},21584:function(h,v,t){"use strict";var a=t(96156),l=t(22122),s=t(90484),d=t(67294),_=t(94184),f=t.n(_),E=t(99134),P=t(65632),M=function(e,R){var O={};for(var c in e)Object.prototype.hasOwnProperty.call(e,c)&&R.indexOf(c)<0&&(O[c]=e[c]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,c=Object.getOwnPropertySymbols(e);r<c.length;r++)R.indexOf(c[r])<0&&Object.prototype.propertyIsEnumerable.call(e,c[r])&&(O[c[r]]=e[c[r]]);return O};function n(e){return typeof e=="number"?"".concat(e," ").concat(e," auto"):/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?"0 0 ".concat(e):e}var o=["xs","sm","md","lg","xl","xxl"],u=d.forwardRef(function(e,R){var O,c=d.useContext(P.E_),r=c.getPrefixCls,g=c.direction,D=d.useContext(E.Z),i=D.gutter,x=D.wrap,B=D.supportFlexGap,H=e.prefixCls,b=e.span,j=e.order,W=e.offset,I=e.push,Z=e.pull,z=e.className,S=e.children,N=e.flex,J=e.style,F=M(e,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),y=r("col",H),K={};o.forEach(function(A){var C,m={},T=e[A];typeof T=="number"?m.span=T:(0,s.Z)(T)==="object"&&(m=T||{}),delete F[A],K=(0,l.Z)((0,l.Z)({},K),(C={},(0,a.Z)(C,"".concat(y,"-").concat(A,"-").concat(m.span),m.span!==void 0),(0,a.Z)(C,"".concat(y,"-").concat(A,"-order-").concat(m.order),m.order||m.order===0),(0,a.Z)(C,"".concat(y,"-").concat(A,"-offset-").concat(m.offset),m.offset||m.offset===0),(0,a.Z)(C,"".concat(y,"-").concat(A,"-push-").concat(m.push),m.push||m.push===0),(0,a.Z)(C,"".concat(y,"-").concat(A,"-pull-").concat(m.pull),m.pull||m.pull===0),(0,a.Z)(C,"".concat(y,"-rtl"),g==="rtl"),C))});var V=f()(y,(O={},(0,a.Z)(O,"".concat(y,"-").concat(b),b!==void 0),(0,a.Z)(O,"".concat(y,"-order-").concat(j),j),(0,a.Z)(O,"".concat(y,"-offset-").concat(W),W),(0,a.Z)(O,"".concat(y,"-push-").concat(I),I),(0,a.Z)(O,"".concat(y,"-pull-").concat(Z),Z),O),z,K),L={};if(i&&i[0]>0){var w=i[0]/2;L.paddingLeft=w,L.paddingRight=w}if(i&&i[1]>0&&!B){var G=i[1]/2;L.paddingTop=G,L.paddingBottom=G}return N&&(L.flex=n(N),x===!1&&!L.minWidth&&(L.minWidth=0)),d.createElement("div",(0,l.Z)({},F,{style:(0,l.Z)((0,l.Z)({},L),J),className:V,ref:R}),S)});u.displayName="Col",v.Z=u},92820:function(h,v,t){"use strict";var a=t(22122),l=t(96156),s=t(90484),d=t(28481),_=t(67294),f=t(94184),E=t.n(f),P=t(65632),M=t(99134),n=t(93355),o=t(24308),u=t(98082),e=function(r,g){var D={};for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&g.indexOf(i)<0&&(D[i]=r[i]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var x=0,i=Object.getOwnPropertySymbols(r);x<i.length;x++)g.indexOf(i[x])<0&&Object.prototype.propertyIsEnumerable.call(r,i[x])&&(D[i[x]]=r[i[x]]);return D},R=(0,n.b)("top","middle","bottom","stretch"),O=(0,n.b)("start","end","center","space-around","space-between"),c=_.forwardRef(function(r,g){var D,i=r.prefixCls,x=r.justify,B=r.align,H=r.className,b=r.style,j=r.children,W=r.gutter,I=W===void 0?0:W,Z=r.wrap,z=e(r,["prefixCls","justify","align","className","style","children","gutter","wrap"]),S=_.useContext(P.E_),N=S.getPrefixCls,J=S.direction,F=_.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),y=(0,d.Z)(F,2),K=y[0],V=y[1],L=(0,u.Z)(),w=_.useRef(I);_.useEffect(function(){var nt=o.ZP.subscribe(function(U){var p=w.current||0;(!Array.isArray(p)&&(0,s.Z)(p)==="object"||Array.isArray(p)&&((0,s.Z)(p[0])==="object"||(0,s.Z)(p[1])==="object"))&&V(U)});return function(){return o.ZP.unsubscribe(nt)}},[]);var G=function(){var U=[0,0],p=Array.isArray(I)?I:[I,0];return p.forEach(function($,_t){if((0,s.Z)($)==="object")for(var Y=0;Y<o.c4.length;Y++){var k=o.c4[Y];if(K[k]&&$[k]!==void 0){U[_t]=$[k];break}}else U[_t]=$||0}),U},A=N("row",i),C=G(),m=E()(A,(D={},(0,l.Z)(D,"".concat(A,"-no-wrap"),Z===!1),(0,l.Z)(D,"".concat(A,"-").concat(x),x),(0,l.Z)(D,"".concat(A,"-").concat(B),B),(0,l.Z)(D,"".concat(A,"-rtl"),J==="rtl"),D),H),T={},Q=C[0]>0?C[0]/-2:void 0,X=C[1]>0?C[1]/-2:void 0;if(Q&&(T.marginLeft=Q,T.marginRight=Q),L){var rt=(0,d.Z)(C,2);T.rowGap=rt[1]}else X&&(T.marginTop=X,T.marginBottom=X);var q=(0,d.Z)(C,2),tt=q[0],et=q[1],at=_.useMemo(function(){return{gutter:[tt,et],wrap:Z,supportFlexGap:L}},[tt,et,Z,L]);return _.createElement(M.Z.Provider,{value:at},_.createElement("div",(0,a.Z)({},z,{className:m,style:(0,a.Z)((0,a.Z)({},T),b),ref:g}),j))});c.displayName="Row",v.Z=c},6999:function(h,v,t){"use strict";var a=t(38663),l=t.n(a),s=t(80638),d=t.n(s)}}]);