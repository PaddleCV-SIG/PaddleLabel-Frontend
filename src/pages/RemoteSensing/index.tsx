import React, { useState } from 'react';
import { Popover } from 'antd';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPBrush from '@/components/PPLabelPage/PPBrush';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export type ToolType = 'polygon' | 'brush' | 'rubber' | 'mover' | undefined;

const Page: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolType>(undefined);

  return (
    <PPLabelPageContainer className={styles.segment}>
      <PPToolBar>
        <PPToolBarButton imgSrc="./pics/buttons/intelligent_interaction.png">
          智能交互
        </PPToolBarButton>
        <PPToolBarButton
          active={currentTool == 'polygon'}
          imgSrc="./pics/buttons/polygon.png"
          onClick={() => {
            setCurrentTool('polygon');
          }}
        >
          多边形
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
            橡皮擦
          </PPToolBarButton>
        </Popover>
        <PPToolBarButton imgSrc="./pics/buttons/zoom_in.png">放大</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/zoom_out.png">缩小</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/save.png">保存</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/move.png">移动</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/export.png">导出</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">数据划分</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/prev.png">上一步</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/next.png">下一步</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/clear_mark.png">清除标注</PPToolBarButton>
      </PPToolBar>
      <MapContainer center={[51.505, -0.09]} zoom={13} className={styles.ppmap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <div className={styles.mainStage} />
      <div className={styles.rightSideBar}>
        <PPLabelList onLabelModify={() => {}} onLabelDelete={() => {}} onLabelAdd={() => {}} />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
