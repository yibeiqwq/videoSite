import request from '@/utils/request';

// 上传文件前发送sha1码 /v1/token?file_sha1=534511019
export const sendFileSha1 = async (params: { file_sha1: string }) => {
  return request('/public/v1/token', {
    method: 'GET',
    params,
  });
};
