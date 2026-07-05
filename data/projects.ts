import type { Project } from "@/types";

export const projects: Project[] = [
  {
    name: "FieldNet",
    icon: "📡",
    wide: true,
    linkLabel: "⌥ GitHub",
    href: "https://github.com/TU_USUARIO/fieldnet",
    description:
      "Herramienta de monitoreo de red para la planta industrial de Bunge. Visualiza topología en tiempo real, detecta dispositivos caídos y genera alertas. Stack Python + Bash + Java + HTML. Portfolio piece & utility real.",
    tags: [
      { label: "Python", accent: "green" },
      { label: "Bash", accent: "green" },
      { label: "Networking", accent: "cyan" },
      { label: "Java", accent: "cyan" },
      { label: "HTML", accent: "green" },
    ],
  },
  {
    name: "prometeo",
    icon: "🔥",
    linkLabel: "⌥ GitHub",
    href: "https://github.com/TU_USUARIO/prometeo",
    description:
      "Repo personal de herramientas IT. Scripts de automatización, utilidades de red y diagnóstico para entornos de campo. Filosofía: production-ready desde el día uno.",
    tags: [
      { label: "Python", accent: "green" },
      { label: "Bash", accent: "green" },
      { label: "Open Source", accent: "cyan" },
    ],
  },
  {
    name: "Topología de Red — Bunge BB",
    icon: "🗺️",
    description:
      "Documentación visual completa de la infraestructura: NOC, oficinas, piso de producción, calado de camiones y garita. Vista técnica y para usuarios finales.",
    tags: [
      { label: "draw.io", accent: "cyan" },
      { label: "Networking", accent: "green" },
      { label: "Documentación", accent: "cyan" },
    ],
  },
  {
    name: "Inventario App",
    icon: "📦",
    description:
      "Sistema de gestión de inventario IT con QR, escaneo de barras, exportación a Excel e historial de movimientos. Inspirado en PowerApps, construido en React.",
    tags: [
      { label: "React", accent: "green" },
      { label: "JavaScript", accent: "cyan" },
      { label: "Excel", accent: "green" },
    ],
  },
  {
    name: "Kali Security Lab",
    icon: "🔐",
    description:
      "Lab de hacking ético sobre Linux Mint con Docker. Configuración de theHarvester, Sherlock, recon-ng, Kismet y macchanger para OSINT y análisis de red.",
    tags: [
      { label: "Kali", accent: "green" },
      { label: "Docker", accent: "cyan" },
      { label: "OSINT", accent: "green" },
    ],
  },
];
