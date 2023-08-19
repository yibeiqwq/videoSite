import { NAME_SPACE } from '@/components/constant';
import { Carousel } from 'antd';
import React from 'react';
import styles from './../../index.less';

const Banner: React.FC<any> = ({ data }) => {
  return (
    <Carousel className={styles[`${NAME_SPACE}-banner`]} autoplay>
      {data.map((item: any) => (
        <div className={styles[`${NAME_SPACE}-banner-item`]} key={item.id}>
          <img
            key={item.id}
            className={styles[`${NAME_SPACE}-banner-item-img`]}
            src={item.icon}
            alt={item.name}
          />
        </div>
      ))}
    </Carousel>
  );
};

export { Banner };
