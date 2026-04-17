import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, Zap, LayoutTemplate, Code2, CheckCircle2, Package, Activity, Layers, Box, ShieldCheck, Settings, Cpu, Settings2, LineChart, Clock, Database, TrendingUp, Shield, FileText, Image, Scissors, ArrowRightLeft, Users } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileSignature, faFileCircleCheck, faPhotoFilm, faFolderTree, faTableCells, faClone, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import OrbitalApps from './OrbitalApps';
import CardSwap, { Card } from './CardSwap';
import SuitcaseImage from '../../assets/Suitcase.jpg';
import AmbotLogo from '../../assets/Ambot logo png.png';

const AGENTS = [
  { name: 'GRN Reconciliation', stat: '~100%', statLabel: 'Automation rate', desc: 'Logs into portals daily, zero manual touch', stack: 'SAP ECC · Playwright', lastRun: 'Today 06:03 AM', status: '0 errors', live: true },
  { name: 'AP/AR Automation', stat: '94%', statLabel: 'Auto match rate', desc: 'Matches invoices to POs with 94% accuracy', stack: 'NetSuite · Claude Vision', lastRun: 'Today 05:45 AM', status: '0 errors', live: true },
  { name: 'SAP Query Agent', stat: '2 to 5s', statLabel: 'Query response', desc: 'Self service SAP access, no IT tickets', stack: 'SAP HANA · ACDOCA', lastRun: 'Today 06:12 AM', status: '0 errors', live: true },
  // { name: 'Fund Operations', stat: '97.3%', statLabel: 'Accuracy vs legacy', desc: '117 investors, full audit trail', stack: 'Tally Prime · FBIL API', lastRun: 'Today 04:30 AM', status: '0 errors', live: true },
  // { name: 'CS Intelligence', stat: '200+', statLabel: 'Accounts monitored', desc: 'Flags at risk revenue before your team sees it', stack: 'Salesforce · SOQL', lastRun: 'Today 06:00 AM', status: '0 errors', live: true },
  // { name: 'Vehicle Compliance', stat: '10,000+', statLabel: 'Vehicles validated', desc: '10K+ vehicles validated against RTO daily', stack: 'RTO API · Fleet DB', lastRun: 'Today 05:00 AM', status: '0 errors', live: true },
];

const TABS = [
  { id: 'live', label: 'AI Agents', icon: Zap, subtitle: 'Proven agents running in production. Adaptable to your stack, deployable in weeks.' },
  { id: 'blueprints', label: 'Microsoft', icon: LayoutTemplate, subtitle: "AI-Driven Microsoft Automation for Desktop & Cloud" },
  { id: 'custom', label: 'Office Suite', icon: Code2, subtitle: 'Smart Office Suite for Complete Business Management with AI' },
  { id: 'products', label: 'Products', icon: Package, subtitle: 'Ready-to-use, scalable AI products built for your enterprise workflows.' },
];

const PRODUCTS = [
  { title: "DocCraft", icon: FileText, desc: "Automate Excel to PDF, PPT & Image Like Certificates", borderColor: "border-orange-500/40 hover:border-orange-500" },
  { title: "Image Compressor", icon: Image, desc: "Compress images by up to 90% without losing quality", borderColor: "border-blue-500/40 hover:border-blue-500" },
  { title: "Consolidation", icon: Database, desc: "Combine multiple files into single file (by Column)", borderColor: "border-[#107c41]/50 hover:border-[#107c41]" },
  { title: "File Splitter", icon: Scissors, desc: "Split large files into sheets and workbook, based on criteria", borderColor: "border-[#107c41]/50 hover:border-[#107c41]" },
  { title: "Merge Master", icon: Layers, desc: "Combine multiple files into single file (by Multiple Range)", borderColor: "border-[#107c41]/50 hover:border-[#107c41]" },
  { title: "File Comparison", icon: ArrowRightLeft, desc: "Compare between files and Highlight changes.", borderColor: "border-[#107c41]/50 hover:border-[#107c41]" },
  { title: "Work Allocation", icon: Users, desc: "Allocate tasks equally or Randomly based on User", borderColor: "border-purple-500/40 hover:border-purple-500" }
];

