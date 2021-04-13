import React from "react";
// import {
//   PageContainer,
//   FooterToolbar
// } from '@ant-design/pro-layout';
import ProTable from "@ant-design/pro-table";
import { Button, Input, Row, Empty, ConfigProvider } from "antd";
import { PlusOutlined, ArrowDownOutlined } from "@ant-design/icons";
import en_US from "antd/lib/locale/en_US";
import { useAccess } from "umi";

// import Open1 from '@/assets/open1.png';

const CustomPtoTable = (props) => {
  const { selfOptions = {}, ...otherProps } = props;

  const {
    onAdd,
    onExport,
    title,
    searchLabel = "Item ID",
    pagination = {},
    onSearch
  } = selfOptions;

  const toolBarRender = () => {
    const { canAdmin, Sourcing, Engineering } = useAccess();
    let hiddenAdd = Engineering;
    if (canAdmin) {
      hiddenAdd = false;
    }
    return [
      <Button hidden={hiddenAdd} type="primary" key="add" onClick={onAdd}>
        <PlusOutlined /> Add
      </Button>,
      <Button key="export" onClick={onExport}>
        <ArrowDownOutlined /> Export
      </Button>
    ];
  };

  // const onSearch = value => console.log(value)

  const renderHeadTitle = (
    <Row>
      <div
        style={{
          fontSize: 26,
          fontWeight: "bold",
          color: "#0C0E12",
          marginRight: 15
        }}
      >
        {title}
      </div>
      <Row align="middle">
        <span>{searchLabel}</span>
        <Input.Search
          placeholder=""
          onSearch={onSearch}
          style={{ width: 200, marginLeft: 10 }}
        />
      </Row>
    </Row>
  );

  return (
    <ConfigProvider locale={en_US}>
      <ProTable
        rowKey={(item) => item.id.toString()}
        search={false}
        locale={{
          emptyText: () => <Empty description="No Data" />
        }}
        options={{
          fullScreen: true,
          density: false,
          reload: false,
          setting: false
        }}
        toolBarRender={toolBarRender}
        pagination={{
          pageSizeOptions: ["10", "25", "50"],

          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
          defaultPageSize: 10,
          ...pagination
        }}
        headerTitle={renderHeadTitle}
        scroll={{ x: "max-content" }}
        {...otherProps}
      />
    </ConfigProvider>
  );
};

export default CustomPtoTable;
