import {
    IAchievement,
    IEducation,
    IExperience,
    INavItem,
    IProfile,
    IProject,
    ISkillGroup,
    ISocialLink,
    IStat,
} from "./Models";

/**
 * All portfolio content lives here. Edit this file to update the site.
 *
 * Rules that keep the site safe (and off browser "dangerous site" lists):
 *  - Direct HTTPS links only. No URL shorteners (lnkd.in, bit.ly, ...).
 *  - No images from third-party hosts: logos are bundled from src/assets/logos.
 *  - Don't publish a personal phone number; email + LinkedIn are enough.
 */

// Bundled tech logos (src/assets/logos/*.svg), served from this site.
const logos = import.meta.glob<string>("../assets/logos/*.svg", { eager: true, query: "?url", import: "default" });
const logo = (name: string) => logos[`../assets/logos/${name}.svg`];

// Résumé: drop a PDF (with phone/address removed) at src/assets/resume.pdf and it is
// served from this site automatically. Until then, the Google Drive link is used.
const localResume = Object.values(
    import.meta.glob<string>("../assets/resume.pdf", { eager: true, query: "?url", import: "default" })
)[0];
const DRIVE_RESUME = "https://drive.google.com/file/d/1bm8whV2pOMs44I5w2UVcwXDwyb3iwwo2/view";

const LINKEDIN = "https://www.linkedin.com/in/nikhil-kumar-singh-a167b2279/";
const GITHUB = "https://github.com/Nikhil79922";
const LEETCODE = "https://leetcode.com/u/NikkssyDev/";
const repo = (name: string) => `${GITHUB}/${name}`;

export const profile: IProfile = {
    name: "Nikhil Kumar Singh",
    initials: "NS",
    role: "Java Backend Developer",
    summary:
        "2+ years shipping REST APIs and event-driven microservices for 50,000+ users — built with Java, Spring Boot, Kafka, Redis and the Saga pattern, deployed on AWS.",
    location: "India",
    availability: "Open to new opportunities",
    email: "nikhil38245@gmail.com",
    resumeUrl: localResume ?? DRIVE_RESUME,
    languages: ["English", "Hindi"],
};

export const stats: IStat[] = [
    { value: "2+", label: "Years experience" },
    { value: "50K+", label: "Users served" },
    { value: "99.9%", label: "Production uptime" },
    { value: "20+", label: "REST APIs shipped" },
];

export const socials: ISocialLink[] = [
    { kind: "github", label: "GitHub", href: GITHUB, handle: "Nikhil79922" },
    { kind: "linkedin", label: "LinkedIn", href: LINKEDIN, handle: "nikhil-kumar-singh" },
    { kind: "leetcode", label: "LeetCode", href: LEETCODE, handle: "NikkssyDev" },
    {
        kind: "email",
        label: "Email",
        href: `mailto:${profile.email}?subject=${encodeURIComponent("Regarding a Java Backend opportunity")}`,
        handle: profile.email,
    },
];

export const experience: IExperience[] = [
    {
        company: "Narola Infotech",
        role: "Software Developer — Java Backend",
        period: "Jan 2025 — Present",
        current: true,
        highlights: [
            "Delivered 5 production applications serving 50,000+ users at 99.9% uptime.",
            "Designed 20+ Spring Boot REST APIs on Kafka, RabbitMQ, Redis and an API Gateway.",
            "Secured services with JWT + RBAC; built idempotent Razorpay payment flows.",
            "Automated Docker + GitHub Actions CI/CD on AWS — deployments 40% faster.",
        ],
        tags: ["Spring Boot", "Kafka", "RabbitMQ", "Redis", "AWS", "Docker"],
    },
];

export const education: IEducation = {
    degree: "B.Tech in Computer Science and Engineering",
    school: "Sandip University, Nashik",
    period: "Graduated 2025",
    detail: "CGPA 9.11",
};

export const achievements: IAchievement[] = [
    {
        title: "Agile Person of the Team 2026",
        org: "Narola Infotech",
        description: "Recognised for Agile/Scrum ownership and consistent delivery.",
        href: LINKEDIN,
    },
    {
        title: "Employee of the Month",
        org: "Narola Infotech",
        description: "Recognised for consistent performance and ownership.",
        href: "https://www.linkedin.com/posts/nikhil-kumar-singh-a167b2279_employeeofthemonth-workanniversary-1yearmilestone-ugcPost-7415061762091237376-28vn",
    },
    {
        title: "LeetCode 100-Day Streak",
        org: "LeetCode",
        description: "Maintained an unbroken 100-day problem-solving streak.",
        href: LEETCODE,
    },
    {
        title: "200+ DSA Problems Solved",
        org: "LeetCode · CodeChef · GeeksforGeeks",
        description: "Strong foundation in data structures and algorithms.",
        href: LEETCODE,
    },
];

