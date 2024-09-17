import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import {
    type ProjectTranslation,
    type CareerTranslation,
    type SectionRefs
} from "@/types/data";

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="language-selector">
            <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
            >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
            </select>
        </div>
    );
};

const Header: React.FC<{
    scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
}> = ({ scrollToSection }) => {
    const { t } = useTranslation();

    return (
        <header className="header">
            <nav className="nav-buttons">
                {["intro", "ongoing", "completed", "career"].map((section) => (
                    <button
                        key={section}
                    onClick={() => scrollToSection(sectionRefs[section as keyof SectionRefs])}>
                        {t(section)}
                    </button>
                ))}
            </nav>
        </header>
    );
};

const Project: React.FC<{
    project: ProjectTranslation;
}> = ({ project}) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <button onClick={() => setIsOpen(true)}>
                {t("projectDetails")}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                        >
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <ul>
                                {project.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>
                            <button onClick={() => setIsOpen(false)}>
                                {t("close")}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TimelineItem: React.FC<{ career: CareerTranslation }> = ({ career }) => {
    return (
        <div className="timeline-item">
            <div className="timeline-content">
                <h3>{career.title}</h3>
                <p>{career.description}</p>
                <p className="job-period">{career.period}</p>
            </div>
        </div>
    );
};

const sectionRefs: SectionRefs = {
    intro: React.createRef<HTMLElement>(),
    ongoing: React.createRef<HTMLElement>(),
    completed: React.createRef<HTMLElement>(),
    career: React.createRef<HTMLElement>(),
};

const App: React.FC = () => {
    const { t } = useTranslation();

    const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    };

    const ongoingProjects = t("ongoingProjects", {
        returnObjects: true,
    }) as ProjectTranslation[];
    const completedProjects = t("completedProjects", {
        returnObjects: true,
    }) as ProjectTranslation[];
    const careers = t("careers", {
        returnObjects: true,
    }) as CareerTranslation[];

    return (
        <div className="app">
            <Header scrollToSection={scrollToSection} />
            <LanguageSelector />

            <section ref={sectionRefs.intro} className="section intro-section">
                <h1>{t("welcome")}</h1>
                <p>{t("description")}</p>
            </section>

            <section
                ref={sectionRefs.ongoing}
                className="section ongoing-section"
            >
                <h2>{t("ongoing")}</h2>
                <div className="project-container">
{ongoingProjects.map((project, index) => (
    <Project key={index} project={project} />
))}
                </div>
            </section>

            <section
                ref={sectionRefs.completed}
                className="section completed-section"
            >
                <h2>{t("completed")}</h2>
                <div className="project-container">
{completedProjects.map((project, index) => (
    <Project key={index} project={project} />
))}
                </div>
            </section>

            <section
                ref={sectionRefs.career}
                className="section career-section"
            >
                <h2>{t("career")}</h2>
                <div className="timeline">
                    {careers.map((career, index) => (
                        <TimelineItem key={index} career={career} />
                    ))}
                </div>
            </section>

            <footer className="footer">
                <p>Copyright © 2024 - All rights reserved by Han Damin</p>
            </footer>
        </div>
    );
};

export default App;
