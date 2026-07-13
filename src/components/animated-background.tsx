export function AnimatedBackground() {
  const particles = Array.from({ length: 26 }, (_, index) => ({
    left: `${(index * 37) % 100}%`,
    top: `${(index * 53) % 100}%`,
    delay: `${(index % 9) * 0.7}s`,
    duration: `${9 + (index % 7)}s`
  }));

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.18),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.12),transparent_28%),linear-gradient(135deg,rgba(15,23,42,0.98),rgba(7,17,31,0.96))] dark:opacity-100" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(247,250,252,0.96),rgba(229,246,244,0.88))] opacity-100 dark:opacity-0" />
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-primary/45 blur-[0.5px]"
          style={{
            left: particle.left,
            top: particle.top,
            animation: `floatParticle ${particle.duration} ease-in-out ${particle.delay} infinite alternate`
          }}
        />
      ))}
      <style>{`
        @keyframes floatParticle {
          from { transform: translate3d(0, 0, 0); opacity: .2; }
          to { transform: translate3d(24px, -34px, 0); opacity: .75; }
        }
      `}</style>
    </div>
  );
}
