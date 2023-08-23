import React, { useMemo } from 'react';
// import { NAME_SPACE } from "@/components/constant";
import { Banner } from './components/Banner';
// import { TabCard } from './components/TabCard';
import { Icon } from '@/components';
import { NAME_SPACE } from '@/components/constant';
import { VideoCard } from '@/components/VideoCard';
import { Popover } from 'antd';
import { chunk, drop, take } from 'lodash';
import { history, Link } from 'umi';
import { TabContent } from './components/TabContent';
import { HOME_TOP_TITLE } from './contants';
import styles from './index.less';
import { columnData, resHome } from './mock';
// import VirtualList from 'rc-virtual-list';

const Home: React.FC = () => {
  const chennel = useMemo(() => {
    return {
      chennels: columnData.length < 21 ? [] : take(columnData, 19),
      more: columnData.length < 21 ? columnData : drop(columnData, 19),
    };
  }, [columnData]);

  const topPropContent = (menu: Record<string, any>[]) => {
    return (
      <div className={styles[`${NAME_SPACE}-prop-content`]}>
        {chunk(menu, 4).map((x) => {
          return (
            <div className={styles[`${NAME_SPACE}-prop-content-box`]}>
              {x.map((item) => {
                return (
                  <Link
                    className={styles[`${NAME_SPACE}-prop-content-box-item`]}
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {/* banner */}
      <Banner data={resHome.data} />
      {/* 栏目 */}
      <div className={styles['home-warp']}>
        <div className={styles[`${NAME_SPACE}-top`]}>
          <div className={styles[`${NAME_SPACE}-top-left`]}>
            {HOME_TOP_TITLE.map((item, index) => {
              return (
                <div
                  className={styles[`${NAME_SPACE}-top-left-item`]}
                  key={item.value}
                  onClick={() => {
                    history.push(item.path);
                  }}
                >
                  <span
                    className={styles[`${NAME_SPACE}-top-left-item-icon`]}
                    style={{
                      background:
                        index === 0
                          ? '#ff9212'
                          : index === 1
                          ? '#f07775'
                          : '#59ca73',
                    }}
                  >
                    <Icon type={item.icon} style={{ fontSize: '24px' }} />
                  </span>
                  <span className={styles[`${NAME_SPACE}-top-left-item-title`]}>
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
          <div className={styles[`${NAME_SPACE}-top-right`]}>
            {chennel.chennels.map((x) => {
              return (
                <Popover
                  content={topPropContent(x.menu)}
                  getPopupContainer={(dom) => dom}
                >
                  <Link
                    className={styles[`${NAME_SPACE}-top-right-chennel`]}
                    to={x.path}
                  >
                    {x.name}
                  </Link>
                </Popover>
              );
            })}
            {!!chennel.more?.length ? (
              <Popover
                content={topPropContent(chennel.more)}
                getPopupContainer={(dom) => dom}
              >
                <span className={styles[`${NAME_SPACE}-top-right-chennel`]}>
                  更多
                </span>
              </Popover>
            ) : null}
          </div>
        </div>
        {/* <TabCard data={resHome.data} /> */}
        {resHome.data.map((item, index) => (
          <TabContent key={index} data={resHome.data} title={item.name} />
        ))}
      </div>
      {/* 视频列表 */}
      <div className={styles[`${NAME_SPACE}-list`]}>
        <VideoCard />
        {/* <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
        >
          {(item: UserItem) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        </VirtualList> */}
      </div>
    </div>
  );
};
export default Home;
