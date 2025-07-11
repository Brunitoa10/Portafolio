export async function GET() {
    const proyectos = [
      {
        titulo: "2048",
        fecha: "2025",
        descripcion: "El 2048 es un juego de puzzle y estrategia cuyo objetivo es lanzar y combinar bloques numerados para crear bloques de mayor valor y ganar puntos.",
        tecnologias: "ReactJS | Prolog",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMAH8A8haMH9LS2DlPq0zO6UvGstWhQRj1KgVZ",
        sitioWeb: " ",
        github: "https://github.com/Brunitoa10/2048",
      },
      {
        titulo: "DISO|Digital Solutions",
        fecha: "2024",
        descripcion: "Plataforma innovadora para la transformación digital de negocios.",
        tecnologias: "ReactJS",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMkG7dBHLNkI2ca9r5BSOYR3LiTw86CqAnVMPl",
        sitioWeb: "https://diso-digital-solutions-web-react.vercel.app/",
        github: "https://github.com/Brunitoa10/DISO_DigitalSolutions_webReact",
      },
      {
        titulo: "DriveNow Car",
        fecha: "2025",
        descripcion: "DriveNow Car es una aplicación de alquiler de coches fácil de usar, que permite a los usuarios buscar, reservar y pagar vehículos de manera rápida y segura. Con una interfaz moderna y la integración de Stripe, ofrece una experiencia de alquiler sin complicaciones, ideal para viajes de negocios o placer.",
        tecnologias: "Nextjs | Prisma | Neon | TailwendCSS",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMfTjGElCp0PVuIMB1XzsKrgEaURnekj2JoiOH",
        sitioWeb: "https://drive-now-rental-car.vercel.app/",
        github: "https://github.com/Brunitoa10/DriveNow-RentalCar",
      },
      {
        titulo: "CV",
        fecha: "2023",
        descripcion: "Modelo curriculum vitae",
        tecnologias: "JavaScript | CSS",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMU2PXECvk6Wjf0VO9oLngBADyEh4F2cd3maJl",
        sitioWeb: "https://cv-eight-virid.vercel.app/",
        github: "https://github.com/Brunitoa10/CV",
      },
      {
        titulo: "Super Marios Bros",
        fecha: "2024",
        descripcion: "Una versión mejorada del clásico Super Mario Bros, desarrollada con una arquitectura modular y optimizada. Se implementó un modo alternativo que introduce nuevos enemigos, mecánicas y desafíos, ofreciendo una experiencia renovada para los jugadores. 🚀🎮",
        tecnologias: "Java",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMMxjmqyDUbVtj15lOygxdPfar3FSe42KnWvAc",
        sitioWeb: "",
        github: "https://github.com/Brunitoa10/SuperMarioBros",
      },
      {
        titulo: "Cuenta Bancaria",
        fecha: "2023",
        descripcion: "Permite realizar operaciones como depósitos, retiros y transferencias",
        tecnologias: "Java",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMegFvDScOrLbFwRoPmBkSN8TgEXVI4KaZJjn2",
        sitioWeb: "",
        github: "https://github.com/Brunitoa10/CuentaBancaria",
      },
      {
        titulo: "Gestion de Directorios",
        fecha: "2023",
        descripcion: "Carpeta Documentos de Windows",
        tecnologias: "Java",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMmkqLKL4sfNeRYm09CHuyFnwhjlPLIgDv3A4E",
        sitioWeb: "",
        github: "https://github.com/Brunitoa10/Gestion_de_Directorios",
      },
      {
        titulo: "Cuenta Palabras",
        fecha: "2024",
        descripcion: "Cuenta repeticiones de palabras y palabras mas usadas",
        tecnologias: "C",
        foto: "https://ckmtz7p1az.ufs.sh/f/vQEgSxK0T6XMTFXdUXyOcXC9v3myMUbQgxIqKi4NlaZ8t6Ao",
        sitioWeb: "",
        github: "https://github.com/Brunitoa10/CuentaPalabras",
      },
    ];
  
    return new Response(JSON.stringify(proyectos), { status: 200 });
  }
  