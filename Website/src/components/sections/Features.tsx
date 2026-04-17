import { motion } from 'motion/react';
import { GitMerge, Network, CalendarClock, Bot, LineChart, ShieldCheck } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';

const FEATURES = [
  {
    title: 'AI Agents',
    description: 'We design enterprise-grade AI agents that think, decide, and execute tasks across workflows. From automation to decision intelligence — fully secure, scalable, and industry-ready.',
    icon: GitMerge,
  },
  {
    title: 'AI Microsoft 365 Apps',
    description: 'Next-gen AI integrations for Excel, PowerPoint, Outlook & Teams. Automate reports, insights, consolidation, and workflows inside your existing Microsoft ecosystem.',
    icon: Network,
  },
  {
    title: 'OfficeAIbots',
    description: 'A powerful AI automation layer for Excel & PowerPoint users. Consolidate, split, merge, transform, and generate files in seconds — no coding required..',
    icon: CalendarClock,
  },
  {
    title: 'Web & Mobile Apps',
    description: 'We build scalable React-based web and mobile applications powered by AI, real-time data, secure APIs, and intelligent automation.',
    icon: Bot,
  },
  {
    title: '3D Interactive Website',
    description: 'Scroll-based 3D websites with motion UI, interactive layers, animated objects, and futuristic visual storytelling — built for high-impact brand presence.',
    icon: LineChart,
  },
  {
    title: 'Digital & WP Agent',
    description: 'Smart WordPress automation agents, AI chat systems, dynamic content engines, and digital workflow automation — optimized for performance and growth.',
    icon: ShieldCheck,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Features() {
  return (
    <SectionWrapper id="features">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl mb-6 section-title">Everything you need to scale</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Powerful features designed for modern teams who want to move faster and break fewer things.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {FEATURES.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            className="glass-panel p-8 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <feature.icon className="w-6 h-6 text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 section-subtitle">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
