export async function GET() {
    const proyectos = [
      {
        titulo: "DISO|Digital Solutions",
        fecha: "2024",
        descripcion: "Landing Page informacion de servicios",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMkG7dBHLNkI2ca9r5BSOYR3LiTw86CqAnVMPl",
        sitioWeb: "https://diso-digital-solutions-web-react.vercel.app/",
        github: "https://github.com/Brunitoa10/DISO_DigitalSolutions_webReact",
      },
      {
        titulo: "DriveNow Car",
        fecha: "2025",
        descripcion: "Web para rentar coches",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMfTjGElCp0PVuIMB1XzsKrgEaURnekj2JoiOH",
        sitioWeb: "https://drive-now-rental-car.vercel.app/",
        github: "https://github.com/Brunitoa10/DriveNow-RentalCar",
      },
      {
        titulo: "CV",
        fecha: "2023",
        descripcion: "Modelo curriculum vitae",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMU2PXECvk6Wjf0VO9oLngBADyEh4F2cd3maJl",
        sitioWeb: "https://cv-eight-virid.vercel.app/",
        github: "https://github.com/Brunitoa10/CV",
      },
      {
        titulo: "Super Marios Bros",
        fecha: "2024",
        descripcion: "Juego Super Mario Bros con dos estilos de juegos en Java, SIN SITIO WEB",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMMxjmqyDUbVtj15lOygxdPfar3FSe42KnWvAc",
        sitioWeb: "",
        github: "https://github.com/Brunitoa10/SuperMarioBros",
      },
      {
        titulo: "Cuenta Bancaria",
        fecha: "2024",
        descripcion: "Simulador Cuenta Bancaria , SIN SITIO WEB",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMegFvDScOrLbFwRoPmBkSN8TgEXVI4KaZJjn2",
        sitioWeb: "",
        github: "https://github.com/Brunitoa10/CuentaBancaria",
      },
      {
        titulo: "Gestion de Directorios",
        fecha: "2024",
        descripcion: "Carpeta Documentos de Windows en Java, SIN SITIO WEB",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMmkqLKL4sfNeRYm09CHuyFnwhjlPLIgDv3A4E",
        sitioWeb: "",
        github: "https://github.com/Brunitoa10/Gestion_de_Directorios",
      },
      {
        titulo: "Cuenta Palabras",
        fecha: "2024",
        descripcion: "Cuenta repeticiones de palabras y palabras mas usadas en C, SIN SITIO WEB",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMTFXdUXyOcXC9v3myMUbQgxIqKi4NlaZ8t6Ao",
        sitioWeb: "",
        github: "https://github.com/Brunitoa10/CuentaPalabras",
      },
    ];
  
    return new Response(JSON.stringify(proyectos), { status: 200 });
  }
  