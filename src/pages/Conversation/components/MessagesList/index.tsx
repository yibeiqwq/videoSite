import { NAME_SPACE } from '@/components/constant';
import { getConversation } from '@/services/contact';
import { Avatar, Badge } from 'antd';
import React, { useEffect } from 'react';
import type { ConversationList } from '../../type';
import Styles from './index.less';

interface Props {
  friendsList: ConversationList[];
  onFriendsChange: (list: ConversationList[]) => void;
  wsData?: any;
  currentFriend?: ConversationList;
  setCurrentFriend: (info: ConversationList) => void;
}

const MessagesList: React.FC<Props> = ({
  friendsList,
  onFriendsChange,
  wsData,
  currentFriend,
  setCurrentFriend,
}) => {
  // 获取好友列表
  const getUserList = async () => {
    const res = await getConversation();
    console.log(res, '获取好友列表');
    if (res.data?.list) {
      onFriendsChange(res.data.list);
      if (!currentFriend) {
        setCurrentFriend(res.data.list[0]);
      }
    }
  };

  useEffect(() => {
    getUserList();
    console.log(wsData, '收信息');
  }, [wsData, currentFriend]);

  return (
    <div className={Styles[`${NAME_SPACE}-friends-list`]}>
      {friendsList.map((_friend) => {
        const isActive =
          _friend.object.id === currentFriend?.object.id &&
          _friend.object_type === currentFriend.object_type;
        return (
          <div
            className={Styles[`${NAME_SPACE}-friends-list-item`]}
            onClick={() => setCurrentFriend(_friend)}
            key={`${_friend.object_type}_${_friend.object_id}`}
          >
            <Avatar size="large" src={_friend.object.avatar} />
            <div className={Styles[`${NAME_SPACE}-friends-list-item-name`]}>
              <span
                className={
                  isActive
                    ? Styles[`${NAME_SPACE}-friends-list-item-acitve`]
                    : ''
                }
              >
                {_friend.object.remark || _friend.object.name}
              </span>
              <span
                className={Styles[`${NAME_SPACE}-friends-list-item-name-meg`]}
              >
                <span
                  className={
                    Styles[`${NAME_SPACE}-friends-list-item-name-meg-text`]
                  }
                >
                  {_friend.tips !== '' ? (
                    <span style={{ color: 'red' }}>[{_friend.tips}] </span>
                  ) : null}
                  {_friend.last_message}
                </span>
                <Badge
                  style={{
                    backgroundColor: _friend.object.is_dnd ? '#ccc' : 'red',
                    border: 'none',
                  }}
                  count={_friend.news_count > 0 ? _friend.news_count : 0}
                  overflowCount={99}
                />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { MessagesList };
