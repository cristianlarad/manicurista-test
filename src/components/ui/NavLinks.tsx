"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../button";
const navItems = [
  { id: "1", label: "All", href: "/products" },
  { id: "2", label: "Ropa", href: "/categories/ropa" },
  { id: "3", label: "Ofertas", href: "/collections/ofertas" },
  { id: "4", label: "Nosotros", href: "/pages/nosotros" },
  { id: "5", label: "Blog", href: "https://blog.example.com", external: true },
];
export const NavLinks = () => {
  return (
    <nav className=" flex flex-col items-center md:flex-row gap-3">
      {navItems.map((item) => {
        const isExternal = item.external ?? false;

        return (
          <Link
            key={item.id}
            href={item.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "px-3 py-1 text-sm font-medium"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};
