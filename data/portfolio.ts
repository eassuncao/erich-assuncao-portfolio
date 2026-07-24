export type Project = {
  readonly number: string;
  readonly title: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly result: string;
  readonly tags: readonly string[];
  readonly href: `/projects/${string}.pdf`;
  readonly cover: `/project-covers/${string}.png`;
  readonly sourceHref?: `https://github.com/${string}`;
  readonly featured?: boolean;
  readonly featuredSummary?: string;
};

type LabelledDetail = {
  readonly label: string;
  readonly value: string;
  readonly detail?: string;
};

type TimelineItem = {
  readonly period: string;
  readonly title: string;
  readonly description: string;
};

export const contactDetails = {
  name: "Erich Assuncao",
  initials: "EA",
  professionalTitle: "Software Developer and Information Systems Professional",
  brandSubtitle: "Systems / software / people",
  email: "erichassuncao@gmail.com",
  emailHref: "mailto:erichassuncao@gmail.com",
  resumeHref: "/erich-assuncao-resume.pdf",
  location: "Canada",
} as const;

export const navigationItems = [
  { label: "Work", href: "#work" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
] as const;

export const profileLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/erich-assuncao-69a9b01bb",
  },
  {
    label: "GitHub",
    href: "https://github.com/eassuncao",
  },
] as const;

export const projects: readonly Project[] = [
  {
    number: "01",
    title: "User Connections & Discovery",
    eyebrow: "Production full-stack feature",
    description:
      "Built iQuirium’s social graph from the database up: a privacy-aware relationship model, complete invitation lifecycle, discovery experience, typed API integration, and multi-layer test suite.",
    featuredSummary:
      "A tested, full-stack social discovery capability designed around useful human connections.",
    result: "Delivered independently and running in production",
    tags: ["C# / .NET", "PostgreSQL", "Next.js / React", "CQRS", "220+ tests"],
    href: "/projects/user-connections-discovery.pdf",
    cover: "/project-covers/user-connections-discovery.png",
    featured: true,
  },
  {
    number: "02",
    title: "PostgreSQL Database Design",
    eyebrow: "Data architecture & SQL",
    description:
      "Designed a normalized relational system for a retail and café operation, then carried it through reporting queries, indexing, execution-plan analysis, access control, and transaction design.",
    result: "From ERD and 3NF to operational reporting",
    tags: ["PostgreSQL", "SQL", "ERD", "Indexing", "Transactions"],
    href: "/projects/postgresql-database-design.pdf",
    cover: "/project-covers/postgresql-database-design.png",
  },
  {
    number: "03",
    title: "Learning Analytics & Sentiment",
    eyebrow: "Python analytics pipeline",
    description:
      "Turned six weeks of Brightspace discussion exports into structured evidence about participation, timing, replies, length, and sentiment using a reusable extraction and analysis workflow.",
    result: "Earlier posts correlated with more replies (r = −0.35, p = .008)",
    tags: ["Python", "pandas", "VADER", "Tableau", "Statistics"],
    href: "/projects/learning-analytics-sentiment.pdf",
    cover: "/project-covers/learning-analytics-sentiment.png",
  },
  {
    number: "04",
    title: "Data Mining with Weka",
    eyebrow: "Applied machine learning",
    description:
      "Compared association rules, supervised classifiers, and clustering methods across retail and scientific datasets—pairing parameter choices with quantitative evaluation and practical interpretation.",
    result: "96% cross-validation accuracy across three Iris classifiers",
    tags: ["Weka", "Apriori", "Classification", "Clustering", "Evaluation"],
    href: "/projects/data-mining-weka.pdf",
    cover: "/project-covers/data-mining-weka.png",
  },
  {
    number: "05",
    title: "Interactive Dashboards with Python",
    eyebrow: "Learning technology",
    description:
      "Created a hands-on learning resource that moves from Python fundamentals to interactive dashboards and purposeful data storytelling through practical examples and guided activities.",
    result: "A complete learning path from syntax to visual narrative",
    tags: ["Python", "Plotly", "Streamlit", "pandas", "Altair"],
    href: "/projects/interactive-dashboards-python.pdf",
    cover: "/project-covers/interactive-dashboards-python.png",
  },
  {
    number: "06",
    title: "Beyond Pointsification",
    eyebrow: "MSc research & framework design",
    description:
      "Examined how gamified learning can support motivation beyond points and rewards, then proposed the Activation–Transition–Internalization–Durability framework.",
    result: "A practical lens for designing motivation that lasts",
    tags: ["Research", "Learning systems", "SDT", "ATID", "Synthesis"],
    href: "/projects/beyond-pointsification-atid.pdf",
    cover: "/project-covers/beyond-pointsification-atid.png",
  },
  {
    number: "07",
    title: "FASTA Inspector",
    eyebrow: "Bioinformatics sequence-analysis CLI",
    description:
      "Built a dependency-free Python tool that parses mixed FASTA files, classifies each sequence as DNA/RNA or protein, and applies the appropriate composition and sequence metrics automatically.",
    result: "188 automated tests with zero external runtime dependencies",
    tags: ["Python", "Bioinformatics", "FASTA", "CLI", "pytest"],
    href: "/projects/fasta-inspector-bioinformatics.pdf",
    cover: "/project-covers/fasta-inspector-bioinformatics.png",
    sourceHref: "https://github.com/eassuncao/fasta_inspector",
  },
];

