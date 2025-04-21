
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
    <Header className="flex flex-col gap-2 p-4">
      {/* Logo Section */}
      <div className="w-full flex justify-start mb-4">
        {/* collapsed 时左对齐，宽度固定与按钮一致 */}
        <div
          className="
            text-2xl font-bold text-blue-500 text-left w-12
            flex items-center justify-center
          "
        >
          <span
            className="
              flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-500 text-xl select-none font-extrabold
            "
          >
            SA
          </span>
        </div>
      </div>
      {/* 按钮与头像区 */}
      <div className="flex flex-col items-start w-full space-y-3">
        {/* Toggle Sidebar Button */}
        <SidebarMenuButton
          asChild
          tooltip="打开侧栏"
          className="
            w-12 h-12 p-0 flex justify-center items-center
          "
        >
          <SidebarTrigger
            className="
              flex items-center justify-center rounded-lg text-base
              bg-[#D3E4FD] hover:bg-blue-200 text-gray-700 w-8 h-8 p-0
            "
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="sr-only">打开侧栏</span>
          </SidebarTrigger>
        </SidebarMenuButton>
        {/* New Application Button */}
        <SidebarMenuButton
          asChild
          tooltip="开启新申请"
          className="
            w-12 h-12 p-0 flex justify-center items-center
          "
        >
          <Link
            to="/new"
            className="
              flex items-center justify-center rounded-lg text-base
              bg-[#D3E4FD] hover:bg-blue-200 text-gray-700 w-8 h-8 p-0
            "
          >
            <Plus className="w-5 h-5" />
            <span className="sr-only">开启新申请</span>
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
        {/* Avatar for collapsed state - left aligned */}
        <SidebarMenuButton
          asChild
          tooltip="查看学生详情"
          className="
            flex group-data-[state=collapsed]:flex justify-start w-full max-w-[48px] w-12 h-12 p-0
          "
        >
          <Link to="/" className="flex items-center w-8 h-8">
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
