import { Suspense } from "react";
import { NavLinks } from "./NavLinks";
import { UserMenuContainer } from "./UserMenuContainer";
import { CartNavItem } from "./CartNavItem";
import { MobileMenu } from "./MobileMenu";

export const Nav = () => {
  return (
    <nav className="flex w-full gap-4 lg:gap-6" aria-label="Main navigation">
      <ul className="hidden gap-4 overflow-x-auto whitespace-nowrap md:flex lg:gap-8 lg:px-0">
        <NavLinks />
      </ul>
      <div className="ml-auto flex items-center justify-center gap-4 whitespace-nowrap lg:gap-8">
        <Suspense fallback={<div className="w-8" />}>
          <UserMenuContainer />
        </Suspense>
      </div>
      <div className="flex items-center gap-1.5">
        <Suspense fallback={<div className="w-6" />}>
          <CartNavItem />
        </Suspense>
        <Suspense>
          <MobileMenu>
            <NavLinks />
          </MobileMenu>
        </Suspense>
      </div>
    </nav>
  );
};
