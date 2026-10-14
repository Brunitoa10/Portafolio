import { Section } from "@/components/layout/Section";
import { getProjects } from "@/lib/queries";
import { ProjectCard } from "./ProjectCard";

export async function Projects() {
  const projects = await getProjects();

  return (
    <Section id="proyectos" eyebrow="// 03 · proyectos" title="Lo que construí">
      <div className="projects-layout">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </Section>
  );
}