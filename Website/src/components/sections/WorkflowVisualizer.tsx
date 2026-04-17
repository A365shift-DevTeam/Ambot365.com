import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { Mail, Database, Slack, CheckCircle2 } from 'lucide-react';

export default function WorkflowVisualizer() {
  return (
    <SectionWrapper className="bg-white dark:bg-gray-950 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl md:text-4xl mb-6 section-title">Visualize your logic</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 leading-relaxed">
            Stop writing brittle scripts. Our visual canvas lets you see exactly how data flows between your applications. Add conditional logic, loops, and error handling with a click.
          </p>
          <ul className="space-y-4">
            {['Drag-and-drop interface', 'Real-time testing', 'Version history & rollbacks'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <CheckCircle2 className="w-5 h-5 text-accent-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-1/2 relative h-[400px] flex items-center justify-center">
          {/* Mock Canvas */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:24px_24px] rounded-2xl border border-gray-200 dark:border-gray-800 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)]" />

          <div className="relative z-10 flex items-center gap-4 md:gap-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-gray-900 border border-primary-200 dark:border-primary-500/30 flex items-center justify-center shadow-lg shadow-primary-500/10"
            >
              <Mail className="w-6 h-6 md:w-8 md:h-8 text-primary-500" />
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-primary-500 to-primary-500 relative hidden md:block"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-400" />
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-primary-500 to-primary-500 relative md:hidden"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-400" />
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-gray-900 border border-primary-200 dark:border-primary-500/30 flex items-center justify-center shadow-lg shadow-primary-500/10"
            >
              <Database className="w-6 h-6 md:w-8 md:h-8 text-primary-500" />
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-primary-500 to-accent-500 relative hidden md:block"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-400" />
            </motion.div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-primary-500 to-accent-500 relative md:hidden"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-400" />
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-gray-900 border border-accent-200 dark:border-accent-500/30 flex items-center justify-center shadow-lg shadow-accent-500/10"
            >
              <Slack className="w-6 h-6 md:w-8 md:h-8 text-accent-500" />
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
