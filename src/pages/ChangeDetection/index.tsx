import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Popover, Progress, Space } from 'antd';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import type { Label } from '@/models/label';
// import PPRSToolBar from '@/components/PPRS/PPRSToolBar';
// import PPRSToolBarButton from '@/components/PPRS/PPRSToolBarButton';
import PPBoundarySimplify from '@/components/PPRS/PPBoundarySimplify';
import PPCDRGBSetting from '@/components/PPRS/PPCDRGBSetting';
import PPGrids from '@/components/PPRS/PPGrids';
import PPMapTrial from '@/components/PPMapTrial';
import type { Map } from 'react-leaflet';
import PPGeoAnnotationList from '@/components/PPLabelPage/PPGeoAnnotationList';
import operation from './operation';
import PPSetButton from '@/components/PPLabelPage/PPButtonSet';
// import type { Annotation } from '@/models/annotation';
import { MOST_HISTORY_STEPS } from '@/services/history';
import { useIntl } from 'umi';

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

export type GeojsonCollection = {
  type: 'FeatureCollection';
  features: GeojsonFeatureObject[];
};

export type HistoryType = {
  index: number;
  items: GeojsonCollection[];
};

export type GeojsonFeatureObject = {
  type: 'Feature';
  properties: {
    annotationId: number;
    labelName: string;
    stroke: string;
  };
  geometry: {
    type: ToolType;
    coordinates: [any];
  };
};

