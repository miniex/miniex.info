import { ProjectTranslation } from "@/types/data";
import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";

const ProjectCard: React.FC<{
    project: ProjectTranslation;
    index: number;
    setSelectedProject: (project: ProjectTranslation | null) => void;
}> = ({ project, index, setSelectedProject }) => {
    return (
        <motion.div
            className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-700">
                {project.image ? (
                    <img
                        src={project.image}
                        alt={project.title}
                        className="object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center">
                        <Globe className="w-12 h-12 text-gray-400" />
                    </div>
                )}
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, i) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                <motion.button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    View Details
                    <ExternalLink className="w-4 h-4" />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
