
import {
  Sidebar,
  SidebarContent
} from "@/components/ui/sidebar";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { RecentApplications } from "./sidebar/RecentApplications";
import { StudentsSection } from "./sidebar/StudentsSection";
import { SidebarFooter } from "./sidebar/SidebarFooter";

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon" defaultOpen={false}>
      <SidebarHeader />
      <SidebarContent>
        <div className="group-data-[state=collapsed]:hidden">
          <RecentApplications />
          <StudentsSection />
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
