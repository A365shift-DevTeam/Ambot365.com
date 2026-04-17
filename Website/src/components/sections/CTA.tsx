import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <SectionWrapper>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 opacity-90" />

        <div className="relative z-10 px-6 py-20 md:py-32 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-4xl mb-6 text-white">Get the right solution.</h2>
          <p className="text-primary-100 text-lg md:text-xl mb-10">
            From Intelligent AI Agents and Microsoft 365 to Office Suite and scalable products—clear scope, production-ready in weeks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4" id="cta">
            <motion.a
              href="#solutions-overview"
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-xl  flex items-center justify-center gap-2 group shadow-md"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Explore solutions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
            <motion.a
              href="#"
              className="w-full sm:w-auto px-8 py-4 bg-black/20 text-white border border-white/20 rounded-xl font-medium"
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Get Custom Pricing
            </motion.a>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
