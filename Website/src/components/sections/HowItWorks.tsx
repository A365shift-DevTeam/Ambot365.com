import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import ambotLogo from '../../assets/Ambot logo png.png';

const PHASE_COLORS = [
  {
    badge: 'bg-blue-500',
    title: 'text-blue-700',
    dot: 'bg-blue-500',
    outcomeBg: 'bg-blue-50',
    outcomeText: 'text-blue-700',
    outcomeBorder: 'border-blue-200',
    iconColor: 'text-blue-500',
  },
  {
    badge: 'bg-teal-500',
    title: 'text-teal-700',
    dot: 'bg-teal-500',
    outcomeBg: 'bg-teal-50',
    outcomeText: 'text-teal-700',
    outcomeBorder: 'border-teal-200',
    iconColor: 'text-teal-500',
  },
  {
    badge: 'bg-amber-500',
    title: 'text-amber-700',
    dot: 'bg-amber-500',
    outcomeBg: 'bg-amber-50',
    outcomeText: 'text-amber-700',
    outcomeBorder: 'border-amber-200',
    iconColor: 'text-amber-500',
  },
  {
    badge: 'bg-purple-500',
    title: 'text-purple-700',
    dot: 'bg-purple-500',
    outcomeBg: 'bg-purple-50',
    outcomeText: 'text-purple-700',
    outcomeBorder: 'border-purple-200',
    iconColor: 'text-purple-500',
  },
  {
    badge: 'bg-green-500',
    title: 'text-green-700',
    dot: 'bg-green-500',
    outcomeBg: 'bg-green-50',
    outcomeText: 'text-green-700',
    outcomeBorder: 'border-green-200',
    iconColor: 'text-green-500',
  },
];

const PHASES = [
  {
    threshold: 0.1,
    week: "WEEK 0",
    title: "Ready to start",
    desc1: "Let's embark on the automation journey.",
    desc2: "We will analyze your current processes.",
    outcome: "A clear roadmap for automation.",
    colorIndex: 0,
  },
  {
    threshold: 0.35,
    week: "WEEK 1",
    title: "Discovery",
    desc1: "We dive deep into your existing workflows and identify bottlenecks.",
    desc2: "Our team maps out the exact processes that need automation.",
    outcome: "Comprehensive process documentation.",
    colorIndex: 1,
  },
  {
    threshold: 0.6,
    week: "WEEK 2",
    title: "BRD",
    desc1: "Business Requirements Document creation.",
    desc2: "We finalize the scope, tools, and expected ROI.",
    outcome: "Approved blueprint for the bot.",
    colorIndex: 2,
  },
  {
    threshold: 0.85,
    week: "WEEK 3-5",
    title: "Build & Train",
    desc1: "We develop the platform, configure AI models, integrate systems, and run iterative testing.",
    desc2: "Automation workflows, backend logic, and UI components are implemented.",
    outcome: "Production-ready AI system.",
    colorIndex: 3,
  },
  {
    threshold: 1.1,
    week: "WEEK 6-8",
    title: "Go Live",
    desc1: "Deployment to production environment.",
    desc2: "We monitor the bot's performance and make necessary adjustments.",
    outcome: "Fully automated workflow.",
    colorIndex: 4,
  }
];

// Chart configuration
const CHART = {
  // Chart area bounds (inside axes)
  left: 80,
  right: 520,
  top: 40,
  bottom: 340,
  // Y-axis values
  yLabels: ['stage 1 ', 'stage 2', 'stage 3', 'stage 4', 'stage 5'],
  // X-axis week labels
  xLabels: ['Week 1', 'Week 2', 'Week 3-5', 'Week 6-8'],
};

// Exponential curve path (bottom-left to top-right)
const CURVE_PATH = `M ${CHART.left} ${CHART.bottom} C ${CHART.left + 60} ${CHART.bottom}, ${CHART.left + 100} ${CHART.bottom - 20}, ${CHART.left + 150} ${CHART.bottom - 40} C ${CHART.left + 200} ${CHART.bottom - 60}, ${CHART.left + 240} ${CHART.bottom - 80}, ${CHART.left + 280} ${CHART.bottom - 130} C ${CHART.left + 320} ${CHART.bottom - 180}, ${CHART.left + 360} ${CHART.bottom - 230}, ${CHART.right} ${CHART.top + 20}`;

