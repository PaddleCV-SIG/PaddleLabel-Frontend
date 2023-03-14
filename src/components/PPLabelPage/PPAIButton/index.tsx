import { Button, Popover, message } from 'antd';
import React, { useState, useEffect } from 'react';
import PPInteractorModal from '../PPInteractorModal';
import PPToolBarButton from '../PPToolBarButton';
import styles from './index.less';
import { IntlInit, getVersion } from '@/services/utils';

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

  useEffect(() => {
    if (!modalVisible) {
      return;
    }
    const numVersion = (version) => {
      const [major, ...rest] = version.split('.').map(Number);
      const num = rest.reduce((acc, val, index) => {
        const factor = Math.pow(10, (index + 1) * 2);
        return acc + val / factor;
      }, major);
      return num;
    };
    const blurchange = async () => {
      const errversion = '1.0.0';
      const versionss: string = (await getVersion()) as string;
      const versions = numVersion(versionss);
      if (versions && errversion > versions) {
        message.error('eiseg版本过低,请升级到升级');
      }
    };
    blurchange();
  }, [modalVisible]);
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
