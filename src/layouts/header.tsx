import { SectionRefs } from "@/types/data";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown, Moon, Sun, Github } from "lucide-react";

const Header: React.FC<{
    scrollToSection: (ref: React.RefObject<HTMLElement>) => void;
    currentSection: string;
    toggleTheme: () => void;
    isDark: boolean;
    sectionRefs: SectionRefs;
}> = ({ scrollToSection, currentSection, toggleTheme, isDark, sectionRefs }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { t } = useTranslation();
    const sections = [
        "intro",
        "ongoing",
        "completed",
        "skills",
        "career",
        "life",
    ];

    // Add scroll listener to change header style when scrolled
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigation item variants
    const navItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 + (i * 0.05),
                duration: 0.3,
                ease: [0.25, 0.1, 0.25, 1.0],
            },
        }),
        hover: { y: -2, transition: { duration: 0.2 } },
        tap: { scale: 0.95 },
    };

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'
                }`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <nav className={`glass-card border-none shadow-none ${scrolled ? 'shadow-soft backdrop-blur-md bg-white/90 dark:bg-secondary-900/90' : 'bg-white/60 dark:bg-secondary-900/60 backdrop-blur-sm'
                }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo/Brand */}
                        <motion.div
                            className="flex-shrink-0 flex items-center"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative">
                                <motion.div
                                    className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-purple opacity-75 blur-sm"
                                    animate={{
                                        opacity: [0.5, 0.8, 0.5],
                                        scale: [0.95, 1.05, 0.95],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "mirror"
                                    }}
                                />
                                <span className="relative font-display font-bold text-xl text-white dark:text-white bg-gradient-to-r from-primary-600 to-accent-purple px-4 py-1.5 rounded-full border border-primary-400/20 dark:border-primary-500/30 shadow-sm">
                                    Han Damin
                                </span>
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden sm:flex sm:items-center gap-8">
                            <motion.div
                                className="flex space-x-1 bg-secondary-100/50 dark:bg-secondary-800/50 rounded-full p-1 border border-secondary-200/50 dark:border-secondary-700/50 backdrop-blur-sm shadow-inner-soft"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.5 }}
                            >
                                {sections.map((section, i) => (
                                    <motion.button
                                        key={section}
                                        custom={i}
                                        variants={navItemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        whileHover="hover"
                                        whileTap="tap"
                                        onClick={() =>
                                            scrollToSection(
                                                sectionRefs[
                                                section as keyof SectionRefs
                                                ],
                                            )
                                        }
                                        className={`
                                            relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                            ${currentSection === section
                                                ? "text-primary-700 dark:text-primary-300 bg-white dark:bg-secondary-700 shadow-sm"
                                                : "text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400"
                                            }
                                        `}
                                    >
                                        {t(section)}
                                        {currentSection === section && (
                                            <motion.span
                                                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary-500 dark:bg-primary-400 rounded-full"
                                                layoutId="navIndicator"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                    </motion.button>
                                ))}
                            </motion.div>

                            {/* Theme toggle and other actions */}
                            <motion.div
                                className="flex items-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <motion.button
                                    onClick={toggleTheme}
                                    className="button-icon"
                                    whileHover={{ scale: 1.1, rotate: 15 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Toggle dark mode"
                                >
                                    {isDark ? (
                                        <Sun className="w-5 h-5" />
                                    ) : (
                                        <Moon className="w-5 h-5" />
                                    )}
                                </motion.button>

                                <motion.a
                                    href="https://github.com/miniex"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="button-icon"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="GitHub Profile"
                                >
                                    <Github className="w-5 h-5" />
                                </motion.a>
                            </motion.div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="flex items-center gap-4 sm:hidden">
                            <motion.button
                                onClick={toggleTheme}
                                className="button-icon"
                                whileHover={{ scale: 1.1, rotate: 15 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Toggle dark mode"
                            >
                                {isDark ? (
                                    <Sun className="w-5 h-5" />
                                ) : (
                                    <Moon className="w-5 h-5" />
                                )}
                            </motion.button>

                            <motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                className="button-icon"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={isOpen ? "Close menu" : "Open menu"}
                            >
                                <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
                                {isOpen ? (
                                    <X className="h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Menu className="h-6 w-6" aria-hidden="true" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className="sm:hidden glass-card border-t border-secondary-200 dark:border-secondary-700/50 rounded-none rounded-b-2xl overflow-hidden shadow-md"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        >
                            <div className="px-4 py-3 space-y-2">
                                {sections.map((section, index) => (
                                    <motion.button
                                        key={section}
                                        className={`
                                            w-full px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between
                                            ${currentSection === section
                                                ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-sm"
                                                : "text-secondary-600 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800/60"
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
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span>{t(section)}</span>
                                        {currentSection === section && (
                                            <motion.div
                                                className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-800/50"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring" }}
                                            >
                                                <ChevronDown className="h-4 w-4 text-primary-500 dark:text-primary-400" />
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}

                                <div className="pt-2 pb-1 mt-2 border-t border-secondary-200 dark:border-secondary-700/50">
                                    <a
                                        href="https://github.com/miniex"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-3 text-secondary-600 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400"
                                    >
                                        <Github className="w-5 h-5" />
                                        <span>GitHub Profile</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
};

export default Header;
