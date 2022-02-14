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

  const onSelectionCircleAdded = () => console.log('circle added');
  const onSelectionCircleMoved = () => console.log('circle moved');
  const onSelectionCircleRemoved = () => console.log('circle removed');

  return (
    <MapWithGeoman
      className={styles.map}
      center={position}
      zoom={defaultPosition.zoom}
      onSelectionCircleAdded={onSelectionCircleAdded}
      onSelectionCircleMoved={onSelectionCircleMoved}
      onSelectionCircleRemoved={onSelectionCircleRemoved}
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
