(self.webpackChunkpp_labeling_frontend=self.webpackChunkpp_labeling_frontend||[]).push([[333],{57560:function(t){t.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___147XP",toolBarButtonContainer:"toolBarButtonContainer___ZEvhK",toolBarButton:"toolBarButton___1s2Rh",buttonText:"buttonText___3NTCv",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___2Utx8",popover:"popover___3PRoi"}},52822:function(t){t.exports={roundBall:"roundBall___1pqu1",popover:"popover___1-PR6"}},56131:function(t){t.exports={labelList:"labelList___jvD05",listHeader:"listHeader___UM5UF",eye:"eye___II3Po",roundBall:"roundBall___j752J"}},56623:function(t){t.exports={listItem:"listItem___3P4zY",eye:"eye___13vRl",roundBall:"roundBall___3rXBh",popover:"popover___2bsOT"}},78677:function(t){t.exports={container:"container___G0FNe"}},80961:function(t){t.exports={toolbar:"toolbar___3vxli"}},82499:function(t){t.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___1SHWL",toolBarButtonContainer:"toolBarButtonContainer___1jKUz",toolBarButton:"toolBarButton___3Ouq1",buttonText:"buttonText___10ls7",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AA28"}},72869:function(t){t.exports={map:"map___92VPN"}},20474:function(t){t.exports={RSPop1:"RSPop1___vz5Me",RSPop2:"RSPop2___34pQA"}},2661:function(t){t.exports={toolbar:"toolbar___1o3he"}},93889:function(t){t.exports={toolBarButtonContainerWrapper:"toolBarButtonContainerWrapper___UtH8a",toolBarButtonContainer:"toolBarButtonContainer___1gFsH",toolBarButton:"toolBarButton___1Wqc1",buttonText:"buttonText___2zcKO",toolBarButtonContainerWrapperActive:"toolBarButtonContainerWrapperActive___3AXHi"}},75513:function(t){t.exports={segment:"segment___3WmPw",mainStage:"mainStage___2kT1s",rightSideBar:"rightSideBar___11FX3"}},58967:function(t,C,n){"use strict";var $=n(20136),d=n(19181),T=n(77883),v=n(70507),r=n(57663),l=n(71577),P=n(2824),s=n(67294),M=n(61541),G=n(57560),Q=n.n(G),p=n(85893),N=1,e=20,Y=10;function W(j){return j?j<=N?N:j>=e?e:j:Y}var H=function(o){var E=(0,s.useState)(W(o.size)),U=(0,P.Z)(E,2),b=U[0],k=U[1];return(0,p.jsxs)(d.Z,{overlayClassName:Q().popover,placement:"right",content:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l.Z,{type:"text",onClick:function(){var y,B=W(b-1);k(B),(y=o.onChange)===null||y===void 0||y.call(0,B)},children:"-"}),(0,p.jsx)(v.Z,{min:1,max:20,value:b,onChange:o.onChange,controls:!1,style:{textAlign:"center"}}),(0,p.jsx)(l.Z,{type:"text",onClick:function(){var y,B=W(b+1);k(B),(y=o.onChange)===null||y===void 0||y.call(0,B)},children:"+"})]}),trigger:o.active?"hover":"click",children:[" ",(0,p.jsx)(M.Z,{active:o.active,imgSrc:"./pics/buttons/brush.png",onClick:o.onClick,children:"Brush"})]})};C.Z=H},35475:function(t,C,n){"use strict";n.d(C,{Z:function(){return V}});var $=n(54421),d=n(38272),T=n(57663),v=n(71577),r=n(2824),l=n(67294),P=n(56131),s=n.n(P),M=n(49111),G=n(19650),Q=n(11849),p=n(56623),N=n.n(p),e=n(20136),Y=n(19181),W=n(52822),H=n.n(W),j=n(63144),o=n(85893),E=function(c){var a=(0,l.useState)(c.color||"#FFF"),S=(0,r.Z)(a,2),g=S[0],u=S[1];return(0,o.jsx)(Y.Z,{getPopupContainer:function(f){return f.parentElement||document.body},overlayClassName:H().popover,openClassName:H().popoverOpenClassName,placement:"bottom",content:(0,o.jsx)(j.xS,{disableAlpha:!0,color:g,onChange:function(f){u(f.hex)},onChangeComplete:c.onChange}),trigger:"click",children:(0,o.jsx)("div",{className:H().roundBall,style:{backgroundColor:g}})})},U=E,b=function(c){var a=(0,Q.Z)({},c.label),S=(0,l.useState)(a.invisible),g=(0,r.Z)(S,2),u=g[0],Z=g[1],f=(0,o.jsx)(d.ZP.Item,{className:N().listItem,unselectable:"on",children:(0,o.jsxs)(G.Z,{align:"center",size:5,children:[(0,o.jsx)("a",{className:N().eye,style:{backgroundImage:u?"url(./pics/hide.png)":"url(./pics/show.png)"},onClick:function(){Z(!u),c.onLabelModify(a)}})," ",a.name,(0,o.jsx)(U,{color:a.color,onChange:function(I){a.color=I.hex,c.onLabelModify(a)}})]})});return f},k=b,J=n(71194),y=n(48889),B=n(9715),w=n(93766),dn=n(47673),un=n(24044),ln=function(c){var a=c.defaultLabel,S=(0,l.useState)(c.visible),g=(0,r.Z)(S,2),u=g[0],Z=g[1],f=(0,l.useState)((a==null?void 0:a.color)||"#FF0000"),A=(0,r.Z)(f,2),I=A[0],K=A[1],q=(0,l.useState)((a==null?void 0:a.name)||""),on=(0,r.Z)(q,2),hn=on[0],Cn=on[1];return(0,o.jsx)(y.Z,{title:"Add Label",visible:u,onCancel:c.onCancel,footer:null,children:(0,o.jsxs)(w.Z,{name:"basic",labelCol:{span:8},wrapperCol:{span:16},initialValues:{remember:!1},onFinish:function(D){var an={name:D.labelname,color:I};c.onLabelAdd(an),Z(!1)},autoComplete:"off",children:[(0,o.jsx)(w.Z.Item,{label:"Label Name",name:"labelname",rules:[{required:!0,message:"Please input label name!"}],children:(0,o.jsx)(un.Z,{defaultValue:hn})}),(0,o.jsx)(w.Z.Item,{label:"Select Color",name:"color",rules:[{required:!0,message:"Please select color!"}],children:(0,o.jsx)(U,{color:I,onChange:function(D){K(D.hex)}})}),(0,o.jsx)(w.Z.Item,{wrapperCol:{offset:8,span:16},children:(0,o.jsxs)(G.Z,{children:[(0,o.jsx)(v.Z,{onClick:function(){var D;Z(!1),(D=c.onCancel)===null||D===void 0||D.call(0)},children:"\u53D6\u6D88"}),(0,o.jsx)(v.Z,{type:"primary",htmlType:"submit",children:"\u786E\u5B9A"})]})})]})})},mn=ln,L=[{color:"#FF0000",name:"Label 1"},{color:"#008000",name:"Label 2"}],vn=function(c){var a=(0,l.useState)(L),S=(0,r.Z)(a,2),g=S[0],u=S[1],Z=(0,l.useState)(!1),f=(0,r.Z)(Z,2),A=f[0],I=f[1];return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(d.ZP,{className:s().labelList,size:"large",header:(0,o.jsx)("div",{className:s().listHeader,children:"Label List"}),footer:(0,o.jsx)("div",{children:(0,o.jsx)(v.Z,{style:{height:40,fontSize:"0.75rem"},type:"primary",onClick:function(){I(!0)},block:!0,children:"Add Label"})}),bordered:!0,dataSource:g,renderItem:function(q){return(0,o.jsx)(k,{label:q,onLabelDelete:c.onLabelDelete,onLabelModify:c.onLabelModify})}}),(0,o.jsx)(mn,{visible:A,onLabelAdd:function(){}})]})},V=vn},8088:function(t,C,n){"use strict";var $=n(67294),d=n(78677),T=n.n(d),v=n(85893),r=function(P){return(0,v.jsx)("div",{className:"".concat(T().container," ").concat(P.className),children:P.children})};C.Z=r},44434:function(t,C,n){"use strict";var $=n(67294),d=n(80961),T=n.n(d),v=n(85893),r=function(P){return(0,v.jsx)("div",{className:T().toolbar,children:P.children})};C.Z=r},61541:function(t,C,n){"use strict";var $=n(49111),d=n(19650),T=n(67294),v=n(82499),r=n.n(v),l=n(85893),P=function(M){return(0,l.jsx)("div",{unselectable:"on",className:"".concat(r().toolBarButtonContainerWrapper," ").concat(M.active&&r().toolBarButtonContainerWrapperActive),onClick:M.onClick,children:(0,l.jsx)(d.Z,{align:"center",className:r().toolBarButtonContainer,size:0,children:(0,l.jsxs)(d.Z,{align:"center",direction:"vertical",className:r().toolBarButton,size:0,children:[(0,l.jsx)("img",{src:M.imgSrc}),(0,l.jsx)("div",{className:r().buttonText,children:M.children})]})})})};C.Z=P},6779:function(t,C,n){"use strict";n.r(C),n.d(C,{default:function(){return Sn}});var $=n(20136),d=n(19181),T=n(2824),v=n(67294),r=n(75513),l=n.n(r),P=n(8088),s=n(61541),M=n(44434),G=n(58967),Q=n(35475),p=n(2661),N=n.n(p),e=n(85893),Y=function(m){return(0,e.jsx)("div",{className:N().toolbar,children:m.children})},W=Y,H=n(49111),j=n(19650),o=n(93889),E=n.n(o),U=function(m){return(0,e.jsx)("div",{unselectable:"on",className:"".concat(E().toolBarButtonContainerWrapper," ").concat(m.active&&E().toolBarButtonContainerWrapperActive),onClick:m.onClick,children:(0,e.jsx)(j.Z,{align:"center",className:E().toolBarButtonContainer,size:0,children:(0,e.jsxs)(j.Z,{align:"center",direction:"vertical",className:E().toolBarButton,size:0,children:[(0,e.jsx)("img",{src:m.imgSrc}),(0,e.jsx)("div",{className:E().buttonText,children:m.children})]})})})},b=U,k=n(47673),J=n(24044),y=n(13062),B=n(71230),w=n(59250),dn=n(13013),un=n(57663),ln=n(71577),mn=n(89032),L=n(15746),vn=n(30887),V=n(54689),en=n(34792),c=n(48086),a=n(89366),S=n(57254),g=n(20474),u=n.n(g);function Z(z){c.default.info("Click on menu item."),console.log("click",z)}var f=(0,e.jsxs)(V.Z,{onClick:Z,children:[(0,e.jsx)(V.Z.Item,{icon:(0,e.jsx)(a.Z,{}),children:"1st menu item"},"1"),(0,e.jsx)(V.Z.Item,{icon:(0,e.jsx)(a.Z,{}),children:"2nd menu item"},"2"),(0,e.jsx)(V.Z.Item,{icon:(0,e.jsx)(a.Z,{}),children:"3rd menu item"},"3")]}),A=function(){return(0,e.jsxs)("div",{children:[(0,e.jsxs)(B.Z,{children:[(0,e.jsx)(L.Z,{span:12,className:u().RSPop1,children:(0,e.jsx)("span",{children:"PD parameter"})}),(0,e.jsx)(L.Z,{span:12,className:u().RSPop2,children:(0,e.jsx)(dn.Z,{overlay:f,children:(0,e.jsxs)(ln.Z,{style:{width:"100%"},children:["Dropdown ",(0,e.jsx)(S.Z,{})]})})})]}),(0,e.jsxs)(B.Z,{children:[(0,e.jsx)(L.Z,{span:12,className:u().RSPop1,children:(0,e.jsx)("span",{children:"Simplified distance"})}),(0,e.jsx)(L.Z,{span:12,className:u().RSPop2,children:(0,e.jsx)(J.Z,{placeholder:"Basic usage"})})]}),(0,e.jsxs)(B.Z,{children:[(0,e.jsx)(L.Z,{span:12,className:u().RSPop1,children:(0,e.jsx)("span",{children:"Simplified angle"})}),(0,e.jsx)(L.Z,{span:12,className:u().RSPop2,children:(0,e.jsx)(J.Z,{placeholder:"Basic usage"})})]}),(0,e.jsxs)(B.Z,{children:[(0,e.jsx)(L.Z,{span:12,className:u().RSPop1,children:(0,e.jsx)("span",{children:"Threshold of building simplification "})}),(0,e.jsx)(L.Z,{span:12,className:u().RSPop2,children:(0,e.jsx)(J.Z,{placeholder:"Basic usage"})})]})]})},I=A,K=n(11849),q=n(93224),on=n(41004),hn=n(74607),Cn=function(m){var _=m.children,R=m.onSelectionCircleAdded,O=m.onSelectionCircleMoved,h=m.onSelectionCircleRemoved,sn=(0,q.Z)(m,["children","onSelectionCircleAdded","onSelectionCircleMoved","onSelectionCircleRemoved"]),cn=v.useRef(null);return v.useEffect(function(){if(cn.current){let gn=function(i){var x=prompt("Please enter a Unique Id");if(x)if(Pn[x]){alert("Id already used, add another one"),gn(i);return}else i._uid=x,Pn[x]=i;else{alert("Nothing entered, layer deleted ..."),i.remove();return}},jn=function(i){var x=i._uid,F=i.toGeoJSON();F.properties={LabelID:Number(x)},console.log("Store Layer on DB. Id:"+x,F),console.log(JSON.stringify(F))},yn=function(i){var x=i._uid,F=i.toGeoJSON();console.log("Update Layer on DB. Id:"+x,F)};var X=cn.current.leafletElement;X.pm.addControls({drawMarker:!1,drawCircle:!1,drawCircleMarker:!1,drawPolyline:!0,drawRectangle:!0,drawPolygon:!0,editMode:!0,dragMode:!0,cutPolygon:!0}),X.pm.setGlobalOptions({pmIgnore:!1}),X.pm.Toolbar.createCustomControl({name:"StoreShapes",title:"Store all shapes",block:"custom",className:"custom-control-icon",toggle:!1,afterClick:function(){var x=JSON.stringify(X.pm.getGeomanDrawLayers(!0).toGeoJSON()),F="data.geojson",nn=document.createElement("a");nn.setAttribute("href","data:text/plain;charset=utf-8,"+encodeURIComponent(x)),nn.setAttribute("download",F),nn.style.display="none",document.body.appendChild(nn),nn.click(),console.log(x)}});var Pn={};X.on("pm:create",function(i){gn(i.layer),i.layer.bindPopup("Label: "+i.layer._uid).openPopup(),jn(i.layer)}),X.on("pm:edit",function(i){yn(i.layer)})}}),(0,e.jsx)(on.Z,(0,K.Z)((0,K.Z)({ref:cn},sn),{},{children:_}))},tn=Cn,D=n(3263),an=n(72869),fn=n.n(an),rn={lat:51.505,lng:-.09,zoom:13},xn=function(){var m=[rn.lat,rn.lng],_=function(){return console.log("circle added")},R=function(){return console.log("circle moved")},O=function(){return console.log("circle removed")};return(0,e.jsx)(tn,{className:fn().map,center:m,zoom:rn.zoom,onSelectionCircleAdded:_,onSelectionCircleMoved:R,onSelectionCircleRemoved:O,children:(0,e.jsx)(D.Z,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"})})},pn=xn,Bn=function(){var m=(0,v.useState)(void 0),_=(0,T.Z)(m,2),R=_[0],O=_[1];return(0,e.jsxs)(P.Z,{className:l().segment,children:[(0,e.jsxs)(M.Z,{children:[(0,e.jsx)(s.Z,{imgSrc:"./pics/buttons/intelligent_interaction.png",children:"Intelligent Interaction"}),(0,e.jsx)(s.Z,{active:R=="polygon",imgSrc:"./pics/buttons/polygon.png",onClick:function(){O("polygon")},children:"Polygon"}),(0,e.jsx)(G.Z,{active:R=="brush",onClick:function(){O("brush")},onChange:function(sn){console.log(sn)}}),(0,e.jsxs)(d.Z,{placement:"rightTop",title:"title",content:"content",trigger:R=="rubber"?"hover":"click",children:[" ",(0,e.jsx)(s.Z,{imgSrc:"./pics/buttons/rubber.png",onClick:function(){O("rubber")},children:"Rubber"})]}),(0,e.jsx)(s.Z,{imgSrc:"./pics/buttons/zoom_in.png",children:"Zoom in"}),(0,e.jsx)(s.Z,{imgSrc:"./pics/buttons/zoom_out.png",children:"Zoom out"}),(0,e.jsx)(s.Z,{imgSrc:"./pics/buttons/save.png",children:"Save"}),(0,e.jsx)(s.Z,{imgSrc:"./pics/buttons/move.png",children:"Move"}),(0,e.jsx)(s.Z,{imgSrc:"./pics/buttons/export.png",children:"Export"}),(0,e.jsx)(s.Z,{imgSrc:"./pics/buttons/data_division.png",children:"Divide Data"}),(0,e.jsx)(s.Z,{imgSrc:"./pics/buttons/prev.png",children:"Undo"}),(0,e.jsx)(s.Z,{imgSrc:"./pics/buttons/next.png",children:"Redo"}),(0,e.jsx)(s.Z,{imgSrc:"./pics/buttons/clear_mark.png",children:"Clear Mark"})]}),(0,e.jsx)("div",{className:l().mainStage,children:(0,e.jsx)(pn,{})}),(0,e.jsxs)(W,{children:[(0,e.jsxs)(d.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Setting of boundary simplification",content:(0,e.jsx)(e.Fragment,{children:(0,e.jsx)(I,{})}),trigger:R=="boundry"?"click":"hover",children:[" ",(0,e.jsx)(b,{imgSrc:"./pics/buttons/border_simplify.png",onClick:function(){O("boundry")},children:(0,e.jsx)("h2",{children:"Boundary"})})]}),(0,e.jsxs)(d.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Setting of remote sensing",content:"content",trigger:R=="colorgun"?"click":"hover",children:[" ",(0,e.jsx)(b,{imgSrc:"./pics/buttons/remote_sensing_setting.png",onClick:function(){O("colorgun")},children:(0,e.jsx)("h2",{children:"Remote Sensing"})})]}),(0,e.jsxs)(d.Z,{overlayInnerStyle:{borderRadius:"0.5rem"},placement:"leftTop",title:"Switch grids",content:"content",trigger:R=="grid"?"click":"hover",children:[" ",(0,e.jsx)(b,{imgSrc:"./pics/buttons/switch_grid.png",onClick:function(){O("grid")},children:(0,e.jsx)("h2",{children:"Grids"})})]})]}),(0,e.jsx)("div",{className:l().rightSideBar,children:(0,e.jsx)(Q.Z,{onLabelModify:function(){},onLabelDelete:function(){},onLabelAdd:function(){}})})]})},Sn=Bn}}]);
