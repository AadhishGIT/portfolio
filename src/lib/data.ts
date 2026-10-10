import { siteAsset } from '@/lib/site-config';

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  shortRole: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  aboutExtra: string;
  github: string;
  linkedin: string;
  portfolio: string;
  idCard: {
    idNo: string;
    dept: string;
    validTill: string;
    highlights: string[];
    quote: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
  number: string;
}

export interface SkillItem {
  atomicNumber: number;
  symbol: string;
  name: string;
  family: 'Frontend' | 'Backend' | 'DevOps' | 'Testing' | 'Security' | 'GenAI' | 'Architecture';
  logoKey: string;
  description: string;
  projects: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  subtitle: string;
  description: string;
  features: [string, string];
  tech: string[];
  github?: string;
  illustrativeType: 'rag-chat' | 'microfrontend-metrics' | 'portfolio-tracking';
}

export interface CertificationItem {
  index: string;
  title: string;
  issuer: string;
  date?: string;
  link: string;
}

export interface ExperienceItem {
  period: string;
  year: string;
  title: string;
  organization: string;
  location: string;
  details: string[];
  type: 'work' | 'education';
}

export interface AchievementItem {
  index: string;
  total: string;
  number: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  caption: string;
  detail: string;
  logoKey: string;
  brandColor: string;
}

export interface KeyAchievementItem {
  title: string;
  period: string;
  description: string;
  image: string;
  imageAlt: string;
  url: string;
}

export const PROFILE: Profile = {
  name: 'Aadhish Dhamnikar',
  firstName: 'Aadhish',
  lastName: 'Dhamnikar',
  initials: 'AD',
  role: 'Lead Software Engineer | Technical Lead | Fullstack Developer',
  shortRole: 'Full Stack Developer',
  email: 'asdhamnikar@gmail.com',
  phone: '+91-9113858145',
  phoneHref: 'tel:+919113858145',
  location: 'Pune, India',
  resumeSummary:
    'Fullstack Developer and Technical Lead with 8+ years of experience building secure, scalable web applications for financial services and consumer analytics platforms (State Street, MRI Simmons) using React.js, TypeScript, Java (Spring Boot), microservices and Node.js. Experienced in leading agile teams, building reusable component libraries, and meeting WCAG 2.1 accessibility standards. Hands-on experience setting up automated Jenkins CI/CD pipelines, moving teams to Trunk-Based Development, and scanning code with SonarQube for OWASP Top 10 security compliance.',
  aboutExtra:
    'Specialized in micro-frontends, high-throughput microservices, and modern AI-assisted engineering with GitHub Copilot.',
  github: 'https://github.com/AadhishGIT',
  linkedin: 'https://www.linkedin.com/in/aadhish-dhamnikar-82640396',
  portfolio: 'https://aadhishgit.github.io/portfolio',
  idCard: {
    idNo: 'ENG-2017-8264',
    dept: 'Full-Stack Architecture & Lead Engineering',
    validTill: '2026 (IIM Mumbai Exec)',
    highlights: [
      'Lead Software Engineer & Technical Lead with 8+ years in enterprise platforms',
      'Bachelor of Engineering (CGPA 7.58) · CDAC PGDMC · IIM Mumbai GenAI',
      'Led 7-engineer agile squad across Spring Boot & React micro-frontends',
      'Architected AI-Powered RAG assistant and State Street portfolio analytics',
      '40% delivery speed boost via GitHub Copilot & responsible AI workflows'
    ],
    quote: 'Building scalable, secure web architectures with precision craftsmanship.'
  }
};

export const NAV: NavItem[] = [
  { id: 'about', label: 'About', number: '01' },
  { id: 'skills', label: 'Skills', number: '02' },
  { id: 'work', label: 'Work', number: '03' },
  { id: 'certifications', label: 'Certifications', number: '04' },
  { id: 'experience', label: 'Experience', number: '05' },
  { id: 'achievements', label: 'Achievements', number: '06' },
  { id: 'key-achievements', label: 'Recognition', number: '07' },
  { id: 'contact', label: 'Contact', number: '08' }
];

