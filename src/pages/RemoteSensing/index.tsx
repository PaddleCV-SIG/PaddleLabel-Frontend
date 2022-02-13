import React, { useState } from 'react';
import { Popover } from 'antd';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPBrush from '@/components/PPLabelPage/PPBrush';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPMap from '@/components/PPMap';
import PPRSToolBar from '@/components/PPRS/PPRSToolBar';
import PPRSToolBarButton from '@/components/PPRS/PPRSToolBarButton';
import PPBoundarySimplify from '@/components/PPRS/PPBoundarySimplify';

export type ToolType =
  | 'polygon'
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
  return (
    <PPLabelPageContainer className={styles.segment}>
      <PPToolBar>
        <PPToolBarButton imgSrc="./pics/buttons/intelligent_interaction.png">
          Intelligent Interaction
        </PPToolBarButton>
        <PPToolBarButton
          active={currentTool == 'polygon'}
          imgSrc="./pics/buttons/polygon.png"
          onClick={() => {
            setCurrentTool('polygon');
          }}
        >
          Polygon
        </PPToolBarButton>
        <PPBrush
          active={currentTool == 'brush'}
          onClick={() => {
            setCurrentTool('brush');
          }}
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
        <PPMap />
      </div>
      <PPRSToolBar>
        <Popover
          overlayInnerStyle={{ borderRadius: '5%' }}
          placement="leftTop"
          title={<h4>Setting of boundary simplification</h4>}
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
            Boundary
          </PPRSToolBarButton>
        </Popover>
        <Popover
          overlayInnerStyle={{ borderRadius: '5%' }}
          placement="leftTop"
          title={<h4>Setting of remote sensing</h4>}
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
            Remote sensing
          </PPRSToolBarButton>
        </Popover>
        <Popover
          overlayInnerStyle={{ borderRadius: '5%' }}
          placement="leftTop"
          title={<h4>Switch grids</h4>}
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
            Grids
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
