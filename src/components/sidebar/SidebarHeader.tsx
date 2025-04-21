
import { ChevronLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SidebarHeader as Header,
  SidebarMenuButton,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SidebarHeader() {
  return (
    <Header className="flex flex-col items-center gap-2 p-4">
      {/* Logo Section */}
      <div className="w-full flex mb-4 group-data-[state=collapsed]:mb-2">
        <div
          className={
            // 重点：折叠时左对齐，保留16px留白
            "text-2xl font-bold text-blue-500 transition-all w-full" +
            " group-data-[state=collapsed]:flex group-data-[state=collapsed]:justify-start group-data-[state=collapsed]:pl-4" +
            " group-data-[state=expanded]:flex group-data-[state=expanded]:justify-center"
          }
        >
          <span
            className="
              group-data-[state=collapsed]:inline group-data-[state=expanded]:hidden
              w-full
            "
          >
            <span
              className="
                flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100 text-blue-500 text-2xl select-none font-extrabold
              "
              // 去掉 mx-auto，使 logo 贴左 
              // group-data-[state=collapsed]:ml-4
            >
              SA
            </span>
          </span>
          <span
            className="group-data-[state=collapsed]:hidden group-data-[state=expanded]:inline text-center"
          >
            SuperApply
          </span>
        </div>
      </div>
      {/* 按钮与头像区 */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Toggle Sidebar Button */}
        <SidebarMenuButton
          asChild
          tooltip="打开边栏"
          className="
            w-full
            group-data-[state=collapsed]:pl-4 group-data-[state=collapsed]:pr-0
            group-data-[state=collapsed]:max-w-none group-data-[state=collapsed]:w-full group-data-[state=collapsed]:h-12 group-data-[state=collapsed]:p-0
            group-data-[state=expanded]:max-w-[200px]
          "
        >
          <SidebarTrigger
            className="
              flex items-center gap-2 rounded-lg text-base
              bg-[#D3E4FD] hover:bg-blue-200 text-gray-700 h-[42px]
              group-data-[state=collapsed]:pl-0 group-data-[state=collapsed]:w-12 group-data-[state=collapsed]:h-12
              group-data-[state=expanded]:p-3 group-data-[state=expanded]:w-full
            "
          >
            <ChevronLeft className="w-6 h-6" />
            <span className="group-data-[state=collapsed]:hidden">打开边栏</span>
          </SidebarTrigger>
        </SidebarMenuButton>
        {/* New Application Button */}
        <SidebarMenuButton
          asChild
          tooltip="开启新申请"
          className="
            w-full
            group-data-[state=collapsed]:pl-4 group-data-[state=collapsed]:pr-0
            group-data-[state=collapsed]:max-w-none group-data-[state=collapsed]:w-full group-data-[state=collapsed]:h-12 group-data-[state=collapsed]:p-0
            group-data-[state=expanded]:max-w-[200px]
          "
        >
          <Link
            to="/new"
            className="
              flex items-center gap-2 rounded-lg text-base
              bg-[#D3E4FD] hover:bg-blue-200 text-gray-700 h-[42px]
              group-data-[state=collapsed]:pl-0 group-data-[state=collapsed]:w-12 group-data-[state=collapsed]:h-12
              group-data-[state=expanded]:p-3 group-data-[state=expanded]:w-full
            "
          >
            <Plus className="w-6 h-6" />
            <span className="group-data-[state=collapsed]:hidden">开启新申请</span>
          </Link>
        </SidebarMenuButton>
        {/* Avatar for expanded state - with details */}
        <SidebarMenuButton
          asChild
          tooltip="查看学生详情"
          className="
            hidden group-data-[state=expanded]:flex w-full max-w-[200px]
          "
        >
          <Link to="/" className="flex items-center gap-4 w-full">
            <Avatar className="w-12 h-12">
              <AvatarImage src="/placeholder.svg" alt="Student Avatar" />
              <AvatarFallback className="bg-[#33C3F0] text-white font-bold text-lg">SA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">张同学</span>
              <span className="text-xs text-gray-500">申请进度：3/5</span>
            </div>
          </Link>
        </SidebarMenuButton>
        {/* Avatar for collapsed state - 左侧对齐，留白 16px */}
        <SidebarMenuButton
          asChild
          tooltip="查看学生详情"
          className="
            hidden group-data-[state=collapsed]:flex w-full group-data-[state=collapsed]:pl-4 group-data-[state=collapsed]:h-12 group-data-[state=collapsed]:p-0
          "
        >
          <Link to="/" className="flex items-center w-12 h-12">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" alt="Student Avatar" />
              <AvatarFallback className="!bg-[#D3E4FD] !text-gray-700 font-bold text-sm flex items-center justify-center">SA</AvatarFallback>
            </Avatar>
          </Link>
        </SidebarMenuButton>
      </div>
    </Header>
  );
}
