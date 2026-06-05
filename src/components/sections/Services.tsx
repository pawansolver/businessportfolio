"use client";

import dynamic from "next/dynamic";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

const SpatialServiceShowcase = dynamic(
  () => import("@/components/ui/spatial-service-showcase"),
  { ssr: false }
);

export default function Services() {
  return (
    <section id="services" className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <SectionHeading title="Services I Offer" />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10">
            <SpatialServiceShowcase services={services} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
