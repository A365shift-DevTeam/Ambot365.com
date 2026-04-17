import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { Plus } from 'lucide-react';

const OFFICE_BOTS_FAQ = [
  { q: 'What is the Office AI Bots Application?', a: 'The Office AI Bots Application is a desktop tool that brings intelligent automation to your Microsoft Office workflow, helping you complete repetitive tasks faster and with fewer errors.' },
  { q: 'Who can benefit from using the Office Bots Desktop Application?', a: 'Anyone who uses Microsoft Office regularly—from individuals and small teams to enterprises—can benefit. It’s especially useful for roles that handle repetitive document, spreadsheet, or email tasks.' },
  { q: 'How many bots are currently available and will more bots be added in the future?', a: 'We offer a growing set of bots today and regularly add new ones based on user needs and feedback. Check the app or our website for the latest list and roadmap.' },
  { q: 'What is the reason for creating these bots?', a: 'We created these bots to reduce manual, repetitive work in Office so users can focus on higher-value tasks, improve accuracy, and scale without adding headcount.' },
  { q: 'What is unique about this tool, and is it patented?', a: 'Our bots are built specifically for real-world Office workflows and integrate tightly with your existing setup. Specific innovations are covered by our intellectual property and patents where applicable.' },
];

const TRAINING_SUPPORT_SECURITY_FAQ = [
  { q: 'Is the bot certified against antivirus threats? How secure is Ambot365?', a: 'Ambot365 is designed with security in mind and is tested for compatibility with common antivirus solutions. We follow secure development practices and can provide more detail on request.' },
  { q: 'How can I download the application?', a: 'You can download the Office Bots Desktop Application from our website or through the link provided after purchase. Follow the installation guide for your operating system.' },
  { q: 'Can the product license be transferred or accessed from another system?', a: 'License terms depend on your plan. Some licenses allow use on one primary device with options to transfer; check your license agreement or contact support for your case.' },
  { q: 'Can I transfer my license if my system crashes or I get a new one?', a: 'Yes. We support license transfer in cases of hardware failure or upgrade. Contact our support team with your license details to complete the transfer.' },
  { q: 'Is there a support desk for inquiries?', a: 'Yes. We provide a support desk for technical and account inquiries. Access details are in the app and in your welcome email.' },
  { q: 'Do we have any training or knowledge sources and IT support?', a: 'We offer training materials, knowledge bases, and IT support to help you get the most out of the application. Resources are available in the app and on our customer portal.' },
  { q: 'What are the system requirements and installation software?', a: 'The application runs on supported Windows versions with Microsoft Office installed. Exact requirements and installation steps are listed on our website and in the installer.' },
  { q: 'Are there any inaugural offers available?', a: 'We occasionally run launch and promotional offers. Check our website or contact sales for current inaugural or special pricing.' },
];

function AccordionItem({ question, answer, isOpen, onToggle }: { key?: string; question: string; answer: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="section-card rounded-xl overflow-hidden mb-4 last:mb-0">
      <button
        onClick={onToggle}
        className="w-full py-4 px-4 flex items-center gap-4 text-left font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors"
      >
        <span className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-r from-[#4C99A0] to-[#65A859] flex items-center justify-center text-white">
          <Plus className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
        </span>
        <span className="flex-1 pr-2">{question}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 px-4 pl-[4.5rem] text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SecurityFAQ() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <SectionWrapper id="security-faq" className="section-bg">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-4xl section-title">
          Office Bots Desktop Application - FAQ
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
        <div>
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-[#65A859] dark:bg-[#65A859]/90 mb-6">
            OFFICE BOTS
          </span>
          <div className="space-y-0">
            {OFFICE_BOTS_FAQ.map((item, j) => {
              const key = `office-${j}`;
              return (
                <AccordionItem
                  key={key}
                  question={item.q}
                  answer={item.a}
                  isOpen={openKey === key}
                  onToggle={() => setOpenKey(openKey === key ? null : key)}
                />
              );
            })}
          </div>
        </div>

        <div>
          <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white bg-[#65A859] dark:bg-[#65A859]/90 mb-6">
            TRAINING | SUPPORT | SECURITY
          </span>
          <div className="space-y-0">
            {TRAINING_SUPPORT_SECURITY_FAQ.map((item, j) => {
              const key = `training-${j}`;
              return (
                <AccordionItem
                  key={key}
                  question={item.q}
                  answer={item.a}
                  isOpen={openKey === key}
                  onToggle={() => setOpenKey(openKey === key ? null : key)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
