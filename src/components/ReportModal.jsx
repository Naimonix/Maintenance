import { useState, useEffect } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';
import { MdClose, MdOpenInNew } from 'react-icons/md';
import {
  REPORT_ISSUE_FORM_URL,
  REPORT_STATUS_FORM_URL,
  STATUS_FORM_ENTRY_IDS,
} from '../utils/constants';

export function ReportModal({ isOpen, onClose, prefilledEquipment = null, type = 'issue' }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'unset';
      setIframeLoaded(false);
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const formUrl = type === 'status' ? REPORT_STATUS_FORM_URL : REPORT_ISSUE_FORM_URL;
  const title = type === 'status' ? 'Update Equipment Status' : 'Report Maintenance Issue';
  const description =
    type === 'status'
      ? 'Report whether this machine is out of order or working again.'
      : 'Submit a maintenance issue for your cluster, block, and floor.';

  let embedUrl = null;
  if (formUrl && !formUrl.includes('YOUR_')) {
    try {
      const url = new URL(formUrl);
      if (type === 'status' && prefilledEquipment) {
        url.searchParams.set('usp', 'pp_url');
        if (prefilledEquipment.cluster) {
          url.searchParams.set(STATUS_FORM_ENTRY_IDS.CLUSTER, prefilledEquipment.cluster);
        }
        if (prefilledEquipment.id) {
          url.searchParams.set(STATUS_FORM_ENTRY_IDS.EQUIPMENT_ID, prefilledEquipment.id);
        }
      }
      embedUrl = url.toString();
    } catch {
      embedUrl = null;
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          key="report-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-black/45 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
        >
          <Motion.div
            key="report-modal-sheet"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 36, scale: 0.98 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0.06, bottom: 0.45 }}
            onDragEnd={(_, info) => {
              // Momentum projection to dismiss on downward flick
              const projectedY = info.offset.y + info.velocity.y * 0.2;
              if (projectedY > 140) {
                onClose();
              }
            }}
            onClick={(e) => e.stopPropagation()}
            className="glass-surface w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl border border-black/[0.08] dark:border-white/[0.12] shadow-2xl max-h-[92vh] flex flex-col overflow-hidden"
          >
            {/* Subtle FWH top hairline + drag indicator */}
            <div className="h-[2.5px] w-full fwh-accent-bar shrink-0" aria-hidden="true" />
            <div className="flex justify-center pt-2.5 pb-1 sm:hidden cursor-grab active:cursor-grabbing">
              <span className="w-10 h-1 rounded-full bg-black/15 dark:bg-white/20" />
            </div>

            {/* Header */}
            <div className="flex items-start justify-between gap-3 px-5 py-3.5 border-b border-black/[0.06] dark:border-white/[0.08]">
              <div className="min-w-0">
                <h2
                  id="report-modal-title"
                  className="text-lg sm:text-xl font-semibold tracking-[-0.02em] text-[#1D1D1F] dark:text-[#F5F5F7]"
                >
                  {title}
                </h2>
                <p className="text-xs sm:text-sm text-[#6E6E73] dark:text-[#98989D] mt-0.5">
                  {description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {embedUrl && (
                  <a
                    href={embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open form in a new tab"
                    aria-label="Open form in a new tab"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium text-maroon-700 dark:text-gold-300 bg-maroon-700/[0.08] hover:bg-maroon-700/[0.14] dark:bg-gold-400/10 dark:hover:bg-gold-400/20 tactile-press"
                  >
                    <span className="hidden sm:inline">New tab</span>
                    <MdOpenInNew size={15} />
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-black/[0.05] hover:bg-black/[0.1] dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-[#6E6E73] dark:text-[#AEAEB2] tactile-press"
                >
                  <MdClose size={18} />
                </button>
              </div>
            </div>

            {/* Prefilled Equipment Context Banner */}
            {type === 'status' && prefilledEquipment && (
              <div className="px-5 py-2.5 bg-maroon-700/[0.06] dark:bg-gold-400/[0.08] border-b border-maroon-700/10 dark:border-gold-400/15 flex items-center justify-between gap-2 text-xs">
                <span className="text-[#424245] dark:text-[#E5E5EA]">
                  Prefilled for{' '}
                  <strong className="font-semibold text-maroon-700 dark:text-gold-300">
                    {prefilledEquipment.id}
                  </strong>{' '}
                  · {prefilledEquipment.cluster} Cluster
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/80 dark:bg-white/10 text-[#6E6E73] dark:text-[#AEAEB2] font-medium">
                  {prefilledEquipment.type}
                </span>
              </div>
            )}

            {/* Form Body */}
            <div className="relative flex-1 overflow-auto bg-[#F5F5F7]/60 dark:bg-[#111115]">
              {!embedUrl ? (
                <div className="text-center py-12 px-6">
                  <p className="text-sm text-[#424245] dark:text-[#AEAEB2] mb-2">
                    Google Form URLs are not configured yet.
                  </p>
                  <p className="text-xs text-[#6E6E73] dark:text-[#8E8E93]">
                    Update <code className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10">src/utils/constants.js</code> with your form URLs.
                  </p>
                </div>
              ) : (
                <>
                  {!iframeLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 pointer-events-none">
                      <div className="w-7 h-7 rounded-full border-2 border-maroon-700/25 border-t-maroon-700 dark:border-gold-400/25 dark:border-t-gold-400 animate-spin" />
                      <p className="text-xs text-[#6E6E73] dark:text-[#98989D]">
                        Loading Google Form...
                      </p>
                    </div>
                  )}
                  <iframe
                    src={embedUrl}
                    onLoad={() => setIframeLoaded(true)}
                    className={`w-full h-[65vh] sm:h-[560px] border-0 transition-opacity duration-200 ${
                      iframeLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    title={title}
                  >
                    Loading form...
                  </iframe>
                </>
              )}
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}
