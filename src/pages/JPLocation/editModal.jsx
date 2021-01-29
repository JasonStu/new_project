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
  required: '${name} is required',
};

const oneLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
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
      title={`${type} a JP location`}
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
      <ProFormText name="LocationId" label="Location ID" {...attrs} {...tailLayout} />
      <ProFormText name="CompanyName" label="Company Name" {...attrs} {...tailLayout} />
      <ProFormText name="Contact" label="Contact #1" {...attrs} {...tailLayout} />
      <Row>
        <Col offset={7}>
          <ProFormText
            name="Phone"
            label={null}
            {...attrs}
            placeholder="Phone*"
            wrapperCol={{ span: 24 }}
            validateMessages="Phone is required"
          />
        </Col>
        <Col offset={1}>
          <ProFormText
            name="Email"
            label={null}
            {...attrs}
            placeholder="Email*"
            wrapperCol={{ span: 24 }}
            validateMessages="Email is required"
          />
        </Col>
        <Col offset={7}>
          <ProFormText name="Fax" label={null} placeholder="Fax" wrapperCol={{ span: 24 }} />
        </Col>
      </Row>
      <ProFormText name="Contact2" label="Contact #2" placeholder="" {...tailLayout} />
      <Row>
        <Col offset={7}>
          <ProFormText
            name="Phone2"
            label={null}
            {...attrs}
            placeholder="Phone"
            wrapperCol={{ span: 24 }}
          />
        </Col>
        <Col offset={1}>
          <ProFormText name="Email2" label={null} placeholder="Email" wrapperCol={{ span: 24 }} />
        </Col>
      </Row>
      <Form.Item label="Address" {...tailLayout}>
        <ProFormText name="Country" label="Country" {...attrs} {...oneLayout} />
        <Form.Item
          name="Province"
          label="Province/State"
          {...attrs}
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item
          name="City"
          label="City"
          {...attrs}
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item
          name="District"
          label="District"
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item
          name="Postalcode"
          label="Postal code"
          {...attrs}
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item
          name="RecieverName"
          label="Reciever Name"
          {...attrs}
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item
          name="RecieverPhone "
          label="Reciever Phone #"
          {...attrs}
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input placeholder="" />
        </Form.Item>
      </Form.Item>

      <ProFormText name="CourierInfo" label="Courier Info" {...attrs} {...tailLayout} />
      <ProFormText name="CourierAccount" label="Courier Account #" {...attrs} {...tailLayout} />
      <ProFormTextArea
        fieldProps={{ maxLength: 100, showCount: true }}
        name="Notes"
        label="Notes"
        {...tailLayout}
        placeholder=""
      />

      <Row justify="center" style={{ marginTop: 30 }}>
        <Button type="primary" htmlType="submit">
          SUBMIT
        </Button>
      </Row>
    </ModalForm>
  );
};

export default EditModal;
