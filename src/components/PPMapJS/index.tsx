import React, { useEffect } from 'react';
import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import styles from './index.less';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import 'leaflet/dist/leaflet.css';
let map: any;
// let circle: any;
const OSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});
const esriWorldImagery = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  {
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
  },
);

const basemapLayers = {
  OpenStreetMap: OSM,
  EsriWorldImagery: esriWorldImagery,
  // TianDiTu: normalm,
  // 'Chna Satellite': imgm,
};

const layerCtrl = L.control.layers(basemapLayers);
const PPMapJS: React.FC = () => {
  useEffect(() => {
    map = L.map('leaflet-map');
    map.setView([0.0, 0.0], 2);

    map.pm.addControls();
    layerCtrl.addTo(map);
    OSM.addTo(map);
  }, []);
  return <div id="leaflet-map" className={styles.ppmapjs} />;
};
export default PPMapJS;
