import { ICombinedInformation, IDirectMessageItem, IInitialInformation, ITitledListItem } from "./Models";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

class DynamicValues {
    static initialInformation: IInitialInformation = {
        name: "Nikhil Kumar Singh",
        occupation: "Java Backend Developer | Spring Boot | Microservices",
    }

    static directMessageItems: Array<IDirectMessageItem> = [
        {
            name: "WhatsApp",
            link: 'https://api.whatsapp.com/send?phone=917992238245',
        },
        {
            name: "Linked In",
            link: "https://www.linkedin.com/in/nikhil-kumar-singh-a167b2279"
        },
        {
            name: "Github",
            link: "https://github.com/Nikhil79922"
        },
        {
            name: "LeetCode",
            link: "https://leetcode.com/u/Gasmonkey/"
        },
    ]

    static about: Array<ITitledListItem> = [
        {
            text: "Information",
            shouldNotSort: true,
            arr: [
                {
                    title: "Name",
                    desc: "Nikhil Kumar Singh",
                    logo: "https://cdn-icons-png.flaticon.com/128/1077/1077012.png"
                },
                {
                    title: "Role",
                    desc: "Java Backend Developer — Spring Boot, Microservices, Kafka, Agile",
                    logo: `${DEVICON}/java/java-original.svg`
                },
                {
                    title: "Summary",
                    desc: "2+ years building scalable REST APIs and event-driven microservices for 50,000+ users using Java 11+, Spring Boot, Hibernate/JPA, Kafka, Saga Pattern, Redis, Docker and AWS CI/CD.",
                    logo: `${DEVICON}/spring/spring-original.svg`
                },
                {
                    title: "Work Experience",
                    desc: "2+ years",
                    logo: "https://cdn-icons-png.flaticon.com/128/3281/3281289.png"
                },
                {
                    title: "Education",
                    desc: "B.Tech in Computer Science and Engineering, Sandip University, Nashik (2025) — CGPA 9.11",
                    logo: "https://cdn-icons-png.flaticon.com/128/2995/2995620.png"
                },
                {
                    title: "Languages",
                    desc: "English, Hindi",
                    logo: "https://cdn-icons-png.flaticon.com/128/3898/3898150.png"
                },
                {
                    title: "Nationality",
                    desc: "India",
                    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/1920px-Flag_of_India.svg.png"
                },
                {
                    title: "Resume",
                    desc: "Click the link icon to view/download",
                    link: "https://drive.google.com/file/d/1bm8whV2pOMs44I5w2UVcwXDwyb3iwwo2/view?usp=drive_link",
                    logo: "https://cdn-icons-png.flaticon.com/128/909/909212.png"
                },
            ]
        },
        {
            text: "Achievements",
            shouldNotSort: true,
            arr: [
                {
                    title: "Agile Person of the Team 2026",
                    desc: "Narola Infotech — recognized for Agile/Scrum ownership and delivery.",
                    link: "https://lnkd.in/p/d8qS5Wz6",
                    logo: "https://cdn-icons-png.flaticon.com/128/909/909212.png"
                },
                {
                    title: "Employee of the Month",
                    desc: "Narola Infotech — recognized for consistent performance and ownership.",
                    link: "https://www.linkedin.com/posts/nikhil-kumar-singh-a167b2279_employeeofthemonth-workanniversary-1yearmilestone-ugcPost-7415061762091237376-28vn?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEPtcjIB8WEeRgZpDFzyjNw2kBINeIpIMUk",
                    logo: "https://cdn-icons-png.flaticon.com/128/909/909212.png"
                },
                {
                    title: "LeetCode 100-Day Streak Badge",
                    desc: "Active 100-day problem-solving streak.",
                    link: "https://lnkd.in/p/dJQqUZd9",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                },
                {
                    title: "200+ DSA Problems Solved",
                    desc: "LeetCode, CodeChef and GeeksforGeeks.",
                    link: "https://leetcode.com/u/Gasmonkey/",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                },
            ]
        },
        {
            text: "Experiences",
            arr: [
                {
                    title: "Narola Infotech",
                    desc: "Software Developer (Java Backend) — Jan 2025 to Present. Delivered 5 production apps for 50,000+ users at 99.9% uptime; 20+ REST APIs; Kafka, RabbitMQ, Redis, API Gateway; JWT/RBAC security; Razorpay with idempotency; Docker + GitHub Actions CI/CD on AWS (40% faster deployments).",
                    logo: 'https://www.narolainfotech.com/wp-content/uploads/2022/09/nisl-logo.svg'
                },
                {
                    title: "TechnoHacks EduTech",
                    desc: "Web Development Intern — Jul 2023 to Sep 2023",
                    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92eWYaRDZX_zD_sklkaPVQbBv-JNtzzky8A&s"
                },
                {
                    title: "CodSoft",
                    desc: "Web Development Intern — Jul 2023 to Sep 2023",
                    logo: "https://cdn-icons-png.flaticon.com/128/1055/1055687.png"
                },
                {
                    title: "Bharat Intern",
                    desc: "Web Development Intern — Jul 2023 to Sep 2023",
                    logo: "https://cdn-icons-png.flaticon.com/128/1055/1055687.png"
                }
            ]
        }
    ]

