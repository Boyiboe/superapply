
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SidebarFooter as Footer,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

export function SidebarFooter() {
  return (
    <Footer className="border-t border-gray-200">
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
    </Footer>
  );
}
