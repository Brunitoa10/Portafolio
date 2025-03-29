"use client";

import { DesktopMenuList } from "./DesktopMenuList";

export default function DesktopMenu() {
  return (
    <div className="hidden lg:flex">
      <DesktopMenuList />
    </div>
  );
}
