import React, { useState } from 'react';
import { Button, Popconfirm, Popover, Space } from 'antd';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import type { Label } from '@/models/label';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import type { Annotation } from '@/models/annotation';
import PPRSToolBar from '@/components/PPRS/PPRSToolBar';
import PPRSToolBarButton from '@/components/PPRS/PPRSToolBarButton';
import PPBoundarySimplify from '@/components/PPRS/PPBoundarySimplify';
import PPRGBSetting from '@/components/PPRS/PPRGBSetting';
import PPMapTrial from '@/components/PPMapTrial';
import type { Map } from 'react-leaflet';

export type ToolType =
  | 'polygon'
  | 'brush'
  | 'rubber'
  | 'mover'
  | 'boundry'
  | 'colorgun'
  | 'grid'
  | 'Marker'
  | 'Line'
  | 'Rectangle'
  | 'Polygon'
  | undefined;
export type ToolType2 = undefined;

const Page: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolType>(undefined);
  const [currentLabel, setCurrentLabel] = useState<Label>();
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation>();
  const [polyVisable, setPolyVis] = useState(false);
  //const [brushSize, setBrushSize] = useState(10);

  //const dr = draw({ currentLabel: currentLabel, brushSize: brushSize });
  // TODO: How to click dr

  const leafletMapRef = React.useRef<Map>(null);

  const toggleTest = () => {
    const drawToggleCheck = leafletMapRef.current?.leafletElement.pm.globalDrawModeEnabled();
    console.log(drawToggleCheck);
  };

  // const RSGGG = () => {
  //   leafletMapRef.current?.leafletElement.on('pm:edit', (e: any) => {
  //     setPolyVis(false);
  //     console.log(e);
  //     console.log('HIIIII');
  //   });
  // };

  // Everytime currentTool changes, react will rerender this component(aka re-call Page() function to generate)
  // This means Page() function will always be called with currentTool's latest value.
  function RSDraw(RScurrentTool: any) {
    setPolyVis(true);
    if (RScurrentTool) {
      leafletMapRef.current?.leafletElement.pm.enableDraw(RScurrentTool);
      // console.log('drawTools: ', RScurrentTool);
      leafletMapRef.current?.leafletElement.pm.setPathOptions({
        color: 'orange',
        fillColor: 'green',
        fillOpacity: 0.4,
      });
      toggleTest();
    } else {
      leafletMapRef.current?.leafletElement.pm.disableDraw(RScurrentTool);
      setPolyVis(false);
      toggleTest();
    }
  }

  const RSDrawDisable = (RScurrentTool: any) => {
    leafletMapRef.current?.leafletElement.pm.disableDraw(RScurrentTool);
    setPolyVis(false);
    toggleTest();
  };

  // For lines and Polygons only
  // FIXME: The "Draw" have not attribute named "Polygon"
  const currentShape = () => {
    return leafletMapRef.current?.leafletElement.pm.Draw.getActiveShape();
  };

  const removeLastVertex = () => {
    if (currentShape() == 'Polygon') {
      leafletMapRef.current?.leafletElement.pm.Draw.Polygon._removeLastVertex();
      toggleTest();
    } else {
      toggleTest();
      setPolyVis(false);
    }
  };

  const moveShape = () => {
    leafletMapRef.current?.leafletElement.pm.toggleGlobalDragMode();
    toggleTest();
  };

  const finishShape = () => {
    if (currentShape() == 'Polygon') {
      leafletMapRef.current?.leafletElement.pm.Draw.Polygon._finishShape();
      toggleTest();
      setPolyVis(false);
    } else {
      toggleTest();
      setPolyVis(false);
    }
  };

  const removeShape = () => {
    leafletMapRef.current?.leafletElement.pm.enableGlobalRemovalMode();
    toggleTest();
  };

  const editMode = () => {
    leafletMapRef.current?.leafletElement.pm.toggleGlobalEditMode();
    toggleTest();
    setPolyVis(false);
  };

  const saveGeoJson = () => {
    console.log(leafletMapRef.current?.leafletElement.pm.getGeomanDrawLayers(true));
    setPolyVis(false);
  };

  const [uids, setUids] = React.useState([]);

  const onShapeCreate = (e: any) => {
    enterUid(e.layer);
    e.layer.bindPopup('Label: ' + e.layer._uid).openPopup();
    setPolyVis(false);

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

  const toolZoomIn = () => {
    leafletMapRef.current?.leafletElement.zoomIn();
    toggleTest();
  };

  const toolZoomOut = () => {
    leafletMapRef.current?.leafletElement.zoomOut();
    toggleTest();
  };

  return (
    <PPLabelPageContainer className={styles.segment}>
      <PPToolBar>
        <PPToolBarButton imgSrc="./pics/buttons/intelligent_interaction.png">
          Intelligent Interaction
        </PPToolBarButton>
        <Popover
          placement="rightTop"
          // title="Polygon Edit"
          visible={polyVisable}
          content={
            <>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    finishShape();
                  }}
                >
                  Finish
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    removeLastVertex();
                  }}
                >
                  Remove Last Vertex
                </Button>
                <Popconfirm title="Are you sure cancel this task?" okText="Yes" cancelText="No">
                  <Button
                    type="primary"
                    onClick={() => {
                      RSDrawDisable(currentShape());
                    }}
                  >
                    Cancel
                  </Button>
                </Popconfirm>
              </Space>
            </>
          }
          trigger={currentTool == 'Polygon' ? 'hover' : 'click'}
        >
          <PPToolBarButton
            active={currentTool == 'Polygon'}
            imgSrc="./pics/buttons/polygon.png"
            onClick={() => {
              setCurrentTool('Polygon');
              RSDraw('Polygon');
            }}
          >
            Polygon
          </PPToolBarButton>
        </Popover>
        <PPToolBarButton
          onClick={() => {
            editMode();
          }}
          imgSrc="./pics/buttons/brush.png"
        >
          Edit
        </PPToolBarButton>
        <Popover
          placement="rightTop"
          title="title"
          content="content"
          trigger={currentTool == 'rubber' ? 'hover' : 'click'}
        >
          {' '}
          <PPToolBarButton
            imgSrc="./pics/buttons/rubber.png"
            onClick={() => {
              removeShape();
            }}
          >
            Rubber
          </PPToolBarButton>
        </Popover>
        <PPToolBarButton
          onClick={() => {
            toolZoomIn();
          }}
          imgSrc="./pics/buttons/zoom_in.png"
        >
          Zoom in
        </PPToolBarButton>
        <PPToolBarButton
          onClick={() => {
            toolZoomOut();
          }}
          imgSrc="./pics/buttons/zoom_out.png"
        >
          Zoom out
        </PPToolBarButton>
        <PPToolBarButton
          onClick={() => {
            saveGeoJson();
          }}
          imgSrc="./pics/buttons/save.png"
        >
          Save
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/move.png" onClick={() => moveShape()}>
          Move
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/export.png">Export</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Divide Data</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/prev.png">Undo</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/next.png">Redo</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/clear_mark.png">Clear Mark</PPToolBarButton>
      </PPToolBar>
      <div className={styles.mainStage}>
        {/* <PPMap /> */}
        <PPMapTrial
          leafletMapRef={leafletMapRef}
          onShapeCreate={onShapeCreate}
          onShapeEdit={onShapeEdit}
        />
      </div>
      <PPRSToolBar>
        <Popover
          overlayInnerStyle={{ borderRadius: '0.5rem' }}
          placement="leftTop"
          title={'Setting of boundary simplification'}
          content={
            <>
              <PPBoundarySimplify />
            </>
          }
          trigger={currentTool == 'boundry' ? 'click' : 'hover'}
        >
          {' '}
          <PPRSToolBarButton
            imgSrc="./pics/buttons/border_simplify.png"
            onClick={() => {
              setCurrentTool('boundry');
            }}
          >
            <h2>Boundary</h2>
          </PPRSToolBarButton>
        </Popover>
        <Popover
          overlayInnerStyle={{ borderRadius: '0.5rem' }}
          placement="leftTop"
          title={'Setting of remote sensing'}
          content={
            <>
              <PPRGBSetting />
            </>
          }
          trigger={currentTool == 'colorgun' ? 'click' : 'hover'}
        >
          {' '}
          <PPRSToolBarButton
            imgSrc="./pics/buttons/remote_sensing_setting.png"
            onClick={() => {
              setCurrentTool('colorgun');
            }}
          >
            <h2>Remote Sensing</h2>
          </PPRSToolBarButton>
        </Popover>
        <Popover
          overlayInnerStyle={{ borderRadius: '0.5rem' }}
          placement="leftTop"
          title={'Switch grids'}
          content="content"
          trigger={currentTool == 'grid' ? 'click' : 'hover'}
        >
          {' '}
          <PPRSToolBarButton
            imgSrc="./pics/buttons/switch_grid.png"
            onClick={() => {
              setCurrentTool('grid');
            }}
          >
            <h2>Grids</h2>
          </PPRSToolBarButton>
        </Popover>
      </PPRSToolBar>
      <div className={styles.rightSideBar}>
        <div className={styles.determinOutline}>
          <Button style={{ height: 40, fontSize: '0.75rem' }} type="primary" block>
            Determine Outline
          </Button>
        </div>
        <PPLabelList
          selectedLabel={currentLabel}
          onLabelSelect={(label) => {
            setCurrentLabel(label);
          }}
          onLabelModify={() => {}}
          onLabelDelete={() => {}}
          onLabelAdd={() => {}}
        />
        <PPAnnotationList
          selectedAnnotation={currentAnnotation}
          onAnnotationSelect={(annotation) => {
            setCurrentAnnotation(annotation);
          }}
          onAnnotationAdd={() => {}}
          onAnnotationModify={() => {}}
          onAnnotationDelete={() => {}}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
