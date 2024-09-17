interface ProjectTranslation {
    title: string;
    description: string;
    details: string[];
}

interface CareerTranslation {
    title: string;
    period: string;
    description: string;
}

interface TranslationFile {
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
