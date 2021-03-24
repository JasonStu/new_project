import { Row } from 'antd';
import Open1 from '@/assets/open1.png';
import { isArray } from 'lodash';
import moment from 'moment';
const USA_FORMAT = 'MM-DD-YYYY'

const renderImgList = (text, record, index) => {
  // console.log('text',text);
  if (isArray(text) && text.length) {
    return (
      <Row key={index}>
        {text.map((item) => (
          <img
            style={{ width: 46, height: 46, marginLeft: 10 }}
            src={item.url || ''}
            key={item.url}
          />
        ))}
      </Row>
    );
  }
  return <div />;
};

export const default_dataSource = (key) => ({
  key,
  id: 84 + key,
  date: '1975-03-29',
  itemID: 'JI-12345',
  Category: 'Mirror Holder',
  Line: 'Hinged Jars & Pots',
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
    dataIndex: 'create_time',
    width: 100,
    render: (i) => moment(i).format(USA_FORMAT)

  },
  {
    title: 'Item ID',
    dataIndex: 'item_id',
    width: 100,
  },
  {
    title: 'Product Photo Open',
    dataIndex: 'items_open_image',
    width: 200,
    render: renderImgList
  },
  {
    title: 'Product Photo Closed',
    dataIndex: 'items_closed_image',
    width: 200,
    render: renderImgList
  },
  {
    title: 'Category',
    dataIndex: 'category',
    width: 150,
  },
  {
    title: 'Line',
    dataIndex: 'line',
    width: 200,
  },
  {
    title: 'ECO',
    dataIndex: 'eco_friendly',
    width: 100,
    render: (i) => <div>{i ? 'YES' : 'NO'}</div>

  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 100,
  },

  {
    title: 'Shape',
    dataIndex: 'shape',
    width: 100,
  },
  {
    title: 'Length',
    dataIndex: 'length',
    width: 100,
  },
  {
    title: 'Width',
    dataIndex: 'width',
    width: 100,
  },
  {
    title: 'Height',
    dataIndex: 'height',
    width: 100,
  },
  {
    title: 'Diameter',
    dataIndex: 'diameter',
    width: 100,
  },
  {
    title: 'Pan Well',
    dataIndex: 'pan_well',
    width: 100,
  },
  {
    title: 'Pan Depth',
    dataIndex: 'pan_depth',
    width: 100,
  },
  {
    title: 'Cup Size',
    dataIndex: 'cup_size',
    width: 100,
  },
  {
    title: 'Caliber',
    dataIndex: 'caliber',
    width: 100,
  },
  {
    title: '# of wells',
    dataIndex: 'of_wells',
    width: 100,
  },
  {
    title: 'Dosage',
    dataIndex: 'dosage',
    width: 100,
  },
  {
    title: 'Capacity',
    dataIndex: 'capacity',
    width: 100,
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    width: 100,
  },
  {
    title: 'Thread',
    dataIndex: 'thread',
    width: 100,
  },

  {
    title: 'Vendor Name',
    dataIndex: 'vendor_name',
    width: 100,
  },
  {
    title: 'Vendor Code',
    dataIndex: 'vendor_code',
    width: 100,
  },
  {
    title: 'Factory Drawing',
    dataIndex: 'items_factory_image',
    width: 200,
    render: renderImgList
  },
  {
    title: 'Jerhel Drawing',
    dataIndex: 'items_jerhel_image',
    width: 200,
    render: renderImgList
  },
];
