"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../dropdown-menu"; // ← ajusta la ruta según tu estructura
import { useMobileMenu } from "./useMobileMenu";
import type { ReactNode } from "react";
import { Menu } from "lucide-react";

type Props = {
  children: ReactNode;
};

export const MobileMenu = ({ children }: Props) => {
  const { isOpen, openMenu, closeMenu } = useMobileMenu();

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(open) => (open ? openMenu() : closeMenu())}
    >
      <DropdownMenuTrigger asChild>
        <Menu
          className="h-6 w-6 cursor-pointer md:hidden"
          aria-label="Abrir menú"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-[300px] p-0 z-50  shadow border "
        id="mobile-menu"
      >
        {/* Navigation Items */}
        <ul className="flex flex-col divide-y divide-neutral-200 whitespace-nowrap px-3 pb-3 pt-0 sm:px-8 sm:pt-0 [&>li]:py-3">
          {children}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
