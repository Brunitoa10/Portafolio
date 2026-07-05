import type { ContactLink } from "@/types";
import { createContactIcon } from "@/lib/contactIconFactory";

export function ContactLinkButton({ icon, label, href, external }: ContactLink) {
  return (
    <a href={href} className="clink" target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
      {createContactIcon(icon)}
      {label}
    </a>
  );
}
