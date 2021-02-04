import { Row } from 'antd';
import Open1 from '@/assets/open1.png';
import { isArray } from 'lodash';

const renderImgList = (text, record, index) => {
  if (isArray(text) && text.length) {
    return (
      <Row key={index}>
        {text.map((item) => (
          <img
            style={{ width: 46, height: 46, marginLeft: 10 }}
            src={item.url || item.thumbUrl || ''}
            key={item.uid}
          />
        ))}
      </Row>
    );
  }
  return null;
};

export const default_dataSource = (key) => ({
  key,
  id: 84 + key,
  date: '1975-03-29',
  itemID: 'JI-12345',
  Category: 'Mirror Holder',
  SubCategory: 'Mirror Holder',
  Shape: 'Other',
  Description: 'Description',
  Length: '10',
  Width: '10',
  Height: '30',
  Diameter: '30',
  PanWell: '30',
  PanDepth: '30',
  CupSize: '30',
  Caliber: '30',
  ofwells: '30',
  Dosage: '30',
  Capacity: '30',
  Weight: '30',
  Thread: '30',
  Additional: '30',
  vendorName: 'Vendor Name',
  vendorCode: 'Vendor Code',

  openItem: [
    {
      uid: 'open1',
      name: 'open1',
      status: 'done',
      url: Open1,
    },
    {
      uid: 'open2',
      name: 'open2',
      status: 'done',
      url: Open1,
    },
  ],
  closedItem: [
    {
      uid: 'close1',
      name: 'close1',
      status: 'done',
      url: Open1,
    },
    {
      uid: 'close2',
      name: 'close2',
      status: 'done',
      url: Open1,
    },
  ],
  Factory: [
    {
      uid: 'Factory1',
      name: 'Factory1',
      status: 'done',
      url: Open1,
    },
    {
      uid: 'Factory2',
      name: 'Factory2',
      status: 'done',
      url: Open1,
    },
  ],
});

export const default_columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: 100,
  },
  {
    title: 'Item Code',
    dataIndex: 'itemID',
    width: 100,
  },
  {
    title: 'Product Photo Upload',
    dataIndex: 'openItem',
    width: 200,
    render: renderImgList
  },
  {
    title: 'Category',
    dataIndex: 'Category',
    width: 150,
  },
  {
    title: 'Sub-Category',
    dataIndex: 'SubCategory',
    width: 200,
  },
  {
    title: 'Shape',
    dataIndex: 'Shape',
    width: 100,
  },
  {
    title: 'Description',
    dataIndex: 'Description',
    width: 100,
  },
  {
    title: 'Length',
    dataIndex: 'Length',
    width: 100,
  },
  {
    title: 'Width',
    dataIndex: 'Width',
    width: 100,
  },
  {
    title: 'Height',
    dataIndex: 'Height',
    width: 100,
  },
  {
    title: 'Diameter',
    dataIndex: 'Diameter',
    width: 100,
  },
  {
    title: 'Pan Well',
    dataIndex: 'PanWell',
    width: 100,
  },
  {
    title: 'Pan Depth',
    dataIndex: 'PanDepth',
    width: 100,
  },
  {
    title: 'Cup Size',
    dataIndex: 'CupSize',
    width: 100,
  },
  {
    title: 'Caliber',
    dataIndex: 'Caliber',
    width: 100,
  },
  {
    title: '# of wells',
    dataIndex: 'ofwells',
    width: 100,
  },
  {
    title: 'Dosage',
    dataIndex: 'Dosage',
    width: 100,
  },
  {
    title: 'Capacity',
    dataIndex: 'Capacity',
    width: 100,
  },
  {
    title: 'Weight',
    dataIndex: 'Weight',
    width: 100,
  },
  {
    title: 'Thread',
    dataIndex: 'Thread',
    width: 100,
  },
  {
    title: 'Additional Fields',
    dataIndex: 'Additional',
    width: 100,
  },
  {
    title: 'Vendor Name',
    dataIndex: 'vendorName',
    width: 100,
  },
  {
    title: 'Vendor Code',
    dataIndex: 'vendorCode',
    width: 100,
  },
  {
    title: 'Factory Drawing',
    dataIndex: 'Factory',
    width: 200,
    render: renderImgList
  },
  {
    title: 'Jerhel Drawing',
    dataIndex: 'closedItem',
    width: 200,
    render: renderImgList
  },
];
