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
    name: '标签2',
  },
];

// const generatedColorList: string[] = [
//   '#FF0000',
//   '#008000',
//   '#0000FF',
//   '#FFFF00',
//   '#FFA500',
//   '#00FFFF',
//   '#8B00FF',
//   '#FFC0CB',
//   '#7CFC00',
//   '#007FFF',
//   '#800080',
//   '#36BF36',
//   '#DAA520',
//   '#800000',
//   '#008B8B',
//   '#B22222',
//   '#E6D933',
//   '#000080',
//   '#FF00FF',
//   '#FFFF99',
//   '#87CEEB',
//   '#5C50E6',
//   '#CD5C5C',
//   '#20B2AA',
//   '#E680FF',
//   '#4D1F00',
//   '#006374',
//   '#B399FF',
//   '#8B4513',
//   '#BA55D3',
//   '#C0C0C0',
//   '#808080',
//   '#000000',
// ];

const Component: React.FC<PPLabelListProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [labels, setLabels] = useState(mockedLabels);
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
        dataSource={labels}
        renderItem={(item) => (
          <PPLabelListItem
            label={item}
            onLabelDelete={props.onLabelDelete}
            onLabelModify={props.onLabelModify}
          />
        )}
      />
      <PPAddLabelModal visible={addModalVisible} onLabelAdd={() => {}} />
    </>
  );
};
export default Component;
