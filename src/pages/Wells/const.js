import { Row } from 'antd';
import Open1 from '@/assets/open1.png';
import { isArray } from 'lodash';

export const default_dataSource = (key) => ({
  key,
  id: 84 + key,
  date: '1975-03-29',
  WellId: 'JI-12345',
  'Well#': '233',
  Quantity: '233',
  Shape: 'Rectangle',
  Height: '10',
  Diameter: '10',
  Length: '10',
  Width: '10',
  Corner: '123',
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
    title: 'Well ID',
    dataIndex: 'WellId',
    width: 100,
  },
  {
    title: 'Well #',
    dataIndex: 'Well#',
    width: 100,
  },
  {
    title: 'Quantity',
    dataIndex: 'Quantity',
    width: 100,
  },
  {
    title: 'Shape',
    dataIndex: 'Shape',
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
    title: 'Corner radius',
    dataIndex: 'Corner',
    width: 100,
  },
];
