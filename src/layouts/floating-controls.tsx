import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Settings, X } from "lucide-react";

const FloatingControls: React.FC<{
    isDark: boolean;
    toggleTheme: () => void;
}> = ({ isDark, toggleTheme }) => {
    const { i18n } = useTranslation();
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

    const languages = [
        { code: "ko", label: "한국어", flag: "🇰🇷" },
        { code: "en", label: "English", flag: "🇺🇸" },
        { code: "ja", label: "日本語", flag: "🇯🇵" },
    ];

    const handleLanguageChange = (code: string) => {
        i18n.changeLanguage(code);
        setIsSettingsOpen(false);
    };

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    return (
        <div className="fixed bottom-0 right-0 z-50 p-4 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isSettingsOpen && (
                    <motion.div
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div className="p-2 flex flex-col gap-1">
                            {/* Theme Toggle */}
                            <motion.button
                                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                                whileHover={{ x: 5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={toggleTheme}
                            >
                                <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                    {isDark ? (
                                        <Moon className="w-5 h-5 text-indigo-500" />
                                    ) : (
                                        <Sun className="w-5 h-5 text-amber-500" />
                                    )}
                                </div>
                                <span className="min-w-[100px]">
                                    {isDark ? "Dark Mode" : "Light Mode"}
                                </span>
                            </motion.button>

                            {/* Divider */}
                            <div className="h-px bg-gray-200 dark:bg-gray-700 mx-2" />

                            {/* Language Options */}
                            {languages.map((lang) => (
                                <motion.button
                                    key={lang.code}
                                    className={`flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors ${
                                        i18n.language === lang.code
                                            ? "bg-indigo-50 dark:bg-indigo-900/50"
                                            : ""
                                    }`}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                        handleLanguageChange(lang.code)
                                    }
                                >
                                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <span className="text-lg">
                                            {lang.flag}
                                        </span>
                                    </div>
                                    <span className="min-w-[100px]">
                                        {lang.label}
                                    </span>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                className={`p-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-colors ${
                    isSettingsOpen ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                aria-label="Settings"
            >
                {isSettingsOpen ? (
                    <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                    <Settings className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
            </motion.button>
        </div>
    );
};

export default FloatingControls;
