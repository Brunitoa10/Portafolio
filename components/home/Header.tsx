"use client";

import TypingText from "@/components/animaciones/TypingText";
import { motion } from "framer-motion";

const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="mt-4"
  >
    <TypingText text="¡Hola! Soy Bruno Ariel Parisi" className="text-center" />
    <p className="text-lg mt-4">Técnico Informático y Desarrollador de Software</p>
  </motion.div>
);

export default Header;
