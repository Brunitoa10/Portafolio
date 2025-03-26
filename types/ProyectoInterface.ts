export interface ProyectoInterface {
  titulo: string;
  fecha: string;
  descripcion: string;
  foto: string;
  sitioWeb: string;
  github: string;
  tecnologias: string;
}

export interface ProjectCardItemProps {
  proyecto: ProyectoInterface;
  index: number;
}