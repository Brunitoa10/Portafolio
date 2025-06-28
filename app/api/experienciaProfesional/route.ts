import { NextResponse } from "next/server";

export async function GET() {
  const experiencias = [
     {
      titulo: "Soporte tecnico en infraestructura escolar",
      institucion: "Voluntariado",
      fecha: "2025",
    }, 
    {
      titulo: "Mantenimiento y actualización Notebooks UNS",
      institucion: "Voluntariado",
      fecha: "2025",
    }, 
     {
      titulo: "Soporte Tecnico Tablets",
      institucion: "Voluntariado",
      fecha: "2025",
    }, 
    {
      titulo: "Pagina web ONG presente",
      institucion: "Voluntariado",
      fecha: "2025",
    }, 
    {
      titulo: "Desarrollador Freelance",
      institucion: "Automatización comentarios y likes en X",
      fecha: "2025",
    }, 
   {
      titulo: "Tecnico Informatico Autonomo",
      institucion: "Armado, Mantenimiento y Optimizacion de pc’s",
      fecha: "2015 - 2019",
    },
    {
      titulo: "Soporte Tecnico",
      institucion: "Biblioteca Popular Juan Bautista Alberdi - Saavedra",
      fecha: "2016 - 2018",
    },
  ];

  return NextResponse.json(experiencias);
}
