"use client";

import { MobileMenuButtonProps } from "@/types/Mobile/MobileMenuButtonProps";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";


export function MobileMenuButton({ open, onClick }: MobileMenuButtonProps) {
  return (
    <button onClick={onClick} className="text-white p-2 btn-navbar">
      {open ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
    </button>
  );
}
