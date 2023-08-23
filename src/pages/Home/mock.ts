// 首页视频信息
export const resHome = {
  data: [
    {
      id: 2,
      name: '<font color="#FF0000">fate</font> zero 第一季', // 名称
      // 简介
      introduce:
        '传说中，圣杯是能够实现拥有者愿望的宝物。为了追求圣杯的力量，7位魔术师各自召唤英灵，展开争夺圣杯的战斗，这就是圣杯战争。\n时间退回到第五次圣杯战争的10年前，第四次圣杯战争，参与者正是士郎他们的父辈。为了得到圣杯不择手段的卫宫切嗣，年轻时代的言峰绮礼，间桐家与远坂家的关系，同样身为王却意志不同的三位英灵。第四次圣杯之战就此爆发。',
      // 图标
      icon: 'http://damowang.test.upcdn.net/video/dm/FZ/f101.png',
      // 上传用户信息
      user: null,
      // 剧集
      episode: [
        {
          id: 2,
          episode: 1,
          video: {
            id: 2,
            file_id: 0,
            name: '英灵召唤',
            introduce: '第一集',
            icon: '',
            created_time: 0,
          },
        },
        {
          id: 3,
          episode: 2,
          video: {
            id: 3,
            file_id: 0,
            name: '虚假的战争',
            introduce: '第二集',
            icon: '',
            created_time: 0,
          },
        },
      ],
      created_time: 1667225547,
    },
    {
      id: 3,
      name: 'zero', // 名称
      // 简介
      introduce:
        '传说中，圣杯是能够实现拥有者愿望的宝物。为了追求圣杯的力量，7位魔术师各自召唤英灵，展开争夺圣杯的战斗，这就是圣杯战争。\n时间退回到第五次圣杯战争的10年前，第四次圣杯战争，参与者正是士郎他们的父辈。为了得到圣杯不择手段的卫宫切嗣，年轻时代的言峰绮礼，间桐家与远坂家的关系，同样身为王却意志不同的三位英灵。第四次圣杯之战就此爆发。',
      // 图标
      icon: 'http://damowang.test.upcdn.net/video/dm/FZ/f101.png',
      // 上传用户信息
      user: null,
      created_time: 1667225547,
    },
    {
      id: 4,
      name: 'zero 第er季', // 名称
      // 简介
      introduce:
        '传说中，圣杯是能够实现拥有者愿望的宝物。为了追求圣杯的力量，7位魔术师各自召唤英灵，展开争夺圣杯的战斗，这就是圣杯战争。\n时间退回到第五次圣杯战争的10年前，第四次圣杯战争，参与者正是士郎他们的父辈。为了得到圣杯不择手段的卫宫切嗣，年轻时代的言峰绮礼，间桐家与远坂家的关系，同样身为王却意志不同的三位英灵。第四次圣杯之战就此爆发。',
      // 图标
      icon: 'http://damowang.test.upcdn.net/video/dm/FZ/f101.png',
      // 上传用户信息
      user: null,
      created_time: 1667225547,
    },
    {
      id: 5,
      name: 'zero 第一季', // 名称
      // 简介
      introduce:
        '传说中，圣杯是能够实现拥有者愿望的宝物。为了追求圣杯的力量，7位魔术师各自召唤英灵，展开争夺圣杯的战斗，这就是圣杯战争。\n时间退回到第五次圣杯战争的10年前，第四次圣杯战争，参与者正是士郎他们的父辈。为了得到圣杯不择手段的卫宫切嗣，年轻时代的言峰绮礼，间桐家与远坂家的关系，同样身为王却意志不同的三位英灵。第四次圣杯之战就此爆发。',
      // 图标
      icon: 'http://damowang.test.upcdn.net/video/dm/FZ/f101.png',
      // 上传用户信息
      user: null,
      created_time: 1667225547,
    },
  ],
  total: 1,
};

// 首页栏目信息
export const columnData = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25,
].map((x, index) => {
  return {
    id: index + 1,
    name: '番剧' + index,
    path: `/${index}`,
    menu: [
      {
        id: `${index + 1}-1`,
        name: '连载动画',
        path: `/连载动画/${index}`,
      },
      {
        id: `${index + 1}-2`,
        name: '完结动画',
        path: `/连载动画/${index}`,
      },
      {
        id: `${index + 1}-3`,
        name: '完结动画',
        path: `/连载动画/${index}`,
      },
      {
        id: `${index + 1}-4`,
        name: '完结动画',
        path: `/连载动画/${index}`,
      },
      {
        id: `${index + 1}-5`,
        name: '完结动画',
        path: `/连载动画/${index}`,
      },
      {
        id: `${index + 1}-6`,
        name: '完结动画',
        path: `/连载动画/${index}`,
      },
      {
        id: `${index + 1}-7`,
        name: '完结动画',
        path: `/连载动画/${index}`,
      },
    ],
  };
});
