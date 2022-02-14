import * as React from 'react';
import MapWithGeoman from './MapWithGeoman';
import { TileLayer } from 'react-leaflet';
import styles from './index.less';

import 'leaflet/dist/leaflet.css';

const defaultPosition = {
  lat: 51.505,
  lng: -0.09,
  zoom: 13,
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
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapWithGeoman>
  );
};

export default Component;
