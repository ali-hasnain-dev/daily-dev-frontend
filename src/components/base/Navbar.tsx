import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { BellIcon } from "lucide-react";
import SerachInput from "./SerachInput";
import ProfleMenu from "./ProfleMenu";
import MobileSideBar from "./MobileSideBar";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-2 border-b">
      <MobileSideBar />
      <Image src="/logo.svg" alt="logo" width={120} height={120} />
      <SerachInput />
      <div className="flex space-x-3 items-center">
        <Button size="icon" variant="secondary">
          <BellIcon className="w-5 h-5" />
        </Button>
        <ProfleMenu />
      </div>
    </nav>
  );
}
