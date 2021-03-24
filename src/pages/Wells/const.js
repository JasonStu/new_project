import { Row } from 'antd';
import Open1 from '@/assets/open1.png';
import { isArray } from 'lodash';
import moment from 'moment';
const USA_FORMAT = 'MM-DD-YYYY'

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
    dataIndex: 'create_time',
    width: 100,
    render: (i) => moment(i).format(USA_FORMAT)
  },
  {
    title: 'Well ID',
    dataIndex: 'well_id',
    width: 100,
  },
  {
    title: 'Well #',
    dataIndex: 'well',
    width: 100,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    width: 100,
  },
  {
    title: 'Shape',
    dataIndex: 'shape',
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
    title: 'Corner radius',
    dataIndex: 'corner_radius',
    width: 100,
  },
];
