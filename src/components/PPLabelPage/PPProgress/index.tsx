import React from 'react';
import { Progress } from 'antd';

export type PPProgressProps = {
  project: any;
  task: any;
};

const component: React.FC<PPProgressProps> = (props) => {
  return (
    <div className="progress">
      <Progress
        className="progressBar"
        percent={Math.ceil((props.project.finished / props.task.all?.length) * 100)}
        status="active"
        showInfo={false}
      />{' '}
      <span className="progressDesc">
        Current labeling {props.task.currIdx == undefined ? 1 : props.task.currIdx + 1} of{' '}
        {props.task.all?.length}. Already labeled {props.project.finished || 0}.
      </span>
    </div>
  );
};
export default component;