export default function AgentsInAction() {
  const [activeTab, setActiveTab] = useState('live');
  const [productPage, setProductPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const PRODUCTS_PER_PAGE = 4;
  const totalProductPages = Math.ceil(PRODUCTS.length / PRODUCTS_PER_PAGE);
  const TAB_SWITCH_MS = 4500;

  // Bouncing bot logo logic
  const botContainerRef = useRef<HTMLDivElement>(null);
  const botPosRef = useRef({ x: 20, y: 20 });
  const botVelRef = useRef({ dx: 1.2, dy: 0.9 });
  const botElRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number>(0);

  const animateBot = useCallback(() => {
    const container = botContainerRef.current;
    const bot = botElRef.current;
    if (!container || !bot) { rafRef.current = requestAnimationFrame(animateBot); return; }
    const cw = container.offsetWidth;
    const ch = container.offsetHeight;
    const bw = bot.offsetWidth || 40;
    const bh = bot.offsetHeight || 40;
    const pos = botPosRef.current;
    const vel = botVelRef.current;
    pos.x += vel.dx;
    pos.y += vel.dy;
    if (pos.x <= 0) { pos.x = 0; vel.dx = Math.abs(vel.dx); }
    if (pos.x + bw >= cw) { pos.x = cw - bw; vel.dx = -Math.abs(vel.dx); }
    if (pos.y <= 0) { pos.y = 0; vel.dy = Math.abs(vel.dy); }
    if (pos.y + bh >= ch) { pos.y = ch - bh; vel.dy = -Math.abs(vel.dy); }
    bot.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    rafRef.current = requestAnimationFrame(animateBot);
  }, []);

  useEffect(() => {
    if (activeTab !== 'products') { cancelAnimationFrame(rafRef.current); return; }
    rafRef.current = requestAnimationFrame(animateBot);
    return () => cancelAnimationFrame(rafRef.current);
  }, [activeTab, animateBot]);

  useEffect(() => {
    if (activeTab !== 'products') return;
    const timer = setInterval(() => {
      setProductPage((prev) => (prev + 1) % totalProductPages);
    }, 4200);
    return () => clearInterval(timer);
  }, [activeTab, totalProductPages]);

  useEffect(() => {
    if (isHovered) return;
    const timer = window.setTimeout(() => {
      const currentIndex = TABS.findIndex((tab) => tab.id === activeTab);
      const nextIndex = (currentIndex + 1) % TABS.length;
      setActiveTab(TABS[nextIndex].id);
    }, TAB_SWITCH_MS);

    return () => window.clearTimeout(timer);
  }, [activeTab, isHovered]);

  return (
    <section id="agents-in-action" className="section-bg relative overflow-hidden py-16 md:py-24">
      {/* Professional Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle gradient orbs - matching site theme */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#4C99A0]/45 dark:bg-[#4C99A0]/30 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-[#65A859]/40 dark:bg-[#65A859]/25 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full bg-[#4C99A0]/35 dark:bg-[#4C99A0]/20 blur-3xl" />

        {/* Faint lines removed per user request */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10"
      >
        <div className="relative z-10">
          <div className="text-center mb-4 px-4">
            {/* <p className="text-sm font-semibold tracking-wider text-primary-500 uppercase mb-2">Intelligent AI Agents · Microsoft ecosystem · Office Suite · Scalable products</p> */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-4xl mb-4 section-title"
            >
              Our Digital Services
            </motion.h2>
          </div>

          {/* Main Interactive Area */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-4 px-4">
              {TABS.map((tab) => (
                <div key={tab.id} className="flex flex-col items-stretch min-w-[120px]">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center justify-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-xl font-medium text-xs md:text-sm overflow-hidden transition-all duration-300 ${activeTab === tab.id
                      ? 'text-white shadow-lg shadow-[#4C99A0]/25'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                  >
                    {activeTab === tab.id && (
                      <>
                        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700" />
                        <motion.div
                          key={`fill-${tab.id}-${activeTab}`}
                          className="absolute inset-0 bg-gradient-to-r from-[#4C99A0] to-[#65A859]"
                          initial={{ clipPath: 'inset(0 100% 0 0)' }}
                          animate={{ clipPath: isHovered ? undefined : 'inset(0 0% 0 0)' }}
                          transition={{ duration: reduceMotion ? 0.01 : TAB_SWITCH_MS / 1000, ease: 'linear' }}
                        />
                      </>
                    )}
                    <tab.icon className={`relative z-10 w-5 h-5 ${activeTab === tab.id ? 'text-white' : ''}`} />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="h-[1280px] sm:h-[1160px] md:h-[740px] lg:h-[700px] overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'live' && (
                  <motion.div
                    key="live"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-[1400px] mx-auto"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto text-sm md:text-base font-medium"
                    >
                      {TABS[0].subtitle}
                    </motion.p>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full relative">
                      {/* Decorative accent line */}
                      <div className="hidden lg:block absolute left-[40%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                      {/* Left: 40% Info */}
                      <div className="w-full lg:w-[40%] flex flex-col justify-start px-3 sm:px-6 lg:px-8 py-6 lg:py-0 relative lg:self-stretch">
                        <div className="relative z-10 h-full flex flex-col gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg">
                              <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl  section-subtitle leading-tight">AI Agents</h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-6 text-base pr-4 leading-relaxed">Enterprise-grade automation replacing manual workflows seamlessly.</p>

                          <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2 text-xs  tracking-widest uppercase text-[#4C99A0] dark:text-[#65A859]">
                              <Activity className="w-4 h-4" /> Capabilities
                            </div>
                            <ul className="space-y-4">
                              {[
                                'Automate repetitive workflows end-to-end across multiple platforms.',
                                'Connect seamlessly to any ERP, CRM, or custom data source.',
                                'Run 24/7 with zero manual intervention required.',
                                'Full audit trails and sophisticated error handling built-in.'
                              ].map((text, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + i * 0.1 }}
                                  className="flex items-start gap-3 group"
                                >
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{text}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      {/* Right: 60% Card Swap */}
                      <div className="w-full lg:w-[60%] flex justify-center items-center h-[420px] sm:h-[500px] relative">
                        {/* Glowing background effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4C99A0]/5 via-transparent to-[#65A859]/5 rounded-3xl blur-2xl" />
                        <div className="relative z-10 translate-y-4 sm:translate-y-8 lg:translate-y-14">
                          <CardSwap width={400} height={350} pauseOnHover={true} visibleStack={4}>
                            {AGENTS.map((agent, i) => (
                              <Card
                                key={agent.name}
                                customClass="section-card p-6 !w-full !h-full border-2 border-gray-200 dark:border-gray-800 !bg-white dark:!bg-[#0B0F19] hover:border-[#4C99A0]/50 dark:hover:border-[#65A859]/50 transition-all duration-300 group !items-start !justify-start text-left shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                              >
                                <div className="flex items-start justify-between w-full mb-4">
                                  <h3 className="text-lg  text-gray-900 dark:text-gray-100">{agent.name}</h3>
                                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white text-xs font-semibold shadow-md flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                    Live
                                  </span>
                                </div>
                                <div className="mb-4">
                                  <p className="text-3xl  bg-gradient-to-r from-[#4C99A0] to-[#65A859] bg-clip-text text-transparent mb-1">{agent.stat}</p>
                                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{agent.statLabel}</p>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-left w-full leading-relaxed">{agent.desc}</p>
                                <div className="flex items-center gap-2 mb-4 px-3 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                                  <Database className="w-4 h-4 text-[#4C99A0] dark:text-[#65A859]" />
                                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{agent.stack}</p>
                                </div>
                                <div className="flex items-center justify-between w-full text-xs text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Last Run {agent.lastRun}</span>
                                  </div>
                                  <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-semibold">
                                    <CheckCircle2 className="w-4 h-4" /> {agent.status}
                                  </span>
                                </div>
                                <button className="mt-4 w-full py-2.5 text-sm font-semibold bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
                                  View details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                              </Card>
                            ))}
                          </CardSwap>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'blueprints' && (
                  <motion.div
                    key="blueprints"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-[1400px] mx-auto"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center text-gray-600 dark:text-gray-400 mb-4 text-sm md:text-base font-medium max-w-2xl mx-auto"
                    >
                      {TABS[1].subtitle}
                    </motion.p>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full relative">
                      {/* Decorative accent line */}
                      <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                      {/* Left: 60% Orbit */}
                      <div className="w-full lg:w-[60%] flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4C99A0]/5 via-transparent to-[#65A859]/5 rounded-3xl blur-2xl" />
                        <div className="relative z-10">
                          <OrbitalApps />
                        </div>
                      </div>
                      {/* Right: 40% Info */}
                      <div className="w-full lg:w-[40%] flex flex-col justify-start px-3 sm:px-6 lg:px-8 py-6 lg:py-0 relative lg:self-stretch">
                        <div className="relative z-10 h-full flex flex-col gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl">
                          <div className="flex items-start md:items-center gap-4 mb-4">
                            <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg">
                              <LayoutTemplate className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl md:text-2xl section-subtitle leading-tight">Microsoft-Powered Automation for Desktop & Cloud</h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm pr-4 leading-relaxed">20+ Microsoft apps with built-in AI—available at no additional cost. We connect and structure your ecosystem to automate workflows, build dashboards, and scale your business seamlessly across desktop and cloud.</p>

                          <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#4C99A0] dark:text-[#65A859]">
                              <Layers className="w-4 h-4" /> Key Benefits
                            </div>
                            <ul className="space-y-4">
                              {[
                                { title: 'Low-Code', desc: 'Build apps fast' },
                                { title: 'Cloud Ready', desc: 'Access anywhere' },
                                { title: 'Automation', desc: 'Save time, reduce errors' },
                                { title: 'AI Insights', desc: 'Smarter decisions' },
                                { title: 'Desktop Power', desc: 'Max productivity' }
                              ].map((benefit, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + i * 0.1 }}
                                  className="flex items-start gap-3 group"
                                >
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                    <strong className="font-semibold text-gray-900 dark:text-gray-100">{benefit.title}:</strong> {benefit.desc}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'custom' && (
                  <motion.div
                    key="custom"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-[1400px] mx-auto"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto text-sm md:text-base font-medium"
                    >
                      {TABS[2].subtitle}
                    </motion.p>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full relative">
                      {/* Decorative accent line */}
                      <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                      {/* Left: 60% Image */}
                      <div className="w-full lg:w-[60%] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200 dark:border-gray-700 relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4C99A0]/10 via-transparent to-[#65A859]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img src={SuitcaseImage} alt="Office Suite Integration" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      {/* Right: 40% Info */}
                      <div className="w-full lg:w-[40%] flex flex-col justify-start px-3 sm:px-6 lg:px-8 py-6 lg:py-0 relative lg:self-stretch">
                        <div className="relative z-10 h-full flex flex-col gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg">
                              <Code2 className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl section-subtitle leading-tight">Office Suite</h3>
                          </div>


                          <div className="flex flex-col gap-6">
                            {/* <div className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#4C99A0] dark:text-[#65A859]">
                            <Activity className="w-4 h-4" /> Capabilities
                          </div> */}
                            <ul className="space-y-4">
                              {[
                                { title: 'Web & Mobile Apps with AI', desc: 'Scalable apps with real-time insights and predictive analytics' },
                                { title: 'CRM Platform & AI Agent', desc: 'All-in-one system to manage sales, finance, HR, and operations' },
                                { title: 'Advanced 3D Websites', desc: 'Modern, high-performance websites with immersive design' },
                                { title: 'AI Chatbots', desc: 'Smart bots for instant support using trained knowledge' },
                                { title: 'Digital Marketing Agent', desc: 'Automated social media and campaign management' },
                                { title: 'Lead Generation Agent', desc: 'AI-powered lead capture and qualification' }
                              ].map((item, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + i * 0.1 }}
                                  className="flex items-start gap-3 group"
                                >
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                    <strong className="font-semibold text-gray-900 dark:text-gray-100">{item.title}:</strong> {item.desc}
                                  </span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'products' && (
                  <motion.div
                    key="products"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-[1400px] mx-auto"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto text-sm md:text-base font-medium"
                    >
                      {TABS[3].subtitle}
                    </motion.p>
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full relative">
                      {/* Decorative accent line */}
                      <div className="hidden lg:block absolute left-[60%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                      {/* Left: 60% Product Grid */}
                      <div ref={botContainerRef} className="w-full lg:w-[60%] bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-6 md:p-8 rounded-3xl border-2 border-white/50 dark:border-gray-700/50 shadow-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4C99A0]/5 via-transparent to-[#65A859]/5 rounded-3xl" />
                        <div className="relative z-10 lg:h-[520px] pr-1 flex flex-col justify-center">
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col gap-2.5 sm:gap-3"
                          >
                            {PRODUCTS.map((product, offset) => {
                              return (
                                <motion.div
                                  key={`${product.title}-${offset}`}
                                  initial={{ opacity: 0, x: -16 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.05 * offset }}
                                  className="rounded-lg p-[1.5px] bg-gradient-to-r from-[#4C99A0]/30 to-[#65A859]/30 hover:from-[#4C99A0] hover:to-[#65A859] shadow-[2px_4px_12px_rgba(0,0,0,0.06)] hover:shadow-lg transition-all duration-300 group"
                                >
                                  <div className="bg-white dark:bg-gray-800/95 rounded-[6.5px] w-full px-4 md:px-5 py-2.5 md:py-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-6 lg:gap-8">
                                    <h4 style={{ color: '#0F4C5C' }} className="dark:text-[#4C99A0] font-bold text-[13px] md:text-[14.5px] sm:min-w-[130px] md:min-w-[150px] shrink-0 tracking-wide flex items-center gap-2">
                                      {product.title === 'DocCraft' && (
                                        <FontAwesomeIcon icon={faFileSignature as IconProp} style={{ color: 'rgb(242, 134, 33)' }} />
                                      )}
                                      {product.title === 'Image Compressor' && (
                                        <FontAwesomeIcon icon={faPhotoFilm as IconProp} style={{ color: 'rgb(89, 170, 232)' }} />
                                      )}
                                      {product.title === 'File Splitter' && (
                                        <FontAwesomeIcon icon={faFolderTree as IconProp} style={{ color: 'rgb(65, 149, 35)' }} />
                                      )}
                                      {product.title === 'Consolidation' && (
                                        <FontAwesomeIcon icon={faFileCircleCheck as IconProp} style={{ color: 'rgb(65, 149, 40)' }} />
                                      )}
                                      {product.title === 'Merge Master' && (
                                        <FontAwesomeIcon icon={faTableCells as IconProp} style={{ color: 'rgb(65, 149, 35)' }} />
                                      )}
                                      {product.title === 'File Comparison' && (
                                        <FontAwesomeIcon icon={faClone as IconProp} style={{ color: 'rgb(65, 149, 35)' }} />
                                      )}
                                      {product.title === 'Work Allocation' && (
                                        <FontAwesomeIcon icon={faNetworkWired as IconProp} style={{ color: 'rgb(65, 149, 40)' }} />
                                      )}
                                      {product.title}
                                    </h4>
                                    <p className="text-gray-800 dark:text-gray-300 text-[11px] md:text-[12.5px] font-medium leading-relaxed">
                                      {product.desc}
                                    </p>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </motion.div>

                        </div>
                        {/* Bouncing Ambot Logo */}
                        <img
                          ref={botElRef}
                          src={AmbotLogo}
                          alt="Ambot"
                          className="absolute top-0 left-0 w-10 h-10 md:w-12 md:h-12 z-20 drop-shadow-xl pointer-events-none select-none"
                        />
                      </div>
                      {/* Right: 40% Info */}
                      <div className="w-full lg:w-[40%] flex flex-col justify-start px-3 sm:px-6 lg:px-8 py-6 lg:py-0 relative lg:self-stretch">
                        <div className="relative z-10 h-full flex flex-col gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg">
                              <Package className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl  section-subtitle leading-tight">Our Products</h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-6 text-base pr-4 leading-relaxed">Ready-to-deploy solutions for common enterprise bottlenecks.</p>

                          <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-2 text-xs  tracking-widest uppercase text-[#4C99A0] dark:text-[#65A859]">
                              <Activity className="w-4 h-4" /> Product Suite
                            </div>
                            <ul className="space-y-4">
                              {['Document automation and conversion tools.', 'File management: split, merge, compare.', 'Image compression without quality loss.', 'Smart work allocation and task distribution.'].map((text, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + i * 0.1 }}
                                  className="flex items-start gap-3 group"
                                >
                                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{text}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

