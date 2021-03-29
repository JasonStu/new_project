import React, { useState, useRef, useEffect } from 'react';

import CustomPtoTable from '@/components/CustomProTable';
import EditModal from './editModal';
import { default_columns, default_dataSource } from './const';
import { uniqueId } from 'lodash';
import { getItemList, createItems, updateItems, getItemsDetail, getCategoryList, getLineList, checkItemsExist } from "@/services/item";
import { message, Spin } from 'antd';
const ItemsList = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [lineList, setLineList] = useState([]);
  const [loading, setLoading] = useState([]);

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
      setLoading(true)
      const { data } = await getItemList(params)
      setDataSource(data.rows)
      setRowCount({ count: data.count, page: data.page })
      setLoading(false)
    } catch (error) {
      // message.error(error) 
      setLoading(false)
      console.log('error', error);
    }
  }

  const defaultData = async () => {
    try {
      let { data: categoryList } = await getCategoryList()
      categoryList = categoryList.map(i => ({ label: i.name, value: i.id }))
      setCategoryList(categoryList)
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    fetchData({
      page: 1,
      limit: 10,
      item_id: itemID
    })
    defaultData()
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
          onClick={async () => {
            setLoading(true)
            setType('Edit');
            console.log('actionRef', actionRef.current);
            try {
              const { data } = await getItemsDetail({ id: record.id })
              if (data) {
                let obj = {
                  ...data,
                  open_image: data.items_open_image,
                  line_id: JSON.stringify({ id: data.line.id, from: data.line.forms }),
                  closed_image: data.items_closed_image,
                  factory_image: data.items_factory_image,
                  jerhel_image: data.items_jerhel_image,
                }
                console.log('obj===>', obj);
                await defaultData(obj.category_id)
                await categoryOnChange(obj.category_id)

                setInitialValues(obj);
                setVisible(true);
                setLoading(false)
              }
            } catch (error) {
              setLoading(false)
              console.log('error', error);
            }


          }}
        >
          Edit
        </a>
      ),
    },
  ];

  const onSubmit = async (value) => {
    let formData = new FormData()
    for (const key in value) {
      formData.append(key, value[key])
      if (key === 'open_image') {
        for (const file of value[key]) {
          file.originFileObj && formData.append('open_image', file.originFileObj)
          console.log('file===>', file);
          file.url && formData.append('open_image_urls', file.url)
        }
      }
      if (key === 'closed_image') {
        for (const file of value[key]) {
          file.originFileObj && formData.append('closed_image', file.originFileObj)

          file.url && formData.append('closed_image_urls', file.url)
        }
      }
      if (key === 'factory_image') {
        for (const file of value[key]) {
          file.originFileObj && formData.append('factory_image', file.originFileObj)
          file.url && formData.append('factory_image_urls', file.url)
        }
      }
      if (key === 'jerhel_image') {
        for (const file of value[key]) {
          file.originFileObj && formData.append('jerhel_image', file.originFileObj)
          file.url && formData.append('jerhel_image_urls', file.url)
        }
      }
    }
    setLoading(true)
    try {
      if (type === 'Edit') {
        const data = await updateItems(formData)
      } else {
        const data = await createItems(formData)
      }
      fetchData({
        page: 1,
        limit: 10,
        item_id: itemID
      })
      setLoading(false)
      setVisible(false);

    } catch (error) {
      setLoading(false)
    }

  };


  const categoryOnChange = async (v) => {

    let { data: lineList } = await getLineList({ category_id: v })
    const obj = {}
    lineList = lineList.map(i => ({ label: i.name, value: JSON.stringify({ id: i.id, from: i.forms }) }))
    setLineList(lineList)
  }

  return (
    <Spin
      spinning={loading}
    >
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
                item_id: itemID
              })
            }
          }
        }}
      // actionRef={actionRef}
      />

      <EditModal
        loading={loading}
        ref={actionRef}
        visible={visible}
        categoryList={categoryList}
        lineList={lineList}
        setVisible={setVisible}

        categoryOnChange={categoryOnChange}
        onSubmit={onSubmit}
        initialValues={initialValues}
        type={type}
      />

    </Spin>
  );
};

export default ItemsList;
