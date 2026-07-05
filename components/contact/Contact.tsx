import { Section } from "@/components/layout/Section";
import { contactIntro, contactLinks } from "@/data/contact";
import { ContactLinkButton } from "./ContactLinkButton";

export function Contact() {
  return (
    <Section id="contacto" eyebrow="// 05 · contacto" title="Hablemos" align="center">
      <p className="contact-intro">{contactIntro}</p>
      <div className="contact-links">
        {contactLinks.map((link) => (
          <ContactLinkButton key={link.label} {...link} />
        ))}
      </div>
    </Section>
  );
}
