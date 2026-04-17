import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

const FEED_ITEMS = [
  'GRN Agent — 81 TAFE records processed, 0 failures',
  'CS Command Center — 3 accounts moved to At-Risk',
  'Vehicle Compliance — 240 vehicles validated, 6 flagged',
  'SAP Query Agent — 5,000 ACDOCA rows returned in 3.2s',
  'Fund Operations — 6 reports generated, 97.3% match rate',
];

function TickerRow({ items, direction = 1 }: { items: string[]; direction?: number }) {
  const duplicated = [...items, ...items];
  return (
    <motion.div
      className="flex gap-5 shrink-0"
      animate={{ x: direction > 0 ? '-50%' : '0%' }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
    >
      {duplicated.map((text, i) => (
        <span key={i} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 whitespace-nowrap">
          {text}
          <span className="text-gray-400 dark:text-gray-500 text-[10px]">2m ago ·</span>
        </span>
      ))}
    </motion.div>
  );
}

export default function CommandCenterLive() {
  return (
    <section className="py-2 border-y border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-1">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
          <Activity className="w-3 h-3 text-primary-500" />
          Command Center — Live
        </div>
      </div>
      <div className="overflow-hidden">
        <TickerRow items={FEED_ITEMS} direction={1} />
      </div>
    </section>
  );
}
