export interface ProjectTranslation {
    title: string;
    description: string;
    details: string[];
    technologies?: string[];
    links?: {
        github?: string;
        live?: string;
        address?: string;
        documentation?: string;
    };
    image?: string;
    status?: string;
    year?: string;
    duration?: string;
    category?: string;
    challenges?: string;
}

export interface CareerTranslation {
    title: string;
    description: string;
    period: string;
    company: string;
    location: string;
}

export interface TranslationFile {
    intro: string;
    ongoing: string;
    completed: string;
    timeline: string;
    career: string;
    welcome: string;
    description: string;
    viewProjects: string;
    projectDetails: string;
    close: string;
    ongoingProjects: ProjectTranslation[];
    completedProjects: ProjectTranslation[];
    careers: CareerTranslation[];
}

export interface LifeEventTranslation {
    title: string;
    description: string;
    date: string;
    location?: string;
    links?: {
        url?: string;
        label?: string;
    }[];
    tags?: string[];
}

export interface TechStackCategory {
    category: string;
    order?: number;
    technologies: {
        name: string;
        level?: number;
        icon?: string;
        related?: string[];
        x?: number;
        y?: number;
    }[];
}

export interface SectionRefs {
    [key: string]: RefObject<HTMLElement>;
}
