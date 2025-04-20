
import { Search, Plus, User, Menu } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

// Main menu items with updated order
const mainMenuItems = [
  {
    title: "打开边栏",
    url: "#", 
    icon: Menu,
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
    title: "搜索学生",
    url: "/search",
    icon: Search,
    primary: true
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
          {mainMenuItems.map((item) => (
            <SidebarMenuButton 
              key={item.url}
              asChild
              tooltip={item.title}
              className="w-full max-w-[200px]"
            >
              {item.action === "sidebar" ? (
                <SidebarTrigger 
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg text-base 
                    bg-blue-400 hover:bg-blue-500 text-white w-full`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                  <span className="group-data-[state=collapsed]:hidden">{item.title}</span>
                </SidebarTrigger>
              ) : (
                <Link 
                  to={item.url}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg text-base 
                    bg-blue-400 hover:bg-blue-500 text-white w-full`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                  <span className="group-data-[state=collapsed]:hidden">{item.title}</span>
                </Link>
              )}
            </SidebarMenuButton>
          ))}
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

          {/* Recent Students Section - Updated styling */}
          <SidebarGroup className="mt-6">
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="我递交的学生">
                <Link 
                  to="/students" 
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg text-base 
                    bg-blue-400 hover:bg-blue-500 text-white w-full mx-3`}
                >
                  <User className="w-6 h-6 text-white" />
                  <span className="text-center w-full">我递交的学生</span>
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
