import { ProjectTranslation } from "@/types/data";
import { motion } from "framer-motion";
import { Github, Globe, MapPin, X, Calendar, Clock, Tag, ChevronRight, FileText, Code } from "lucide-react";

const ProjectModal: React.FC<{
    project: ProjectTranslation | null;
    onClose: () => void;
}> = ({ project, onClose }) => {
    if (!project) return null;

    // Status badge styling based on project status
    const getStatusStyles = (status: string) => {
        switch (status) {
            case "active":
                return "bg-accent-emerald/90 text-white border-accent-emerald/50 shadow-md shadow-accent-emerald/10";
            case "planning":
                return "bg-accent-amber/90 text-white border-accent-amber/50 shadow-md shadow-accent-amber/10";
            case "completed":
                return "bg-accent-purple/90 text-white border-accent-purple/50 shadow-md shadow-accent-purple/10";
            default:
                return "bg-secondary-500/80 text-white border-secondary-500/50 shadow-md";
        }
    };

    // Info badge styling (for year, duration, etc)
    const getInfoBadgeStyles = () => {
        return "bg-secondary-800/70 text-white border border-secondary-700/50 shadow-md shadow-secondary-900/10 backdrop-blur-sm";
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Backdrop with blur effect */}
            <motion.div
                className="absolute inset-0 bg-secondary-900/70 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            {/* Modal container */}
            <motion.div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl border border-secondary-200/30 dark:border-secondary-700/30"
                initial={{ scale: 0.95, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 40, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                {/* Close button */}
                <motion.button
                    className="absolute top-4 right-4 p-2 z-20 rounded-full bg-white/90 dark:bg-secondary-800/90 text-secondary-500 dark:text-secondary-400 border border-secondary-200/70 dark:border-secondary-700/70 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors shadow-md backdrop-blur-sm"
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className="w-5 h-5" />
                </motion.button>

                {/* Hero header with image background */}
                {project.image ? (
                    <div className="relative h-72 sm:h-96">
                        {/* Background gradient overlay */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/70 to-secondary-900/30 z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        />

                        {/* Background image */}
                        <motion.div className="absolute inset-0 overflow-hidden">
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                initial={{ scale: 1.1, filter: "blur(8px)" }}
                                animate={{ scale: 1, filter: "blur(0px)" }}
                                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            />
                        </motion.div>

                        {/* Decorative elements */}
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-secondary-900/50 to-transparent z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        />

                        <motion.div
                            className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-gradient-radial from-primary-500/30 to-transparent blur-xl z-5"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.4, duration: 1 }}
                        />

                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                            {/* Project metadata badges */}
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                {project.status && (
                                    <motion.span
                                        className={`badge border px-3 py-1.5 ${getStatusStyles(project.status)}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        {project.status}
                                    </motion.span>
                                )}
                                {project.year && (
                                    <motion.span
                                        className={`badge inline-flex items-center gap-1.5 ${getInfoBadgeStyles()}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.35 }}
                                    >
                                        <Calendar className="w-3 h-3" />
                                        {project.year}
                                    </motion.span>
                                )}
                                {project.duration && (
                                    <motion.span
                                        className={`badge inline-flex items-center gap-1.5 ${getInfoBadgeStyles()}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <Clock className="w-3 h-3" />
                                        {project.duration}
                                    </motion.span>
                                )}
                                {project.category && (
                                    <motion.span
                                        className={`badge inline-flex items-center gap-1.5 ${getInfoBadgeStyles()}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.45 }}
                                    >
                                        <Tag className="w-3 h-3" />
                                        {project.category}
                                    </motion.span>
                                )}
                            </div>

                            {/* Project title */}
                            <motion.h2
                                className="text-3xl sm:text-4xl font-bold text-white mb-3 font-display tracking-tight text-shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                {project.title}
                            </motion.h2>

                            {/* Short description */}
                            <motion.p
                                className="text-white/90 max-w-3xl text-shadow-sm"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                            >
                                {project.description.split('.')[0] + '.'}
                            </motion.p>
                        </div>
                    </div>
                ) : (
                    <div className="relative p-6 sm:p-8 glass-card rounded-t-2xl border-b border-secondary-200 dark:border-secondary-700/60 bg-secondary-50 dark:bg-secondary-800/80">
                        {/* Decorative elements for no-image header */}
                        <motion.div
                            className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-radial from-primary-500/10 to-transparent opacity-60 blur-xl -z-10"
                            animate={{
                                scale: [1, 1.1, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{ duration: 8, repeat: Infinity }}
                        />

                        <motion.h2
                            className="text-3xl font-bold text-secondary-900 dark:text-white mb-3 font-display"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {project.title}
                        </motion.h2>

                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            {project.status && (
                                <motion.span
                                    className={`badge border ${project.status === "active"
                                        ? "bg-accent-emerald/20 text-accent-emerald border-accent-emerald/30"
                                        : project.status === "planning"
                                            ? "bg-accent-amber/20 text-accent-amber border-accent-amber/30"
                                            : project.status === "completed"
                                                ? "bg-accent-purple/20 text-accent-purple border-accent-purple/30"
                                                : "bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300"
                                        }`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.15 }}
                                >
                                    {project.status}
                                </motion.span>
                            )}
                            {project.year && (
                                <motion.span
                                    className="badge bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 inline-flex items-center gap-1.5 border border-secondary-200 dark:border-secondary-700/50"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Calendar className="w-3 h-3" />
                                    {project.year}
                                </motion.span>
                            )}
                            {project.category && (
                                <motion.span
                                    className="badge bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 inline-flex items-center gap-1.5 border border-secondary-200 dark:border-secondary-700/50"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.25 }}
                                >
                                    <Tag className="w-3 h-3" />
                                    {project.category}
                                </motion.span>
                            )}
                        </div>

                        <motion.p
                            className="text-secondary-600 dark:text-secondary-300 max-w-3xl"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            {project.description.split('.')[0] + '.'}
                        </motion.p>
                    </div>
                )}

                {/* Content section with scroll */}
                <div className="max-h-[50vh] overflow-y-auto bg-white dark:bg-secondary-900 shadow-inner-soft">
                    <div className="p-6 sm:p-8 prose dark:prose-invert max-w-none">
                        {/* Rest of description if not shown in header */}
                        {project.description.split('.').length > 1 && (
                            <motion.p
                                className="text-secondary-700 dark:text-secondary-300 text-lg"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {project.description.split('.').slice(1).join('.')}
                            </motion.p>
                        )}

                        <div className="space-y-10 mt-8">
                            {/* Technologies section */}
                            {project.technologies && project.technologies.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-3 border-b border-secondary-200 dark:border-secondary-700/60 pb-2">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-500 dark:text-primary-400 shadow-sm">
                                            <Code className="w-5 h-5" />
                                        </div>
                                        <span>Technologies</span>
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, i) => (
                                            <motion.span
                                                key={i}
                                                className="badge bg-primary-50/90 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border border-primary-100 dark:border-primary-800/70 shadow-sm hover:shadow-md hover:shadow-primary-500/10"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.5 + (i * 0.05) }}
                                                whileHover={{ y: -2 }}
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Key Features section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-3 border-b border-secondary-200 dark:border-secondary-700/60 pb-2">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-teal/20 text-accent-teal shadow-sm">
                                        <span className="text-lg">✨</span>
                                    </div>
                                    <span>Key Features</span>
                                </h3>
                                <div className="space-y-4">
                                    {project.details.map((detail, i) => (
                                        <motion.div
                                            key={i}
                                            className="bg-secondary-50/80 dark:bg-secondary-800/40 rounded-xl border border-secondary-100 dark:border-secondary-700/50 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.6 + (i * 0.1) }}
                                        >
                                            <div className="flex items-center gap-4 p-4">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center text-secondary-600 dark:text-secondary-300 font-medium shadow-sm">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                                                        {detail}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Additional information (if available) */}
                            {project.challenges && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4 flex items-center gap-3 border-b border-secondary-200 dark:border-secondary-700/60 pb-2">
                                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-amber/20 text-accent-amber shadow-sm">
                                            <span className="text-lg">🔥</span>
                                        </div>
                                        <span>Challenges & Solutions</span>
                                    </h3>
                                    <div className="bg-secondary-50/80 dark:bg-secondary-800/40 rounded-xl border border-secondary-100 dark:border-secondary-700/50 p-4 shadow-sm">
                                        <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
                                            {project.challenges}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Action links footer */}
                {project.links && (
                    <motion.div
                        className="p-5 sm:p-6 border-t border-secondary-200 dark:border-secondary-700/60 bg-gradient-to-b from-secondary-50 to-white dark:from-secondary-800/50 dark:to-secondary-900/80 shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="flex flex-wrap gap-4">
                            {project.links.github && (
                                <motion.a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button-secondary bg-secondary-900 dark:bg-secondary-700 text-white dark:text-secondary-100 hover:bg-secondary-800 dark:hover:bg-secondary-600 border-secondary-800 dark:border-secondary-600 shadow-md hover:shadow-lg hover:shadow-secondary-900/10 flex-1 sm:flex-initial justify-center sm:min-w-[160px]"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Github className="w-4 h-4" />
                                    <span>GitHub Repository</span>
                                </motion.a>
                            )}
                            {project.links.live && (
                                <motion.a
                                    href={project.links.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button-primary shadow-md hover:shadow-lg hover:shadow-primary-500/20 flex-1 sm:flex-initial justify-center sm:min-w-[160px]"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Globe className="w-4 h-4" />
                                    <span>Visit Live Site</span>
                                    <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
                                </motion.a>
                            )}
                            {project.links?.address && (
                                <motion.a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(project.links.address)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button-accent shadow-md hover:shadow-lg hover:shadow-accent-teal/20 flex-1 sm:flex-initial justify-center sm:min-w-[160px]"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <MapPin className="w-4 h-4" />
                                    <span>View Location</span>
                                </motion.a>
                            )}
                            {project.links?.documentation && (
                                <motion.a
                                    href={project.links.documentation}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button-secondary shadow-sm hover:shadow-md flex-1 sm:flex-initial justify-center sm:min-w-[160px]"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <FileText className="w-4 h-4" />
                                    <span>Documentation</span>
                                </motion.a>
                            )}
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default ProjectModal;
