(self.webpackChunkpp_labeling_frontend=self.webpackChunkpp_labeling_frontend||[]).push([[333],{57560:function(o){o.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___147XP",toolBarButtonContainer:"toolBarButtonContainer___ZEvhK",toolBarButton:"toolBarButton___1s2Rh",buttonText:"buttonText___3NTCv",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___2Utx8",popover:"popover___3PRoi"}},52822:function(o){o.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},56131:function(o){o.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},56623:function(o){o.exports={listItem:"listItem___3P4zY",eye:"eye___13vRl",roundBall:"roundBall___3rXBh",popover:"popover___2bsOT"}},78677:function(o){o.exports={container:"container___G0FNe"}},80961:function(o){o.exports={toolbar:"toolbar___3vxli"}},82499:function(o){o.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},72869:function(o){o.exports={map:"map___92VPN",customControlIcon:"customControlIcon___3Ki2y"}},20474:function(o){o.exports={RSPop1:"RSPop1___vz5Me",RSPop2:"RSPop2___34pQA"}},2661:function(o){o.exports={toolbar:"toolbar___1o3he"}},93889:function(o){o.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___UtH8a",toolBarButtonContainer:"toolBarButtonContainer___1gFsH",toolBarButton:"toolBarButton___1Wqc1",buttonText:"buttonText___2zcKO",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AXHi"}},75513:function(o){o.exports={segment:"segment___3WmPw",mainStage:"mainStage___2kT1s",rightSideBar:"rightSideBar___11FX3"}},58967:function(o,P,e){"use strict";var k=e(20136),d=e(19181),O=e(77883),v=e(70507),s=e(57663),l=e(71577),C=e(2824),c=e(67294),I=e(61541),$=e(57560),w=e.n($),j=e(85893),z=1,n=20,q=10;function F(M){return M?M<=z?z:M>=n?n:M:q}var H=function(t){var A=(0,c.useState)(F(t.size)),G=(0,C.Z)(A,2),W=G[0],ee=G[1];return(0,j.jsxs)(d.Z,{overlayClassName:w().popover,placement:"right",content:(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(l.Z,{type:"text",onClick:function(){var E,y=F(W-1);ee(y),(E=t.onChange)===null||E===void 0||E.call(0,y)},children:"-"}),(0,j.jsx)(v.Z,{min:1,max:20,value:W,onChange:t.onChange,controls:!1,style:{textAlign:"center"}}),(0,j.jsx)(l.Z,{type:"text",onClick:function(){var E,y=F(W+1);ee(y),(E=t.onChange)===null||E===void 0||E.call(0,y)},children:"+"})]}),trigger:t.active?"hover":"click",children:[" ",(0,j.jsx)(I.Z,{active:t.active,imgSrc:"./pics/buttons/brush.png",onClick:t.onClick,children:"Brush"})]})};P.Z=H},35475:function(o,P,e){"use strict";e.d(P,{Z:function(){return X}});var k=e(54421),d=e(38272),O=e(57663),v=e(71577),s=e(2824),l=e(67294),C=e(56131),c=e.n(C),I=e(49111),$=e(19650),w=e(11849),j=e(56623),z=e.n(j),n=e(20136),q=e(19181),F=e(52822),H=e.n(F),M=e(63144),t=e(85893),A=function(u){var r=(0,l.useState)(u.color||"#FFF"),L=(0,s.Z)(r,2),S=L[0],h=L[1];return(0,t.jsx)(q.Z,{getPopupContainer:function(B){return B.parentElement||document.body},overlayClassName:H().popover,openClassName:H().popoverOpenClassName,placement:"bottom",content:(0,t.jsx)(M.xS,{disableAlpha:!0,color:S,onChange:function(B){h(B.hex)},onChangeComplete:u.onChange}),trigger:"click",children:(0,t.jsx)("div",{className:H().roundBall,style:{backgroundColor:S}})})},G=A,W=function(u){var r=(0,w.Z)({},u.label),L=(0,l.useState)(r.invisible),S=(0,s.Z)(L,2),h=S[0],D=S[1],B=(0,t.jsx)(d.ZP.Item,{className:z().listItem,unselectable:"on",children:(0,t.jsxs)($.Z,{align:"center",size:5,children:[(0,t.jsx)("a",{className:z().eye,style:{backgroundImage:h?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(){D(!h),u.onLabelModify(r)}})," ",r.name,(0,t.jsx)(G,{color:r.color,onChange:function(K){r.color=K.hex,u.onLabelModify(r)}})]})});return B},ee=W,J=e(71194),E=e(48889),y=e(9715),ne=e(93766),fe=e(47673),pe=e(24044),ce=function(u){var r=u.defaultLabel,L=(0,l.useState)(u.visible),S=(0,s.Z)(L,2),h=S[0],D=S[1],B=(0,l.useState)((r==null?void 0:r.color)||"#FF0000"),U=(0,s.Z)(B,2),K=U[0],_=U[1],te=(0,l.useState)((r==null?void 0:r.name)||""),se=(0,s.Z)(te,2),de=se[0],ue=se[1];return(0,t.jsx)(E.Z,{title:"Add Label",visible:h,onCancel:u.onCancel,footer:null,children:(0,t.jsxs)(ne.Z,{name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(N){var ve={name:N.labelname,color:K};u.onLabelAdd(ve),D(!1)},autoComplete:"off",children:[(0,t.jsx)(ne.Z.Item,{label:"Label Name",name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,t.jsx)(pe.Z,{defaultValue:de})}),(0,t.jsx)(ne.Z.Item,{label:"Select Color",name:"color",rules:[{required:!0,message:"Please select color!"}],children:(0,t.jsx)(G,{color:K,onChange:function(N){_(N.hex)}})}),(0,t.jsx)(ne.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,t.jsxs)($.Z,{children:[(0,t.jsx)(v.Z,{onClick:function(){var N;D(!1),(N=u.onCancel)===null||N===void 0||N.call(0)},children:"\u53D6\u6D88"}),(0,t.jsx)(v.Z,{type:"primary",htmlType:"submit",children:"\u786E\u5B9A"})]})})]})})},xe=ce,b=[{color:"#FF0000",name:"Label 1"},{color:"#008000",name:"Label 2"}],ge=function(u){var r=(0,l.useState)(b),L=(0,s.Z)(r,2),S=L[0],h=L[1],D=(0,l.useState)(!1),B=(0,s.Z)(D,2),U=B[0],K=B[1];return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d.ZP,{className:c().labelList,size:"large",header:(0,t.jsx)("div",{className:c().listHeader,children:"Label List"}),footer:(0,t.jsx)("div",{children:(0,t.jsx)(v.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){K(!0)},block:!0,children:"Add Label"})}),bordered:!0,dataSource:S,renderItem:function(te){return(0,t.jsx)(ee,{label:te,onLabelDelete:u.onLabelDelete,onLabelModify:u.onLabelModify})}}),(0,t.jsx)(xe,{visible:U,onLabelAdd:function(){}})]})},X=ge},8088:function(o,P,e){"use strict";var k=e(67294),d=e(78677),O=e.n(d),v=e(85893),s=function(C){return(0,v.jsx)("div",{className:"".concat(O().container," ").concat(C.className),children:C.children})};P.Z=s},44434:function(o,P,e){"use strict";var k=e(67294),d=e(80961),O=e.n(d),v=e(85893),s=function(C){return(0,v.jsx)("div",{className:O().toolbar,children:C.children})};P.Z=s},61541:function(o,P,e){"use strict";var k=e(49111),d=e(19650),O=e(67294),v=e(82499),s=e.n(v),l=e(85893),C=function(I){return(0,l.jsx)("div",{unselectable:"on",className:"".concat(s().toolBarButtonContainerWrapper," ").concat(I.active&&s().toolBarButtonContainerWrapperActive),onClick:I.onClick,children:(0,l.jsx)(d.Z,{align:"center",className:s().toolBarButtonContainer,size:0,children:(0,l.jsxs)(d.Z,{align:"center",direction:"vertical",className:s().toolBarButton,size:0,children:[(0,l.jsx)("img",{src:I.imgSrc}),(0,l.jsx)("div",{className:s().buttonText,children:I.children})]})})})};P.Z=C},6779:function(o,P,e){"use strict";e.r(P),e.d(P,{default:function(){return Be}});var k=e(20136),d=e(19181),O=e(2824),v=e(67294),s=e(75513),l=e.n(s),C=e(8088),c=e(61541),I=e(44434),$=e(58967),w=e(35475),j=e(2661),z=e.n(j),n=e(85893),q=function(f){return(0,n.jsx)("div",{className:z().toolbar,children:f.children})},F=q,H=e(49111),M=e(19650),t=e(93889),A=e.n(t),G=function(f){return(0,n.jsx)("div",{unselectable:"on",className:"".concat(A().toolBarButtonContainerWrapper," ").concat(f.active&&A().toolBarButtonContainerWrapperActive),onClick:f.onClick,children:(0,n.jsx)(M.Z,{align:"center",className:A().toolBarButtonContainer,size:0,children:(0,n.jsxs)(M.Z,{align:"center",direction:"vertical",className:A().toolBarButton,size:0,children:[(0,n.jsx)("img",{src:f.imgSrc}),(0,n.jsx)("div",{className:A().buttonText,children:f.children})]})})})},W=G,ee=e(47673),J=e(24044),E=e(13062),y=e(71230),ne=e(59250),fe=e(13013),pe=e(57663),ce=e(71577),xe=e(89032),b=e(15746),ge=e(30887),X=e(54689),re=e(34792),u=e(48086),r=e(89366),L=e(57254),S=e(20474),h=e.n(S);function D(V){u.default.info("Click on menu item."),console.log("click",V)}var B=(0,n.jsxs)(X.Z,{onClick:D,children:[(0,n.jsx)(X.Z.Item,{icon:(0,n.jsx)(r.Z,{}),children:"1st menu item"},"1"),(0,n.jsx)(X.Z.Item,{icon:(0,n.jsx)(r.Z,{}),children:"2nd menu item"},"2"),(0,n.jsx)(X.Z.Item,{icon:(0,n.jsx)(r.Z,{}),children:"3rd menu item"},"3")]}),U=function(){return(0,n.jsxs)("div",{children:[(0,n.jsxs)(y.Z,{children:[(0,n.jsx)(b.Z,{span:12,className:h().RSPop1,children:(0,n.jsx)("span",{children:"PD parameter"})}),(0,n.jsx)(b.Z,{span:12,className:h().RSPop2,children:(0,n.jsx)(fe.Z,{overlay:B,children:(0,n.jsxs)(ce.Z,{style:{width:"100%"},children:["Dropdown ",(0,n.jsx)(L.Z,{})]})})})]}),(0,n.jsxs)(y.Z,{children:[(0,n.jsx)(b.Z,{span:12,className:h().RSPop1,children:(0,n.jsx)("span",{children:"Simplified distance"})}),(0,n.jsx)(b.Z,{span:12,className:h().RSPop2,children:(0,n.jsx)(J.Z,{placeholder:"Basic usage"})})]}),(0,n.jsxs)(y.Z,{children:[(0,n.jsx)(b.Z,{span:12,className:h().RSPop1,children:(0,n.jsx)("span",{children:"Simplified angle"})}),(0,n.jsx)(b.Z,{span:12,className:h().RSPop2,children:(0,n.jsx)(J.Z,{placeholder:"Basic usage"})})]}),(0,n.jsxs)(y.Z,{children:[(0,n.jsx)(b.Z,{span:12,className:h().RSPop1,children:(0,n.jsx)("span",{children:"Threshold of building simplification "})}),(0,n.jsx)(b.Z,{span:12,className:h().RSPop2,children:(0,n.jsx)(J.Z,{placeholder:"Basic usage"})})]})]})},K=U,_=e(11849),te=e(93224),se=e(41004),de=e(72869),ue=e.n(de),me=e(74607),N=function(f){var Y=f.children,x=f.leafletMapRef,Z=(0,te.Z)(f,["children","leafletMapRef"]);return v.useEffect(function(){if(x.current){var i=x.current.leafletElement;i.pm.addControls({drawMarker:!1,drawCircle:!1,drawCircleMarker:!1,drawPolyline:!0,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0,rotateMode:!1,removalMode:!0}),i.pm.setGlobalOptions({pmIgnore:!1}),i.pm.Toolbar.createCustomControl({name:"StoreShapes",title:"Store all shapes",block:"custom",className:ue().customControlIcon,toggle:!1,afterClick:function(){var Q=JSON.stringify(i.pm.getGeomanDrawLayers(!0).toGeoJSON()),ae="data.geojson",T=document.createElement("a");T.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(Q)),T.setAttribute("download",ae),T.style.display="none",document.body.appendChild(T),T.click(),console.log(Q)}}),i.on("pm:create",function(R){f.onShapeCreate(R)}),i.on("pm:edit",function(R){f.onShapeEdit(R)})}},[]),(0,n.jsx)(se.Z,(0,_.Z)((0,_.Z)({ref:x},Z),{},{children:Y}))},ve=N,oe=e(88014),ie=e(3263),he={lat:0,lng:0,zoom:2},Pe=function(f){var Y=[he.lat,he.lng],x=v.useState([]),Z=(0,O.Z)(x,2),i=Z[0],R=Z[1],Q=function(m){T(m.layer),m.layer.bindPopup("Label: "+m.layer._uid).openPopup(),p(m.layer)},ae=function(m){g(m.layer),console.log(m)};function T(a){var m=prompt("Please enter a Unique Id");if(m)if(i[m]){alert("Id already used, add another one"),T(a);return}else a._uid=m,i[m]=a,R(i);else{alert("Nothing entered, layer deleted ..."),a.remove();return}}function p(a){var m=a._uid,le=a.toGeoJSON();le.properties={LabelID:Number(m)},console.log("Store Layer on DB. Id:"+m,le),console.log(JSON.stringify(le))}function g(a){var m=a._uid,le=a.toGeoJSON();console.log("Update Layer on DB. Id:"+m,le)}return(0,n.jsx)(ve,{leafletMapRef:f.leafletMapRef,className:ue().map,center:Y,zoom:he.zoom,onShapeCreate:Q,onShapeEdit:ae,children:(0,n.jsxs)(oe.Z,{position:"topright",children:[(0,n.jsx)(oe.Z.BaseLayer,{checked:!0,name:"OpenStreetMap.Mapnik",children:(0,n.jsx)(ie.Z,{attribution:'\xA9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"})}),(0,n.jsx)(oe.Z.BaseLayer,{name:"TianDiTu.Satellite",children:(0,n.jsx)(ie.Z,{attribution:"\xA9 TianDiTu",url:"https://t2.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a"})}),(0,n.jsx)(oe.Z.BaseLayer,{name:"Esri.WorldImagery",children:(0,n.jsx)(ie.Z,{attribution:"Tiles \xA9 Esri \u2014 Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"})}),(0,n.jsx)(oe.Z.Overlay,{name:"Annotion.TianDiTu",children:(0,n.jsx)(ie.Z,{url:"https://t2.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a"})})]})})},Ce=Pe,Se=function(){var f=(0,v.useState)(void 0),Y=(0,O.Z)(f,2),x=Y[0],Z=Y[1],i=v.useRef(null);if(x){var R;(R=i.current)===null||R===void 0||R.leafletElement.pm.enableDraw(x)}var Q=function(){var g,a;console.log((g=i.current)===null||g===void 0?void 0:g.leafletElement.pm.Draw),(a=i.current)===null||a===void 0||a.leafletElement.pm.Draw.Polygon._removeLastVertex()},ae=function(){var g,a;console.log((g=i.current)===null||g===void 0?void 0:g.leafletElement.pm.Draw),(a=i.current)===null||a===void 0||a.leafletElement.pm.Draw.currentTool._finishShape()},T=function(){var g,a;console.log((g=i.current)===null||g===void 0?void 0:g.leafletElement.pm.Draw),(a=i.current)===null||a===void 0||a.leafletElement.pm.enableGlobalRemovalMode()};return(0,n.jsxs)(C.Z,{className:l().segment,children:[(0,n.jsxs)(I.Z,{children:[(0,n.jsx)(c.Z,{imgSrc:"./pics/buttons/intelligent_interaction.png",children:"Intelligent Interaction"}),(0,n.jsx)(d.Z,{placement:"rightTop",title:"Polygon Edit",defaultVisible:!0,content:(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("button",{onClick:function(){Q()},children:"Remove Last Vertex"}),(0,n.jsx)("button",{onClick:function(){ae()},children:"Finish"})]}),trigger:x=="Polygon"?"hover":"click",children:(0,n.jsx)(c.Z,{active:x=="Polygon",imgSrc:"./pics/buttons/polygon.png",onClick:function(){Z("Polygon")},children:"Polygon"})}),(0,n.jsx)($.Z,{active:x=="brush",onClick:function(){Z("brush")},onChange:function(g){console.log(g)}}),(0,n.jsxs)(d.Z,{placement:"rightTop",title:"title",content:"content",trigger:x=="rubber"?"hover":"click",children:[" ",(0,n.jsx)(c.Z,{imgSrc:"./pics/buttons/rubber.png",onClick:function(){Z("rubber"),T()},children:"Rubber"})]}),(0,n.jsx)(c.Z,{imgSrc:"./pics/buttons/zoom_in.png",children:"Zoom in"}),(0,n.jsx)(c.Z,{imgSrc:"./pics/buttons/zoom_out.png",children:"Zoom out"}),(0,n.jsx)(c.Z,{imgSrc:"./pics/buttons/save.png",children:"Save"}),(0,n.jsx)(c.Z,{imgSrc:"./pics/buttons/move.png",children:"Move"}),(0,n.jsx)(c.Z,{imgSrc:"./pics/buttons/export.png",children:"Export"}),(0,n.jsx)(c.Z,{imgSrc:"./pics/buttons/data_division.png",children:"Divide Data"}),(0,n.jsx)(c.Z,{imgSrc:"./pics/buttons/prev.png",children:"Undo"}),(0,n.jsx)(c.Z,{imgSrc:"./pics/buttons/next.png",children:"Redo"}),(0,n.jsx)(c.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:"Clear Mark"})]}),(0,n.jsx)("div",{className:l().mainStage,children:(0,n.jsx)(Ce,{leafletMapRef:i})}),(0,n.jsxs)(F,{children:[(0,n.jsxs)(d.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Setting of boundary simplification",content:(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(K,{})}),trigger:x=="boundry"?"click":"hover",children:[" ",(0,n.jsx)(W,{imgSrc:"./pics/buttons/border_simplify.png",onClick:function(){Z("boundry")},children:(0,n.jsx)("h2",{children:"Boundary"})})]}),(0,n.jsxs)(d.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Setting of remote sensing",content:"content",trigger:x=="colorgun"?"click":"hover",children:[" ",(0,n.jsx)(W,{imgSrc:"./pics/buttons/remote_sensing_setting.png",onClick:function(){Z("colorgun")},children:(0,n.jsx)("h2",{children:"Remote Sensing"})})]}),(0,n.jsxs)(d.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Switch grids",content:"content",trigger:x=="grid"?"click":"hover",children:[" ",(0,n.jsx)(W,{imgSrc:"./pics/buttons/switch_grid.png",onClick:function(){Z("grid")},children:(0,n.jsx)("h2",{children:"Grids"})})]})]}),(0,n.jsx)("div",{className:l().rightSideBar,children:(0,n.jsx)(w.Z,{onLabelModify:function(){},onLabelDelete:function(){},onLabelAdd:function(){}})})]})},Be=Se}}]);
