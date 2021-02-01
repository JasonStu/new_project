import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Input, Button, Upload } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea, ProFormCheckbox } from '@ant-design/pro-form';

import styles from './index.less';

const layout = {
  labelCol: { span: 6, offset: 1 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 10 },
};

const threeLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const validateMessages = {
  required: '${label} is required',
};

const attrs = {
  rules: [{ required: true }],
  placeholder: '',
};

const EditModal = (props) => {
  const { actionRef, visible, setVisible, initialValues, onSubmit, type } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  const onFinish = async (value) => {
    onSubmit({...initialValues, ...value});
  };

  const renderUploadItem = (node, file) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {node}
        <div style={{ marginTop: 5, textAlign: 'center' }}>{file.name}</div>
      </div>
    )
  }

  const uploadProps = {
    accept: 'png;jpg;',
    onChange: ({ fileList }) => setFileList(fileList),
    fileList,
    itemRender: renderUploadItem
  };

  return (
    <ModalForm
      title={`${type} an Item to inventory`}
      width="900px"
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={onFinish}
      initialValues={initialValues}
      layout="horizontal"
      validateMessages={validateMessages}
      form={form}
      submitter={{
        render: false,
      }}
      {...layout}
    >
      <Row>
        <Col span={12}>
          <ProFormText
            name="itemID"
            label="Item ID"
            wrapperCol={10}
            labelCol={{ span: 13, offset: 1 }}
            {...attrs}
          />
        </Col>
        {!fileList.length && type === 'Add' ? (
          <Col span={10} offset={1}>
            <div>
              <span style={{ color: '#FE3155', marginRight: 10 }}>
                No Item exists with this item ID
              </span>
              <Upload {...uploadProps}>
                <Button type="primary">Add Item</Button>
              </Upload>
            </div>
          </Col>
        ) : null}
        {fileList.length ? (
          <Col span={12} offset={6} className={styles.uploadWrap}>
            <Upload listType="picture-card" {...uploadProps}>
              <Button type="primary">Confirm</Button>
            </Upload>
          </Col>
        ) : null}
      </Row>
      <ProFormText name="vendorName" label="Item Name" {...attrs} {...tailLayout} />
      <ProFormTextArea
        fieldProps={{ maxLength: 100, showCount: true }}
        name="desc"
        label="Inventory Item Description"
        {...attrs}
        {...tailLayout}
      />
      <Row>
        <Col span={8}>
          <ProFormText
            name="piece"
            label="Price per piece"
            fieldProps={{ prefix: '$', type: 'number' }}
            {...attrs}
            {...threeLayout}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="piecesBox"
            label="Pieces per box"
            fieldProps={{ prefix: '$', type: 'number' }}
            {...attrs}
            {...threeLayout}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="priceBox"
            label="Price Per box"
            fieldProps={{ prefix: '$', type: 'number' }}
            {...attrs}
            {...threeLayout}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <ProFormText
            name="length"
            label="Length"
            fieldProps={{ suffix: 'mm', type: 'number' }}
            {...attrs}
            {...threeLayout}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="width"
            label="Width"
            fieldProps={{ suffix: 'mm', type: 'number' }}
            {...attrs}
            {...threeLayout}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            name="height"
            label="Height"
            fieldProps={{ suffix: 'mm', type: 'number' }}
            {...attrs}
            {...threeLayout}
          />
        </Col>
      </Row>

      <Row>
        <Col span={8}>
          <ProFormText
            name="weight"
            label="Weight"
            fieldProps={{ suffix: 'kg', type: 'number' }}
            {...attrs}
            {...threeLayout}
          />
        </Col>
        <Col span={12}>
          <ProFormText
            name="stock"
            label="Number of boxes in stock"
            fieldProps={{ prefix: '#', type: 'number' }}
            {...attrs}
            {...threeLayout}
          />
        </Col>
      </Row>

      <ProFormCheckbox name="checkbox" layout="horizontal" label="Discontinued" />

      <Row justify="center" style={{ marginTop: 30 }}>
        <Button type="primary" htmlType="submit">
          SUBMIT
        </Button>
      </Row>
    </ModalForm>
  );
};

export default EditModal;
