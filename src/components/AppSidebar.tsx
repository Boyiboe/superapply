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
import { Link } from "react-router-dom";

// Main menu items with updated styling
const mainMenuItems = [
  {
    title: "开启新申请",
    url: "/new",
    icon: Plus,
    primary: true
  },
  {
    title: "打开边栏",
    url: "#", // Using # as this is a sidebar toggle
    icon: Menu,
    primary: false
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
      <SidebarHeader className="flex items-center gap-2 p-4">
        <div className="text-2xl font-bold text-blue-500">
          <span className="group-data-[state=collapsed]:inline group-data-[state=expanded]:hidden">SA</span>
          <span className="group-data-[state=collapsed]:hidden group-data-[state=expanded]:inline">SuperApply</span>
        </div>
        <SidebarTrigger className="ml-auto h-8 w-8 group-data-[state=collapsed]:h-10 group-data-[state=collapsed]:w-10 group-data-[state=collapsed]:bg-blue-50 group-data-[state=collapsed]:hover:bg-blue-100 group-data-[state=collapsed]:rounded-lg">
          <Menu className="w-6 h-6 text-gray-600" />
        </SidebarTrigger>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Actions */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton 
                    asChild
                    tooltip={item.title}
                  >
                    <Link 
                      to={item.url}
                      className={`flex items-center gap-2 w-full p-3 rounded-lg text-base ${
                        item.primary 
                          ? 'bg-blue-400 hover:bg-blue-500 text-white' 
                          : 'bg-blue-50 hover:bg-blue-100 text-gray-700'
                      }`}
                    >
                      <item.icon className={`w-6 h-6 ${item.primary ? 'text-white' : 'text-gray-600'}`} />
                      <span className="group-data-[state=collapsed]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Application History */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-3 text-base font-medium text-gray-700 group-data-[state=collapsed]:hidden">申请历史</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentApplications.map((app, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={`/application/${index}`}
                      className="flex flex-col w-full p-3 gap-1 hover:bg-blue-50 rounded-lg group-data-[state=collapsed]:p-2"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-gray-800 group-data-[state=collapsed]:hidden">{app.university}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusClass(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 group-data-[state=collapsed]:hidden">{app.major}</span>
                      <span className="text-xs text-gray-500 group-data-[state=collapsed]:hidden">{app.time}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="个人信息">
              <Link 
                to="/profile" 
                className="flex items-center gap-2 w-full p-3 hover:bg-blue-50 rounded-lg text-gray-700"
              >
                <User className="w-6 h-6 text-gray-600" />
                <span className="group-data-[state=collapsed]:hidden">个人信息</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
