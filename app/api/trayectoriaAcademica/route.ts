import { NextResponse } from "next/server";

export async function GET() {
  const trayectoria = [
    {
      titulo: "Tecnico Informatico Autonomo",
      institucion: "Autonomo",
      fecha: "2015 - 2019",
    },
    {
      titulo: "Soporte Tecnico",
      institucion: "Biblioteca Popular Juan Bautista Alberdi - Saavedra",
      fecha: "2016 - 2018",
    },
  ];

  return NextResponse.json(trayectoria);
}
