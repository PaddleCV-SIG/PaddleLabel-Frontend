import React, { useState, useEffect } from 'react';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import { Progress, message, Spin } from 'antd';
import { PageInit } from '@/services/utils';
import { useIntl } from 'umi';
import PPDivideDataModal from '@/components/PPLabelPage/PPDivideDataModal';
import PPExportModal from '@/components/PPLabelPage/PPExportModal';

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
    label: { oneHot: false, postSetCurr: selectLabel },
    tool: { defaultTool: 'mover' },
    effectTrigger: { postTaskChange: postTaskChange },
  });
  const [divideModalVisible, setDivideModalVisible] = useState<boolean>(false);
  const [exportModalVisible, setExportModalVisible] = useState<boolean>(false);

  const zoomIn = useIntl().formatMessage({ id: 'pages.toolBar.zoomIn' });
  const zoomOut = useIntl().formatMessage({ id: 'pages.toolBar.zoomOut' });
  const move = useIntl().formatMessage({ id: 'pages.toolBar.move' });
  const save = useIntl().formatMessage({ id: 'pages.toolBar.save' });
  const divideData = useIntl().formatMessage({ id: 'pages.toolBar.divideData' });
  const exportBtn = useIntl().formatMessage({ id: 'pages.toolBar.export' });

  function selectLabel(selected) {
    // after toggle is active, add ann
    if (label.isActive(selected)) {
      annotation.create({
        taskId: task.curr.taskId,
        labelId: selected.labelId,
        dataId: data.curr.dataId,
      });
    } else {
      const ann = annotation.all.filter((a) => a.labelId == selected.labelId)[0];
      annotation.remove(ann.annotationId);
    }
  }

  function postTaskChange(labels, annotations) {
    loading.setCurr(true);
    if (!labels || !annotations) return;
    label.initActive(annotations);
    loading.setCurr(false);
  }

  return (
    <PPLabelPageContainer className={styles.classes}>
      <PPToolBar>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_in.png"
          onClick={() => {
            scale.change(0.1);
          }}
        >
          {zoomIn}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_out.png"
          onClick={() => {
            scale.change(-0.1);
          }}
        >
          {zoomOut}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/save.png"
          onClick={() => {
            message.info("Annotations are saved automatically. You don't need to click save.");
          }}
        >
          {save}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/move.png"
          active={tool.curr == 'mover'}
          onClick={() => {
            tool.setCurr('mover');
            message.info('You can move the image now.');
          }}
        >
          {move}
        </PPToolBarButton>
      </PPToolBar>
      <div id="dr" className="mainStage">
        <Spin tip="loading" spinning={loading.curr}>
          <div className="draw">
            <PPStage
              scale={scale.curr}
              currentTool={tool.curr}
              setCurrentAnnotation={() => {}}
              onAnnotationModify={() => {}}
              onAnnotationModifyComplete={() => {}}
              imgSrc={data.imgSrc}
            />
          </div>
          <div className="pblock">
            <div className="progress">
              <Progress
                className="progressBar"
                percent={project.progress}
                status="active"
                showInfo={false}
              />{' '}
              <span className="progressDesc">
                {/* TODO: translate */}
                Current labeling {task.currIdx == undefined ? 1 : task.currIdx + 1} of{' '}
                {task.all?.length}. Already labeled {task.finished(project.progress) || 0}.
              </span>
            </div>
          </div>
          <div className="prevTask" onClick={task.prevTask} />
          <div className="nextTask" onClick={task.nextTask} />
        </Spin>
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton
          imgSrc="./pics/buttons/data_division.png"
          onClick={() => {
            setDivideModalVisible(true);
          }}
        >
          {divideData}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/export.png"
          onClick={() => {
            setExportModalVisible(true);
          }}
        >
          {exportBtn}
        </PPToolBarButton>
      </PPToolBar>
      <div className="rightSideBar">
        <PPLabelList
          labels={label.all}
          activeIds={label.activeIds}
          onLabelSelect={label.onSelect}
          onLabelAdd={(lab) => label.create({ ...lab, projectId: project.curr.projectId })}
          onLabelDelete={label.remove}
          onLabelModify={() => {}}
          hideColorPicker={true}
          hideEye={true}
        />
      </div>
      <PPDivideDataModal
        visible={divideModalVisible}
        splitDataset={splitDataset}
        project={project}
        onCancel={() => {
          setDivideModalVisible(false);
        }}
        onFinish={() => {
          setDivideModalVisible(false);
        }}
      />
      <PPExportModal
        visible={exportModalVisible}
        exportDataset={exportDataset}
        project={project}
        onCancel={() => {
          setExportModalVisible(false);
        }}
        onFinish={() => {
          setExportModalVisible(false);
        }}
      />
    </PPLabelPageContainer>
  );
};

export default Page;
