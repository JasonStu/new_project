import React, { useEffect, useState } from 'react';
import CustomPtoTable from '@/components/CustomProTable';
import { default_columns, default_dataSource } from './const';
import { ArrowDownOutlined } from '@ant-design/icons';
import { getPansList } from "@/services/pan";
import { Button, message } from 'antd';

const PansList = () => {

  const [dataSource, setDataSource] = useState(
    []
  );
  const [panID, setPanID] = useState('');

  const [rowCount, setRowCount] = useState({
    count: 0,
    page: 1
  });
  const columns = [
    ...default_columns,
  ];
  const fetchData = async (params = {}) => {
    try {
      const { data } = await getPansList(params)
      setDataSource(data.rows)
      setRowCount({ count: data.count, page: data.page })
    } catch (error) {

      console.log('error', error);
    }

  }

  useEffect(() => {
    fetchData({
      page: 1,
      limit: 10,
      pan_id: panID,
    })
  }, [])

  return (
    <>
      <CustomPtoTable
        dataSource={dataSource}
        columns={columns}
        selfOptions={{
          title: 'Pans list',
          searchLabel: 'Pan ID',
          onSearch: (value) => {
            setPanID(value)
            fetchData({
              page: 1,
              limit: 10,
              pan_id: value,
            })
          },
          pagination: {
            total: rowCount.count,
            current: rowCount.page,
            onChange: (page) => {
              fetchData({
                page: page,
                limit: 10,
                pan_id: panID,
              })
            }
          }
        }}
        toolBarRender={() => [
          <Button key="export">
            <ArrowDownOutlined /> Export
          </Button>,
        ]}
      />
    </>
  );
};

export default PansList;
