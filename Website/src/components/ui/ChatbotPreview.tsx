import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Bot, User } from 'lucide-react';
import ambotLogo from '../../assets/Ambot logo png.png';

const CHAT_MESSAGES = [
  {
    role: 'bot',
    text: "Hi, welcome to our Digital Solutions page. I can quickly guide you through what we offer.",
  },
  {
    role: 'user',
    text: 'What can your team build for us?',
  },
  {
    role: 'bot',
    text: 'We build automation agents, BI dashboards, Excel solutions, websites, and web/mobile apps.',
  },
  {
    role: 'user',
    text: 'Can you help us choose the right solution?',
  },
  {
    role: 'bot',
    text: 'Yes. Share your workflow goals, and we will recommend the best approach.',
  },
  {
    role: 'bot',
    text: 'Ready to discuss your use case? Tap Contact Us below.',
  },
];

export default function ChatbotPreview() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        // Hold the final state for 4 extra iterations (5.6 seconds) before looping
        if (prev >= CHAT_MESSAGES.length + 4) return 1;
        return prev + 1;
      });
    }, 1400);

    return () => clearInterval(timer);
  }, []);

  const handleContactScroll = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 via-cyan-50/40 to-emerald-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 p-4 md:p-6">
      <div className="w-full h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 shadow-xl flex flex-col overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-[#4C99A0]/10 to-[#65A859]/10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
            <img src={ambotLogo} alt="Ambot Logo" className="w-[85%] h-[85%] object-contain" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Page Assistant</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Online now</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {CHAT_MESSAGES.slice(0, visibleCount).map((message, index) => {
            const isUser = message.role === 'user';
            return (
              <motion.div
                key={`${message.role}-${index}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={ambotLogo} alt="Ambot Logo" className="w-[85%] h-[85%] object-contain" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs md:text-sm leading-relaxed ${
                    isUser
                      ? 'rounded-br-sm bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white'
                      : 'rounded-bl-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  {message.text}
                </div>
                {isUser && (
                  <div className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {visibleCount >= CHAT_MESSAGES.length && (
          <div className="px-4 pb-4 pt-3 flex justify-center">
            <button
              onClick={handleContactScroll}
              className="px-8 flex items-center justify-center rounded-lg bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white text-sm font-semibold py-2.5 shadow-md shadow-[#4C99A0]/20 hover:shadow-lg hover:opacity-95 transition-all"
            >
              Contact Us
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
