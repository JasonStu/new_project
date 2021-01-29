import React, { useState, useRef } from 'react';
import { Row, Col, Card, Button } from 'antd';

import CustomPtoTable from '@/components/CustomProTable';
import { default_columns, default_dataSource } from '../Inventory/const';

const DashboardList = () => {
  const [dataSource, setDataSource] = useState(
    [...Array(13).keys()].map((item) => default_dataSource(item)),
  );
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
          <a onClick={() => {}}>Edit</a>
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record, index) => {
        if (index === 0) {
          return (
            <Button
              type="primary"
              shape="round"
              size="small"
              style={{ background: '#FFAE42', color: '#9F3C0D', borderColor: '#FFAE42' }}
              block
            >
              Publish Update
            </Button>
          );
        }
        if (index === 1) {
          return (
            <Button
              type="primary"
              shape="round"
              size="small"
              style={{ background: '#FE3155', color: '#9B001B', borderColor: '#FE3155' }}
              block
            >
              Publish New
            </Button>
          );
        }
        return null;
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

  return (
    <>
      <div style={{ background: '#FFFFFF' }}>
        <Row gutter={8} style={{ padding: 20 }}>
          {renderCardCol('Total Items', '2000')}
          {renderCardCol('Total Items In Inventory', '1500')}
          {renderCardCol(
            'Outstanding Tasks',
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {colorNum(4, 'New Item Approvals', '#FE3155')}
              {colorNum(6, 'Update Item Approvals', '#FB9001')}
            </div>,
          )}
        </Row>
        <CustomPtoTable
          dataSource={dataSource}
          columns={columns}
          toolBarRender={null}
          options={false}
          headerTitle={null}
          actionRef={actionRef}
        />
      </div>
    </>
  );
};

export default DashboardList;
