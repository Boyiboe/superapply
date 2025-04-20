
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
          <SidebarTrigger className="flex items-center justify-center gap-2 p-3 rounded-lg text-base 
            bg-blue-400 hover:bg-blue-500 text-white w-full max-w-[200px] h-[42px]">
            <Menu className="w-6 h-6 text-white" />
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
    </Header>
  );
}
