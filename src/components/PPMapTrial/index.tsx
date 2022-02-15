import * as React from 'react';
import MapWithGeoman from './MapWithGeoman';
import { LayersControl, TileLayer } from 'react-leaflet';
import styles from './index.less';

import 'leaflet/dist/leaflet.css';

const defaultPosition = {
  lat: 0.0,
  lng: 0.0,
  zoom: 2,
};

const Component: React.FC = () => {
  const position: [number, number] = [defaultPosition.lat, defaultPosition.lng];
  const [uids, setUids] = React.useState([]);

  const onShapeCreate = (e: any) => {
    enterUid(e.layer);
    e.layer.bindPopup('Label: ' + e.layer._uid).openPopup();
    storeOnDb(e.layer);
  };
  const onShapeEdit = (e: any) => {
    updateOnDb(e.layer);
    console.log(e);
  };

  function enterUid(layer: any) {
    const p = prompt('Please enter a Unique Id');
    if (!p) {
      alert('Nothing entered, layer deleted ...');
      layer.remove();
      return;
    } else if (uids[p]) {
      alert('Id already used, add another one');
      enterUid(layer);
      return;
    } else {
      layer._uid = p;
      uids[p] = layer;
      setUids(uids);
    }
  }
  function storeOnDb(layer: any) {
    const uid = layer._uid;
    const json = layer.toGeoJSON();
    json.properties = {
      LabelID: Number(uid),
    };
    console.log('Store Layer on DB. Id:' + uid, json);
    console.log(JSON.stringify(json));
  }

  function updateOnDb(layer: any) {
    const uid = layer._uid;
    const json = layer.toGeoJSON();
    console.log('Update Layer on DB. Id:' + uid, json);
  }

  return (
    <MapWithGeoman
      className={styles.map}
      center={position}
      zoom={defaultPosition.zoom}
      onShapeCreate={onShapeCreate}
      onShapeEdit={onShapeEdit}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="TianDiTu.Satellite">
          <TileLayer
            attribution="&copy; TianDiTu"
            url="https://t2.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Esri.WorldImagery">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Annotion.TianDiTu">
          <TileLayer url="https://t2.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=174705aebfe31b79b3587279e211cb9a" />
        </LayersControl.Overlay>
      </LayersControl>
    </MapWithGeoman>
  );
};

export default Component;
