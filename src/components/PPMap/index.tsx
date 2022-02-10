import React from 'react';
import styles from './index.less';
import { LayersControl, MapContainer, Marker, Popup, TileLayer, GeoJSON } from 'react-leaflet';

const PPMap: React.FC = () => {
  const center = [0.0, 0.0];

  const jsonpoly = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [24.477539062499996, 21.820707853875017],
              [37.08984375, 21.820707853875017],
              [37.08984375, 31.87755764334002],
              [24.477539062499996, 31.87755764334002],
              [24.477539062499996, 21.820707853875017],
            ],
          ],
        },
      },
    ],
  };
  return (
    <MapContainer center={center} zoom={1.5} className={styles.ppmap}>
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
        <LayersControl.Overlay name="Flag with popup">
          <Marker position={center}>
            <Popup>Pop Up Flag.</Popup>
          </Marker>
        </LayersControl.Overlay>
      </LayersControl>
      <GeoJSON data={jsonpoly} />
    </MapContainer>
  );
};
export default PPMap;
