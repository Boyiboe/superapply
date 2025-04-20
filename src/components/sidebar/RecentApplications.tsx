
import { Link } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { recentApplications } from "@/data/sidebarData";
import { getStatusClass } from "@/utils/statusStyles";

export function RecentApplications() {
  return (
    <SidebarGroup className="mt-6">
      <SidebarGroupLabel className="px-3 text-base font-medium text-gray-700 text-center">
        申请历史
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {recentApplications.map((app, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <Link 
                  to={`/application/${index}`}
                  className="flex flex-col w-full p-3 gap-1 hover:bg-blue-50 rounded-lg text-center"
                >
                  <div className="flex items-center justify-center w-full">
                    <span className="font-medium text-gray-800">{app.university}</span>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getStatusClass(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">{app.major}</span>
                  <span className="text-xs text-gray-500">{app.time}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
