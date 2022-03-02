import * as React from 'react';
import MapWithGeoman from './MapWithGeoman';
import type { Map } from 'react-leaflet';
import { LayersControl, TileLayer, LayerGroup } from 'react-leaflet';
import styles from './index.less';

import 'leaflet/dist/leaflet.css';

const defaultPosition = {
  lat: 0.0,
  lng: 0.0,
  zoom: 2,
};

export type PPMapProps = {
  leafletMapRef: React.RefObject<Map>;
  onShapeCreate: (e: any) => void;
  onShapeEdit: (e: any) => void;
};

const Component: React.FC<PPMapProps> = (props) => {
  const position: [number, number] = [defaultPosition.lat, defaultPosition.lng];

  return (
    <MapWithGeoman
      leafletMapRef={props.leafletMapRef}
      className={styles.map}
      center={position}
      zoom={defaultPosition.zoom}
      onShapeCreate={props.onShapeCreate}
      onShapeEdit={props.onShapeEdit}
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="TianDiTu.Vector">
          <LayerGroup attribution='&copy; <a href="https://www.tianditu.gov.cn/">TianDiTu</a> GS(2021)3715'>
            <TileLayer url="https://t2.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=8e879a4cad078fd3ce7456f2737fc4cc" />

            <TileLayer url="https://t2.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=8e879a4cad078fd3ce7456f2737fc4cc" />
          </LayerGroup>
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay name="Esri.WorldImagery">
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.Overlay>
      </LayersControl>
    </MapWithGeoman>
  );
};

export default Component;
