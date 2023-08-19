import { NAME_SPACE } from '@/components/constant';
import React from 'react';
import styles from './../../index.less';

const TabContent: React.FC<any> = ({ data, title }) => {
  return (
    <div className={styles[`${NAME_SPACE}-tab-content`]}>
      <div className={styles[`${NAME_SPACE}-tab-content-title`]}>
        <span dangerouslySetInnerHTML={{ __html: title }}></span>
      </div>
      <div className={styles[`${NAME_SPACE}-tab-content-left`]}></div>
      <div className={styles[`${NAME_SPACE}-tab-content-right`]}></div>
    </div>
  );
};

export { TabContent };
