import { MdAdd, MdDarkMode, MdLightMode, MdRefresh } from 'react-icons/md';
import { useTheme } from '../contexts/ThemeContext';
import { formatDistanceToNow } from 'date-fns';

export function Header({ lastUpdated, onRefresh, refreshing, onReportIssue }) {
  const { isDark, toggleTheme } = useTheme();
  const emblemSrc = `${import.meta.env.BASE_URL}favicon.jpg`;

  return (
    <header className="sticky top-0 z-30 glass-chrome border-b border-black/[0.06] dark:border-white/[0.08]">
      {/* Subtle Frank Worrell Hall Maroon & Gold accent hairline */}
      <div className="h-[2.5px] w-full fwh-accent-bar" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Hall Emblem + Title */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-gold-500/45 shadow-sm shrink-0 bg-maroon-800">
              <img
                src={emblemSrc}
                alt="Frank Worrell Hall Lion Emblem"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <h1 className="display-title text-lg sm:text-xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
                Frank Worrell Hall
              </h1>
              <p className="text-xs text-[#6E6E73] dark:text-[#98989D] truncate">
                Laundry &amp; Maintenance
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {lastUpdated && (
              <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.05] dark:border-white/[0.06] text-xs text-[#6E6E73] dark:text-[#98989D] tabular-nums">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" aria-hidden="true" />
                <span>Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}</span>
              </div>
            )}

            <button
              type="button"
              onClick={onRefresh}
              disabled={refreshing}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-black/[0.045] hover:bg-black/[0.08] dark:bg-white/[0.07] dark:hover:bg-white/[0.12] text-[#1D1D1F] dark:text-[#F5F5F7] border border-black/[0.05] dark:border-white/[0.08] tactile-press disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh equipment data"
              aria-label="Refresh equipment data"
            >
              <MdRefresh
                size={19}
                className={refreshing ? 'animate-spin' : ''}
              />
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-black/[0.045] hover:bg-black/[0.08] dark:bg-white/[0.07] dark:hover:bg-white/[0.12] text-[#1D1D1F] dark:text-[#F5F5F7] border border-black/[0.05] dark:border-white/[0.08] tactile-press"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <MdLightMode size={18} className="text-gold-400" /> : <MdDarkMode size={18} />}
            </button>

            <button
              type="button"
              onClick={onReportIssue}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-maroon-700 hover:bg-maroon-800 dark:bg-maroon-600 dark:hover:bg-maroon-500 text-white text-sm font-medium shadow-sm ring-1 ring-gold-400/35 tactile-press"
            >
              <MdAdd size={18} className="text-gold-300" />
              <span>Report Issue</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
