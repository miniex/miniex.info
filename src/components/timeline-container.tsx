import { CareerTranslation, LifeEventTranslation } from "@/types/data";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const TimelineContainer: React.FC<{
    children: React.ReactNode;
    className?: string;
}> = ({ children, className = "" }) => {
    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}
        >
            {children}
        </div>
    );
};

// CareerTimelineItem 수정
const CareerTimelineItem: React.FC<{
    career: CareerTranslation;
    index: number;
}> = ({ career, index }) => {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-full"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <motion.div
                        className="w-3 h-3 bg-indigo-600 dark:bg-indigo-400 rounded-full flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                    />
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        {career.period}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {career.title}
                </h3>
                <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-1">
                    {career.company}
                </h4>
                <div className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                    <span>{career.location}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                    {career.description}
                </p>
            </motion.div>
        </motion.div>
    );
};

const LifeTimelineItem: React.FC<{
    event: LifeEventTranslation;
    index: number;
}> = ({ event, index }) => {
    return (
        <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
        >
            <motion.div
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg h-full"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className="flex items-center gap-3 mb-4">
                    <motion.div
                        className="w-3 h-3 bg-pink-500 dark:bg-pink-400 rounded-full flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                    />
                    <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                        {event.date}
                    </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {event.title}
                </h3>
                {event.location && (
                    <div className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                        <span>{event.location}</span>
                    </div>
                )}
                <p className="text-gray-600 dark:text-gray-300 mt-4">
                    {event.description}
                </p>
                {event.links && event.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {event.links.map((link, i) => (
                            <motion.a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 hover:bg-pink-100 dark:bg-pink-900 dark:hover:bg-pink-800 text-pink-600 dark:text-pink-400 rounded-lg text-sm transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Globe className="w-4 h-4" />
                                {link.label || "Visit"}
                            </motion.a>
                        ))}
                    </div>
                )}
                {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {event.tags.map((tag, i) => (
                            <span
                                key={i}
                                className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export { TimelineContainer, CareerTimelineItem, LifeTimelineItem };
