import { ChevronLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SidebarHeader as Header,
  SidebarMenuButton,
  SidebarInput,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SidebarHeader() {
  return (
    <Header className="flex flex-col items-center gap-2 p-4">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="text-2xl font-bold text-blue-500">
          <span className="group-data-[state=collapsed]:inline group-data-[state=expanded]:hidden">SA</span>
          <span className="group-data-[state=collapsed]:hidden group-data-[state=expanded]:inline">SuperApply</span>
        </div>
        <SidebarTrigger className="p-1 rounded-lg hover:bg-gray-100">
          <ChevronLeft className="w-5 h-5" />
        </SidebarTrigger>
      </div>
      
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex items-center gap-4 w-full mb-2 group-data-[state=collapsed]:hidden">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg" alt="Student Avatar" />
            <AvatarFallback className="bg-[#33C3F0] text-white font-bold text-lg">SA</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">张同学</span>
            <span className="text-xs text-gray-500">申请进度：3/5</span>
          </div>
        </div>
        
        {/* New Application Button - Updated Style */}
        <SidebarMenuButton 
          key="/new"
          asChild
          tooltip="开启新申请"
          className="w-full max-w-[200px]"
        >
          <Link 
            to="/new"
            className="flex items-center justify-center gap-2 p-3 rounded-lg text-base 
              bg-blue-600 hover:bg-blue-700 text-white w-full h-[42px]"
          >
            <Plus className="w-6 h-6 text-white" />
            <span>开启新申请</span>
          </Link>
        </SidebarMenuButton>

        {/* Search Box */}
        <div className="w-full px-2 group-data-[state=collapsed]:hidden mt-2">
          <SidebarInput 
            type="search"
            placeholder="搜索申请记录..." 
            className="w-full"
          />
        </div>
      </div>
    </Header>
  );
}
