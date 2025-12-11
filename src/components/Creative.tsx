"use client";

import { motion } from "framer-motion";
import { 
  ImageIcon, 
  Video, 
  Presentation,
  Sparkles
} from "lucide-react";

const creativeServices = [
  {
    icon: ImageIcon,
    title: "Social Media Systems",
    description: "AI-assisted graphics and content systems that maintain brand consistency while scaling your social presence.",
    examples: ["Branded templates", "AI-generated variations", "Multi-platform formats"],
  },
  {
    icon: Video,
    title: "Short-Form Video",
    description: "Reels, Shorts, and TikToks that capture attention and communicate complex ideas in seconds.",
    examples: ["Product demos", "Thought leadership", "Educational content"],
  },
  {
    icon: Presentation,
    title: "Presentation Design",
    description: "Pitch decks and presentations that tell your story with clarity, impact, and visual sophistication.",
    examples: ["Investor decks", "Sales presentations", "Training materials"],
  },
];

export default function Creative() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium text-gold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Creative & Brand Assets
            </span>
            <h2 className="mt-4 text-3xl lg:text-4xl font-serif font-semibold">
              Amplify Your AI Advantage with Compelling Content
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Your AI systems deserve a visual identity that matches their sophistication. 
              We create the creative assets that communicate your innovation story.
            </p>

            {/* Value Prop */}
            <div className="mt-8 p-6 rounded-xl bg-navy-light/50 border border-white/5">
              <p className="text-sm text-muted-foreground">
                <span className="text-gold font-medium">Add-on value:</span> Complement 
                your core AI and product work with creative services that extend your 
                brand consistently across every touchpoint.
              </p>
            </div>
          </motion.div>

          {/* Right - Services Cards */}
          <div className="space-y-4">
            {creativeServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex gap-5 p-6 rounded-2xl bg-navy-light/30 border border-white/5 hover:border-gold/20 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center shrink-0 group-hover:from-gold/30 group-hover:to-gold/10 transition-colors">
                  <service.icon className="w-6 h-6 text-gold" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.examples.map((example) => (
                      <span
                        key={example}
                        className="text-xs text-gold/70"
                      >
                        {example}
                        {service.examples.indexOf(example) < service.examples.length - 1 && (
                          <span className="mx-2 text-white/20">•</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

