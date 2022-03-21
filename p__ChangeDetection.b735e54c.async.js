(self.webpackChunkpp_label_frontend=self.webpackChunkpp_label_frontend||[]).push([[572,540],{32495:function(g){g.exports={listItem:"listItem___1MXXF",eye:"eye___3nddM",delete:"delete___y9u-D",roundBall:"roundBall___DMczd",popover:"popover___E0HLD",annotationId:"annotationId___1ks8N",labelName:"labelName___130ie",listItemActive:"listItemActive___1rNB-"}},38670:function(g){g.exports={labelList:"labelList___3uLRO",listHeader:"listHeader___1ZPcO",eye:"eye___2yUvw",roundBall:"roundBall___1xKCU"}},72869:function(g){g.exports={map:"map___92VPN",customControlIcon:"customControlIcon___3Ki2y"}},20474:function(g){g.exports={RSPop1:"RSPop1___vz5Me",RSPop2:"RSPop2___34pQA"}},73762:function(g){g.exports={RSPop1:"RSPop1___2Uh31",RSPop2:"RSPop2___2Q-T8"}},87610:function(g){g.exports={RSPop1:"RSPop1___1iBEf",RSPop2:"RSPop2___1W841",RSPop3:"RSPop3___1Whcp"}},35524:function(g){g.exports={segment:"segment___3c01P",mainStage:"mainStage___2jlIH",draw:"draw___3Ftm7",halfMap:"halfMap___1HRmv",interval:"interval___21ItQ",pblock:"pblock___10iZ8",progress:"progress___wlToW",rightSideBar:"rightSideBar___25YC7",determinOutline:"determinOutline___2lYb0"}},51327:function(g,Y,e){"use strict";e.d(Y,{Z:function(){return G}});var ne=e(54421),j=e(38272),te=e(57663),S=e(71577),ae=e(67294),Z=e(38670),H=e.n(Z),h=e(49111),Q=e(19650),i=e(11849),d=e(32495),c=e.n(d),U=e(63097),s=e(85893),L=function(t){var E=(0,i.Z)({},t.annotation),M=!1,A=(0,s.jsxs)(j.ZP.Item,{className:"".concat(c().listItem," ").concat(t.active?c().listItemActive:""),unselectable:"on",onClick:function(){console.log("click List.Item"),t.onClick(E)},children:[(0,s.jsxs)(Q.Z,{align:"center",size:5,children:[(0,s.jsx)("a",{className:c().eye,style:{backgroundImage:M?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(K){K.stopPropagation(),t.onAnnotationModify(E)}})," ",(0,s.jsx)("span",{className:c().annotationId,children:E.properties.annotationId}),(0,s.jsx)("span",{className:c().labelName,children:E.properties.labelName}),(0,s.jsx)(U.Z,{color:E.properties.stroke})]}),(0,s.jsx)("a",{className:c().delete,onClick:function(K){console.log("click List.Item.delete"),K.stopPropagation(),t.onAnnotationDelete(E)}})]});return A},v=L,W=e(48971),m=function(t){var E=(0,W.YB)().formatMessage({id:"component.PPAnnotationList.annotationList"}),M=(0,W.YB)().formatMessage({id:"component.PPAnnotationList.addAnnotation"});return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(j.ZP,{className:H().labelList,size:"large",header:(0,s.jsx)("div",{className:H().listHeader,children:E}),bordered:!0,dataSource:t.annotations.features,renderItem:function(P){return(0,s.jsx)(v,{onClick:t.onAnnotationSelect,annotation:P,active:!1,onAnnotationDelete:t.onAnnotationDelete,onAnnotationModify:t.onAnnotationModify})},footer:(0,s.jsx)("div",{children:(0,s.jsx)(S.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){t.onAnnotationSelect(void 0)},block:!0,children:M})})})})},G=m},37233:function(g,Y,e){"use strict";e.d(Y,{Z:function(){return v}});var ne=e(67294),j=e(11849),te=e(93224),S=e(41004),ae=e(72869),Z=e.n(ae),H=e(74607),h=e(85893),Q=function(m){var G=m.children,T=m.leafletMapRef,t=m.displayTools,E=(0,te.Z)(m,["children","leafletMapRef","displayTools"]);return ne.useEffect(function(){if(T.current){var M=T.current.leafletElement;M.pm.addControls({drawMarker:!1,drawCircle:!1,drawCircleMarker:!1,drawPolyline:!1,drawRectangle:!1,drawPolygon:!1,editMode:!1,dragMode:!1,cutPolygon:!0,rotateMode:!1,removalMode:!1}),M.pm.setGlobalOptions({pmIgnore:!1}),m.displayTools&&M.pm.Toolbar.createCustomControl({name:"StoreShapes",title:"Store all shapes",block:"custom",className:Z().customControlIcon,toggle:!1,afterClick:function(){var P=JSON.stringify(M.pm.getGeomanDrawLayers(!0).toGeoJSON()),K="data.geojson",u=document.createElement("a");u.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(P)),u.setAttribute("download",K),u.style.display="none",document.body.appendChild(u),u.click(),console.log(P)}}),M.on("pm:create",function(A){m.onShapeCreate(A)}),M.on("pm:edit",function(A){m.onShapeEdit(A)})}},[]),(0,h.jsx)(S.Z,(0,j.Z)((0,j.Z)({ref:T},E),{},{children:G}))},i=Q,d=e(88014),c=e(16072),U=e(18836),s={lat:0,lng:0,zoom:2},L=function(m){var G=[s.lat,s.lng];return(0,h.jsx)(i,{leafletMapRef:m.leafletMapRef,displayTools:m.displayTools,className:Z().map,center:G,zoom:s.zoom,onShapeCreate:m.onShapeCreate,onShapeEdit:m.onShapeEdit,zoomControl:!1,children:(0,h.jsxs)(d.Z,{position:"topright",children:[(0,h.jsx)(d.Z.BaseLayer,{checked:!0,name:"TianDiTu.Vector",children:(0,h.jsxs)(c.Z,{attribution:'\xA9 <a href="https://www.tianditu.gov.cn/">TianDiTu</a> GS(2021)3715',children:[(0,h.jsx)(U.Z,{url:"https://t2.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=8e879a4cad078fd3ce7456f2737fc4cc"}),(0,h.jsx)(U.Z,{url:"https://t2.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=8e879a4cad078fd3ce7456f2737fc4cc"})]})}),(0,h.jsx)(d.Z.Overlay,{name:"Esri.WorldImagery",children:(0,h.jsx)(U.Z,{attribution:"Tiles \xA9 Esri \u2014 Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})})]})})},v=L},49813:function(g,Y,e){"use strict";var ne=e(47673),j=e(24044),te=e(13062),S=e(71230),ae=e(59250),Z=e(13013),H=e(57663),h=e(71577),Q=e(89032),i=e(15746),d=e(30887),c=e(54689),U=e(34792),s=e(48086),L=e(89366),v=e(57254),W=e(20474),m=e.n(W),G=e(67294),T=e(48971),t=e(85893);function E(P){s.default.info("Click on menu item."),console.log("click",P)}var M=(0,t.jsxs)(c.Z,{onClick:E,children:[(0,t.jsx)(c.Z.Item,{icon:(0,t.jsx)(L.Z,{}),children:"1st menu item"},"1"),(0,t.jsx)(c.Z.Item,{icon:(0,t.jsx)(L.Z,{}),children:"2nd menu item"},"2"),(0,t.jsx)(c.Z.Item,{icon:(0,t.jsx)(L.Z,{}),children:"3rd menu item"},"3")]}),A=function(){var K=(0,T.YB)().formatMessage({id:"component.PPRS.pdParameter"}),u=(0,T.YB)().formatMessage({id:"component.PPRS.simplifiedDistance"}),xe=(0,T.YB)().formatMessage({id:"component.PPRS.simplifiedAngle"}),$=(0,T.YB)().formatMessage({id:"component.PPRS.threshold"});return(0,t.jsxs)("div",{children:[(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(i.Z,{span:12,className:m().RSPop1,children:(0,t.jsx)("span",{children:K})}),(0,t.jsx)(i.Z,{span:12,className:m().RSPop2,children:(0,t.jsx)(Z.Z,{overlay:M,children:(0,t.jsxs)(h.Z,{style:{width:"100%"},children:["Dropdown ",(0,t.jsx)(v.Z,{})]})})})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(i.Z,{span:12,className:m().RSPop1,children:(0,t.jsx)("span",{children:u})}),(0,t.jsx)(i.Z,{span:12,className:m().RSPop2,children:(0,t.jsx)(j.Z,{placeholder:"Basic usage"})})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(i.Z,{span:12,className:m().RSPop1,children:(0,t.jsx)("span",{children:xe})}),(0,t.jsx)(i.Z,{span:12,className:m().RSPop2,children:(0,t.jsx)(j.Z,{placeholder:"Basic usage"})})]}),(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(i.Z,{span:12,className:m().RSPop1,children:(0,t.jsx)("span",{children:$})}),(0,t.jsx)(i.Z,{span:12,className:m().RSPop2,children:(0,t.jsx)(j.Z,{placeholder:"Basic usage"})})]})]})};Y.Z=A},97927:function(g,Y,e){"use strict";var ne=e(13062),j=e(71230),te=e(47673),S=e(24044),ae=e(89032),Z=e(15746),H=e(87610),h=e.n(H),Q=e(67294),i=e(48971),d=e(85893),c=function(){var s=(0,i.YB)().formatMessage({id:"component.PPRS.gridSize"}),L=(0,i.YB)().formatMessage({id:"component.PPRS.overlap"}),v=(0,i.YB)().formatMessage({id:"component.PPRS.completed"},{show:1,total:16});return(0,d.jsxs)("div",{children:[(0,d.jsxs)(j.Z,{children:[(0,d.jsx)(Z.Z,{span:12,className:h().RSPop1,children:(0,d.jsx)("span",{children:s})}),(0,d.jsx)(Z.Z,{span:12,className:h().RSPop2,children:(0,d.jsx)(S.Z,{placeholder:"Basic usage"})})]}),(0,d.jsxs)(j.Z,{children:[(0,d.jsx)(Z.Z,{span:12,className:h().RSPop1,children:(0,d.jsx)("span",{children:L})}),(0,d.jsx)(Z.Z,{span:12,className:h().RSPop2,children:(0,d.jsx)(S.Z,{placeholder:"Basic usage"})})]}),(0,d.jsx)(j.Z,{children:(0,d.jsx)("span",{className:h().RSPop3,children:v})})]})};Y.Z=c},76233:function(g,Y,e){"use strict";e.r(Y),e.d(Y,{default:function(){return Le}});var ne=e(34669),j=e(54458),te=e(20136),S=e(55241),ae=e(49111),Z=e(19650),H=e(62350),h=e(75443),Q=e(57663),i=e(71577),d=e(2824),c=e(67294),U=e(35524),s=e.n(U),L=e(8088),v=e(61541),W=e(44434),m=e(5041),G=e(49813),T=e(98858),t=e(4914),E=e(13062),M=e(71230),A=e(59250),P=e(13013),K=e(89032),u=e(15746),xe=e(30887),$=e(54689),He=e(34792),ye=e(48086),me=e(89366),k=e(57254),Ze=e(73762),B=e.n(Ze),o=e(48971),n=e(85893);function Ee(f){ye.default.info("Click on menu item."),console.log("click",f)}var _=(0,n.jsxs)($.Z,{onClick:Ee,children:[(0,n.jsx)($.Z.Item,{icon:(0,n.jsx)(me.Z,{}),children:"band_1"},"1"),(0,n.jsx)($.Z.Item,{icon:(0,n.jsx)(me.Z,{}),children:"band_2"},"2"),(0,n.jsx)($.Z.Item,{icon:(0,n.jsx)(me.Z,{}),children:"band_3"},"3")]}),Re=function(){var w=(0,o.YB)().formatMessage({id:"component.PPRS.r"}),b=(0,o.YB)().formatMessage({id:"component.PPRS.g"}),D=(0,o.YB)().formatMessage({id:"component.PPRS.b"}),z=(0,o.YB)().formatMessage({id:"component.PPRS.dataInformation"}),oe=(0,o.YB)().formatMessage({id:"component.PPRS.fileName"}),V=(0,o.YB)().formatMessage({id:"component.PPRS.row"}),X=(0,o.YB)().formatMessage({id:"component.PPRS.column"}),R=(0,o.YB)().formatMessage({id:"component.PPRS.bands"}),y=(0,o.YB)().formatMessage({id:"component.PPRS.dataType"}),q=(0,o.YB)().formatMessage({id:"component.PPRS.EPSG"}),ee=(0,o.YB)().formatMessage({id:"component.PPRS.unit"});return(0,n.jsxs)("div",{children:[(0,n.jsxs)(M.Z,{children:[(0,n.jsx)(u.Z,{className:B().RSPop1,children:(0,n.jsx)("span",{children:w})}),(0,n.jsx)(u.Z,{className:B().RSPop2,children:(0,n.jsx)(P.Z,{overlay:_,children:(0,n.jsxs)(i.Z,{style:{width:"100%"},children:["Band ",(0,n.jsx)(k.Z,{})]})})}),(0,n.jsx)(u.Z,{className:B().RSPop1,children:(0,n.jsx)("span",{children:b})}),(0,n.jsx)(u.Z,{className:B().RSPop2,children:(0,n.jsx)(P.Z,{overlay:_,children:(0,n.jsxs)(i.Z,{style:{width:"100%"},children:["Band ",(0,n.jsx)(k.Z,{})]})})}),(0,n.jsx)(u.Z,{className:B().RSPop1,children:(0,n.jsx)("span",{children:D})}),(0,n.jsx)(u.Z,{className:B().RSPop2,children:(0,n.jsx)(P.Z,{overlay:_,children:(0,n.jsxs)(i.Z,{style:{width:"100%"},children:["Band ",(0,n.jsx)(k.Z,{})]})})})]}),(0,n.jsxs)(M.Z,{children:[(0,n.jsx)(u.Z,{className:B().RSPop1,children:(0,n.jsx)("span",{children:w})}),(0,n.jsx)(u.Z,{className:B().RSPop2,children:(0,n.jsx)(P.Z,{overlay:_,children:(0,n.jsxs)(i.Z,{style:{width:"100%"},children:["Band ",(0,n.jsx)(k.Z,{})]})})}),(0,n.jsx)(u.Z,{className:B().RSPop1,children:(0,n.jsx)("span",{children:b})}),(0,n.jsx)(u.Z,{className:B().RSPop2,children:(0,n.jsx)(P.Z,{overlay:_,children:(0,n.jsxs)(i.Z,{style:{width:"100%"},children:["Band ",(0,n.jsx)(k.Z,{})]})})}),(0,n.jsx)(u.Z,{className:B().RSPop1,children:(0,n.jsx)("span",{children:D})}),(0,n.jsx)(u.Z,{className:B().RSPop2,children:(0,n.jsx)(P.Z,{overlay:_,children:(0,n.jsxs)(i.Z,{style:{width:"100%"},children:["Band ",(0,n.jsx)(k.Z,{})]})})})]}),(0,n.jsxs)(t.Z,{title:z,column:1,bordered:!0,children:[(0,n.jsx)(t.Z.Item,{label:oe,children:"A/XXX.tif B/XXX.tif"}),(0,n.jsx)(t.Z.Item,{label:V,children:"1234"}),(0,n.jsx)(t.Z.Item,{label:X,children:"897"}),(0,n.jsx)(t.Z.Item,{label:R,children:"7 7"}),(0,n.jsx)(t.Z.Item,{label:y,children:"UInt16"}),(0,n.jsx)(t.Z.Item,{label:q,children:"7030"}),(0,n.jsx)(t.Z.Item,{label:ee,children:"m"})]})]})},Ce=Re,Be=e(97927),je=e(37233),De=e(51327),Me=e(11849);function Oe(f){var w=(0,c.useState)(0),b=(0,d.Z)(w,2),D=b[0],z=b[1],oe=(0,c.useState)(!1),V=(0,d.Z)(oe,2),X=V[0],R=V[1];(0,c.useEffect)(function(){localStorage.setItem("currentLabel",JSON.stringify(f.currentLabel||{}))},[f.currentLabel]),(0,c.useEffect)(function(){localStorage.setItem("annotations",JSON.stringify(f.annotations||{}))},[f.annotations]);var y=function(){var a,C=(a=f.leafletMapRef.current)===null||a===void 0?void 0:a.leafletElement.pm.globalDrawModeEnabled();console.log(C)},q=function(a){var C=localStorage.getItem("currentLabel");if(C!="{}"){var O,J;R(!0);var I=JSON.parse(C||"{}");(O=f.leafletMapRef.current)===null||O===void 0||O.leafletElement.pm.enableDraw(a),(J=f.leafletMapRef.current)===null||J===void 0||J.leafletElement.pm.setPathOptions({color:I==null?void 0:I.color,fillColor:I==null?void 0:I.color,fillOpacity:.4})}else{var le;alert("Test"),(le=f.leafletMapRef.current)===null||le===void 0||le.leafletElement.pm.disableDraw(a),R(!1)}},ee=function(a){var C;(C=f.leafletMapRef.current)===null||C===void 0||C.leafletElement.pm.disableDraw(a),R(!1),y()},F=function(){var a;return(a=f.leafletMapRef.current)===null||a===void 0?void 0:a.leafletElement.pm.Draw.getActiveShape()},de=function(){if(F()=="Polygon"){var a;(a=f.leafletMapRef.current)===null||a===void 0||a.leafletElement.pm.Draw.Polygon._removeLastVertex(),y()}else y(),R(!1)},fe=function(){var a;(a=f.leafletMapRef.current)===null||a===void 0||a.leafletElement.pm.toggleGlobalDragMode(),y()},he=function(){if(F()=="Polygon"){var a;(a=f.leafletMapRef.current)===null||a===void 0||a.leafletElement.pm.Draw.Polygon._finishShape(),y(),R(!1)}else y(),R(!1)},se=function(){var a;(a=f.leafletMapRef.current)===null||a===void 0||a.leafletElement.pm.enableGlobalRemovalMode(),y()},p=function(){var a;(a=f.leafletMapRef.current)===null||a===void 0||a.leafletElement.pm.toggleGlobalEditMode(),y(),R(!1)},ue=function(){R(!1)},ce=function(a){var C=a.toGeoJSON(),O=JSON.parse(localStorage.getItem("currentLabel")||"{}");z(D+1),C.properties={labelName:O==null?void 0:O.name,stroke:O==null?void 0:O.color,annotationId:D+1};var J=JSON.parse(localStorage.getItem("annotations")||"{}"),I=(0,Me.Z)((0,Me.Z)({},J),{},{features:J.features.concat(C)});console.log(I),f.setAnnotations(I),f.recordHistory(I)};function ge(x){R(!1),ce(x.layer)}var pe=function(a){console.log(a)},Se=function(){var a;(a=f.leafletMapRef.current)===null||a===void 0||a.leafletElement.zoomIn(),y()},Pe=function(){var a;(a=f.leafletMapRef.current)===null||a===void 0||a.leafletElement.zoomOut(),y()};return{polyVisable:X,RSDraw:q,RSDrawDisable:ee,removeLastVertex:de,moveShape:fe,finishShape:he,removeShape:se,editMode:p,saveGeoJson:ue,storeOnDb:ce,onShapeCreate:ge,onShapeEdit:pe,toolZoomIn:Se,toolZoomOut:Pe,currentShape:F}}var ve=e(27992),re=e(86089),Ie=function(){var w=(0,c.useState)(void 0),b=(0,d.Z)(w,2),D=b[0],z=b[1],oe=(0,c.useState)(),V=(0,d.Z)(oe,2),X=V[0],R=V[1],y=(0,c.useState)({type:"FeatureCollection",features:[]}),q=(0,d.Z)(y,2),ee=q[0],F=q[1];(0,c.useEffect)(function(){localStorage.removeItem("history"),de({type:"FeatureCollection",features:[]})},[]);function de(r){var N=localStorage.getItem("history"),l=N?JSON.parse(N):{index:-1,items:[]};if(JSON.stringify(l.items[l.index])!=JSON.stringify(r)){var ie=l.index>re.MOST_HISTORY_STEPS?l.index-re.MOST_HISTORY_STEPS:0,Je=l.items.splice(ie,l.index==0?1:l.index+1);l.items=Je.concat([r]),l.index<=re.MOST_HISTORY_STEPS?l.index++:l.index=re.MOST_HISTORY_STEPS+1,localStorage.setItem("history",JSON.stringify(l))}}var fe=function(){var N=localStorage.getItem("history");if(!!N){var l=JSON.parse(N);if(!!l&&!(l.index>=l.items.length-1)){l.index++,localStorage.setItem("history",JSON.stringify(l));var ie=l.items[l.index];F(ie)}}},he=function(){var N=localStorage.getItem("history");if(!!N){var l=JSON.parse(N);if(!(!l||!l.index)&&!(l.index<=0)){l.index--,localStorage.setItem("history",JSON.stringify(l));var ie=l.items[l.index];F(ie)}}};console.log("rs is re-rendering! currentLabel: ".concat(JSON.stringify(X)));var se=c.useRef(null),p=Oe({leafletMapRef:se,currentLabel:X,setAnnotations:F,annotations:ee,recordHistory:de}),ue=(0,o.YB)().formatMessage({id:"pages.Maps.finished"}),ce=(0,o.YB)().formatMessage({id:"pages.Maps.removeLastVertex"}),ge=(0,o.YB)().formatMessage({id:"pages.Maps.cancel"}),pe=(0,o.YB)().formatMessage({id:"pages.Maps.boundary"}),Se=(0,o.YB)().formatMessage({id:"pages.Maps.remoteSensing"}),Pe=(0,o.YB)().formatMessage({id:"pages.Maps.grids"}),x=(0,o.YB)().formatMessage({id:"pages.toolBar.polygon"}),a=(0,o.YB)().formatMessage({id:"pages.toolBar.rubber"}),C=(0,o.YB)().formatMessage({id:"pages.toolBar.zoomIn"}),O=(0,o.YB)().formatMessage({id:"pages.toolBar.zoomOut"}),J=(0,o.YB)().formatMessage({id:"pages.toolBar.move"}),I=(0,o.YB)().formatMessage({id:"pages.toolBar.unDo"}),le=(0,o.YB)().formatMessage({id:"pages.toolBar.reDo"}),Te=(0,o.YB)().formatMessage({id:"pages.toolBar.save"}),Ae=(0,o.YB)().formatMessage({id:"pages.toolBar.edit"}),Ne=(0,o.YB)().formatMessage({id:"pages.toolBar.clearMark"}),Ye=(0,o.YB)().formatMessage({id:"pages.toolBar.interactor"}),Ue=(0,o.YB)().formatMessage({id:"pages.toolBar.segmentThreshold"}),We=(0,o.YB)().formatMessage({id:"pages.toolBar.diaphaneity"}),Ge=(0,o.YB)().formatMessage({id:"pages.toolBar.visualRadius"}),Ke=(0,o.YB)().formatMessage({id:"pages.toolBar.determineOutline"}),be=(0,o.YB)().formatMessage({id:"pages.toolBar.divideData"}),ze=(0,o.YB)().formatMessage({id:"pages.toolBar.export"});return(0,n.jsxs)(L.Z,{className:s().segment,children:[(0,n.jsxs)(W.Z,{children:[(0,n.jsx)(S.Z,{placement:"rightTop",visible:p.polyVisable,content:(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)(Z.Z,{children:[(0,n.jsx)(i.Z,{type:"primary",onClick:function(){p.finishShape()},children:ue}),(0,n.jsx)(i.Z,{type:"primary",onClick:function(){p.removeLastVertex()},children:ce}),(0,n.jsx)(h.Z,{title:"Are you sure cancel this task?",okText:"Yes",cancelText:"No",children:(0,n.jsx)(i.Z,{type:"primary",onClick:function(){p.RSDrawDisable(p.currentShape())},children:ge})})]})}),trigger:D=="Polygon"?"hover":"click",children:(0,n.jsx)(v.Z,{active:D=="Polygon",imgSrc:"./pics/buttons/polygon.png",onClick:function(){z("Polygon"),p.RSDraw("Polygon")},children:x})}),(0,n.jsx)(v.Z,{onClick:function(){p.editMode()},imgSrc:"./pics/buttons/edit.png",children:Ae}),(0,n.jsxs)(S.Z,{placement:"rightTop",title:"title",content:"content",trigger:D=="rubber"?"hover":"click",children:[" ",(0,n.jsx)(v.Z,{imgSrc:"./pics/buttons/rubber.png",onClick:function(){p.removeShape()},children:a})]}),(0,n.jsx)(v.Z,{onClick:function(){p.toolZoomIn()},imgSrc:"./pics/buttons/zoom_in.png",children:C}),(0,n.jsx)(v.Z,{onClick:function(){p.toolZoomOut()},imgSrc:"./pics/buttons/zoom_out.png",children:O}),(0,n.jsx)(v.Z,{onClick:function(){p.saveGeoJson()},imgSrc:"./pics/buttons/save.png",children:Te}),(0,n.jsx)(v.Z,{imgSrc:"./pics/buttons/move.png",onClick:function(){return p.moveShape()},children:J}),(0,n.jsx)(v.Z,{onClick:function(){return he()},imgSrc:"./pics/buttons/prev.png",children:I}),(0,n.jsx)(v.Z,{onClick:function(){return fe()},imgSrc:"./pics/buttons/next.png",children:le}),(0,n.jsx)(v.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:Ne})]}),(0,n.jsxs)("div",{className:s().mainStage,children:[(0,n.jsxs)("div",{className:s().draw,children:[(0,n.jsx)("div",{className:s().halfMap,children:(0,n.jsx)(je.Z,{leafletMapRef:se,onShapeCreate:p.onShapeCreate,onShapeEdit:p.onShapeEdit})}),(0,n.jsx)("div",{className:s().interval}),(0,n.jsx)("div",{className:s().halfMap,children:(0,n.jsx)(je.Z,{leafletMapRef:se,displayTools:!1,onShapeCreate:p.onShapeCreate,onShapeEdit:p.onShapeEdit})})]}),(0,n.jsx)("div",{className:s().pblock,children:(0,n.jsx)("div",{className:s().progress,children:(0,n.jsx)(j.Z,{percent:50,status:"active"})})})]}),(0,n.jsxs)(W.Z,{disLoc:"right",children:[(0,n.jsx)(v.Z,{imgSrc:"./pics/buttons/intelligent_interaction.png",children:Ye}),(0,n.jsx)(ve.Z,{imgSrc:"./pics/buttons/threshold.png",disLoc:"left",children:Ue}),(0,n.jsx)(ve.Z,{imgSrc:"./pics/buttons/alpha.png",disLoc:"left",children:We}),(0,n.jsx)(ve.Z,{imgSrc:"./pics/buttons/radius.png",disLoc:"left",children:Ge}),(0,n.jsxs)(S.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Setting of boundary simplification",content:(0,n.jsx)(G.Z,{}),trigger:D=="boundry"?"click":"hover",children:[" ",(0,n.jsx)(v.Z,{imgSrc:"./pics/buttons/border_simplify.png",onClick:function(){z("boundry")},children:pe})]}),(0,n.jsxs)(S.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Setting of remote sensing",content:(0,n.jsx)(Ce,{}),trigger:D=="colorgun"?"click":"hover",children:[" ",(0,n.jsx)(v.Z,{imgSrc:"./pics/buttons/remote_sensing_setting.png",onClick:function(){z("colorgun")},children:Se})]}),(0,n.jsxs)(S.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Switch grids",content:(0,n.jsx)(Be.Z,{}),trigger:D=="grid"?"click":"hover",children:[" ",(0,n.jsx)(v.Z,{imgSrc:"./pics/buttons/switch_grid.png",onClick:function(){z("grid")},children:Pe})]}),(0,n.jsx)(v.Z,{imgSrc:"./pics/buttons/data_division.png",children:be}),(0,n.jsx)(v.Z,{imgSrc:"./pics/buttons/export.png",children:ze})]}),(0,n.jsxs)("div",{className:s().rightSideBar,children:[(0,n.jsx)("div",{className:s().determinOutline,children:(0,n.jsx)(i.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",block:!0,children:Ke})}),(0,n.jsx)(m.Z,{selectedLabel:X,onLabelSelect:function(N){R(N),console.log(N)},onLabelModify:function(){},onLabelDelete:function(){},onLabelAdd:function(){}}),(0,n.jsx)(De.Z,{annotations:ee,onAnnotationSelect:function(){},onAnnotationAdd:function(){},onAnnotationModify:function(){},onAnnotationDelete:function(){}})]})]})},Le=Ie}}]);
