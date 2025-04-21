
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
    <Footer className="p-2 group-data-[state=collapsed]:flex group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:items-center">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton 
            asChild 
            tooltip="个人信息"
            className="w-full p-0 group-data-[state=collapsed]:w-12 group-data-[state=collapsed]:justify-center"
          >
            <Link 
              to="/profile" 
              className="flex items-center justify-center gap-2 w-full p-3 rounded-lg text-base 
                bg-blue-400 hover:bg-blue-500 text-white group-data-[state=collapsed]:w-12 group-data-[state=collapsed]:p-0"
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