// Area fill path (curve + close along bottom)
const AREA_PATH = `${CURVE_PATH} L ${CHART.right} ${CHART.bottom} L ${CHART.left} ${CHART.bottom} Z`;

// Exact intersection points where the curve crosses each stage horizontal line
// Solved from the cubic bezier equations at each yPosition
const STAGE_HIT_POINTS = [
  { x: 135, y: 334 },  // Week 1 (start of curve)
  { x: 276, y: 280 },  // Stage 1
  { x: 352, y: 220 },  // Stage 2
  { x: 461, y: 100 },  // Stage 4
  { x: 520, y: 60 },   // Stage 5 (curve endpoint)
];

const yPositions = [280, 220, 160, 100, 60];
const xPositions = [135, 264, 393, 520];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [percentage, setPercentage] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(PHASES[0]);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
      const phase = PHASES.find(p => latest < p.threshold) || PHASES[PHASES.length - 1];
      setCurrentPhase(phase);
    });
  }, [scrollYProgress]);

  const colors = PHASE_COLORS[currentPhase.colorIndex];

  return (
    <section ref={containerRef} id="how-it-works" className="bg-white dark:bg-gray-950 h-[300vh] relative">
      <div className="sticky top-0 h-screen flex flex-col items-center overflow-hidden py-4">

        <div className="text-center mb-2 shrink-0">
          <h2 className="text-2xl md:text-4xl mb-2 section-title">How Ambot365 Works</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-base">
            Scroll down to see how our AI bot transforms your manual process into a fully automated workflow.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1 min-h-0">

          {/* Left Side: Text & Gauge */}
          <div className="lg:col-span-4 flex flex-col-reverse justify-end gap-6 h-full">
            {/* Text Description - sits below the gauge now */}
            <div>
              {/* Week Badge */}
              <span className={`inline-block px-4 py-1 rounded-full text-white text-xs  tracking-wider uppercase mb-2 ${colors.badge}`}>
                {currentPhase.week}
              </span>

              {/* Title */}
              <h3 className={`text-2xl  mb-3 ${colors.title}`}>{currentPhase.title}</h3>

              {/* Descriptions with colored bullet dots */}
              <div className="flex items-start gap-2 mb-2">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${colors.dot}`}></span>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{currentPhase.desc1}</p>
              </div>
              <div className="flex items-start gap-2 mb-3">
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${colors.dot}`}></span>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{currentPhase.desc2}</p>
              </div>

              {/* Outcome Box */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${colors.outcomeBg} ${colors.outcomeBorder}`}>
                <svg className={`w-4 h-4 shrink-0 ${colors.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className={`text-sm font-semibold ${colors.outcomeText}`}>{currentPhase.outcome}</p>
              </div>
            </div>

            {/* Gauge Card - now sits above text */}
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl p-4 pb-2 z-10 w-full mb-4">
              <div className="flex gap-4 mb-2  text-sm">
                <span className="text-blue-500 dark:text-blue-400">AI Process</span>
                <span className="text-primary-500">Your Process</span>
              </div>
              <div>
                <svg viewBox="0 0 300 230" className="w-full h-auto">
                  <defs>
                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00B050" />
                      <stop offset="100%" stopColor="#308BAF" />
                    </linearGradient>
                  </defs>

                  {/* Background Arc */}
                  <path d="M 30 140 A 120 120 0 0 1 270 140" fill="none" stroke="#e5e7eb" strokeWidth="24" strokeLinecap="round" />

                  {/* Foreground Arc */}
                  <motion.path
                    d="M 30 140 A 120 120 0 0 1 270 140"
                    fill="none"
                    stroke="url(#gauge-gradient)"
                    strokeWidth="24"
                    strokeLinecap="round"
                    strokeDasharray={377}
                    style={{ strokeDashoffset: useTransform(scrollYProgress, [0, 1], [377, 0]) }}
                  />

                  {/* Needle */}
                  <motion.g
                    style={{
                      rotate: useTransform(scrollYProgress, [0, 1], [-90, 90]),
                      originX: 0.5,
                      originY: 0.5
                    }}
                  >
                    {/* Transparent bounding box to force the rotation center to exactly 150,140 */}
                    <circle cx="150" cy="140" r="90" fill="transparent" />
                    <line x1="150" y1="140" x2="150" y2="50" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="150" cy="140" r="12" fill="#2563eb" />
                  </motion.g>

                  {/* Labels */}
                  <text x="30" y="180" textAnchor="middle" className="text-lg font-medium fill-gray-400 dark:fill-gray-500">0%</text>
                  <text x="270" y="180" textAnchor="middle" className="text-lg font-medium fill-gray-400 dark:fill-gray-500">100%</text>

                  {/* Percentage Value - inside SVG so it always fits */}
                  <text x="150" y="220" textAnchor="middle" className="fill-blue-600 dark:fill-blue-400" style={{ fontSize: '32px', fontWeight: 700 }}>
                    {percentage}%
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Side: Exponential Growth Chart */}
          <div className="lg:col-span-8 flex items-center justify-center h-full">
            <div className="w-full bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl p-6 max-h-[80vh]">
              <svg viewBox="20 0 560 400" className="w-full h-auto overflow-visible">
                <defs>
                  {/* Green gradient for area fill under the curve */}
                  <linearGradient id="area-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
                    <stop offset="60%" stopColor="#22C55E" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
                  </linearGradient>
                  {/* Glow filter for the endpoint dot */}
                  <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  {/* Shadow filter for tooltip */}
                  <filter id="tooltip-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#22C55E" floodOpacity="0.15" />
                  </filter>
                </defs>

                {/* Vertical grid lines */}
                {xPositions.map((x, i) => (
                  <line
                    key={`vgrid-${i}`}
                    x1={x}
                    y1={CHART.top}
                    x2={x}
                    y2={CHART.bottom}
                    stroke="#f3f4f6"
                    className="dark:stroke-gray-800"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                ))}

                {/* Horizontal grid lines */}
                {yPositions.map((y, i) => (
                  <line
                    key={`hgrid-${i}`}
                    x1={CHART.left}
                    y1={y}
                    x2={CHART.right}
                    y2={y}
                    stroke="#f3f4f6"
                    className="dark:stroke-gray-800"
                    strokeWidth="1"
                  />
                ))}
                {/* Bottom axis line */}
                <line x1={CHART.left} y1={CHART.bottom} x2={CHART.right} y2={CHART.bottom} stroke="#e5e7eb" className="dark:stroke-gray-700" strokeWidth="1.5" />

                {/* Y-axis labels */}
                {CHART.yLabels.map((label, i) => (
                  <text
                    key={`ylabel-${i}`}
                    x={CHART.left - 16}
                    y={yPositions[i] + 5}
                    textAnchor="end"
                    className="fill-gray-400 dark:fill-gray-500"
                    style={{ fontSize: '13px', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 500 }}
                  >
                    {label}
                  </text>
                ))}

                {/* X-axis labels */}
                {CHART.xLabels.map((label, i) => {
                  // Map phase colorIndex to x-axis label index: colorIndex 1→0, 2→1, 3→2, 4→3
                  const activeIndex = currentPhase.colorIndex - 1;
                  const isActive = i === activeIndex;
                  const isPast = i < activeIndex;
                  return (
                    <text
                      key={`xlabel-${i}`}
                      x={xPositions[i]}
                      y={CHART.bottom + 30}
                      textAnchor="middle"
                      className={
                        isActive ? 'fill-green-500' :
                          isPast ? 'fill-green-300 dark:fill-green-700' :
                            'fill-gray-400 dark:fill-gray-500'
                      }
                      style={{
                        fontSize: '13px',
                        fontFamily: 'Inter, system-ui, sans-serif',
                        fontWeight: isActive ? 700 : 500,
                        transition: 'fill 0.3s ease',
                      }}
                    >
                      {label}
                    </text>
                  );
                })}

                {/* Area fill under curve (animated opacity) */}
                <motion.path
                  d={AREA_PATH}
                  fill="url(#area-gradient)"
                  style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]) }}
                />

                {/* Base curve (light ghost) */}
                <path
                  d={CURVE_PATH}
                  fill="none"
                  stroke="#dcfce7"
                  className="dark:stroke-green-900/30"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Animated curve (draws on scroll) */}
                <motion.path
                  d={CURVE_PATH}
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{ pathLength: scrollYProgress }}
                />



                {/* Bot Icon */}
                <motion.g
                  style={{
                    offsetPath: `path('${CURVE_PATH}')`,
                    offsetDistance: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                    offsetRotate: "0deg"
                  }}
                >
                  <image href={ambotLogo} x="-16" y="-16" width="32" height="32" />
                </motion.g>

              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
