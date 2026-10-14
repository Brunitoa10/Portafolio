import { Section } from "@/components/layout/Section";
import { getContact } from "@/lib/queries";
import { ContactLinkButton } from "./ContactLinkButton";

export async function Contact() {
  const { intro, links } = await getContact();

  return (
    <Section id="contacto" eyebrow="// 05 · contacto" title="Hablemos" align="center">
      <p className="contact-intro">{intro}</p>
      <div className="contact-links">
        {links.map((link, index) => (
          <ContactLinkButton key={`${link.label}-${index}`} {...link} />
        ))}
      </div>
    </Section>
  );
}
