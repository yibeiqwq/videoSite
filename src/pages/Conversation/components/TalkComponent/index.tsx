import { UserInfo } from '@/common/type';
import { NAME_SPACE } from '@/components/constant';
import {
  getGroupMessages,
  getPrivateMessages,
  sendImgMessage,
  sendPrivatetxtMessage,
} from '@/services/message';
import {
  Avatar,
  Button,
  Image,
  List,
  message as messageTip,
  Popover,
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import VirtualList from 'rc-virtual-list';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ConversationList, PrivateMessages } from '../../type';
import Styles from './index.less';
// import { find } from "_@umijs_utils@4.0.49@@umijs/utils/compiled/lodash";
// @ts-ignore
import { sortBy } from 'lodash';
import moment from 'moment';
// @ts-ignore
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

// const uuid = require('uuid/v4');
import { Icon } from '@/components';
import { uuid } from 'uuidv4';
import { AliyunOSSUpload } from './AliyunOSSUpload';

const ContainerHeight = 500;

interface Props {
  friendsList: ConversationList[];
  onFriendsChange: (list: ConversationList[]) => void;
  wsData?: any;
  currentFriend: ConversationList;
  userInfo?: UserInfo;
  setCurrentFriend: (msg: ConversationList) => void;
  // onSendMessage: (msg: string) => void;
}

