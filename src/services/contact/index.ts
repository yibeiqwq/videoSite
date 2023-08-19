import request from '@/utils/request';

// 好友列表  /friend
export const getFriend = async () => {
  return request('/contact/friend', {
    method: 'GET',
  });
};

// 群列表 /group/mine
export const getMyGroup = async () => {
  return request('/contact/group/mine', {
    method: 'GET',
  });
};

// 会话列表
export const getConversation = async () => {
  return request('/contact/conversation', {
    method: 'GET',
  });
};

// 创建会话
export const createConversation = async (params: {
  object_id: number;
  type: 'user' | 'group';
}) => {
  return request(`/contact/conversation`, {
    method: 'POST',
    data: params,
  });
};
