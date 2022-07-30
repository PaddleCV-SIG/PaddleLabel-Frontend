import { Button, Popover } from 'antd';
import React, { useState } from 'react';
import PPInteractorModal from '../PPInteractorModal';
import PPToolBarButton from '../PPToolBarButton';
import styles from './index.less';
import { IntlInit } from '@/services/utils';

export type PPAIModalProps = {
  visible?: boolean;
  onCancel?: () => void;
  imgSrc?: string;
  active?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onChange?: (size: number) => void;
  model: any;
  project: any;
};

const Component: React.FC<PPAIModalProps> = (props) => {
  const intl = IntlInit('component.PPInteractorModal');
  const model = props.model;
  const project = props.project;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Popover
        overlayClassName={`${styles.popover} ${styles.popoverLeft}`}
        placement={'left'}
        content={
          <Button
            onClick={() => setModalVisible(true)}
            type="primary"
            style={{ height: '2.5rem' }}
            block
          >
            {intl('title')}
          </Button>
        }
        trigger={'hover'}
      >
        {' '}
        <PPToolBarButton imgSrc={props.imgSrc || ''} onClick={props.onClick} active={props.active}>
          {props.children}
        </PPToolBarButton>
      </Popover>
      <PPInteractorModal
        visible={modalVisible}
        setVisible={setModalVisible}
        model={model}
        project={project}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
    </>
  );
};
export default Component;
