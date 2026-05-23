// ─────────────────────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH — edit this file to update all site content
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_META = {
  name: 'Sayantan Paul',
  initials: 'SP',
  title: 'Sayantan Paul — Senior Full Stack Engineer',
  description:
    'Senior Full Stack Engineer with 6+ years building scalable web and mobile applications.',
  tagline: 'Engineering ideas into\ndigital reality.',
  subTagline:
    'Senior Full Stack Engineer with 6+ years of experience building scalable SPAs, APIs, and mobile apps for global clients including Walmart and Renault Nissan.',
  location: 'Bangalore, India',
  availableForWork: true,
} as const

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'About',           href: '#about' },
  { label: 'Core Expertise',  href: '#expertise' },
  { label: 'Experience',      href: '#experience' },
  { label: 'Qualifications',  href: '#qualifications' },
  { label: 'Projects',        href: '#projects' },
  { label: 'Contact',         href: '#contact' },
] as const

// ─── HERO TICKER (scrolling marquee) ─────────────────────────────────────────
export const HERO_TICKER = [
  'React',
  'Node.js',
  'TypeScript',
  'React Native',
  'GraphQL',
  'PostgreSQL',
  'AWS',
  'Docker',
  'Angular',
  'REST API',
] as const

// ─── HERO STATS ──────────────────────────────────────────────────────────────
export const HERO_STATS = [
  { value: '6+',  label: 'Years Experience' },
  { value: '10+', label: 'Scalable Solutions' },
  { value: '99.9%', label: 'App Uptime' },
  { value: '3',   label: 'Global Clients' },
] as const

// ─── ABOUT / SKILLS ──────────────────────────────────────────────────────────
export const ABOUT_BIO = [
  'I am a Senior Full Stack Developer working on diverse projects for global clients including Walmart and Renault Nissan. My expertise lies in creating efficient web and mobile applications using modern frameworks and technologies.',
  'At Caspex Tech LLP I contribute to Walmart\'s Entertainment Service Platform — implementing 10+ scalable frontend solutions, improving code quality to 95%, and ensuring 99.9% application uptime.',
  'Beyond coding I specialize in optimizing workflows, mentoring teams, and solving challenging problems in Agile Scrum environments. Certified in AI/ML from IIIT Hyderabad and AWS Cloud Practitioner Essentials.',
] as const

export type SkillCategory = { label: string; items: readonly string[] }

