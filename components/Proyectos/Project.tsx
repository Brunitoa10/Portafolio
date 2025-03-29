import ProjectCard from "@/components/Proyectos/ProjectCard";

export default function Projects() {
  return (
    <section className="py-10">
      <h1 className="text-2xl font-semibold mb-6">Mis Proyectos</h1>
      <div className="flex justify-center">
        <ProjectCard />
      </div>
    </section>
  );
}
