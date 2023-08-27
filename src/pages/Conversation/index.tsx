import { Icon } from '@/components';
import { NAME_SPACE } from '@/components/constant';
import { useModel } from '@umijs/max';
import { Input } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Contacts } from './components/Contacts';
import { MessagesList } from './components/MessagesList';
import { TalkComponent } from './components/TalkComponent';
import { MENU_LIST, MENU_VALUE } from './constants';
import styles from './index.less';
import type { ConversationList, MenuList } from './type';
const { TextArea } = Input;

// CONNECTING：值为0，表示正在连接；
// OPEN：值为1，表示连接成功，可以通信了；
// CLOSING：值为2，表示连接正在关闭；
// CLOSED：值为3，表示连接已经关闭，或者打开连接失败。

// 会话页面
const Conversation: React.FC = () => {
  const preClass = `${NAME_SPACE}-conversation`;
  const [currentMenu, setCurrentMenu] = useState<MenuList>('friendMenu');
  const { userInfo } = useModel('useUserInfo');
  // 当前正在聊天联系人
  const [currentFriend, setCurrentFriend] = useState<ConversationList>();
  const wsRef = useRef<WebSocket>();
  const timerRef = useRef<any>();
  // 左侧消息列表
  const [firendMessagesList, setFirendMessagesList] = useState<
    ConversationList[]
  >([]);

  const [wsData, setWsData] = useState({});

  const getState = () => {
    timerRef.current = setInterval(() => {
      if (wsRef.current?.readyState === 1) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        wsRef.current.onmessage = (msg) => {
          setWsData(JSON.parse(msg.data));
        };
        // wsRef.current.send('nihao ');
      }
    }, 200);
  };

  // 开启WebSocket
  useEffect(() => {
    const ws = new WebSocket(`ws://192.168.199.135:9704/ws?u=${userInfo?.id}`);
    ws.onopen;
    getState();

    wsRef.current = ws;
    return () => {
      ws.onclose;
    };
  }, []);

  // 左侧导航
  const menuRender = useMemo(() => {
    return (
      <div className={styles[`${preClass}-menu`]}>
        <span className={styles[`${preClass}-menu-title`]}>
          <Icon
            type="icon-qvbilam-videozhifeiji"
            style={{ marginRight: '10px' }}
          />
          消息中心
        </span>
        {MENU_LIST.map((_menu) => {
          return (
            <span
              key={_menu.key}
              className={
                styles[
                  currentMenu === _menu.key
                    ? `${preClass}-menu-active`
                    : `${preClass}-menu-tab`
                ]
              }
              onClick={() => setCurrentMenu(_menu.key as MenuList)}
            >
              <Icon type={_menu.icon} style={{ marginRight: '10px' }} />
              {_menu.label}
            </span>
          );
        })}
      </div>
    );
  }, [wsData, currentMenu]);

  // 消息列表
  const sendMessages = useMemo(() => {
    return (
      <div className={styles[`${preClass}-warp-content-content`]}>
        <MessagesList
          friendsList={firendMessagesList}
          onFriendsChange={setFirendMessagesList}
          wsData={wsData}
          currentFriend={currentFriend}
          setCurrentFriend={setCurrentFriend}
        />
        {currentFriend ? (
          <TalkComponent
            wsData={wsData}
            currentFriend={currentFriend}
            userInfo={userInfo}
            friendsList={firendMessagesList}
            onFriendsChange={setFirendMessagesList}
          />
        ) : null}
      </div>
    );
  }, [currentFriend, wsData, firendMessagesList]);
  console.log(currentFriend, 'currentFriend');
  return (
    <div className={styles[preClass]}>
      <div className={styles[`${preClass}-warp`]}>
        {menuRender}
        <div className={styles[`${preClass}-warp-content`]}>
          <div className={styles[`${preClass}-warp-content-title`]}>
            {MENU_VALUE[currentMenu]}
          </div>
          {currentMenu === 'friendMenu' ? (
            <Contacts
              setCurrentMenu={setCurrentMenu}
              setCurrentFriend={() => setCurrentFriend(undefined)}
            />
          ) : currentMenu === 'messageMenu' ? (
            sendMessages
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default Conversation;
