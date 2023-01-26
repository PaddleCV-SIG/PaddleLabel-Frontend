import type { Label } from '@/models/Label';
import { useEffect, useState } from 'react';
import type { GeojsonCollection } from '.';

export default function (props: {
  leafletMapRef: React.RefObject<any>;
  currentLabel?: Label;
  setAnnotations: (annotations: GeojsonCollection) => void;
  annotations: GeojsonCollection;
  recordHistory: (annos: GeojsonCollection) => void;
}) {
  const [maxId, setMaxId] = useState(0);
  const [polyVisable, setPolyVis] = useState(false);
  // const [currentLabel, setCurrentLabel] = useState(props.currentLabel);
  useEffect(() => {
    localStorage.setItem('currentLabel', JSON.stringify(props.currentLabel || {}));
  }, [props.currentLabel]);

  useEffect(() => {
    localStorage.setItem('annotations', JSON.stringify(props.annotations || {}));
  }, [props.annotations]);

  const toggleTest = () => {
    const drawToggleCheck = props.leafletMapRef.current?.leafletElement.pm.globalDrawModeEnabled();
    console.log(drawToggleCheck);
  };

  // const RSGGG = () => {
  //   props.leafletMapRef.current?.leafletElement.on('pm:edit', (e: any) => {
  //     setPolyVis(false);
  //     console.log(e);
  //     console.log('HIIIII');
  //   });
  // };

  // Everytime currentTool changes, react will rerender this component(aka re-call Page() function to generate)
  // This means Page() function will always be called with currentTool's latest value.
  const RSDraw = (RScurrentTool: any) => {
    const LabelNew = localStorage.getItem('currentLabel');
    // console.log(LabelNew);
    if (LabelNew != '{}') {
      setPolyVis(true);
      const LabelNewNew = JSON.parse(LabelNew || '{}');
      props.leafletMapRef.current?.leafletElement.pm.enableDraw(RScurrentTool);
      // console.log('drawTools: ', RScurrentTool);
      props.leafletMapRef.current?.leafletElement.pm.setPathOptions({
        color: LabelNewNew?.color,
        fillColor: LabelNewNew?.color,
        fillOpacity: 0.4,
      });
    } else {
      alert('Test');
      props.leafletMapRef.current?.leafletElement.pm.disableDraw(RScurrentTool);
      setPolyVis(false);
    }
  };

  const RSDrawDisable = (RScurrentTool: any) => {
    props.leafletMapRef.current?.leafletElement.pm.disableDraw(RScurrentTool);
    setPolyVis(false);
    toggleTest();
  };

  // For lines and Polygons only
  const currentShape = () => {
    return props.leafletMapRef.current?.leafletElement.pm.Draw.getActiveShape();
  };

  const removeLastVertex = () => {
    if (currentShape() == 'Polygon') {
      props.leafletMapRef.current?.leafletElement.pm.Draw.Polygon._removeLastVertex();
      toggleTest();
    } else {
      toggleTest();
      setPolyVis(false);
    }
  };

  const moveShape = () => {
    props.leafletMapRef.current?.leafletElement.pm.toggleGlobalDragMode();
    toggleTest();
  };

  const finishShape = () => {
    if (currentShape() == 'Polygon') {
      props.leafletMapRef.current?.leafletElement.pm.Draw.Polygon._finishShape();
      toggleTest();
      setPolyVis(false);
    } else {
      toggleTest();
      setPolyVis(false);
    }
  };

  const removeShape = () => {
    props.leafletMapRef.current?.leafletElement.pm.enableGlobalRemovalMode();
    toggleTest();
  };

  const editMode = () => {
    props.leafletMapRef.current?.leafletElement.pm.toggleGlobalEditMode();
    toggleTest();
    setPolyVis(false);
  };

  const saveGeoJson = () => {
    // console.log(props.leafletMapRef.current?.leafletElement.pm.getGeomanDrawLayers(true));
    setPolyVis(false);
  };

  // console.log(`operation re-rendering. currentLabel:${props.currentLabel}`);
  const storeOnDb = (layer: any) => {
    // const uid = layer._uid;
    const json = layer.toGeoJSON();
    const LabelNew = JSON.parse(localStorage.getItem('currentLabel') || '{}');
    setMaxId(maxId + 1);
    // console.log(`storeOnDb. currentLabel:${props.currentLabel}`);
    json.properties = {
      labelName: LabelNew?.name,
      stroke: LabelNew?.color,
      annotationId: maxId + 1,
    };
    // console.log('Store Layer on DB. Id:' + uid, json);
    // console.log(JSON.stringify(json));
    const newAnnotation = JSON.parse(localStorage.getItem('annotations') || '{}');
    const setanno = {
      ...newAnnotation,
      features: newAnnotation.features.concat(json),
    };
    console.log(setanno);
    props.setAnnotations(setanno);
    props.recordHistory(setanno);
  };

  function onShapeCreate(e: any) {
    // console.log(props.currentLabel);
    // enterUid(e.layer);
    // e.layer.bindPopup('Label: ' + e.layer._uid).openPopup();
    setPolyVis(false);

    storeOnDb(e.layer);
  }
  const onShapeEdit = (e: any) => {
    console.log(e);
  };

  const toolZoomIn = () => {
    props.leafletMapRef.current?.leafletElement.zoomIn();
    toggleTest();
  };

  const toolZoomOut = () => {
    props.leafletMapRef.current?.leafletElement.zoomOut();
    toggleTest();
  };

  return {
    polyVisable,
    RSDraw,
    RSDrawDisable,
    removeLastVertex,
    moveShape,
    finishShape,
    removeShape,
    editMode,
    saveGeoJson,
    storeOnDb,
    onShapeCreate,
    onShapeEdit,
    toolZoomIn,
    toolZoomOut,
    currentShape,
  };
}
