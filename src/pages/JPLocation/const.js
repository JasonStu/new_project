import { Row } from 'antd';
import Open1 from '@/assets/open1.png';
import { isArray } from 'lodash';

export const default_dataSource = (key) => ({
  key,
  id: 84 + key,
  date: '1975-03-29',
  LocationId: 'JI-12345',
  CompanyName: 'company name',
  Contact: '233',
  Contact2: '233',
  Address: '10',
  Country: 'Chinese',
  Province: 'beijing',
  City: 'beijing',
  District: 'strict',
  Postalcode: '50000',
  RecieverName: 'name',
  RecieverPhone: '1300000',
  CourierInfo: 'info',
  CourierAccount: '123',
  Notes: 'Notes',
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
    title: 'Location ID',
    dataIndex: 'LocationId',
    width: 100,
  },
  {
    title: 'Company Name',
    dataIndex: 'CompanyName',
    width: 100,
  },
  {
    title: 'Contact #1',
    dataIndex: 'Contact',
    width: 100,
  },
  {
    title: 'Contact #2',
    dataIndex: 'Contact2',
    width: 100,
  },
  {
    title: 'Address',
    dataIndex: 'Address',
    width: 100,
    render: (text, record) => {
      const { Country, Province, City, District, Postalcode, RecieverName, RecieverPhone } = record;
      return (
        `## ${District}
        ${City},${Province},${Postalcode}
        ${Country}
        `
      );
    },
  },
  {
    title: 'Courier Info',
    dataIndex: 'CourierInfo',
    width: 100,
  },
  {
    title: 'Courier Account #',
    dataIndex: 'CourierAccount',
    width: 100,
  },
  {
    title: 'Notes',
    dataIndex: 'Notes',
    width: 100,
  },
];
