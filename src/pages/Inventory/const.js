import { Row } from 'antd';
import Open1 from '@/assets/open1.png';
import { isArray } from 'lodash';

export const default_dataSource = (key) => ({
  key,
  id: 84 + key,
  date: '1975-03-29',
  itemID: 'JI-12345',
  imgOpenList: [
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
  imgCloseList: [
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
  shape: 'Rectangle',
  desc:
    '24/410 PET boston round bottle with 100mL capacity. 24/410 PET boston round bottle with 100mL capaci',
  vendorName: '24/410 PET boston round bottle with 100mL capacity',
  vendorCode: 'DF12345678',
  price: '123',
  stock: '123',
  Dimension: 'info',
  category: 'Jars and Pots'
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
    title: 'Item ID',
    dataIndex: 'itemID',
    width: 100,
  },
  {
    title: 'Product Photo Open',
    dataIndex: 'imgOpenList',
    width: 200,
    render: (text, record, index) => {
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
    },
  },
  {
    title: 'Product Photo Closed',
    dataIndex: 'imgCloseList',
    width: 200,
    render: (text, record, index) => {
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
    },
  },
  {
    title: 'Shape',
    dataIndex: 'shape',
    width: 100,
  },
  {
    title: 'Description',
    dataIndex: 'desc',
    width: 200,
  },
  {
    title: 'Vendor Name',
    dataIndex: 'vendorName',
    width: 200,
  },
  {
    title: 'Vendor Code',
    dataIndex: 'vendorCode',
    width: 150,
  },
];
