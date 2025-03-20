export type MenuItem = {
    label: string;
    path: string;
  };
  
  const menuItems: MenuItem[] = [
    { label: "Inicio", path: "/" },
    { label: "Sobre mí", path: "/sobreMi" },
    { label: "Proyectos", path: "/proyectos" },
    { label: "Contacto", path: "/contacto" },
    { label: "CV", path: "/CV" }
  ];
  
  export default menuItems;
  