"use client";

import { MobileMenuListProps } from "@/types/Mobile/MobileMenuListProps";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import Link from "next/link";
import { menuVariants } from "../../animaciones/animationsMenuMobile";
import menuItems from "../menuItems";



export function MobileMenuList({ open, closeMenu }: MobileMenuListProps) {
  return (
    <motion.div
      variants={menuVariants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="absolute top-16 left-0 w-full bg-gray-900 p-4 z-50 rounded-md shadow-lg overflow-hidden"
    >
      <Stack direction="column" spacing={2}>
        {menuItems.map(({ label, path }) => (
          <Button
            key={path}
            variant="outlined"
            color="primary"
            component={Link}
            href={path}
            className="btn-navbar"
            onClick={closeMenu}
          >
            {label}
          </Button>
        ))}
      </Stack>
    </motion.div>
  );
}
