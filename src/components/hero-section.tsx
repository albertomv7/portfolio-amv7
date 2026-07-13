"use client";

import { ArrowDown, Download, Mail, Rocket } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { MotionDiv } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { siteConfig, stats } from "@/data/portfolio";

const typewriterWords = ["Laravel", "PHP", "Python", "React", "Next.js"];

function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState("");

  useEffect(() => {
    const word = typewriterWords[wordIndex];
    const done = visible.length === word.length;
    const timeout = window.setTimeout(
      () => {
        if (done) {
          setVisible("");
          setWordIndex((index) => (index + 1) % typewriterWords.length);
        } else {
          setVisible(word.slice(0, visible.length + 1));
        }
      },
      done ? 1200 : 90
    );

    return () => window.clearTimeout(timeout);
  }, [visible, wordIndex]);

  return <span className="text-primary">{visible || typewriterWords[wordIndex].slice(0, 1)}</span>;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const total = 42;
    const interval = window.setInterval(() => {
      frame += 1;
      setCount(Math.round((value * frame) / total));
      if (frame >= total) window.clearInterval(interval);
    }, 24);

    return () => window.clearInterval(interval);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden pt-32 md:pt-36">
      <div className="container grid min-h-[calc(100vh-9rem)] items-center gap-12 pb-16 lg:grid-cols-[1.08fr_0.92fr]">
        <MotionDiv initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="text-detail mb-6 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-3 py-2 text-[0.68rem] font-semibold text-primary">
            <Rocket className="h-4 w-4" />
            Disponível para projetos web modernos
          </div>
          <h1 className="max-w-full whitespace-nowrap font-display text-[clamp(1.65rem,4.5vw,3.55rem)] leading-[1.03] text-foreground">
            {siteConfig.name}
          </h1>
          <p className="mt-4 font-display text-base font-medium text-primary md:text-xl">{siteConfig.role}</p>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-8 text-muted-foreground md:text-lg">
            Especialista em desenvolvimento de aplicações web modernas utilizando <Typewriter />.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href="#projetos">
                Ver Projetos <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href="/cv-alberto-mv-domingos.pdf" download>
                Download CV <Download className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href="#contacto">
                Contactar <Mail className="h-4 w-4" />
              </a>
            </Button>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="glass rounded-lg p-4">
                <p className="font-display text-2xl text-foreground">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv
          className="relative mx-auto aspect-square w-full max-w-[430px]"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="absolute inset-0 rounded-full border border-primary/20 bg-primary/10 blur-2xl" />
          <div className="glass relative grid h-full place-items-center rounded-full p-6">
            <div className="relative h-full w-full overflow-hidden rounded-full border border-primary/30 bg-[linear-gradient(135deg,rgba(45,212,191,.22),rgba(56,189,248,.12))] shadow-glow">
              <Image
                src="/perfil.JPG"
                alt={`Foto profissional de ${siteConfig.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 430px, (min-width: 640px) 60vw, 85vw"
                className="object-cover"
              />
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
