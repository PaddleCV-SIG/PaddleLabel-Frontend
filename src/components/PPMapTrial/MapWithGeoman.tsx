import React from 'react';
import type { MapProps } from 'react-leaflet';
import { Map } from 'react-leaflet';
import type L from 'leaflet';

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
        drawMarker: false,
        drawCircle: false,
        drawCircleMarker: false,
        drawPolyline: true,
        drawRectangle: true,
        drawPolygon: true,
        editMode: true,
        dragMode: true,
        cutPolygon: true,
      });
      (mapElement as any).pm.setGlobalOptions({ pmIgnore: false });

      // Custom button to save
      (mapElement as any).pm.Toolbar.createCustomControl({
        name: 'StoreShapes',
        title: 'Store all shapes',
        block: 'custom',
        className: 'custom-control-icon',
        toggle: false,
        afterClick: () => {
          const saveGeoJson = JSON.stringify(
            (mapElement as any).pm.getGeomanDrawLayers(true).toGeoJSON(),
          );
          const filename = 'data.geojson';
          const element = document.createElement('a');
          element.setAttribute(
            'href',
            'data:text/plain;charset=utf-8,' + encodeURIComponent(saveGeoJson),
          );
          element.setAttribute('download', filename);
          element.style.display = 'none';
          document.body.appendChild(element);
          element.click();
          console.log(saveGeoJson);
        },
      });
      // eslint-disable-next-line prefer-const
      let uids = {};
      (mapElement as any).on('pm:create', (e: any) => {
        enterUid(e.layer);
        e.layer.bindPopup('Label: ' + e.layer._uid).openPopup();
        storeOnDb(e.layer);
      });

      (mapElement as any).on('pm:edit', (e: any) => {
        updateOnDb(e.layer);
      });
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
    }
  });

  return (
    <Map ref={leafletMapRef} {...mapProps}>
      {children}
    </Map>
  );
};

export default MapWithGeoman;
