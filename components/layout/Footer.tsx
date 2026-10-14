import { getSettings } from "@/lib/queries";

export async function Footer() {
  const { footerText } = await getSettings();

  return <footer>{footerText}</footer>;
}
