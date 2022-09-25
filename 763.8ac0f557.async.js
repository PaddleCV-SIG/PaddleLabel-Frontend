(self.webpackChunkPaddleLabel_Frontend=self.webpackChunkPaddleLabel_Frontend||[]).push([[763],{91220:function(Y,L,p){"use strict";p.d(L,{Z:function(){return y}});var h=p(64254);function y(t,T){var v;if(typeof Symbol=="undefined"||t[Symbol.iterator]==null){if(Array.isArray(t)||(v=(0,h.Z)(t))||T&&t&&typeof t.length=="number"){v&&(t=v);var g=0,P=function(){};return{s:P,n:function(){return g>=t.length?{done:!0}:{done:!1,value:t[g++]}},e:function(Z){throw Z},f:P}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var E=!0,_=!1,x;return{s:function(){v=t[Symbol.iterator]()},n:function(){var Z=v.next();return E=Z.done,Z},e:function(Z){_=!0,x=Z},f:function(){try{!E&&v.return!=null&&v.return()}finally{if(_)throw x}}}}},62259:function(){},25378:function(Y,L,p){"use strict";var h=p(28481),y=p(67294),t=p(24308);function T(){var v=(0,y.useState)({}),g=(0,h.Z)(v,2),P=g[0],E=g[1];return(0,y.useEffect)(function(){var _=t.ZP.subscribe(function(x){E(x)});return function(){return t.ZP.unsubscribe(_)}},[]),P}L.Z=T},40308:function(Y,L,p){"use strict";p.d(L,{Z:function(){return Ae}});var h=p(96156),y=p(22122),t=p(67294),T=p(28991),v=p(6610),g=p(5991),P=p(10379),E=p(81907),_=p(94184),x=p.n(_),j=function(s){var f,i="".concat(s.rootPrefixCls,"-item"),e=x()(i,"".concat(i,"-").concat(s.page),(f={},(0,h.Z)(f,"".concat(i,"-active"),s.active),(0,h.Z)(f,"".concat(i,"-disabled"),!s.page),(0,h.Z)(f,s.className,!!s.className),f)),n=function(){s.onClick(s.page)},a=function(o){s.onKeyPress(o,s.onClick,s.page)};return t.createElement("li",{title:s.showTitle?s.page:null,className:e,onClick:n,onKeyPress:a,tabIndex:"0"},s.itemRender(s.page,"page",t.createElement("a",{rel:"nofollow"},s.page)))},Z=j,A={ZERO:48,NINE:57,NUMPAD_ZERO:96,NUMPAD_NINE:105,BACKSPACE:8,DELETE:46,ENTER:13,ARROW_UP:38,ARROW_DOWN:40},ie=function(m){(0,P.Z)(f,m);var s=(0,E.Z)(f);function f(){var i;(0,v.Z)(this,f);for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return i=s.call.apply(s,[this].concat(n)),i.state={goInputText:""},i.buildOptionText=function(l){return"".concat(l," ").concat(i.props.locale.items_per_page)},i.changeSize=function(l){i.props.changeSize(Number(l))},i.handleChange=function(l){i.setState({goInputText:l.target.value})},i.handleBlur=function(l){var o=i.props,r=o.goButton,c=o.quickGo,u=o.rootPrefixCls,d=i.state.goInputText;r||d===""||(i.setState({goInputText:""}),!(l.relatedTarget&&(l.relatedTarget.className.indexOf("".concat(u,"-item-link"))>=0||l.relatedTarget.className.indexOf("".concat(u,"-item"))>=0))&&c(i.getValidValue()))},i.go=function(l){var o=i.state.goInputText;o!==""&&(l.keyCode===A.ENTER||l.type==="click")&&(i.setState({goInputText:""}),i.props.quickGo(i.getValidValue()))},i}return(0,g.Z)(f,[{key:"getValidValue",value:function(){var e=this.state.goInputText;return!e||isNaN(e)?void 0:Number(e)}},{key:"getPageSizeOptions",value:function(){var e=this.props,n=e.pageSize,a=e.pageSizeOptions;return a.some(function(l){return l.toString()===n.toString()})?a:a.concat([n.toString()]).sort(function(l,o){var r=isNaN(Number(l))?0:Number(l),c=isNaN(Number(o))?0:Number(o);return r-c})}},{key:"render",value:function(){var e=this,n=this.props,a=n.pageSize,l=n.locale,o=n.rootPrefixCls,r=n.changeSize,c=n.quickGo,u=n.goButton,d=n.selectComponentClass,O=n.buildOptionText,I=n.selectPrefixCls,b=n.disabled,W=this.state.goInputText,V="".concat(o,"-options"),S=d,D=null,k=null,R=null;if(!r&&!c)return null;var w=this.getPageSizeOptions();if(r&&S){var J=w.map(function(M,U){return t.createElement(S.Option,{key:U,value:M.toString()},(O||e.buildOptionText)(M))});D=t.createElement(S,{disabled:b,prefixCls:I,showSearch:!1,className:"".concat(V,"-size-changer"),optionLabelProp:"children",dropdownMatchSelectWidth:!1,value:(a||w[0]).toString(),onChange:this.changeSize,getPopupContainer:function(U){return U.parentNode},"aria-label":l.page_size,defaultOpen:!1},J)}return c&&(u&&(R=typeof u=="boolean"?t.createElement("button",{type:"button",onClick:this.go,onKeyUp:this.go,disabled:b,className:"".concat(V,"-quick-jumper-button")},l.jump_to_confirm):t.createElement("span",{onClick:this.go,onKeyUp:this.go},u)),k=t.createElement("div",{className:"".concat(V,"-quick-jumper")},l.jump_to,t.createElement("input",{disabled:b,type:"text",value:W,onChange:this.handleChange,onKeyUp:this.go,onBlur:this.handleBlur,"aria-label":l.page}),l.page,R)),t.createElement("li",{className:"".concat(V)},D,k)}}]),f}(t.Component);ie.defaultProps={pageSizeOptions:["10","20","50","100"]};var be=ie,Ne=p(81626);function q(){}function le(m){var s=Number(m);return typeof s=="number"&&!isNaN(s)&&isFinite(s)&&Math.floor(s)===s}function ye(m,s,f){return f}function K(m,s,f){var i=typeof m=="undefined"?s.pageSize:m;return Math.floor((f.total-1)/i)+1}var se=function(m){(0,P.Z)(f,m);var s=(0,E.Z)(f);function f(i){var e;(0,v.Z)(this,f),e=s.call(this,i),e.getJumpPrevPage=function(){return Math.max(1,e.state.current-(e.props.showLessItems?3:5))},e.getJumpNextPage=function(){return Math.min(K(void 0,e.state,e.props),e.state.current+(e.props.showLessItems?3:5))},e.getItemIcon=function(r,c){var u=e.props.prefixCls,d=r||t.createElement("button",{type:"button","aria-label":c,className:"".concat(u,"-item-link")});return typeof r=="function"&&(d=t.createElement(r,(0,T.Z)({},e.props))),d},e.savePaginationNode=function(r){e.paginationNode=r},e.isValid=function(r){var c=e.props.total;return le(r)&&r!==e.state.current&&le(c)&&c>0},e.shouldDisplayQuickJumper=function(){var r=e.props,c=r.showQuickJumper,u=r.total,d=e.state.pageSize;return u<=d?!1:c},e.handleKeyDown=function(r){(r.keyCode===A.ARROW_UP||r.keyCode===A.ARROW_DOWN)&&r.preventDefault()},e.handleKeyUp=function(r){var c=e.getValidValue(r),u=e.state.currentInputValue;c!==u&&e.setState({currentInputValue:c}),r.keyCode===A.ENTER?e.handleChange(c):r.keyCode===A.ARROW_UP?e.handleChange(c-1):r.keyCode===A.ARROW_DOWN&&e.handleChange(c+1)},e.handleBlur=function(r){var c=e.getValidValue(r);e.handleChange(c)},e.changePageSize=function(r){var c=e.state.current,u=K(r,e.state,e.props);c=c>u?u:c,u===0&&(c=e.state.current),typeof r=="number"&&("pageSize"in e.props||e.setState({pageSize:r}),"current"in e.props||e.setState({current:c,currentInputValue:c})),e.props.onShowSizeChange(c,r),"onChange"in e.props&&e.props.onChange&&e.props.onChange(c,r)},e.handleChange=function(r){var c=e.props.disabled,u=r;if(e.isValid(u)&&!c){var d=K(void 0,e.state,e.props);u>d?u=d:u<1&&(u=1),"current"in e.props||e.setState({current:u,currentInputValue:u});var O=e.state.pageSize;return e.props.onChange(u,O),u}return e.state.current},e.prev=function(){e.hasPrev()&&e.handleChange(e.state.current-1)},e.next=function(){e.hasNext()&&e.handleChange(e.state.current+1)},e.jumpPrev=function(){e.handleChange(e.getJumpPrevPage())},e.jumpNext=function(){e.handleChange(e.getJumpNextPage())},e.hasPrev=function(){return e.state.current>1},e.hasNext=function(){return e.state.current<K(void 0,e.state,e.props)},e.runIfEnter=function(r,c){if(r.key==="Enter"||r.charCode===13){for(var u=arguments.length,d=new Array(u>2?u-2:0),O=2;O<u;O++)d[O-2]=arguments[O];c.apply(void 0,d)}},e.runIfEnterPrev=function(r){e.runIfEnter(r,e.prev)},e.runIfEnterNext=function(r){e.runIfEnter(r,e.next)},e.runIfEnterJumpPrev=function(r){e.runIfEnter(r,e.jumpPrev)},e.runIfEnterJumpNext=function(r){e.runIfEnter(r,e.jumpNext)},e.handleGoTO=function(r){(r.keyCode===A.ENTER||r.type==="click")&&e.handleChange(e.state.currentInputValue)};var n=i.onChange!==q,a="current"in i;a&&!n&&console.warn("Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.");var l=i.defaultCurrent;"current"in i&&(l=i.current);var o=i.defaultPageSize;return"pageSize"in i&&(o=i.pageSize),l=Math.min(l,K(o,void 0,i)),e.state={current:l,currentInputValue:l,pageSize:o},e}return(0,g.Z)(f,[{key:"componentDidUpdate",value:function(e,n){var a=this.props.prefixCls;if(n.current!==this.state.current&&this.paginationNode){var l=this.paginationNode.querySelector(".".concat(a,"-item-").concat(n.current));l&&document.activeElement===l&&l.blur()}}},{key:"getValidValue",value:function(e){var n=e.target.value,a=K(void 0,this.state,this.props),l=this.state.currentInputValue,o;return n===""?o=n:isNaN(Number(n))?o=l:n>=a?o=a:o=Number(n),o}},{key:"getShowSizeChanger",value:function(){var e=this.props,n=e.showSizeChanger,a=e.total,l=e.totalBoundaryShowSizeChanger;return typeof n!="undefined"?n:a>l}},{key:"renderPrev",value:function(e){var n=this.props,a=n.prevIcon,l=n.itemRender,o=l(e,"prev",this.getItemIcon(a,"prev page")),r=!this.hasPrev();return(0,t.isValidElement)(o)?(0,t.cloneElement)(o,{disabled:r}):o}},{key:"renderNext",value:function(e){var n=this.props,a=n.nextIcon,l=n.itemRender,o=l(e,"next",this.getItemIcon(a,"next page")),r=!this.hasNext();return(0,t.isValidElement)(o)?(0,t.cloneElement)(o,{disabled:r}):o}},{key:"render",value:function(){var e=this,n=this.props,a=n.prefixCls,l=n.className,o=n.style,r=n.disabled,c=n.hideOnSinglePage,u=n.total,d=n.locale,O=n.showQuickJumper,I=n.showLessItems,b=n.showTitle,W=n.showTotal,V=n.simple,S=n.itemRender,D=n.showPrevNextJumpers,k=n.jumpPrevIcon,R=n.jumpNextIcon,w=n.selectComponentClass,J=n.selectPrefixCls,M=n.pageSizeOptions,U=this.state,C=U.current,G=U.pageSize,Ue=U.currentInputValue;if(c===!0&&u<=G)return null;var N=K(void 0,this.state,this.props),z=[],de=null,fe=null,he=null,me=null,$=null,X=O&&O.goButton,B=I?1:2,ve=C-1>0?C-1:0,ge=C+1<N?C+1:N,Ce=Object.keys(this.props).reduce(function(Ee,H){return(H.substr(0,5)==="data-"||H.substr(0,5)==="aria-"||H==="role")&&(Ee[H]=e.props[H]),Ee},{});if(V)return X&&(typeof X=="boolean"?$=t.createElement("button",{type:"button",onClick:this.handleGoTO,onKeyUp:this.handleGoTO},d.jump_to_confirm):$=t.createElement("span",{onClick:this.handleGoTO,onKeyUp:this.handleGoTO},X),$=t.createElement("li",{title:b?"".concat(d.jump_to).concat(C,"/").concat(N):null,className:"".concat(a,"-simple-pager")},$)),t.createElement("ul",(0,y.Z)({className:x()(a,"".concat(a,"-simple"),(0,h.Z)({},"".concat(a,"-disabled"),r),l),style:o,ref:this.savePaginationNode},Ce),t.createElement("li",{title:b?d.prev_page:null,onClick:this.prev,tabIndex:this.hasPrev()?0:null,onKeyPress:this.runIfEnterPrev,className:x()("".concat(a,"-prev"),(0,h.Z)({},"".concat(a,"-disabled"),!this.hasPrev())),"aria-disabled":!this.hasPrev()},this.renderPrev(ve)),t.createElement("li",{title:b?"".concat(C,"/").concat(N):null,className:"".concat(a,"-simple-pager")},t.createElement("input",{type:"text",value:Ue,disabled:r,onKeyDown:this.handleKeyDown,onKeyUp:this.handleKeyUp,onChange:this.handleKeyUp,onBlur:this.handleBlur,size:"3"}),t.createElement("span",{className:"".concat(a,"-slash")},"/"),N),t.createElement("li",{title:b?d.next_page:null,onClick:this.next,tabIndex:this.hasPrev()?0:null,onKeyPress:this.runIfEnterNext,className:x()("".concat(a,"-next"),(0,h.Z)({},"".concat(a,"-disabled"),!this.hasNext())),"aria-disabled":!this.hasNext()},this.renderNext(ge)),$);if(N<=3+B*2){var Pe={locale:d,rootPrefixCls:a,onClick:this.handleChange,onKeyPress:this.runIfEnter,showTitle:b,itemRender:S};N||z.push(t.createElement(Z,(0,y.Z)({},Pe,{key:"noPager",page:1,className:"".concat(a,"-item-disabled")})));for(var Q=1;Q<=N;Q+=1){var We=C===Q;z.push(t.createElement(Z,(0,y.Z)({},Pe,{key:Q,page:Q,active:We})))}}else{var Je=I?d.prev_3:d.prev_5,Ge=I?d.next_3:d.next_5;D&&(de=t.createElement("li",{title:b?Je:null,key:"prev",onClick:this.jumpPrev,tabIndex:"0",onKeyPress:this.runIfEnterJumpPrev,className:x()("".concat(a,"-jump-prev"),(0,h.Z)({},"".concat(a,"-jump-prev-custom-icon"),!!k))},S(this.getJumpPrevPage(),"jump-prev",this.getItemIcon(k,"prev page"))),fe=t.createElement("li",{title:b?Ge:null,key:"next",tabIndex:"0",onClick:this.jumpNext,onKeyPress:this.runIfEnterJumpNext,className:x()("".concat(a,"-jump-next"),(0,h.Z)({},"".concat(a,"-jump-next-custom-icon"),!!R))},S(this.getJumpNextPage(),"jump-next",this.getItemIcon(R,"next page")))),me=t.createElement(Z,{locale:d,last:!0,rootPrefixCls:a,onClick:this.handleChange,onKeyPress:this.runIfEnter,key:N,page:N,active:!1,showTitle:b,itemRender:S}),he=t.createElement(Z,{locale:d,rootPrefixCls:a,onClick:this.handleChange,onKeyPress:this.runIfEnter,key:1,page:1,active:!1,showTitle:b,itemRender:S});var te=Math.max(1,C-B),ne=Math.min(C+B,N);C-1<=B&&(ne=1+B*2),N-C<=B&&(te=N-B*2);for(var F=te;F<=ne;F+=1){var $e=C===F;z.push(t.createElement(Z,{locale:d,rootPrefixCls:a,onClick:this.handleChange,onKeyPress:this.runIfEnter,key:F,page:F,active:$e,showTitle:b,itemRender:S}))}C-1>=B*2&&C!==1+2&&(z[0]=(0,t.cloneElement)(z[0],{className:"".concat(a,"-item-after-jump-prev")}),z.unshift(de)),N-C>=B*2&&C!==N-2&&(z[z.length-1]=(0,t.cloneElement)(z[z.length-1],{className:"".concat(a,"-item-before-jump-next")}),z.push(fe)),te!==1&&z.unshift(he),ne!==N&&z.push(me)}var xe=null;W&&(xe=t.createElement("li",{className:"".concat(a,"-total-text")},W(u,[u===0?0:(C-1)*G+1,C*G>u?u:C*G])));var ae=!this.hasPrev()||!N,re=!this.hasNext()||!N;return t.createElement("ul",(0,y.Z)({className:x()(a,l,(0,h.Z)({},"".concat(a,"-disabled"),r)),style:o,unselectable:"unselectable",ref:this.savePaginationNode},Ce),xe,t.createElement("li",{title:b?d.prev_page:null,onClick:this.prev,tabIndex:ae?null:0,onKeyPress:this.runIfEnterPrev,className:x()("".concat(a,"-prev"),(0,h.Z)({},"".concat(a,"-disabled"),ae)),"aria-disabled":ae},this.renderPrev(ve)),z,t.createElement("li",{title:b?d.next_page:null,onClick:this.next,tabIndex:re?null:0,onKeyPress:this.runIfEnterNext,className:x()("".concat(a,"-next"),(0,h.Z)({},"".concat(a,"-disabled"),re)),"aria-disabled":re},this.renderNext(ge)),t.createElement(be,{disabled:r,locale:d,rootPrefixCls:a,selectComponentClass:w,selectPrefixCls:J,changeSize:this.getShowSizeChanger()?this.changePageSize:null,current:C,pageSize:G,pageSizeOptions:M,quickGo:this.shouldDisplayQuickJumper()?this.handleChange:null,goButton:X}))}}],[{key:"getDerivedStateFromProps",value:function(e,n){var a={};if("current"in e&&(a.current=e.current,e.current!==n.current&&(a.currentInputValue=a.current)),"pageSize"in e&&e.pageSize!==n.pageSize){var l=n.current,o=K(e.pageSize,n,e);l=l>o?o:l,"current"in e||(a.current=l,a.currentInputValue=l),a.pageSize=e.pageSize}return a}}]),f}(t.Component);se.defaultProps={defaultCurrent:1,total:0,defaultPageSize:10,onChange:q,className:"",selectPrefixCls:"rc-select",prefixCls:"rc-pagination",selectComponentClass:null,hideOnSinglePage:!1,showPrevNextJumpers:!0,showQuickJumper:!1,showLessItems:!1,showTitle:!0,onShowSizeChange:q,locale:Ne.Z,style:{},itemRender:ye,totalBoundaryShowSizeChanger:50};var Ie=se,Se=p(62906),Oe=p(67724),ze=p(8812),Te={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"}}]},name:"double-left",theme:"outlined"},Ze=Te,oe=p(27029),ue=function(s,f){return t.createElement(oe.Z,(0,T.Z)((0,T.Z)({},s),{},{ref:f,icon:Ze}))};ue.displayName="DoubleLeftOutlined";var ke=t.forwardRef(ue),Re={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"}}]},name:"double-right",theme:"outlined"},De=Re,ce=function(s,f){return t.createElement(oe.Z,(0,T.Z)((0,T.Z)({},s),{},{ref:f,icon:De}))};ce.displayName="DoubleRightOutlined";var we=t.forwardRef(ce),ee=p(34041),pe=function(s){return t.createElement(ee.Z,(0,y.Z)({size:"small"},s))};pe.Option=ee.Z.Option;var _e=pe,Be=p(42051),Le=p(65632),je=p(25378),Ke=function(m,s){var f={};for(var i in m)Object.prototype.hasOwnProperty.call(m,i)&&s.indexOf(i)<0&&(f[i]=m[i]);if(m!=null&&typeof Object.getOwnPropertySymbols=="function")for(var e=0,i=Object.getOwnPropertySymbols(m);e<i.length;e++)s.indexOf(i[e])<0&&Object.prototype.propertyIsEnumerable.call(m,i[e])&&(f[i[e]]=m[i[e]]);return f},Ve=function(s){var f=s.prefixCls,i=s.selectPrefixCls,e=s.className,n=s.size,a=s.locale,l=s.selectComponentClass,o=Ke(s,["prefixCls","selectPrefixCls","className","size","locale","selectComponentClass"]),r=(0,je.Z)(),c=r.xs,u=t.useContext(Le.E_),d=u.getPrefixCls,O=u.direction,I=d("pagination",f),b=function(){var S=t.createElement("span",{className:"".concat(I,"-item-ellipsis")},"\u2022\u2022\u2022"),D=t.createElement("button",{className:"".concat(I,"-item-link"),type:"button",tabIndex:-1},t.createElement(Oe.Z,null)),k=t.createElement("button",{className:"".concat(I,"-item-link"),type:"button",tabIndex:-1},t.createElement(ze.Z,null)),R=t.createElement("a",{className:"".concat(I,"-item-link")},t.createElement("div",{className:"".concat(I,"-item-container")},t.createElement(ke,{className:"".concat(I,"-item-link-icon")}),S)),w=t.createElement("a",{className:"".concat(I,"-item-link")},t.createElement("div",{className:"".concat(I,"-item-container")},t.createElement(we,{className:"".concat(I,"-item-link-icon")}),S));if(O==="rtl"){var J=[k,D];D=J[0],k=J[1];var M=[w,R];R=M[0],w=M[1]}return{prevIcon:D,nextIcon:k,jumpPrevIcon:R,jumpNextIcon:w}},W=function(S){var D=(0,y.Z)((0,y.Z)({},S),a),k=n==="small"||!!(c&&!n&&o.responsive),R=d("select",i),w=x()((0,h.Z)({mini:k},"".concat(I,"-rtl"),O==="rtl"),e);return t.createElement(Ie,(0,y.Z)({},b(),o,{prefixCls:I,selectPrefixCls:R,className:w,selectComponentClass:l||(k?_e:ee.Z),locale:D}))};return t.createElement(Be.Z,{componentName:"Pagination",defaultLocale:Se.Z},W)},Me=Ve,Ae=Me},14781:function(Y,L,p){"use strict";var h=p(38663),y=p.n(h),t=p(62259),T=p.n(t),v=p(43358)},74204:function(Y,L,p){"use strict";p.d(L,{Z:function(){return y},o:function(){return T}});var h;function y(v){if(typeof document=="undefined")return 0;if(v||h===void 0){var g=document.createElement("div");g.style.width="100%",g.style.height="200px";var P=document.createElement("div"),E=P.style;E.position="absolute",E.top="0",E.left="0",E.pointerEvents="none",E.visibility="hidden",E.width="200px",E.height="150px",E.overflow="hidden",P.appendChild(g),document.body.appendChild(P);var _=g.offsetWidth;P.style.overflow="scroll";var x=g.offsetWidth;_===x&&(x=P.clientWidth),document.body.removeChild(P),h=_-x}return h}function t(v){var g=v.match(/^(.*)px$/),P=Number(g==null?void 0:g[1]);return Number.isNaN(P)?y():P}function T(v){if(typeof document=="undefined"||!v||!(v instanceof Element))return{width:0,height:0};var g=getComputedStyle(v,"::-webkit-scrollbar"),P=g.width,E=g.height;return{width:t(P),height:t(E)}}}}]);
