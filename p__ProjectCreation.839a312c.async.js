(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[112],{91220:function(u,d,t){"use strict";t.d(d,{Z:function(){return c}});var O=t(64254);function c(r,E){var _;if(typeof Symbol=="undefined"||r[Symbol.iterator]==null){if(Array.isArray(r)||(_=(0,O.Z)(r))||E&&r&&typeof r.length=="number"){_&&(r=_);var l=0,a=function(){};return{s:a,n:function(){return l>=r.length?{done:!0}:{done:!1,value:r[l++]}},e:function(o){throw o},f:a}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var s=!0,P=!1,n;return{s:function(){_=r[Symbol.iterator]()},n:function(){var o=_.next();return s=o.done,o},e:function(o){P=!0,n=o},f:function(){try{!s&&_.return!=null&&_.return()}finally{if(P)throw n}}}}},41435:function(u,d,t){"use strict";t.d(d,{Z:function(){return l}});var O=t(94663),c=t(80112);function r(a){return Function.toString.call(a).indexOf("[native code]")!==-1}var E=t(18597);function _(a,s,P){return(0,E.Z)()?_=Reflect.construct:_=function(e,o,i){var M=[null];M.push.apply(M,o);var f=Function.bind.apply(e,M),m=new f;return i&&(0,c.Z)(m,i.prototype),m},_.apply(null,arguments)}function l(a){var s=typeof Map=="function"?new Map:void 0;return l=function(n){if(n===null||!r(n))return n;if(typeof n!="function")throw new TypeError("Super expression must either be null or a function");if(typeof s!="undefined"){if(s.has(n))return s.get(n);s.set(n,e)}function e(){return _(n,arguments,(0,O.Z)(this).constructor)}return e.prototype=Object.create(n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),(0,c.Z)(e,n)},l(a)}},41180:function(u){u.exports={ppcard:"ppcard___27hGd",title:"title___22R8f"}},70362:function(u){u.exports={card:"card___CFZWU",thumbnail:"thumbnail___1gIPM",button:"button___g0lkO"}},48627:function(u){u.exports={container:"container___2RXc3"}},17969:function(u){u.exports={col:"col___yKN-b"}},31982:function(u,d,t){"use strict";var O=t(89032),c=t(15746),r=t(8870),E=t(13062),_=t(71230),l=t(11700),a=t(67294),s=t(41180),P=t.n(s),n=t(85893),e=function(i){return(0,n.jsxs)("div",{className:P().ppcard,style:i.style,hidden:i.hidden,children:[(0,n.jsx)(_.Z,{className:P().titleRow,style:{display:i.title?void 0:"none"},children:(0,n.jsx)(l.Z,{className:P().title,children:i.title})}),(0,n.jsx)(_.Z,{style:{marginTop:26},children:(0,n.jsx)(c.Z,{span:24,style:(0,r.Z)({paddingLeft:30,paddingRight:30,textAlign:"center"},i.innerStyle),children:i.children})})]})};d.Z=e},40318:function(u,d,t){"use strict";var O=t(57663),c=t(71577),r=t(48971),E=t(67294),_=t(70362),l=t.n(_),a=t(85893),s=function(n){return(0,a.jsxs)("div",{className:l().card,style:{height:n.height,width:n.width},onClick:function(){return r.m8.push(n.href?n.href:"")},children:[(0,a.jsx)("img",{className:l().thumbnail,alt:n.wording||l().thumbnail,src:n.imgSrc,style:{height:n.height,width:n.width}}),(0,a.jsx)(c.Z,{className:l().button,style:{width:n.width},children:n.children})]})};d.Z=s},11428:function(u,d,t){"use strict";var O=t(67294),c=t(48627),r=t.n(c),E=t(85893),_=function(a){return(0,E.jsx)("div",{className:"".concat(r().container),style:{backgroundImage:"url(./pics/background.png)"},children:a.children})};d.Z=_},52940:function(u,d,t){"use strict";var O=t(8870),c=t(89032),r=t(15746),E=t(2824),_=t(67294),l=t(17969),a=t.n(l),s=t(85893),P=function(e){var o=(0,_.useState)(!1),i=(0,E.Z)(o,2),M=i[0],f=i[1];return(0,s.jsx)(r.Z,(0,O.Z)((0,O.Z)({},e),{},{className:"".concat(a().col," ").concat(e.className),style:{zIndex:M?11:10,width:"100%"},onMouseOver:function(){f(!0)},onMouseLeave:function(){f(!1)},children:e.children}))};d.Z=P},12405:function(u,d,t){"use strict";t.r(d);var O=t(89032),c=t(15746),r=t(13062),E=t(71230),_=t(2824),l=t(67294),a=t(40318),s=t(31982),P=t(11428),n=t(52940),e=t(50501),o=t(85893),i=function(){function f(){for(var m=[],v=0,D=Object.entries(e.ux);v<D.length;v++){var y=D[v],h=(0,_.Z)(y,2),T=h[0],L=h[1];m.push((0,o.jsx)(n.Z,{span:4,children:(0,o.jsx)(a.Z,{height:360,width:310,imgSrc:L.avatar,href:"/project_detail?taskCategory="+T,children:L.name})}))}return m}return(0,o.jsx)(P.Z,{children:(0,o.jsx)(E.Z,{style:{marginTop:20},children:(0,o.jsx)(c.Z,{span:24,children:(0,o.jsx)(s.Z,{style:{height:500},children:(0,o.jsx)(E.Z,{children:f()})})})})})};d.default=i}}]);