import FadeIn from "@/components/ui/FadeIn";
import { trustLogos } from "@/data/site";

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-bg-secondary py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="mb-8 text-center text-sm text-text-secondary">
            Trusted by startups & local businesses
          </p>
        </FadeIn>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {trustLogos.map((logo, i) => (
            <FadeIn key={logo} delay={i * 0.05}>
              <span className="font-display text-lg font-semibold text-text-secondary/40 grayscale transition-all duration-300 hover:text-text-secondary/70 hover:grayscale-0">
                {logo}
              </span>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
