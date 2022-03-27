/* eslint-disable @typescript-eslint/no-unused-vars */ // TODO: remove this
import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Popover, Progress, Space } from 'antd';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
// import PPRSToolBar from '@/components/PPRS/PPRSToolBar';
// import PPRSToolBarButton from '@/components/PPRS/PPRSToolBarButton';
import PPBoundarySimplify from '@/components/PPRS/PPBoundarySimplify';
import PPRGBSetting from '@/components/PPRS/PPRGBSetting';
import PPGrids from '@/components/PPRS/PPGrids';
import PPMapTrial from '@/components/PPMapTrial';
import type { Map } from 'react-leaflet';
import PPGeoAnnotationList from '@/components/PPLabelPage/PPGeoAnnotationList';
import operation from './operation';
import PPSetButton from '@/components/PPLabelPage/PPButtonSet';
// import type { Annotation } from '@/models/annotation';
import { useIntl } from 'umi';
import { backwardHistory, forwardHistory, initHistory, recordHistory } from '@/components/history';
import { PageInit } from '@/services/utils';

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
  const [
    tool,
    loading,
    scale,
    annotation,
    task,
    data,
    project,
    label,
    splitDataset,
    exportDataset,
  ] = PageInit(useState, useEffect, {
    label: { oneHot: false },
    tool: { defaultTool: 'mover' },
    effectTrigger: {},
  });
  const [divideModalVisible, setDivideModalVisible] = useState<boolean>(false);
  const [exportModalVisible, setExportModalVisible] = useState<boolean>(false);

  // const [currentAnnotation, setCurrentAnnotationRaw] = useState<Annotation<any>>();
  const [annotations, setAnnotations] = useState<GeojsonCollection>({
    type: 'FeatureCollection',
    features: [],
  });

  useEffect(() => {
    initHistory();
  }, []);

  console.log(`rs is re-rendering! label.curr: ${JSON.stringify(label.curr)}`);

  const leafletMapRef = React.useRef<Map>(null);
  const dr = operation({
    leafletMapRef: leafletMapRef,
    currentLabel: label.curr,
    setAnnotations: setAnnotations,
    annotations: annotations,
    recordHistory: recordHistory,
  });

  const finished = useIntl().formatMessage({ id: 'pages.Maps.finished' });
  const removeLastVertex = useIntl().formatMessage({ id: 'pages.Maps.removeLastVertex' });
  const cancel = useIntl().formatMessage({ id: 'pages.Maps.cancel' });
  const boundary = useIntl().formatMessage({ id: 'pages.Maps.boundary' });
  const remoteSensing = useIntl().formatMessage({ id: 'pages.Maps.remoteSensing' });
  const grids = useIntl().formatMessage({ id: 'pages.Maps.grids' });
  const polygonBtn = useIntl().formatMessage({ id: 'pages.toolBar.polygon' });
  const rubber = useIntl().formatMessage({ id: 'pages.toolBar.rubber' });
  const zoomIn = useIntl().formatMessage({ id: 'pages.toolBar.zoomIn' });
  const zoomOut = useIntl().formatMessage({ id: 'pages.toolBar.zoomOut' });
  const move = useIntl().formatMessage({ id: 'pages.toolBar.move' });
  const unDo = useIntl().formatMessage({ id: 'pages.toolBar.unDo' });
  const reDo = useIntl().formatMessage({ id: 'pages.toolBar.reDo' });
  const save = useIntl().formatMessage({ id: 'pages.toolBar.save' });
  const edit = useIntl().formatMessage({ id: 'pages.toolBar.edit' });
  const clearMark = useIntl().formatMessage({ id: 'pages.toolBar.clearMark' });
  const interactor = useIntl().formatMessage({ id: 'pages.toolBar.interactor' });
  const segmentThreshold = useIntl().formatMessage({ id: 'pages.toolBar.segmentThreshold' });
  const transparency = useIntl().formatMessage({ id: 'pages.toolBar.transparency' });
  const visualRadius = useIntl().formatMessage({ id: 'pages.toolBar.visualRadius' });
  const determineOutline = useIntl().formatMessage({ id: 'pages.toolBar.determineOutline' });
  const divideData = useIntl().formatMessage({ id: 'pages.toolBar.divideData' });
  const exportBtn = useIntl().formatMessage({ id: 'pages.toolBar.export' });

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
          trigger={tool.curr == 'Polygon' ? 'hover' : 'click'}
        >
          <PPToolBarButton
            active={tool.curr == 'Polygon'}
            imgSrc="./pics/buttons/polygon.png"
            onClick={() => {
              tool.setCurr('Polygon');
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
          trigger={tool.curr == 'rubber' ? 'hover' : 'click'}
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
        <PPToolBarButton
          onClick={() => {
            const res = backwardHistory();
            if (res) {
              // Do something
            }
          }}
          imgSrc="./pics/buttons/prev.png"
        >
          {unDo}
        </PPToolBarButton>
        <PPToolBarButton
          onClick={() => {
            const res = forwardHistory();
            if (res) {
              // Do something
            }
          }}
          imgSrc="./pics/buttons/next.png"
        >
          {reDo}
        </PPToolBarButton>
        <PPToolBarButton imgSrc="./pics/buttons/clear_mark.png">{clearMark}</PPToolBarButton>
      </PPToolBar>
      <div className={styles.mainStage}>
        <div className={styles.draw}>
          <PPMapTrial
            leafletMapRef={leafletMapRef}
            onShapeCreate={dr.onShapeCreate}
            onShapeEdit={dr.onShapeEdit}
          />
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
          trigger={tool.curr == 'boundry' ? 'click' : 'hover'}
        >
          {' '}
          <PPToolBarButton
            imgSrc="./pics/buttons/border_simplify.png"
            onClick={() => {
              tool.setCurr('boundry');
            }}
          >
            {boundary}
          </PPToolBarButton>
        </Popover>
        <Popover
          overlayInnerStyle={{ borderRadius: '0.5rem' }}
          placement="leftTop"
          title={'Setting of remote sensing'}
          content={<PPRGBSetting />}
          trigger={tool.curr == 'colorgun' ? 'click' : 'hover'}
        >
          {' '}
          <PPToolBarButton
            imgSrc="./pics/buttons/remote_sensing_setting.png"
            onClick={() => {
              tool.setCurr('colorgun');
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
          trigger={tool.curr == 'grid' ? 'click' : 'hover'}
        >
          {' '}
          <PPToolBarButton
            imgSrc="./pics/buttons/switch_grid.png"
            onClick={() => {
              tool.setCurr('grid');
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
          selectedLabel={label.curr}
          onLabelSelect={(lab) => {
            label.setCurr(lab);
            console.log(lab);
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