export const skillGroups: ISkillGroup[] = [
    {
        title: "Java & Languages",
        icon: "code",
        skills: [
            { name: "Java 11+", logo: logo("java") },
            { name: "Multithreading & Concurrency" },
            { name: "Streams & Lambdas" },
            { name: "SQL", logo: logo("sql") },
            { name: "TypeScript", logo: logo("typescript") },
        ],
    },
    {
        title: "Spring Ecosystem",
        icon: "layers",
        skills: [
            { name: "Spring Boot", logo: logo("spring") },
            { name: "Spring Cloud Gateway" },
            { name: "Spring Data JPA" },
            { name: "Spring WebFlux" },
            { name: "Spring MVC" },
            { name: "Hibernate", logo: logo("hibernate"), invertOnDark: true },
        ],
    },
    {
        title: "Architecture",
        icon: "network",
        skills: [
            { name: "Microservices" },
            { name: "Saga Pattern" },
            { name: "Event-Driven Architecture" },
            { name: "Distributed Transactions" },
            { name: "API Gateway" },
            { name: "Service Discovery (Eureka)" },
            { name: "System Design" },
        ],
    },
    {
        title: "Data & Messaging",
        icon: "database",
        skills: [
            { name: "PostgreSQL", logo: logo("postgresql") },
            { name: "MySQL", logo: logo("mysql") },
            { name: "MongoDB", logo: logo("mongodb") },
            { name: "Redis", logo: logo("redis") },
            { name: "Apache Kafka", logo: logo("kafka"), invertOnDark: true },
            { name: "RabbitMQ", logo: logo("rabbitmq") },
        ],
    },
    {
        title: "Security & Reliability",
        icon: "shield",
        skills: [{ name: "JWT Authentication" }, { name: "RBAC" }, { name: "Rate Limiting" }, { name: "Idempotency" }],
    },
    {
        title: "Cloud & DevOps",
        icon: "cloud",
        skills: [
            { name: "Docker", logo: logo("docker") },
            { name: "AWS (EC2, S3)", logo: logo("aws") },
            { name: "GitHub Actions CI/CD", logo: logo("githubactions") },
            { name: "Nginx", logo: logo("nginx") },
            { name: "Linux", logo: logo("linux") },
            { name: "Git", logo: logo("git") },
        ],
    },
    {
        title: "Payment Gateways",
        icon: "credit-card",
        skills: [{ name: "Razorpay" }, { name: "Square" }, { name: "Place to Pay" }, { name: "ATH Móvil" }],
    },
];

/** Secondary skills, shown as a single line under the skill groups. */
export const alsoFamiliar: string[] = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "MS SQL Server",
    "Apache Cassandra",
    "Maven",
    "Agile / Scrum",
];

export const projects: IProject[] = [
    {
        title: "Banking Microservices",
        featured: true,
        description:
            "Account, transfer and notification services kept consistent by the Saga pattern — compensating transactions, Kafka events and idempotent consumers.",
        tags: ["Spring Boot", "Kafka", "PostgreSQL", "Saga"],
        repo: repo("Banking-System"),
    },
    {
        title: "Salon Booking Platform",
        featured: true,
        description:
            "Six Spring Boot services behind Spring Cloud Gateway, with path-based routing, Eureka service discovery and load balancing.",
        tags: ["Spring Cloud Gateway", "Eureka", "PostgreSQL", "Docker"],
        repo: repo("Salon-Management-System"),
    },
    {
        title: "Job Application Portal",
        featured: true,
        description:
            "Gateway-fronted microservices with JWT refresh-token rotation, Redis caching, Kafka events and Razorpay payments.",
        tags: ["JWT", "Redis", "Kafka", "Razorpay"],
        repo: repo("job_application_portal"),
    },
    {
        title: "Real-Time Chat Application",
        featured: true,
        description:
            "Real-time messaging across concurrent socket connections, with RabbitMQ queues and Redis caching for async delivery.",
        tags: ["RabbitMQ", "Redis", "WebSockets"],
        repo: repo("Chat_Application"),
    },
    {
        title: "DonRifa",
        description:
            "Microservices e-commerce platform with an API Gateway, multiple payment workflows and event-driven email, SMS and Zendesk notifications.",
        tags: ["Microservices", "Payments", "Notifications"],
    },
    {
        title: "Redis Caching Layer",
        description:
            "A caching layer for hot data that significantly cuts API response times and raises throughput.",
        tags: ["Redis", "Performance"],
        repo: repo("redis_Caching"),
    },
    {
        title: "AgroNet",
        description:
            "Full-stack marketplace connecting farmers directly with buyers — listings, order management and secure authentication.",
        tags: ["Final-year project", "Full-stack", "Auth"],
        repo: repo("AgroNet"),
    },
    {
        title: "GenAI Applications",
        description:
            "Text, image and audio generation tools built on asynchronous pipelines and external AI APIs.",
        tags: ["Node.js", "Async pipelines", "AI APIs"],
        repo: repo("genAI-Node"),
    },
];

export const navItems: INavItem[] = [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
];
