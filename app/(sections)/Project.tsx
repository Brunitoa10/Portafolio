import ProjectCard from "@/app/(components)/ProjectCard";

const projects = [
  { title: "Proyecto 1", description: "Descripción breve del proyecto 1" },
  { title: "Proyecto 2", description: "Descripción breve del proyecto 2" },
];

export default function Projects() {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-6">Mis Proyectos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
}