const TalkComponent: React.FC<Props> = ({
  friendsList,
  onFriendsChange,
  wsData,
  currentFriend,
  userInfo,
  setCurrentFriend,
  // onSendMessage
}) => {
  const [message, setMessage] = useState<string>('');
  const [messageList, setMessageList] = useState<PrivateMessages[]>([]);
  const [page, setPage] = useState<number>(1);
  const contentRef = useRef<any>();
  const heightRef = useRef<number>();
  const listRef = useRef<any>();
  const [emojiOpen, setEmojiOpen] = useState<boolean>(false);

  // 获取聊天记录
  const getMessages = async (
    page?: number,
    per_page?: number,
    keyword?: string,
    type?: string,
  ) => {
    const params = {
      id: currentFriend.object_id,
      page,
      per_page,
      keyword,
      type,
    };
    const res =
      currentFriend.object_type === 'user'
        ? await getPrivateMessages(params)
        : await getGroupMessages(params);

    if (!!res?.data?.list && !!res?.data?.list?.length) {
      res.data.list.forEach((_item: any) => {
        _item.content = JSON.parse(_item.content);
      });
      const list = sortBy(res.data.list, 'created_time');
      setMessageList(list);
    }
  };

  useEffect(() => {
    // 获取聊天窗口高度
    heightRef.current = contentRef.current.scrollHeight - 230;
  }, []);

  useEffect(() => {
    getMessages();
  }, [currentFriend]);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    // console.log(111111, e);
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      heightRef.current
    ) {
      // appendData();
    }
  };

  // push发送聊天消息
  const pushMessage = useCallback(
    (
      type: 'img' | 'txt',
      content: string,
      url?: string,
      user?: { id: number; nickname: string; avatar: string },
    ) => {
      const newList = [...messageList];

      newList.push({
        user_id: user?.id || userInfo!.id,
        uid: uuid(),
        type: type === 'img' ? 'ImageMsg' : 'TextMsg',
        content: {
          code: 0,
          type: type === 'img' ? 'ImageMsg' : 'TextMsg',
          content,
          url,
          user: {
            id: user?.id || userInfo!.id,
            name: user?.nickname || userInfo!.nickname,
            avatar: user?.avatar || userInfo!.avatar,
            extra: '',
          },
          extra: '',
        },
        created_time: moment().unix(),
        status: 'uploading',
      });
      setMessageList(newList);

      console.log(newList, 'newListnewListnewList');

      console.log(content, 'content');
      // 更新左侧消息列表
      if (currentFriend.object_type === 'user') {
        currentFriend.last_message = type === 'txt' ? content : '[图片]';
        currentFriend.tips = '';
        currentFriend.news_count = 0;
        currentFriend.last_message_time = moment().unix();
        // dayjs().valueOf();

        const newList = friendsList.filter(
          (_item: ConversationList) =>
            !(
              _item.object_id === currentFriend.object_id &&
              _item.object_type === currentFriend.object_type
            ),
        );
        newList.unshift(currentFriend);
        console.log(newList, 22222222222);
        onFriendsChange(newList);
      }
    },
    [messageList],
  );

  // 发送文本信息
  const onSendMessage = async () => {
    pushMessage('txt', message);
    if (!!userInfo?.id.toString) {
      const res = await sendPrivatetxtMessage({
        sendType: currentFriend.object_type,
        user_id: currentFriend?.object_id,
        content: message,
        header_id: userInfo?.id,
      });

      setMessageList((preList) => {
        preList[preList.length - 1].status = !!res.success
          ? 'success'
          : 'error';
        return preList;
      });
    } else {
      messageTip.error('请先登录');
    }
    setMessage('');
  };

  // 发送图片
  const sendImgsMessage = async (url: string) => {
    const params = {
      sendType: currentFriend.object_type,
      user_id: currentFriend.object_id,
      header_id: userInfo?.id!,
      content: `${url}?x-oss-process=image/resize,m_fill,h_100,w_200`,
      url,
    };
    const res = await sendImgMessage(params);
    setMessageList((preList) => {
      preList[preList.length - 1].status = !!res.success ? 'success' : 'error';
      return preList;
    });
  };

  // 选择上传图片
  const onImgChange = (v: any) => {
    if (v[0].status === 'done') {
      // 向列表中新增图片信息
      // @ts-ignore
      pushMessage('img', v[0]?.base64, v[0]?.base64);
      if (v[0]?.response?.data?.url) {
        sendImgsMessage(v[0].response.data.url);
      } else {
        setMessageList((preList) => {
          preList[preList.length - 1].status = 'error';
          return preList;
        });
      }
    }
  };

  useEffect(() => {
    // 如果收到新消息自动push
    console.log(wsData, 'ws');
    const type = wsData.type === 'private' ? 'user' : 'group';
    console.log(
      wsData.content,
      wsData.send_user_id === currentFriend.object_id,
      type === currentFriend.object_type,
    );
    if (
      wsData.content &&
      wsData.send_user_id === currentFriend.object_id &&
      type === currentFriend.object_type
    ) {
      console.log(111111111);
      pushMessage(
        wsData.content.type === 'TextMsg' ? 'txt' : 'img',
        wsData.content.content,
        wsData.content.type === 'TextMsg' ? undefined : undefined,
        {
          avatar: wsData.content.user.avatar,
          id: wsData.content.user.id,
          nickname: wsData.content.user.nickname,
        },
      );
    }
  }, [wsData]);

  useEffect(() => {
    // 有新消息滚动条在最下
    if (messageList.length) {
      listRef.current.scrollTo(messageList.length * 10000);
    }
  }, [messageList]);

  const messageContentRender = (info: PrivateMessages) => {
    const preClass = `${NAME_SPACE}-talkComponent-content`;
    const isMe = info.user_id !== userInfo?.id ? 'left' : 'right';
    return (
      <div className={Styles[`${preClass}-line`]}>
        <div className={Styles[`${preClass}-line-${isMe}`]}>
          <div>
            <Avatar src={info.content.user.avatar} />
          </div>
          {currentFriend.object_type === 'group' ? (
            <span className={Styles[`${preClass}-line-${isMe}-message-name`]}>
              {info.content.user.name}
            </span>
          ) : null}
          <div className={Styles[`${preClass}-line-${isMe}-message`]}>
            {/* <span>{moment(info.created_time).format('YYYY-MM-DD HH:mm:ss')}</span> */}
            <div className={Styles[`${preClass}-line-${isMe}-message-txt`]}>
              {info.type === 'TextMsg' ? (
                <span
                  style={{
                    display: 'inline-block',
                    minWidth: ' 10px',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {info.content.content}
                </span>
              ) : (
                <div style={{ padding: '10px 0' }}>
                  <Image
                    width={150}
                    src={info.content.content}
                    placeholder={
                      <Image
                        preview={false}
                        src={info.content.url}
                        width={400}
                      />
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // emoji弹窗内容
  const emojiContent = () => {
    return (
      <Picker
        data={data}
        onEmojiSelect={(v: any) => {
          setMessage((preMsg) => preMsg + v.native);
          setEmojiOpen(false);
        }}
      />
    );
  };

  return currentFriend ? (
    <div className={Styles[`${NAME_SPACE}-talkComponent`]} ref={contentRef}>
      <div className={Styles[`${NAME_SPACE}-talkComponent-header`]}>
        {currentFriend.object.remark || currentFriend.object.name}
      </div>
      <List split={false}>
        <VirtualList
          height={heightRef.current}
          data={messageList}
          itemKey="uid"
          onScroll={onScroll}
          ref={listRef}
        >
          {(item: PrivateMessages) => (
            <List.Item key={item.uid}>{messageContentRender(item)}</List.Item>
          )}
        </VirtualList>
      </List>
      <div className={Styles[`${NAME_SPACE}-talkComponent-footer`]}>
        <div className={Styles[`${NAME_SPACE}-talkComponent-footer-opation`]}>
          <AliyunOSSUpload accept="image/*" onChange={onImgChange} />
          <Popover
            open={emojiOpen}
            onOpenChange={setEmojiOpen}
            content={emojiContent}
            showArrow={false}
            placement="topLeft"
            trigger="click"
            getPopupContainer={(dom) => dom}
            overlayClassName={
              Styles[`${NAME_SPACE}-talkComponent-footer-opation-pop`]
            }
          >
            <Button
              type="link"
              style={{
                fontSize: 24,
                cursor: 'pointer',
                position: 'relative',
                top: '-2px',
                left: '10px',
                padding: 0,
              }}
            >
              <Icon type="icon-qvbilam-videoEMOJI" />
            </Button>
          </Popover>
        </div>
        <TextArea
          bordered={false}
          showCount
          value={message}
          maxLength={500}
          style={{ height: 110, fontSize: 16 }}
          autoSize={{ minRows: 5, maxRows: 5 }}
          onChange={(e) => {
            setMessage(e.target.value);
            console.log(111, e);
          }}
          onPressEnter={(e) => {
            console.log(22222, e);
          }}
        />
        <Button
          className={Styles[`${NAME_SPACE}-talkComponent-footer-submit`]}
          disabled={!message.length}
          type="primary"
          onClick={onSendMessage}
        >
          发送
        </Button>
      </div>
    </div>
  ) : null;
};

export { TalkComponent };
