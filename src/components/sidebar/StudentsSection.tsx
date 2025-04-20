
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  SidebarGroup,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarMenu,
  SidebarGroupLabel
} from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { recentStudents } from "@/data/sidebarData";

export function StudentsSection() {
  return (
    <SidebarGroup className="mt-6 flex flex-col items-center">
      <SidebarGroupLabel className="px-3 text-base font-medium text-gray-700 text-center">
        学生管理
      </SidebarGroupLabel>
      
      <SidebarMenuItem className="w-full flex justify-center">
        <SidebarMenuButton asChild tooltip="我递交的学生">
          <Link 
            to="/students" 
            className="flex items-center justify-center gap-2 p-3 rounded-lg text-base 
              bg-green-500 hover:bg-green-600 text-white w-full max-w-[200px]"
          >
            <User className="w-6 h-6 text-white" />
            <span className="group-data-[state=collapsed]:hidden">我递交的学生</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarGroupContent>
        <SidebarMenu>
          {recentStudents.map((student, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild>
                <Link 
                  to={`/student/${index}`}
                  className="flex flex-col w-full p-3 gap-1 hover:bg-green-50 rounded-lg text-center"
                >
                  <div className="flex items-center justify-center w-full">
                    <span className="font-medium text-gray-800">{student.name}</span>
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800">
                      {student.status}
                    </span>
                  </div>
                  <Progress value={student.progress} className="h-2 mt-2" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
