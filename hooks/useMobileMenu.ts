import { useState } from "react";

export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  
  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return { open, toggleMenu, closeMenu };
}
