import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { useRef, useState } from 'react';
import {
  FileText,
  Presentation,
  Image,
  Layers,
  Split,
  Merge,
} from 'lucide-react';

const SEGMENTS = [
  {
    id: 0,
    title: 'DocCraft',
    description:
      'Automate Excel to PDF, PPT & Image conversions for certificates, reports, and documents.',
    icon: FileText,
    color: 'from-[#FF6B6B] to-[#FF8E8B]', // Red/Orange tone
    lightBg: 'bg-[#FF6B6B]/10 dark:bg-[#FF6B6B]/20',
    arcColor: '#FF6B6B',
  },
  {
    id: 1,
    title: 'Sheets to Slides',
    description:
      'Create presentations from Excel in one click—weekly reports, proposals, and dashboards.',
    icon: Presentation,
    color: 'from-[#FF8E8B] to-[#FFA3A1]',
    lightBg: 'bg-[#FF8E8B]/10 dark:bg-[#FF8E8B]/20',
    arcColor: '#FF8E8B',
  },
  {
    id: 2,
    title: 'Image Compressor',
    description:
      'Compress images up to 90% without noticeable quality loss. Optimize for web, email, and storage.',
    icon: Image,
    color: 'from-[#A162F7] to-[#B684F9]', // Purple tone
    lightBg: 'bg-[#A162F7]/10 dark:bg-[#A162F7]/20',
    arcColor: '#A162F7',
  },
  {
    id: 3,
    title: 'Consolidation',
    description:
      'Combine multiple files into a single file by column. Merge data from different sources.',
    icon: Layers,
    color: 'from-[#5584FF] to-[#7199FF]', // Blue tone
    lightBg: 'bg-[#5584FF]/10 dark:bg-[#5584FF]/20',
    arcColor: '#5584FF',
  },
  {
    id: 4,
    title: 'File Splitter',
    description:
      'Split large files into sheets and workbooks based on criteria. Break down exports easily.',
    icon: Split,
    color: 'from-[#1DD0A9] to-[#4BE0C0]', // Green tone
    lightBg: 'bg-[#1DD0A9]/10 dark:bg-[#1DD0A9]/20',
    arcColor: '#1DD0A9',
  },
  {
    id: 5,
    title: 'Merge Master',
    description:
      'Combine multiple files into one by multiple ranges. Flexible merging for complex workflows.',
    icon: Merge,
    color: 'from-[#002060] to-[#4C99A0]',
    lightBg: 'bg-[#002060]/10 dark:bg-[#002060]/20',
  },
];

