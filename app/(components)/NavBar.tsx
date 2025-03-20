import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";


export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800">
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href="/"
          className="btn-navbar"
        >
          Inicio
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href="/sobreMi"
          className="btn-navbar"
        >
          Sobre mí
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href="/proyectos"
          className="btn-navbar"
        >
          Proyectos
        </Button>
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          href="/contacto"
          className="btn-navbar"
        >
          Contacto
        </Button>
      </Stack>
    </nav>
  );
}
