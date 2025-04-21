
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
    <Footer className="p-2 flex justify-center">
      {/* 收起时底部按钮左对齐，留白 16px，宽度最大收紧 */}
      <SidebarMenu className="w-full flex items-center group-data-[state=collapsed]:items-start group-data-[state=collapsed]:pl-4 group-data-[state=collapsed]:pr-0 group-data-[state=collapsed]:max-w-none mx-auto">
        <SidebarMenuItem className="w-full group-data-[state=collapsed]:w-full group-data-[state=collapsed]:max-w-none group-data-[state=collapsed]:pl-0">
          <SidebarMenuButton
            asChild
            tooltip="个人信息"
            className="
              w-full
              max-w-[200px]
              group-data-[state=collapsed]:w-12 group-data-[state=collapsed]:h-12 group-data-[state=collapsed]:max-w-none group-data-[state=collapsed]:pl-0 group-data-[state=collapsed]:p-0
            "
          >
            <Link
              to="/profile"
              className="
                flex items-center gap-2 rounded-lg text-base
                bg-blue-400 hover:bg-blue-500 text-white w-full h-[42px]
                group-data-[state=collapsed]:w-12 group-data-[state=collapsed]:h-12 group-data-[state=collapsed]:pl-0 group-data-[state=collapsed]:p-0
              "
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
