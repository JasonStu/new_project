import React, { useState, useRef, useEffect } from 'react';

import CustomPtoTable from '@/components/CustomProTable';
import EditModal from './editModal';
import { default_columns, default_dataSource } from './const';
import { uniqueId } from 'lodash';
import { getWellList, createWells, updateWells, getWellsDetail, exportExcel } from "@/services/well";
import { message } from 'antd';
import moment from 'moment';

const WellsList = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState(
    []
  );
  const [rowCount, setRowCount] = useState({
    count: 0,
    page: 1
  });
  const [wellID, setWellID] = useState('');
  const [initialValues, setInitialValues] = useState({});
  const [type, setType] = useState('Add');
  const actionRef = useRef();

  const fetchData = async (params) => {
    try {
      const { data } = await getWellList(params)
      setDataSource(data.rows)
      setRowCount({ count: data.count, page: data.page })

    } catch (error) {
      message.error(error)
      console.log('error', error);
    }

  }

  useEffect(() => {
    fetchData({
      page: 1,
      limit: 10,
      well_id: wellID
    })
  }, [])


  const columns = [
    ...default_columns,
    {
      title: 'Operation',
      dataIndex: 'operation',
      fixed: 'right',
      width: 100,
      render: (text, record) => <a onClick={() => {
        setType('Edit');
        setInitialValues(record);
        setVisible(true);
      }}>Edit</a>,
    },
  ];

  const onSubmit = async (value) => {
    if (type === 'Edit') {
      delete value.create_time
      delete value.update_time
      console.log('value===>', value);
      const data = await updateWells(value)
      if (data.code) {
        await fetchData({
          page: 1,
          limit: 10,
          well_id: wellID
        })
        setVisible(false);
      } else {
        message.error(data.msg)
      }
    } else {

      const data = await createWells(value)
      if (data.code) {
        await fetchData({
          page: 1,
          limit: 10,
          well_id: wellID
        })
        setVisible(false);
      } else {
        message.error(data.msg)
      }

    }

  };

  return (
    <>
      <CustomPtoTable
        dataSource={dataSource}
        columns={columns}
        selfOptions={{
          title: 'Wells list',
          searchLabel: 'Well ID',
          onAdd: () => {
            setType('Add');
            setVisible(true);
            setInitialValues({});
          },
          onExport: async () => {
            const data = await exportExcel()
            let url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.ms-excel' })) //处理文档流
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.download = `${moment().format('YYYYMMDDHHMMSS')}_Well`
            document.body.appendChild(link)
            link.click()
          },
          onSearch: (value) => {
            setWellID(value)
            fetchData({
              page: 1,
              limit: 10,
              well_id: value
            })
          },
          pagination: {
            total: rowCount.count,
            current: rowCount.page,
            onChange: (page) => {
              fetchData({
                page: page,
                limit: 10,
                well_id: wellID
              })
              console.log('next', page);
            }
          }
        }}
        actionRef={actionRef}
      />

      <EditModal
        actionRef={actionRef}
        visible={visible}
        setVisible={setVisible}
        onSubmit={onSubmit}
        initialValues={initialValues}
        type={type}
      />
    </>
  );
};

export default WellsList;
