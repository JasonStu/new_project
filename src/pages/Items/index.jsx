import React, { useState, useRef } from 'react';

import CustomPtoTable from '@/components/CustomProTable';
import EditModal from './editModal';
import { default_columns, default_dataSource } from './const';
import { uniqueId } from 'lodash';

const ItemsList = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState(
    [...Array(13).keys()].map((item) => default_dataSource(item)),
  );
  const [initialValues, setInitialValues] = useState({});
  const [type, setType] = useState('Add');
  const actionRef = useRef();

  const columns = [
    ...default_columns,
    {
      title: 'Operation',
      dataIndex: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <a
          onClick={() => {
            setType('Edit');
            setInitialValues(record);
            setVisible(true);
          }}
        >
          Edit
        </a>
      ),
    },
  ];

  const onSubmit = (value) => {
    if (type === 'Edit') {
      const data = dataSource.map((item) => {
        if (item.key === value.key) {
          return value;
        } else {
          return item;
        }
      });
      setDataSource(data);
    } else {
      const data = [
        {
          ...default_dataSource(uniqueId()),
          ...value,
          key: uniqueId('add_'),
        },
      ].concat(dataSource);
      setDataSource(data);
    }
    setVisible(false);
  };

  return (
    <>
      <CustomPtoTable
        dataSource={dataSource}
        columns={columns}
        selfOptions={{
          title: 'Items list',
          onAdd: () => {
            setType('Add');
            setVisible(true);
            setInitialValues({});
          },
        }}
        actionRef={actionRef}
      />

      <EditModal
        actionRef={actionRef}
        visible={visible}
        setVisible={setVisible}
        onSubmit={onSubmit}
        initialValues={initialValues}
        type={type}
      />
    </>
  );
};

export default ItemsList;
