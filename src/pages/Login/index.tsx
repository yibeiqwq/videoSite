import { Login as LoginApi, Register } from '@/services/login';
import { Button, Col, Form, Input, Modal, Row, Tabs } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useModel } from 'umi';
import { LoginMethod } from './interface';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const TAB_TYPE = {
  login: '登录',
  register: '注册',
};

type Tab = 'login' | 'register';

const Login: React.FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
  const [method, setMethod] = useState<LoginMethod>('mobile');
  const [tab, setTab] = useState<Tab>('login');
  const { setUserInfo } = useModel('useUserInfo');
  const [form] = Form.useForm();

  useEffect(() => {
    if (method === 'mobile') {
      form.setFieldValue('mobile', '13501294164');
      form.setFieldValue('password', '123456');
    }
  }, [method]);

  // 注册/登录按钮
  const onFinish = useCallback(
    async (values: any) => {
      if (tab === 'register') {
        const res = await Register(values);
        if (res && res.status === 204) {
          setTab('login');
        }
      } else {
        const res = await LoginApi({ ...values, method });
        if (res && res.data) {
          setUserInfo(res.data);
          setIsModalOpen(false);
          history.go();
        }
      }
    },
    [method, tab],
  );

  // 登录
  const RenderLogin = () => (
    <>
      <Form.Item
        label="手机号"
        name="mobile"
        rules={[
          { required: true, message: '请输入手机号!' },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '请输入正确的手机号!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6 }}>
        <Row gutter={8}>
          <Col span={12}>
            <Button type="text" onClick={() => setMethod('username')}>
              账户登录
            </Button>
          </Col>
          <Col span={12}>
            <Button type="text" onClick={() => setMethod('email')}>
              邮箱登录
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </>
  );

  // 注册
  const RenderRegister = () => (
    <>
      <Form.Item
        label="手机号"
        name="mobile"
        rules={[
          { required: true, message: '请输入手机号!' },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '请输入正确的手机号!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password />
      </Form.Item>
    </>
  );

  return (
    <Modal
      title={TAB_TYPE[tab]}
      footer={null}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
    >
      <Tabs
        activeKey={tab}
        onChange={(activeKey) => setTab(activeKey as Tab)}
        centered
        items={['login', 'register'].map((_item, i) => {
          return {
            label: TAB_TYPE[_item as Tab],
            key: _item,
            children: (
              <Form
                form={form}
                name={_item}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
              >
                {_item === 'login' ? <RenderLogin /> : <RenderRegister />}
                <Form.Item wrapperCol={{ offset: 10, span: 14 }}>
                  <Button type="primary" htmlType="submit">
                    {TAB_TYPE[_item as Tab]}
                  </Button>
                </Form.Item>
              </Form>
            ),
          };
        })}
      />
    </Modal>
  );
};

export { Login };
