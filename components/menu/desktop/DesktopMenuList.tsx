"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import menuItems from "../menuItems";

export function DesktopMenuList() {
  return (
    <Stack direction="row" spacing={2} justifyContent="center">
      {menuItems.map(({ label, path }) => (
        <Button key={path} variant="outlined" color="primary" component={Link} href={path} className="btn-navbar">
          {label}
        </Button>
      ))}
    </Stack>
  );
}
