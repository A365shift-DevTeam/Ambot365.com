import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Bot, Sparkles, LayoutTemplate, Package, Volume2, Square } from 'lucide-react';
import aiSolutionsAudio from '../../assets/Voices/Ai Solution.mp3';

const COLUMNS = [
  {
    title: 'Intelligent AI Agents',
    badge: 'Finance & Operations',
    icon: Bot,
    items: [
      'AP Automation Agent',
      'AR Automation Agent',
      'SAP Reconcile Agent',
    ],
  },
  {
    title: 'Microsoft AI Ecosystem',
    badge: 'Copilot & M365',
    icon: Sparkles,
    items: [
      'Microsoft Copilot Solutions',
      'Custom AI Agents (Microsoft Stack)',
      'Microsoft 365 Process Automation',
      'Cloud & Workflow Automation',
    ],
  },
  {
    title: 'Office Suite',
    badge: 'Business Applications',
    icon: LayoutTemplate,
    items: [
      'Web | Mobile Apps with AI',
      'CRM & Workflow Systems',
      'Enterprise Websites',
      'AI Chatbots',
      'Digital Marketing Agents',
      'Lead Generation Agents',
    ],
  },
  {
    title: 'Scalable Industry Products',
    badge: 'Products',
    icon: Package,
    items: ['Office AI Bots', 'Customer Satisfaction'],
  },
];

export default function SolutionsOverview() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => setIsPlayingAudio(false);
    if (audio) {
      audio.addEventListener('ended', handleEnded);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, []);
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play();
        setIsPlayingAudio(true);
      }
    }
  };

  return (
    <section
      id="solutions-overview"
      className="py-24 relative bg-[linear-gradient(135deg,#e8f5ee_0%,#f0faf4_30%,#f7fdfa_60%,#ffffff_100%)] dark:bg-none dark:bg-gray-950"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1400px] mx-auto px-4 md:px-8 xl:px-12 relative z-10"
      >
      <div className="text-center mb-16">
        <p className="text-sm font-semibold tracking-[0.2em] text-primary-500 uppercase mb-4">
          What we offer
        </p>
        <div className="flex items-center justify-center gap-4 mb-5">
          <h2 className="text-2xl md:text-4xl section-title mb-0">
            AI Solutions & Enterprise Products
          </h2>
          <button
            onClick={toggleAudio}
            className={`p-2.5 md:p-3 rounded-full flex items-center justify-center transition-all ${
              isPlayingAudio 
                ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white shadow-lg shadow-[#4C99A0]/30 animate-pulse' 
                : 'bg-white text-[#4C99A0] shadow-md hover:shadow-lg border border-[#4C99A0]/20 hover:bg-[#4C99A0]/5'
            }`}
            title={isPlayingAudio ? "Stop Audio" : "Listen to Section Details"}
            aria-label="Play section audio"
          >
            {isPlayingAudio ? <Square className="w-5 h-5 fill-current" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <audio ref={audioRef} src={aiSolutionsAudio} />
        </div>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
          AI agents, Microsoft automation, business applications, and scalable products
          designed for enterprise-grade operations, visibility, and growth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6">
        {COLUMNS.map((col, i) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md px-5 py-6 xl:p-6 flex flex-col transition-smooth cursor-default"
          >
            {/* Icon + Badge row */}
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
                <col.icon className="w-6 h-6 text-primary-500" />
              </div>
              <span className="text-[11px] font-medium tracking-wider uppercase section-badge border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1 text-center leading-tight">
                {col.badge}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg xl:text-xl section-subtitle mb-4 leading-snug break-words">
              {col.title}
            </h3>

            {/* Separator */}
            <div className="h-px bg-gray-100 dark:bg-gray-800 mb-5" />

            {/* Items */}
            <ul className="space-y-3.5 flex-1">
              {col.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      </motion.div>
    </section>
  );
}
