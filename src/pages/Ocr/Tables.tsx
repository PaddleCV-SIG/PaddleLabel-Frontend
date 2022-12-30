import type { InputRef } from 'antd';
import { Form, Input, Popconfirm, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { ForwardRefRenderFunction } from 'react';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import styles from './Tables.less';
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];
import type { Annotation } from '@/models/Annotation';
interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;
export type TablesProps = {
  onAnnotationModify: (annotation: Annotation) => void;
  onAnnotationDelete: (annotation: Annotation) => void;
  updataAnno: (annotation: Annotation) => void;
  currentAnnotation: Annotation | undefined;
  annotations?: Annotation[];
  selectAnnotation: (annotation: Annotation) => void;
};
export type pageRef = {};
const App: ForwardRefRenderFunction<pageRef, TablesProps> = (props, ref) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    if (!props.annotations) {
      return;
    }
    // debugger;
    const newData = props.annotations.map((annotation) => {
      const data = annotation.result && annotation.result?.split('||');
      const results2 = data && data[1].split('|')[0];
      return {
        key: annotation?.annotationId,
        address: results2,
        ...annotation,
      };
    });
    setDataSource(newData);
  }, [props.annotations]);
  useEffect(() => {
    if (props.currentAnnotation && props.currentAnnotation?.annotationId) {
      setSelectedKeys([props.currentAnnotation?.annotationId]);
    }
  }, [props.currentAnnotation]);
  // const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const annos = dataSource[dataSource.findIndex((item) => item.key === key)];
    props.onAnnotationDelete(annos);
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string })[] = [
    {
      title: 'address',
      dataIndex: 'address',
      render: (text: string) => (
        <div
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </div>
      ),
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  // const handleAdd = () => {
  //   const newData: DataType = {
  //     key: count,
  //     name: `Edward King ${count}`,
  //     age: '32',
  //     address: `London, Park Lane no. ${count}`,
  //   };
  //   setDataSource([...dataSource, newData]);
  //   setCount(count + 1);
  // };

  const handleSave = (row: DataType) => {
    console.log('row111', row);
    const data = row?.result?.split('||')[0];
    const results = data + '||' + row.address + '|0|';
    const anno = {
      ...row,
      result: results,
    };
    delete anno.address;
    delete anno.key;
    props.onAnnotationModify(anno);
    props.updataAnno(anno);
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      const anno = selectedRows[0];
      // delete anno.address;
      // delete anno.key;
      props.selectAnnotation(anno);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  useImperativeHandle(ref, () => ({}));
  return (
    <div
      className={styles.conTent}
      style={{
        overflow: 'auto',
        // height: 'auto',
        height: '100%',
        // border: '3px solid',
      }}
    >
      {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button> */}
      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection,
          selectedRowKeys: selectedKeys,
        }}
        pagination={false}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default forwardRef(App);
