import { ProjectTranslation } from "@/types/data";
import { motion } from "framer-motion";
import { Github, Globe, MapPin, X } from "lucide-react";

const ProjectModal: React.FC<{
    project: ProjectTranslation | null;
    onClose: () => void;
}> = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            <motion.div
                className="relative bg-white dark:bg-gray-800 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl mx-4"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
            >
                <div className="p-6 sm:p-8">
                    <motion.button
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={onClose}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </motion.button>

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        {project.title}
                    </h2>

                    {project.image && (
                        <div className="aspect-w-16 aspect-h-9 mb-6 rounded-xl overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="object-cover"
                            />
                        </div>
                    )}

                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {project.description}
                    </p>

                    <div className="space-y-6">
                        {project.technologies &&
                            project.technologies.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                        Technologies
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-sm font-medium bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Key Features
                            </h3>
                            <ul className="space-y-3">
                                {project.details.map((detail, i) => (
                                    <motion.li
                                        key={i}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                                        <span className="text-gray-600 dark:text-gray-300">
                                            {detail}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        {project.links && (
                            <div className="flex gap-4">
                                {project.links.github && (
                                    <motion.a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Github className="w-4 h-4" />
                                        View Code
                                    </motion.a>
                                )}
                                {project.links.live && (
                                    <motion.a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Globe className="w-4 h-4" />
                                        Live Demo
                                    </motion.a>
                                )}
                                {project.links?.address && (
                                    <motion.a
                                        href={`https://maps.google.com/?q=${encodeURIComponent(project.links.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <MapPin className="w-4 h-4" />
                                        View Location
                                    </motion.a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
