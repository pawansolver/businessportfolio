"use client";

import Link from "next/link";
import { Mail, MessageCircle, Camera, Briefcase, Code, Heart, ArrowUp, Rocket } from "lucide-react";

function handleScrollTop() {
  window.scroll({
    top: 0,
    behavior: "smooth",
  });
}

const ThemeToggle = () => {
  return (
    <div className="flex items-center justify-center ml-4">
      <div className="flex items-center rounded-full border border-border bg-bg-card">
        <button
          type="button"
          onClick={handleScrollTop}
          className="rounded-full p-2.5 text-text-secondary hover:text-accent transition-colors"
        >
          <ArrowUp className="h-5 w-5" />
          <span className="sr-only">Top</span>
        </button>
      </div>
    </div>
  );
};

const navigation = {
  categories: [
    {
      id: "portfolio",
      name: "Portfolio",
      sections: [
        {
          id: "about",
          name: "About",
          items: [
            { name: "About Me", href: "#about" },
            { name: "Process", href: "#process" },
            { name: "Pricing", href: "#pricing" },
          ],
        },
        {
          id: "services",
          name: "Services",
          items: [
            { name: "Web Dev", href: "#services" },
            { name: "App Dev", href: "#services" },
            { name: "SEO", href: "#services" },
          ],
        },
        {
          id: "projects",
          name: "Projects",
          items: [
            { name: "SaaS", href: "#projects" },
            { name: "E-Commerce", href: "#projects" },
            { name: "Web3", href: "#projects" },
          ],
        },
        {
          id: "company",
          name: "Company",
          items: [
            { name: "Contact", href: "#contact" },
            { name: "Terms", href: "/terms" },
            { name: "Privacy", href: "/privacy" },
          ],
        },
      ],
    },
  ],
};

const Underline = `hover:-translate-y-1 border border-border bg-bg-card rounded-xl p-2.5 transition-all hover:border-accent hover:text-accent text-text-secondary`;

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-bg-primary px-2 pt-12">
      <div className="relative mx-auto grid max-w-7xl items-center justify-center gap-8 p-10 pb-0 md:flex md:items-start">
        <Link href="/">
          <p className="flex items-center justify-center rounded-full bg-bg-card p-4 border border-border shadow-sm">
            <Rocket className="w-10 h-10 text-accent" />
          </p>
        </Link>
        <p className="bg-transparent text-center text-sm leading-7 text-text-secondary md:text-left max-w-3xl">
          Welcome to <span className="text-text-primary font-semibold">Pawan.dev</span>, where creativity meets architecture to bring your
          vision to reality. I specialize in crafting unique full-stack 
          applications, immersive digital experiences, and scalable solutions that
          resonate with your users. My mission is to empower businesses to stand out 
          and operate efficiently in a digital-first world. Quality code, zero compromise.
          You&apos;ll work directly with me, Pawan.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="border-b border-border"> </div>
        <div className="py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-2 md:grid-cols-4 justify-between gap-8 leading-6"
            >
              {category.sections.map((section) => (
                <div key={section.name}>
                  <h3 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider">{section.name}</h3>
                  <ul
                    role="list"
                    className="flex flex-col space-y-3"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root">
                        <Link
                          href={item.href}
                          className="text-sm text-text-secondary hover:text-accent transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="border-b border-border mb-10"> </div>
      </div>

      <div className="flex flex-wrap justify-center gap-y-6">
        <div className="flex flex-wrap items-center justify-center gap-6 gap-y-4 px-6">
          <Link
            aria-label="Email"
            href="mailto:pawankkr138@gmail.com"
            target="_blank"
            className={Underline}
          >
            <Mail strokeWidth={1.5} className="h-5 w-5" />
          </Link>
          <Link
            aria-label="Twitter"
            href="#"
            target="_blank"
            className={Underline}
          >
            <MessageCircle strokeWidth={1.5} className="h-5 w-5" />
          </Link>
          <Link
            aria-label="Instagram"
            href="#"
            target="_blank"
            className={Underline}
          >
            <Camera strokeWidth={1.5} className="h-5 w-5" />
          </Link>
          <Link
            aria-label="LinkedIn"
            href="https://www.linkedin.com/in/pawan-kumar-7488pa"
            target="_blank"
            className={Underline}
          >
            <Briefcase strokeWidth={1.5} className="h-5 w-5" />
          </Link>
          <Link
            aria-label="GitHub"
            href="#"
            target="_blank"
            className={Underline}
          >
            <Code strokeWidth={1.5} className="h-5 w-5" />
          </Link>
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto mb-10 mt-10 flex flex-col justify-between text-center text-xs md:max-w-7xl">
        <div className="flex flex-row items-center justify-center gap-1 text-text-secondary">
          <span> © </span>
          <span>{new Date().getFullYear()}</span>
          <span>Made with</span>
          <Heart className="text-accent mx-1 h-4 w-4 animate-pulse" />
          <span> by </span>
          <span className="hover:text-accent cursor-pointer text-text-primary transition-colors">
            <Link
              aria-label="Developer"
              className="font-bold"
              href="#"
            >
              Pawan {""}
            </Link>
          </span>
          -
          <span className="hover:text-accent cursor-pointer text-text-secondary transition-colors">
            <Link aria-label="Brand" className="" href="/">
              Pawan.dev
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
