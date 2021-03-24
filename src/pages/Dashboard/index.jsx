import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Card, Button } from 'antd';

import CustomPtoTable from '@/components/CustomProTable';
import { getDashboardMainInfo, getDashboardList } from "@/services/dashboard";
import { default_columns, } from '../Items/const';

const DashboardList = () => {
  const [dataSource, setDataSource] = useState(
    []
  );
  const [rowCount, setRowCount] = useState({
    count: 0,
    page: 1
  });

  const [userHeaderState, setUserHeaderState] = useState({});

  const fetchData = async () => {
    const result = await getDashboardMainInfo()
    const { data } = await getDashboardList()
    setUserHeaderState(result.data)
    setDataSource(data.rows)
    setRowCount({ count: data.count, page: data.page })
  }

  useEffect(() => {
    fetchData()
  }, [])

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
          <a onClick={() => {
            console.log(text, record);
          }}>Edit</a>
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
            type="primary"
            shape="round"
            size="small"
            style={{ background: '#FFAE42', color: '#9F3C0D', borderColor: '#FFAE42' }}
            block
          >
            Publish Update
            </Button>}
          {record.is_published === 0 && <Button

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
            </div>,
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
              onChange: (page) => {
                fetchData({
                  page,
                  limit: 10,
                  well_id: wellID
                })
                console.log('next', page);
              }
            }
          }}
          options={false}
          headerTitle={null}
          actionRef={actionRef}
        />
      </div>
    </>
  );
};

export default DashboardList;
