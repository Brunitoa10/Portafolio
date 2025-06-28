import { NextResponse } from "next/server";

export async function GET() {
  const trayectoria = [
    {
      titulo: "Licenciatura en computacion",
      empresa: "Universidad Nacional Del Sur",
      fecha: "2019 - Presente",
    },
    {
      titulo: "Exorcisethat: Hacking Etico: Offensive and Defensive",
      empresa: "Exorcisethat Global Cybersecurity",
      fecha: "2024",
    },
    {
      titulo: "Asistente en Informatica",
      empresa: "Escuela de educacion secundaria N1 - Dr. Adolfo Alsina",
      fecha: "2016 - 2018",
    },
    {
      titulo: "Bachiller en Economia y Administracion",
      empresa: "Escuela de educacion secundaria N1 - Dr. Adolfo Alsina",
      fecha: "2013 - 2018",
    },
  ];

  return NextResponse.json(trayectoria);
}
