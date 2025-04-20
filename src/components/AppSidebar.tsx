import { Search, Plus, User, Menu, CircleCheck } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter,
  SidebarInput,
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

// Main menu items with updated order
const mainMenuItems = [
  {
    title: "打开边栏",
    url: "#", 
    icon: CircleCheck,
    primary: true,
    action: "sidebar"
  },
  {
    title: "开启新申请",
    url: "/new",
    icon: Plus,
    primary: true
  },
  {
    title: "当前学生",
    url: "/current-student",
    icon: CircleCheck,
    primary: true,
    progress: {
      name: "张同学",
      current: 3,
      total: 5
    }
  }
];

const recentApplications = [
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

const recentStudents = [
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

const getStatusClass = (status: string) => {
  switch (status) {
    case "进行中":
      return "bg-yellow-100 text-yellow-800";
    case "已完成":
      return "bg-green-100 text-green-800";
    case "待处理":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="flex flex-col items-center gap-2 p-4">
        <div className="text-2xl font-bold text-blue-500 mb-4 text-center">
          <span className="group-data-[state=collapsed]:inline group-data-[state=expanded]:hidden">SA</span>
          <span className="group-data-[state=collapsed]:hidden group-data-[state=expanded]:inline">SuperApply</span>
        </div>
        <div className="flex flex-col items-center gap-2 w-full"> 
          {/* Open Sidebar Button - Updated to match New Application exactly */}
          <SidebarMenuButton 
            tooltip="打开边栏"
            className="w-full max-w-[200px]"
          >
            <SidebarTrigger className="flex items-center justify-center gap-2 p-3 rounded-lg text-base 
              bg-blue-400 hover:bg-blue-500 text-white w-full max-w-[200px] h-[42px]">
              <CircleCheck className="w-6 h-6 text-white" />
              <span className="group-data-[state=collapsed]:hidden">打开边栏</span>
            </SidebarTrigger>
          </SidebarMenuButton>
          
          {/* New Application Button */}
          <SidebarMenuButton 
            key="/new"
            asChild
            tooltip="开启新申请"
            className="w-full max-w-[200px]"
          >
            <Link 
              to="/new"
              className="flex items-center justify-center gap-2 p-3 rounded-lg text-base 
                bg-blue-400 hover:bg-blue-500 text-white w-full max-w-[200px] h-[42px]"
            >
              <Plus className="w-6 h-6 text-white" />
              <span className="group-data-[state=collapsed]:hidden">开启新申请</span>
            </Link>
          </SidebarMenuButton>
          
          {/* Current Student Button */}
          <SidebarMenuButton 
            key="/current-student"
            asChild
            tooltip="当前学生"
            className="w-full max-w-[200px]"
          >
            <Link 
              to="/current-student"
              className="flex flex-col items-center p-4 rounded-lg text-base hover:bg-gray-100 w-full h-[32px]"
            >
              <div className="flex items-center gap-3 w-full mb-4">
                <CircleCheck className="w-8 h-8 text-blue-500" />
                <div className="group-data-[state=collapsed]:hidden flex flex-col flex-1">
                  <span className="font-medium text-gray-900 text-lg">张同学</span>
                  <span className="text-sm font-medium text-gray-500 mt-1">
                    申请进度：3/5
                  </span>
                </div>
              </div>
              <div className="group-data-[state=collapsed]:hidden w-full">
                <Progress 
                  value={(3 / 5) * 100} 
                  className="h-6 w-full"
                />
              </div>
            </Link>
          </SidebarMenuButton>

          {/* Search Box */}
          <div className="w-full px-2 group-data-[state=collapsed]:hidden">
            <SidebarInput 
              type="search"
              placeholder="搜索学生..." 
              className="w-full"
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Application History - Only visible when sidebar is expanded */}
        <div className="group-data-[state=collapsed]:hidden">
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="px-3 text-base font-medium text-gray-700 text-center">申请历史</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {recentApplications.map((app, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={`/application/${index}`}
                        className="flex flex-col w-full p-3 gap-1 hover:bg-blue-50 rounded-lg text-center"
                      >
                        <div className="flex items-center justify-center w-full">
                          <span className="font-medium text-gray-800">{app.university}</span>
                          <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusClass(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                        <span className="text-sm text-gray-600">{app.major}</span>
                        <span className="text-xs text-gray-500">{app.time}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Students Section - Centered Button */}
          <SidebarGroup className="mt-6 flex flex-col items-center">
            <SidebarMenuItem className="w-full flex justify-center">
              <SidebarMenuButton asChild tooltip="我递交的学生">
                <Link 
                  to="/students" 
                  className="flex items-center justify-center gap-2 p-3 rounded-lg text-base 
                    bg-blue-400 hover:bg-blue-500 text-white w-full max-w-[200px]"
                >
                  <User className="w-6 h-6 text-white" />
                  <span className="group-data-[state=collapsed]:hidden">我递交的学生</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarGroupContent>
              <SidebarMenu>
                {recentStudents.map((student, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={`/student/${index}`}
                        className="flex flex-col w-full p-3 gap-1 hover:bg-blue-50 rounded-lg text-center"
                      >
                        <div className="flex items-center justify-center w-full">
                          <span className="font-medium text-gray-800">{student.name}</span>
                          <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                            {student.status}
                          </span>
                        </div>
                        <Progress value={student.progress} className="h-2 mt-2" />
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="个人信息">
              <Link 
                to="/profile" 
                className="flex items-center justify-center gap-2 w-full p-3 rounded-lg text-base 
                  bg-blue-400 hover:bg-blue-500 text-white"
              >
                <User className="w-6 h-6 text-white" />
                <span className="group-data-[state=collapsed]:hidden">个人信息</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
