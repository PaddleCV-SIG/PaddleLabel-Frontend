import React, { useState } from 'react';
import { Popover } from 'antd';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPBrush from '@/components/PPLabelPage/PPBrush';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
// import PPMap from '@/components/PPMap';
import PPRSToolBar from '@/components/PPRS/PPRSToolBar';
import PPRSToolBarButton from '@/components/PPRS/PPRSToolBarButton';
import PPBoundarySimplify from '@/components/PPRS/PPBoundarySimplify';
import PPMapTrial from '@/components/PPMapTrial';
import { leafletMapRef } from '@/components/PPMapTrial/state';

export type ToolType =
  | 'Polygon'
  | 'brush'
  | 'rubber'
  | 'mover'
  | 'boundry'
  | 'colorgun'
  | 'grid'
  | undefined;
export type ToolType2 = undefined;

const Page: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolType>(undefined);
  setTimeout(() => {
    console.log(currentTool);
  }, 5000);
  const drawPolygon = () => {
    // console.log(leafletMapRef.current);
    leafletMapRef.current?.leafletElement.pm.enableDraw(currentTool, {
      snappable: true,
      snapDistance: 20,
    });
  };

  const removeLastV = () => {
    console.log(leafletMapRef.current?.leafletElement.pm.Draw);
    leafletMapRef.current?.leafletElement.pm.Draw.Polygon._finishShape();
  };

  return (
    <PPLabelPageContainer className={styles.segment}>
      <PPToolBar>
        <PPToolBarButton imgSrc="./pics/buttons/intelligent_interaction.png">
          Intelligent Interaction
        </PPToolBarButton>
        <PPToolBarButton
          active={currentTool == 'Polygon'}
          imgSrc="./pics/buttons/polygon.png"
          onClick={() => {
            setCurrentTool('Polygon');
            drawPolygon();
          }}
        >
          Polygon
        </PPToolBarButton>
        <PPBrush
          active={currentTool == 'brush'}
          onClick={removeLastV}
          onChange={(brushSize) => {
            console.log(brushSize);
          }}
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
              setCurrentTool('rubber');
            }}
          >
            Rubber
          </PPToolBarButton>
        </Popover>
        <PPToolBarButton imgSrc="./pics/buttons/zoom_in.png">Zoom in</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/zoom_out.png">Zoom out</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/save.png">Save</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/move.png">Move</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/export.png">Export</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">Divide Data</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/prev.png">Undo</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/next.png">Redo</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/clear_mark.png">Clear Mark</PPToolBarButton>
      </PPToolBar>
      <div className={styles.mainStage}>
        {/* <PPMap /> */}
        <PPMapTrial />
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
          content="content"
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
        <PPLabelList onLabelModify={() => {}} onLabelDelete={() => {}} onLabelAdd={() => {}} />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