export const SKILL_GROUPS: SkillItem[] = [
  // Frontend
  { atomicNumber: 1, symbol: 'Re', name: 'React.js', family: 'Frontend', logoKey: 'react', description: 'Enterprise component libraries, hooks, and virtual DOM rendering.', projects: ['AI Document Assistant', 'MRI Simmons Platform', 'State Street System'] },
  { atomicNumber: 2, symbol: 'Ts', name: 'TypeScript', family: 'Frontend', logoKey: 'typescript', description: 'Strict type safety, generic utility types, and enterprise code hygiene.', projects: ['AI Document Assistant', 'MRI Simmons Platform'] },
  { atomicNumber: 3, symbol: 'Js', name: 'JavaScript ES6+', family: 'Frontend', logoKey: 'javascript', description: 'Modern ECMAScript asynchronous patterns, closures, and DOM engines.', projects: ['State Street System', 'MRI Simmons Platform'] },
  { atomicNumber: 4, symbol: 'Nx', name: 'Next.js', family: 'Frontend', logoKey: 'nextjs', description: 'Server-side rendering, App Router, metadata, and optimized static delivery.', projects: ['Portfolio Architecture'] },
  { atomicNumber: 5, symbol: 'Rn', name: 'React Native', family: 'Frontend', logoKey: 'reactnative', description: 'Cross-platform mobile interfaces and shared component primitives.', projects: ['CDAC Mobile Computing'] },
  { atomicNumber: 6, symbol: 'Mf', name: 'Micro Frontends', family: 'Frontend', logoKey: 'microfrontends', description: 'Federated micro-apps and distributed frontend architectures.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 7, symbol: 'Rx', name: 'Redux Toolkit', family: 'Frontend', logoKey: 'redux', description: 'Predictable state management, middleware, and real-time cache slices.', projects: ['State Street System'] },
  { atomicNumber: 8, symbol: 'Tw', name: 'Tailwind CSS', family: 'Frontend', logoKey: 'tailwindcss', description: 'Utility-first rapid design system implementation with zero runtime bloat.', projects: ['AI Document Assistant', 'Portfolio Architecture'] },
  { atomicNumber: 9, symbol: 'Wp', name: 'Webpack', family: 'Frontend', logoKey: 'webpack', description: 'Custom bundle pipelines, code splitting, and asset optimization.', projects: ['MRI Simmons Platform', 'State Street System'] },
  { atomicNumber: 10, symbol: 'Vi', name: 'Vite', family: 'Frontend', logoKey: 'vite', description: 'Lightning-fast ESM bundling and developer build toolchains.', projects: ['AI Document Assistant'] },
  { atomicNumber: 11, symbol: 'H5', name: 'HTML5', family: 'Frontend', logoKey: 'html5', description: 'Semantic document outlines, modern media APIs, and storage primitives.', projects: ['All Enterprise Platforms'] },
  { atomicNumber: 12, symbol: 'C3', name: 'CSS3', family: 'Frontend', logoKey: 'css3', description: 'Responsive layouts, fluid clamp typography, and performant hardware transforms.', projects: ['All Enterprise Platforms'] },
  { atomicNumber: 13, symbol: 'Mu', name: 'Material UI', family: 'Frontend', logoKey: 'mui', description: 'Accessible enterprise design system components and theme tokens.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 14, symbol: 'Wc', name: 'WCAG 2.1 AA', family: 'Frontend', logoKey: 'wcag', description: 'Screen reader compliance, focus management, and accessibility standards.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 15, symbol: 'D3', name: 'D3.js', family: 'Frontend', logoKey: 'd3', description: 'Custom data visualizations, interactive financial charts, and SVGs.', projects: ['State Street System'] },

  // Backend & APIs
  { atomicNumber: 16, symbol: 'Jv', name: 'Java (Core)', family: 'Backend', logoKey: 'java', description: 'Object-oriented architecture, multi-threading, and enterprise backend logic.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 17, symbol: 'Sb', name: 'Spring Boot', family: 'Backend', logoKey: 'springboot', description: 'Production-ready REST microservices, JPA/Hibernate, and security filters.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 18, symbol: 'Nd', name: 'Node.js', family: 'Backend', logoKey: 'nodejs', description: 'Event-driven asynchronous I/O backend services and financial gateways.', projects: ['State Street System'] },
  { atomicNumber: 19, symbol: 'Ex', name: 'Express', family: 'Backend', logoKey: 'express', description: 'Lightweight REST routing, middleware pipelines, and API services.', projects: ['State Street System'] },
  { atomicNumber: 20, symbol: 'Fa', name: 'FastAPI', family: 'Backend', logoKey: 'fastapi', description: 'Asynchronous high-performance Python APIs with automatic OpenAPI docs.', projects: ['AI Document Assistant'] },
  { atomicNumber: 21, symbol: 'Ra', name: 'RESTful APIs', family: 'Backend', logoKey: 'restapi', description: 'Contract-first API design, idempotent endpoints, and hypermedia standards.', projects: ['MRI Simmons Platform', 'State Street System'] },
  { atomicNumber: 22, symbol: 'Ag', name: 'API Gateway', family: 'Backend', logoKey: 'apigateway', description: 'Traffic routing, rate limiting, and centralized authentication policies.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 23, symbol: 'Pg', name: 'PostgreSQL', family: 'Backend', logoKey: 'postgresql', description: 'Relational schema design, ACID transactions, and indexing strategies.', projects: ['Enterprise Analytics'] },
  { atomicNumber: 24, symbol: 'My', name: 'MySQL', family: 'Backend', logoKey: 'mysql', description: 'Structured query optimization, connection pools, and database replication.', projects: ['Financial Records'] },
  { atomicNumber: 25, symbol: 'Ed', name: 'Event-Driven Arch', family: 'Backend', logoKey: 'eventdriven', description: 'Decoupled asynchronous messaging and real-time state broadcasts.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 26, symbol: 'Ms', name: 'Microservices', family: 'Backend', logoKey: 'microservices', description: 'Domain-driven bounded contexts and distributed service resilience.', projects: ['MRI Simmons Platform'] },

  // CI/CD & DevOps
  { atomicNumber: 27, symbol: 'Tb', name: 'Trunk-Based Dev', family: 'DevOps', logoKey: 'trunkbased', description: 'Fast iteration using feature flags and short-lived branches.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 28, symbol: 'Gf', name: 'Gitflow', family: 'DevOps', logoKey: 'gitflow', description: 'Structured release branching and hotfix synchronization.', projects: ['State Street System'] },
  { atomicNumber: 29, symbol: 'Gt', name: 'Git', family: 'DevOps', logoKey: 'git', description: 'Distributed version control, interactive rebasing, and branch hygiene.', projects: ['All Projects'] },
  { atomicNumber: 30, symbol: 'Jk', name: 'Jenkins Pipelines', family: 'DevOps', logoKey: 'jenkins', description: 'Declarative CI/CD build scripts, automated test gates, and image pushing.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 31, symbol: 'Dk', name: 'Docker', family: 'DevOps', logoKey: 'docker', description: 'Multi-stage container builds, predictable runtime isolation, and compose specs.', projects: ['MRI Simmons Platform', 'AI Document Assistant'] },
  { atomicNumber: 32, symbol: 'Jr', name: 'Jira & Agile', family: 'DevOps', logoKey: 'jira', description: 'Sprint backlog grooming, sprint velocity tracking, and agile ceremonies.', projects: ['Wipro Team Leadership'] },
  { atomicNumber: 33, symbol: 'Vc', name: 'Vercel & Railway', family: 'DevOps', logoKey: 'vercel', description: 'Zero-config serverless deployments, environment secrets, and live preview URLs.', projects: ['AI Document Assistant'] },

  // Security & Code Quality
  { atomicNumber: 34, symbol: 'Ow', name: 'OWASP Top 10', family: 'Security', logoKey: 'owasp', description: 'Remediation of XSS, SQLi, broken access control, and security misconfigurations.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 35, symbol: 'Sq', name: 'SonarQube', family: 'Security', logoKey: 'sonarqube', description: 'Automated static analysis, code smell detection, and quality gates.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 36, symbol: 'Sc', name: 'Secure Coding', family: 'Security', logoKey: 'securecoding', description: 'Defensive programming, input validation, and credential token handling.', projects: ['State Street System'] },
  { atomicNumber: 37, symbol: 'Nf', name: 'Non-Functional Req', family: 'Security', logoKey: 'nfr', description: 'Strict SLA targets, high TPS throughput verification, and auditability.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 38, symbol: 'Rc', name: 'Root-Cause Analysis', family: 'Security', logoKey: 'rca', description: 'Systematic post-mortems and regression test coverage to eliminate defects.', projects: ['Wipro Team Leadership'] },

  // Testing & Debugging
  { atomicNumber: 39, symbol: 'Td', name: 'TDD', family: 'Testing', logoKey: 'tdd', description: 'Red-green-refactor loop guaranteeing verified code behaviors prior to writing logic.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 40, symbol: 'Bd', name: 'BDD', family: 'Testing', logoKey: 'bdd', description: 'Behavior-driven scenarios bridging user stories with automated test cases.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 41, symbol: 'Vt', name: 'Vitest', family: 'Testing', logoKey: 'vitest', description: 'Blazing fast unit test execution native to Vite module ecosystems.', projects: ['MRI Simmons Platform', 'AI Document Assistant'] },
  { atomicNumber: 42, symbol: 'Jt', name: 'Jest', family: 'Testing', logoKey: 'jest', description: 'Snapshot testing, mock implementations, and code coverage assertions.', projects: ['State Street System', 'MRI Simmons Platform'] },
  { atomicNumber: 43, symbol: 'Rt', name: 'Testing Library', family: 'Testing', logoKey: 'testinglibrary', description: 'User-centric DOM testing prioritizing accessibility and realistic interactions.', projects: ['MRI Simmons Platform', 'State Street System'] },
  { atomicNumber: 44, symbol: 'Ct', name: 'API Contract Testing', family: 'Testing', logoKey: 'contracttesting', description: 'Schema verification preventing breaking payload changes across microservices.', projects: ['MRI Simmons Platform'] },

  // Design Patterns & GenAI
  { atomicNumber: 45, symbol: 'Dp', name: 'Design Patterns', family: 'Architecture', logoKey: 'designpatterns', description: 'Factory, Adapter, Singleton, and Dependency Injection architectural patterns.', projects: ['MRI Simmons Platform'] },
  { atomicNumber: 46, symbol: 'Cp', name: 'GitHub Copilot', family: 'GenAI', logoKey: 'copilot', description: 'AI-assisted code generation, inline agentic suggestions, and workflow acceleration.', projects: ['Wipro Team Leadership'] },
  { atomicNumber: 47, symbol: 'Py', name: 'Python', family: 'GenAI', logoKey: 'python', description: 'FastAPI scripting, vector transformations, and LangChain integration.', projects: ['AI Document Assistant'] },
  { atomicNumber: 48, symbol: 'Lc', name: 'LangChain', family: 'GenAI', logoKey: 'langchain', description: 'Orchestration of retrieval chains, prompt templates, and vector loaders.', projects: ['AI Document Assistant'] },
  { atomicNumber: 49, symbol: 'Cd', name: 'ChromaDB', family: 'GenAI', logoKey: 'chromadb', description: 'Embedding storage, nearest-neighbor similarity search, and persistence.', projects: ['AI Document Assistant'] },
  { atomicNumber: 50, symbol: 'Ai', name: 'Responsible AI', family: 'GenAI', logoKey: 'responsibleai', description: 'Data privacy handling, hallucination reduction, and safe LLM outputs.', projects: ['IIM Mumbai Exec', 'Wipro Team'] }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ai-doc-assistant',
    index: '01',
    title: 'AI-Powered Document Search & Assistant',
    kicker: 'Full-Stack RAG System',
    subtitle: 'React · TypeScript · FastAPI · Python · LangChain · ChromaDB',
    description:
      'A full-stack document search tool that lets users ask questions against PDF documents and get clear, accurate answers grounded in uploaded context.',
    features: [
      'Document Ingestion & Retrieval: Contextual document question-answering with LangChain retrieval chains and ChromaDB vector embeddings.',
      'Full-Stack Cloud Delivery: Clean React/TypeScript client connected to high-performance FastAPI microservice, deployed on Vercel and Railway.'
    ],
    tech: ['React', 'TypeScript', 'FastAPI', 'Python', 'LangChain', 'ChromaDB', 'Vite', 'Tailwind CSS', 'Vercel', 'Railway'],
    github: 'https://github.com/AadhishGIT/ChatApp',
    illustrativeType: 'rag-chat'
  },
  {
    id: 'mri-simmons',
    index: '02',
    title: 'MRI Simmons Consumer Insights Platform',
    kicker: 'Enterprise Analytics & Micro-Frontends',
    subtitle: 'Java (Spring Boot) · React · TypeScript · Micro Frontends · WCAG 2.1 AA · Jenkins',
    description:
      'Enterprise consumer analytics platform built for US market research. Scalable REST APIs and microservices in Java Spring Boot paired with an accessible React/TypeScript micro-frontend architecture.',
    features: [
      'Reusable Micro-Frontends: Shared UI component library adhering strictly to WCAG 2.1 AA accessibility standards, cutting feature build time by 35%.',
      'Automated DevSecOps: Trunk-Based Development, automated Jenkins CI/CD pipelines, Docker containerization, and continuous SonarQube OWASP Top 10 scans.'
    ],
    tech: ['Java', 'Spring Boot', 'React', 'TypeScript', 'Micro Frontends', 'Docker', 'Jenkins', 'SonarQube', 'WCAG 2.1 AA', 'Vitest'],
    illustrativeType: 'microfrontend-metrics'
  },
  {
    id: 'state-street',
    index: '03',
    title: 'State Street Investment Analytics Platform',
    kicker: 'Financial Services Web Architecture',
    subtitle: 'React · Redux · Node.js · Express · Performance Engineering',
    description:
      'High-throughput web applications for institutional asset managers at State Street Corporation, supporting multi-million-dollar investment portfolios with real-time financial tracking.',
    features: [
      'Real-Time Portfolio Tracking: Modular React and Redux dashboards connected with low-latency Node.js REST services for investment accounting.',
      'Performance Optimization: Refactored frontend codebase with dynamic code-splitting and lazy loading, reducing initial page load times by 30%.'
    ],
    tech: ['React', 'Redux', 'Node.js', 'Express', 'JavaScript', 'Webpack', 'Jest', 'RESTful APIs'],
    illustrativeType: 'portfolio-tracking'
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    index: '01',
    title: 'Accelerate App Development using GitHub Copilot',
    issuer: 'Microsoft Learn',
    link: 'https://drive.google.com/file/d/1yPLdx7bOIypGk3HYl9tlOI_jBSL0FJVj/view'
  },
  {
    index: '02',
    title: 'Executive Program: Data Driven Decision Making using Generative AI',
    issuer: 'IIM Mumbai & Masai School',
    date: 'Aug 2026',
    link: 'https://drive.google.com/file/d/1LPbRDPNdhYlj8cmjtI6Jq6cTZaZfYO0u/view'
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: 'Jun 2013 – Jun 2017',
    year: '2017',
    title: 'Bachelor of Engineering (B.E.)',
    organization: 'St. Vincent Pallotti College of Engineering & Technology',
    location: 'Nagpur, India',
    details: [
      'Graduated with CGPA: 7.58.',
      'Core foundations in algorithms, data structures, computer engineering, and software design.'
    ],
    type: 'education'
  },
  {
    period: 'Aug 2017 – Feb 2018',
    year: '2018',
    title: 'Post Graduate Diploma in Mobile Computing (PGDMC)',
    organization: 'CDAC ACTS',
    location: 'Bangalore, India',
    details: [
      'Specialized curriculum in mobile application architecture, distributed systems, and network computing.'
    ],
    type: 'education'
  },
  {
    period: 'May 2018 – Jun 2021',
    year: '2018',
    title: 'Programmer Analyst',
    organization: 'Cognizant Technology Solutions | Client: State Street Corporation',
    location: 'Pune, India',
    details: [
      'Financial Services Application Development: Built and supported web applications for institutional asset managers at State Street managing multi-million-dollar investment portfolios.',
      'UI & API Integration: Developed responsive UI modules using React.js and Redux, connecting them with backend REST services built in Node.js for real-time financial tracking.',
      'Performance Optimization: Refactored frontend code, added code-splitting and lazy loading, reducing initial page load times by 30%.',
      'Testing & Code Quality: Wrote comprehensive unit and component test suites to keep releases stable and ensure data accuracy across financial screens.',
      'Agile Collaboration: Collaborated with global engineering teams in daily Scrum ceremonies, sprint reviews, and peer code reviews.'
    ],
    type: 'work'
  },
  {
    period: 'Jun 2021 – Present',
    year: '2021',
    title: 'Technical Lead',
    organization: 'Wipro | Client: MRI Simmons (US Consumer Insights Platform)',
    location: 'Pune, India',
    details: [
      'Full-Stack Development: Built scalable REST APIs and microservices architectures using Java (Spring Boot), while developing responsive web frontends with React.js and TypeScript for an enterprise consumer analytics platform.',
      'UI Platform & Accessibility: Designed and maintained a reusable micro-frontend system and shared UI component library. Followed WCAG 2.1 AA accessibility standards and helped teams cut feature build time by 35%.',
      'Code Security & Scanning: Integrated automated security and quality scans into CI/CD pipelines using SonarQube. Fixed vulnerabilities and kept code aligned with OWASP Top 10 security standards.',
      'Trunk-Based CI/CD: Moved the team from complex Gitflow to Trunk-Based Development to speed up release cycles. Set up automated Jenkins CI/CD pipelines for automated testing, Docker builds, and deployments.',
      'Automated Testing (TDD/BDD): Applied Test-Driven Development (TDD) and BDD workflows. Wrote unit and integration tests using Vitest, Jest, and React Testing Library, plus API contract tests. Performed root-cause analysis on recurring defects and added tests to prevent repeats, lowering bug rates by 30%.',
      'Team Leadership & Agile: Led a 7-member agile team. Ran sprint planning, daily standups, code reviews, and product demos with Product Owners, balancing user needs with system performance.',
      'AI-Assisted Engineering & Responsible AI: Increased team delivery speed by 40% by adopting GitHub Copilot and GenAI tools. Set team standards for validating AI-generated code for correctness, performance, and security (peer review, automated tests, SonarQube scans) and coached developers on safe, compliant AI use, including data sensitivity and secure handling of inputs and outputs.',
      'Mentoring & Clean Code: Mentored junior developers on design patterns (Factory, Singleton, Dependency Injection) and clean coding practices.'
    ],
    type: 'work'
  },
  {
    period: 'Completed Aug 2026',
    year: '2026',
    title: 'Executive Program: Data Driven Decision Making using Generative AI',
    organization: 'IIM Mumbai & Masai School',
    location: 'Executive Education',
    details: [
      'Advanced study in enterprise GenAI implementations, data-driven strategy, and responsible AI governance.'
    ],
    type: 'education'
  }
];

export const EDUCATION = EXPERIENCE.filter((e) => e.type === 'education');

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    index: '01',
    total: '07',
    number: 8,
    suffix: '+',
    label: 'Years of Experience',
    caption: 'Full-Stack & Lead Engineering',
    detail: 'Enterprise financial services & consumer analytics platforms',
    logoKey: 'experience',
    brandColor: '#0d0d0d'
  },
  {
    index: '02',
    total: '07',
    number: 40,
    suffix: '%',
    label: 'Delivery Speed Increase',
    caption: 'GitHub Copilot & GenAI Adoption',
    detail: 'Championed responsible AI practices & team code validation',
    logoKey: 'copilot',
    brandColor: '#2b3137'
  },
  {
    index: '03',
    total: '07',
    number: 35,
    suffix: '%',
    label: 'Build Time Reduction',
    caption: 'Micro-Frontend Design System',
    detail: 'Reusable shared UI component library with WCAG 2.1 AA compliance',
    logoKey: 'react',
    brandColor: '#61dafb'
  },
  {
    index: '04',
    total: '07',
    number: 30,
    suffix: '%',
    label: 'Defect Rate Reduction',
    caption: 'TDD / BDD & Root-Cause Analysis',
    detail: 'Automated Vitest, Jest & API contract tests with zero regression',
    logoKey: 'testing',
    brandColor: '#15c213'
  },
  {
    index: '05',
    total: '07',
    number: 30,
    suffix: '%',
    label: 'Initial Load Time Cut',
    caption: 'Performance Optimization',
    detail: 'Code-splitting and lazy loading across multi-million dollar portfolios',
    logoKey: 'performance',
    brandColor: '#005a9c'
  },
  {
    index: '06',
    total: '07',
    number: 7,
    label: 'Agile Engineers Led',
    caption: 'Cross-Functional Squad Leadership',
    detail: 'Sprint planning, architecture reviews, and engineering mentorship',
    logoKey: 'leadership',
    brandColor: '#ff6600'
  },
  {
    index: '07',
    total: '07',
    number: 7.58,
    decimals: 2,
    label: 'Graduation CGPA',
    caption: 'Bachelor of Engineering (B.E.)',
    detail: 'St. Vincent Pallotti College of Engineering & Technology',
    logoKey: 'education',
    brandColor: '#4f46e5'
  }
];

export const KEY_ACHIEVEMENTS: KeyAchievementItem[] = [
  {
    title: 'Personalized Leadership Recognition',
    period: '2022–2023',
    description:
      'A personalized HARMAN appreciation letter recognizing exceptional performance and contributions.',
    image: siteAsset('/key-achievements/leadership-recognition.jpg'),
    imageAlt: 'Personalized HARMAN leadership recognition letter dated 20 June 2023',
    url: 'https://lnkd.in/p/ds4sTzMi'
  },
  {
    title: 'Outstanding Teamwork Certificate',
    period: 'FY 2021–2022',
    description:
      'A HARMAN “Teamwork & Respect” certificate recognizing collaboration and peer support.',
    image: siteAsset('/key-achievements/teamwork-certificate.jpg'),
    imageAlt: 'HARMAN Be Brilliant certificate recognizing Aadhish for teamwork and respect',
    url: 'https://lnkd.in/p/d2_C3dQK'
  }
];
