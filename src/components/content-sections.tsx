"use client";

import { ExternalLink, Facebook, Github, Instagram, Linkedin, Mail, Send } from "lucide-react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";

import { MotionDiv, MotionSection } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import {
  aboutHighlights,
  education,
  experiences,
  projects,
  services,
  siteConfig,
  skills,
  technologies
} from "@/data/portfolio";
import type { Project } from "@/data/portfolio";

const fadeIn = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55 }
};

export function AboutSection() {
  return (
    <MotionSection id="sobre" className="section-padding" {...fadeIn}>
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading eyebrow="Sobre mim" title="Soluções elegantes para problemas reais." className="mx-0 text-left" />
        <div className="space-y-5 text-base leading-7 text-muted-foreground">
          <p>
            Sou um Desenvolvedor Web Full Stack apaixonado por tecnologia e inovação, com mais de 3 anos de experiência
            desenvolvendo sistemas web modernos, escaláveis e seguros.
          </p>
          <p>
            Transformo problemas complexos em soluções elegantes utilizando boas práticas de programação, arquitetura
            organizada e interfaces pensadas para pessoas. Tenho experiência tanto no frontend como no backend e estou
            constantemente aprendendo novas tecnologias.
          </p>
          <p>
            Meu foco principal é programação, com conhecimentos de redes de computadores como apoio para criar,
            publicar e manter aplicações mais sólidas.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {aboutHighlights.map((item) => (
              <span key={item} className="rounded-md border border-border bg-card/70 px-3 py-2 text-sm font-medium text-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

export function EducationSection() {
  return (
    <MotionSection id="educacao" className="section-padding bg-muted/30" {...fadeIn}>
      <div className="container">
        <SectionHeading eyebrow="Educação" title="Base académica e técnica sólida." />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2" />
          {education.map((item, index) => (
            <div key={item.title} className="relative mb-8 grid gap-6 md:grid-cols-2">
              <div className={index % 2 === 0 ? "md:text-right" : "md:col-start-2"}>
                <div className="glass rounded-lg p-6">
                  <p className="text-detail text-[0.68rem] font-semibold text-primary">{item.type}</p>
                  <h3 className="mt-3 text-xl">{item.title}</h3>
                  <p className="mt-2 font-medium text-muted-foreground">{item.institution}</p>
                  <p className="mt-1 text-sm text-primary">{item.period}</p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <span className="absolute left-2.5 top-8 h-3 w-3 rounded-full bg-primary shadow-glow md:left-[calc(50%-6px)]" />
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

export function SkillsSection() {
  return (
    <MotionSection id="competencias" className="section-padding" {...fadeIn}>
      <div className="container">
        <SectionHeading eyebrow="Competências" title="Stack completa para produtos digitais." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div key={skill.title} className="glass rounded-lg p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-md bg-primary/15 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg">{skill.title}</h3>
                </div>
                <div className="mt-6 h-2 rounded-full bg-muted">
                  <MotionDiv className="h-full rounded-full bg-primary" initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} viewport={{ once: true }} transition={{ duration: 1 }} />
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="rounded-md bg-muted px-2.5 py-1.5 font-detail text-[0.66rem] font-medium text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

function ProjectCover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`Capa do projeto ${project.name}`}
        fill
        className="object-cover transition duration-500 group-hover:scale-105"
        sizes="(min-width: 1024px) 33vw, 100vw"
      />
    );
  }

  return (
    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.18),transparent_34%),linear-gradient(135deg,hsl(var(--card)),hsl(var(--muted)))] p-6">
      <div className="w-full max-w-[15rem] rounded-lg border border-dashed border-primary/40 bg-background/55 p-5 text-center backdrop-blur">
        <p className="font-display text-lg text-foreground">{project.name}</p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">Espaço reservado para uma capa real do projeto.</p>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <MotionSection id="projetos" className="section-padding bg-muted/30" {...fadeIn}>
      <div className="container">
        <SectionHeading eyebrow="Projetos" title="Sistemas desenhados para operação real." />
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project) => (
            <article key={project.name} className="glass group overflow-hidden rounded-lg">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                <ProjectCover project={project} />
              </div>
              <div className="p-6">
                <h3 className="text-xl">{project.name}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-md bg-primary/12 px-2.5 py-1.5 font-detail text-[0.66rem] font-medium text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  {project.features.slice(0, 4).map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  <Button asChild size="sm" variant="secondary">
                    <a href={project.demoUrl}>Demo</a>
                  </Button>
                  <Button asChild size="sm" variant="secondary">
                    <a href={project.githubUrl}>
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild size="sm">
                    <a href={project.projectUrl}>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

export function ExperienceSection() {
  return (
    <MotionSection id="experiencia" className="section-padding" {...fadeIn}>
      <div className="container">
        <SectionHeading eyebrow="Experiência" title="Execução técnica com visão prática." />
        <div className="grid gap-5 md:grid-cols-3">
          {experiences.map((experience) => {
            const Icon = experience.icon;
            return (
              <div key={experience.title} className="glass rounded-lg p-6">
                <Icon className="h-8 w-8 text-primary" />
                <h3 className="mt-5 text-xl">{experience.title}</h3>
                <p className="mt-1 font-display font-medium text-primary">{experience.subtitle}</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{experience.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

export function ServicesSection() {
  return (
    <MotionSection id="servicos" className="section-padding bg-muted/30" {...fadeIn}>
      <div className="container">
        <SectionHeading eyebrow="Serviços" title="Do desenho da solução ao deploy." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="glass rounded-lg p-6 transition hover:-translate-y-1">
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="mt-5 text-lg">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}

function TechnologyLogo({ slug, color, name }: { slug: string; color: string; name: string }) {
  const common = {
    className: "h-12 w-12 drop-shadow-[0_10px_24px_rgba(0,0,0,0.25)]",
    role: "img",
    "aria-label": name
  };

  switch (slug) {
    case "laravel":
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path d="M12 15 28 6l16 9v18l-16 9-16-9V15Z" stroke={color} strokeWidth="5" strokeLinejoin="round" />
          <path d="M44 15 52 20v18l-16 9-8-5" stroke={color} strokeWidth="5" strokeLinejoin="round" />
          <path d="M28 6v18l16 9M12 15l16 9v18" stroke={color} strokeWidth="5" strokeLinejoin="round" />
        </svg>
      );
    case "php":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <ellipse cx="32" cy="32" rx="28" ry="17" fill={color} />
          <text x="32" y="38" textAnchor="middle" fontSize="17" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">
            PHP
          </text>
        </svg>
      );
    case "python":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <path d="M31 7h14a9 9 0 0 1 9 9v13H26a8 8 0 0 0-8 8v5H10V24a9 9 0 0 1 9-9h12V7Z" fill={color} />
          <path d="M33 57H19a9 9 0 0 1-9-9V35h28a8 8 0 0 0 8-8v-5h8v18a9 9 0 0 1-9 9H33v8Z" fill="#ffd43b" />
          <circle cx="24" cy="16" r="3" fill="#fff" />
          <circle cx="40" cy="48" r="3" fill="#273849" />
        </svg>
      );
    case "java":
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path d="M31 11c10 8-10 12 0 22M40 7c11 12-14 14-2 27" stroke={color} strokeWidth="4" strokeLinecap="round" />
          <path d="M18 39c8 5 23 5 31 0M15 47c11 6 27 6 38 0M22 55c8 3 20 3 28 0" stroke="#4b8bbe" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "spring":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <path d="M52 14c-5 2-9 2-14 1C23 12 11 22 11 36c0 11 9 20 21 20 16 0 26-14 22-30 4-3 6-7 7-12-3 2-6 2-9 0Z" fill={color} />
          <path d="M19 40c11-14 23-15 34-13C42 29 31 34 23 47" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "html":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <path d="M12 7h40l-4 46-16 5-16-5L12 7Z" fill={color} />
          <path d="M32 13h14l-1 6H32v7h12l-2 18-10 3V13Z" fill="#ffb199" />
          <path d="M32 39l6-2 .5-6H32v-5h12l-1.5 15L32 45v-6Z" fill="#fff" />
        </svg>
      );
    case "css":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <path d="M12 7h40l-4 46-16 5-16-5L12 7Z" fill={color} />
          <path d="M32 13h14l-.7 6H32v7h12.5L43 41l-11 4v-6l6-2 .4-5H32V13Z" fill="#9bd4ff" />
          <path d="M20 19h12v7H20l-.5-7ZM20 32h12v13l-11-4-.7-7h6l.2 3 5 2v-7H20Z" fill="#fff" />
        </svg>
      );
    case "bootstrap":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <rect x="8" y="12" width="48" height="40" rx="12" fill={color} />
          <path d="M24 20h11c6 0 10 3 10 8 0 3-2 5-5 6 4 1 6 4 6 8 0 6-5 9-12 9H24V20Zm8 12h3c3 0 4-1 4-3s-2-3-4-3h-3v6Zm0 13h4c3 0 5-1 5-4s-2-4-5-4h-4v8Z" fill="#fff" />
        </svg>
      );
    case "tailwind":
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <path d="M32 19c-8 0-13 4-16 12 3-4 7-5 12-3 3 1 5 4 9 4 8 0 13-4 16-12-3 4-7 5-12 3-3-1-5-4-9-4ZM16 32C8 32 3 36 0 44c3-4 7-5 12-3 3 1 5 4 9 4 8 0 13-4 16-12-3 4-7 5-12 3-3-1-5-4-9-4Z" fill={color} transform="translate(6 0)" />
        </svg>
      );
    case "javascript":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <rect x="8" y="8" width="48" height="48" rx="6" fill={color} />
          <text x="33" y="45" textAnchor="middle" fontSize="25" fontWeight="900" fill="#111827" fontFamily="Arial, sans-serif">
            JS
          </text>
        </svg>
      );
    case "mysql":
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="18" rx="22" ry="8" fill={color} />
          <path d="M10 18v25c0 5 10 9 22 9s22-4 22-9V18" fill={color} opacity=".82" />
          <path d="M10 30c0 5 10 9 22 9s22-4 22-9M10 42c0 5 10 9 22 9s22-4 22-9" stroke="#fff" strokeWidth="3" opacity=".75" />
        </svg>
      );
    case "git":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <rect x="13" y="13" width="38" height="38" rx="6" fill={color} transform="rotate(45 32 32)" />
          <path d="M25 22v18M25 29h12M37 29l7 7" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="25" cy="22" r="4" fill="#fff" />
          <circle cx="25" cy="40" r="4" fill="#fff" />
          <circle cx="44" cy="36" r="4" fill="#fff" />
        </svg>
      );
    case "github":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="26" fill="currentColor" className="text-foreground" />
          <path d="M24 51c1-5 0-7-2-9-5-1-9-5-9-12 0-3 1-6 3-8-1-2-1-5 0-8 4 0 7 2 9 4 2-.5 5-1 7-1s5 .5 7 1c2-2 5-4 9-4 1 3 1 6 0 8 2 2 3 5 3 8 0 7-4 11-9 12-2 2-3 4-2 9" fill="none" stroke="hsl(var(--background))" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case "react":
      return (
        <svg {...common} viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="5" fill={color} />
          <ellipse cx="32" cy="32" rx="24" ry="9" stroke={color} strokeWidth="3" />
          <ellipse cx="32" cy="32" rx="24" ry="9" stroke={color} strokeWidth="3" transform="rotate(60 32 32)" />
          <ellipse cx="32" cy="32" rx="24" ry="9" stroke={color} strokeWidth="3" transform="rotate(120 32 32)" />
        </svg>
      );
    case "next":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="27" fill="currentColor" className="text-foreground" />
          <path d="M21 44V20h6l18 24h-6L27 28v16h-6Z" fill="hsl(var(--background))" />
          <path d="M41 20h5v24h-5V20Z" fill="hsl(var(--background))" />
        </svg>
      );
    case "typescript":
      return (
        <svg {...common} viewBox="0 0 64 64">
          <rect x="8" y="8" width="48" height="48" rx="6" fill={color} />
          <text x="33" y="45" textAnchor="middle" fontSize="25" fontWeight="900" fill="#fff" fontFamily="Arial, sans-serif">
            TS
          </text>
        </svg>
      );
    default:
      return (
        <svg {...common} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="25" fill={color} />
        </svg>
      );
  }
}

export function TechnologiesSection() {
  return (
    <MotionSection id="tecnologias" className="section-padding" {...fadeIn}>
      <div className="container">
        <SectionHeading eyebrow="Tecnologias" title="Ferramentas modernas para produtos robustos." />
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {technologies.map((tech) => (
            <div
              key={tech.slug}
              className="glass group relative grid aspect-square place-items-center rounded-lg p-4 transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow"
              title={tech.name}
            >
              <TechnologyLogo slug={tech.slug} color={tech.color} name={tech.name} />
              <span className="pointer-events-none absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 translate-y-full rounded-md border border-border bg-background px-2.5 py-1 font-detail text-[0.66rem] font-medium text-foreground opacity-0 shadow-xl transition group-hover:opacity-100">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

export function ContactSection() {
  const [status, setStatus] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("from_name") || "");
    const email = String(formData.get("reply_to") || "");
    const subject = String(formData.get("subject") || "Contacto pelo portfólio");
    const message = String(formData.get("message") || "");
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const body = [`Nome: ${name}`, `Email: ${email}`, "", message].join("\n");
      const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
      setStatus("O seu aplicativo de email foi aberto com a mensagem pronta.");
      return;
    }

    try {
      setStatus("A enviar mensagem...");
      await emailjs.sendForm(serviceId, templateId, form, { publicKey });
      form.reset();
      setStatus("Mensagem enviada com sucesso.");
    } catch {
      setStatus("Não foi possível enviar agora. Tente novamente ou envie diretamente para o email acima.");
    }
  }

  return (
    <MotionSection id="contacto" className="section-padding bg-muted/30" {...fadeIn}>
      <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="Contacto" title="Vamos construir algo sólido." className="mx-0 text-left" />
          <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
            Envie uma mensagem para projetos web, sistemas personalizados, APIs, manutenção de aplicações ou consultoria tecnológica.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <a href={`mailto:${siteConfig.email}`}>
                <Mail className="h-4 w-4" /> Email
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={siteConfig.socials.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={siteConfig.socials.facebook} target="_blank" rel="noreferrer">
                <Facebook className="h-4 w-4" /> Facebook
              </a>
            </Button>
            <Button variant="secondary" title="Link a adicionar futuramente">
              <Instagram className="h-4 w-4" /> Instagram
            </Button>
            <Button variant="secondary" title="Link a adicionar futuramente">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </Button>
          </div>
        </div>
        <form className="glass rounded-lg p-6" onSubmit={handleSubmit}>
          <input type="hidden" name="to_email" value={siteConfig.email} />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium">
              Nome
              <input name="from_name" required className="h-12 rounded-md border border-input bg-background px-3 outline-none ring-primary transition focus:ring-2" />
            </label>
            <label className="grid gap-2 text-sm font-medium">
              Email
              <input name="reply_to" type="email" required className="h-12 rounded-md border border-input bg-background px-3 outline-none ring-primary transition focus:ring-2" />
            </label>
          </div>
          <label className="mt-4 grid gap-2 text-sm font-medium">
            Assunto
            <input name="subject" required className="h-12 rounded-md border border-input bg-background px-3 outline-none ring-primary transition focus:ring-2" />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-medium">
            Mensagem
            <textarea name="message" required rows={6} className="resize-none rounded-md border border-input bg-background p-3 outline-none ring-primary transition focus:ring-2" />
          </label>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button type="submit">
              Enviar mensagem <Send className="h-4 w-4" />
            </Button>
            {status ? <p className="text-sm text-muted-foreground">{status}</p> : null}
          </div>
        </form>
      </div>
    </MotionSection>
  );
}
