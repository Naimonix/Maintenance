import { MdAdd, MdArrowUpward, MdBuild } from 'react-icons/md';
import { formatDistanceToNow } from 'date-fns';
import { REFRESH_INTERVAL } from '../utils/constants';

export function Footer({ lastUpdated, onReportIssue, onUpdateStatus }) {
  const logoSrc = `${import.meta.env.BASE_URL}nymonix-logo.png`;
  const refreshSeconds = Math.round(REFRESH_INTERVAL / 1000);

  const handleBackToTop = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReduced ? 'auto' : 'smooth',
    });
  };

  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] bg-white/60 dark:bg-[#141418]/75 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-24 sm:pb-8">
        {/* Top Utility Row: Sync Status + Quick Actions + Back to Top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Data & Sync Info */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E6E73] dark:text-[#98989D] tabular-nums">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.07]">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"
                aria-hidden="true"
              />
              <span>Auto-refreshes every {refreshSeconds}s</span>
            </span>
            {lastUpdated ? (
              <span>
                Last synced {formatDistanceToNow(lastUpdated, { addSuffix: true })}
              </span>
            ) : (
              <span>Syncing equipment status...</span>
            )}
          </div>

          {/* Quick Actions & Back to Top */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onReportIssue}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-maroon-700 dark:text-gold-300 bg-maroon-700/[0.08] hover:bg-maroon-700/[0.14] dark:bg-gold-400/10 dark:hover:bg-gold-400/20 border border-maroon-700/15 dark:border-gold-400/25 tactile-press"
            >
              <MdAdd size={15} aria-hidden="true" />
              <span>Report Issue</span>
            </button>

            <button
              type="button"
              onClick={onUpdateStatus}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] bg-black/[0.045] hover:bg-black/[0.08] dark:bg-white/[0.07] dark:hover:bg-white/[0.12] border border-black/[0.06] dark:border-white/[0.08] tactile-press"
            >
              <MdBuild size={13} aria-hidden="true" />
              <span>Update Status</span>
            </button>

            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] dark:text-[#98989D] dark:hover:text-[#F5F5F7] bg-transparent hover:bg-black/[0.045] dark:hover:bg-white/[0.07] border border-black/[0.06] dark:border-white/[0.08] tactile-press"
            >
              <MdArrowUpward size={14} aria-hidden="true" />
              <span>Back to top</span>
            </button>
          </div>
        </div>

        {/* Bottom Attribution Row */}
        <div className="mt-5 pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6E6E73] dark:text-[#98989D]">
          <p>Frank Worrell Hall · Laundry &amp; Maintenance</p>

          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.07]">
            <div className="w-6 h-6 rounded-md overflow-hidden ring-1 ring-black/10 dark:ring-white/15 bg-[#120D2D] shrink-0">
              <img
                src={logoSrc}
                alt="Nymonix logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span>
              Developed by{' '}
              <strong className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                Nymonix
              </strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
