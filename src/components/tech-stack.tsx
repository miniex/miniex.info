import { TechStackCategory } from "@/types/data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import React from "react";

const TechStack: React.FC<{ categories: TechStackCategory[] }> = ({
    categories,
}) => {
    const [mounted, setMounted] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const sortedCategories = [...categories].sort((a, b) => (a.order || 99) - (b.order || 99));

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCategoryClick = (category: string) => {
        setActiveCategory(activeCategory === category ? null : category);
    };

    if (!mounted) {
        return null; // Prevent flash on initial render
    }

    return (
        <div className="mx-auto max-w-7xl px-4">
            {/* Category filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {sortedCategories.map((category) => (
                    <motion.button
                        key={category.category}
                        onClick={() => handleCategoryClick(category.category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border 
                            ${activeCategory === category.category
                                ? "bg-primary-500 text-white border-primary-600 shadow-md"
                                : "bg-white/80 dark:bg-secondary-800/80 text-secondary-700 dark:text-secondary-300 border-secondary-200 dark:border-secondary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400"
                            }
                        `}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            scale: activeCategory === category.category ? 1.05 : 1
                        }}
                    >
                        {category.category}
                    </motion.button>
                ))}
                {activeCategory && (
                    <motion.button
                        onClick={() => setActiveCategory(null)}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 border border-secondary-300 dark:border-secondary-600 hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-all duration-300"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        Show All
                    </motion.button>
                )}
            </div>

            {/* Tech grid display */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 bg-white/70 dark:bg-secondary-800/70 backdrop-blur-md rounded-2xl border border-secondary-200/50 dark:border-secondary-700/50 shadow-soft p-6 sm:p-8">
                {sortedCategories.map((category) => {
                    // Only show this category if no category is selected or this is the selected category
                    if (activeCategory && category.category !== activeCategory) {
                        return null;
                    }

                    return (
                        <React.Fragment key={category.category}>
                            {/* Category heading - only show if all categories are visible */}
                            {!activeCategory && (
                                <motion.div
                                    className="col-span-full my-4 first:mt-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h3 className="text-lg font-semibold text-secondary-900 dark:text-white border-b border-secondary-200 dark:border-secondary-700/50 pb-2 mb-4 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400 inline-block"></span>
                                        {category.category}
                                    </h3>
                                </motion.div>
                            )}

                            {/* Technology items */}
                            {category.technologies.map((tech, techIndex) => (
                                <motion.div
                                    key={`${category.category}-${tech.name}`}
                                    className="feature-card h-full p-0 overflow-hidden hover-lift"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: techIndex * 0.05 }}
                                    whileHover={{ scale: 1.03 }}
                                >
                                    <div className="p-5">
                                        <div className="flex items-center gap-3 mb-3">
                                            {/* Tech icon */}
                                            <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 shadow-sm border border-primary-100 dark:border-primary-800/60">
                                                <span className="text-xl">
                                                    {techIcons[tech.name] || tech.name.charAt(0)}
                                                </span>
                                            </div>

                                            {/* Tech name */}
                                            <h4 className="text-base font-semibold text-secondary-900 dark:text-white leading-snug">
                                                {tech.name}
                                            </h4>
                                        </div>

                                        {/* Skill level indicator */}
                                        {tech.level && (
                                            <div className="mt-3 mb-1">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-secondary-500 dark:text-secondary-400">Proficiency</span>
                                                    <span className="font-medium text-primary-600 dark:text-primary-400">{tech.level}/10</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-secondary-100 dark:bg-secondary-700/60 rounded-full overflow-hidden">
                                                    <motion.div
                                                        className={`h-full ${tech.level >= 8
                                                            ? "bg-primary-500 dark:bg-primary-400"
                                                            : tech.level >= 5
                                                                ? "bg-accent-teal"
                                                                : "bg-accent-amber"
                                                            }`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${tech.level * 10}%` }}
                                                        transition={{ duration: 0.5, delay: 0.2 }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Related technologies tags */}
                                        {tech.related && tech.related.length > 0 && (
                                            <div className="mt-3 flex flex-wrap gap-1.5">
                                                {tech.related.map((related, i) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs py-0.5 px-1.5 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded"
                                                    >
                                                        {related}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

import {
    SiReact,
    SiTypescript,
    SiNextdotjs,
    SiNodedotjs,
    SiPostgresql,
    SiWebassembly,
    SiDocker,
    SiGithubactions,
    SiRust,
    SiC,
    SiCplusplus,
    SiPython,
    SiJavascript,
    SiNvidia,
    SiNpm,
    SiYarn,
    SiPnpm,
    SiBun,
    SiSvelte,
    SiVite,
    SiTauri,
    SiGit,
    SiTailwindcss,
    SiSass,
    SiMysql,
    SiMariadb,
    SiMongodb,
    SiFirebase,
    SiSupabase,
    SiSurrealdb,
    SiNginx,
} from "react-icons/si";

const techIcons: { [key: string]: JSX.Element } = {
    React: <SiReact className="text-[#61DAFB]" />,
    TypeScript: <SiTypescript className="text-[#007ACC]" />,
    "Next.js": <SiNextdotjs className="text-white dark:text-white" />,
    Rust: <SiRust className="text-[#FF4A00]" />,
    "Node.js": <SiNodedotjs className="text-[#339933]" />,
    PostgreSQL: <SiPostgresql className="text-[#4169E1]" />,
    WebAssembly: <SiWebassembly className="text-[#654FF0]" />,
    Docker: <SiDocker className="text-[#2496ED]" />,
    "GitHub Actions": <SiGithubactions className="text-[#2088FF]" />,
    C: <SiC className="text-[#00599C]" />,
    "C++": <SiCplusplus className="text-[#00599C]" />,
    JavaScript: <SiJavascript className="text-[#F7DF1E]" />,
    Python: <SiPython className="text-[#3776AB]" />,
    CUDA: <SiNvidia className="text-[#76B900]" />,
    NPM: <SiNpm className="text-[#CB3837]" />,
    Yarn: <SiYarn className="text-[#2C8EBB]" />,
    PNPM: <SiPnpm className="text-[#f69220]" />,
    Bun: <SiBun className="text-black dark:text-white" />,
    Svelte: <SiSvelte className="text-[#FF3E00]" />,
    Vite: <SiVite className="text-[#646CFF]" />,
    Tauri: <SiTauri className="text-[#FFC131]" />,
    Git: <SiGit className="text-[#F05032]" />,
    TailwindCSS: <SiTailwindcss className="text-[#06B6D4]" />,
    SASS: <SiSass className="text-[#CC6699]" />,
    MySQL: <SiMysql className="text-[#4479A1]" />,
    MariaDB: <SiMariadb className="text-[#003545]" />,
    MongoDB: <SiMongodb className="text-[#47A248]" />,
    Firebase: <SiFirebase className="text-[#FFCA28]" />,
    Supabase: <SiSupabase className="text-[#3ECF8E]" />,
    SurrealDB: <SiSurrealdb className="text-[#FF00A0]" />,
    Nginx: <SiNginx className="text-[#009639]" />,
};

export default TechStack;
