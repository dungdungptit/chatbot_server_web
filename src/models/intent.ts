import { data } from '@/utils/data';
import { avatar } from '@/assets/logo.png';
import { message } from 'antd';
// import Service from '@/pages/QuanLyNguoiDung/service';
import { ActionType } from '@ant-design/pro-table';
import { useRef, useState } from 'react';
import intent from '@/services/Intent/intent';
// import baseModel from './baseModel';

export interface IIntentRecord {
  id: string;
  intent_name: string;
  intent_detail: number;
}

export default () => {
  const [danhSach, setDanhSach] = useState<IIntentRecord[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<IIntentRecord | {}>({});
  const [visibleForm, setVisibleForm] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filterInfo, setFilterInfo] = useState<any>({});
  const [condition, setCondition] = useState<any>({});
  const [visible, setVisible] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      console.log(page, limit, condition);
      const res = await intent.get({
        page,
        size: limit,
        ...condition,
      });
      console.log(res);
      if (res.status === 200) {
        setDanhSach(res.data?.results);
        setTotal(res.data?.total_element);
      }
    } catch (error) {
      setDanhSach([]);
      setTotal(0);
      message.error('Lỗi thực hiện');
    } finally {
      setLoading(false);
    }
  };

  const getDataById = async (id: string) => {
    try {
      setLoading(true);
      const res = await intent.get_by_id(id);
      console.log(res);
      if (res.status === 200) {
        setRecord(res.data);
      }
    } catch (error) {
      setRecord({});
      message.error('Lỗi thực hiện');
    } finally {
      setLoading(false);
    }
  };

  const add = async (data: any) => {
    try {
      setLoading(true);
      const res = await intent.add(data);
      console.log(res);
      if (res.status === 200) {
        message.success('Thêm mới thành công');
        setVisibleForm(false);
        getData();
      }
    } catch (error) {
      message.error('Lỗi thực hiện');
    } finally {
      setLoading(false);
    }
  };

  const upd = async (data: any) => {
    try {
      setLoading(true);
      const res = await intent.upd(data);
      if (res.status === 200) {
        message.success('Cập nhật thành công');
        setVisibleForm(false);
        getData();
      }
    } catch (error) {
      message.error('Lỗi thực hiện');
    } finally {
      setLoading(false);
    }
  };

  const del = async (id: string) => {
    try {
      setLoading(true);
      const res = await intent.del(id);
      if (res.status === 200) {
        message.success('Xóa thành công');
        getData();
      }
    } catch (error) {
      message.error('Lỗi thực hiện');
    } finally {
      setLoading(false);
    }
  };

  return {
    intent,

    condition,
    danhSach,
    edit,
    filterInfo,
    loading,
    limit,
    total,
    page,
    record,
    visible,
    visibleForm,
    showDrawer,

    setCondition,
    setDanhSach,
    setEdit,
    setFilterInfo,
    setLimit,
    setTotal,
    setPage,
    setRecord,
    setVisible,
    setVisibleForm,
    setShowDrawer,

    getDataById,

    getData,
    add,
    upd,
    del,

  };
};
