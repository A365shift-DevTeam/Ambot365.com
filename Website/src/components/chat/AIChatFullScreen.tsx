import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Plus, Mic, PanelLeft } from 'lucide-react';
import { localAnswer } from '../../lib/localChat';
import ambotLogo from '../../assets/Ambot logo png.png';

const FAQ_ITEMS = [
  { q: 'What is the Office AI Bots Application?', a: 'The Office AI Bots Application is a desktop tool that brings intelligent automation to your Microsoft Office workflow, helping you complete repetitive tasks faster and with fewer errors.' },
  { q: 'Who can benefit from using the Office Bots Desktop Application?', a: 'Anyone who uses Microsoft Office regularly-from individuals and small teams to enterprises-can benefit. It is especially useful for roles that handle repetitive document, spreadsheet, or email tasks.' },
  { q: 'How many bots are currently available and will more bots be added in the future?', a: 'We offer a growing set of bots today and regularly add new ones based on user needs and feedback. Check the app or our website for the latest list and roadmap.' },
  { q: 'What is the reason for creating these bots?', a: 'We created these bots to reduce manual, repetitive work in Office so users can focus on higher-value tasks, improve accuracy, and scale without adding headcount.' },
  { q: 'What is unique about this tool, and is it patented?', a: 'Our bots are built specifically for real-world Office workflows and integrate tightly with your existing setup. Specific innovations are covered by our intellectual property and patents where applicable.' },
  { q: 'Is the bot certified against antivirus threats? How secure is Ambot365?', a: 'Ambot365 is designed with security in mind and is tested for compatibility with common antivirus solutions. We follow secure development practices and can provide more detail on request.' },
  { q: 'How can I download the application?', a: 'You can download the Office Bots Desktop Application from our website or through the link provided after purchase. Follow the installation guide for your operating system.' },
  { q: 'Can the product license be transferred or accessed from another system?', a: 'License terms depend on your plan. Some licenses allow use on one primary device with options to transfer; check your license agreement or contact support for your case.' },
  { q: 'Can I transfer my license if my system crashes or I get a new one?', a: 'Yes. We support license transfer in cases of hardware failure or upgrade. Contact our support team with your license details to complete the transfer.' },
  { q: 'Is there a support desk for inquiries?', a: 'Yes. We provide a support desk for technical and account inquiries. Access details are in the app and in your welcome email.' },
  { q: 'Do we have any training or knowledge sources and IT support?', a: 'We offer training materials, knowledge bases, and IT support to help you get the most out of the application. Resources are available in the app and on our customer portal.' },
  { q: 'What are the system requirements and installation software?', a: 'The application runs on supported Windows versions with Microsoft Office installed. Exact requirements and installation steps are listed on our website and in the installer.' },
  { q: 'Are there any inaugural offers available?', a: 'We occasionally run launch and promotional offers. Check our website or contact sales for current inaugural or special pricing.' },
];

const SIDEBAR_MENUS = [
  'Intelligent AI Agents',
  'Microsoft AI Ecosystem',
  'Office Suite',
  'Scalable Industry Products',
  'FAQ',
  'Contact Us',
];

const MENU_SUGGESTIONS: Record<string, string[]> = {
  'Intelligent AI Agents': [
    'What AI Agents do you offer?',
    'How do AI Agents integrate with SAP?',
    'What is the typical delivery timeline?',
  ],
  'Microsoft AI Ecosystem': [
    'What Microsoft AI solutions do you offer?',
    'Can you build custom Copilot agents?',
    'Do you support Power Platform and Power Automate?',
  ],
  'Office Suite': [
    'What are your Office Suite products?',
    'What is DocCraft?',
    'Do you offer chatbots?',
  ],
  'Scalable Industry Products': [
    'What industry products do you offer?',
    'Tell me more about EduBot.',
    'What is MediBot?',
    'Tell me more about LegalBot.',
  ],
  FAQ: FAQ_ITEMS.map((item) => item.q),
  'Contact Us': [
    'Email Us',
    'LinkedIn',
    'Instagram',
    'Facebook',
    'YouTube',
  ],
};

