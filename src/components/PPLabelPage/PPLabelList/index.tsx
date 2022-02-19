import { List } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import PPLabelListItem from '../PPLabelListItem';
import PPAddLabelModal from '../PPAddLabelModal';

export type Label = {
  color: string;
  name: string;
  invisible?: boolean;
};

export type PPLabelListProps = {
  selectedLabel?: Label;
  onLabelModify: (selectedLabel: Label) => void;
  onLabelDelete: (deletedLabel: Label) => void;
  onLabelAdd: (addedLabel: Label) => void;
};

const mockedLabels: Label[] = [
  {
    color: '#FF0000',
    name: 'Label 1',
  },
  {
    color: '#008000',
    name: 'Label 2',
  },
];

const Component: React.FC<PPLabelListProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [labels, setLabels] = useState(mockedLabels);
  const [addModalVisible, setAddLabelModalVisible] = useState(false);
  const [addModalDefault, setAddModalDefault] = useState('');

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
                setAddModalDefault('');
                setAddLabelModalVisible(true);
              }}
              block
            >
              Add Label
            </Button>
          </div>
        }
        bordered
        dataSource={labels}
        renderItem={(item) => (
          <PPLabelListItem
            label={item}
            onLabelDelete={props.onLabelDelete}
            onLabelModify={props.onLabelModify}
          />
        )}
      />
      <PPAddLabelModal
        order={labels.length}
        visible={addModalVisible}
        defaultLabelName={addModalDefault}
        onLabelAdd={(label: Label) => {
          labels.push(label);
          setLabels(labels);
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
