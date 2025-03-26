"use client";

import TypingText from "@/components/animaciones/TypingText";
import MotivoDesarrollador from "@/components/motivoContratarme/MotivoDesarrollador";
import MotivoTecnico from "@/components/motivoContratarme/MotivoTecnico";
import { motion } from "framer-motion";
import Image from "next/image";
import AboutMe from "./AboutMe";


export default function Hero() {
  return (
    <section className="text-center py-20 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-4"
      >
        <TypingText text="¡Hola! Soy Bruno Ariel Parisi" className="text-center" />
        <p className="text-lg mt-4">Técnico Informático y Desarrollador de Software</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative w-80 h-80 mt-8"
      >
        <Image
          className="max-w-3xl mx-auto p-8 rounded-lg shadow-xl transform transition duration-500 hover:scale-105"
          src="https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMoBmdzZ3hm2KRntxrYiBsJaQULebA9XZG43Ev"
          alt="Foto de Bruno Ariel Parisi"
          fill
          priority
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-4"
      >
       <AboutMe />
       <MotivoTecnico />
       <MotivoDesarrollador />
      </motion.div>
     
    </section>
  );
}