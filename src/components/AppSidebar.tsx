
import { MessageCircle, Clock } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

const mainMenuItems = [
  {
    title: "新建会话",
    url: "/new",
    icon: MessageCircle,
  },
  {
    title: "Kimi+",
    url: "/plus",
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Kimi 探索版",
    url: "/explore",
    icon: () => (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12C21 16.9706 16.9706 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12H3M12 21C7.02944 21 3 16.9706 3 12M12 21C13.6569 21 15 16.9706 15 12C15 7.02944 13.6569 3 12 3M12 21C10.3431 21 9 16.9706 9 12C9 7.02944 10.3431 3 12 3M3 12C3 7.02944 7.02944 3 12 3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    title: "历史会话",
    url: "/history",
    icon: Clock,
  },
];

const recentTopics = [
  "设计智能对话网站的关键要素",
  "教育经历相关翻译",
  "吃喝门诊早餐建议",
  "在线表单实践成绩必填提示",
  "华威大学WMG硕士课程录取",
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={item.url}
                      className="flex items-center gap-3 px-4 py-2.5 text-[15px] text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              {recentTopics.map((topic) => (
                <SidebarMenuItem key={topic}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to="#"
                      className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg line-clamp-1"
                    >
                      {topic}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarMenuItem className="mt-2 px-4">
          <Link 
            to="/all"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            查看全部
          </Link>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  );
}
