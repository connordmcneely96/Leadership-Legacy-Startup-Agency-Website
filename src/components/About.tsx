"use client";

import { motion } from "framer-motion";
import { 
  Target, 
  Lightbulb, 
  Handshake, 
  Shield,
  TrendingUp
} from "lucide-react";

const values = [
  {
    icon: Target,
    name: "Excellence",
    description: "Production-grade solutions, not prototypes. We ship code that's ready for real business operations.",
  },
  {
    icon: Lightbulb,
    name: "Innovation",
    description: "Staying at the cutting edge of AI so you don't have to. We bring the latest capabilities to your business.",
  },
  {
    icon: Handshake,
    name: "Partnership",
    description: "Your success is our success metric. We measure our work by the outcomes you achieve.",
  },
  {
    icon: Shield,
    name: "Integrity",
    description: "Honest communication and realistic delivery. We tell you what's possible—and what isn't.",
  },
  {
    icon: TrendingUp,
    name: "Impact",
    description: "Measurable business outcomes over technical novelty. Every solution is tied to real ROI.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-light to-navy" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-gold uppercase tracking-wider">
              About Leadership Legacy
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-serif font-semibold mb-6">
              Building Systems That Outlast Any Single Project
            </h2>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                The AI revolution is transforming how businesses operate. But while 
                enterprises have armies of engineers building custom AI solutions, 
                most organizations are being left behind—stuck with generic tools 
                that don&apos;t fit their unique needs.
              </p>
              <p>
                <span className="text-foreground font-medium">Leadership Legacy</span> was 
                founded to change that. We believe every organization—whether a 5-person 
                startup or a 500-person firm—deserves access to enterprise-grade AI 
                capabilities tailored to their specific workflows and challenges.
              </p>
              <p>
                Our name reflects our mission: <span className="text-gold">Leadership</span> in 
                helping you adopt AI strategically, and <span className="text-gold">Legacy</span> in 
                building durable systems that compound in value over time. We&apos;re not here 
                to build throwaway demos—we&apos;re here to build the AI infrastructure that 
                powers your next decade of growth.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="mt-8 p-6 rounded-xl bg-navy/50 border border-gold/20">
              <p className="text-sm text-gold font-medium mb-2">Our Mission</p>
              <p className="text-foreground">
                Empower businesses to harness AI and modern technology to automate 
                workflows, unlock insights from data, and build durable competitive advantages.
              </p>
            </div>
          </motion.div>

          {/* Right - Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-foreground mb-8">
              What Guides Us
            </h3>
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4 p-5 rounded-xl bg-navy-light/30 border border-white/5 hover:border-gold/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center shrink-0 group-hover:from-gold/30 group-hover:to-gold/10 transition-colors">
                    <value.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      {value.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

