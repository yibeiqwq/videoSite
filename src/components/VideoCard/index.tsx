import { Skeleton } from 'antd';
import React from 'react';
import { NAME_SPACE } from '../constant';
import styles from './index.less';

interface Props {}

const VideoCard: React.FC<Props> = ({}) => {
  const preClass = `${NAME_SPACE}-video-card`;
  return (
    <div className={styles[preClass]}>
      <Skeleton.Image active={true} />
      <Skeleton loading={true} active={true}>
        <span style={{ marginBottom: 16 }}>up:222222·时间</span>
        <span style={{ marginBottom: 16 }}>Ant Design, a design language</span>
      </Skeleton>
    </div>
  );
};

export { VideoCard };
