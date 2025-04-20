
import { MessageSquare, Plus, Smartphone, Timer, MoreVertical } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Main menu items stay the same but with updated styling
const mainMenuItems = [
  {
    title: "新建会话",
    url: "/new",
    icon: MessageSquare,
  },
  {
    title: "Kimi+",
    url: "/plus",
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3v18M3 12h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "消息",
    url: "/chat",
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.862 9.862 0 01-4.255-.949L3 20l1.395-3.72C3.512 14.042 3 12.574 3 11c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "移动端",
    url: "/mobile",
    icon: Smartphone,
  },
  {
    title: "Timer",
    url: "/tiger",
    icon: Timer,
  }
];

const recentChats = {
  today: [
    { title: "删除项目操作指南", url: "/chat/1" },
    { title: "超级网申Logo设计方案", url: "/chat/2" },
  ],
  week: [
    { title: "李陆春学位证书及毕业证书中英文对照", url: "/chat/3" },
    { title: "恳请调整还款安排以缓解经营压力", url: "/chat/4" },
    { title: "英国大学网申自动化开发时间", url: "/chat/5" },
  ],
  month: [
    { title: "艾臻教育科技AI智能服务转型方案", url: "/chat/6" },
    { title: "爱尔兰教育专场活动开场白", url: "/chat/7" },
    { title: "留学B2B机构客户线索工作流优化", url: "/chat/8" },
    { title: "格拉斯哥网申开发工时评估", url: "/chat/9" },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        {/* Main Menu Icons */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    tooltip={item.title}
                  >
                    <Link 
                      to={item.url}
                      className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <item.icon className="w-5 h-5" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Recent Chats - Only visible when expanded */}
        <SidebarGroup className="hidden group-data-[state=expanded]:block mt-8">
          <SidebarGroupLabel>今天</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentChats.today.map((chat) => (
                <SidebarMenuItem key={chat.url}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={chat.url}
                      className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                      <span className="truncate">{chat.title}</span>
                      <MoreVertical className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel className="mt-6">7 天内</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentChats.week.map((chat) => (
                <SidebarMenuItem key={chat.url}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={chat.url}
                      className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                      <span className="truncate">{chat.title}</span>
                      <MoreVertical className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

          <SidebarGroupLabel className="mt-6">30 天内</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentChats.month.map((chat) => (
                <SidebarMenuItem key={chat.url}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={chat.url}
                      className="flex items-center justify-between w-full px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                      <span className="truncate">{chat.title}</span>
                      <MoreVertical className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
