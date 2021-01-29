import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Input, Button, Upload } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';

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

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  const onFinish = async (value) => {
    onSubmit(value);
  };

  return (
    <ModalForm
      title={`${type} a Well`}
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
      <ProFormText name="WellId" label="Well ID" {...attrs} {...tailLayout} />
      <ProFormText name="Well#" label="Well #" {...attrs} {...tailLayout} />
      <ProFormText name="Quantity" label="Quantity" {...attrs} {...tailLayout} />
      <ProFormSelect
        name="shape"
        label="Shape"
        valueEnum={{
          1: 'Rectangle',
          2: 'circular',
        }}
        {...attrs}
        {...tailLayout}
      />
      <Row>
        <Col offset={3}>
          <ProFormText name="Height" label="Height" {...attrs} placeholder="mm" labelCol={{span: 12}}/>
        </Col>
        <Col>
          <ProFormText name="Diameter" label="Diameter" {...attrs} placeholder="mm" labelCol={{span: 12}}/>
        </Col>
      </Row>
      <Row>
        <Col offset={3}>
          <ProFormText name="Length" label="Length" {...attrs} placeholder="mm" labelCol={{span: 12}}/>
        </Col>
        <Col>
          <ProFormText name="Width" label="Width" {...attrs} placeholder="mm" labelCol={{span: 12}}/>
        </Col>
      </Row>
      <Row>
        <Col offset={3}>
          <ProFormText name="Corner" label="Corner radius" {...attrs} placeholder="in" labelCol={{span: 12}}/>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 30 }}>
        <Button type="primary" htmlType="submit">
          SUBMIT
        </Button>
      </Row>
    </ModalForm>
  );
};

export default EditModal;
