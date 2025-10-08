export const content = {
    home: {
        title: "Hi, I'm Nikolas",
        description: "Welcome to my personal site. I build web apps and tools."
    },
    about: {
        title: "About",
        description: "Full-stack software engineer with experience leading teams, building high-scale customer-facing applications, and driving engineering best practices.",
        background: {
            title: "Background",
            description: "I'm a Senior Software Engineer with 5+ years of experience building scalable applications at companies like Capital One and AmeriSave Mortgage. I specialize in modern frontend frameworks, backend microservices, and cloud infrastructure. Known for balancing hands-on delivery with mentorship and cross-functional collaboration."
        },
        experience: {
            title: "Career Journey",
            items: [
                {
                    role: "Senior Software Engineer",
                    company: "AmeriSave Mortgage",
                    color: "#10E0B3",
                    hoverColor: "#10E0B3",
                    highlightHoverColor: "#10E0B3",
                    period: "Feb 2025 – Present",
                    image: "/src/assets/amerisave.png",
                    highlights: [
                        "Led development of multi-step mortgage purchase flow handling <b>10,000</b>+ monthly applications",
                        "<b>Directed</b> engineering team of 4 developers, managing <b>feature planning</b> and architecture decisions",
                        "Implemented comprehensive observability stack with <b>Datadog</b> metrics, logs, and APM",
                        "Integrated <b>OpenReplay</b> session replay for user behavior analysis and debugging",
                        "Owned CI/CD pipelines in <b>GitLab</b>, reducing deployment time by <b>40%</b>",
                        "Architected microservices using <b>Spring Boot</b> and <b>Docker</b> for scalable loan processing",
                        "Established monitoring alerts and incident response procedures with <b>PagerDuty</b> integration"
                    ]
                },
                {
                    role: "Capital One",
                    company: "Capital One",
                    color: "#E03110",
                    hoverColor: "#E03110",
                    highlightHoverColor: "#E03110",
                    period: "Aug 2020 – Feb 2025",
                    highlights: [],
                    progression: "company",
                    image: "/src/assets/capitalone.png",
                    subRoles: [
                        {
                            role: "Senior Software Engineer",
                            period: "Jan 2024 – Feb 2025",
                            highlightHoverColor: "#E03110",
                            highlights: [
                                "Delivered dealership trade-in tool using <b>SolidJS</b> and <b>TypeScript</b>, processing 50,000+ monthly valuations",
                                "Extended <b>Kotlin/Java Spring Boot</b> APIs for third-party lender integration with 99.9% uptime",
                                "Led technical design reviews and <b>architecture decisions</b> for automotive lending platform",
                            ]
                        },
                        {
                            role: "Software Engineer II",
                            period: "Feb 2022 – Jan 2024",
                            highlightHoverColor: "#E03110",
                            highlights: [
                                "Created reusable <b>LitElement</b> components adopted across 5+ teams, reducing development time by 30%",
                                "Mentored junior engineers and led intern projects, resulting in 2 successful <b>intern conversions</b>",
                                "Optimized <b>React</b> application performance, reducing bundle size by 25% and load time by 40%",
                                "Implemented automated testing pipeline with 95% code coverage using <b>Jest</b> and <b>Cypress</b>",
                                "Collaborated with UX designers to implement responsive designs across desktop and mobile platforms"
                            ]
                        },
                        {
                            role: "Software Engineer I",
                            period: "Aug 2020 – Feb 2022",
                            highlightHoverColor: "#E03110",
                            highlights: [
                                "Developed auto loan pre-qualification UI in <b>React</b> adopted by 3,000+ dealerships nationwide",
                                "Owned frontend test strategy using <b>Cypress</b>, achieving 90% test coverage and reducing bugs by 60%",
                                "Built responsive web applications supporting 100,000+ monthly users",
                                "Integrated with <b>REST APIs</b> and implemented real-time data validation",
                                "Participated in <b>agile development process</b> with 2-week sprint cycles and daily standups"
                            ]
                        }
                    ]
                }
            ]
        },
        skills: {
            title: "Technical Skills",
            items: [
                { category: "Languages", technologies: "JavaScript, TypeScript, Java, Kotlin, SQL, HTML, CSS, Python" },
                { category: "Frontend", technologies: "React, SolidJS, Vue, Nuxt, LitElement, Web Components" },
                { category: "Backend", technologies: "Spring Boot, REST APIs, Microservices, Node.js" },
                { category: "Cloud & DevOps", technologies: "AWS (EC2, S3, Lambda), GitLab CI/CD, Jenkins, Docker" },
                { category: "Tools & Monitoring", technologies: "Datadog, OpenReplay, Splunk, PagerDuty, Cypress, Jest, Webpack" },
                { category: "Design & Collaboration", technologies: "Figma, Jira, Confluence, ElasticSearch, Postman, Git, Agile/Scrum" }
            ]
        },
        projects: undefined,
        education: {
            title: "Education",
            school: "California State University San Marcos",
            degree: "Bachelor of Science",
            major: "Computer Science",
            graduation: "2015-2020",
            extracurriculars: [
                "Vice President of the ACM (Association for Computing Machinery)",
                "Baseball Club Team Captain",
            ]
        },
        whatIDo: {
            title: "What I Do",
            description: "I'm passionate about engineering culture and leveraging AI to solve real-world problems. I enjoy building high-scale applications, mentoring teams, and driving technical excellence through hands-on leadership and cross-functional collaboration."
        }
    },
    projects: {
        title: "Projects",
        items: [
            {
                name: "AI-Powered Lawn Care Analysis App",
                isPersonal: true,
                description: "Cross-platform mobile app with OpenAI integration and hyperlocal weather data",
                technologies: ["React Native", "OpenAI GPT-5", "Tempest Weather API", "TypeScript", "Supabase"],
                links: {
                    github: undefined,
                    demo: "https://lawncare-ai-demo.vercel.app"
                }
            },
            {
                name: "Mortgage Purchase Flow",
                isPersonal: false,
                description: "High-volume multi-step application system with observability stack",
                technologies: ["Vue", "Nuxt", "TypeScript", "Node.js", "Datadog", "OpenReplay", "Figma", "Jira", "Confluence", "GitLab", "Azure"],
                links: {
                    github: undefined,
                    demo: "https://apply.amerisave.com/quote/v1/home"
                }
            },
            {
                name: "Dealership Trade-in Tool",
                isPersonal: false,
                description: "Dealership trade-in tool with dynamic offer generation specfic for automotive dealerships",
                technologies: ["SolidJS", "TypeScript", "Kotlin", "Spring Boot", "AWS", "Figma", "Jira", "Confluence", "GitHub"],
                links: {
                    github: undefined,
                    demo: undefined
                }
            },
            {
                name: "Vehicle Search Platform",
                isPersonal: false,
                description: "Vehicle search platform with dynamic offer generation across partner platforms",
                technologies: ["SolidJS", "TypeScript", "Kotlin", "Spring Boot", "AWS", "Figma", "Jira", "Confluence", "GitHub"],
                links: {
                    github: undefined,
                    demo: "https://capitalone.com/cars/search"
                }
            }
        ]
    },
    contact: {
        title: "Contact",
        description: "Reach me at",
        email: "nikolasdujakovich@gmail.com",
        phone: "(949) 933-1043",
        location: "Edmond, OK",
        linkedin: "linkedin.com/in/nickdujakovich"
    }
}
