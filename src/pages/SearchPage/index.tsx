import { NAME_SPACE } from '@/components/constant';
import { Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'umi';
import styles from './index.less';
// 搜索页面
const SearchPage: React.FC = () => {
  const preClass = `${NAME_SPACE}-searchPage`;
  const [keyWord, setKeyWord] = useState<string>('');
  const [searchParams] = useSearchParams();
  const [activeKey, setActiveKey] = useState<'user'>('user');
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps['items'] = [
    {
      key: 'user',
      label: `用户`,
      children: `Content of Tab Pane 1`,
    },
  ];

  useEffect(() => {
    const newKeyWord = searchParams.get('keyWord');
    if (newKeyWord) {
      setKeyWord(newKeyWord);
    }
  }, []);

  return (
    <div className={styles[`${preClass}-warp`]}>
      <Tabs defaultActiveKey={activeKey} items={items} onChange={onChange} />
    </div>
  );
};
export default SearchPage;
