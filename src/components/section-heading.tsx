import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto mb-9 max-w-3xl text-center", className)}>
      <p className="text-detail mb-3 text-[0.76rem] font-semibold text-primary">{eyebrow}</p>
      <h2 className="font-display text-[1.75rem] leading-[1.08] text-foreground md:text-[2.65rem]">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">{description}</p> : null}
    </div>
  );
}
