import { Row } from 'antd';
import Open1 from '@/assets/open1.png';
import moment from 'moment';
import { isArray } from 'lodash';
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
    title: 'Item Name',
    dataIndex: 'item_name',
    width: 150,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 100,
  },

  {
    title: 'Price Per Piece',
    dataIndex: 'price_per_piece',
    width: 200,
  },
  {
    title: 'Pieces Per Box',
    dataIndex: 'pieces_per_box',
    width: 200,
  },
  {
    title: 'Total Price',
    dataIndex: 'total_price',
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
    title: 'Weight',
    dataIndex: 'weight',
    width: 100,
  },
  {
    title: 'Number of boxes in stock',
    dataIndex: 'number_of_boxes_in_stock',
    width: 100,
  },
  {
    title: 'Discontinued',
    dataIndex: 'discontinued',
    width: 100,
  },
   
 
];
