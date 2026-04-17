import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, Clock, Zap, Timer, AlertTriangle, Activity, RotateCw, Shield } from 'lucide-react';

export default function ProcessAnimationCard() {
  const [isInView, setIsInView] = useState(false);
  const [autoStep, setAutoStep] = useState(-1);
  const [autoElapsed, setAutoElapsed] = useState(0);
  const [autoFinished, setAutoFinished] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  const autoSteps = [
    { name: 'Auto-login across systems securely', duration: '5 sec', seconds: 5 },
    { name: 'Auto-scan and process all orders', duration: '10-15 sec', seconds: 12 },
    { name: 'Auto-validate payment instantly', duration: '5-10 sec', seconds: 7 },
    { name: 'Auto-update ERP and notify instantly', duration: '<5 sec', seconds: 5 },
    { name: 'Auto-email and auto-log every action', duration: '<3 sec', seconds: 3 },
  ];

  const AUTO_CYCLE_MS = 5000;

  const resetAuto = useCallback(() => {
    setAutoStep(-1);
    setAutoElapsed(0);
    setAutoFinished(false);
  }, []);

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
      setCycleCount(c => c + 1);
      runAutoCycle();
    }, AUTO_CYCLE_MS);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, [isInView, resetAuto]);

  useEffect(() => {
    if (!isInView) return;
    
    const autoTimer = setInterval(() => {
      setAutoElapsed(prev => {
        if (prev >= 180) return 180;
        return prev + 1;
      });
    }, 20);

    return () => {
      clearInterval(autoTimer);
    };
  }, [isInView, cycleCount]);

  useEffect(() => {
    setAutoElapsed(0);
  }, [cycleCount]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsInView(true)}
      className="w-full h-full flex flex-col relative bg-white dark:bg-gray-950 rounded-xl md:rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800"
    >
      {/* ── AUTOMATION ── */}
      <div className="flex-1 bg-gradient-to-br from-[#4C99A0]/5 to-[#65A859]/5 dark:from-gray-900 dark:to-gray-900/80 p-5 md:p-6 lg:p-8 relative flex flex-col h-full">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#4C99A0] to-[#65A859] flex items-center justify-center shadow-md">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm md:text-base  text-gray-900 dark:text-white leading-tight">Agent</h3>
              <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">Fully automated</p>
            </div>
          </div>
          <div className="bg-[#65A859]/10 border border-[#65A859]/25 rounded-lg px-2 py-1 md:px-3 md:py-1.5 text-center shrink-0">
            <p className="text-sm md:text-lg font-mono font-black text-[#65A859] leading-none">3</p>
            <p className="text-[8px] md:text-[9px] font-semibold uppercase tracking-wider text-[#65A859]/70 mt-0.5">Minutes</p>
          </div>
        </div>

        <div className="mb-4 md:mb-6 flex items-center gap-2 h-6 md:h-8">
          <div className={`flex items-center gap-1.5 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-md text-[10px] md:text-xs font-mono  transition-colors duration-300 ${autoFinished ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-[#4C99A0]/15 text-[#4C99A0] dark:text-[#65A859]'}`}>
            <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${autoFinished ? 'bg-green-500' : 'bg-[#4C99A0] animate-pulse'}`} />
            <span className="hidden sm:inline">{autoFinished ? 'COMPLETED' : 'RUNNING'}</span> {formatTime(Math.min(autoElapsed, 180))}
          </div>
        </div>

        <div className="relative ml-2 md:ml-3 flex-1">
          <div className="absolute left-[7.5px] md:left-[11.5px] top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-700" />
          <motion.div
            className="absolute left-[7.5px] md:left-[11.5px] top-2 w-px bg-gradient-to-b from-[#4C99A0] to-[#65A859] origin-top rounded-full"
            animate={{ height: `${Math.min((autoStep + 1) / 5 * 100, 100)}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />

          <div className="space-y-3.5 md:space-y-4">
            {autoSteps.map((step, i) => {
              const isDone = i < autoStep;
              const isCurrent = i === autoStep;
              return (
                <div key={i} className="flex items-start gap-2.5 md:gap-4 relative">
                  <motion.div animate={isDone ? { scale: [0.8, 1.2, 1] } : {}} transition={{ duration: 0.3 }} className={`w-4 h-4 md:w-6 md:h-6 mt-0.5 rounded-full border-2 shrink-0 flex items-center justify-center z-10 transition-all duration-400 ${isDone ? 'bg-[#65A859] border-[#65A859] shadow-md shadow-[#65A859]/30' : isCurrent ? 'bg-white dark:bg-gray-800 border-[#4C99A0] shadow-md shadow-[#4C99A0]/20' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600'}`}>
                    {isDone && <CheckCircle2 className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-white" />}
                    {isCurrent && <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 0.6, repeat: Infinity }} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#4C99A0]" />}
                  </motion.div>
                  <div className={`flex-1 pb-0.5 transition-all duration-500 ${isDone || isCurrent ? 'opacity-100' : 'opacity-30'}`}>
                    <div className="flex items-center justify-between">
                      <p className={`text-[10px] md:text-xs lg:text-[13px] font-medium tracking-tight transition-colors duration-400 ${isDone ? 'text-gray-900 dark:text-white' : isCurrent ? 'text-[#4C99A0]' : 'text-gray-400 dark:text-gray-600'}`}>
                        {step.name}
                      </p>
                      <span className={`text-[9px] md:text-[10px] lg:text-[11px] font-mono ml-1 transition-colors duration-400 ${isDone ? 'text-[#65A859]' : isCurrent ? 'text-[#4C99A0]' : 'text-gray-300 dark:text-gray-700'}`}>
                        {step.duration}
                      </span>
                    </div>
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

        <div className="mt-4 md:mt-auto pt-3 md:pt-4 border-t border-[#4C99A0]/15 dark:border-gray-700/40 grid grid-cols-3 gap-1 md:gap-2">
          {[
            { icon: Shield, value: '~100%', label: 'Accuracy', color: 'text-[#65A859]' },
            { icon: XCircle, value: '0', label: 'Errors', color: 'text-[#65A859]' },
            { icon: Activity, value: '24/7', label: 'Uptime', color: 'text-[#65A859]' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center justify-center gap-0 md:gap-0.5 text-center bg-[#65A859]/5 dark:bg-[#65A859]/10 py-1 md:py-1.5 rounded-lg">
              <item.icon className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#65A859] mb-0.5" />
              <span className="text-[10px] md:text-xs lg:text-sm font-mono font-black text-[#65A859] leading-tight">{item.value}</span>
              <span className="text-[8px] md:text-[9px] font-medium text-gray-500 leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
