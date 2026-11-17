import { useState, useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { MdWifiOff } from 'react-icons/md';

export function OfflineNotice() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <Motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
          role="status"
          aria-live="polite"
          className="sticky top-0 z-50 bg-maroon-700/95 backdrop-blur-md text-white px-4 py-2.5 border-b border-gold-400/30 shadow-sm"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 text-sm">
            <MdWifiOff size={18} className="text-gold-300 shrink-0" />
            <span className="font-medium">
              You&apos;re offline — showing the most recently loaded status.
            </span>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
