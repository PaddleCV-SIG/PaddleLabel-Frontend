import React, { useState, useEffect } from 'react';
import { Spin, message } from 'antd';
import { history } from 'umi';
import styles from './index.less';
import PPLabelPageContainer from '@/components/PPLabelPage/PPLabelPageContainer';
import PPToolBarButton from '@/components/PPLabelPage/PPToolBarButton';
import PPToolBar from '@/components/PPLabelPage/PPToolBar';
import PPLabelList from '@/components/PPLabelPage/PPLabelList';
import PPStage from '@/components/PPLabelPage/PPStage';
import PPProgress from '@/components/PPLabelPage/PPProgress';
import { PageInit } from '@/services/utils';
import type { Label, Annotation } from '@/models';
import { IntlInitJsx } from '@/components/PPIntl/';

const Page: React.FC = () => {
  const { tool, loading, scale, annotation, task, data, project, label, refreshVar } = PageInit(
    useState,
    useEffect,
    {
      label: { oneHot: false, postSelect: selectLabel },
      tool: { defaultTool: 'mover' },
      effectTrigger: { postTaskChange: postTaskChange, postProjectChanged: postProjectChanged },
    },
  );

  const tbIntl = IntlInitJsx('pages.toolBar');

  function postProjectChanged() {
    if (project.curr?.labelFormat == 'single_class') label.setOneHot(true);
  }

  function selectLabel(selected: Label, activeIds: Set<number>) {
    console.log('selectLabel', selected);
    // after toggle active, add ann
    if (activeIds.has(selected.labelId)) {
      // if one hot, remove all current annotations
      if (label.isOneHot) annotation.clear();
      annotation.create({
        taskId: task.curr.taskId,
        labelId: selected.labelId,
        dataId: data.curr.dataId,
      });
    } else {
      const anns = annotation.all.filter((a: Annotation) => a.labelId == selected.labelId);
      for (const ann of anns) annotation.remove(ann.annotationId);
    }
  }

  function postTaskChange(labels: [Label], annotations: [Annotation]) {
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
          {tbIntl('zoomIn')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/zoom_out.png"
          onClick={() => {
            scale.change(-0.1);
          }}
        >
          {tbIntl('zoomOut')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/save.png"
          onClick={() => {
            message.success(tbIntl('autoSave'));
          }}
        >
          {tbIntl('save')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/move.png"
          active={tool.curr == 'mover'}
          onClick={() => {
            tool.setCurr('mover');
          }}
        >
          {tbIntl('move')}
        </PPToolBarButton>
        <PPToolBarButton
          imgSrc="./pics/buttons/clear_mark.png"
          onClick={() => {
            annotation.clear();
          }}
        >
          {tbIntl('clearMark')}
        </PPToolBarButton>
      </PPToolBar>
      <div id="dr" className="mainStage">
        <Spin tip={tbIntl('loading', 'global')} spinning={loading.curr}>
          <div className="draw">
            <PPStage
              scale={scale.curr}
              currentTool={tool.curr}
              scaleChange={scale.setScale}
              taskIndex={task.currIdx}
              setCurrentAnnotation={() => {}}
              onAnnotationModify={() => {}}
              onAnnotationModifyComplete={() => {}}
              imgSrc={data.imgSrc}
              annotations={annotation.all}
            />
          </div>
          <div className="pblock">
            <PPProgress task={task} project={project} />
          </div>
          <div className="prevTask" onClick={task.prevTask} data-test-id={'prevTask'} />
          <div className="nextTask" onClick={task.nextTask} data-test-id={'nextTask'} />
        </Spin>
      </div>
      <PPToolBar disLoc="right">
        <PPToolBarButton
          imgSrc="./pics/buttons/data_division.png"
          onClick={() => {
            history.push(`/project_overview?projectId=${project.curr.projectId}`);
          }}
        >
          {tbIntl('projectOverview')}
        </PPToolBarButton>
        {/* <PPToolBarButton
          imgSrc="./pics/buttons/data_division.png"
          onClick={() => {
            history.push(`/ml?projectId=${project.curr.projectId}`);
          }}
        >
          {'ML Settings'}
        </PPToolBarButton> */}
      </PPToolBar>
      <div className="rightSideBar">
        <PPLabelList
          labels={label.all}
          activeIds={label.activeIds}
          onLabelSelect={label.onSelect}
          onLabelAdd={(lab) => label.create({ ...lab, projectId: project.curr.projectId })}
          onLabelDelete={label.remove}
          hideColorPicker={true}
          hideEye={true}
          refresh={refreshVar}
        />
      </div>
    </PPLabelPageContainer>
  );
};

export default Page;