    static skills: Array<ITitledListItem> = [
        {
            text: "Languages",
            shouldNotSort: true,
            arr: [
                { title: 'Java 11+', logo: `${DEVICON}/java/java-original.svg` },
                { title: 'SQL', logo: 'https://github.com/p32929/portfolio-v2/assets/6418354/ffeb437f-0d63-40e5-9bc3-041d5715d67e' },
                { title: 'JavaScript', logo: 'https://www.vectorlogo.zone/logos/javascript/javascript-icon.svg' },
                { title: 'TypeScript', logo: 'https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg' },
            ]
        },
        {
            text: "Java Frameworks",
            shouldNotSort: true,
            arr: [
                { title: 'Spring Boot', logo: `${DEVICON}/spring/spring-original.svg` },
                { title: 'Spring MVC', logo: `${DEVICON}/spring/spring-original.svg` },
                { title: 'Spring Data JPA', logo: `${DEVICON}/spring/spring-original.svg` },
                { title: 'Spring Cloud Gateway', logo: `${DEVICON}/spring/spring-original.svg` },
                { title: 'Spring WebFlux', logo: `${DEVICON}/spring/spring-original.svg` },
                { title: 'Hibernate', logo: `${DEVICON}/hibernate/hibernate-original.svg` },
                { title: 'REST APIs', logo: 'https://cdn-icons-png.flaticon.com/512/2165/2165004.png' },
                { title: 'Maven', logo: `${DEVICON}/maven/maven-original.svg` },
            ]
        },
        {
            text: "Core Java",
            shouldNotSort: true,
            arr: [
                { title: 'OOP', logo: `${DEVICON}/java/java-original.svg` },
                { title: 'Collections', logo: `${DEVICON}/java/java-original.svg` },
                { title: 'Multithreading', logo: `${DEVICON}/java/java-original.svg` },
                { title: 'Executor Framework', logo: `${DEVICON}/java/java-original.svg` },
                { title: 'CompletableFuture', logo: `${DEVICON}/java/java-original.svg` },
                { title: 'Streams API', logo: `${DEVICON}/java/java-original.svg` },
                { title: 'Lambda Expressions', logo: `${DEVICON}/java/java-original.svg` },
                { title: 'JDBC', logo: `${DEVICON}/java/java-original.svg` },
                { title: 'Exception Handling', logo: `${DEVICON}/java/java-original.svg` },
            ]
        },
        {
            text: "Architecture",
            shouldNotSort: true,
            arr: [
                { title: 'Microservices', logo: 'https://cdn-icons-png.flaticon.com/512/4149/4149676.png' },
                { title: 'Saga Pattern', logo: 'https://cdn-icons-png.flaticon.com/512/4149/4149676.png' },
                { title: 'Distributed Transactions', logo: 'https://cdn-icons-png.flaticon.com/512/4149/4149676.png' },
                { title: 'Event-Driven Architecture', logo: 'https://cdn-icons-png.flaticon.com/512/906/906361.png' },
                { title: 'API Gateway', logo: 'https://cdn-icons-png.flaticon.com/512/2165/2165004.png' },
                { title: 'Eureka Service Discovery', logo: `${DEVICON}/spring/spring-original.svg` },
                { title: 'Design Patterns', logo: 'https://cdn-icons-png.flaticon.com/512/4149/4149676.png' },
                { title: 'System Design', logo: 'https://cdn-icons-png.flaticon.com/512/4149/4149676.png' },
            ]
        },
        {
            text: "Databases & Messaging",
            shouldNotSort: true,
            arr: [
                { title: 'PostgreSQL', logo: `${DEVICON}/postgresql/postgresql-original.svg` },
                { title: 'MySQL', logo: `${DEVICON}/mysql/mysql-original.svg` },
                { title: 'MongoDB', logo: `${DEVICON}/mongodb/mongodb-original.svg` },
                { title: 'MSSQL', logo: `${DEVICON}/microsoftsqlserver/microsoftsqlserver-plain.svg` },
                { title: 'Apache Cassandra', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Cassandra_logo.svg' },
                { title: 'Redis', logo: `${DEVICON}/redis/redis-original.svg` },
                { title: 'Apache Kafka', logo: `${DEVICON}/apachekafka/apachekafka-original.svg` },
                { title: 'RabbitMQ', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/71/RabbitMQ_logo.svg' },
            ]
        },
        {
            text: "Security",
            shouldNotSort: true,
            arr: [
                { title: 'JWT Authentication', logo: 'https://cdn-icons-png.flaticon.com/512/2092/2092663.png' },
                { title: 'RBAC', logo: 'https://cdn-icons-png.flaticon.com/512/2092/2092663.png' },
                { title: 'Rate Limiting', logo: 'https://cdn-icons-png.flaticon.com/512/2092/2092663.png' },
            ]
        },
        {
            text: "DevOps & Tools",
            shouldNotSort: true,
            arr: [
                { title: 'Docker', logo: `${DEVICON}/docker/docker-original.svg` },
                { title: 'AWS (EC2, S3)', logo: `${DEVICON}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
                { title: 'GitHub Actions CI/CD', logo: `${DEVICON}/githubactions/githubactions-original.svg` },
                { title: 'Nginx', logo: `${DEVICON}/nginx/nginx-original.svg` },
                { title: 'Git', logo: `${DEVICON}/git/git-original.svg` },
                { title: 'Jira', logo: `${DEVICON}/jira/jira-original.svg` },
                { title: 'Confluence', logo: `${DEVICON}/confluence/confluence-original.svg` },
                { title: 'IntelliJ IDEA', logo: `${DEVICON}/intellij/intellij-original.svg` },
                { title: 'Linux', logo: `${DEVICON}/linux/linux-original.svg` },
            ]
        },
        {
            text: "Practices",
            shouldNotSort: true,
            arr: [
                { title: 'Agile / Scrum', logo: `${DEVICON}/jira/jira-original.svg` },
                { title: 'DSA', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' },
                { title: 'Idempotency', logo: 'https://cdn-icons-png.flaticon.com/512/906/906361.png' },
                { title: 'Eventual Consistency', logo: 'https://cdn-icons-png.flaticon.com/512/906/906361.png' },
                { title: 'Code Reviews', logo: `${DEVICON}/github/github-original.svg` },
            ]
        },
        {
            text: "Frontend (Secondary)",
            arr: [
                { title: 'ReactJS', logo: `${DEVICON}/react/react-original.svg` },
                { title: 'Next.js', logo: `${DEVICON}/nextjs/nextjs-original.svg` },
                { title: 'HTML', logo: 'https://www.vectorlogo.zone/logos/w3_html5/w3_html5-icon.svg' },
                { title: 'CSS', logo: `${DEVICON}/css3/css3-original.svg` },
                { title: 'Tailwind CSS', logo: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
            ]
        },
        {
            text: "Payment Gateways Integrated",
            arr: [
                {
                    title: "Razorpay (Java / Spring Boot)",
                    logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                },
                {
                    title: "Place to Pay",
                    logo: "https://cdn-icons-png.flaticon.com/512/633/633611.png"
                },
                {
                    title: "ATH Móvil",
                    logo: "https://cdn-icons-png.flaticon.com/512/633/633611.png"
                },
                {
                    title: "Square",
                    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSpQQKv7JsTYqA_wRRg447dHpujN0XvizQOA&s"
                }
            ]
        },
    ]

    static projects: Array<ITitledListItem> = [
        {
            text: "Java Microservices",
            shouldNotSort: true,
            arr: [
                {
                    title: "Banking Microservices — Saga Pattern",
                    link: "https://github.com/Nikhil79922",
                    logo: `${DEVICON}/java/java-original.svg`,
                    desc: "Spring Boot, Kafka, PostgreSQL. Account, transfer, transaction and notification microservices using the Saga Pattern for consistent distributed fund transfers, with compensating transactions, Kafka event messaging and idempotent consumers for eventual consistency.",
                },
                {
                    title: "Salon Booking Platform — Microservices",
                    link: "https://github.com/Nikhil79922",
                    logo: `${DEVICON}/spring/spring-original.svg`,
                    desc: "Spring Cloud Gateway, Eureka, PostgreSQL, Docker. 6 Spring Boot microservices (user, salon, category, service-offering, booking, payment) behind Spring Cloud Gateway with path-based routing, Eureka service discovery and load balancing, REST APIs with Spring MVC, Spring Data JPA and Hibernate.",
                },
                {
                    title: "Job Application Portal — Microservices",
                    link: "https://github.com/Nikhil79922/job_application_portal",
                    logo: `${DEVICON}/apachekafka/apachekafka-original.svg`,
                    desc: "JWT, Redis, Kafka. 3+ microservices with API Gateway and inter-service communication, secured with JWT refresh-token rotation; Redis caching, Kafka event messaging and Razorpay payments with DTO validation and the repository pattern.",
                },
                {
                    title: "Real-Time Chat Application",
                    link: "https://github.com/Nikhil79922/Chat_Application",
                    logo: `${DEVICON}/rabbitmq/rabbitmq-original.svg`,
                    desc: "RabbitMQ, Redis. Real-time messaging system handling concurrent socket connections, using RabbitMQ and Redis for asynchronous message queuing and caching.",
                },
            ]
        },
        {
            text: "Other Web Apps",
            arr: [
                {
                    title: "DonRifa",
                    link: "https://donrifa.com/",
                    logo: "https://cdn-icons-png.flaticon.com/512/4149/4149676.png",
                    desc: "Scalable microservices-based e-commerce system with API Gateway, integrating multiple payment workflows and event-driven notifications via email, SMS, and Zendesk for reliable user communication.",
                },
                {
                    title: "Redis Caching",
                    link: "https://github.com/Nikhil79922/redis_Caching",
                    logo: `${DEVICON}/redis/redis-original.svg`,
                    desc: "Implemented a Redis-based caching layer to store frequently accessed data, significantly reducing API response time and improving overall system performance.",
                },
                {
                    title: "AgroNet — Final Year Project",
                    link: "https://github.com/Nikhil79922/AgroNet",
                    logo: "https://cdn-icons-png.flaticon.com/512/2329/2329865.png",
                    desc: "Full-stack platform connecting farmers directly with buyers, enabling efficient crop trading with product listing, order management, and secure authentication.",
                },
                {
                    title: "GenAI Applications",
                    link: "https://github.com/Nikhil79922/genAI-Node",
                    logo: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
                    desc: "AI-powered tools for text, image, and audio generation using asynchronous pipelines and external AI APIs for scalable processing workflows.",
                }
            ]
        }
    ];

    static contacts: Array<ITitledListItem> = [
        {
            text: "Contact me",
            arr: [
                {
                    title: 'WhatsApp',
                    logo: 'https://user-images.githubusercontent.com/6418354/155842184-b064bf36-de8e-4317-8f8e-cb7755eed995.png',
                    link: 'https://api.whatsapp.com/send?phone=917992238245',
                    desc: "+91 7992238245"
                },
                {
                    title: 'Email',
                    logo: 'https://cdn3d.iconscout.com/3d/premium/thumb/email-address-4437044-3684811.png',
                    desc: 'nikhil38245@gmail.com',
                    link: 'mailto:nikhil38245@gmail.com?subject=Regarding Java Backend Opportunity&body=Hi Nikhil,'
                },
            ]
        },
        {
            text: "Others",
            arr: [
                {
                    title: 'GitHub',
                    logo: 'https://cdn-icons-png.flaticon.com/128/1051/1051275.png',
                    link: 'https://github.com/Nikhil79922'
                },
                {
                    title: 'LinkedIn',
                    logo: 'https://user-images.githubusercontent.com/6418354/155841027-8698cb12-7ddd-4604-a4ea-c618ddbc1cd8.png',
                    link: 'https://www.linkedin.com/in/nikhil-kumar-singh-a167b2279/'
                },
                {
                    title: 'LeetCode',
                    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
                    link: 'https://leetcode.com/u/Gasmonkey/'
                },
            ]
        },
    ]
}

// 
// Dont change anything below this line
// 
export const combinedInformation: ICombinedInformation = {
    initialInformation: DynamicValues.initialInformation,
    directMessageItems: DynamicValues.directMessageItems,
    routes: [
        {
            name: "About",
            items: DynamicValues.about,
        },
        {
            name: "Skills",
            items: DynamicValues.skills,
        },
        {
            name: "Projects",
            items: DynamicValues.projects,
        },
        {
            name: "Contact",
            items: DynamicValues.contacts,
        }
    ]
}