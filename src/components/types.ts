export interface ContactInfo {
  email?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  upwork?: string;
}

export interface TechnicalSkillCategory {
  id: string;
  name: string;
  skills: string[];
  isVisible?: boolean;
}

export interface TechnicalSkill {
  id: string;
  name: string;
  isVisible?: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyLink?: string;
  period: string;
  description: string;
  techStack: string[];
  achievements?: string[];
  category?: string;
  isVisible?: boolean;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

export interface CVData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  skills: {
    technical: TechnicalSkillCategory[];
  };
  languages: { name: string; level: string }[];
  experience: Experience[];
  education: Education[];
}

export interface CVTemplate {
  id: string;
  name: string;
  data: CVData;
  createdAt: Date;
}

export const defaultCVData: CVData = {
  name: "Alex Johnson",
  title: "Senior Full Stack Developer",
  summary: "Experienced full stack developer with 5+ years of expertise in modern web technologies. Passionate about creating scalable, user-friendly applications and leading development teams.\n\nProven track record of delivering high-quality software solutions in fast-paced environments.",
  contact: {
    email: "alex.johnson@email.com",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    linkedin: "linkedin.com/in/alexjohnson",
    upwork: "upwork.com/freelancers/alexjohnson"
  },
  skills: {
    technical: [
      {
        id: "frontend",
        name: "Frontend",
        skills: ["JavaScript", "TypeScript", "React", "HTML", "CSS"],
        isVisible: true
      },
      {
        id: "backend",
        name: "Backend",
        skills: ["Node.js", "Python", "Express.js", "GraphQL", "REST APIs"],
        isVisible: true
      },
      {
        id: "database",
        name: "Database",
        skills: ["PostgreSQL", "MongoDB", "Redis"],
        isVisible: true
      },
      {
        id: "tools",
        name: "Tools & Others",
        skills: ["AWS", "Docker", "Git", "CI/CD"],
        isVisible: true
      }
    ]
  },
  languages: [
    { name: "English", level: "Native" },
    { name: "Spanish", level: "Conversational" },
    { name: "French", level: "Basic" }
  ],
  experience: [
    {
      id: "exp1",
      title: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      companyLink: "https://techcorp.com",
      period: "2022 - Present",
      description: "Led a team of 4 developers in building scalable web applications using React and Node.js. Improved application performance by 40% through code optimization and database tuning. Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes. Mentored junior developers and conducted technical interviews.",
      techStack: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
      achievements: [
        "Led a team of 4 developers",
        "Improved application performance by 40%",
        "Reduced deployment time from 2 hours to 15 minutes",
        "Mentored junior developers"
      ],
      category: "Full-time",
      isVisible: true
    },
    {
      id: "exp2",
      title: "Full Stack Developer",
      company: "StartupXYZ",
      companyLink: "https://startupxyz.com",
      period: "2020 - 2022",
      description: "Developed and maintained multiple client-facing applications using React and Express.js. Designed and implemented RESTful APIs serving 100k+ daily requests. Collaborated with UX/UI designers to create responsive, accessible interfaces. Integrated third-party services including payment gateways and analytics platforms.",
      techStack: ["React", "Express.js", "MongoDB", "Stripe", "AWS"],
      achievements: [
        "Designed and implemented RESTful APIs serving 100k+ daily requests",
        "Created responsive, accessible interfaces",
        "Integrated payment gateways and analytics platforms"
      ],
      category: "Full-time",
      isVisible: true
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      year: "2019",
      gpa: "3.8/4.0"
    }
  ]
};

