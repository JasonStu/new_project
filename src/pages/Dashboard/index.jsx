import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Button, message } from 'antd';
import EditModal from '../Items/editModal';

import CustomPtoTable from '@/components/CustomProTable';
import { getDashboardMainInfo, getDashboardList, approvedItemsUpdate, approvedItemsNew } from "@/services/dashboard";
import { getItemList, createItems, updateItems, getItemsDetail, getCategoryList, getLineList, checkItemsExist } from "@/services/item";

import { default_columns, } from '../Items/const';

const DashboardList = () => {
  const [dataSource, setDataSource] = useState(
    []
  );


  const [rowCount, setRowCount] = useState({
    count: 0,
    page: 1
  });
  const [visible, setVisible] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [lineList, setLineList] = useState([]);
  const [loading, setLoading] = useState([]);
  const [userHeaderState, setUserHeaderState] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [type, setType] = useState('Edit');

  const fetchData = async (params) => {
    const result = await getDashboardMainInfo()
    const { data } = await getDashboardList(params)
    setUserHeaderState(result.data)
    setDataSource(data.rows)
    setRowCount({ count: data.count, page: data.page })
  }

  useEffect(() => {
    fetchData({
      page: 1,
      limit: 10,

    })
  }, [])

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
        // const data = await createItems(formData)
      }
      fetchData({
        page: 1,
        limit: 10,

      })
      setLoading(false)
      setVisible(false);

    } catch (error) {
      console.log('error', error);
      setLoading(false)
    }

  };

  const categoryOnChange = async (v) => {

    let { data: lineList } = await getLineList({ category_id: v })
    const obj = {}
    lineList = lineList.map(i => ({ label: i.name, value: JSON.stringify({ id: i.id, from: i.forms }) }))
    setLineList(lineList)
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
  const actionRef = useRef();

  const columns = [
    ...default_columns,
    {
      title: 'Operation',
      dataIndex: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record) => (
        <div style={{ textAlign: 'center' }}>
          <a onClick={async () => {
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
          >Edit</a>
        </div>
      ),
    },
    {
      title: 'Action',
      // dataIndex: 'is_updated',
      fixed: 'right',
      width: 100,

      render: (text, record) => {

        return <span  >
          {record.is_updated === 1 && record.is_published === 1 && <Button
            onClick={async () => {
              try {
                const { code } = await approvedItemsUpdate({ id: text.id })
                if (code) {
                  fetchData({
                    page: 1,
                    limit: 10,
                  })
                  return message.success('Publish Update Success!')
                }
                message.error('Publish Update fail!')
              } catch (error) {
                message.error('Publish New fail!')
                console.log('error', error);
              }
            }}
            type="primary"
            shape="round"
            size="small"
            style={{ background: '#FFAE42', color: '#9F3C0D', borderColor: '#FFAE42' }}
            block
          >
            Publish Update
            </Button>}
          {record.is_published === 0 && <Button
            onClick={async () => {
              try {
                const { code } = await approvedItemsNew({ id: text.id })
                if (code) {
                  fetchData({
                    page: 1,
                    limit: 10,
                  })
                  return message.success('Publish New Success!')
                }
                message.error('Publish New fail!')
              } catch (error) {
                message.error('Publish New fail!')
                console.log('error', error);
              }
            }}
            type="primary"
            shape="round"
            size="small"
            style={{ background: '#FE3155', color: '#9B001B', borderColor: '#FE3155' }}
            block
          >
            Publish New
          </Button>}
        </span>



      },
    },

  ];

  const renderCardCol = (title, value) => {
    return (
      <Col span={8}>
        <Card
          style={{
            textAlign: 'center',
            height: 280,
          }}
        >
          <div>{title}</div>
          <div
            style={{
              fontSize: 38,
              color: 'rgba(0, 0, 0, 0.87)',
              fontWeight: 'bold',
              lineHeight: '65px',
              marginTop: 55,
            }}
          >
            {value}
          </div>
        </Card>
      </Col>
    );
  };

  const colorNum = (num, text, color) => {
    return (
      <div
        style={{
          color,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <div>{num}</div>
        <div style={{ fontSize: 14, lineHeight: 1.5 }}>{text}</div>
      </div>
    );
  };

  const { itemsTotal,
    inventoryTotal,
    updatedTotal,
    publishedTotal } = userHeaderState

  return (
    <>
      <div style={{ background: '#FFFFFF' }}>
        <Row gutter={8} style={{ padding: 20 }}>
          {renderCardCol('Total Items', itemsTotal)}
          {renderCardCol('Total Items In Inventory', inventoryTotal)}
          {renderCardCol(
            'Outstanding Tasks',
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {colorNum(publishedTotal, 'New Item Approvals', '#FE3155')}
              {colorNum(updatedTotal, 'Update Item Approvals', '#FB9001')}
            </div>
          )}
        </Row>
        <CustomPtoTable
          dataSource={dataSource}
          columns={columns}
          toolBarRender={null}
          selfOptions={{
            pagination: {
              total: rowCount.count,
              current: rowCount.page,
              onChange: (page,pageSize) => {
                fetchData({
                  page,
                  limit: pageSize,

                })
                console.log('next', page);
              }
            }
          }}
          options={false}
          headerTitle={null}
          actionRef={actionRef}
        />

        <EditModal
          loading={loading}

          visible={visible}
          categoryList={categoryList}
          lineList={lineList}
          setVisible={setVisible}

          categoryOnChange={categoryOnChange}
          onSubmit={onSubmit}
          initialValues={initialValues}
          type={type}
        />
      </div>
    </>
  );
};

export default DashboardList;
