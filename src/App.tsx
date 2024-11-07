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
                        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 dark:from-gray-800"
                        variants={sectionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <SceneContainer />
                        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                            <motion.h1
                                className="text-5xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {t("welcome")}
                            </motion.h1>
                            <motion.p
                                className="text-xl text-gray-600 dark:text-gray-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                {t("description")}
                            </motion.p>
                        </div>
                    </motion.section>

                    <motion.section
                        ref={sectionRefs.ongoing}
                        className="py-24 px-4 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-800"
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
                                {t("ongoing")}
                            </motion.h2>
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
                    </motion.section>

                    <motion.section
                        ref={sectionRefs.completed}
                        className="py-24 px-4 bg-gray-100 dark:bg-gray-800"
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
                                {t("completed")}
                            </motion.h2>
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
