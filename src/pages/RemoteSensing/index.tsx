import React, { useState } from 'react';
import { Button, Popover } from 'antd';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPBrush from '@/components/PPLabelPage/PPBrush';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import type { Label } from '@/models/label';
import PPAnnotationList from '@/components/PPLabelPage/PPAnnotationList';
import type { Annotation } from '@/models/annotation';
// import draw from '@/components/PPLabelPage/PPBrush/draw';
// import PPMap from '@/components/PPMap';
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
  //const [brushSize, setBrushSize] = useState(10);

  //const dr = draw({ currentLabel: currentLabel, brushSize: brushSize });
  // TODO: How to click dr

  const leafletMapRef = React.useRef<Map>(null);
  // Everytime currentTool changes, react will rerender this component(aka re-call Page() function to generate)
  // This means Page() function will always be called with currentTool's latest value.
  function RSDraw(RScurrentTool: any) {
    if (RScurrentTool) {
      leafletMapRef.current?.leafletElement.pm.enableDraw(RScurrentTool);
      console.log('drawTools: ', currentTool);
      leafletMapRef.current?.leafletElement.pm.setPathOptions({
        color: 'orange',
        fillColor: 'green',
        fillOpacity: 0.4,
      });
    }
  }

  // For lines and Polygons only
  // FIXME: The "Draw" have not attribute named "Polygon"
  const removeLastVertex = () => {
    console.log(leafletMapRef.current?.leafletElement.pm.Draw);
    leafletMapRef.current?.leafletElement.pm.Draw.Polygon._removeLastVertex();
  };

  const moveShape = () => {
    console.log(leafletMapRef.current?.leafletElement.pm.Draw);
    leafletMapRef.current?.leafletElement.pm.toggleGlobalDragMode();
  };

  const finishShape = () => {
    console.log(leafletMapRef.current?.leafletElement.pm.Draw);
    leafletMapRef.current?.leafletElement.pm.Draw.Polygon._finishShape();
  };

  const removeShape = () => {
    leafletMapRef.current?.leafletElement.pm.enableGlobalRemovalMode();
  };

  return (
    <PPLabelPageContainer className={styles.segment}>
      <PPToolBar>
        <PPToolBarButton imgSrc="./pics/buttons/intelligent_interaction.png">
          Intelligent Interaction
        </PPToolBarButton>
        <Popover
          placement="rightTop"
          title="Polygon Edit"
          defaultVisible={true}
          content={
            <>
              <button
                onClick={() => {
                  removeLastVertex();
                }}
              >
                Remove Last Vertex
              </button>
              <button
                onClick={() => {
                  finishShape();
                }}
              >
                Finish
              </button>
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
        <PPBrush
          active={currentTool == 'brush'}
          onClick={() => {
            setCurrentTool('brush');
          }}
          onChange={(brushSize) => {
            console.log(brushSize);
          }}
          // onChange={(newBrushSize) => {
          //   setBrushSize(newBrushSize);
          // }}
        />
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
        <PPToolBarButton imgSrc="./pics/buttons/zoom_in.png">Zoom in</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/zoom_out.png">Zoom out</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/save.png">Save</PPToolBarButton>
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
        <PPMapTrial leafletMapRef={leafletMapRef} />
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
