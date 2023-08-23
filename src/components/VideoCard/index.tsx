import { Skeleton } from 'antd';
import React from 'react';
import { NAME_SPACE } from '../constant';
import styles from './index.less';

interface Props {}

const VideoCard: React.FC<Props> = ({}) => {
  const preClass = `${NAME_SPACE}-video-card`;
  return (
    <div className={styles[preClass]}>
      <Skeleton.Node active></Skeleton.Node>
      <Skeleton loading={true} active>
        www
      </Skeleton>
    </div>
  );
};

export { VideoCard };
