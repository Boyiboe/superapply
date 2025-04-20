
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
      <div className="flex w-full mb-4 items-center justify-center">
        <div className="text-2xl font-bold text-blue-500 text-center">
          <span className="group-data-[state=collapsed]:inline group-data-[state=expanded]:hidden">
            SA
          </span>
          <span className="group-data-[state=collapsed]:hidden group-data-[state=expanded]:inline">
            SuperApply
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 w-full">
        {/* Toggle Sidebar Button */}
        <SidebarMenuButton 
          asChild
          tooltip="打开边栏"
          className="w-full max-w-[200px]"
        >
          <SidebarTrigger className="flex items-center justify-center gap-2 p-3 rounded-lg text-base 
            bg-[#D3E4FD] hover:bg-blue-200 text-gray-700 w-full h-[42px]">
            <ChevronLeft className="w-6 h-6" />
            <span className="group-data-[state=collapsed]:hidden">打开边栏</span>
          </SidebarTrigger>
        </SidebarMenuButton>

        {/* New Application Button */}
        <SidebarMenuButton 
          asChild
          tooltip="开启新申请"
          className="w-full max-w-[200px]"
        >
          <Link 
            to="/new"
            className="flex items-center justify-center gap-2 p-3 rounded-lg text-base 
              bg-[#D3E4FD] hover:bg-blue-200 text-gray-700 w-full h-[42px]"
          >
            <Plus className="w-6 h-6" />
            <span className="group-data-[state=collapsed]:hidden">开启新申请</span>
          </Link>
        </SidebarMenuButton>

        {/* Avatar for expanded state - with details */}
        <SidebarMenuButton 
          asChild
          tooltip="查看学生详情"
          className="hidden group-data-[state=expanded]:flex w-full"
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
        
        {/* Avatar for collapsed state - centered */}
        <SidebarMenuButton 
          asChild
          tooltip="查看学生详情"
          className="hidden group-data-[state=collapsed]:flex group-data-[state=expanded]:hidden w-full justify-center"
        >
          <Link to="/" className="flex justify-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg" alt="Student Avatar" />
              <AvatarFallback className="!bg-[#D3E4FD] !text-gray-700 font-bold text-base flex items-center justify-center">SA</AvatarFallback>
            </Avatar>
          </Link>
        </SidebarMenuButton>
      </div>
    </Header>
  );
}
