
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
      {/* Footer 部分，侧栏收起时左对齐 */}
      <SidebarMenu className="w-full flex items-center justify-center group-data-[state=collapsed]:justify-start group-data-[state=collapsed]:max-w-[48px] group-data-[state=collapsed]:w-12 mx-auto">
        <SidebarMenuItem className="w-full group-data-[state=collapsed]:max-w-[48px] group-data-[state=collapsed]:w-12 group-data-[state=collapsed]:mx-0">
          <SidebarMenuButton
            asChild
            tooltip="个人信息"
            className="
              w-full
              max-w-[200px]
              group-data-[state=collapsed]:max-w-[48px] group-data-[state=collapsed]:w-12 group-data-[state=collapsed]:h-12 group-data-[state=collapsed]:p-0 group-data-[state=collapsed]:justify-start group-data-[state=collapsed]:mx-0
            "
          >
            <Link
              to="/profile"
              className="
                flex items-center justify-center gap-2 rounded-lg text-base
                bg-blue-400 hover:bg-blue-500 text-white w-full h-[42px]
                group-data-[state=collapsed]:justify-start group-data-[state=collapsed]:w-12 group-data-[state=collapsed]:h-12 group-data-[state=collapsed]:p-0 group-data-[state=collapsed]:mx-0
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