// Comprehensive mock data template for testing
export const mockCVData: CVData = {
  name: "Sarah Chen",
  title: "Senior Software Engineer & Technical Lead",
  summary: "Accomplished software engineer with 8+ years of experience in full-stack development, system architecture, and team leadership. Expertise in modern web technologies, microservices architecture, and agile methodologies.\n\nPassionate about building scalable, maintainable software solutions that drive business growth. Strong background in both startup and enterprise environments, with a proven track record of delivering complex projects on time and within budget.\n\nCommitted to continuous learning and staying current with emerging technologies. Active contributor to open-source projects and technical communities.",
  contact: {
    email: "sarah.chen@email.com",
    location: "Seattle, WA",
    website: "sarahchen.dev",
    linkedin: "linkedin.com/in/sarahchen",
    upwork: "upwork.com/freelancers/sarahchen"
  },
  skills: {
    technical: [
      {
        id: "frontend",
        name: "Frontend Technologies",
        skills: ["React", "Vue.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Material-UI", "Next.js"],
        isVisible: true
      },
      {
        id: "backend",
        name: "Backend & APIs",
        skills: ["Node.js", "Python", "Java", "Express.js", "FastAPI", "GraphQL", "REST APIs", "Microservices", "Spring Boot"],
        isVisible: true
      },
      {
        id: "database",
        name: "Databases & Storage",
        skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Elasticsearch", "DynamoDB", "Firebase"],
        isVisible: true
      },
      {
        id: "cloud",
        name: "Cloud & DevOps",
        skills: ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Jenkins", "GitHub Actions", "Terraform"],
        isVisible: true
      },
      {
        id: "tools",
        name: "Tools & Others",
        skills: ["Git", "Jira", "Confluence", "Figma", "Postman", "Jest", "Cypress", "Webpack", "Vite"],
        isVisible: true
      }
    ]
  },
  languages: [
    { name: "English", level: "Native" },
    { name: "Mandarin", level: "Native" },
    { name: "Spanish", level: "Intermediate" },
    { name: "Japanese", level: "Basic" }
  ],
  experience: [
    {
      id: "exp1",
      title: "Senior Software Engineer & Technical Lead",
      company: "Microsoft",
      companyLink: "https://microsoft.com",
      period: "2021 - Present",
      description: "Lead a cross-functional team of 8 engineers developing cloud-native applications for enterprise customers. Architect and implement scalable microservices using Azure and modern web technologies. Drive technical decision-making and establish development best practices across multiple product teams.\n\nCollaborate closely with product managers, designers, and stakeholders to deliver high-impact features that serve millions of users worldwide.",
      techStack: ["React", "TypeScript", "Node.js", "Azure", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
      achievements: [
        "Led the migration of legacy monolith to microservices architecture, reducing deployment time by 75%",
        "Improved application performance by 60% through optimization and caching strategies",
        "Mentored 12+ junior developers and established coding standards across 4 teams",
        "Designed and implemented auto-scaling infrastructure serving 10M+ requests per day",
        "Reduced critical bugs by 80% through comprehensive testing and code review processes"
      ],
      category: "Full-time",
      isVisible: true
    },
    {
      id: "exp2",
      title: "Full Stack Developer",
      company: "Airbnb",
      companyLink: "https://airbnb.com",
      period: "2019 - 2021",
      description: "Developed and maintained user-facing features for the Airbnb platform, serving millions of hosts and guests globally. Built responsive web applications using React and implemented backend services with Ruby on Rails and Node.js.\n\nWorked in an agile environment with product designers and data scientists to optimize user experience and conversion rates.",
      techStack: ["React", "Ruby on Rails", "Node.js", "PostgreSQL", "Redis", "AWS", "JavaScript", "CSS"],
      achievements: [
        "Implemented new booking flow that increased conversion rates by 25%",
        "Built real-time messaging system handling 500K+ messages per day",
        "Optimized search functionality, reducing average search time by 40%",
        "Developed A/B testing framework used by 15+ product teams",
        "Contributed to open-source React component library used across the organization"
      ],
      category: "Full-time",
      isVisible: true
    },
    {
      id: "exp3",
      title: "Software Developer",
      company: "TechStart Solutions",
      companyLink: "https://techstartsolutions.com",
      period: "2017 - 2019",
      description: "Full-stack development for fintech startup building investment portfolio management tools. Responsible for both frontend user interfaces and backend API development. Worked directly with founders to define product requirements and technical architecture.",
      techStack: ["Vue.js", "Python", "Django", "PostgreSQL", "AWS", "Docker", "JavaScript"],
      achievements: [
        "Built MVP from scratch that acquired first 1000 users within 6 months",
        "Implemented secure payment processing system with 99.9% uptime",
        "Developed automated portfolio rebalancing algorithm",
        "Created comprehensive API documentation and testing suite"
      ],
      category: "Full-time",
      isVisible: true
    },
    {
      id: "exp4",
      title: "Frontend Developer (Contract)",
      company: "Design Studio Pro",
      companyLink: "",
      period: "2016 - 2017",
      description: "Contract work developing custom websites and web applications for design agency clients. Collaborated with designers to implement pixel-perfect responsive interfaces and interactive experiences.",
      techStack: ["JavaScript", "HTML5", "CSS3", "jQuery", "WordPress", "PHP"],
      achievements: [
        "Delivered 15+ client projects with 100% on-time completion rate",
        "Increased client website performance scores by average of 40%",
        "Implemented SEO optimizations resulting in 60% increase in organic traffic"
      ],
      category: "Contract",
      isVisible: true
    }
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Stanford University",
      year: "2016",
      gpa: "3.9/4.0"
    },
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "University of Washington",
      year: "2014",
      gpa: "3.8/4.0"
    }
  ]
};