"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const ImageSection = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    className="relative w-80 h-100 mt-8"
  >
    <Image
      className="max-w-3xl mx-auto p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105"
      src="https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XM4MAjSc8if9ZHzkpua84PeXFOngwGd6msEUQR"
      alt="Foto de Bruno Ariel Parisi"
      fill
      priority
    />
  </motion.div>
);

export default ImageSection;
