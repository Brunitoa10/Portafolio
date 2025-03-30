import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import { Urbanist } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "../styles/buttonStyles.css";
import "../styles/globals.css";


const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata = {
  title: "Portafolio :: Bruno Ariel Parisi",
  description: "Mi portafolio",
  icons: {
    icon: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XM2F8slaM4xvP7wSNldWTM805QfOtoYFaKzEkR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="es" className={urbanist.variable}>
      <body className="antialiased">
      <NextTopLoader showSpinner={false} color="#00FFFF" />
        <Navbar />
        <main className="container mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
