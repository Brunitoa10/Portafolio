import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
  label: "Lenguajes & scripting",
  accent: "cyan",
  items: ["Python", "Bash / Shell", "Java", "JavaScript", "HTML · CSS", "ReactJS", "NextJS", "Typescript"],
},
{
  label: "Prácticas & patrones de diseño",
  accent: "green",
  items: ["SOLID", "Clean Code", "Design Patterns", "Repository", "Strategy", "Factory"],
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
    items: ["Linux (Mint · Kali)", "Git · GitHub", "Kali / OSINT ", "draw.io / Topología"],
  },
];
