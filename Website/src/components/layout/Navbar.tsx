import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { ThemeToggle } from '../ui/ThemeToggle';
import AIChatFullScreen from '../chat/AIChatFullScreen';
import logoPath from '../../assets/AmBot 365-Logo.png';

const NAV_LINKS = [
    { name: 'Services', href: '#solutions-overview' },
    { name: 'AI Solutions', href: '#agents-in-action' },
    { name: 'Process', href: '#how-it-works' },
    { name: 'FAQ', href: '#', openInAI: true, aiMenu: 'FAQ' },
    { name: 'Why Us', href: '#about' },
];

type NavbarProps = {
    currentRoute?: string;
};

export default function Navbar({ currentRoute = '/' }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);
    const [aiInitialMenu, setAiInitialMenu] = useState<string | null>(null);
    const isBuildAgentPage = currentRoute === '/build-agent';
    const useCompactHeader = isBuildAgentPage || isScrolled;

    const navLinks = isBuildAgentPage
        ? [{ name: 'Home', href: '#/' }]
        : NAV_LINKS;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${useCompactHeader
                ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm py-3 md:py-4'
                : 'bg-transparent py-4 md:py-6'
                }`}
        >
            <div className="site-container flex items-center justify-between">
                {/* Logo */}
                <a href="#/" className="flex items-center gap-2 text-xl  tracking-tight text-gray-900 dark:text-gray-50">
                    <img src={logoPath} alt="AmBot 365 Logo" className="h-8 w-auto" />
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {!isBuildAgentPage && (
                        <a
                            href="#/build-agent"
                            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors relative group"
                        >
                            Build Agent
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full rounded-full" />
                        </a>
                    )}
                    {navLinks.map((link) => (
                        link.openInAI ? (
                            <button
                                key={link.name}
                                type="button"
                                onClick={() => {
                                    setAiInitialMenu(link.aiMenu ?? null);
                                    setIsAIChatOpen(true);
                                }}
                                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full rounded-full" />
                            </button>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full rounded-full" />
                            </a>
                        )
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <ThemeToggle />
                    {!isBuildAgentPage && (
                        <>
                            <button
                                type="button"
                                onClick={() => {
                                    setAiInitialMenu(null);
                                    setIsAIChatOpen(true);
                                }}
                                className="btn-brand"
                            >
                                Ask AI
                            </button>
                            <a
                                href="mailto:Info@ambot365.com"
                                className="btn-brand"
                            >
                                Get in Touch
                            </a>
                            <a
                                href="mailto:Info@ambot365.com"
                                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                            >
                                Info@ambot365.com
                            </a>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    {!isBuildAgentPage && (
                        <button
                            type="button"
                            onClick={() => {
                                setAiInitialMenu(null);
                                setIsAIChatOpen(true);
                            }}
                            className="inline-flex btn-brand text-xs px-3 py-1.5 whitespace-nowrap"
                        >
                            Ask AI
                        </button>
                    )}
                    <button
                        className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden md:hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {!isBuildAgentPage && (
                                <a
                                    href="#/build-agent"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-base font-medium text-gray-900 dark:text-gray-100 py-3 border-b border-gray-100 dark:border-gray-800 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                                >
                                    Build Agent
                                </a>
                            )}
                            {navLinks.map((link) => (
                                link.openInAI ? (
                                    <button
                                        key={link.name}
                                        type="button"
                                        onClick={() => {
                                            setAiInitialMenu(link.aiMenu ?? null);
                                            setIsAIChatOpen(true);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="text-left text-base font-medium text-gray-900 dark:text-gray-100 py-3 border-b border-gray-100 dark:border-gray-800 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                                    >
                                        {link.name}
                                    </button>
                                ) : (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-base font-medium text-gray-900 dark:text-gray-100 py-3 border-b border-gray-100 dark:border-gray-800 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                )
                            ))}
                            <div className="flex flex-col gap-3 mt-4 pb-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setAiInitialMenu(null);
                                        setIsAIChatOpen(true);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="btn-brand w-full py-3 text-base"
                                >
                                    Ask AI
                                </button>
                                <a
                                    href="mailto:Info@ambot365.com"
                                    className="btn-brand w-full py-3 text-base"
                                >
                                    Get in Touch
                                </a>
                                <a
                                    href="https://api.whatsapp.com/send/?phone=919113602689&text=0&type=phone_number&app_absent=0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Chat on WhatsApp"
                                    className="w-full py-3 flex items-center justify-center gap-2 text-base font-medium text-white bg-[#25D366] hover:bg-[#1ebe57] rounded-xl transition-all shadow-md shadow-[#25D366]/25"
                                >
                                    <FontAwesomeIcon icon={faWhatsapp} style={{ color: "rgb(40, 209, 70)" }} />
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Full-screen AI Chat (Gemini/ChatGPT style) */}
            <AnimatePresence>
                {isAIChatOpen && <AIChatFullScreen onClose={() => setIsAIChatOpen(false)} initialMenu={aiInitialMenu} />}
            </AnimatePresence>
        </header>
    );
}
