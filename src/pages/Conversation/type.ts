export type MenuList = 'friendMenu' | 'messageMenu';

// 好友列表
export type FriendType = {
  id: number;
  /** 用户id */
  user_id: number;
  /** 备注 */
  remark?: string;
  user: FriendInfoType;
};

export type FriendInfoType = {
  /** 头像 */
  avatar: string;
  /** 账号 */
  code: number;
  /** 性别 */
  gender: string;
  /** 用户id */
  id: number;
  /** 昵称 */
  nickname: string;
};

// 会话列表
export type ConversationList = {
  /** 会话id */
  id: number;
  /** 用户id */
  user_id: number;
  /** 对象类型: user:用户,group:群聊 */
  object_type: 'user' | 'group';
  /** 对象id */
  object_id: number;
  object: {
    id: number;
    /** 名称 */
    name: string;
    /** 头像 */
    avatar: string;
    /** 备注 */
    remark: string;
    /** 是否免打扰 */
    is_dnd: boolean;
  };
  /** 新消息数量 */
  news_count: number;
  /** 提示 */
  tips: string;
  /** 上条消息内容 */
  last_message: string;
  /** 上条消息时间 */
  last_message_time: number;
};

type MsgType = 'TextMsg' | 'ImageMsg';

// 私聊消息记录
export type PrivateMessages = {
  /** 用户id */
  user_id: number;
  /**  */
  uid: string;
  /** 消息类型 TextMsg */
  type: MsgType;
  /** 消息内容 */
  content: TextMessageContent;
  /** 发送时间 */
  created_time: number;
  status?: 'error' | 'success' | 'done' | 'uploading' | 'removed';
};

// 私聊消息内容中的content
export type TextMessageContent = {
  code: number;
  /** 消息类型 TextMsg */
  type: MsgType;
  /** 消息内容 */
  content: string;
  url?: string;
  /** 用户信息 */
  user: {
    id: number;
    name: string;
    /** 头像 */
    avatar: string;
    extra: string;
  };
  extra: string;
};
