import { Row } from 'antd';
import Open1 from '@/assets/open1.png';
import { isArray } from 'lodash';

export const default_dataSource = (key) => ({
  key,
  id: 84 + key,
  date: '1975-03-29',
  PanID: 'JI-12345',
  Shape: 'Rectangle',
  Height: '10',
  Diameter: '10',
  Length: '10',
  Width: '10',
  Radius: '30',
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
    title: 'Pan ID',
    dataIndex: 'PanID',
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
    title: 'Radius',
    dataIndex: 'Radius',
    width: 100,
  },
];
