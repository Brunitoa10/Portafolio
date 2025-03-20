import { Urbanist } from "next/font/google";
import "../styles/buttonStyles.css";
import "../styles/globals.css";
import Footer from "./(components)/Footer";
import Navbar from "./(components)/NavBar";

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
});

export const metadata = {
  title: "Portafolio :: Bruno Ariel Parisi",
  description: "Mi portafolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={urbanist.variable}>
      <body className="antialiased">
        <Navbar />
        <main className="container mx-auto px-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
