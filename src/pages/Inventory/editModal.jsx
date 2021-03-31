import React, { useState, useEffect } from 'react';
import { Col, Row, Form, Input, Button, Upload, Avatar } from 'antd';
import { ModalForm, ProFormText, ProFormTextArea, ProFormCheckbox, ProFormSelect } from '@ant-design/pro-form';
import { checkItemsExist, getItemList, getItemsDetail } from "@/services/item";
import { history, } from 'umi';


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
  const { actionRef, visible, setVisible, setInitialValues, onSubmit, initialValues, type } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [itemDetail, setItemDetail] = useState('');
  const [checkItems, setCheckItems] = useState(false);



  useEffect(() => {
    form.resetFields();

    console.log('2222');
  }, [initialValues]);

  const onFinish = async (value) => {
    setCheckItems(false)
    setFileList([])
    onSubmit({ ...initialValues, ...value });
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

  const handleSearch = async value => {

    console.log('value====>', value);
    try {
      const { data } = await getItemList({
        page: 1,
        limit: 100,
        item_id: value
      })
      if (data && data.rows) {
        setItemList(data.rows.map(i => ({ label: i.item_id, value: i.id })))
      }
    } catch (error) {
      console.log('error', error);
    }

  };

  const handleChange = async value => {
    try {

      const { data } = await getItemsDetail({ id: value })
      console.log('data', data);
      setItemDetail(data)
      setFileList(data.items_open_image || '')
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <ModalForm

      title={`${type} an Item to inventory`}
      width="900px"
      visible={visible}
      onVisibleChange={setVisible}
      onFinish={onFinish}
      modalProps={{
        onCancel: () => {
          setCheckItems(false)
          setFileList([])
        }
      }}
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
          <ProFormSelect
            showSearch
            fieldProps={{
              onChange: handleChange,
              onSearch: handleSearch,
              filterOption: false,
              defaultActiveFirstOption: false,
              showArrow: false
            }}
            name="item_id"
            label="Item ID"
            options={itemList}
            wrapperCol={10}
            labelCol={{ span: 13, offset: 1 }}
            {...attrs}
          />
        </Col>
        {itemList.length === 0 && type === 'Add' ? (
          <Col span={10} offset={1}>
            <div>
              <span style={{ color: '#FE3155', marginRight: 10 }}>
                No Item exists with this item ID
              </span>

              <Button onClick={() => {
                history.push('/items')
              }} type="primary">Add Item</Button>

            </div>
          </Col>
        ) : null}
        {fileList.length ? (
          <Col span={12} offset={6} className={styles.uploadWrap}>
            <span style={{ color: '#FE3155', marginRight: 10 }}>
              <Avatar
                shape="square"
                size={64}
                src={fileList[0].url} />
            </span>
            <Button
              onClick={async () => {

                const { data } = await checkItemsExist({ item_id: itemDetail.item_id })
                setCheckItems(data)
                if (data) {
                  console.log('itemDetail', itemDetail);
                  setInitialValues(itemDetail)

                }
              }}
              type="primary">Confirm</Button>
          </Col>
        ) : null}
      </Row>
      {  <>
        <ProFormText name="item_name" label="Item Name" {...attrs} {...tailLayout} />
        <ProFormTextArea
          fieldProps={{ maxLength: 100, showCount: true }}
          name="description"
          label="Inventory Item Description"
          {...attrs}
          {...tailLayout}
        />
        <Row>
          <Col span={8}>
            <ProFormText
              name="price_per_piece"
              label="Price per piece"
              fieldProps={{ prefix: '$', type: 'number' }}
              {...attrs}
              {...threeLayout}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="pieces_per_box"
              label="Pieces per box"
              fieldProps={{ prefix: '$', type: 'number' }}
              {...attrs}
              {...threeLayout}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name="total_price"
              label="Total Price"
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
              name="number_of_boxes_in_stock"
              label="Number of boxes in stock"
              fieldProps={{ prefix: '#', type: 'number' }}
              {...attrs}
              {...threeLayout}
            />
          </Col>
        </Row>

        <ProFormCheckbox name="discontinued" layout="horizontal" label="Discontinued" />
      </>}
      <Row justify="center" style={{ marginTop: 30 }}>
        <Button type="primary" htmlType="submit">
          SUBMIT
        </Button>
      </Row>
    </ModalForm>
  );
};

export default EditModal;
