
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronUp, LogOut } from "lucide-react";
import { menuItems } from "@/config/admin";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface AndoraMobileNavProps {
  activeSection: string;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  selectSection: (sectionId: string) => void;
  handleLogout: () => void;
  isMobile: boolean;
}

const AndoraMobileNav = ({
  activeSection,
  isDrawerOpen,
  setIsDrawerOpen,
  selectSection,
  handleLogout,
  isMobile
}: AndoraMobileNavProps) => {
  if (!isMobile) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 md:hidden p-2">
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild className="w-full">
          <Button variant="ghost" className="w-full flex items-center gap-2 justify-center py-2">
            <span className="text-primary font-medium">{menuItems.find(item => item.id === activeSection)?.label}</span>
            <ChevronUp className="h-5 w-5 text-primary" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[80vh] overflow-y-auto">
          <DrawerHeader className="text-left px-4 py-2 border-b">
            <DrawerTitle>Menu de Navegação</DrawerTitle>
          </DrawerHeader>
          <div className="grid grid-cols-2 gap-2 p-4">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "outline"}
                  className={cn(
                    "h-20 flex flex-col items-center justify-center gap-2",
                    isActive ? "bg-primary text-white" : ""
                  )}
                  onClick={() => selectSection(item.id)}
                >
                  <item.icon size={24} />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
          <DrawerFooter className="border-t pt-2">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-500 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <LogOut size={16} />
              Sair
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AndoraMobileNav;
