import ExperienciaProfesional from "@/components/experienciaProfesional/ExperienciaProfesional";
import TrayectoriaAcademica from "@/components/trayectoriaAcademica/TrayectoriaAcademica";
export default function sobreMi() {
    return (
      <section className="text-center py-20">
          <div className="max-w-3xl mx-auto py-10">
            <h2 className="text-3xl font-bold text-center mb-8">Sobre Mí</h2>
            <ExperienciaProfesional />
            <TrayectoriaAcademica />
          </div>
      </section>
    );
  }
  