export const featuredProject = projects[0];

export const evidenceItems: readonly LabelledDetail[] = [
  {
    label: "Quality signal",
    value: "220+ automated tests",
    detail: "Confidence across every layer",
  },
  {
    label: "Delivery scope",
    value: "End-to-end ownership",
    detail: "Data model to production release",
  },
  {
    label: "Academic foundation",
    value: "MSc Computing & IS",
    detail: "3.97 / 4.00 graduate GPA",
  },
  {
    label: "Human context",
    value: "Interpretation + counselling",
    detail: "Complex settings, careful communication",
  },
];

export const skillGroups: readonly LabelledDetail[] = [
  {
    label: "Build",
    value: "C#, ASP.NET Core, TypeScript, JavaScript, React, Next.js, Python",
  },
  {
    label: "Connect",
    value:
      "REST APIs, Entity Framework Core, PostgreSQL, SQL, OpenAPI, TanStack Query",
  },
  {
    label: "Design",
    value:
      "Domain modelling, CQRS, relational data design, clean architecture, systems analysis",
  },
  {
    label: "Prove",
    value:
      "xUnit, WebApplicationFactory, Vitest, Testing Library, API and integration testing",
  },
];

export const experienceItems: readonly TimelineItem[] = [
  {
    period: "2024—2026",
    title: "Software Engineer · iQuirium",
    description:
      "Part-time, remote. Built production full-stack features across C#, ASP.NET Core, REST APIs, PostgreSQL, TypeScript, Next.js, and React, including a privacy-aware connections and discovery capability backed by approximately 220 tests.",
  },
  {
    period: "2022—Present",
    title: "Counsellor / Psychotherapy-Informed Practitioner",
    description:
      "Provide individual counselling and psychology-informed support in Portuguese and English using active listening, structured reflection, careful documentation, and confidentiality-aware practice.",
  },
  {
    period: "2014—Present",
    title: "English–Portuguese Interpreter",
    description:
      "Provide professional interpretation across healthcare, legal, community, settlement, education, and faith-based settings, requiring accuracy, confidentiality, adaptability, and clear cross-cultural communication.",
  },
  {
    period: "2017—2021",
    title: "E-commerce Store Owner · The Buyer’s Haven (Amazon FBA)",
    description:
      "Designed and operated a fully remote Amazon FBA business using outsourced product sourcing and data entry, third-party logistics, inventory and financial reporting, and automated repricing.",
  },
];

export const educationItems: readonly TimelineItem[] = [
  {
    period: "2024—2026",
    title: "MSc Computing & Information Systems",
    description:
      "Athabasca University · All requirements completed · 3.97 / 4.00 GPA.",
  },
  {
    period: "2023—2024",
    title: "Graduate Certificate in Information Technology Management",
    description:
      "Athabasca University · A in all four courses · Laddered into the MSc program.",
  },
  {
    period: "2019—2023",
    title: "BA Psychology & Information Systems",
    description:
      "Trent University · A average · President’s and Dean’s Honour Rolls.",
  },
];

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: contactDetails.name,
  jobTitle: contactDetails.professionalTitle,
  email: contactDetails.emailHref,
  knowsLanguage: ["English", "Portuguese"],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Athabasca University",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Trent University",
    },
  ],
  sameAs: profileLinks.map((link) => link.href),
};
