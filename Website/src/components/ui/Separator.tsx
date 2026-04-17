export default function Separator({ className = 'py-0' }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      <div className="relative w-full max-w-6xl px-2">
        {/* top highlight */}
        <div className="absolute -top-px left-2 right-2 h-px bg-white/80 dark:bg-white/15" />
        {/* main separator */}
        <div className="relative h-px bg-gray-300 dark:bg-gray-700" />
        {/* soft shadow for 3D depth */}
        <div className="absolute top-px left-2 right-2 h-[2px] bg-gray-500/25 dark:bg-black/45 blur-[1px]" />
      </div>
    </div>
  );
}
