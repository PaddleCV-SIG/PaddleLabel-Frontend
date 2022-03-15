import { List } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import PPLabelListItem from './PPLabelListItem';
import PPAddLabelModal from '../PPAddLabelModal';
import { Label } from '@/services';

export type PPLabelListProps = {
  labels?: Label[];
  selectedLabel?: Label;
  onLabelModify: (label: Label) => void;
  onLabelDelete: (label: Label) => void;
  onLabelAdd: (label: Label) => void;
  onLabelSelect: (label: Label) => void;
};

const Component: React.FC<PPLabelListProps> = (props) => {
  const [addModalVisible, setAddLabelModalVisible] = useState(false);

  return (
    <>
      <List
        className={styles.labelList}
        size="large"
        header={<div className={styles.listHeader}>Label List</div>}
        footer={
          <div>
            <Button
              style={{ height: 40, fontSize: '0.75rem' }}
              type="primary"
              onClick={() => {
                setAddLabelModalVisible(true);
              }}
              block
            >
              Add Label
            </Button>
          </div>
        }
        bordered
        dataSource={props.labels}
        renderItem={(item) => {
          return (
            <PPLabelListItem
              onClick={props.onLabelSelect}
              label={item}
              active={item.name == props.selectedLabel?.name}
              onLabelDelete={props.onLabelDelete}
              onLabelModify={props.onLabelModify}
            />
          );
        }}
      />
      <PPAddLabelModal
        order={props.labels?.length}
        visible={addModalVisible}
        onLabelAdd={(label: Label) => {
          props.onLabelAdd(label);
          setAddLabelModalVisible(false);
        }}
        onCancel={() => {
          setAddLabelModalVisible(false);
        }}
      />
    </>
  );
};
export default Component;
