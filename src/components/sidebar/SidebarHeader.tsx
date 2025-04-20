
import { Menu, Plus, CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SidebarHeader as Header,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInput
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";

export function SidebarHeader() {
  return (
    <Header className="flex flex-col items-center gap-2 p-4">
      <div className="text-2xl font-bold text-blue-500 mb-4 text-center">
        <span className="group-data-[state=collapsed]:inline group-data-[state=expanded]:hidden">SA</span>
        <span className="group-data-[state=collapsed]:hidden group-data-[state=expanded]:inline">SuperApply</span>
      </div>
      <div className="flex flex-col items-center gap-2 w-full">
        {/* Open Sidebar Button */}
        <SidebarMenuButton 
          tooltip="打开边栏"
          className="w-full max-w-[200px]"
        >
          <Link 
            to="#"
            className="flex items-center justify-center gap-2 p-3 rounded-lg text-base 
              bg-blue-400 hover:bg-blue-500 text-white w-full max-w-[200px] h-[42px] group-data-[state=collapsed]:h-[42px] group-data-[state=collapsed]:w-[42px]"
          >
            <Menu className="w-6 h-6 text-white" />
            <span className="group-data-[state=collapsed]:hidden">打开边栏</span>
          </Link>
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
              bg-blue-400 hover:bg-blue-500 text-white w-full max-w-[200px] h-[42px] group-data-[state=collapsed]:h-[42px] group-data-[state=collapsed]:w-[42px]"
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
            className="flex items-center justify-center gap-2 p-3 rounded-lg text-base 
              bg-blue-400 hover:bg-blue-500 text-white w-full max-w-[200px] h-[42px] group-data-[state=collapsed]:h-[42px] group-data-[state=collapsed]:w-[42px]"
          >
            <CircleCheck className="w-6 h-6 text-white" />
            <span className="group-data-[state=collapsed]:hidden">张同学</span>
          </Link>
        </SidebarMenuButton>

        {/* Progress bar - only show when expanded */}
        <div className="group-data-[state=collapsed]:hidden w-full px-4">
          <span className="text-sm font-medium text-gray-500 block mb-2">
            申请进度：3/5
          </span>
          <Progress 
            value={(3 / 5) * 100} 
            className="h-2 w-full"
          />
        </div>

        {/* Search Box */}
        <div className="w-full px-2 group-data-[state=collapsed]:hidden mt-2">
          <SidebarInput 
            type="search"
            placeholder="搜索学生..." 
            className="w-full"
          />
        </div>
      </div>
    </Header>
  );
}
