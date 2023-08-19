import { NAME_SPACE } from '@/components/constant';
import { Avatar, Button, List, Menu } from 'antd';

import type { MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';

import { createConversation, getFriend, getMyGroup } from '@/services/contact';
import Styles from '../../index.less';
import { MenuList } from '../../type';
import { Friend, Group } from './contacts';
type MenuItem = Required<MenuProps>['items'][number];

interface Props {
  setCurrentMenu: (value: MenuList) => void;
  setCurrentFriend: () => void;
}

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps['items'] = [
  getItem('好友', 'frd', null, [getItem('好友列表', 'friends')], 'group'),
  getItem('群', 'grp', null, [getItem('群组列表', 'groups')], 'group'),
];
const Contacts: React.FC<Props> = ({ setCurrentMenu, setCurrentFriend }) => {
  const preClass = `${NAME_SPACE}-conversation-warp-content-content`;
  const [currentKey, setCurrentKey] = useState<'friends' | 'groups'>('friends');
  const [friendsList, setFriendsList] = useState<Friend[]>([]);
  const [groupsList, setGroupsList] = useState<Group[]>([]);
  const [initLoading, setInitLoading] = useState<boolean>(false);

  const getFriends = async () => {
    const res = await getFriend();
    setInitLoading(false);
    if (res?.data?.list) {
      setFriendsList(res.data.list);
    }
    console.log(res, '好友');
  };

  const getGroups = async () => {
    const res = await getMyGroup();
    // setInitLoading(false);
    if (res?.data?.list) {
      setGroupsList(res.data.list);
    }
    console.log(res, '群聊');
  };

  useEffect(() => {
    setInitLoading(true);
    getFriends();
    getGroups();
    // if (currentKey === 'friends') {
    //   getFriends();
    // } else {
    //   getGroups();
    // }
  }, []);

  const sendMessage = async (item: Friend | Group, type: 'user' | 'group') => {
    console.log(item, 'item');
    const res = await createConversation({
      object_id:
        type === 'user' ? (item as Friend).user_id : (item as Group).id,
      type,
    });
    if (res.success) {
      setCurrentFriend();
      setCurrentMenu('messageMenu');
    }
  };

  const friendsRender = (item: Friend) => {
    return (
      <List.Item
        actions={[
          <Button
            key="list-loadmore-send"
            type="link"
            onClick={() => sendMessage(item, 'user')}
          >
            发送消息
          </Button>,
          <a key="list-loadmore-more">more</a>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={item.user.avatar} />}
          title={item.remark}
          // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    );
  };

  const groupsRender = (item: Group) => {
    return (
      <List.Item
        actions={[
          <Button
            key="list-loadmore-send"
            type="link"
            onClick={() => sendMessage(item, 'group')}
          >
            发送消息
          </Button>,
          <a key="list-loadmore-more">more</a>,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={item.member.id} />}
          title={item.member.remark || item.name}
          description={item.name}
        />
      </List.Item>
    );
  };

  return (
    <div className={Styles[preClass]}>
      <Menu
        onClick={(e) => setCurrentKey(e.keyPath[0] as 'friends' | 'groups')}
        style={{ width: 250 }}
        defaultSelectedKeys={[currentKey]}
        mode="inline"
        items={items}
      />
      <List
        style={{
          width: '100%',
          background: '#fff',
          padding: '20px',
        }}
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={
          currentKey === 'friends' ? (friendsList as any) : (groupsList as any)
        }
        renderItem={(item) =>
          currentKey === 'friends'
            ? friendsRender(item as Friend)
            : groupsRender(item as Group)
        }
      />

      {
        // currentKey === 'friends' ? friendsRender : groupsRender
      }
    </div>
  );
};

export { Contacts };
