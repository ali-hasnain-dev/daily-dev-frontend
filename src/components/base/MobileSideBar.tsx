import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SideBarLink from "./SideBarLink";

export default function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="lg:hidden cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left">
        <SideBarLink />
      </SheetContent>
    </Sheet>
  );
}
