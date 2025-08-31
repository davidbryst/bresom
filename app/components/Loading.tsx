
export default function Loading() {
  return (
  <div className="fixed inset-0 z-[9999] pointer-events-none">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm dark:bg-black/40 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-gray-300 dark:border-white/20" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gray-900 dark:border-t-white animate-spin" />
            </div>
        </div>
    </div>
  );
}