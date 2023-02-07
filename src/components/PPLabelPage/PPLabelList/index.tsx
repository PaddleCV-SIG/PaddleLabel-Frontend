import { List } from 'antd';
import { Button } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import PPLabelListItem from './PPLabelListItem';
import PPAddLabelModal from '../PPAddLabelModal';
import type { Label } from '@/services';
import { useIntl } from 'umi';

export type PPLabelListProps = {
  labels?: Label[]; // the label from utils, LabelUtils()
  activeIds?: Set<any>;
  selectedLabel?: Label;
  hideEye?: boolean;
  hideColorPicker?: boolean;
  onLabelModify?: (label: Label) => void;
  onLabelDelete: (label: Label) => void;
  onLabelAdd: (label: Label) => void;
  onLabelSelect: (label: Label) => void;
  onHideLabel: (change: boolean, id: number) => void;
  disabled?: boolean;
  refresh?: number;
};

const Component: React.FC<PPLabelListProps> = (props) => {
  const intl = useIntl();
  const addLabel = intl.formatMessage({
    id: 'component.PPLabelList.addLabel',
  });
  const labelList = intl.formatMessage({ id: 'component.PPLabelList.labelList' });
  if (props.labels)
    for (let idx = 0; idx < props.labels.length; idx++) {
      props.labels[idx].ith = idx;
    }

  const [addModalVisible, setAddLabelModalVisible] = useState(false);

  return (
    <>
      <List
        className={styles.labelList}
        size="large"
        header={<div className={styles.listHeader}>{labelList}</div>}
        footer={
          <div>
            <Button
              style={{ height: 40, fontSize: '0.75rem' }}
              type="primary"
              disabled={props.disabled}
              onClick={() => {
                setAddLabelModalVisible(true);
              }}
              block
            >
              {addLabel}
            </Button>
          </div>
        }
        bordered
        dataSource={props.labels}
        renderItem={(item) => {
          return (
            <PPLabelListItem
              hideColorPicker={props.hideColorPicker}
              hideEye={props.hideEye}
              onClick={props.onLabelSelect}
              label={item}
              active={props.activeIds?.has(item.labelId)}
              onLabelDelete={props.onLabelDelete}
              onLabelModify={props.onLabelModify}
              onHideLabel={props.onHideLabel}
            />
          );
        }}
      />
      <PPAddLabelModal
        hideColorPicker={props.hideColorPicker}
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
