import type { ReactElement } from "react";
import type { ContactIconName } from "@/types";
import { EmailIcon, GithubIcon, LinkedinIcon } from "@/components/icons/ContactIcons";

/**
 * Factory pattern: callers ask for an icon by name and get back the
 * rendered element, without knowing (or importing) the concrete SVG markup.
 * Returning an already-rendered element (instead of a component reference
 * picked at render time) keeps React's identity per render stable.
 */
const iconFactory: Record<ContactIconName, () => ReactElement> = {
  github: () => <GithubIcon />,
  email: () => <EmailIcon />,
  linkedin: () => <LinkedinIcon />,
};

export function createContactIcon(name: ContactIconName): ReactElement {
  return iconFactory[name]();
}
