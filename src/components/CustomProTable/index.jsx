import React from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Button, message, Input, Drawer, Row } from 'antd';
import { PlusOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Open1 from '@/assets/open1.png';

const CustomPtoTable = (props) => {
  const { selfOptions = {}, ...otherProps } = props;

  const { onAdd, onExport, title, searchLabel = "Item ID" } = selfOptions;

  const toolBarRender = () => {
    return [
      <Button type="primary" key="add" onClick={onAdd}>
        <PlusOutlined /> Add
      </Button>,
      <Button key="export" onClick={onExport}>
        <ArrowDownOutlined /> Export
      </Button>,
    ];
  };

  const onSearch = value => console.log(value)

  const renderHeadTitle = (
    <Row>
      <div
        style={{
          fontSize: 26,
          fontWeight: 'bold',
          color: '#0C0E12',
          marginRight: 15,
        }}
      >
        {title}
      </div>
      <Row align="middle">
        <span>{searchLabel}</span>
        <Input.Search placeholder="" onSearch={onSearch} style={{ width: 200, marginLeft: 10 }} />
      </Row>
    </Row>
  );

  return (
    <>
      <ProTable
        search={false}
        rowKey="key"
        options={{ fullScreen: true, density: false, reload: false, setting: false }}
        toolBarRender={toolBarRender}
        pagination={{
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          defaultPageSize: 10,
        }}
        headerTitle={renderHeadTitle}
        scroll={{ x: 'max-content' }}
        {...otherProps}
      />
    </>
  );
};

export default CustomPtoTable;
