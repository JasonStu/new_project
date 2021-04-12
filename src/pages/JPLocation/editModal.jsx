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
    onSubmit({...initialValues, ...value});
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
      <ProFormText name="location_id" label="Location ID" {...attrs} {...tailLayout} />
      <ProFormText name="company_name" label="Company Name" {...attrs} {...tailLayout} />
      <ProFormText name="contact_1" label="Contact #1" {...attrs} {...tailLayout} />
      <Row>
       
        <Col offset={7}>
          <ProFormText
            name="contact_1_phone"
            label={null}
            {...attrs}
            placeholder="Phone*"
            wrapperCol={{ span: 24 }}
            validateMessages="Phone is required"
          />
        </Col>
        <Col offset={1}>
          <ProFormText
            name="contact_1_email"
            label={null}
            {...attrs}
            placeholder="Email*"
            wrapperCol={{ span: 24 }}
            validateMessages="Email is required"
          />
        </Col>
        <Col offset={7}>
          <ProFormText name="contact_1_fax" label={null} placeholder="Fax" wrapperCol={{ span: 24 }} />
        </Col>
      </Row>
      <ProFormText name="contact_2" label="Contact #2" placeholder="" {...tailLayout} />
      <Row>
        <Col offset={7}>
          <ProFormText
            name="contact_2_phone"
            label={null}
            // {...attrs}
            placeholder="Phone"
            wrapperCol={{ span: 24 }}
          />
        </Col>
        <Col offset={1}>
          <ProFormText name="contact_2_email" label={null} placeholder="Email" wrapperCol={{ span: 24 }} />
        </Col>
      </Row>
      <Form.Item label="Address" {...tailLayout}>
        <ProFormText name="address_country" label="Country" {...attrs} {...oneLayout} />
        <Form.Item
          name="address_province"
          label="Province/State"
          {...attrs}
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item
          name="address_city"
          label="City"
          {...attrs}
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item
          name="address_district"
          label="District"
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item
          name="address_postal_code"
          label="Postal code"
          {...attrs}
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item
          name="address_reciever_name"
          label="Reciever Name"
          {...attrs}
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder="" />
        </Form.Item>
        <Form.Item
          name="address_reciever_phone"
          label="Reciever Phone #"
          {...attrs}
          {...oneLayout}
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input placeholder="" />
        </Form.Item>
      </Form.Item>

      <ProFormText name="courier_info" label="Courier Info" {...attrs} {...tailLayout} />
      <ProFormText name="courier_account" label="Courier Account #" {...attrs} {...tailLayout} />
      <ProFormTextArea
        fieldProps={{ maxLength: 100, showCount: true }}
        name="notes"
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
