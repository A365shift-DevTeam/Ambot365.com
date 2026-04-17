import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Smartphone, Monitor, Wifi, Battery, Signal } from 'lucide-react';
import webScreenshot from '../../assets/Website gif/Web.png';
import mobileScreenshot from '../../assets/Website gif/Mobile.png';

type WebMobileAnimationProps = {
  url: string;
};

export default function WebMobileAnimation({ url }: WebMobileAnimationProps) {
  const [showMobile, setShowMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMobile((prev) => !prev);
    }, 4500); // 4.5 seconds per state
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-6 left-6 w-20 h-20 rounded-full bg-[#4C99A0]/5 blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-[#65A859]/5 blur-xl" />
        <motion.div
          className="absolute top-1/4 right-1/4 text-[#4C99A0]/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <Globe className="w-16 h-16" />
        </motion.div>
      </div>

      {/* Toggle indicator */}
      <div className="absolute top-3 md:top-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-gray-200/50 dark:border-gray-700/50">
        <Monitor className={`w-3.5 h-3.5 transition-colors duration-300 ${!showMobile ? 'text-[#4C99A0]' : 'text-gray-400'}`} />
        <div 
          className="w-8 h-4 rounded-full bg-gray-200 dark:bg-gray-700 relative cursor-pointer" 
          onClick={() => setShowMobile(!showMobile)}
        >
          <motion.div
            className="absolute top-0.5 w-3 h-3 rounded-full bg-gradient-to-r from-[#4C99A0] to-[#65A859] shadow-sm"
            animate={{ left: showMobile ? '18px' : '2px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </div>
        <Smartphone className={`w-3.5 h-3.5 transition-colors duration-300 ${showMobile ? 'text-[#65A859]' : 'text-gray-400'}`} />
      </div>

      {/* Morphing Device Container */}
      <div className="relative flex flex-col items-center justify-center flex-1 w-full mt-4 overflow-hidden">
        <div className="max-w-full w-full flex items-center justify-center transform origin-center scale-[0.5] sm:scale-[0.72] lg:scale-[0.9] xl:scale-100 transition-transform duration-500">
          <motion.div
            layout
            initial={false}
            animate={{
              width: showMobile ? 270 : 600,
              height: showMobile ? 520 : 390,
              borderRadius: showMobile ? 36 : 12,
              scale: showMobile ? 0.88 : 1,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
            className="relative bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex-shrink-0 z-10 mx-auto"
          >
             {/* Desktop Content */}
             <motion.div
               initial={false}
               animate={{ 
                 opacity: showMobile ? 0 : 1,
                 scale: showMobile ? 0.9 : 1,
                 pointerEvents: showMobile ? 'none' : 'auto'
               }}
               transition={{ duration: 0.25 }}
               className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[390px] flex flex-col transform-gpu"
             >
                  <DesktopView url={url} />
             </motion.div>

             {/* Mobile Content */}
             <motion.div
               initial={false}
               animate={{ 
                 opacity: showMobile ? 1 : 0, 
                 scale: showMobile ? 1 : 1.1,
                 pointerEvents: showMobile ? 'auto' : 'none'
               }}
               transition={{ duration: 0.25, delay: showMobile ? 0.15 : 0 }}
               className="absolute top-0 left-1/2 -translate-x-1/2 w-[270px] h-[520px] flex flex-col transform-gpu"
             >
                  <MobileView url={url} />
             </motion.div>

             {/* Mobile Notch (morphs in/out) */}
             <motion.div
                initial={false}
                animate={{ 
                  opacity: showMobile ? 1 : 0, 
                  y: showMobile ? 0 : -20,
                  width: showMobile ? 100 : 200,
                  height: showMobile ? 22 : 0
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-850 rounded-b-[14px] z-20"
             />
          </motion.div>
        </div>
      </div>

      {/* Bottom Label updates dynamically */}
      <div className="mb-2 z-10 h-6 shrink-0 text-center flex justify-center w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={showMobile ? 'mobile' : 'web'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-sm md:text-base text-gray-600 dark:text-gray-300  tracking-wide"
          >
            {showMobile ? "Native Mobile Application" : "Responsive Web Application"}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function toDisplayUrl(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, '');
  }
}

function DesktopView({ url }: { url: string }) {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50 dark:bg-gray-800">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2 mt-0 bg-gray-200 dark:bg-gray-850 border-b border-gray-300 dark:border-gray-700 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 mx-4">
          <div className="bg-white dark:bg-gray-700 rounded-md px-3 py-1 text-[10px] text-gray-500 dark:text-gray-400 flex items-center gap-2 border border-gray-300 dark:border-gray-600 max-w-sm mx-auto shadow-sm">
            <Globe className="w-3 h-3 text-[#4C99A0]" />
            <span>{toDisplayUrl(url)}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-gray-950 overflow-hidden relative">
        <img
          src={webScreenshot}
          alt="Web preview"
          className="w-full h-auto object-top"
        />
      </div>
    </div>
  );
}

function MobileView({ url }: { url: string }) {
  return (
    <div className="w-full h-full flex flex-col bg-white dark:bg-gray-950 relative border-[6px] border-gray-900 dark:border-gray-800 rounded-[36px] overflow-hidden">
      {/* App content wrapper (adjusted for notch) */}
      <div className="flex-1 flex flex-col pt-5 bg-gray-50/50 dark:bg-[#0d1526]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-5 py-1 shrink-0">
          <span className="text-[10px] font-semibold text-gray-800 dark:text-gray-200">9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3 h-3 text-gray-800 dark:text-gray-200" />
            <Wifi className="w-3 h-3 text-gray-800 dark:text-gray-200" />
            <Battery className="w-3.5 h-3 text-gray-800 dark:text-gray-200" />
          </div>
        </div>

        <div className="flex-1 overflow-hidden bg-white">
          <img
            src={mobileScreenshot}
            alt="Mobile preview"
            className="w-full h-auto object-top"
          />
        </div>
      </div>
      
      {/* Home indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
    </div>
  );
}
