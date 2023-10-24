/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
import TableBase from '@/components/Table';
import type { IIntentRecord } from '@/models/intent';
import { IColumn } from '@/utils/interfaces';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Popconfirm } from 'antd';
import React from 'react';
import { useModel, history } from 'umi';
import FormIntent from './FormIntent';

const Index = () => {
  const intentModel = useModel('intent');

  const handleEdit = (record: IIntentRecord) => {
    intentModel.setVisibleForm(true);
    intentModel.setEdit(true);
    intentModel.setRecord(record);
  };

  const handleDel = async (record: IIntentRecord) => {
    await intentModel.del(record?.id ?? '').then(() => {
      intentModel.getData();
    });
  };

  const renderLast = (value: any, record: IIntentRecord) => (
    <React.Fragment>
      <Button
        type="primary"
        shape="circle"
        icon={<EyeOutlined />}
        title="Xem chi tiết"
        onClick={() => {
          console.log(record, 'record');
          intentModel.setRecord(record);
          history.push(`/intent/${record.id}`);
        }}
      />
      <Divider type="vertical" />
      <Button
        type="primary"
        shape="circle"
        icon={<EditOutlined />}
        title="Chỉnh sửa"
        onClick={() => {
          console.log(record, 'record');
          handleEdit(record);
        }}
      />
      <Divider type="vertical" />
      <Popconfirm
        title="Bạn có muốn xóa?"
        okText="Có"
        cancelText="Không"
        onConfirm={() => handleDel(record)}
      >
        <Button type="danger" shape="circle" icon={<DeleteOutlined />} title="Xóa" />
      </Popconfirm>
    </React.Fragment>
  );
  const columns: IColumn<IIntentRecord>[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 80,
      align: 'center',
    },
    // {
    //   title: 'Mã chủ đề',
    //   dataIndex: 'intent_name',
    //   notRegex: true,
    //   width: 200,
    //   align: 'left',
    //   // render: (value: any, record: IIntentRecord) => (
    //   //   <img src={record.avatar} alt={record.name} style={{ width: 100, height: 100 }} />
    //   // ),
    // },
    {
      title: 'Tên chủ đề',
      dataIndex: 'intent_detail',
      search: 'search',
      notRegex: true,
      width: 200,
      align: 'left',
    },
    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'status',
    //   render: (value: any, record: IIntentRecord) => (
    //     <span>{record.status === true ? 'Hoạt động' : 'Không hoạt động'}</span>
    //   ),
    //   search: 'search',
    //   notRegex: true,
    //   width: 200,
    //   align: 'center',
    // },
    {
      title: 'Thao tác',
      align: 'center',
      render: (value: any, record: IIntentRecord) => renderLast(value, record),
      fixed: 'right',
      width: 200,
    },
  ];

  return (
    <>
      <TableBase
        modelName={'intent'}
        title="Danh sách chủ đề"
        columns={columns}
        hascreate={true}
        formType={'Modal'}
        dependencies={[intentModel.page, intentModel.limit, intentModel.condition]}
        widthDrawer={800}
        getData={intentModel.getData}
        Form={FormIntent}
        noCleanUp={true}
        params={{
          page: intentModel.page,
          size: intentModel.limit,
          condition: intentModel.condition,
        }}
        maskCloseableForm={true}
        otherProps={{
          scroll: {
            x: 1000,
          },
        }}
      />
    </>
  );
};

export default Index;
