import React, { useState, useRef, useEffect } from 'react';

import CustomPtoTable from '@/components/CustomProTable';
import EditModal from './editModal';
import { default_columns, default_dataSource } from './const';
import { uniqueId } from 'lodash';
import { getItemList, createItems, updateItems, getItemsDetail, getCategoryList, getLineList, checkItemsExist } from "@/services/item";
import { message } from 'antd';
const ItemsList = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [initialValues, setInitialValues] = useState({});
  const [rowCount, setRowCount] = useState({
    count: 0,
    page: 1
  });
  const [itemID, setItemID] = useState('');
  const [type, setType] = useState('Add');
  const actionRef = useRef();

  const fetchData = async (params) => {
    try {
      const { data } = await getItemList(params)
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
                item_id: wellID
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
        initialValues={initialValues}
        type={type}
      />
    </>
  );
};

export default ItemsList;
