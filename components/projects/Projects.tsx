import { Section } from "@/components/layout/Section";
import { getProjects } from "@/lib/queries";
import { ProjectsGrid } from "./ProjectsGrid";

export async function Projects() {
  const projects = await getProjects();

  return (
    <Section id="proyectos" eyebrow="// 03 · proyectos" title="Lo que construí">
      <ProjectsGrid projects={projects} />
    </Section>
  );
}
