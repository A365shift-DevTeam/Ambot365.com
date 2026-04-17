import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Zap, ArrowRight, Timer, AlertTriangle, Shield, TrendingUp, Activity, RotateCw } from 'lucide-react';

export default function ProcessComparison() {
  const [isInView, setIsInView] = useState(false);
  const [manualStep, setManualStep] = useState(-1);
  const [autoStep, setAutoStep] = useState(-1);
  const [manualElapsed, setManualElapsed] = useState(0);
  const [autoElapsed, setAutoElapsed] = useState(0);
  const [autoFinished, setAutoFinished] = useState(false);
  const [manualFinished, setManualFinished] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const manualSteps = [
    { name: 'Login to multiple systems manually', duration: '2-3 min', seconds: 150 },
    { name: 'Search and open orders one-by-one', duration: '3-4 min', seconds: 210 },
    { name: 'Verify payment manually', duration: '2-3 min', seconds: 150 },
    { name: 'Update ERP and notify teams manually', duration: '2-3 min', seconds: 150 },
    { name: 'Send emails and maintain audit manually', duration: '1-2 min', seconds: 90 },
  ];

  const autoSteps = [
    { name: 'Auto-login across systems securely', duration: '5 sec', seconds: 5 },
    { name: 'Auto-scan and process all orders', duration: '10-15 sec', seconds: 12 },
    { name: 'Auto-validate payment instantly', duration: '5-10 sec', seconds: 7 },
    { name: 'Auto-update ERP and notify instantly', duration: '<5 sec', seconds: 4 },
    { name: 'Auto-email and auto-log every action', duration: '<3 sec', seconds: 2 },
  ];

  const benefits = [
    { title: '90% Time Reduction', detail: 'From 7-12 minutes to under 45 seconds per order' },
    { title: '95% Process Automation', detail: 'End-to-end execution with minimal human intervention' },
    { title: '10x Higher Throughput', detail: 'Scales seamlessly across industries without increasing manpower' },
    { title: '3-5x Productivity Gain', detail: 'Teams shift from manual work to high-value decision making' },
    { title: '100% Accuracy & Compliance', detail: 'Standardized automation adaptable across any business function' },
  ];

  const MANUAL_CYCLE_MS = 10000; // 10s per manual cycle
  const AUTO_CYCLE_MS = 5000;   // 5s per auto cycle — resets immediately

  const resetManual = useCallback(() => {
    setManualStep(-1);
    setManualElapsed(0);
    setManualFinished(false);
  }, []);

  const resetAuto = useCallback(() => {
    setAutoStep(-1);
    setAutoElapsed(0);
    setAutoFinished(false);
  }, []);

  // Manual cycle — slow, never finishes
  useEffect(() => {
    if (!isInView) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    function runManualCycle() {
      resetManual();
      timers.push(setTimeout(() => setManualStep(0), 400));
      timers.push(setTimeout(() => setManualStep(1), 2500));
      timers.push(setTimeout(() => setManualStep(2), 4500));
      timers.push(setTimeout(() => setManualStep(3), 6500));
      timers.push(setTimeout(() => setManualStep(4), 8500));
      timers.push(setTimeout(() => setManualFinished(true), 9500));
    }

    runManualCycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers.length = 0;
      setCycleCount(c => c + 1);
      runManualCycle();
    }, MANUAL_CYCLE_MS);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [isInView, resetManual]);

  // Automation cycle — fast, resets immediately after finishing
  useEffect(() => {
    if (!isInView) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    function runAutoCycle() {
      resetAuto();
      timers.push(setTimeout(() => setAutoStep(0), 200));
      timers.push(setTimeout(() => setAutoStep(1), 1000));
      timers.push(setTimeout(() => setAutoStep(2), 1800));
      timers.push(setTimeout(() => setAutoStep(3), 2600));
      timers.push(setTimeout(() => setAutoStep(4), 3400));
      timers.push(setTimeout(() => {
        setAutoStep(5);
        setAutoFinished(true);
      }, 4000));
    }

    runAutoCycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers.length = 0;
      runAutoCycle();
    }, AUTO_CYCLE_MS);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [isInView, resetAuto]);

  // Elapsed time counters
  useEffect(() => {
    if (!isInView) return;

    // Manual elapsed: counts up slowly (simulates real minutes as seconds)
    const manualTimer = setInterval(() => {
      setManualElapsed(prev => {
        if (prev >= 600) return 600; // cap at 10 min
        return prev + 1;
      });
    }, 16); // ~60 per second for fast visual counting

    // Auto elapsed: counts up fast then stops
    const autoTimer = setInterval(() => {
      setAutoElapsed(prev => {
        if (prev >= 180) return 180; // cap at 3 min
        return prev + 1;
      });
    }, 20);

    return () => {
      clearInterval(manualTimer);
      clearInterval(autoTimer);
    };
  }, [isInView, cycleCount]);

  // Reset elapsed on cycle
  useEffect(() => {
    setManualElapsed(0);
    setAutoElapsed(0);
  }, [cycleCount]);

  const getInvoiceCount = (elapsed: number, max: number) => {
    // For manual: counts up to 10 over 600 units
    // For auto: counts up to 50 over 180 units
    if (max === 600) {
      const count = Math.min(Math.floor((elapsed / 600) * 10) + 1, 10);
      return `Invoice ${count}`;
    } else {
      const count = Math.min(Math.floor((elapsed / 180) * 50) + 1, 50);
      return `Invoice ${count}`;
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-white dark:bg-gray-950" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl mb-4 section-title"
          >
            Manual Process vs <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4C99A0] to-[#65A859]">Ambot365 Automation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm md:text-base"
          >
            Automate Any Process. Across Any Industry.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setIsInView(true)}
          className="relative [transform-style:preserve-3d]"
        >

          <div className="pointer-events-none absolute left-8 right-8 -bottom-10 h-16 bg-black/20 blur-3xl opacity-20 dark:opacity-30" />

          {/* Two Column Layout */}
          <div className="relative rounded-3xl overflow-hidden border border-gray-200/70 dark:border-gray-800/80 bg-[#EAF6F1] dark:bg-gray-900/90 shadow-[0_28px_70px_-30px_rgba(31,41,55,0.45),0_6px_16px_rgba(31,41,55,0.08)]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/20 to-transparent dark:from-white/[0.04] dark:via-transparent dark:to-transparent z-10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative z-20">

              {/* ── LEFT: MANUAL ── */}
              <div className="bg-white dark:bg-gray-900 p-8 md:p-10 relative overflow-hidden lg:border-r border-gray-200/60 dark:border-gray-800/80">
                {/* Manual Invoice Count Card */}
                <div className="hidden sm:flex absolute top-6 right-6 w-20 h-20 rounded-xl bg-red-50/80 dark:bg-red-900/20 flex-col items-center justify-center border border-red-100 dark:border-red-800/40 pointer-events-none z-30 shadow-sm shadow-red-500/5">
                  <span className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {Math.min(Math.floor(manualElapsed / 60) + 1, 10)}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-red-700/70 dark:text-red-400/70">Invoice</span>
                </div>

                {/* Header Row */}
                <div className="flex items-start justify-start mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 flex items-center justify-center">
                      <Timer className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900 dark:text-white">Manual</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Traditional process</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8 flex flex-col items-center justify-center gap-3">
                  <p className="text-[11px] md:text-[12px] font-medium text-orange-600/80 dark:text-orange-400/80 text-center">
                    Delayed • Error-Prone • Repetitive
                  </p>
                </div>

                {/* Timeline Steps */}
                <div className="relative ml-4">
                  {/* Vertical line */}
                  <div className="absolute left-[11.5px] top-3 bottom-3 w-px bg-gray-200 dark:bg-gray-700" />
                  {/* Manual progress line */}
                  <motion.div
                    className="absolute left-[11.5px] top-3 w-px bg-gradient-to-b from-blue-400 to-orange-400 origin-top"
                    animate={{ height: `${Math.min((manualStep + 1) / 5 * 100, 100)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />

                  <div className="space-y-5">
                    {manualSteps.map((step, i) => {
                      const isDone = i < manualStep;
                      const isCurrent = i === manualStep;
                      const isPending = i > manualStep;

                      return (
                        <div key={i} className="flex items-start gap-4 relative">
                          {/* Node */}
                          <div className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center z-10 transition-all duration-500 ${isDone
                            ? 'bg-blue-500 border-blue-500'
                            : isCurrent
                              ? 'bg-white dark:bg-gray-800 border-orange-400 shadow-md shadow-orange-200 dark:shadow-orange-900/30'
                              : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                            }`}>
                            {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            {isCurrent && (
                              <motion.div
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-2 h-2 rounded-full bg-orange-400"
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div className={`flex-1 pb-1 transition-all duration-500 ${isPending ? 'opacity-30' : ''}`}>
                            <div className="flex items-center justify-between">
                              <p className={`text-xs md:text-[13px] font-medium transition-colors duration-500 ${isDone ? 'text-gray-800 dark:text-gray-200' : isCurrent ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400 dark:text-gray-600'
                                }`}>
                                {step.name}
                              </p>
                              <span className={`text-[10px] md:text-[11px] font-mono ml-2 transition-colors duration-500 ${isDone ? 'text-gray-50' : isCurrent ? 'text-orange-500' : 'text-gray-300 dark:text-gray-700'
                                }`}>
                                {step.duration}
                              </span>
                            </div>
                            {/* Always rendered to prevent height shift */}
                            <div className="h-[2px] mt-1.5 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <motion.div
                                animate={{ width: isCurrent ? '100%' : isDone ? '100%' : '0%' }}
                                transition={{ duration: isCurrent ? 2.5 : 0.3, ease: isCurrent ? 'linear' : 'easeOut' }}
                                className={`h-full rounded-full transition-colors duration-300 ${isCurrent ? 'bg-gradient-to-r from-orange-300 to-orange-400 dark:from-orange-500/60 dark:to-orange-400/80' : isDone ? 'bg-blue-400/40' : 'bg-transparent'}`}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>


              </div>

              {/* ── CENTER VS BADGE ── */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4C99A0] to-[#65A859] rounded-full blur-xl opacity-40 scale-150" />
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-2xl relative border-4 border-white dark:border-gray-950">
                    <span className="text-white font-black text-sm tracking-wider">VS</span>
                  </div>
                </div>
              </div>

              {/* Mobile VS */}
              <div className="lg:hidden flex justify-center -my-3 z-20 relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-xl border-4 border-white dark:border-gray-950">
                  <span className="text-white font-black text-xs">VS</span>
                </div>
              </div>

              {/* ── RIGHT: AUTOMATION ── */}
              <div className="bg-white dark:bg-gray-900 p-8 md:p-10 relative overflow-hidden">
                {/* Glow effects */}
                <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-[#4C99A0]/8 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-[#65A859]/8 blur-3xl pointer-events-none" />

                {/* Agent Invoice Count Card */}
                <div className="hidden sm:flex absolute top-6 right-6 w-20 h-20 rounded-xl bg-[#4C99A0]/10 dark:bg-[#4C99A0]/20 flex-col items-center justify-center border border-[#4C99A0]/20 dark:border-[#4C99A0]/30 pointer-events-none z-30 shadow-lg shadow-[#4C99A0]/10">
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {Math.min(Math.floor(autoElapsed / 3.6) + 1, 50)}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-green-700/70 dark:text-green-400/70">Invoice</span>
                </div>

                {/* Header Row */}
                <div className="flex items-start justify-start mb-6 relative z-10">
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-lg shadow-[#4C99A0]/25">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900 dark:text-white">Agent</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Fully automated</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8 flex flex-col items-center justify-center gap-3 relative z-10">
                  <p className="text-[11px] md:text-[12px] font-medium text-[#65A859] text-center">
                    Real-Time • Precise • Scalable
                  </p>
                </div>

                {/* Timeline Steps */}
                <div className="relative ml-4 z-10">
                  {/* Vertical line */}
                  <div className="absolute left-[11.5px] top-3 bottom-3 w-px bg-gray-200 dark:bg-gray-700" />
                  {/* Animated progress line */}
                  <motion.div
                    className="absolute left-[11.5px] top-3 w-px bg-gradient-to-b from-[#4C99A0] to-[#65A859] origin-top"
                    animate={{ height: `${Math.min((autoStep + 1) / 5 * 100, 100)}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />

                  <div className="space-y-5">
                    {autoSteps.map((step, i) => {
                      const isDone = i < autoStep;
                      const isCurrent = i === autoStep;

                      return (
                        <div key={i} className="flex items-start gap-4 relative">
                          {/* Node */}
                          <motion.div
                            animate={isDone ? { scale: [0.8, 1.2, 1] } : {}}
                            transition={{ duration: 0.3 }}
                            className={`w-6 h-6 rounded-full border-2 shrink-0 flex items-center justify-center z-10 transition-all duration-400 ${isDone
                              ? 'bg-[#65A859] border-[#65A859] shadow-md shadow-[#65A859]/30'
                              : isCurrent
                                ? 'bg-white dark:bg-gray-800 border-[#4C99A0] shadow-md shadow-[#4C99A0]/20'
                                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'
                              }`}
                          >
                            {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                            {isCurrent && (
                              <motion.div
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                                className="w-2 h-2 rounded-full bg-[#4C99A0]"
                              />
                            )}
                          </motion.div>

                          {/* Content */}
                          <div className={`flex-1 pb-1 transition-all duration-500 ${isDone || isCurrent ? 'opacity-100' : 'opacity-30'}`}>
                            <div className="flex items-center justify-between">
                              <p className={`text-xs md:text-[13px] font-medium transition-colors duration-400 ${isDone ? 'text-gray-900 dark:text-white' : isCurrent ? 'text-[#4C99A0]' : 'text-gray-400 dark:text-gray-600'
                                }`}>
                                {step.name}
                              </p>
                              <span className={`text-[10px] md:text-[11px] font-mono ml-2 transition-colors duration-400 ${isDone ? 'text-[#65A859]' : isCurrent ? 'text-[#4C99A0]' : 'text-gray-300 dark:text-gray-700'
                                }`}>
                                {step.duration}
                              </span>
                            </div>
                            {/* Always rendered to prevent height shift */}
                            <div className="h-[2px] mt-1.5 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                              <motion.div
                                animate={{ width: isCurrent ? '100%' : isDone ? '100%' : '0%' }}
                                transition={{ duration: isCurrent ? 0.7 : 0.3, ease: 'easeOut' }}
                                className={`h-full rounded-full transition-colors duration-300 ${isCurrent ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859]' : isDone ? 'bg-[#65A859]/30' : 'bg-transparent'}`}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>


              </div>

            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gray-200/70 dark:border-gray-800/80 bg-white/80 dark:bg-gray-900/70 p-5 md:p-6">
            <h3 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Benefits
            </h3>
            <ul className="space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit.title} className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 bg-gradient-to-r from-[#4C99A0]/8 to-[#65A859]/8 dark:from-[#4C99A0]/15 dark:to-[#65A859]/15 text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#65A859]" />
                  <span>
                    <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#4C99A0] to-[#65A859]">
                      {benefit.title}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300"> - {benefit.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
