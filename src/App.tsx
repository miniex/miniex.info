import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    CareerTranslation,
    LifeEventTranslation,
    ProjectTranslation,
    SectionRefs,
    TechStackCategory,
} from "./types/data";

import Header from "./layouts/header";
import FloatingControls from "./layouts/floating-controls";
import SceneContainer from "./components/floating-geometry";
import ProjectCard from "./components/project-card";
import ProjectModal from "./components/project-modal";
import TechStack from "./components/tech-stack";
import {
    TimelineContainer,
    CareerTimelineItem,
    LifeTimelineItem,
} from "./components/timeline-container";

const App: React.FC = () => {
    const { t } = useTranslation();
    const [currentSection, setCurrentSection] = useState("intro");
    const [selectedProject, setSelectedProject] =
        useState<ProjectTranslation | null>(null);
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                return savedTheme === "dark";
            }
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    const sectionRefs: SectionRefs = {
        intro: useRef<HTMLElement>(null),
        ongoing: useRef<HTMLElement>(null),
        completed: useRef<HTMLElement>(null),
        career: useRef<HTMLElement>(null),
        life: useRef<HTMLElement>(null),
        skills: useRef<HTMLElement>(null),
    };

    const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        setCurrentSection(id);
                    }
                });
            },
            { threshold: 0.5 },
        );

        Object.entries(sectionRefs).forEach(([key, ref]) => {
            if (ref.current) {
                ref.current.id = key;
                observer.observe(ref.current);
            }
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
            setIsDark(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    const ongoingProjects = t("ongoingProjects", {
        returnObjects: true,
    }) as ProjectTranslation[];
    const completedProjects = t("completedProjects", {
        returnObjects: true,
    }) as ProjectTranslation[];
    const techStack = t("techStack", {
        returnObjects: true,
    }) as TechStackCategory[];
    const lifeEvents = t("lifeEvents", {
        returnObjects: true,
    }) as LifeEventTranslation[];
    const careers = t("careers", {
        returnObjects: true,
    }) as CareerTranslation[];

    const sectionVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.6 } },
        exit: { opacity: 0 },
    };

    return (
        <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
            <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
                <FloatingControls isDark={isDark} toggleTheme={toggleTheme} />
                <Header
                    scrollToSection={scrollToSection}
                    currentSection={currentSection}
                    toggleTheme={toggleTheme}
                    isDark={isDark}
                    sectionRefs={sectionRefs}
                />

                <main className="pt-16">
                    <motion.section
                        ref={sectionRefs.intro}
                        className="relative h-screen flex items-center justify-center overflow-hidden"
                        variants={sectionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {/* Background with animated gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-secondary-50 via-secondary-100 to-primary-50 dark:from-secondary-900 dark:via-secondary-800 dark:to-primary-900/30 animate-gradient bg-[length:200%_200%]"></div>
                        
                        {/* Subtle patterns */}
                        <div className="absolute inset-0 bg-dotted-pattern opacity-20 dark:opacity-10"></div>
                        
                        {/* 3D Objects */}
                        <div className="absolute inset-0 z-0">
                            <SceneContainer />
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                            <motion.div
                                className="mb-6 inline-block"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                            >
                                <span className="px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 text-sm font-medium border border-primary-200 dark:border-primary-700 shadow-sm">
                                    HandaMin Portfolio
                                </span>
                            </motion.div>
                            
                            <motion.h1
                                className="text-5xl sm:text-7xl font-bold mb-6 font-display"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="text-secondary-900 dark:text-white">{t("welcome").split(" ")[0]} </span>
                                <span className="animated-gradient-text">{t("welcome").split(" ").slice(1).join(" ")}</span>
                            </motion.h1>
                            
                            <motion.p
                                className="text-xl text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                {t("description")}
                            </motion.p>
                            
                            <motion.div
                                className="mt-10 flex flex-wrap justify-center gap-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <motion.button
                                    className="button-primary px-6 py-3"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => scrollToSection(sectionRefs.ongoing)}
                                >
                                    Explore Projects
                                </motion.button>
                                <motion.button
                                    className="button-secondary px-6 py-3"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => scrollToSection(sectionRefs.skills)}
                                >
                                    View Skills
                                </motion.button>
                            </motion.div>
                        </div>
                        
                        {/* Scroll indicator */}
                        <motion.div 
                            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 1 }}
                        >
                            <motion.div 
                                className="w-6 h-10 rounded-full border-2 border-secondary-400 dark:border-secondary-600 flex justify-center pt-2"
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                            >
                                <motion.div className="w-1 h-2 rounded-full bg-secondary-400 dark:bg-secondary-600" />
                            </motion.div>
                        </motion.div>
                    </motion.section>

                    <motion.section
                        ref={sectionRefs.ongoing}
                        className="py-24 px-4 relative overflow-hidden"
                        variants={sectionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {/* Background with subtle gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-secondary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-800"></div>
                        
                        {/* Section content */}
                        <div className="relative z-10 max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                
                                <motion.h2
                                    className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white relative inline-block pb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    {t("ongoing")}
                                    <motion.span 
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-32 bg-primary-500 dark:bg-primary-400 rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 128 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                    />
                                </motion.h2>
                                
                                <motion.p
                                    className="mt-6 max-w-2xl mx-auto text-secondary-600 dark:text-secondary-400"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Projects I'm currently working on and actively developing.
                                </motion.p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {ongoingProjects.map((project, index) => (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                        index={index}
                                        setSelectedProject={setSelectedProject}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="hidden lg:block absolute top-20 right-0 w-64 h-64 bg-gradient-radial from-primary-300/20 to-transparent dark:from-primary-600/10 rounded-full transform translate-x-1/3"></div>
                    </motion.section>

                    <motion.section
                        ref={sectionRefs.completed}
                        className="py-24 px-4 relative overflow-hidden"
                        variants={sectionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {/* Background with subtle gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-secondary-100 to-secondary-200 dark:from-secondary-800 dark:to-secondary-900"></div>
                        
                        {/* Section content */}
                        <div className="relative z-10 max-w-7xl mx-auto">
                            <div className="text-center mb-16">
                                
                                <motion.h2
                                    className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white relative inline-block pb-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    {t("completed")}
                                    <motion.span 
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-32 bg-accent-teal rounded-full"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: 128 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3, duration: 0.8 }}
                                    />
                                </motion.h2>
                                
                                <motion.p
                                    className="mt-6 max-w-2xl mx-auto text-secondary-600 dark:text-secondary-400"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Projects I've successfully completed and delivered.
                                </motion.p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {completedProjects.map((project, index) => (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                        index={index}
                                        setSelectedProject={setSelectedProject}
                                    />
                                ))}
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="hidden lg:block absolute bottom-20 left-0 w-80 h-80 bg-gradient-radial from-accent-teal/10 to-transparent rounded-full transform -translate-x-1/3"></div>
                    </motion.section>

                    <motion.section
                        ref={sectionRefs.skills}
                        className="relative min-h-screen py-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
                        variants={sectionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <motion.h2
                            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {t("skills")}
                        </motion.h2>
                        <TechStack categories={techStack} />
                    </motion.section>

                    <motion.section
                        ref={sectionRefs.career}
                        className="py-24 px-4 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900"
                        variants={sectionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <div className="max-w-7xl mx-auto">
                            <motion.h2
                                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                {t("career")}
                            </motion.h2>
                            <TimelineContainer>
                                {careers.map((career, index) => (
                                    <CareerTimelineItem
                                        key={index}
                                        career={career}
                                        index={index}
                                    />
                                ))}
                            </TimelineContainer>
                        </div>
                    </motion.section>

                    <motion.section
                        ref={sectionRefs.life}
                        className="py-24 px-4 bg-gray-200 dark:bg-gray-900"
                        variants={sectionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <div className="max-w-7xl mx-auto">
                            <motion.h2
                                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center mb-16"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                {t("life")}
                            </motion.h2>
                            <TimelineContainer>
                                {lifeEvents.map((event, index) => (
                                    <LifeTimelineItem
                                        key={index}
                                        event={event}
                                        index={index}
                                    />
                                ))}
                            </TimelineContainer>
                        </div>
                    </motion.section>
                </main>

                <AnimatePresence>
                    {selectedProject && (
                        <ProjectModal
                            project={selectedProject}
                            onClose={() => setSelectedProject(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default App;
