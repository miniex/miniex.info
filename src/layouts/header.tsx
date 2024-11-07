import { SectionRefs } from "@/types/data";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Header: React.FC<{
    scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
    currentSection: string;
    toggleTheme: () => void;
    isDark: boolean;
    sectionRefs: SectionRefs;
}> = ({ scrollToSection, currentSection, sectionRefs }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const sections = [
        "intro",
        "ongoing",
        "completed",
        "skills",
        "career",
        "life",
    ];

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <nav className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <motion.div
                            className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="hidden sm:flex sm:space-x-8">
                                {sections.map((section) => (
                                    <motion.button
                                        key={section}
                                        onClick={() =>
                                            scrollToSection(
                                                sectionRefs[
                                                    section as keyof SectionRefs
                                                ],
                                            )
                                        }
                                        className={`
                      inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors
                      ${
                          currentSection === section
                              ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      }
                    `}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {t(section)}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="sm:hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {sections.map((section) => (
                                    <motion.button
                                        key={section}
                                        className={`
                      w-full px-3 py-2 rounded-md text-base font-medium
                      ${
                          currentSection === section
                              ? "bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400"
                              : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-400"
                      }
                    `}
                                        onClick={() => {
                                            scrollToSection(
                                                sectionRefs[
                                                    section as keyof SectionRefs
                                                ],
                                            );
                                            setIsOpen(false);
                                        }}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {t(section)}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};

export default Header;
