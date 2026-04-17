export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="text-2xl tracking-tighter mb-4 text-gray-900 dark:text-gray-50">Ambot365</div>
            <p className="text-gray-600 dark:text-gray-400 text-sm pr-4">
              Intelligent AI Agents - Microsoft AI Ecosystem - Office Suite - Scalable Industry Products.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#agents-in-action" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Agents in Action</a></li>
              <li><a href="#solutions-overview" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Solutions</a></li>
              <li><a href="#how-it-works" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">How It Works</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Industries</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#agents-in-action" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Manufacturing</a></li>
              <li><a href="#agents-in-action" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Automotive</a></li>
              <li><a href="#agents-in-action" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Finance</a></li>
              <li><a href="#agents-in-action" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">VC & PE</a></li>
              <li><a href="#agents-in-action" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">B2B SaaS</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Company</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#about" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">About</a></li>
              <li><a href="#contact" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors">FAQ (Ask AI)</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <p>(c) 2026 Ambot365. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
