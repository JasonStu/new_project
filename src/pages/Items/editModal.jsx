import React, { useState, useEffect, useRef } from 'react';
import { Col, Row, Form, Input, Button, Upload } from 'antd';
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormCheckbox,
  ProFormSelect,
  ProFormUploadButton,
  ProFormSwitch
} from '@ant-design/pro-form';
import { useModel, useAccess, } from 'umi';

import { CloudUploadOutlined } from '@ant-design/icons';

import styles from './index.less';
import { findLast } from 'lodash';

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
  const { actionRef, visible, setVisible, initialValues, categoryList, onSubmit, type, categoryOnChange, lineList, lineOnChange, loading } = props;
  const [form] = Form.useForm();

  const [fileList, setFileList] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileList3, setFileList3] = useState([]);
  const [fileList4, setFileList4] = useState([]);
  const [ecoFriendly, setEcoFriendly] = useState(true);
  const [dyFrom, setDyFrom] = useState([]);
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState
  const { canAdmin, Sourcing, Engineering } = useAccess()


  // console.log('Engineering',dyFrom);

  useEffect(() => {
    const { items_open_image = [], items_closed_image = [], items_factory_image = [], items_jerhel_image = [], line, eco_friendly } = initialValues;
    form.resetFields();
    if (items_open_image) {
      setFileList(items_open_image);
    }
    if (items_closed_image) {
      setFileList2(items_closed_image);
    }
    if (items_factory_image) {
      setFileList3(items_factory_image);
    }
    if (items_jerhel_image) {
      setFileList4(items_jerhel_image);
    }
    if (line && line.forms) {
      setDyFrom(line.forms)
    }
    if (eco_friendly !== undefined && ecoFriendly !== null) {
      setEcoFriendly(eco_friendly)
    } else {
      setEcoFriendly(true)
    }
  }, [initialValues]);

  const onFinish = async (value, e) => {
    console.log('value==', value, ecoFriendly);
    onSubmit({
      ...initialValues,
      ...value,
      eco_friendly: Number(ecoFriendly),
      line_id: JSON.parse(value.line_id).id
      // openItem: fileList,
      // closedItem: fileList2,
      // Factory: fileList3,
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
    // accept: 'png;jpg;',
    itemRender: renderUploadItem,
    listType: 'picture-card',
  };

  const getThreeCol = (dom, key) => {
    if (key) {
      return <Col key={key} span={8}>{dom}</Col>;

    }
    return <Col span={8}>{dom}</Col>;
  };
  const getSelectCol = (dom) => {
    return <Col span={10}>{dom}</Col>;
  };
  const getLineForm = (form) => {
    setDyFrom(form)
  }
  const validateFileList = (rule, value, cb, list) => {
    if (!rule.required) {
      return Promise.resolve()
    }
    return rule.required && list.length ? Promise.resolve() : Promise.reject(`${rule.field} is required!!!`);
  }
  const fileHandleMethod = (item) => {
    if (item.originFileObj) {
      return ({
        name: item.name,
        fileName: item.name,
        originFileObj: item.originFileObj || '',
        uid: item.uid
      })
    } else {
      let arr = (item && item.url && item.url.length > 0) && item.url.split('/') || []
      const name = findLast(arr)
      const uid = name.split('_')[1]
      return ({
        name: decodeURI(findLast(arr)),
        fileName: decodeURI(findLast(arr)),
        url: item.url,
        uid: uid
      })
    }
  }

  return (
    <ModalForm

      title={`${type} a new Item`}
      width="900px"
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={onFinish}
      initialValues={initialValues}
      modalProps={{
        confirmLoading: loading
      }}
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
        disabled={!Sourcing}
        name="item_id"
        label="Item ID"
        {...attrs}
        {...tailLayout}
        placeholder="JI-xx(JP-xx)"
      />

      {  <ProFormUploadButton
        accept='image/png,image/jpeg'
        disabled={!Sourcing}
        rules={[
          {
            required: true,
            validator: (rule, value, cb) => validateFileList(rule, value, cb, fileList),
          },
        ]}
        fieldProps={{
          fileList: fileList.map(item =>
            fileHandleMethod(item)
          ),
          onPreview: (f) => {
            console.log('f===', f);
          },
          onChange: (v) => {
            console.log('v====', v);
            setFileList(v.fileList)
          }
        }}
        label="Open Item"
        name="open_image"
        listType='picture'
        title='Upload'
        max='2'
      />}

      {  <ProFormUploadButton
        accept='image/png,image/jpeg'
        disabled={!Sourcing}
        fieldProps={{
          fileList: fileList2.map(item => fileHandleMethod(item)),
          onPreview: (f) => {
            console.log('f===', f);
          },
          onChange: (v) => {
            setFileList2(v.fileList)
          }
        }}
        rules={[
          {
            required: true,
            validator: (rule, value, cb) => validateFileList(rule, value, cb, fileList2),
          },
        ]}
        label="Closed Item"
        name="closed_image"
        listType='picture'
        title='Upload'
        max='2'

      />}
      {  <ProFormSelect
        disabled={!Sourcing}
        name="shape"
        label="Shape"
        valueEnum={{
          'other': 'Other',
          'square': 'Square',
          'round': 'Round',
          'oval': 'Oval',
          'rectangle': 'Rectangle',
        }}
        {...attrs}
        {...tailLayout}
      />}
      { <ProFormTextArea
        disabled={!Sourcing}
        fieldProps={{ maxLength: 100, showCount: true }}
        name="description"
        label="Description"
        {...attrs}
        {...tailLayout}
      />}


      <ProFormCheckbox
        disabled={!Sourcing}
        name="eco_friendly"
        label="ECO Friendly"
        fieldProps={{
          defaultChecked: ecoFriendly,
          onChange: (e) => {
            setEcoFriendly(e.target.checked)
            console.log('onChange===', e.target.checked);
          }
        }}
        // {...attrs}
        {...tailLayout}
      />



      { <ProFormSelect
        disabled={!Sourcing}
        name="category_id"
        label="Category"
        options={categoryList}
        // initialValue="Jars and Pots"
        fieldProps={{
          onChange: categoryOnChange,
        }}
        {...attrs}
        {...tailLayout}
      />}

      { <ProFormSelect
        disabled={!Sourcing}
        name="line_id"
        label="Line"
        // valueEnum={lineList}
        options={lineList}
        fieldProps={{
          onChange: (v) => {
            let value = JSON.parse(v)
            setDyFrom(value.from)
            console.log('v=====>', value);
          }
        }}
        // initialValue="Hinged Jars & Pots"
        {...attrs}
        {...tailLayout}
      />}
      <ProFormText
        name="vendor_code"
        label="Vendor Code"
        disabled={!Engineering}
        {...attrs}
        rules={[{ required: Engineering }]}

        {...tailLayout}
      />
      <ProFormText
        name="vendor_name"
        label="Vendor Name"
        disabled={!Engineering}
        {...attrs}
        rules={[{ required: Engineering }]} 

        {...tailLayout}
      />
      {  <Row>
        {
          dyFrom.map(i => {
            if (i.type === 'input') {
              return getThreeCol(
                <ProFormText
                  disabled={!Engineering}
                  name={i.key} label={i.label} placeholder="" {...threeLayout} />, i.id
              )
            } else {
              return getThreeCol(<ProFormSelect
                disabled={!Engineering}
                name={i.key}
                label={i.label}
                valueEnum={i.typeValue}
                // options={lineList}
                fieldProps={{
                  onChange: (v) => {
                    let value = JSON.parse(v)
                    console.log('v=====>', value);
                  }
                }}
                placeholder=''
                // { ...attrs }
                {...threeLayout}
              />, i.id)
            }

          })
        }
      </Row>
      }

      {  <Row>
        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="length"
            label="Length"
            fieldProps={{ type: 'number' }}
            {...attrs}
            rules={[{ required: Engineering }]}
            placeholder="mm"
            {...threeLayout}
          />,
        )}

        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="width"
            label="Width"
            fieldProps={{ type: 'number' }}
            {...attrs}
            rules={[{ required: Engineering }]}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="height"
            label="Height"
            fieldProps={{ type: 'number' }}
            {...attrs}
            rules={[{ required: Engineering }]}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="diameter"
            label="Diameter"
            fieldProps={{ type: 'number' }}
            placeholder="mm"
            // {...attrs}
            {...threeLayout}
          />,
        )}

        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="pan_well"
            label="Pan Well"
            fieldProps={{ type: 'number' }}
            placeholder="mm"
            // {...attrs}
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="pan_depth"
            label="Pan Depth"
            fieldProps={{ type: 'number' }}
            placeholder="mm"
            // {...attrs}
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="cup_size"
            label="Cup Size"
            fieldProps={{ type: 'number' }}
            placeholder="mm"
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="caliber"
            label="Caliber"
            fieldProps={{ type: 'number' }}
            placeholder="mm"
            // {...attrs}
            {...threeLayout}
          />,
        )}

        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="dosage"
            label="Dosage"
            fieldProps={{ type: 'number' }}
            placeholder="ml"
            // {...attrs}
            {...threeLayout}
          />,
        )}
        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="capacity"
            label="Capacity"
            fieldProps={{ type: 'number' }}
            // {...attrs}
            {...threeLayout}
            placeholder="ml"
          />,
        )}

        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="weight"
            label="Weight"
            fieldProps={{ type: 'number' }}
            {...attrs}
            rules={[{ required: Engineering }]}
            {...threeLayout}
            placeholder="g"
          />,
        )}

        {getThreeCol(
          <ProFormText
            disabled={!Engineering}
            name="thread"
            label="Thread"
            // fieldProps={{ type: 'number' }}
            placeholder="mm"
            // {...attrs}
            {...threeLayout}
          />,
        )}

      </Row>
      }
      {<ProFormUploadButton

        accept='.pdf,.doc,.docx,.xml,application/msword'
        // accept='.pdf'
        fieldProps={{
          fileList: fileList3.map(item => fileHandleMethod(item)),
          onPreview: (f) => {
            console.log('f===', f);
          },

          onChange: (v) => {
            console.log('v====', v);
            setFileList3(v.fileList)
          }
        }}
        label="Factory_ Item"
        name="factory_image"
        listType='text'
        title='Upload'
        max='5'
        rules={[
          {
            required: true,
            validator: (rule, value, cb) => validateFileList(rule, value, cb, fileList3),
          },
        ]}
      />}

      { <ProFormUploadButton

        accept='.pdf,.doc,.docx,.xml,application/msword'
        // accept='.pdf'
        fieldProps={{
          fileList: fileList4.map(item => fileHandleMethod(item)),
          onPreview: (f) => {
            console.log('f===', f);
          },

          onChange: (v) => {
            console.log('v====', v);
            setFileList4(v.fileList)
          }
        }}
        label="Jerhel_ Item"
        name="jerhel_image"
        listType='text'
        title='Upload'
        max='5'
        rules={[
          {
            required: true,
            validator: (rule, value, cb) => validateFileList(rule, value, cb, fileList4),
          },
        ]}
      />}

      <Row justify="center">
        <Button loading={loading} type="primary" htmlType="submit">
          SUBMIT
        </Button>
      </Row>
    </ModalForm>
  );
};

export default EditModal;
