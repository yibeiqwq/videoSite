import { NAME_SPACE } from '@/components/constant';
import React from 'react';
import styles from './../../index.less';

const TabCard: React.FC<any> = ({ data }) => {
  return (
    <div className={styles[`${NAME_SPACE}-tab-card`]}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
        return (
          <div key={item} className={styles[`${NAME_SPACE}-tab-card-capsule`]}>
            <span className={styles[`${NAME_SPACE}-tab-card-capsule-type`]}>
              分类{item}
            </span>
            <span className={styles[`${NAME_SPACE}-tab-card-capsule-link`]}>
              {item}种类一
            </span>
            <span className={styles[`${NAME_SPACE}-tab-card-capsule-link`]}>
              {item}种类二
            </span>
          </div>
        );
      })}
    </div>
  );
};

export { TabCard };
