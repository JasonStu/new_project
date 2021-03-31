import React, { useState, useRef, useEffect } from 'react';

import CustomPtoTable from '@/components/CustomProTable';
import EditModal from './editModal';
import { default_columns, default_dataSource } from './const';
import { uniqueId } from 'lodash';
import { getInventoryList, createInventory, updateInventory } from "@/services/inventory";
import { message } from 'antd';
const InventoryList = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState(
    []
  );
  const [rowCount, setRowCount] = useState({
    count: 0,
    page: 1
  });
  const [itemID, setItemID] = useState('');

  const [initialValues, setInitialValues] = useState({});
  const [type, setType] = useState('Add');
  const actionRef = useRef();

  const fetchData = async (params) => {
    try {
      const { data } = await getInventoryList(params)
      setDataSource(data.rows)
      setRowCount({ count: data.count, page: data.page })
    } catch (error) {
      // message.error(error)      
      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchData({
      page: 1,
      limit: 10,
      item_id: itemID
    })
  }, [])


  const columns = [
    ...default_columns,

    {
      title: 'Operation',
      dataIndex: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record) => <a onClick={() => {
        setType('Edit');
        setInitialValues(record);
        setVisible(true);
      }}>Edit</a>,
    },
  ];

  const onSubmit = async (value) => {
    try {
      if (type === 'Edit') {
        const { code, msg } = await updateInventory(value)
        if (code) {
          fetchData({
            page: 1,
            limit: 10,
            item_id: itemID
          })
          setVisible(false);
        } else {
          message.error(msg)
        }
      } else {
        console.log('value', value);
        const { code, msg } = await createInventory(value)
        if (code) {
          fetchData({
            page: 1,
            limit: 10,
            item_id: itemID
          })
          setVisible(false);
        } else {
          message.error(msg)
        }
      }

    } catch (error) {
      console.log('error', error);
    }


  };

  return (
    <>
      <CustomPtoTable
        dataSource={dataSource}
        columns={columns}
        selfOptions={{
          title: 'Inventory list',
          onAdd: () => {
            setType('Add');
            setVisible(true);
            setInitialValues({});
          },
          onSearch: (value) => {
            setItemID(value)
            fetchData({
              page: 1,
              limit: 10,
              item_id: value
            })
          },
          pagination: {
            total: rowCount.count,
            current: rowCount.page,
            onChange: (page) => {
              fetchData({
                page: page,
                limit: 10,
                item_id: itemID
              })
            }
          }
        }}

        actionRef={actionRef}
      />

      <EditModal
        actionRef={actionRef}
        visible={visible}
        setVisible={setVisible}
        onSubmit={onSubmit}
        setInitialValues={setInitialValues}
        initialValues={initialValues}
        type={type}
      />
    </>
  );
};

export default InventoryList;