export default function ScrollWheelFeatures() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track scroll progress within this tall section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    // Map scroll progress (0 to 1) to segment index (0 to 5)
    // We add a tiny offset so the last item remains active at 1.0 progress
    const idx = Math.min(
      Math.floor(scrollYProgress.get() * (SEGMENTS.length + 0.01)),
      SEGMENTS.length - 1
    );
    if (idx !== activeIndex) {
      setActiveIndex(idx);
    }
  });

  const activeSegment = SEGMENTS[activeIndex];

  return (
    <section
      id="products-features"
      ref={containerRef}
      className="relative bg-gray-50 dark:bg-[#0B0F19] transition-colors duration-300"
      style={{ height: `${(SEGMENTS.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative h-full flex items-center">

          {/* TRUE HALF-CIRCLE GRAPHIC - anchored strictly to the left edge */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[600px] lg:w-[400px] lg:h-[800px] pointer-events-none overflow-hidden">

            {/* Outer Background Base (Half-Circle) - Made fully transparent */}
            <div className="absolute inset-y-0 left-0 right-0 bg-transparent rounded-r-full border-y border-r border-gray-200 dark:border-gray-800 shadow-[20px_0_100px_rgba(0,0,0,0.05)] dark:shadow-[20px_0_100px_rgba(0,0,0,0.2)] transition-colors duration-300" />

            {/* Inner rings (Half-Circles) */}
            <div className="absolute top-[60px] bottom-[60px] left-0 right-[60px] lg:top-[80px] lg:bottom-[80px] lg:right-[80px] border-y border-r border-gray-200 dark:border-gray-800 rounded-r-full transition-colors duration-300" />
            <div className="absolute top-[130px] bottom-[130px] left-0 right-[130px] lg:top-[180px] lg:bottom-[180px] lg:right-[180px] border-y border-r border-gray-100 dark:border-gray-800/50 rounded-r-full transition-colors duration-300" />

            {/* SVG ring for colors representing segments */}
            <div className="absolute top-[60px] bottom-[60px] left-0 right-[60px] lg:top-[80px] lg:bottom-[80px] lg:right-[80px]">
              <svg width="100%" height="100%" viewBox="0 0 50 100" className="overflow-visible">
                {/* Base Track */}
                <path d="M 0 2 A 48 48 0 0 1 0 98" fill="none" stroke="currentColor" strokeWidth="4" className="text-gray-200 dark:text-gray-800 transition-colors duration-300" />

                {SEGMENTS.map((seg, i) => {
                  const r = 48;
                  const cx = 0;
                  const cy = 50;

                  const sliceAngle = Math.PI / SEGMENTS.length;
                  const startAngle = -Math.PI / 2 + (i * sliceAngle);
                  const gap = 1.0;
                  const endAngle = startAngle + sliceAngle - (gap / r);

                  const startX = cx + r * Math.cos(startAngle);
                  const startY = cy + r * Math.sin(startAngle);
                  const endX = cx + r * Math.cos(endAngle);
                  const endY = cy + r * Math.sin(endAngle);

                  const isActive = i === activeIndex;
                  const strokeWidth = isActive ? "5" : "3";
                  const opacity = isActive ? 1 : 0.5;

                  return (
                    <path
                      key={seg.id}
                      d={`M ${startX} ${startY} A ${r} ${r} 0 0 1 ${endX} ${endY}`}
                      fill="none"
                      stroke={isActive ? seg.arcColor : "currentColor"}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                      className={`transition-all duration-500 ease-out ${isActive ? '' : 'text-gray-200 dark:text-gray-800'}`}
                      style={{ opacity }}
                    />
                  );
                })}
              </svg>

              {/* Static Pointer Arrow pointing out from the outermost edge of the half circle */}
              <div className="absolute top-1/2 right-[0px] -translate-y-1/2 translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                <div className="w-[45px] h-[28px] bg-[#2A6B8A] relative flex items-center justify-center shadow-[left_inset_0_0_10px_rgba(0,0,0,0.5)]">
                  <div className="absolute left-[100%] border-y-[14px] border-y-transparent border-l-[18px] border-l-[#2A6B8A]" />
                  <div className="absolute right-[100%] border-y-[14px] border-y-transparent border-l-[12px] border-l-gray-50 dark:border-l-gray-900 transition-colors duration-300" />
                </div>
              </div>
            </div>

            {/* Center Logo/Icon - Half-Circle flush to the left wall */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-16 h-32 md:w-20 md:h-40 bg-gray-100 dark:bg-gray-900 rounded-r-full shadow-[inset_10px_0_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_10px_0_20px_rgba(0,0,0,0.5)] flex items-center justify-start pl-1 md:pl-2 z-10 border-y border-r border-gray-200 dark:border-gray-800 transition-colors duration-300">
              <span className="text-xl md:text-2xl  text-gray-700 dark:text-gray-300 transition-colors duration-300">
                A<span className="text-[#a162f7]">365</span>
              </span>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full pl-[50%] md:pl-[45%] lg:pl-[45%] flex flex-col justify-center h-full relative z-10">

            {/* Singular Active Feature Card */}
            <div className="relative h-[220px] md:h-[260px] w-full max-w-xl">
              {SEGMENTS.map((seg, idx) => (
                <motion.div
                  key={seg.id}
                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                  animate={{
                    opacity: activeIndex === idx ? 1 : 0,
                    scale: activeIndex === idx ? 1 : 0.98,
                    y: activeIndex === idx ? 0 : 10,
                    pointerEvents: activeIndex === idx ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  // Premium dark glassmorphic styling
                  className="absolute inset-0 flex flex-col p-8 md:p-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-[32px] rounded-br-none border border-gray-200/50 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-colors duration-300"
                >
                  {/* Faint color glow reflecting the active item's color */}
                  <div
                    className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[80px] pointer-events-none opacity-20"
                    style={{ backgroundColor: seg.arcColor }}
                  />

                  <div className="flex items-center gap-6 mb-6 relative z-10">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[16px] bg-gradient-to-br ${seg.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <seg.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl  text-gray-900 dark:text-white tracking-wide transition-colors duration-300">
                      {seg.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-[95%] relative z-10 font-medium transition-colors duration-300">
                    {seg.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
