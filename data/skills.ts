import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    label: "Lenguajes & scripting",
    accent: "green",
    items: ["Python", "Bash / Shell", "Java", "JavaScript", "HTML · CSS"],
  },
  {
    label: "Infraestructura & redes",
    accent: "cyan",
    items: [
      "Active Directory / GPO",
      "Networking · VLANs",
      "Cisco IOS",
      "Wireshark",
      "TCP/IP · DNS · DHCP",
    ],
  },
  {
    label: "Sistemas & herramientas",
    accent: "green",
    items: ["Linux (Mint · Kali)", "Docker", "Git · GitHub", "Kali / OSINT", "draw.io / Topología"],
  },
];
