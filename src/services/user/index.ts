import request from '@/utils/request';

// 模糊搜索
export const searchAll = async (params: {
  /** 搜索条件 */
  keyword?: string;
  sort?: string;
  page?: number;
  per_page?: number;
}) => {
  return request('/user/user/search', {
    method: 'GET',
    params,
  });
};
