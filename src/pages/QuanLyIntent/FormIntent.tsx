/* eslint-disable no-underscore-dangle */
import { IIntentRecord } from '@/models/intent';
import { ip } from '@/utils/ip';
import rules from '@/utils/rules';
import {
  Form,
  Input,
  Button,
  Card,
  Spin,
  DatePicker,
  Tabs,
  InputNumber,
  Col,
  Row,
  Select,
  Divider,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const { TabPane } = Tabs;

const FormIntent = () => {
  const [form] = Form.useForm();
  const [status, setStatus] = useState<boolean>(false);
  const intentModel = useModel('intent');
  const questionModel = useModel('question');

  const handleFinish = async (values: IIntentRecord) => {
    if (intentModel.edit) {
      if (intentModel?.record?.id) {
        const data = document.getElementById('formIntent') as HTMLFormElement;
        const formData = new FormData(data);
        formData.append('intent_id', intentModel?.record?.id ?? '');
        formData.append('intent_name', values.intent_detail);
        await intentModel.upd({ id: intentModel?.record?.id, data: formData });
        // await intentModel.upd({
        //   ...intentModel?.record,
        //   ...values,
        //   id: intentModel?.record?.id,
        // });
        intentModel.setVisibleForm(false);
        intentModel.setEdit(false);
        intentModel.getData();
        intentModel.getDataById(intentModel?.record?.id ?? '');
      } else {
        const data = document.getElementById('formIntent') as HTMLFormElement;
        const formData = new FormData(data);
        formData.append('intent_name', values.intent_detail);
        await intentModel.add(formData);
      }
    } else {
      const data = document.getElementById('formIntent') as HTMLFormElement;
      const formData = new FormData(data);
      formData.append('intent_name', values.intent_detail);
      await intentModel.add(formData);
      intentModel.setVisibleForm(false);
      intentModel.setEdit(false);
    }
  };

  const handleFinishFile = async (values: any) => {
    const data = document.getElementById('formQuestionFile') as HTMLFormElement;
    const formData = new FormData(data);
    // formData.append('intent_id', IntentId);
    await questionModel.addFile(formData);
    intentModel.setVisibleForm(false);
    intentModel.setEdit(false);
    intentModel.getData();
  };
  console.log(form.getFieldsValue(), 'form.getFieldValue()');
  return (
    <Spin spinning={intentModel.loading}>
      {intentModel.edit ? (
        <Card title={'Chỉnh sửa'}>
          <Form
            id="formIntent"
            {...layout}
            form={form}
            onFinish={handleFinish}
            initialValues={{
              ...(intentModel?.record ?? {}),
            }}
          >
            {/* <Form.Item label="Mã chủ đề" name="intent_name">
            <Input placeholder="Mã chủ đề" name="intent_name" />
          </Form.Item> */}
            <Form.Item label="Tên chủ đề" name="intent_detail">
              <Input placeholder="Tên chủ đề" name="intent_detail" />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                {intentModel.edit ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      ) : (
        <Card title="Thêm mới">
          <Tabs>
            <TabPane tab="Nhập dữ liệu" key="tab-a">
              <Form
                id="formIntent"
                {...layout}
                form={form}
                onFinish={handleFinish}
                initialValues={{
                  ...(intentModel?.record ?? {}),
                }}
              >
                {/* <Form.Item label="Mã chủ đề" name="intent_name">
                <Input placeholder="Mã chủ đề" name="intent_name" />
              </Form.Item> */}
                <Form.Item label="Tên chủ đề" name="intent_detail">
                  <Input placeholder="Tên chủ đề" name="intent_detail" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    {'Thêm mới'}
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Nhập bằng file" key="tab-b">
              <Form {...layout} form={form} onFinish={handleFinishFile} id="formQuestionFile">
                <Form.Item label="File" name="file">
                  <Input type="file" name="file" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit">
                    Thêm mới
                  </Button>
                </Form.Item>
              </Form>
              <Button type="primary">
                <a
                  download={'tep_tin_mau_chu_de.xlsx'}
                  href={`${ip}/media/format/question_post/tep_tin_mau_chu_de.xlsx`}
                >
                  Tải file mẫu
                </a>
              </Button>
              <br />
              <Card title="Mẫu file">
                <Row>
                  <Col span={12}>
                    <strong>Câu hỏi</strong>
                  </Col>
                  <Col span={12}>
                    <strong>Chủ đề</strong>
                  </Col>
                </Row>
                <Divider />
                <Row>
                  <Col span={12}>
                    <p>Câu hỏi thuộc chủ đề(có thể để trống)</p>
                  </Col>
                  <Col span={12}>
                    <p>Tên chủ đề</p>
                  </Col>
                </Row>
              </Card>
            </TabPane>
          </Tabs>
        </Card>
      )}
    </Spin>
  );
};

export default FormIntent;