const Page: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolType>(undefined);
  const [currentLabel, setCurrentLabel] = useState<Label>();
  // const [currentAnnotation, setCurrentAnnotationRaw] = useState<Annotation<any>>();
  const [annotations, setAnnotations] = useState<GeojsonCollection>({
    type: 'FeatureCollection',
    features: [],
  });

  useEffect(() => {
    localStorage.removeItem('history');
    recordHistory({
      type: 'FeatureCollection',
      features: [],
    });
  }, []);

  function recordHistory(annos: GeojsonCollection) {
    const historyStr = localStorage.getItem('history');
    const history: HistoryType = historyStr ? JSON.parse(historyStr) : { index: -1, items: [] };
    // const newItem = { annotations: annos };
    if (JSON.stringify(history.items[history.index]) == JSON.stringify(annos)) {
      return;
    }
    const earliestIndex =
      history.index > MOST_HISTORY_STEPS ? history.index - MOST_HISTORY_STEPS : 0;
    const itemsToKeep = history.items.splice(
      earliestIndex,
      history.index == 0 ? 1 : history.index + 1,
    );
    history.items = itemsToKeep.concat([annos]);
    if (history.index <= MOST_HISTORY_STEPS) history.index++;
    else history.index = MOST_HISTORY_STEPS + 1;
    localStorage.setItem('history', JSON.stringify(history));
  }

  const forwardHistory = () => {
    const historyStr = localStorage.getItem('history');
    if (!historyStr) {
      return;
    }
    const history: HistoryType = JSON.parse(historyStr);
    if (!history) {
      return;
    }
    if (history.index >= history.items.length - 1) {
      return;
    }
    history.index++;
    localStorage.setItem('history', JSON.stringify(history));
    const item = history.items[history.index];
    // setCurrentAnnotationRaw(item.currentAnnotation);
    setAnnotations(item);
  };

  const backwardHistory = () => {
    const historyStr = localStorage.getItem('history');
    if (!historyStr) return;
    const history: HistoryType = JSON.parse(historyStr);
    if (!history || !history.index) return;
    if (history.index <= 0) return; // already the latest
    history.index--;
    localStorage.setItem('history', JSON.stringify(history));
    const item = history.items[history.index];
    // setCurrentAnnotationRaw(item.currentAnnotation);
    setAnnotations(item);
  };
  //const [brushSize, setBrushSize] = useState(10);

  console.log(`rs is re-rendering! currentLabel: ${JSON.stringify(currentLabel)}`);

  const leafletMapRef = React.useRef<Map>(null);
  const dr = operation({ leafletMapRef, currentLabel, setAnnotations, annotations, recordHistory });

  const intl = useIntl();
  const finished = intl.formatMessage({ id: 'pages.Maps.finished' });
  const removeLastVertex = intl.formatMessage({ id: 'pages.Maps.removeLastVertex' });
  const cancel = intl.formatMessage({ id: 'pages.Maps.cancel' });
  const boundary = intl.formatMessage({ id: 'pages.Maps.boundary' });
  const remoteSensing = intl.formatMessage({ id: 'pages.Maps.remoteSensing' });
  const grids = intl.formatMessage({ id: 'pages.Maps.grids' });
  const polygonBtn = intl.formatMessage({ id: 'pages.toolBar.polygon' });
  const rubber = intl.formatMessage({ id: 'pages.toolBar.rubber' });
  const zoomIn = intl.formatMessage({ id: 'pages.toolBar.zoomIn' });
  const zoomOut = intl.formatMessage({ id: 'pages.toolBar.zoomOut' });
  const move = intl.formatMessage({ id: 'pages.toolBar.move' });
  const unDo = intl.formatMessage({ id: 'pages.toolBar.unDo' });
  const reDo = intl.formatMessage({ id: 'pages.toolBar.reDo' });
  const save = intl.formatMessage({ id: 'pages.toolBar.save' });
  const edit = intl.formatMessage({ id: 'pages.toolBar.edit' });
  const clearMark = intl.formatMessage({ id: 'pages.toolBar.clearMark' });
  const interactor = intl.formatMessage({ id: 'pages.toolBar.interactor' });
  const segmentThreshold = intl.formatMessage({ id: 'pages.toolBar.segmentThreshold' });
  const transparency = intl.formatMessage({ id: 'pages.toolBar.transparency' });
  const visualRadius = intl.formatMessage({ id: 'pages.toolBar.visualRadius' });
  const determineOutline = intl.formatMessage({ id: 'pages.toolBar.determineOutline' });
  const divideData = intl.formatMessage({ id: 'pages.toolBar.divideData' });
  const exportBtn = intl.formatMessage({ id: 'pages.toolBar.export' });

  return (
    <PPLabelPageContainer className={styles.segment}>
      <PPToolBar>
        <Popover
          placement="rightTop"
          // title="Polygon Edit"
          visible={dr.polyVisable}
          content={
            <>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    dr.finishShape();
                  }}
                >
                  {finished}
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    dr.removeLastVertex();
                  }}
                >
                  {removeLastVertex}
                </Button>
                <Popconfirm title="Are you sure cancel this task?" okText="Yes" cancelText="No">
                  <Button
                    type="primary"
                    onClick={() => {
                      dr.RSDrawDisable(dr.currentShape());
                    }}
                  >
                    {cancel}
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
              dr.RSDraw('Polygon');
            }}
          >
            {polygonBtn}
          </PPToolBarButton>
        </Popover>
        <PPToolBarButton
          onClick={() => {
            dr.editMode();
          }}
          imgSrc="./pics/buttons/edit.png"
        >
          {edit}
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
              dr.removeShape();
            }}
          >
            {rubber}
          </PPToolBarButton>
        </Popover>
        <PPToolBarButton
          onClick={() => {
            dr.toolZoomIn();
          }}
          imgSrc="./pics/buttons/zoom_in.png"
        >
          {zoomIn}
        </PPToolBarButton>
        <PPToolBarButton
          onClick={() => {
            dr.toolZoomOut();
          }}
          imgSrc="./pics/buttons/zoom_out.png"
        >
          {zoomOut}
        </PPToolBarButton>
        <PPToolBarButton
          onClick={() => {
            dr.saveGeoJson();
          }}
          imgSrc="./pics/buttons/save.png"
        >
          {save}
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/move.png" onClick={() => dr.moveShape()}>
          {move}
        </PPToolBarButton>
        <PPToolBarButton onClick={() => backwardHistory()} imgSrc="./pics/buttons/prev.png">
          {unDo}
        </PPToolBarButton>
        <PPToolBarButton onClick={() => forwardHistory()} imgSrc="./pics/buttons/next.png">
          {reDo}
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/clear_mark.png">{clearMark}</PPToolBarButton>
      </PPToolBar>
      {/* FIXME: how to do between 2 maps */}
      <div className={styles.mainStage}>
        <div className={styles.draw}>
          <div className={styles.halfMap}>
            <PPMapTrial
              leafletMapRef={leafletMapRef}
              onShapeCreate={dr.onShapeCreate}
              onShapeEdit={dr.onShapeEdit}
            />
          </div>
          <div className={styles.interval} />
          <div className={styles.halfMap}>
            <PPMapTrial
              leafletMapRef={leafletMapRef}
              displayTools={false}
              onShapeCreate={dr.onShapeCreate}
              onShapeEdit={dr.onShapeEdit}
            />
          </div>
        </div>
        <div className={styles.pblock}>
          <div className={styles.progress}>
            <Progress percent={50} status="active" />
          </div>
        </div>
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton imgSrc="./pics/buttons/intelligent_interaction.png">
          {interactor}
        </PPToolBarButton>
        <PPSetButton imgSrc="./pics/buttons/threshold.png" disLoc="left">
          {segmentThreshold}
        </PPSetButton>
        <PPSetButton imgSrc="./pics/buttons/alpha.png" disLoc="left">
          {transparency}
        </PPSetButton>
        <PPSetButton imgSrc="./pics/buttons/radius.png" disLoc="left">
          {visualRadius}
        </PPSetButton>
        <Popover
          overlayInnerStyle={{ borderRadius: '0.5rem' }}
          placement="leftTop"
          title={'Setting of boundary simplification'}
          content={<PPBoundarySimplify />}
          trigger={currentTool == 'boundry' ? 'click' : 'hover'}
        >
          {' '}
          <PPToolBarButton
            imgSrc="./pics/buttons/border_simplify.png"
            onClick={() => {
              setCurrentTool('boundry');
            }}
          >
            {boundary}
          </PPToolBarButton>
        </Popover>
        <Popover
          overlayInnerStyle={{ borderRadius: '0.5rem' }}
          placement="leftTop"
          title={'Setting of remote sensing'}
          content={<PPCDRGBSetting />}
          trigger={currentTool == 'colorgun' ? 'click' : 'hover'}
        >
          {' '}
          <PPToolBarButton
            imgSrc="./pics/buttons/remote_sensing_setting.png"
            onClick={() => {
              setCurrentTool('colorgun');
            }}
          >
            {remoteSensing}
          </PPToolBarButton>
        </Popover>
        <Popover
          overlayInnerStyle={{ borderRadius: '0.5rem' }}
          placement="leftTop"
          title={'Switch grids'}
          content={<PPGrids />}
          trigger={currentTool == 'grid' ? 'click' : 'hover'}
        >
          {' '}
          <PPToolBarButton
            imgSrc="./pics/buttons/switch_grid.png"
            onClick={() => {
              setCurrentTool('grid');
            }}
          >
            {grids}
          </PPToolBarButton>
        </Popover>
        <PPToolBarButton imgSrc="./pics/buttons/data_division.png">{divideData}</PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/export.png">{exportBtn}</PPToolBarButton>
      </PPToolBar>
      <div className={styles.rightSideBar}>
        <div className={styles.determinOutline}>
          <Button style={{ height: 40, fontSize: '0.75rem' }} type="primary" block>
            {determineOutline}
          </Button>
        </div>
        <PPLabelList
          selectedLabel={currentLabel}
          onLabelSelect={(label) => {
            setCurrentLabel(label);
            console.log(label);
          }}
          onLabelModify={() => {}}
          onLabelDelete={() => {}}
          onLabelAdd={() => {}}
        />
        <PPGeoAnnotationList
          annotations={annotations}
          onAnnotationSelect={() => {}}
          onAnnotationAdd={() => {}}
          onAnnotationModify={() => {}}
          onAnnotationDelete={() => {}}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
