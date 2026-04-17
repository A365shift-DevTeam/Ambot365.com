import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import ambotLogo from '../../assets/AmBot 365-Logo.png';
import founderImg from '../../assets/Founder img.png';

export default function WhyAmbot365() {
  const stats = [
    { value: '18+', label: 'Years Experience' },
    { value: '1,200+', label: 'Automations Delivered' },
    { value: 'Up to 95%', label: 'Automation Achieved' },
    { value: '8+', label: 'Active Global Clients' },
  ];

  return (
    <SectionWrapper id="about" className="px-6 py-12 md:px-12 lg:px-20 bg-[#f2faf6] dark:bg-gray-950/50">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <h2 className="text-2xl md:text-4xl mb-4 section-title tracking-tight">
            Why Ambot365
          </h2>
        </div>

        {/* Main Content: Founder Left + Content Right — Clean Design */}
        <div className="section-card rounded-[32px] p-8 md:p-12 lg:p-16 overflow-hidden relative bg-white dark:bg-gray-900 border-none shadow-sm">
          {/* Subtle background gradient accent */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-primary-50 to-transparent dark:from-primary-900/20 dark:to-transparent rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
          {/* Bottom-left glow */}
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-to-tr from-accent-400/5 to-transparent dark:from-accent-500/10 dark:to-transparent rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start relative z-10">
            {/* LEFT: Founder Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              {/* Circular Founder Image */}
              <div className="relative mb-6">
                {/* Decorative ring */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-primary-400 via-primary-500 to-accent-500 opacity-20 blur-sm" />
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                  <img
                    src={founderImg}
                    alt="Ambrose Denny - Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Founder Name */}
              <h3 className="text-xl md:text-2xl font-semibold text-primary-600 dark:text-primary-400 mb-1">
                Ambrose Denny
              </h3>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wide uppercase">
                Founder
              </p>

              {/* Logo */}
              <div className="mt-5 mb-6">
                <img src={ambotLogo} alt="AmBot 365 Logo" className="h-12 md:h-14 object-contain" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 w-full mt-2">
                {stats.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-white/50 dark:border-gray-700/50 px-5 py-4 min-h-[96px] shadow-sm blur-none flex flex-col justify-center"
                  >
                    <div className="text-lg md:text-xl font-bold text-primary-600 dark:text-primary-400 leading-tight">
                      {item.value}
                    </div>
                    <div className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5 leading-tight">
                      {item.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT: About, Vision, Mission */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-8"
            >
              {/* About Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold section-subtitle">
                    About Ambot365
                  </h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  Ambot365 is a data-driven technology company delivering AI solutions and digital solutions using Microsoft 365. We build production-ready products and digital solutions that drive real business impact and transform processes into scalable, efficient systems.
                </p>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  With <span className="font-semibold text-primary-600 dark:text-primary-400">47+ client engagements</span> and <span className="font-semibold text-primary-600 dark:text-primary-400">8+ active global clients</span>, we deliver solutions that improve productivity, visibility, and operational efficiency.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent opacity-50" />

              {/* Vision Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold section-subtitle">
                    Vision
                  </h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  To be a top-tier global technology company, leading innovation in AI and automation by <span className="font-semibold text-primary-600 dark:text-primary-400">2027</span>.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent opacity-50" />

              {/* Mission Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                    <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold section-subtitle">
                    Mission
                  </h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  To build impactful digital solutions, drive continuous innovation, and create value for businesses and people.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
