import { List, Popover, Space } from 'antd';
import { Button } from 'antd';
import React from 'react';
import styles from './index.less';
import { HuePicker } from 'react-color';

export type Label = {
  color: string;
  name: string;
  invisiable?: boolean;
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
    name: '标签1',
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
  return (
    <List
      className={styles.labelList}
      size="large"
      header={<div className={styles.listHeader}>标签列表</div>}
      footer={
        <div>
          <Button style={{ height: 40 }} type="primary" block>
            添加标签
          </Button>
        </div>
      }
      bordered
      dataSource={mockedLabels}
      renderItem={(item) => (
        <List.Item>
          <Space align="center" size={5}>
            <a
              className={styles.eye}
              style={{
                backgroundImage: item.invisiable ? 'url(/pics/hide.png)' : 'url(/pics/show.png)',
              }}
              onClick={() => {
                item.invisiable = !item.invisiable;
                props.onLabelModify(item);
              }}
            />{' '}
            {item.name}
            <Popover
              placement="bottomRight"
              content={<HuePicker color={item.color} />}
              trigger="click"
            >
              <div className={styles.roundBall} style={{ backgroundColor: item.color }} />
            </Popover>
          </Space>
        </List.Item>
      )}
    />
  );
};
export default Component;
