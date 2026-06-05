"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function ParallaxScrollFeatureSection() {
    // Array of section data tailored to the user's profile
    const sections = [
        {
            id: 1,
            title: "Who I Am",
            description: "I am a passionate Full-Stack Developer with deep expertise in frontend, backend, and database architectures. I build scalable, robust applications that solve real-world problems and deliver exceptional user experiences.",
            imageUrl: '/web-dev.png',
            reverse: false
        },
        {
            id: 2,
            title: "My Tech Arsenal",
            description: "My toolkit includes modern technologies like React, Next.js, Node.js, and SQL/NoSQL databases. I write clean, maintainable code using TypeScript and craft pixel-perfect, highly responsive interfaces with Tailwind CSS.",
            imageUrl: '/cloud-server.png',
            reverse: true
        },
        {
            id: 3,
            title: "Services I Provide",
            description: "Beyond writing code, I deliver end-to-end digital solutions. From mobile app development and custom web platforms to cloud architecture, secure API integrations, and comprehensive digital marketing strategies.",
            imageUrl: '/digital-marketing.png',
            reverse: false
        }
    ];

    // Create refs and animations statically to comply with Rule of Hooks
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);

    const { scrollYProgress: scrollY1 } = useScroll({ target: ref1, offset: ["start end", "center center"] });
    const { scrollYProgress: scrollY2 } = useScroll({ target: ref2, offset: ["start end", "center center"] });
    const { scrollYProgress: scrollY3 } = useScroll({ target: ref3, offset: ["start end", "center center"] });

    const opacity1 = useTransform(scrollY1, [0, 0.8], [0, 1]);
    const opacity2 = useTransform(scrollY2, [0, 0.8], [0, 1]);
    const opacity3 = useTransform(scrollY3, [0, 0.8], [0, 1]);

    const clip1 = useTransform(scrollY1, [0, 0.8], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
    const clip2 = useTransform(scrollY2, [0, 0.8], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
    const clip3 = useTransform(scrollY3, [0, 0.8], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);

    const translate1 = useTransform(scrollY1, [0, 1], [-50, 0]);
    const translate2 = useTransform(scrollY2, [0, 1], [-50, 0]);
    const translate3 = useTransform(scrollY3, [0, 1], [-50, 0]);

    const sectionRefs = [ref1, ref2, ref3];
    const opacityContents = [opacity1, opacity2, opacity3];
    const clipProgresses = [clip1, clip2, clip3];
    const translateContents = [translate1, translate2, translate3];

  return (
    <section id="about" className="bg-bg-primary text-text-primary overflow-hidden pb-32">
      <div className='min-h-[70vh] w-full flex flex-col items-center justify-center section-header'>
        <h2 className='section-heading'>
          About Me
        </h2>
        <p className='section-subheading mt-6 max-w-3xl'>
          Transforming Ideas into Reality
        </p>
        <p className='mt-16 flex items-center gap-2 text-sm tracking-widest text-text-secondary animate-pulse'>
          SCROLL <ArrowDown size={16} />
        </p>
      </div>

       <div className="flex flex-col md:px-0 px-6 max-w-7xl mx-auto">
            {sections.map((section, index) => (
                <div 
                    key={section.id}
                    ref={sectionRefs[index]} 
                    className={`min-h-[80vh] flex flex-col md:flex-row items-center justify-center md:gap-32 gap-16 py-20 ${section.reverse ? 'md:flex-row-reverse' : ''}`}
                >
                    <motion.div style={{ y: translateContents[index] }} className="flex-1">
                        <div className="text-4xl md:text-6xl font-bold">{section.title}</div>
                        <motion.p 
                            style={{ y: translateContents[index] }} 
                            className="text-text-secondary text-lg md:text-xl leading-relaxed max-w-lg mt-8"
                        >
                            {section.description}
                        </motion.p>
                    </motion.div>
                    
                    <motion.div 
                        style={{ 
                            opacity: opacityContents[index],
                            clipPath: clipProgresses[index],
                        }}
                        className="relative flex-1 w-full flex justify-center"
                    >
                        <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-border shadow-2xl">
                          <div className="absolute inset-0 bg-accent/10 mix-blend-overlay z-10" />
                          <img 
                              src={section.imageUrl} 
                              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" 
                              alt={`Section ${section.id}` }
                          />
                        </div>
                    </motion.div>
                </div>
            ))}
        </div>
    </section>
  );
};
