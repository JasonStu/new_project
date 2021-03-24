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
    dataIndex: 'create_time',
    width: 100,
  },
  {
    title: 'Location ID',
    dataIndex: 'location_id',
    width: 100,
  },
  {
    title: 'Company Name',
    dataIndex: 'company_name',
    width: 100,
  },
  {
    title: 'Contact #1',
    dataIndex: 'contact_1',
    width: 100,
  },
  {
    title: 'Contact #2',
    dataIndex: 'contact_2',
    width: 100,
  },
  {
    title: 'Address',
    width: 100,
    render: (text, record) => {
      const { address_country, address_province, address_city, address_district, address_postal_code, address_reciever_name, address_reciever_phone } = record;

 
      return (
        `## ${address_district}
        ${address_city},${address_province},${address_postal_code}
        ${address_country}
        `
      );
    },
  },
  {
    title: 'Courier Info',
    dataIndex: 'courier_info',
    width: 100,
  },
  {
    title: 'Courier Account #',
    dataIndex: 'courier_account',
    width: 100,
  },
  {
    title: 'Notes',
    dataIndex: 'notes',
    width: 100,
  },
];
