import React from 'react';
// import { NAME_SPACE } from "@/components/constant";
import { Banner } from './components/Banner';
import { TabCard } from './components/TabCard';
import { TabContent } from './components/TabContent';
import { resHome } from './mock';
// import styles from './index.less';

const Home: React.FC = () => {
  return (
    <div>
      <Banner data={resHome.data} />
      <TabCard data={resHome.data} />
      {resHome.data.map((item, index) => (
        <TabContent key={index} data={resHome.data} title={item.name} />
      ))}
    </div>
  );
};
export default Home;
