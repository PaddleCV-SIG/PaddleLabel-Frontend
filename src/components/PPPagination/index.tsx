import { useIntl } from 'umi';
import type { PaginationProps } from 'antd';
import { Button, Select, Space } from 'antd';
import { Pagination } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import type { IntlShape } from 'react-intl';
const { Option } = Select;

export type PPPaginationProps = {
  totalNum: number;
  pageSize?: number;
  currentPage?: number;
  onChange?: (page: number, pageSize: number) => void;
};

function itemRenderFactory(intl: IntlShape) {
  const prevWording = intl.formatMessage({
    id: 'component.PPTable.prev',
    defaultMessage: 'Previous',
  });
  const nextWording = intl.formatMessage({
    id: 'component.PPTable.next',
    defaultMessage: 'Next',
  });
  return (_current: any, type: string, originalElement: any) => {
    if (type === 'prev') {
      return <Button>{prevWording}</Button>;
    }
    if (type === 'next') {
      return <Button>{nextWording}</Button>;
    }
    return originalElement;
  };
}

const PPPagination: React.FC<PPPaginationProps & PaginationProps> = (props) => {
  const totalNum = props.totalNum;

  const [pageSize, setPageSize] = useState(props.pageSize || 10);
  const [currentPage, setCurrentPage] = useState(props.currentPage || 1);
  return (
    <div className={`${styles.pagination}`}>
      <Space align="center">
        {useIntl().formatMessage(
          { id: 'component.PPTable.pageTotal' },
          {
            total: totalNum,
            show: (
              <Select
                value={pageSize + ''}
                className={styles.pageSizeSelector}
                onChange={(value) => {
                  setPageSize(parseInt(value));
                  if (props.onChange) props.onChange(currentPage, parseInt(value));
                }}
              >
                <Option value="10">10</Option>
                <Option value="20">20</Option>
                <Option value="30">30</Option>
                <Option value="40">40</Option>
                <Option value="50">50</Option>
              </Select>
            ),
          },
        )}
        <Pagination
          className={styles.pagination}
          current={currentPage}
          pageSize={pageSize}
          total={totalNum}
          itemRender={itemRenderFactory(useIntl())}
          onChange={(page, changedPageSize) => {
            console.log(`Pagination: ${changedPageSize}/${page}`);
            setCurrentPage(page);
            if (props.onChange) props.onChange(page, changedPageSize);
          }}
        />
      </Space>
    </div>
  );
};
export default PPPagination;
