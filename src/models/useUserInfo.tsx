import type { UserInfo } from '@/common/type';
import { useEffect, useState } from 'react';

export default () => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    const localeUser = !!window.localStorage.getItem('user')
      ? JSON.parse(window.localStorage.getItem('user')!)
      : undefined;
    // localStorage不存在用户信息时保存一份
    if (userInfo && !localeUser) {
      window.localStorage.setItem('user', JSON.stringify(userInfo));
    } else if (!!localeUser && !userInfo) {
      // 当localStoreage存在，model不存在时重新赋值一份
      setUserInfo(localeUser);
    }
  }, [userInfo, window.localStorage.getItem('user')]);

  return {
    userInfo,
    setUserInfo,
  };
};
