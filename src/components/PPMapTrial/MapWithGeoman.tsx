import React from 'react';
import { Map, MapProps } from 'react-leaflet';
import L from 'leaflet';

import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

// type PMDrawCircleEvent = { layer: L.Circle & { pm: { enable: () => void } } };
// type PMEditCircleEvent = { target: L.Circle };

interface Props extends MapProps {
  onSelectionCircleAdded: (latLang: L.LatLng, radius: number) => void;
  onSelectionCircleMoved: (latLang: L.LatLng, radius: number) => void;
  onSelectionCircleRemoved: () => void;
}

const MapWithGeoman: React.FC<Props> = (props) => {
  const {
    children,
    onSelectionCircleAdded: onCircleAdded,
    onSelectionCircleMoved: onCircleMoved,
    onSelectionCircleRemoved: onCircleRemoved,
    ...mapProps
  } = props;

  const leafletMapRef = React.useRef<Map>(null);

  React.useEffect(() => {
    if (leafletMapRef.current) {
      const mapElement = leafletMapRef.current.leafletElement;

      (mapElement as any).pm.addControls({
        drawMarker: true,
        drawCircle: false,
        drawCircleMarker: false,
        drawPolyline: true,
        drawRectangle: false,
        drawPolygon: true,
        editMode: true,
        dragMode: true,
        cutPolygon: false,
      });

      (mapElement as any).pm.setGlobalOptions({ pmIgnore: false });
    }
  });

  return (
    <Map ref={leafletMapRef} {...mapProps}>
      {children}
    </Map>
  );
};

export default MapWithGeoman;
