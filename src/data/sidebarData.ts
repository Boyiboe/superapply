
export const mainMenuItems = [
  {
    title: "打开边栏",
    url: "#", 
    icon: "menu",
    primary: true,
    action: "sidebar"
  },
  {
    title: "开启新申请",
    url: "/new",
    icon: "plus",
    primary: true
  },
  {
    title: "当前学生",
    url: "/current-student",
    icon: "check",
    primary: true,
    progress: {
      name: "张同学",
      current: 3,
      total: 5
    }
  }
];

export const recentApplications = [
  {
    university: "哈佛大学",
    major: "计算机科学",
    time: "今天",
    status: "进行中"
  },
  {
    university: "斯坦福大学",
    major: "人工智能",
    time: "今天",
    status: "已完成"
  },
  {
    university: "麻省理工",
    major: "数据科学",
    time: "昨天",
    status: "待处理"
  },
  {
    university: "伯克利",
    major: "电子工程",
    time: "3天前",
    status: "已完成"
  },
  {
    university: "剑桥大学",
    major: "计算机视觉",
    time: "5天前",
    status: "已完成"
  }
];

export const recentStudents = [
  {
    name: "张三",
    progress: 75,
    status: "材料审核中"
  },
  {
    name: "李四",
    progress: 100,
    status: "已完成"
  },
  {
    name: "赵六",
    progress: 90,
    status: "等待确认"
  },
  {
    name: "钱七",
    progress: 60,
    status: "处理中"
  }
];
