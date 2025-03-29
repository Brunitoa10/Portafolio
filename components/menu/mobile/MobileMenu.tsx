"use client";

import { useMobileMenu } from "@/hooks/useMobileMenu";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileMenuList } from "./MobileMenuList";

export default function MobileMenu() {
  const { open, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <div className="lg:hidden">
      <MobileMenuButton open={open} onClick={toggleMenu} />
      <MobileMenuList open={open} closeMenu={closeMenu} />
    </div>
  );
}
