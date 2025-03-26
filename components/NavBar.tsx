import Image from "next/image";
import "../styles/buttonStyles.css";
import "../styles/globals.css";
import DesktopMenu from "./menu/DesktopMenu";
import MobileMenu from "./menu/MobileMenu";

export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 flex justify-between items-center">
      <Image src={"https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMRTziLOnnMiqBA7EebgzNHDUo5lJWyXKIYCGR"} alt="Mi Portafolio" width={120} height={80} />
      <DesktopMenu />
      <MobileMenu />
    </nav>
  );
}
