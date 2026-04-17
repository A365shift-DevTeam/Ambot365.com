import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';

const FEATURE_CARDS = [
  { title: 'DocCraft', description: 'Automate Excel to PDF, PPT & Image Like Certificates, Reports.' },
  { title: 'Sheets to Slides', description: 'Creating Excel to Presentation like Weekly Report, Proposals.' },
  { title: 'Image Compressor', description: 'Compress your image up to 90% without compromising quality' },
  { title: 'Consolidation', description: 'Combine multiple files into single file (by Column)' },
  { title: 'File Splitter', description: 'Split large files into sheets and workbook, based on criteria' },
  { title: 'Merge Master', description: 'Combine multiple files into single file (by Multiple Range)' },
  { title: 'File Comparison', description: 'Compare between files and Highlight changes.' },
  { title: 'Work Allocation', description: 'Allocate tasks equally or Randomly based on User' },
];

export default function Integrations() {
  return (
    <SectionWrapper id="integrations" className="section-bg">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl mb-6 section-title">Products & features</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Part of our Office Suite and Scalable Industry Products—DocCraft, consolidation, file tools, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURE_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
            className="section-card p-5 flex flex-col transition-smooth cursor-default"
          >
            <h3 className="text-lg  section-subtitle mb-2">
              {card.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 leading-relaxed">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