type Message = { role: 'user' | 'assistant'; content: string };

export default function AIChatFullScreen({
  onClose,
  initialMenu = null,
}: {
  onClose: () => void;
  initialMenu?: string | null;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi 👋! Welcome to Ambot365 Product & Services' },
    { role: 'assistant', content: 'Explore the sidebar to your left to discover our detailed Solutions, AI Ecosystem, and Industry Products. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const faqAnswerMap = new Map(FAQ_ITEMS.map((item) => [item.q, item.a]));
  const [selectedMenu, setSelectedMenu] = useState<string | null>(initialMenu);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (initialMenu) setSelectedMenu(initialMenu);
  }, [initialMenu]);

  const handleSend = (text: string = input.trim()) => {
    if (!text) return;
    setInput('');

    // Handle "Contact Us" suggestions immediately
    if (text === 'LinkedIn') {
      window.open('https://linkedin.com/in/ambrose-denny-39320692', '_blank');
      return;
    }
    if (text === 'Instagram') {
      window.open('https://www.instagram.com/ambot_365/', '_blank');
      return;
    }
    if (text === 'Facebook') {
      window.open('https://www.facebook.com/people/AmBot-365/100092347833674/', '_blank');
      return;
    }
    if (text === 'YouTube') {
      window.open('https://www.youtube.com/@Ambot365Digibots', '_blank');
      return;
    }

    if (text === 'Email Us') {
      setMessages((m) => [
        ...m,
        { role: 'user', content: text },
        { role: 'assistant', content: 'SHOW_CONTACT_FORM' },
      ]);
      return;
    }

    const faqAnswer = faqAnswerMap.get(text);
    if (faqAnswer) {
      setMessages((m) => [
        ...m,
        { role: 'user', content: text },
        { role: 'assistant', content: faqAnswer },
      ]);
      return;
    }

    const reply = localAnswer(text);
    setMessages((m) => [
      ...m,
      { role: 'user', content: text },
      { role: 'assistant', content: reply },
    ]);
  };

  const currentSuggestions = selectedMenu ? MENU_SUGGESTIONS[selectedMenu] ?? [] : [];

  /** Render text with **bold** markdown support */
  const renderText = (content: string) =>
    content.split('\n').map((line, li, arr) => (
      <span key={li}>
        {line.split('**').map((part, j) =>
          j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
        )}
        {li < arr.length - 1 && <br />}
      </span>
    ));

  const ContactForm = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const sub = async (e: any) => {
      e.preventDefault();
      setStatus('sending');
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) setStatus('success');
        else setStatus('error');
      } catch {
        setStatus('error');
      }
    };

    if (status === 'success') {
      return (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl text-sm">
          Message sent successfully! We'll get back to you soon.
        </div>
      );
    }

    return (
      <form onSubmit={sub} className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl p-4 space-y-3">
        <h3 className="text-white font-medium text-sm" style={{ color: '#ffffff' }}>Send us a message</h3>
        <input
          required
          type="text"
          placeholder="Name"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4C99A0]"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4C99A0]"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          required
          type="text"
          placeholder="Subject"
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4C99A0]"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        />
        <textarea
          required
          placeholder="Message"
          rows={3}
          className="w-full bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#4C99A0]"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        <button
          disabled={status === 'sending'}
          className="w-full py-2 bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'error' && <p className="text-red-400 text-[10px]">Failed to send. Please try again.</p>}
      </form>
    );
  };

  const chatUI = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] flex flex-col bg-gray-900 overflow-hidden"
        style={{ isolation: 'isolate' }}
      >
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-[10000] flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-900 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-1.5 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
            <div className="w-2 h-2 rounded-full bg-[#4C99A0] animate-pulse" />
            <h2
              className="text-base sm:text-xl tracking-tight"
              style={{ color: '#ffffff', textShadow: '0 0 1px rgba(255,255,255,0.5)' }}
            >
              Ambot365 AI Assistant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Main layout */}
        <div className="flex-1 flex min-h-0 overflow-hidden pt-14 bg-gray-900">

          {/* Mobile sidebar overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-[10001] md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside className={`
            fixed md:relative top-14 bottom-0 left-0 z-[10002] w-64 md:w-56 shrink-0 border-r border-gray-700 bg-gray-800 md:bg-gray-800/50 flex flex-col py-4
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
          `}>
            <p className="px-4 text-gray-500 text-xs uppercase tracking-wider mb-3 font-semibold">Solutions</p>
            <nav className="flex flex-col gap-0.5 px-2 overflow-y-auto flex-1">
              {SIDEBAR_MENUS.map((menu) => (
                <button
                  key={menu}
                  onClick={() => {
                    setSelectedMenu(menu);
                    setSidebarOpen(false);
                  }}
                  className={`text-left px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${selectedMenu === menu
                    ? 'text-white bg-gradient-to-r from-[#4C99A0] to-[#65A859] shadow-md shadow-[#4C99A0]/20'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/80'
                    }`}
                >
                  {menu}
                </button>
              ))}
            </nav>
            <div className="px-4 pt-4 border-t border-gray-700">
              <p className="text-gray-500 text-xs">Ambot365 AI Assistant</p>
              <p className="text-gray-600 text-xs mt-1">Powered by Ambot365 data</p>
            </div>
          </aside>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Chat state */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                    {messages.map((msg, i) => {
                      const isLast = i === messages.length - 1;
                      const showSuggestions = isLast && msg.role === 'assistant' && selectedMenu && currentSuggestions.length > 0;

                      return (
                        <div key={i} className="space-y-4">
                          <div className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'assistant' && (
                              <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 overflow-hidden shrink-0 hidden md:block">
                                <img src={ambotLogo} alt="AI" className="w-full h-full object-cover" />
                              </div>
                            )}
                            {msg.content === 'SHOW_CONTACT_FORM' ? (
                              <ContactForm />
                            ) : (
                              <div
                                className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                                  ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-br-md'
                                  : 'bg-gray-800 text-gray-100 rounded-bl-md'
                                  }`}
                              >
                                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                                  {renderText(msg.content)}
                                </p>
                              </div>
                            )}
                          </div>

                          {showSuggestions && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex flex-col items-start gap-3 ml-2"
                            >
                              <p className="text-gray-500 text-[10px] uppercase tracking-widest ">Suggested</p>
                              <div className="flex flex-wrap gap-2">
                                {currentSuggestions.map((q, i) => (
                                  <button
                                    key={i}
                                    onClick={() => handleSend(q)}
                                    className="px-4 py-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/80 border border-gray-700/50 hover:border-[#4C99A0]/50 text-gray-300 hover:text-white text-xs transition-all duration-200 shadow-sm"
                                  >
                                    {q}
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom bar */}
                  <div className="shrink-0 border-t border-gray-800 bg-gray-900 px-4 py-4">
                    <div className="max-w-2xl mx-auto flex items-center gap-1.5 sm:gap-2 bg-gray-800 border border-gray-700 rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3">
                      <button type="button" className="hidden sm:block p-1.5 text-gray-400 hover:text-white rounded-lg" aria-label="Attach">
                        <Plus className="w-5 h-5" />
                      </button>
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask anything about Ambot365..."
                        className="flex-1 min-w-0 bg-transparent text-white placeholder-gray-500 text-sm sm:text-base py-1 focus:outline-none"
                      />
                      <button type="button" className="hidden sm:block p-1.5 text-gray-400 hover:text-white rounded-lg" aria-label="Voice">
                        <Mic className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleSend()}
                        disabled={!input.trim()}
                        className="p-2 rounded-xl bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                      >
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
              </div>
            </div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(chatUI, document.body);
}

