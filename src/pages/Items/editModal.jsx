import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Input, Button, Upload } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormSelect,
} from '@ant-design/pro-form';
import { CloudUploadOutlined } from '@ant-design/icons';

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
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);

  useEffect(() => {
    const { openItem = [], closedItem = [], Factory = [] } = initialValues;
    form.resetFields();
    if (openItem) {
      setFileList(openItem);
    }
    if (closedItem) {
      setFileList2(closedItem);
    }
    if (Factory) {
      setFileList3(Factory);
    }
  }, [initialValues]);

  const onFinish = async (value) => {
    onSubmit({
      ...initialValues,
      ...value,
      openItem: fileList,
      closedItem: fileList2,
      Factory: fileList3,
    });
  };

  const renderUploadItem = (node, file) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {node}
        <div style={{ marginTop: 5, textAlign: 'center' }}>{file.name}</div>
      </div>
    );
  };

  const uploadProps = {
    accept: 'png;jpg;',
    itemRender: renderUploadItem,
    listType: 'picture-card',
  };

  const getThreeCol = (dom) => {
    return <Col span={8}>{dom}</Col>;
  };

  const validateFileList = (rule, value, cb, list) => {
    return list.length ? Promise.resolve() : Promise.reject('file is required');
  }

  return (
    <ModalForm
      title={`${type} a new Item`}
      width="900px"
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={onFinish}
      initialValues={initialValues}
      layout="horizontal"
      validateMessages={validateMessages}
      form={form}
      style={{
        padding: '0 60px',
      }}
      submitter={{
        render: false,
      }}
      {...layout}
    >
      <ProFormText
        name="itemID"
        label="Item ID"
        {...attrs}
        {...tailLayout}
        placeholder="JI-xx(JP-xx)"
      />

      <Form.Item
        label="Open Item"
        name="openItem"
        required={true}
        rules={[
          {
            required: true,
            validator: (rule, value, cb) => validateFileList(rule, value, cb, fileList),
          },
        ]}
        wrapperCol={{ span: 12 }}
      >
        <div className={styles.uploadWrap}>
          <Upload
            {...uploadProps}
            onChange={({ fileList }) => setFileList(fileList)}
            fileList={fileList}
          >
            <div
              style={{
                paddingBottom: 130,
              }}
            >
              <div>Upload</div>
              <CloudUploadOutlined />
            </div>
          </Upload>
        </div>
      </Form.Item>
      <Form.Item
        label="Closed Item"
        name="closedItem"
        required={true}
        rules={[
          {
            required: true,
            validator: (rule, value, cb) => validateFileList(rule, value, cb, fileList2),
          },
        ]}
        wrapperCol={{ span: 12 }}
      >
        <div className={styles.uploadWrap}>
          <Upload
            {...uploadProps}
            onChange={({ fileList }) => setFileList2(fileList)}
            fileList={fileList2}
          >
            <div
              style={{
                paddingBottom: 130,
              }}
            >
              <div>Upload</div>
              <CloudUploadOutlined />
            </div>
          </Upload>
        </div>
      </Form.Item>

      <ProFormSelect
        name="Shape"
        label="Shape"
        valueEnum={{
          'Rectangle': 'Rectangle',
          'circular': 'circular',
        }}
        {...attrs}
        {...tailLayout}
      />
      <ProFormTextArea
        fieldProps={{ maxLength: 100, showCount: true }}
        name="Description"
        label="Description"
        {...attrs}
        {...tailLayout}
      />
      <ProFormText name="vendorName" label="Vendor Name" {...attrs} {...tailLayout} />
      <ProFormText name="vendorCode" label="Vendor Code" {...attrs} {...tailLayout} />
      <ProFormSelect
        name="category"
        label="Category"
        valueEnum={{
          'Jars and Pots': 'Jars and Pots',
          'Jars and Pots2': 'Jars and Pots2',
        }}
        initialValue="Jars and Pots"
        {...attrs}
        {...tailLayout}
      />
      <ProFormSelect
        name="Line"
        label="Line"
        valueEnum={{
          'Hinged Jars & Pots': 'Hinged Jars & Pots',
          'Hinged Jars & Pots2': 'Hinged Jars & Pots2',
        }}
        initialValue="Hinged Jars & Pots"
        {...attrs}
        {...tailLayout}
      />

      <Row>
        {getThreeCol(
          <ProFormText name="Cover" label="Cover Material" placeholder="" {...threeLayout} />,
        )}
        {getThreeCol(
          <ProFormText name="Base" label="Base Material" placeholder="" {...threeLayout} />,
        )}
        {getThreeCol(
          <ProFormText name="Inner" label="Inner Jar Material" placeholder="" {...threeLayout} />,
        )}
        {getThreeCol(
          <ProFormText
            name="Sealing"
            label="Sealing Disc Material"
            placeholder=""
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText name="SifterMaterial" label="Sifter Material" placeholder="" {...threeLayout} />,
        )}
        {getThreeCol(
          <ProFormText name="wells" label="# of wells" placeholder="" {...threeLayout} />,
        )}
        {getThreeCol(
          <ProFormText
            name="Capacity1"
            label="Capacity"
            fieldProps={{ type: 'number' }}
            placeholder="ml"
            {...threeLayout}
          />,
        )}
        {getThreeCol(<ProFormText name="Pin" label="Pin Type" placeholder="" {...threeLayout} />)}
      </Row>

      <ProFormSelect
        name="Closure"
        label="Closure Type"
        valueEnum={{
          1: 'Friction Clasp',
          2: 'Friction Clasp2',
        }}
        initialValue="Friction Clasp"
        placeholder=""
        {...tailLayout}
      />
      <ProFormText name="Sifter" label="Sifter Type" {...tailLayout} placeholder="" />

      <Form.Item label="Printable Area" style={{ marginBottom: 0, alignItems: 'center' }}>
        <Form.Item
          name="areaWidth"
          label="Width"
          labelCol={24}
          wrapperCol={24}
          colon={false}
          style={{ display: 'inline-block', width: '30%' }}
        >
          <Input placeholder="mm" />
        </Form.Item>
        <Form.Item
          name="areaLength"
          label="Length"
          labelCol={24}
          wrapperCol={24}
          colon={false}
          style={{ display: 'inline-block', width: '30%', margin: '0 8px' }}
        >
          <Input placeholder="mm" />
        </Form.Item>
      </Form.Item>

      <ProFormSelect
        name="Cap"
        label="Cap Type"
        valueEnum={{
          1: 'Single',
          2: 'Single2',
        }}
        initialValue="Single"
        placeholder=""
        {...tailLayout}
      />
      <Row>
        {getThreeCol(
          <ProFormText
            name="Length"
            label="Length"
            fieldProps={{ type: 'number' }}
            {...attrs}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            name="Width"
            label="Width"
            fieldProps={{ type: 'number' }}
            {...attrs}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            name="Height"
            label="Height"
            fieldProps={{ type: 'number' }}
            {...attrs}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            name="Diameter"
            label="Diameter"
            fieldProps={{ type: 'number' }}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            name="PanWell"
            label="Pan Well"
            fieldProps={{ type: 'number' }}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            name="PanDepth"
            label="Pan Depth"
            fieldProps={{ type: 'number' }}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            name="CupSize"
            label="Cup Size"
            fieldProps={{ type: 'number' }}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            name="Caliber"
            label="Caliber"
            fieldProps={{ type: 'number' }}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            name="ofwells"
            label="# of wells"
            fieldProps={{ type: 'number' }}
            placeholder="1 - 48"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            name="Dosage"
            label="Dosage"
            fieldProps={{ type: 'number' }}
            placeholder="ml"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            name="Capacity"
            label="Capacity"
            fieldProps={{ type: 'number' }}
            {...attrs}
            {...threeLayout}
            placeholder="ml"
          />,
        )}
        {getThreeCol(
          <ProFormText
            name="Weight"
            label="Weight"
            fieldProps={{ type: 'number' }}
            {...attrs}
            {...threeLayout}
            placeholder="g"
          />,
        )}{' '}
        {getThreeCol(
          <ProFormText
            name="Thread"
            label="Thread"
            fieldProps={{ type: 'number' }}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
      </Row>
      <Form.Item
        label="Factory Drawings"
        name="Factory"
        required={true}
        rules={[
          {
            required: true,
            validator: (rule, value, cb) => fileList3.length !== 0 ? cb() : cb('Factory Drawings is required'),
          },
        ]}
        wrapperCol={{ span: 12 }}
      >
        <div className={styles.uploadWrap}>
          <Upload
            {...uploadProps}
            onChange={({ fileList }) => setFileList3(fileList)}
            fileList={fileList3}
          >
            <div
              style={{
                paddingBottom: 130,
              }}
            >
              <div>Upload</div>
              <CloudUploadOutlined />
            </div>
          </Upload>
        </div>
      </Form.Item>
      <Row justify="center">
        <Button type="primary" htmlType="submit">
          SUBMIT
        </Button>
      </Row>
    </ModalForm>
  );
};

export default EditModal;
