export interface ProjectTranslation {
    title: string;
    description: string;
    details: string[];
}

export interface CareerTranslation {
    title: string;
    period: string;
    description: string;
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

export interface SectionRefs {
     [key: string]: RefObject<HTMLElement>;
   }
