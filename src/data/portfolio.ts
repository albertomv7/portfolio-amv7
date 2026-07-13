import {
  Code2,
  Database,
  Layers3,
  LayoutDashboard,
  Network,
  Rocket,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UsersRound
} from "lucide-react";

export const siteConfig = {
  name: "Alberto MV Domingos",
  role: "Desenvolvedor Web Full Stack",
  description:
    "Especialista em desenvolvimento de aplicações web modernas utilizando Laravel, PHP e Python.",
  url: "https://albertomv7.vercel.app",
  email: "albertomanueldomingos7@gmail.com",
  socials: {
    github: "https://github.com/albertomv7",
    facebook: "https://www.facebook.com/albert0mv7/",
    instagram: "",
    linkedin: ""
  }
};

export const navItems = [
  { label: "Sobre", href: "#sobre" },
  { label: "Educação", href: "#educacao" },
  { label: "Competências", href: "#competencias" },
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Tecnologias", href: "#tecnologias" },
  { label: "Contacto", href: "#contacto" }
];

export const stats = [
  { value: 3, suffix: "+", label: "anos de experiência" },
  { value: 5, suffix: "+", label: "projetos desenvolvidos" },
  { value: 10, suffix: "+", label: "tecnologias modernas" }
];

export const aboutHighlights = [
  "Código limpo",
  "Arquitetura organizada",
  "Interfaces modernas",
  "APIs",
  "Sistemas administrativos",
  "Sistemas empresariais",
  "Desenvolvimento sob medida"
];

export const education = [
  {
    title: "Engenharia Informática",
    institution: "Universidade Independente de Angola",
    period: "2023 - Presente",
    type: "Universidade",
    description:
      "Formação superior focada em Engenharia de Software, Desenvolvimento Web, Banco de Dados, Inteligência Artificial, Redes de Computadores, Arquitetura de Sistemas e Programação."
  },
  {
    title: "Curso Técnico Médio de Informática",
    institution: "Instituto Médio Politécnico Nova Vida",
    period: "2019 - 2023",
    type: "Ensino Médio",
    description:
      "Formação técnica em programação, manutenção informática, redes, banco de dados, algoritmos, sistemas operacionais e desenvolvimento de software."
  }
];

export const skills = [
  {
    title: "Backend",
    level: 92,
    icon: ServerCog,
    items: ["Laravel", "PHP", "Python", "Java", "Spring Boot", "APIs REST"]
  },
  {
    title: "Frontend",
    level: 90,
    icon: LayoutDashboard,
    items: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Tailwind CSS", "React"]
  },
  {
    title: "Banco de Dados",
    level: 84,
    icon: Database,
    items: ["MySQL", "PostgreSQL"]
  },
  {
    title: "Ferramentas",
    level: 88,
    icon: Code2,
    items: ["Git", "GitHub", "VS Code", "Figma", "Vercel"]
  },
  {
    title: "Outros",
    level: 86,
    icon: Sparkles,
    items: ["UI/UX", "Responsividade", "SEO", "Arquitetura MVC", "Segurança Web", "Redes"]
  }
];

export type Project = {
  name: string;
  description: string;
  image?: string;
  features: string[];
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
  projectUrl: string;
};

export const projects: Project[] = [
  {
    name: "Sistema de Gerenciamento Hospitalar",
    description: "Sistema completo para clínicas e hospitais com operações administrativas integradas.",
    image: "/Sistema de Gerenciamento Hospitalar.png",
    features: ["Gestão de pacientes", "Consultas", "Farmácia", "Relatórios", "Utilizadores"],
    technologies: ["PHP", "Bootstrap", "MySQL","HTML5", "CSS3", "JavaScript"],
    demoUrl: "#",
    githubUrl: "https://github.com/albertomv7/SGH-AMV7",
    projectUrl: "#"
  },
  {
    name: "Sistema de Gerenciamento de Esquadra Policial",
    description: "Aplicação para gestão administrativa de ocorrências, equipas e recursos operacionais.",
    image: "/SGEP.png",
    features: ["Gestão de ocorrências", "Policiais", "Escalas", "Viaturas", "Cidadãos", "Relatórios"],
    technologies: ["Spring Boot", "Java", "MySQL", "HTML5", "CSS3", "JavaScript"],
    demoUrl: "#",
    githubUrl: "https://github.com/albertomv7/SGEP",
    projectUrl: "#"
  },
  {
    name: "Sistema de Gestão Universitária Inteligente",
    description:
      "Plataforma inteligente para gestão académica e administrativa universitária.",
    image: "/Sistema de Gestão Universitária Inteligente.png",
    features: ["Gestão de estudantes", "Cursos e turmas", "Matrículas", "Notas", "Relatórios", "Automatização académica"],
    technologies: ["Python", "MySQL", "HTML5", "CSS3", "JavaScript"],
    demoUrl: "#",
    githubUrl: "#",
    projectUrl: "#"
  }
];

export const experiences = [
  {
    title: "Desenvolvimento Web",
    subtitle: "Desenvolvimento Web",
    description: "Criação de sistemas web personalizados, landing pages, painéis administrativos e soluções digitais sob medida.",
    icon: Code2
  },
  {
    title: "Backend e APIs",
    subtitle: "Lógica de negócio",
    description: "Desenvolvimento de APIs, integrações, regras de negócio e estruturas de dados para aplicações robustas.",
    icon: ServerCog
  },
  {
    title: "Redes de Computadores",
    subtitle: "Base complementar",
    description: "Conhecimentos de redes aplicados como apoio à segurança, deploy e compreensão da infraestrutura das aplicações.",
    icon: Network
  }
];

export const services = [
  { title: "Desenvolvimento Web", description: "Aplicações modernas, rápidas e seguras.", icon: Code2 },
  { title: "Sistemas Empresariais", description: "Soluções internas para automatizar processos.", icon: Layers3 },
  { title: "Landing Pages", description: "Páginas comerciais com foco em conversão.", icon: Rocket },
  { title: "APIs", description: "Integrações REST estáveis e bem documentadas.", icon: ServerCog },
  { title: "Manutenção de Sistemas", description: "Correções, melhorias e evolução contínua.", icon: ShieldCheck },
  { title: "Consultoria Tecnológica", description: "Decisões técnicas com clareza e estratégia.", icon: UsersRound }
];

export const technologies = [
  { name: "Laravel", slug: "laravel", color: "#ff2d20" },
  { name: "PHP", slug: "php", color: "#777bb4" },
  { name: "Python", slug: "python", color: "#3776ab" },
  { name: "Java", slug: "java", color: "#f89820" },
  { name: "Spring Boot", slug: "spring", color: "#6db33f" },
  { name: "HTML5", slug: "html", color: "#e34f26" },
  { name: "CSS3", slug: "css", color: "#1572b6" },
  { name: "Bootstrap", slug: "bootstrap", color: "#7952b3" },
  { name: "Tailwind CSS", slug: "tailwind", color: "#38bdf8" },
  { name: "JavaScript", slug: "javascript", color: "#f7df1e" },
  { name: "MySQL", slug: "mysql", color: "#4479a1" },
  { name: "Git", slug: "git", color: "#f05032" },
  { name: "GitHub", slug: "github", color: "#f8fafc" },
  { name: "React", slug: "react", color: "#61dafb" },
  { name: "Next.js", slug: "next", color: "#f8fafc" },
  { name: "TypeScript", slug: "typescript", color: "#3178c6" }
];

export const i18n = {
  defaultLocale: "pt-AO",
  locales: ["pt-AO", "en"]
};