export const SKILLS: SkillCategory[] = [
  {
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python'],
  },
  {
    label: 'Frontend',
    items: ['React', 'React Native', 'Angular', 'HTML5', 'CSS3'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'GraphQL', 'REST API', 'PostgreSQL'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS S3', 'AWS EC2', 'Docker', 'GitHub', 'GitLab', 'Bitbucket'],
  },
  {
    label: 'Methods & Tools',
    items: ['Agile Scrum', 'Confluence', 'JIRA', 'Mocha', 'Chai'],
  },
]

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
export type Job = {
  companyName: string
  role: string
  period: string
  location: string
  description: string
  bullets: readonly string[]
  tech: readonly string[]
}

export const EXPERIENCE: Job[] = [
  {
    companyName: 'Caspex Tech LLP',
    role: 'Senior Full Stack Developer',
    period: 'Mar 2024 – Present',
    location: 'Bangalore, India',
    description: 'Contributing to Walmart\'s Entertainment Service Platform — building scalable frontend solutions for mobile and gadget purchases across Walmart.com, both online and in-store across the US.',
    bullets: [
      'Built and maintained features on Walmart\'s Entertainment Service Platform (ESP) using ReactJS, React Native, and REST APIs.',
      'Implemented 10+ scalable frontend solutions gathered from client requirements and low-level design documents.',
      'Improved code quality to 95% through rigorous reviews and refactoring.',
      'Ensured 99.9% application uptime through proactive production support.',
      'Collaborated with cross-functional teams to integrate new features into Walmart\'s ecosystem.',
    ],
    tech: ['ReactJS', 'React Native', 'REST API', 'JavaScript', 'Agile Scrum'],
  },
  {
    companyName: 'Carelon Global Solutions',
    role: 'Full Stack Developer',
    period: 'Mar 2021 – Mar 2024',
    location: 'Bangalore, India',
    description: 'Designed and developed interactive SPAs and server-side APIs for healthcare clients, improving system performance, developer onboarding, and data query efficiency across the platform.',
    bullets: [
      'Designed and developed interactive SPAs using JavaScript (ES6), React, and CSS/HTML5.',
      'Built maintainable server-side APIs using Node.js, Express, Apollo GraphQL, and PostgreSQL.',
      'Created an automation script that reduced NodeJS migration script generation time by 50%.',
      'Reduced query response time by 25% through database performance optimisation.',
      'Mentored newly hired engineers with a 1-month full-stack onboarding programme.',
      'Reduced on-boarding time by 20% through comprehensive code documentation.',
    ],
    tech: ['React', 'Node.js', 'GraphQL', 'PostgreSQL', 'AWS', 'Twilio'],
  },
  {
    companyName: 'Renault Nissan Technology',
    role: 'Full Stack Developer',
    period: 'Aug 2018 – Mar 2021',
    location: 'Chennai, India',
    description: 'Worked as a full stack developer and scrum lead in an agile team, delivering end-to-end features for automotive systems while improving deployment speed and code quality across the SDLC.',
    bullets: [
      'Worked in an Agile Scrum team of 10+ as a full stack developer and led scrum ceremonies.',
      'Served as Point of Contact for 7 months, driving all development decisions.',
      'Maintained code quality ratio of ~73% following best practices.',
      'Reduced deployment times by 15% by streamlining deployment processes.',
      'Participated in the full SDLC from requirements gathering through system implementation.',
    ],
    tech: ['TypeScript', 'Angular', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'REST API'],
  },
]

// ─── EDUCATION & CERTIFICATIONS ───────────────────────────────────────────────
export const EDUCATION = [
  {
    institution: 'SRM Institute of Science and Technology',
    degree: "Bachelor's Degree in Electronics & Communication Engineering",
    period: '2014 – 2018',
    detail: 'CGPA: 9.1',
  },
  {
    institution: 'Delhi Public School, Siliguri',
    degree: 'Higher Secondary Education (HSC)',
    period: '2012 – 2014',
    detail: '86%',
  },
] as const

export const CERTIFICATIONS = [
  {
    title: 'AWS Cloud Practitioner Essentials',
    issuer: 'Amazon Web Services',
    credentialId: 'E-N0539V',
    link: null,
  },
  {
    title: 'Advanced Certification in AI / ML',
    issuer: 'IIIT Hyderabad via TalentSprint',
    credentialId: null,
    link: 'https://cdn.talentsprint.com/portfolios/certificates/2001490.jpg',
  },
] as const

// ─── PROJECTS ────────────────────────────────────────────────────────────────
export type Project = {
  title: string
  type: 'Professional' | 'Personal'
  description: string
  tech: readonly string[]
  link: string | null
  linkLabel: string | null
  year: string
}

export const PROJECTS: Project[] = [
  {
    title: 'ESP — Walmart Entertainment Service Platform',
    type: 'Professional',
    description:
      'Customer-centric platform enhancing user experience for mobile and gadget purchases on Walmart.com — covering both online and in-store applications across the US.',
    tech: ['ReactJS', 'React Native', 'REST API', 'JavaScript'],
    link: 'https://www.walmart.com/',
    linkLabel: 'walmart.com',
    year: '2024',
  },
  {
    title: 'Zipdrug — Carelon Global Solutions',
    type: 'Professional',
    description:
      'Data-driven pharmacy benefit programme connecting health plan members with top-performing pharmacies, providing doorstep medication delivery and clinical concierge services.',
    tech: ['React', 'Node.js', 'GraphQL', 'PostgreSQL'],
    link: 'http://www.zipdrug.com/',
    linkLabel: 'zipdrug.com',
    year: '2022',
  },
  {
    title: 'OnePDL — Renault Nissan',
    type: 'Professional',
    description:
      'Internal vehicle parts database enabling engineers to import part dimensions and auto-generate blueprints, reducing manual effort significantly across new vehicle development.',
    tech: ['TypeScript', 'Angular', 'Node.js', 'PostgreSQL', 'Docker'],
    link: null,
    linkLabel: null,
    year: '2019',
  },
  {
    title: 'Finance Tracker',
    type: 'Personal',
    description:
      'Full-stack app for monitoring financial transactions with detailed spending summaries, built with a modern React UI and RESTful Node backend.',
    tech: ['ReactJS', 'Node.js', 'Express', 'MongoDB', 'Vite'],
    link: 'https://github.com/Sayantanpaul96/finance-tracker',
    linkLabel: 'GitHub',
    year: '2023',
  },
  {
    title: 'Dummy Torrent Downloader',
    type: 'Personal',
    description:
      'CLI tool that downloads torrents via .torrent file path or magnet link with a configurable download directory and real-time console progress.',
    tech: ['Node.js'],
    link: 'https://github.com/Sayantanpaul96/dummy-torrent-downloader',
    linkLabel: 'GitHub',
    year: '2022',
  },
  {
    title: 'PokéDex',
    type: 'Personal',
    description:
      'Interactive Pokédex that fetches live Pokémon stats and abilities from the PokéAPI, built as a deep-dive into React fundamentals.',
    tech: ['ReactJS', 'PokéAPI'],
    link: 'https://github.com/Sayantanpaul96/Pokedex',
    linkLabel: 'GitHub',
    year: '2021',
  },
]

// ─── CONTACT ─────────────────────────────────────────────────────────────────
export const CONTACT = {
  email: 'paulsayantan96.work@gmail.com',
  phone: '+91 62962 67640',
  whatsapp: '+91 98324 82671',
  github: 'https://github.com/Sayantanpaul96',
  linkedin: 'https://www.linkedin.com/in/sayantan-paul-831558122/',
} as const

// ─── HERO SECTION ─────────────────────────────────────────────────────────────

export const HERO_CONTENT = {
  subtitle: 'Transforming ideas into\ndigital experiences.',
  ctaLabel: 'Get started',
  companiesLabel: 'Great companies deserve great websites',
} as const

export const HERO_SERVICES = [
  'Web Development',
  'Node.js Development',
  'AI Development',
  'Cloud Architecture',
  'Full Stack Engineering',
  'DevOps & CI/CD',
] as const

export const HERO_COMPANIES = [
  { name: 'Walmart' },
  { name: 'Carelon Global' },
  { name: 'Renault Nissan' },
] as const

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────

export const ABOUT_CONTENT = {
  ctaLabel: 'Get in touch',
  linkedInLabel: 'LinkedIn',
} as const

// ─── CORE EXPERTISE SECTION ───────────────────────────────────────────────────

export const EXPERTISE = [
  {
    num: '[01]',
    label: 'Full Stack Development',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'REST API', 'GraphQL'],
  },
  {
    num: '[02]',
    label: 'Mobile Applications',
    tags: ['React Native', 'iOS', 'Android', 'Expo'],
  },
  {
    num: '[03]',
    label: 'Database & Backend',
    tags: ['PostgreSQL', 'MongoDB', 'Redis', 'GraphQL', 'Prisma'],
  },
  {
    num: '[04]',
    label: 'Cloud & DevOps',
    tags: ['AWS', 'Docker', 'CI/CD', 'Kubernetes', 'Terraform'],
  },
  {
    num: '[05]',
    label: 'Performance Engineering',
    tags: ['99.9% Uptime', '95%+ Code Quality', 'Load Testing', 'Optimization'],
  },
  {
    num: '[06]',
    label: 'Agile Leadership',
    tags: ['Scrum', 'Mentoring', 'Global Delivery', 'Team Lead'],
  },
] as const

// ─── EXPERIENCE SECTION ───────────────────────────────────────────────────────

export const EXPERIENCE_CONTENT = {
  subtitle: "6+ years engineering scalable products for global clients, from Walmart's entertainment platform to healthcare and automotive systems.",
} as const

// ─── QUALIFICATIONS SECTION ───────────────────────────────────────────────────

export const QUALIFICATIONS_CONTENT = {
  subtitle: 'Academic foundations and professional certifications that underpin my engineering practice.',
} as const

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────

export const PROJECTS_CONTENT = {
  subtitleSuffix: 'projects spanning enterprise client platforms and personal experiments — from retail and healthcare to automotive and developer tooling.',
  githubLabel: 'View GitHub',
} as const

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────

export const CONTACT_CONTENT = {
  subtitle: "Have a project in mind or just want to say hello? Reach out via email or WhatsApp — I'm always open to interesting conversations.",
  emailLabel: 'Send an email',
  whatsappLabel: 'WhatsApp',
} as const
