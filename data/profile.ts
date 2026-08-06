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
  "Profesional de Tecnología con experiencia en soporte de infraestructura IT en entornos industriales de alta criticidad. Actualmente me desempeño como IT Field Service para Bunge Argentina a través de TIVIT, brindando soporte L1/L2/L3, Soporte a usuario, redes, coordinación de proveedores, Active Directory. Participo activamente en proyectos de migración de Data Center, planes de contingencia y mejoras de infraestructura, contribuyendo a la disponibilidad y continuidad operativa de los servicios tecnológicos. Complemento mi experiencia profesional con formación en Licenciatura en Ciencias de la Computación y una sólida vocación de servicio como rescatista voluntario",
];