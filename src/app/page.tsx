import { AnimatedBackground } from "@/components/animated-background";
import { BackToTop } from "@/components/back-to-top";
import {
  AboutSection,
  ContactSection,
  EducationSection,
  ExperienceSection,
  ProjectsSection,
  ServicesSection,
  SkillsSection,
  TechnologiesSection
} from "@/components/content-sections";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { ScrollProgress } from "@/components/scroll-progress";
import { siteConfig } from "@/data/portfolio";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: siteConfig.url,
    sameAs: [siteConfig.socials.github, siteConfig.socials.facebook]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AnimatedBackground />
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ServicesSection />
        <TechnologiesSection />
        <ContactSection />
      </main>
      <footer className="border-t border-border py-8">
        <div className="container flex flex-col items-center justify-between gap-3 text-center text-sm text-muted-foreground md:flex-row">
          <p>© 2026 Alberto MV Domingos</p>
          <p>Desenvolvido com Next.js + React + Tailwind CSS.</p>
        </div>
      </footer>
      <BackToTop />
    </>
  );
}
