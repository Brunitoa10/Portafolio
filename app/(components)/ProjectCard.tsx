interface ProjectProps {
    title: string;
    description: string;
  }
  
  export default function ProjectCard({ title, description }: ProjectProps) {
    return (
      <div className="p-4 border border-gray-700 rounded-lg">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    );
  }
  