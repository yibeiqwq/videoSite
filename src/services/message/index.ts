import request from '@/utils/request';

// 发送文字消息 /message/private/publish/txt
export const sendPrivatetxtMessage = async (params: {
  sendType: 'user' | 'group';
  user_id: number;
  content: string;
  header_id: number;
}) => {
  return request(
    `/message/message/${
      params.sendType === 'user' ? 'private' : 'group'
    }/publish/txt`,
    {
      method: 'POST',
      data: {
        user_id: params.sendType === 'user' ? params.user_id : undefined,
        group_id: params.sendType === 'group' ? params.user_id : undefined,
        content: params.content,
      },
      options: {
        headers: {
          Authorization: params.header_id,
        },
      },
    },
  );
};

// 发送图片信息 /message/private/publish/img
export const sendImgMessage = async (params: {
  sendType: 'user' | 'group';
  user_id: number;
  content: string;
  url: string;
  header_id?: number;
  extra?: string;
}) => {
  return request(
    `/message/message/${
      params.sendType === 'user' ? 'private' : 'group'
    }/publish/img`,
    {
      method: 'POST',
      data: {
        user_id: params.sendType === 'user' ? params.user_id : undefined,
        group_id: params.sendType === 'group' ? params.user_id : undefined,
        content: params.content,
        url: params.url,
        extra: params.extra,
      },
      options: {
        headers: {
          Authorization: params.header_id,
        },
      },
    },
  );
};

// 获取私聊聊天记录 /message/private/{id}
export const getPrivateMessages = async (params: {
  id: number;
  page?: number;
  per_page?: number;
  keyword?: string;
  type?: string;
}) => {
  return request(`/message/message/private/${params.id}`, {
    method: 'GET',
    params: {
      page: params.page,
      per_page: params.per_page,
      keyword: params.keyword,
      type: params.type,
    },
  });
};

// 获取群聊聊天记录 /message/group/{id}
export const getGroupMessages = async (params: {
  id: number;
  page?: number;
  per_page?: number;
  keyword?: string;
  type?: string;
}) => {
  return request(`/message/message/group/${params.id}`, {
    method: 'GET',
    params: {
      page: params.page,
      per_page: params.per_page,
      keyword: params.keyword,
      type: params.type,
    },
  });
};
