
import React from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "./ProfileAvatar";

interface MobileNavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  activeSection: string;
}

export const MobileNavbar = ({ isSidebarOpen, setIsSidebarOpen, activeSection }: MobileNavbarProps) => {
  return (
    <div className="border-b lg:hidden">
      <div className="flex items-center justify-between p-2 md:p-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="mr-2"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>
        </div>
        <ProfileAvatar />
      </div>
    </div>
  );
};
