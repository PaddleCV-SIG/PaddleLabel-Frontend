import React from 'react';
import { Progress } from 'antd';
import { IntlInit } from '@/services/utils';

export type PPProgressProps = {
  project: any;
  task: any;
};

const component: React.FC<PPProgressProps> = (props) => {
  const intl = IntlInit('pages.toolBar.progress');
  return (
    <div className="progress">
      <Progress
        className="progressBar"
        percent={Math.ceil((props.project.finished / props.task.all?.length) * 100)}
        status="active"
        showInfo={false}
      />{' '}
      <span className="progressDesc">
        {`${intl('')}: ${props.project.finished || 0}/${props.task.all?.length}
        ${intl('currentId')}: ${props.task.currIdx == undefined ? 1 : props.task.currIdx + 1} `}
      </span>
    </div>
  );
};
export default component;
