(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[333,540],{32495:function(u){u.exports={listItem:"listItem___1MXXF",eye:"eye___3nddM",delete:"delete___y9u-D",roundBall:"roundBall___DMczd",popover:"popover___E0HLD",annotationId:"annotationId___1ks8N",labelName:"labelName___130ie",listItemActive:"listItemActive___1rNB-"}},38670:function(u){u.exports={labelList:"labelList___3uLRO",listHeader:"listHeader___1ZPcO",eye:"eye___2yUvw",roundBall:"roundBall___1xKCU"}},72869:function(u){u.exports={map:"map___92VPN",customControlIcon:"customControlIcon___3Ki2y"}},20474:function(u){u.exports={RSPop1:"RSPop1___vz5Me",RSPop2:"RSPop2___34pQA"}},87610:function(u){u.exports={RSPop1:"RSPop1___1iBEf",RSPop2:"RSPop2___1W841",RSPop3:"RSPop3___1Whcp"}},55252:function(u){u.exports={RSPop1:"RSPop1___17x8k",RSPop2:"RSPop2___27kK5"}},75513:function(u){u.exports={segment:"segment___3WmPw",mainStage:"mainStage___2kT1s",draw:"draw___Ff0QW",pblock:"pblock___3sGxC",progress:"progress___KQyBx",rightSideBar:"rightSideBar___11FX3",determinOutline:"determinOutline___1g1YI"}},51327:function(u,T,e){"use strict";e.d(T,{Z:function(){return G}});var w=e(54421),P=e(38272),q=e(57663),h=e(71577),ee=e(67294),Z=e(38670),b=e.n(Z),f=e(49111),X=e(19650),d=e(11849),i=e(32495),r=e.n(i),U=e(63097),a=e(85893),C=function(t){var E=(0,d.Z)({},t.annotation),x=!1,O=(0,a.jsxs)(P.ZP.Item,{className:"".concat(r().listItem," ").concat(t.active?r().listItemActive:""),unselectable:"on",onClick:function(){t.onClick(E)},children:[(0,a.jsxs)(X.Z,{align:"center",size:5,children:[(0,a.jsx)("a",{className:r().eye,style:{backgroundImage:x?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(){t.onAnnotationModify(E)}})," ",(0,a.jsx)("span",{className:r().annotationId,children:E.properties.annotationId}),(0,a.jsx)("span",{className:r().labelName,children:E.properties.labelName}),(0,a.jsx)(U.Z,{color:E.properties.stroke})]}),(0,a.jsx)("a",{className:r().delete,onClick:function(){t.onAnnotationDelete(E)}})]});return O},m=C,W=e(48971),c=function(t){var E=(0,W.YB)().formatMessage({id:"component.PPAnnotationList.annotationList"}),x=(0,W.YB)().formatMessage({id:"component.PPAnnotationList.addAnnotation"});return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(P.ZP,{className:b().labelList,size:"large",header:(0,a.jsx)("div",{className:b().listHeader,children:E}),bordered:!0,dataSource:t.annotations.features,renderItem:function(p){return(0,a.jsx)(m,{onClick:t.onAnnotationSelect,annotation:p,active:!1,onAnnotationDelete:t.onAnnotationDelete,onAnnotationModify:t.onAnnotationModify})},footer:(0,a.jsx)("div",{children:(0,a.jsx)(h.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){t.onAnnotationSelect(void 0)},block:!0,children:x})})})})},G=c},37233:function(u,T,e){"use strict";e.d(T,{Z:function(){return m}});var w=e(67294),P=e(11849),q=e(93224),h=e(41004),ee=e(72869),Z=e.n(ee),b=e(74607),f=e(85893),X=function(c){var G=c.children,D=c.leafletMapRef,t=c.displayTools,E=(0,q.Z)(c,["children","leafletMapRef","displayTools"]);return w.useEffect(function(){if(D.current){var x=D.current.leafletElement;x.pm.addControls({drawMarker:!1,drawCircle:!1,drawCircleMarker:!1,drawPolyline:!1,drawRectangle:!1,drawPolygon:!1,editMode:!1,dragMode:!1,cutPolygon:!0,rotateMode:!1,removalMode:!1}),x.pm.setGlobalOptions({pmIgnore:!1}),c.displayTools&&x.pm.Toolbar.createCustomControl({name:"StoreShapes",title:"Store all shapes",block:"custom",className:Z().customControlIcon,toggle:!1,afterClick:function(){var p=JSON.stringify(x.pm.getGeomanDrawLayers(!0).toGeoJSON()),oe="data.geojson",j=document.createElement("a");j.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(p)),j.setAttribute("download",oe),j.style.display="none",document.body.appendChild(j),j.click(),console.log(p)}}),x.on("pm:create",function(O){c.onShapeCreate(O)}),x.on("pm:edit",function(O){c.onShapeEdit(O)})}},[]),(0,f.jsx)(h.Z,(0,P.Z)((0,P.Z)({ref:D},E),{},{children:G}))},d=X,i=e(88014),r=e(16072),U=e(18836),a={lat:0,lng:0,zoom:2},C=function(c){var G=[a.lat,a.lng];return(0,f.jsx)(d,{leafletMapRef:c.leafletMapRef,displayTools:c.displayTools,className:Z().map,center:G,zoom:a.zoom,onShapeCreate:c.onShapeCreate,onShapeEdit:c.onShapeEdit,zoomControl:!1,children:(0,f.jsxs)(i.Z,{position:"topright",children:[(0,f.jsx)(i.Z.BaseLayer,{checked:!0,name:"TianDiTu.Vector",children:(0,f.jsxs)(r.Z,{attribution:'\xA9 <a href="https://www.tianditu.gov.cn/">TianDiTu</a> GS(2021)3715',children:[(0,f.jsx)(U.Z,{url:"https://t2.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=8e879a4cad078fd3ce7456f2737fc4cc"}),(0,f.jsx)(U.Z,{url:"https://t2.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=8e879a4cad078fd3ce7456f2737fc4cc"})]})}),(0,f.jsx)(i.Z.Overlay,{name:"Esri.WorldImagery",children:(0,f.jsx)(U.Z,{attribution:"Tiles \xA9 Esri \u2014 Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})})]})})},m=C},49813:function(u,T,e){"use strict";var w=e(47673),P=e(24044),q=e(13062),h=e(71230),ee=e(59250),Z=e(13013),b=e(57663),f=e(71577),X=e(89032),d=e(15746),i=e(30887),r=e(54689),U=e(34792),a=e(48086),C=e(89366),m=e(57254),W=e(20474),c=e.n(W),G=e(67294),D=e(48971),t=e(85893);function E(p){a.default.info("Click on menu item."),console.log("click",p)}var x=(0,t.jsxs)(r.Z,{onClick:E,children:[(0,t.jsx)(r.Z.Item,{icon:(0,t.jsx)(C.Z,{}),children:"1st menu item"},"1"),(0,t.jsx)(r.Z.Item,{icon:(0,t.jsx)(C.Z,{}),children:"2nd menu item"},"2"),(0,t.jsx)(r.Z.Item,{icon:(0,t.jsx)(C.Z,{}),children:"3rd menu item"},"3")]}),O=function(){var oe=(0,D.YB)().formatMessage({id:"component.PPRS.pdParameter"}),j=(0,D.YB)().formatMessage({id:"component.PPRS.simplifiedDistance"}),he=(0,D.YB)().formatMessage({id:"component.PPRS.simplifiedAngle"}),F=(0,D.YB)().formatMessage({id:"component.PPRS.threshold"});return(0,t.jsxs)("div",{children:[(0,t.jsxs)(h.Z,{children:[(0,t.jsx)(d.Z,{span:12,className:c().RSPop1,children:(0,t.jsx)("span",{children:oe})}),(0,t.jsx)(d.Z,{span:12,className:c().RSPop2,children:(0,t.jsx)(Z.Z,{overlay:x,children:(0,t.jsxs)(f.Z,{style:{width:"100%"},children:["Dropdown ",(0,t.jsx)(m.Z,{})]})})})]}),(0,t.jsxs)(h.Z,{children:[(0,t.jsx)(d.Z,{span:12,className:c().RSPop1,children:(0,t.jsx)("span",{children:j})}),(0,t.jsx)(d.Z,{span:12,className:c().RSPop2,children:(0,t.jsx)(P.Z,{placeholder:"Basic usage"})})]}),(0,t.jsxs)(h.Z,{children:[(0,t.jsx)(d.Z,{span:12,className:c().RSPop1,children:(0,t.jsx)("span",{children:he})}),(0,t.jsx)(d.Z,{span:12,className:c().RSPop2,children:(0,t.jsx)(P.Z,{placeholder:"Basic usage"})})]}),(0,t.jsxs)(h.Z,{children:[(0,t.jsx)(d.Z,{span:12,className:c().RSPop1,children:(0,t.jsx)("span",{children:F})}),(0,t.jsx)(d.Z,{span:12,className:c().RSPop2,children:(0,t.jsx)(P.Z,{placeholder:"Basic usage"})})]})]})};T.Z=O},97927:function(u,T,e){"use strict";var w=e(13062),P=e(71230),q=e(47673),h=e(24044),ee=e(89032),Z=e(15746),b=e(87610),f=e.n(b),X=e(67294),d=e(48971),i=e(85893),r=function(){var a=(0,d.YB)().formatMessage({id:"component.PPRS.gridSize"}),C=(0,d.YB)().formatMessage({id:"component.PPRS.overlap"}),m=(0,d.YB)().formatMessage({id:"component.PPRS.completed"},{show:1,total:16});return(0,i.jsxs)("div",{children:[(0,i.jsxs)(P.Z,{children:[(0,i.jsx)(Z.Z,{span:12,className:f().RSPop1,children:(0,i.jsx)("span",{children:a})}),(0,i.jsx)(Z.Z,{span:12,className:f().RSPop2,children:(0,i.jsx)(h.Z,{placeholder:"Basic usage"})})]}),(0,i.jsxs)(P.Z,{children:[(0,i.jsx)(Z.Z,{span:12,className:f().RSPop1,children:(0,i.jsx)("span",{children:C})}),(0,i.jsx)(Z.Z,{span:12,className:f().RSPop2,children:(0,i.jsx)(h.Z,{placeholder:"Basic usage"})})]}),(0,i.jsx)(P.Z,{children:(0,i.jsx)("span",{className:f().RSPop3,children:m})})]})};T.Z=r},47712:function(u,T,e){"use strict";e.r(T),e.d(T,{default:function(){return Ce}});var w=e(34669),P=e(54458),q=e(20136),h=e(55241),ee=e(49111),Z=e(19650),b=e(62350),f=e(75443),X=e(57663),d=e(71577),i=e(2824),r=e(67294),U=e(75513),a=e.n(U),C=e(8088),m=e(61541),W=e(44434),c=e(5041),G=e(49813),D=e(98858),t=e(4914),E=e(13062),x=e(71230),O=e(59250),p=e(13013),oe=e(89032),j=e(15746),he=e(30887),F=e(54689),Oe=e(34792),Pe=e(48086),ie=e(89366),re=e(57254),ge=e(55252),Q=e.n(ge),I=e(48971),n=e(85893);function xe(v){Pe.default.info("Click on menu item."),console.log("click",v)}var ce=(0,n.jsxs)(F.Z,{onClick:xe,children:[(0,n.jsx)(F.Z.Item,{icon:(0,n.jsx)(ie.Z,{}),children:"band_1"},"1"),(0,n.jsx)(F.Z.Item,{icon:(0,n.jsx)(ie.Z,{}),children:"band_2"},"2"),(0,n.jsx)(F.Z.Item,{icon:(0,n.jsx)(ie.Z,{}),children:"band_3"},"3")]}),pe=function(){var ne=(0,I.YB)().formatMessage({id:"component.PPRS.r"}),Y=(0,I.YB)().formatMessage({id:"component.PPRS.g"}),A=(0,I.YB)().formatMessage({id:"component.PPRS.b"}),K=(0,I.YB)().formatMessage({id:"component.PPRS.dataInformation"}),te=(0,I.YB)().formatMessage({id:"component.PPRS.fileName"}),J=(0,I.YB)().formatMessage({id:"component.PPRS.row"}),z=(0,I.YB)().formatMessage({id:"component.PPRS.column"}),R=(0,I.YB)().formatMessage({id:"component.PPRS.bands"}),y=(0,I.YB)().formatMessage({id:"component.PPRS.dataType"}),$=(0,I.YB)().formatMessage({id:"component.PPRS.EPSG"}),k=(0,I.YB)().formatMessage({id:"component.PPRS.unit"});return(0,n.jsxs)("div",{children:[(0,n.jsxs)(x.Z,{children:[(0,n.jsx)(j.Z,{className:Q().RSPop1,children:(0,n.jsx)("span",{children:ne})}),(0,n.jsx)(j.Z,{className:Q().RSPop2,children:(0,n.jsx)(p.Z,{overlay:ce,children:(0,n.jsxs)(d.Z,{style:{width:"100%"},children:["Band ",(0,n.jsx)(re.Z,{})]})})}),(0,n.jsx)(j.Z,{className:Q().RSPop1,children:(0,n.jsx)("span",{children:Y})}),(0,n.jsx)(j.Z,{className:Q().RSPop2,children:(0,n.jsx)(p.Z,{overlay:ce,children:(0,n.jsxs)(d.Z,{style:{width:"100%"},children:["Band ",(0,n.jsx)(re.Z,{})]})})}),(0,n.jsx)(j.Z,{className:Q().RSPop1,children:(0,n.jsx)("span",{children:A})}),(0,n.jsx)(j.Z,{className:Q().RSPop2,children:(0,n.jsx)(p.Z,{overlay:ce,children:(0,n.jsxs)(d.Z,{style:{width:"100%"},children:["Band ",(0,n.jsx)(re.Z,{})]})})})]}),(0,n.jsxs)(t.Z,{title:K,column:1,bordered:!0,children:[(0,n.jsx)(t.Z.Item,{label:te,children:"A/XXX.tif"}),(0,n.jsx)(t.Z.Item,{label:J,children:"1234"}),(0,n.jsx)(t.Z.Item,{label:z,children:"897"}),(0,n.jsx)(t.Z.Item,{label:R,children:"7"}),(0,n.jsx)(t.Z.Item,{label:y,children:"UInt16"}),(0,n.jsx)(t.Z.Item,{label:$,children:"7030"}),(0,n.jsx)(t.Z.Item,{label:k,children:"m"})]})]})},je=pe,ye=e(97927),Me=e(37233),Ze=e(51327),Se=e(11849);function Ee(v){var ne=(0,r.useState)(0),Y=(0,i.Z)(ne,2),A=Y[0],K=Y[1],te=(0,r.useState)(!1),J=(0,i.Z)(te,2),z=J[0],R=J[1];(0,r.useEffect)(function(){localStorage.setItem("currentLabel",JSON.stringify(v.currentLabel||{}))},[v.currentLabel]),(0,r.useEffect)(function(){localStorage.setItem("annotations",JSON.stringify(v.annotations||{}))},[v.annotations]);var y=function(){var o,L=(o=v.leafletMapRef.current)===null||o===void 0?void 0:o.leafletElement.pm.globalDrawModeEnabled();console.log(L)},$=function(o){var L=localStorage.getItem("currentLabel");if(L!="{}"){var B,_;R(!0);var N=JSON.parse(L||"{}");(B=v.leafletMapRef.current)===null||B===void 0||B.leafletElement.pm.enableDraw(o),(_=v.leafletMapRef.current)===null||_===void 0||_.leafletElement.pm.setPathOptions({color:N==null?void 0:N.color,fillColor:N==null?void 0:N.color,fillOpacity:.4})}else{var ue;alert("Test"),(ue=v.leafletMapRef.current)===null||ue===void 0||ue.leafletElement.pm.disableDraw(o),R(!1)}},k=function(o){var L;(L=v.leafletMapRef.current)===null||L===void 0||L.leafletElement.pm.disableDraw(o),R(!1),y()},H=function(){var o;return(o=v.leafletMapRef.current)===null||o===void 0?void 0:o.leafletElement.pm.Draw.getActiveShape()},le=function(){if(H()=="Polygon"){var o;(o=v.leafletMapRef.current)===null||o===void 0||o.leafletElement.pm.Draw.Polygon._removeLastVertex(),y()}else y(),R(!1)},me=function(){var o;(o=v.leafletMapRef.current)===null||o===void 0||o.leafletElement.pm.toggleGlobalDragMode(),y()},ve=function(){if(H()=="Polygon"){var o;(o=v.leafletMapRef.current)===null||o===void 0||o.leafletElement.pm.Draw.Polygon._finishShape(),y(),R(!1)}else y(),R(!1)},se=function(){var o;(o=v.leafletMapRef.current)===null||o===void 0||o.leafletElement.pm.enableGlobalRemovalMode(),y()},S=function(){var o;(o=v.leafletMapRef.current)===null||o===void 0||o.leafletElement.pm.toggleGlobalEditMode(),y(),R(!1)},s=function(){R(!1)},M=function(o){var L=o.toGeoJSON(),B=JSON.parse(localStorage.getItem("currentLabel")||"{}");K(A+1),L.properties={labelName:B==null?void 0:B.name,stroke:B==null?void 0:B.color,annotationId:A+1};var _=JSON.parse(localStorage.getItem("annotations")||"{}"),N=(0,Se.Z)((0,Se.Z)({},_),{},{features:_.features.concat(L)});console.log(N),v.setAnnotations(N),v.recordHistory(N)};function l(g){R(!1),M(g.layer)}var V=function(o){console.log(o)},fe=function(){var o;(o=v.leafletMapRef.current)===null||o===void 0||o.leafletElement.zoomIn(),y()},De=function(){var o;(o=v.leafletMapRef.current)===null||o===void 0||o.leafletElement.zoomOut(),y()};return{polyVisable:z,RSDraw:$,RSDrawDisable:k,removeLastVertex:le,moveShape:me,finishShape:ve,removeShape:se,editMode:S,saveGeoJson:s,storeOnDb:M,onShapeCreate:l,onShapeEdit:V,toolZoomIn:fe,toolZoomOut:De,currentShape:H}}var de=e(27992),ae=e(86089),Re=function(){var ne=(0,r.useState)(void 0),Y=(0,i.Z)(ne,2),A=Y[0],K=Y[1],te=(0,r.useState)(),J=(0,i.Z)(te,2),z=J[0],R=J[1],y=(0,r.useState)({type:"FeatureCollection",features:[]}),$=(0,i.Z)(y,2),k=$[0],H=$[1];(0,r.useEffect)(function(){localStorage.removeItem("history"),le({type:"FeatureCollection",features:[]})},[]);function le(s){var M=localStorage.getItem("history"),l=M?JSON.parse(M):{index:-1,items:[]};if(JSON.stringify(l.items[l.index])!=JSON.stringify(s)){var V=l.index>ae.MOST_HISTORY_STEPS?l.index-ae.MOST_HISTORY_STEPS:0,fe=l.items.splice(V,l.index==0?1:l.index+1);l.items=fe.concat([s]),l.index<=ae.MOST_HISTORY_STEPS?l.index++:l.index=ae.MOST_HISTORY_STEPS+1,localStorage.setItem("history",JSON.stringify(l))}}var me=function(){var M=localStorage.getItem("history");if(!!M){var l=JSON.parse(M);if(!!l&&!(l.index>=l.items.length-1)){l.index++,localStorage.setItem("history",JSON.stringify(l));var V=l.items[l.index];H(V)}}},ve=function(){var M=localStorage.getItem("history");if(!!M){var l=JSON.parse(M);if(!(!l||!l.index)&&!(l.index<=0)){l.index--,localStorage.setItem("history",JSON.stringify(l));var V=l.items[l.index];H(V)}}};console.log("rs is re-rendering! currentLabel: ".concat(JSON.stringify(z)));var se=r.useRef(null),S=Ee({leafletMapRef:se,currentLabel:z,setAnnotations:H,annotations:k,recordHistory:le});return(0,n.jsxs)(C.Z,{className:a().segment,children:[(0,n.jsxs)(W.Z,{children:[(0,n.jsx)(h.Z,{placement:"rightTop",visible:S.polyVisable,content:(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(Z.Z,{children:[(0,n.jsx)(d.Z,{type:"primary",onClick:function(){S.finishShape()},children:"Finish"}),(0,n.jsx)(d.Z,{type:"primary",onClick:function(){S.removeLastVertex()},children:"Remove Last Vertex"}),(0,n.jsx)(f.Z,{title:"Are you sure cancel this task?",okText:"Yes",cancelText:"No",children:(0,n.jsx)(d.Z,{type:"primary",onClick:function(){S.RSDrawDisable(S.currentShape())},children:"Cancel"})})]})}),trigger:A=="Polygon"?"hover":"click",children:(0,n.jsx)(m.Z,{active:A=="Polygon",imgSrc:"./pics/buttons/polygon.png",onClick:function(){K("Polygon"),S.RSDraw("Polygon")},children:"Polygon"})}),(0,n.jsx)(m.Z,{onClick:function(){S.editMode()},imgSrc:"./pics/buttons/edit.png",children:"Edit"}),(0,n.jsxs)(h.Z,{placement:"rightTop",title:"title",content:"content",trigger:A=="rubber"?"hover":"click",children:[" ",(0,n.jsx)(m.Z,{imgSrc:"./pics/buttons/rubber.png",onClick:function(){S.removeShape()},children:"Rubber"})]}),(0,n.jsx)(m.Z,{onClick:function(){S.toolZoomIn()},imgSrc:"./pics/buttons/zoom_in.png",children:"Zoom in"}),(0,n.jsx)(m.Z,{onClick:function(){S.toolZoomOut()},imgSrc:"./pics/buttons/zoom_out.png",children:"Zoom out"}),(0,n.jsx)(m.Z,{onClick:function(){S.saveGeoJson()},imgSrc:"./pics/buttons/save.png",children:"Save"}),(0,n.jsx)(m.Z,{imgSrc:"./pics/buttons/move.png",onClick:function(){return S.moveShape()},children:"Move"}),(0,n.jsx)(m.Z,{onClick:function(){return ve()},imgSrc:"./pics/buttons/prev.png",children:"Undo"}),(0,n.jsx)(m.Z,{onClick:function(){return me()},imgSrc:"./pics/buttons/next.png",children:"Redo"}),(0,n.jsx)(m.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:"Clear Mark"})]}),(0,n.jsxs)("div",{className:a().mainStage,children:[(0,n.jsx)("div",{className:a().draw,children:(0,n.jsx)(Me.Z,{leafletMapRef:se,onShapeCreate:S.onShapeCreate,onShapeEdit:S.onShapeEdit})}),(0,n.jsx)("div",{className:a().pblock,children:(0,n.jsx)("div",{className:a().progress,children:(0,n.jsx)(P.Z,{percent:50,status:"active"})})})]}),(0,n.jsxs)(W.Z,{disLoc:"right",children:[(0,n.jsx)(m.Z,{imgSrc:"./pics/buttons/intelligent_interaction.png",children:"Interactor"}),(0,n.jsx)(de.Z,{imgSrc:"./pics/buttons/threshold.png",disLoc:"left",children:"Segment Threshold"}),(0,n.jsx)(de.Z,{imgSrc:"./pics/buttons/alpha.png",disLoc:"left",children:"Diaphaneity"}),(0,n.jsx)(de.Z,{imgSrc:"./pics/buttons/radius.png",disLoc:"left",children:"Visual Radius"}),(0,n.jsxs)(h.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Setting of boundary simplification",content:(0,n.jsx)(G.Z,{}),trigger:A=="boundry"?"click":"hover",children:[" ",(0,n.jsx)(m.Z,{imgSrc:"./pics/buttons/border_simplify.png",onClick:function(){K("boundry")},children:"Boundary"})]}),(0,n.jsxs)(h.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Setting of remote sensing",content:(0,n.jsx)(je,{}),trigger:A=="colorgun"?"click":"hover",children:[" ",(0,n.jsx)(m.Z,{imgSrc:"./pics/buttons/remote_sensing_setting.png",onClick:function(){K("colorgun")},children:"Remote Sensing"})]}),(0,n.jsxs)(h.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Switch grids",content:(0,n.jsx)(ye.Z,{}),trigger:A=="grid"?"click":"hover",children:[" ",(0,n.jsx)(m.Z,{imgSrc:"./pics/buttons/switch_grid.png",onClick:function(){K("grid")},children:"Grids"})]}),(0,n.jsx)(m.Z,{imgSrc:"./pics/buttons/data_division.png",children:"Divide Data"}),(0,n.jsx)(m.Z,{imgSrc:"./pics/buttons/export.png",children:"Export"})]}),(0,n.jsxs)("div",{className:a().rightSideBar,children:[(0,n.jsx)("div",{className:a().determinOutline,children:(0,n.jsx)(d.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",block:!0,children:"Determine Outline"})}),(0,n.jsx)(c.Z,{selectedLabel:z,onLabelSelect:function(M){R(M),console.log(M)},onLabelModify:function(){},onLabelDelete:function(){},onLabelAdd:function(){}}),(0,n.jsx)(Ze.Z,{annotations:k,onAnnotationSelect:function(){},onAnnotationAdd:function(){},onAnnotationModify:function(){},onAnnotationDelete:function(){}})]})]})},Ce=Re}}]);