(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[322],{64322:function(se,Q,$){"use strict";$.d(Q,{gu:function(){return x},Gd:function(){return z},$L:function(){return le}});var H=$(86582),F=$(91220),Z=$(3182),ie=$(34792),E=$(48086),O=$(2824),X=$(94043),i=$.n(X),N=$(48971),L=$(37071),R=$(81139),W=localStorage.getItem("basePath"),K=new R.VK(W?{basePath:W}:void 0),j=new R.U(K),Y=new R.sD(K),q=new R.W6(K),G=new R.Cl(K),J=new R.vb(K),x=function(f){return JSON.parse(JSON.stringify(f))};function oe(M){return M&&(M.toLowerCase().replace(/([-_][a-z])/g,function(f){return f.toUpperCase().replace("-","").replace("_","")}),M)}var V=function(f,_,d){if(!!d){for(var l=0;l<_.length;l++)if(f[d]==_[l][d])return l}},ee=function(f){var _=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[.1,3],d=f(1),l=(0,O.Z)(d,2),A=l[0],U=l[1],k=function(p){var m=A;m+=p,m<_[0]&&(m=_[0],E.default.error("Smallest scale is "+_[0])),m>_[1]&&(m=_[1],E.default.error("Largest scale is "+_[1])),U(m)};return{curr:A,change:k}},z=function(f){var _=f([]),d=(0,O.Z)(_,2),l=d[0],A=d[1],U=f(),k=(0,O.Z)(U,2),o=k[0],p=k[1],m=function(){var c=(0,Z.Z)(i().mark(function a(){var t;return i().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,j.getAll();case 3:return t=e.sent,A(t),e.abrupt("return",t);case 8:e.prev=8,e.t0=e.catch(0),console.log("project getAll err",e.t0),L.Z.parseError(e.t0,E.default);case 12:case"end":return e.stop()}},a,null,[[0,8]])}));return function(){return c.apply(this,arguments)}}(),D=function(){var c=(0,Z.Z)(i().mark(function a(t){var n;return i().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:if(t!=null){r.next=2;break}return r.abrupt("return",void 0);case 2:if(!(l.length>1)){r.next=5;break}return E.default.error("Currently have multiple projects stored, use turnTo instead"),r.abrupt("return");case 5:return r.next=7,j.get(t);case 7:return n=r.sent,A([n]),p(0),r.abrupt("return",n);case 11:case"end":return r.stop()}},a)}));return function(t){return c.apply(this,arguments)}}(),P=function(){var c=(0,Z.Z)(i().mark(function a(t){return i().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log("remove project",t),typeof t!="number"){e.next=6;break}return e.next=4,j.remove(t);case 4:e.next=8;break;case 6:return e.next=8,j.remove(t.projectId);case 8:m();case 9:case"end":return e.stop()}},a)}));return function(t){return c.apply(this,arguments)}}(),T=function(){var c=(0,Z.Z)(i().mark(function a(t){var n;return i().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,j.create(t);case 3:return n=r.sent,console.log(n),r.abrupt("return",n);case 8:r.prev=8,r.t0=r.catch(0),console.log("project create err",r.t0),L.Z.parseError(r.t0,E.default);case 12:case"end":return r.stop()}},a,null,[[0,8]])}));return function(t){return c.apply(this,arguments)}}(),v=function(){var c=(0,Z.Z)(i().mark(function a(t,n){return i().wrap(function(r){for(;;)switch(r.prev=r.next){case 0:j.update(t,n).then(function(h){console.log("project update res",h)}).catch(function(h){console.log("project update err ",h),L.Z.parseError(h,E.default)});case 1:case"end":return r.stop()}},a)}));return function(t,n){return c.apply(this,arguments)}}();return{all:l,getAll:m,getCurr:D,remove:P,create:T,update:v,get curr(){if(o!=null)return l[o]}}},re=function(f,_){var d=_.oneHot,l=d===void 0?!0:d,A=_.postSetCurr,U=f(),k=(0,O.Z)(U,2),o=k[0],p=k[1],m=f(),D=(0,O.Z)(m,2),P=D[0],T=D[1],v=f(l),c=(0,O.Z)(v,2),a=c[0],t=c[1],n=function(){var C=(0,Z.Z)(i().mark(function u(g){var I,w,y,B;return i().wrap(function(S){for(;;)switch(S.prev=S.next){case 0:return S.prev=0,S.next=3,j.getLabels(g);case 3:I=S.sent,w=(0,F.Z)(I);try{for(w.s();!(y=w.n()).done;)B=y.value,B.active=!1}catch(ue){w.e(ue)}finally{w.f()}return p(I),S.abrupt("return",I);case 10:S.prev=10,S.t0=S.catch(0),console.log("label getall err ",S.t0),L.Z.parseError(S.t0,E.default);case 14:case"end":return S.stop()}},u,null,[[0,10]])}));return function(g){return C.apply(this,arguments)}}(),e=function(u){var g=u;if(typeof u!="number"&&(g=V(u,o,"labelId")),T(g),console.log("onehot",a),a){var I=(0,F.Z)(o),w;try{for(I.s();!(w=I.n()).done;){var y=w.value;y.active=!1}}catch(B){I.e(B)}finally{I.f()}o[g].active=!0,console.log("all",o)}else o[g].active=!o[g].active;A&&A(o[g]),p((0,H.Z)(o))},r=function(){var C=(0,Z.Z)(i().mark(function u(g){var I;return i().wrap(function(y){for(;;)switch(y.prev=y.next){case 0:return y.prev=0,y.next=3,J.create(g);case 3:return I=y.sent,I.active=!1,p([].concat((0,H.Z)(o),[I])),y.abrupt("return",I);case 9:y.prev=9,y.t0=y.catch(0),console.log("label create err",y.t0),L.Z.parseError(y.t0,E.default);case 13:case"end":return y.stop()}},u,null,[[0,9]])}));return function(g){return C.apply(this,arguments)}}(),h=function(){var C=(0,Z.Z)(i().mark(function u(g){return i().wrap(function(w){for(;;)switch(w.prev=w.next){case 0:return console.log("remove label",g),w.prev=1,w.next=4,J.remove(g.labelId);case 4:p(o.filter(function(y){return y.labelId!=g.labelId})),w.next=11;break;case 7:w.prev=7,w.t0=w.catch(1),console.log("label remove err",w.t0),L.Z.parseError(w.t0,E.default);case 11:case"end":return w.stop()}},u,null,[[1,7]])}));return function(g){return C.apply(this,arguments)}}(),s=function(){},b=function(){t(!a)};return{all:o,getAll:n,setAll:p,setCurr:e,create:r,remove:h,onModify:s,toggleOneHot:b,get curr(){if(P!=null)return o[P]}}},ae=function(f){var _=f(),d=(0,O.Z)(_,2),l=d[0],A=d[1],U=f(),k=(0,O.Z)(U,2),o=k[0],p=k[1],m=f(),D=(0,O.Z)(m,2),P=D[0],T=D[1],v=function(r){if(r<0){E.default.error("This is the first image. No previous image.");return}if(r==l.length){E.default.error("This is the final image. No next image.");return}console.log("turning to",r),p(r)},c=function(){var e=(0,Z.Z)(i().mark(function r(h,s){var b;return i().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.prev=0,u.next=3,j.getTasks(h);case 3:if(b=u.sent,A(b),s==null){u.next=9;break}return console.log("getall turnto"),v(s),u.abrupt("return",[b,b[s]]);case 9:return u.abrupt("return",b);case 12:u.prev=12,u.t0=u.catch(0),console.log("task getall err ",u.t0),L.Z.parseError(u.t0,E.default);case 16:case"end":return u.stop()}},r,null,[[0,12]])}));return function(h,s){return e.apply(this,arguments)}}(),a=function(){var e=(0,Z.Z)(i().mark(function r(h){var s,b;return i().wrap(function(u){for(;;)switch(u.prev=u.next){case 0:return u.prev=0,u.next=3,j.getProgress(h);case 3:return s=u.sent,b=Math.ceil(s.finished/s.total*100),console.log("progress",s,b),T(b),u.abrupt("return",b);case 10:return u.prev=10,u.t0=u.catch(0),console.log("get progress err",u.t0),L.Z.parseError(u.t0,E.default),u.abrupt("return",0);case 15:case"end":return u.stop()}},r,null,[[0,10]])}));return function(h){return e.apply(this,arguments)}}(),t=function(){var e=(0,Z.Z)(i().mark(function r(){return i().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:v(o+1),console.log("all tasks",l);case 2:case"end":return s.stop()}},r)}));return function(){return e.apply(this,arguments)}}(),n=function(){var e=(0,Z.Z)(i().mark(function r(){return i().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:v(o-1);case 1:case"end":return s.stop()}},r)}));return function(){return e.apply(this,arguments)}}();return{currIdx:o,all:l,turnTo:v,getAll:c,getProgress:a,progress:P,nextTask:t,prevTask:n,get curr(){if(!(o==null||l==null))return console.log("task.curr",l[o]),l[o]},get finished(){return Math.floor((l==null?void 0:l.length)*P/100)}}},ne=function(f){var _=f(),d=(0,O.Z)(_,2),l=d[0],A=d[1],U=f(),k=(0,O.Z)(U,2),o=k[0],p=k[1],m=function(){var v=(0,Z.Z)(i().mark(function c(a){var t,n,e,r;return i().wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,q.getAnnotations(a);case 3:t=s.sent,n=(0,F.Z)(t);try{for(n.s();!(e=n.n()).done;)r=e.value,r.active=!1}catch(b){n.e(b)}finally{n.f()}return s.next=8,A(t);case 8:return s.abrupt("return",t);case 11:s.prev=11,s.t0=s.catch(0),console.log("ann getAll err",s.t0),L.Z.parseError(s.t0,E.default);case 15:case"end":return s.stop()}},c,null,[[0,11]])}));return function(a){return v.apply(this,arguments)}}(),D=function(){var v=(0,Z.Z)(i().mark(function c(a){var t;return i().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("create",a),e.prev=1,e.next=4,G.create(a);case 4:return t=e.sent,m(a.dataId),e.abrupt("return",t);case 9:e.prev=9,e.t0=e.catch(1),console.log("annotation create err",e.t0),L.Z.parseError(e.t0,E.default);case 13:case"end":return e.stop()}},c,null,[[1,9]])}));return function(a){return v.apply(this,arguments)}}(),P=function(){var v=(0,Z.Z)(i().mark(function c(a){var t;return i().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=a,console.log("typeof",typeof a),typeof a!="number"&&(t=a.annotationId),e.prev=3,e.next=6,G.remove(t);case 6:A(l.filter(function(r){return r.annotationId!=a.annotationId})),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(3),console.log("annotation remove err",e.t0),L.Z.parseError(e.t0,E.default);case 13:case"end":return e.stop()}},c,null,[[3,9]])}));return function(a){return v.apply(this,arguments)}}(),T=function(){var v=(0,Z.Z)(i().mark(function c(a){var t,n,e,r,h;return i().wrap(function(b){for(;;)switch(b.prev=b.next){case 0:console.log("annotation onselect",a),a==null&&p(void 0),t=(0,F.Z)(l);try{for(t.s();!(n=t.n()).done;)e=n.value,e.active=!1}catch(C){t.e(C)}finally{t.f()}r=l.filter(function(C){return C.annotationId==a.annotationId})[0],r.active=!a.active,h=V(r,l,"annotationId"),p(h),label.setCurr(a.labelId),A((0,H.Z)(l));case 10:case"end":return b.stop()}},c)}));return function(a){return v.apply(this,arguments)}}();return{all:l,getAll:m,create:D,remove:P,setCurr:T,get curr(){if(!!l)return l[o]}}},te=function(f){var _=f(),d=(0,O.Z)(_,2),l=d[0],A=d[1],U=f([]),k=(0,O.Z)(U,2),o=k[0],p=k[1],m=function(){var P=(0,Z.Z)(i().mark(function T(v){return i().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:A(v);case 1:case"end":return a.stop()}},T)}));return function(v){return P.apply(this,arguments)}}(),D=function(){var P=(0,Z.Z)(i().mark(function T(v,c){var a;return i().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,Y.getDatas(v);case 3:if(a=n.sent,p(a),c==null){n.next=8;break}return m(c),n.abrupt("return",[a,a[c]]);case 8:return n.abrupt("return",a);case 11:n.prev=11,n.t0=n.catch(0),console.log("data getall err ",n.t0),L.Z.parseError(n.t0,E.default);case 15:case"end":return n.stop()}},T,null,[[0,11]])}));return function(v,c){return P.apply(this,arguments)}}();return{all:o,getAll:D,turnTo:m,get curr(){if(!(l==null||o==null))return o[l]},get imgSrc(){if(o&&o[l])return console.log("imgsrc","".concat(W,"/datas/").concat(o[l].dataId,"/image?sault=").concat(o[l].sault)),"".concat(W,"/datas/").concat(o[l].dataId,"/image?sault=").concat(o[l].sault)}}},le=function(f,_){var d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};d.effectTrigger||(d.effectTrigger={});var l=f(!1),A=(0,O.Z)(l,2),U=A[0],k=A[1],o=ee(f),p=ae(f),m=te(f),D=z(f),P=re(f,d.label),T=ne(f);return _(function(){var v=L.Z.getQueryVariable("projectId");if(v==null){N.m8.push("/");return}D.getCurr(v).catch(function(c){L.Z.parseError(c,E.default),N.m8.push("/")}),P.getAll(v),p.getAll(v),p.getProgress(v)},[]),_(function(){p.all&&p.all.length!=0&&p.turnTo(0)},[p.all]),_(function(){if(p.currIdx!=null){var v=function(){var c=(0,Z.Z)(i().mark(function a(){var t,n,e,r,h,s,b,C;return i().wrap(function(g){for(;;)switch(g.prev=g.next){case 0:return console.log("onTaskChange",p.curr,P.all,p.progress),p.getProgress(p.curr.projectId),g.next=4,m.getAll(p.curr.taskId,0);case 4:return t=g.sent,n=(0,O.Z)(t,2),e=n[0],r=n[1],console.log(e),g.next=11,T.getAll(r.dataId);case 11:if(h=g.sent,P.all){s=(0,F.Z)(P.all);try{for(s.s();!(b=s.n()).done;)C=b.value,C.active=!1}catch(I){s.e(I)}finally{s.f()}}d.effectTrigger.postTaskChange&&d.effectTrigger.postTaskChange(P.all,h),k(!1);case 15:case"end":return g.stop()}},a)}));return function(){return c.apply(this,arguments)}}();v()}},[p.currIdx]),[U,k,o,T,p,m,D,P]}}}]);
