import type { Profile, StatItem } from "@/types";

/**
 * Single source of truth for hero/profile copy.
 * Swapping this file is enough to re-brand the whole hero section.
 */
export const profile: Profile = {
  name: "Ariel Parisi",
  highlightedName: "Bruno",
  role: "IT Field Specialist · Bahía Blanca, ARG",
  location: "Bahía Blanca, Argentina",
  tagline: "// disponible para nuevos desafíos",
  description:
    "Infraestructura, redes y soporte en entornos industriales críticos. " +
    "Estudiante de Licenciatura en Cs. de la Computación — UNS. " +
    "Builder de herramientas IT propias.",
};

export const stats: StatItem[] = [
  { value: "L3", label: "soporte técnico avanzado" },
  { value: "UNS", label: "Licenciatura en Cs. de la Computación" },
  { value: "4+", label: "años en infraestructura IT" },
  { value: "24/7", label: "entorno industrial crítico" },
];

export const aboutParagraphs: string[] = [
  "**IT Field Specialist** con base en Bahía Blanca. Actualmente opero en la planta industrial de Bunge Argentina bajo TIVIT, cubriendo soporte L1/L2/L3, Active Directory, topología de red y coordinación con proveedores de infraestructura.",
  "Mi día a día transcurre en sistemas críticos donde un cable mal patcheado puede frenar una línea de producción entera. Ese contexto me formó con una **mentalidad de diagnóstico rápido** y documentación rigurosa.",
  "Fuera del campo, estudio **Licenciatura en Ciencias de la Computación** en la UNS y construyo herramientas propias para automatizar, monitorear y entender mejor los sistemas que administro.",
];
