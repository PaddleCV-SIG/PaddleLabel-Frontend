import type { TableProps } from 'antd';
import { Space } from 'antd';
import { Col, Row, Table } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import PPPagination from '../PPPagination';

export type PPTableProps = {
  onChange?: (page: number, pageSize?: number) => void;
};

const PPTable: React.FC<PPTableProps & Partial<TableProps<any>>> = (props) => {
  const totalNum = props.dataSource?.length || 0;
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className={`${styles.table}`}>
      <Row>
        {/* <Col span={24} style={{ borderRight: '0.063rem solid rgba(151,151,151,0.27)' }}>
          <Table {...props} dataSource={dataSourceT1} pagination={false} rowSelection={undefined} />
        </Col>
        <Col span={24}>
          <Table {...props} dataSource={dataSourceT2} pagination={false} rowSelection={undefined} />
        </Col> */}
        <Col span={24}>
          <Table
            {...props}
            dataSource={props.dataSource}
            pagination={false}
            rowSelection={undefined}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '1.75rem' }}>
        <Col span={24}>
          <Space align="center">
            <PPPagination
              totalNum={totalNum}
              pageSize={pageSize}
              currentPage={currentPage}
              onChange={(page, newPageSize) => {
                setPageSize(newPageSize);
                if ((page - 1) * newPageSize > totalNum) {
                  setCurrentPage(1);
                } else {
                  setCurrentPage(page);
                }
                if (props.onChange) props.onChange(page, newPageSize);
              }}
            />
          </Space>
        </Col>
      </Row>
    </div>
  );
};
export default PPTable;
