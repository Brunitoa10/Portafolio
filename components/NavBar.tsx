import Image from "next/image";
import Link from "next/link";
import "../styles/buttonStyles.css";
import "../styles/globals.css";
import DesktopMenu from "./menu/desktop/DesktopMenu";
import MobileMenu from "./menu/mobile/MobileMenu";


export default function Navbar() {
  return (
    <nav className="p-4 bg-gray-800 flex justify-between items-center">
      <Link href="/">
        <Image
          src="https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMRTziLOnnMiqBA7EebgzNHDUo5lJWyXKIYCGR"
          alt="Mi Portafolio"
          width={120}
          height={80}
          className="cursor-pointer block"
        />
      </Link>
      <DesktopMenu />
      <MobileMenu />
    </nav>
  );
}
