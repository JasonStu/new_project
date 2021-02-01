import React from 'react';
import CustomPtoTable from '@/components/CustomProTable';
import { default_columns, default_dataSource } from './const';

const PansList = () => {

  const columns = [
    ...default_columns,
    {
      title: 'Operation',
      dataIndex: 'operation',
      fixed: 'right',
      width: 100,
      render: () => <a>Edit</a>
    },
  ];

  return (
    <>
      <CustomPtoTable
        dataSource={[...Array(13).keys()].map((item) => default_dataSource(item))}
        columns={columns}
        selfOptions={{
          title: 'Pans list',
          searchLabel: 'Pan ID',
        }}
      />
    </>
  );
};

export default PansList;
