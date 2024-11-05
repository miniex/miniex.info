import { TechStackCategory } from "@/types/data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TechStack: React.FC<{ categories: TechStackCategory[] }> = ({
    categories,
}) => {
    const [mounted, setMounted] = useState(false);
    const allTechnologies = categories.flatMap((category) =>
        category.technologies.map((tech) => ({
            ...tech,
            category: category.category,
        })),
    );

    useEffect(() => {
        setMounted(true);
    }, []);

    const generateSmoothPath = () => {
        // 더 부드러운 곡선 경로 생성
        const radius = 30; // 이동 반경 제한
        const points = Array.from({ length: 8 }, () => ({
            x: -radius + Math.random() * (radius * 2),
            y: -radius + Math.random() * (radius * 2),
        }));
        return points;
    };

    if (!mounted) {
        return null; // 초기 렌더링 시 깜빡임 방지
    }

    return (
        <div className="relative w-full h-full overflow-hidden">
            {allTechnologies.map((tech, index) => {
                const randomX = Math.random() * 60 + 20; // 중앙에 더 밀집되도록 조정
                const randomY = Math.random() * 60 + 20;
                const path = generateSmoothPath();
                const duration = 40 + Math.random() * 20; // 더 긴 애니메이션 주기
                const delay = -Math.random() * 40; // 더 다양한 시작 시점
                
                return (
                    <motion.div
                        key={`${tech.name}-${index}`}
                        className="absolute"
                        initial={{
                            left: `${randomX}%`,
                            top: `${randomY}%`,
                            scale: 0,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            x: path.map(p => p.x),
                            y: path.map(p => p.y),
                        }}
                        transition={{
                            scale: { duration: 0.5, delay: Math.abs(delay) * 0.1 },
                            opacity: { duration: 0.5, delay: Math.abs(delay) * 0.1 },
                            x: {
                                duration: duration,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                                delay: delay,
                            },
                            y: {
                                duration: duration,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                                delay: delay,
                            },
                        }}
                        drag
                        dragMomentum={false}
                        dragTransition={{ 
                            bounceStiffness: 300,
                            bounceDamping: 30 
                        }}
                        whileHover={{ scale: 1.3, zIndex: 10 }}
                    >
                        <div className="relative flex flex-col items-center gap-3 select-none">
                            <motion.div
                                className={`w-16 h-16 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:shadow-xl transition-all cursor-grab active:cursor-grabbing backdrop-blur-sm border border-gray-200 dark:border-gray-700 ${
                                    techColors[tech.name] || "text-gray-600 dark:text-gray-400"
                                }`}
                                whileHover={{
                                    rotate: 360,
                                    scale: 1.2,
                                    transition: { duration: 0.8 },
                                }}
                            >
                                <span className="text-2xl">
                                    {techIcons[tech.name] || tech.name.charAt(0)}
                                </span>
                            </motion.div>
                            <motion.div 
                                className="absolute top-20 px-3 py-1 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-md backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: Math.abs(delay) * 0.1 }}
                            >
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                                    {tech.name}
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default TechStack;

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

const techColors: { [key: string]: { bg: string; text: string } } = {
    React: { bg: "bg-[#2320232a]", text: "text-[#61DAFB]" },
    TypeScript: { bg: "bg-[#007ACC]", text: "text-white" },
    "Next.js": { bg: "bg-black", text: "text-white" },
    Rust: { bg: "bg-black", text: "text-white" },
    "Node.js": { bg: "bg-[#339933]", text: "text-white" },
    PostgreSQL: { bg: "bg-[#4169E1]", text: "text-white" },
    WebAssembly: { bg: "bg-[#654FF0]", text: "text-white" },
    Docker: { bg: "bg-[#2496ED]", text: "text-white" },
    "GitHub Actions": { bg: "bg-[#2088FF]", text: "text-white" },
    C: { bg: "bg-[#00599C]", text: "text-white" },
    "C++": { bg: "bg-[#00599C]", text: "text-white" },
    JavaScript: { bg: "bg-[#F7DF1E]", text: "text-[#323330]" },
    Python: { bg: "bg-[#3670A0]", text: "text-[#FFDD54]" },
    CUDA: { bg: "bg-black", text: "text-[#76B900]" },
    NPM: { bg: "bg-[#CB3837]", text: "text-white" },
    Yarn: { bg: "bg-[#2C8EBB]", text: "text-white" },
    PNPM: { bg: "bg-[#4a4a4a]", text: "text-[#f69220]" },
    Bun: { bg: "bg-black", text: "text-white" },
    Svelte: { bg: "bg-[#f1413d]", text: "text-white" },
    Vite: { bg: "bg-[#646CFF]", text: "text-white" },
    Tauri: { bg: "bg-[#24C8DB]", text: "text-white" },
    Git: { bg: "bg-[#F05033]", text: "text-white" },
    TailwindCSS: { bg: "bg-[#38B2AC]", text: "text-white" },
    SASS: { bg: "bg-[#CC6699]", text: "text-white" },
    MySQL: { bg: "bg-[#4479A1]", text: "text-white" },
    MariaDB: { bg: "bg-[#003545]", text: "text-white" },
    MongoDB: { bg: "bg-[#47A248]", text: "text-white" },
    Firebase: { bg: "bg-[#FFCA28]", text: "text-[#323330]" },
    Supabase: { bg: "bg-[#3ECF8E]", text: "text-white" },
    SurrealDB: { bg: "bg-[#FF00A0]", text: "text-white" },
    Nginx: { bg: "bg-[#009639]", text: "text-white" },
};

const techIcons: { [key: string]: JSX.Element } = {
    React: <SiReact className="text-[#61DAFB]" />,
    TypeScript: <SiTypescript className="text-[#007ACC]" />,
    "Next.js": <SiNextdotjs className="text-white" />,
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
    Bun: <SiBun className="text-white" />,
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
