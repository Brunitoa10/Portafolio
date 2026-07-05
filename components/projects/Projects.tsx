import { Section } from "@/components/layout/Section";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
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
