import type { Profile, StatItem } from "@/types";

/**
 * Single source of truth for hero/profile copy.
 * Swapping this file is enough to re-brand the whole hero section.
 */
export const profile: Profile = {
  name: "Ariel Parisi",
  highlightedName: "Bruno",
  role: "IT Field JR · Bahía Blanca, ARG",
  location: "Bahía Blanca, Argentina",
  tagline: "// disponible para nuevos desafíos",
  description:
    "Soporte e infraestructura de red en entornos industriales críticos. " +
    "Estudiante de Lic. en Cs. de la Computación (UNS). " +
    "Construyo mis propias herramientas de IT.",
};

export const stats: StatItem[] = [
  { value: "L2/3", label: "soporte técnico avanzado" },
  { value: "UNS", label: "Lic. en Cs. de la Computación" },
  { value: "1+", label: "año en infraestructura IT" },
  { value: "24/7", label: "entorno industrial crítico" },
];

export const aboutParagraphs: string[] = [
  "**IT Field JR** en Bahía Blanca. Trabajo en la planta industrial de Bunge Argentina bajo TIVIT, cubriendo soporte L1/L2/L3, Active Directory, topología de red, coordinación con proveedores de infraestructura y soporte de usuario.",
  "Sistemas críticos de planta, margen de error mínimo: una fibra mal empalmada o un enlace caído pueden frenar una línea de producción entera. Ese contexto me formó en diagnóstico rápido, resolución bajo presión y documentación rigurosa.",
  "Participé en la **migración del data center**, el diseño de **planes de contingencia de red** y proyectos de mejora continua para la planta, manteniendo siempre un **cumplimiento consistente de volumetría de tickets** — priorizando calidad de resolución sobre velocidad bruta.",
  "Fuera del campo, soy **rescatista voluntario**: búsqueda y rescate, socorrismo, rescate en altura y búsqueda de personas en grandes áreas.",
  "Estudio **Licenciatura en Ciencias de la Computación** para fortalecer mi perfil profesional, y construyo herramientas propias para automatizar, monitorear y entender mejor los sistemas que administro.",
];