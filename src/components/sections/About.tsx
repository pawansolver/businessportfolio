import FadeIn from "@/components/ui/FadeIn";

const experience = [
  "Full Stack Development",
  "Admin Dashboard Systems",
  "API Development",
  "Responsive UI",
];

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn direction="right">
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-accent/10 blur-2xl" />
              <div className="glass relative aspect-square max-w-md overflow-hidden rounded-2xl mx-auto lg:mx-0">
                <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-bg-card to-bg-primary p-8">
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-accent/30 bg-accent/10">
                    <span className="font-display text-5xl font-bold text-accent">P</span>
                  </div>
                  <p className="mt-6 font-display text-xl font-bold text-text-primary">
                    Pawan
                  </p>
                  <p className="mt-1 text-sm text-accent">Full Stack Developer</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div>
              <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
                About Me
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-text-secondary">
                I&apos;m a full stack developer passionate about building modern digital
                experiences with scalable backend systems and premium frontend interfaces.
              </p>
              <p className="mt-4 text-text-secondary">
                As an independent developer, I work directly with startups, hospitals, and
                local businesses — delivering agency-quality work with personal attention
                and fast turnaround.
              </p>

              <ul className="mt-8 space-y-4">
                {experience.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-text-secondary">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-xs text-accent">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
