import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, User, Award, Globe, Handshake, Volume2, Square } from 'lucide-react';
import botLogo from '../../assets/Ambot logo png.png';
import worldMap from '../../assets/World Map.png';
import heroAudio from '../../assets/Voices/Hero Section.mp3';

const TYPING_TEXTS = [
  'Deployed in Days',
  'run Securely in your network',
  'Monitor 24/7',
];
const TYPING_SPEED_MS = 85;
const DELETING_SPEED_MS = 40;
const CURSOR_BLINK_MS = 530;
const PAUSE_AFTER_TYPING_MS = 2500;
const PAUSE_BEFORE_RETYPE_MS = 400;

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(reduceMotion ? TYPING_TEXTS[0] : '');
  const [cursorOn, setCursorOn] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    const handleEnded = () => setIsPlayingAudio(false);
    if (audio) {
      audio.addEventListener('ended', handleEnded);
    }
    return () => {
      if (audio) {
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, []);
  
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play();
        setIsPlayingAudio(true);
      }
    }
  };

  useEffect(() => {
    if (reduceMotion) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;
    let currentTextIndex = 0;

    const runTypingCycle = () => {
      const currentText = TYPING_TEXTS[currentTextIndex];
      setTyped('');

      timeoutId = setTimeout(() => {
        let i = 0;
        intervalId = setInterval(() => {
          i += 1;
          setTyped(currentText.slice(0, i));
          if (i >= currentText.length) {
            clearInterval(intervalId);
            timeoutId = setTimeout(() => {
              let j = currentText.length;
              intervalId = setInterval(() => {
                j -= 1;
                setTyped(currentText.slice(0, j));
                if (j === 0) {
                  clearInterval(intervalId);
                  currentTextIndex = (currentTextIndex + 1) % TYPING_TEXTS.length;
                  runTypingCycle();
                }
              }, DELETING_SPEED_MS);
            }, PAUSE_AFTER_TYPING_MS);
          }
        }, TYPING_SPEED_MS);
      }, PAUSE_BEFORE_RETYPE_MS);
    };

    runTypingCycle();
    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setCursorOn((c) => !c), CURSOR_BLINK_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-24 md:pt-20 bg-gradient-to-r from-[#EDEEF3] to-[#FFFFFF] dark:from-gray-900 dark:to-gray-950">
      {/* Soft gradient orbs - subtle enterprise motion (respects reduced motion) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#4C99A0]/20 dark:bg-[#4C99A0]/10 blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full bg-[#65A859]/15 dark:bg-[#65A859]/10 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-[300px] h-[300px] rounded-full bg-[#4C99A0]/10 dark:bg-[#4C99A0]/5 blur-3xl" />
        {/* World Map background */}
        <div
          className="absolute inset-0 opacity-90 dark:opacity-80 pointer-events-none"
          style={{
            backgroundImage: `url(${worldMap})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">

        {/* Floating Bot on the left */}
        <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-[60%] flex-col items-center justify-center pointer-events-none">
          {/* Heartbeat rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-[#65A859]/50 dark:border-[#65A859]/50"
              style={{
                width: '100px',
                height: '100px',
              }}
              animate={reduceMotion ? undefined : {
                scale: [0.8, 3.5],
                opacity: [0.7, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: ring * 1.5,
              }}
            />
          ))}
          {/* Heartbeat Bot Icon */}
          <motion.div
            className="relative z-10 w-24 h-24 flex items-center justify-center"
            animate={reduceMotion ? undefined : {
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img
              src={botLogo}
              alt="AmBot"
              className="w-16 h-16 object-contain drop-shadow-lg"
            />
          </motion.div>
        </div>

        {/* <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wider font-semibold mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" aria-hidden />
          AGENTS AS A SERVICE
        </motion.span> */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-3xl md:text-5xl lg:text-5xl xl:text-6xl font-semibold tracking-tight mb-6 leading-tight" style={{ fontFamily: "var(--font-hero)" }}
        >
          <span className="text-[#002060] dark:text-white block pb-2">Build Once. Run Forever.</span>
          <span className="text-[#002060] dark:text-white block text-2xl sm:text-3xl md:text-5xl lg:text-[52px] xl:text-5xl leading-tight font-medium" style={{ fontFamily: "'Dubai', sans-serif" }}>AI | Automation | Agents | Digital</span>
          <span className="inline-block text-base sm:text-lg md:text-2xl lg:text-3xl mt-1 min-h-[1.2em]">
            <span className="text-[#002060] dark:text-white mr-2 font-semibold">Our Solution</span>
            <span className="bg-gradient-to-r from-[#4C99A0] to-[#65A859] bg-clip-text text-transparent">{typed}</span>
            {!reduceMotion && (
              <span
                className="inline-block w-0.5 h-[0.9em] align-middle bg-[#4C99A0] ml-0.5 transition-opacity duration-75"
                style={{
                  opacity: cursorOn ? 1 : 0,
                }}
                aria-hidden
              />
            )}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10"
        >
          We <strong>B</strong>uild It .
          You <strong>O</strong>perate It .
          <strong> T</strong>ransformation begins.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#/build-agent"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white rounded-2xl font-medium flex items-center justify-center gap-2 group shadow-lg shadow-[#4C99A0]/25"
            whileHover={{ scale: 1.02, y: -2, boxShadow: '0 20px 40px -12px rgba(76, 153, 160, 0.35)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Build Agent
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
          <button
            onClick={toggleAudio}
            className={`w-full sm:w-auto px-6 py-4 rounded-2xl font-medium text-[15px] flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-md ${
              isPlayingAudio 
                ? 'bg-gradient-to-r from-[#4C99A0] to-[#65A859] text-white animate-pulse' 
                : 'bg-[#EAECEE] dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-[#E2E4E7] dark:hover:bg-gray-700'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Square className="w-5 h-5 fill-current" />
                Stop Audio
              </>
            ) : (
              <>
                <Volume2 className="w-5 h-5" />
                Listen to Intro
              </>
            )}
          </button>
          <audio ref={audioRef} src={heroAudio} />
        </motion.div>

        {/* Trust / value pills - adds visual interest */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto"
        >
          {[
            { icon: User, label: 'Ambrose Denny', sub: 'Founder of Ambot365' },
            { icon: Award, label: '40+ Years', sub: 'Combined Digital Expertise' },
            { icon: Globe, label: '50+ Clients', sub: 'Global Experience' },
            { icon: Handshake, label: 'Digital Partners', sub: <><a  target="_blank" rel="noopener noreferrer" className="text-[#4C99A0]">A365Shift</a> & <a href="https://www.cshift.io/" target="_blank" rel="noopener noreferrer" className="text-[#4C99A0] hover:text-[#65A859] underline underline-offset-2 transition-colors">CShift</a></> },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="w-full flex items-center gap-4 px-5 py-5 rounded-xl bg-white dark:bg-gray-800 border-2 border-transparent dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-default h-full"
            >
              <div className="w-12 h-12 rounded-lg bg-[#E5F1ED] dark:bg-[#4C99A0]/20 flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-[#589E92] dark:text-[#65A859]" strokeWidth={1.5} />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-[15px] font-bold text-[#1a2f4c] dark:text-gray-100 leading-tight">{item.label}</p>
                <p className="text-[13px] font-medium text-gray-500 dark:text-gray-400 mt-0.5">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
}

