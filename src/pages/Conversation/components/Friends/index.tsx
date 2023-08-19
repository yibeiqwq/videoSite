import { NAME_SPACE } from '@/components/constant';
import { getFriend } from '@/services/contact';
import { Avatar } from 'antd';
import React, { useEffect, useState } from 'react';
import type { FriendType } from '../../type';
import Styles from './index.less';

interface Props {
  currentFriend?: FriendType;
  setCurrentFriend: (info: FriendType) => void;
}

const Friends: React.FC<Props> = ({ currentFriend, setCurrentFriend }) => {
  const [userList, setUserList] = useState<FriendType[]>([]);

  // 获取好友列表
  const getUserList = async () => {
    const res = await getFriend();
    console.log(res, '获取好友列表');
    if (res.data?.list) {
      setUserList(res.data.list);
      setCurrentFriend(res.data.list[0]);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <div className={Styles[`${NAME_SPACE}-friends-list`]}>
      {userList.map((_friend) => {
        return (
          <div
            className={Styles[`${NAME_SPACE}-friends-list-item`]}
            onClick={() => setCurrentFriend(_friend)}
          >
            <Avatar size="large" src={_friend.user.avatar} />
            <div className={Styles[`${NAME_SPACE}-friends-list-item-name`]}>
              <span
                className={
                  _friend.user_id === currentFriend?.user_id
                    ? Styles[`${NAME_SPACE}-friends-list-item-acitve`]
                    : ''
                }
              >
                {_friend.remark || _friend.user.nickname}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Friends };
