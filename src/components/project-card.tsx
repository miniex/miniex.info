import { ProjectTranslation } from "@/types/data";
import { motion } from "framer-motion";
import { Globe, Calendar, ArrowRight, GitBranch, Star } from "lucide-react";

const ProjectCard: React.FC<{
    project: ProjectTranslation;
    index: number;
    setSelectedProject: (project: ProjectTranslation | null) => void;
}> = ({ project, index, setSelectedProject }) => {
    // Card hover animation variants
    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.1, 0.25, 1.0] // Smooth easing function
            }
        },
        hover: {
            y: -8,
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05)",
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    // Badge color based on status
    const getStatusStyles = (status: string) => {
        switch (status) {
            case "active":
                return "bg-accent-emerald/90 text-white border-accent-emerald/50 shadow-sm shadow-accent-emerald/20";
            case "planning":
                return "bg-accent-amber/90 text-white border-accent-amber/50 shadow-sm shadow-accent-amber/20";
            case "completed":
                return "bg-accent-purple/90 text-white border-accent-purple/50 shadow-sm shadow-accent-purple/20";
            default:
                return "bg-secondary-500/90 text-white border-secondary-500/50";
        }
    };

    return (
        <motion.div
            className="group relative glass-card overflow-hidden transform-gpu border border-secondary-200/70 dark:border-secondary-700/70"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Image with overlay gradient */}
            <div className="relative aspect-w-16 aspect-h-9 bg-secondary-100 dark:bg-secondary-800 overflow-hidden">
                {project.image ? (
                    <>
                        <img
                            src={project.image}
                            alt={project.title}
                            className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/90 via-secondary-900/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300" />

                        {/* Decorative elements */}
                        <motion.div
                            className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-radial from-primary-500/20 to-transparent blur-xl"
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 0.8 }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        />
                    </>
                ) : (
                    <div className="flex items-center justify-center bg-gradient-to-br from-primary-500/10 via-accent-purple/10 to-accent-amber/10 dark:from-primary-800/20 dark:via-accent-purple/20 dark:to-accent-teal/20">
                        <div className="relative">
                            <div className="absolute inset-0 blur-xl opacity-40 animate-pulse-slow bg-gradient-radial from-primary-400/30 to-transparent"></div>
                            <Globe className="relative w-16 h-16 text-secondary-500 dark:text-secondary-600" />
                        </div>
                    </div>
                )}

                {/* Project title overlay */}
                {project.image && (
                    <div className="absolute bottom-0 left-0 right-0 p-5 flex justify-between items-end z-10">
                        <motion.h3
                            className="text-xl font-semibold text-white drop-shadow-md"
                            initial={{ opacity: 0.8, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {project.title}
                        </motion.h3>
                        {project.year && (
                            <div className="flex items-center text-white/80 text-sm bg-secondary-900/50 px-2 py-1 rounded-md backdrop-blur-sm">
                                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                <span>{project.year}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="p-6">
                {/* Only show title if no image */}
                {!project.image && (
                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                        {project.title}
                    </h3>
                )}

                <p className="text-secondary-600 dark:text-secondary-300 mb-5 line-clamp-2 leading-relaxed">
                    {project.description}
                </p>

                {/* Technology tags */}
                {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                            <motion.span
                                key={i}
                                className="badge bg-primary-50/80 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-800/70 shadow-sm hover:shadow-md hover:shadow-primary-500/10 hover:-translate-y-0.5"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 + (i * 0.05) }}
                                whileHover={{ y: -2 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                        {project.technologies.length > 3 && (
                            <motion.span
                                className="badge bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-400 border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-200 dark:hover:bg-secondary-700 hover:shadow-sm"
                                whileHover={{ y: -2 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                +{project.technologies.length - 3}
                            </motion.span>
                        )}
                    </div>
                )}

                {/* Stats row - optional */}
                {(project.links?.github || project.category) && (
                    <div className="flex items-center gap-4 mb-5 text-xs text-secondary-500 dark:text-secondary-400">
                        {project.links?.github && (
                            <div className="flex items-center gap-1.5">
                                <GitBranch className="w-3.5 h-3.5" />
                                <span>GitHub</span>
                            </div>
                        )}
                        {project.category && (
                            <div className="flex items-center gap-1.5">
                                <Star className="w-3.5 h-3.5" />
                                <span>{project.category}</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Action button */}
                <div className="flex justify-between items-center">
                    <motion.button
                        onClick={() => setSelectedProject(project)}
                        className="button-primary group/btn shadow-md shadow-primary-500/10"
                        whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(99, 102, 241, 0.2)" }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </motion.button>

                    {/* Quick links */}
                    {project.links && (
                        <div className="flex space-x-2">
                            {project.links.live && (
                                <motion.a
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button-icon shadow-sm"
                                    aria-label="Visit live site"
                                    title="Visit live site"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Globe className="w-4 h-4" />
                                </motion.a>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Status indicator */}
            {project.status && (
                <motion.div
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(project.status)}`}
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2 + (index * 0.05), duration: 0.3 }}
                >
                    {project.status}
                </motion.div>
            )}
        </motion.div>
    );
};

export default ProjectCard;
