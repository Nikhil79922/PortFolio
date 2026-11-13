export type SocialKind = "github" | "linkedin" | "leetcode" | "email";

export interface IProfile {
    name: string;
    initials: string;
    role: string;
    summary: string;
    location: string;
    availability: string;
    email: string;
    resumeUrl: string;
    languages: string[];
}

export interface IStat {
    value: string;
    label: string;
}

export interface ISocialLink {
    kind: SocialKind;
    label: string;
    href: string;
    handle?: string;
}

export interface IExperience {
    company: string;
    role: string;
    period: string;
    current?: boolean;
    highlights: string[];
    tags?: string[];
}

export interface IEducation {
    degree: string;
    school: string;
    period: string;
    detail?: string;
}

export interface IAchievement {
    title: string;
    org: string;
    description: string;
    href?: string;
}

export interface ISkill {
    name: string;
    /** Optional logo (bundled SVG URL). Skills without a logo render as plain chips. */
    logo?: string;
    /** Logo is dark/monochrome: invert it on the dark theme so it stays visible. */
    invertOnDark?: boolean;
}

export type SkillGroupIcon = "code" | "layers" | "network" | "database" | "shield" | "cloud" | "credit-card";

export interface ISkillGroup {
    title: string;
    icon: SkillGroupIcon;
    skills: ISkill[];
}

export interface IProject {
    title: string;
    description: string;
    tags: string[];
    featured?: boolean;
    repo?: string;
    live?: string;
}

export interface INavItem {
    id: string;
    label: string;
}
