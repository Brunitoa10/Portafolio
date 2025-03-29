"use client";

import TypingText from "@/components/animaciones/TypingText";
import MotivoDesarrollador from "@/components/motivoContratarme/MotivoDesarrollador/MotivoDesarrollador";
import MotivoTecnico from "@/components/motivoContratarme/MotivoTecnico/MotivoTecnico";
import AboutMe from "@/components/sobreMi/AboutMe";
import { motion } from "framer-motion";

const ContentSections = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="mt-4"
  >
    <AboutMe />
    <MotivoTecnico />
    <MotivoDesarrollador />
    <TypingText
      text="La tecnología avanza con ideas, pero solo se transforma en equipo. 🚀"
      className="text-center text-xl sm:text-2xl mx-4 sm:mx-auto p-4 sm:p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105"
    />
  </motion.div>
);

export default ContentSections;
