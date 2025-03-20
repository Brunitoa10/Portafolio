"use client";

import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { menuVariants } from "../animaciones/animationsMenuMobile";
import menuItems from "./menuItems";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button onClick={() => setOpen(!open)} className="text-white p-2 btn-navbar">
        {open ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
      </button>

      <motion.div
        variants={menuVariants}
        initial="hidden"
        animate={open ? "visible" : "hidden"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute top-16 left-0 w-full bg-gray-900 p-4 rounded-md shadow-lg overflow-hidden"
      >
        <Stack direction="column" spacing={2}>
          {menuItems.map(({ label, path }) => (
            <Button key={path}  variant="outlined"  color="primary" component={Link}  href={path} className="btn-navbar"  onClick={() => setOpen(false)}>
              {label}
            </Button>
          ))}
        </Stack>
      </motion.div>
    </div>
  );
}
