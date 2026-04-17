import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { Users, Bot, Sparkles, Check, X } from 'lucide-react';

const COMPARISON = [
  {
    title: 'Hire Staff',
    subtitle: 'Traditional approach',
    icon: Users,
    cost: '$60–120K/yr per FTE',
    items: [
      { text: 'Runs at 6AM', good: true },
      { text: 'Office hours only', good: false },
      { text: 'Handles exceptions slowly', good: false },
      { text: 'Portal changes — adapts slowly', good: false },
      { text: 'Audit trail — manual tracking', good: false },
      { text: 'System integration — copy-paste', good: false },
      { text: 'Accountability — attrition risk', good: false },
    ],
    theme: 'gray',
  },
  {
    title: 'RPA / Generic AI',
    subtitle: 'Bots & LLMs',
    icon: Bot,
    cost: '$20–60K/yr + implementation',
    items: [
      { text: 'Runs at 6AM', good: true },
      { text: 'Fragile, breaks often', good: false },
      { text: 'Handles exceptions — breaks or hallucinates', good: false },
      { text: 'Portal changes — breaks silently', good: false },
      { text: 'Audit trail — none or unreliable', good: false },
      { text: 'System integration — manual glue code', good: false },
      { text: 'Accountability — no one to call', good: false },
    ],
    theme: 'amber',
  },
  {
    title: 'Ambot365 Agent',
    subtitle: 'Managed AI agent',
    icon: Sparkles,
    cost: '20–50% of staff cost',
    items: [
      { text: 'Runs at 6AM — always, reliably', good: true },
      { text: 'Handles exceptions — logs + alerts', good: true },
      { text: 'Portal changes — self-heals', good: true },
      { text: 'Audit trail — full automatic', good: true },
      { text: 'System integration — native connectors', good: true },
      { text: 'Accountability — we fix it, SLA-backed', good: true },
    ],
    theme: 'primary',
  },
];

export default function WhyAgent() {
  return (
    <SectionWrapper className="section-bg">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl mb-4 section-title">Why an agent, specifically?</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">From Intelligent AI Agents to Microsoft 365 and Office Suite—see how Ambot365 compares to hiring or generic automation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {COMPARISON.map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`section-card p-8 ${
              col.theme === 'primary'
                ? 'border-2 border-primary-500/40 bg-primary-500/10 dark:bg-primary-500/10 shadow-lg shadow-primary-500/10'
                : col.theme === 'amber'
                  ? 'border-2 border-amber-500/30 dark:border-amber-500/30'
                  : ''
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              col.theme === 'primary' ? 'bg-primary-500/20' : col.theme === 'amber' ? 'bg-amber-500/20' : 'bg-gray-100 dark:bg-gray-800'
            }`}>
              <col.icon className={`w-6 h-6 ${
                col.theme === 'primary' ? 'text-primary-600 dark:text-primary-400' : col.theme === 'amber' ? 'text-amber-600 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'
              }`} />
            </div>
            <p className="text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-1">{col.subtitle}</p>
            <h3 className="text-xl  section-subtitle mb-2">
              {col.title}
            </h3>
            <p className={`text-sm font-semibold mb-6 ${
              col.theme === 'primary' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'
            }`}>{col.cost}</p>
            <ul className="space-y-3">
              {col.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  {item.good ? <Check className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" /> : <X className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />}
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
