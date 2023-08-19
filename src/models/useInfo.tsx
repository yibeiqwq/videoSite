import type { UserInfo } from '@/common/type';
import { useEffect, useState } from 'react';

export const userUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  useEffect(() => {
    const userLocalStorage = window.localStorage.getItem('user');
    if (typeof userLocalStorage === 'string')
      setUserInfo(JSON.parse(userLocalStorage));
  }, []);
  return {
    userInfo,
    setUserInfo,
  };
};
