import React, { useState } from 'react';
import styles from './index.less';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const PPMap: React.FC = () => {
  const [x, setX] = useState([30.0444, 31.2357]);
  setTimeout(() => {
    setX([31.2357, 30.0444]);
  }, 1000);
  return (
    <MapContainer center={x} zoom={8} className={styles.ppmap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={x}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default PPMap;
