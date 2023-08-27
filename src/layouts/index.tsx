import { NAME_SPACE } from '@/components/constant';
import { Login } from '@/pages/Login';
import { searchAll } from '@/services/user';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Avatar, Button, ConfigProvider, Dropdown, Input, Select } from 'antd';
import 'antd/dist/antd.min.css';
import zhCN from 'antd/es/locale/zh_CN';
import React, { useState } from 'react';
import { history, Link, Outlet } from 'umi';
import './common.less';
import styles from './index.less';

const { Search } = Input;
const Layout: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useModel('useUserInfo');

  // 搜索内容
  const [searchKeyWord, setSearchKeyWord] = useState<string>('');
  const [options, setOptions] = useState([]);

  const onSearch = async (value: string) => {
    if (value) {
      const res = await searchAll({
        keyword: value,
      });
      if (res?.data?.list?.length) {
        setOptions(res.data.list);
      }
    } else {
      setOptions([]);
    }
  };

  const onSelect = (value: any, data: any) => {
    console.log(value, data, 'valuevaluevaluevalue');
    history.push(`/searchPage?keyWord=${data.label}`);
    // history.push({
    //   pathname: '/searchPage',
    //   query: {
    //     keyWord: data.label
    //   }
    // });
    // history.push(`/searchPage/${data.label}`);
    // history.push({
    //   pathname: '/searchPage',
    //   query: {
    //     akeyWord: data.label,
    //   },
    // });
  };

  const LoginRender = () => (
    <div className={styles[`${NAME_SPACE}-header-content-right-user-pop`]}>
      <div
        className={
          styles[`${NAME_SPACE}-header-content-right-user-pop-nologin`]
        }
      >
        <div
          className={
            styles[`${NAME_SPACE}-header-content-right-user-pop-nologin-top`]
          }
        ></div>
        <div
          className={
            styles[`${NAME_SPACE}-header-content-right-user-pop-nologin-bottom`]
          }
        >
          {!!userInfo ? (
            userInfo.nickname
          ) : (
            <Button type="link" onClick={() => setIsModalOpen(true)}>
              登录
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles[`${NAME_SPACE}-page-wrap`]}>
        <div className={styles[`${NAME_SPACE}-header`]}>
          <div className={styles[`${NAME_SPACE}-header-content`]}>
            <div
              className={styles[`${NAME_SPACE}-header-content-logo`]}
              onClick={() => {
                history.push('/home');
              }}
            >
              <HomeOutlined onClick={() => {}} />
              <span
                className={styles[`${NAME_SPACE}-header-content-logo-title`]}
              >
                首页
              </span>
            </div>
            {/* 搜索 */}
            {/* <Search placeholder="input search text" onSearch={onSearch} className={styles[`${NAME_SPACE}-header-content-search`]} /> */}
            <Select
              className={styles[`${NAME_SPACE}-header-content-search`]}
              showSearch
              value={searchKeyWord}
              // placeholder={props.placeholder}
              // style={props.style}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={onSearch}
              onChange={setSearchKeyWord}
              notFoundContent={null}
              onSelect={onSelect}
              options={(options || []).map((d: any) => ({
                value: d.id,
                label: d.nickname,
              }))}
            />
            <div className={styles[`${NAME_SPACE}-header-content-right`]}>
              {!!userInfo && (
                <Link
                  className={
                    styles[`${NAME_SPACE}-header-content-right-conversation`]
                  }
                  type="link"
                  to={'/conversation'}
                >
                  会话
                </Link>
              )}
              {/* 用户信息/登录 */}
              <div className={`${NAME_SPACE}-header-content-right-user`}>
                <Dropdown dropdownRender={() => <LoginRender />}>
                  <div
                    className={
                      styles[`${NAME_SPACE}-header-content-right-user-avatar`]
                    }
                  >
                    {userInfo ? (
                      <Avatar size="large" src={userInfo.avatar} />
                    ) : (
                      <Avatar size="large" icon={<UserOutlined />} />
                    )}
                  </div>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <div className={styles[`${NAME_SPACE}-content-warp`]}>
          <Outlet />
        </div>
        <div className={styles[`${NAME_SPACE}-footer`]}>
          qvbilam voideo ©2022 Created by yibei
        </div>
      </div>

      <Login isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </ConfigProvider>
  );
};

export default Layout;
