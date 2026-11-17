import { motion as Motion } from 'motion/react';
import { MdClose, MdSearch } from 'react-icons/md';
import { CLUSTERS, CLUSTER_STYLES, EQUIPMENT_TYPES, STATUS, STATUS_COLORS } from '../utils/constants';

const CLUSTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: CLUSTERS.RED, label: 'Red' },
  { value: CLUSTERS.BLUE, label: 'Blue' },
  { value: CLUSTERS.YELLOW, label: 'Yellow' },
];

const TYPE_OPTIONS = [
  { value: '', label: 'All' },
  { value: EQUIPMENT_TYPES.WASHER, label: 'Washers' },
  { value: EQUIPMENT_TYPES.DRYER, label: 'Dryers' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: STATUS.WORKING, label: STATUS.WORKING },
  { value: STATUS.OUT_OF_ORDER, label: STATUS.OUT_OF_ORDER },
  { value: STATUS.UNDER_MAINTENANCE, label: STATUS.UNDER_MAINTENANCE },
];

const SEGMENT_SPRING = { type: 'spring', bounce: 0, duration: 0.35 };

export function FilterBar({
  filters,
  onFilterChange,
  totalCount = 0,
  filteredCount = 0,
  onResetFilters,
}) {
  const hasActiveFilters = Boolean(
    filters.cluster || filters.type || filters.status || filters.search
  );

  return (
    <section
      aria-label="Filter equipment"
      className="bg-white/90 dark:bg-[#18181C]/90 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-3.5 sm:p-4 mb-6"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        {/* Cluster Segmented Control */}
        <div
          role="group"
          aria-label="Filter by cluster"
          className="inline-flex items-center p-1 rounded-xl bg-black/[0.045] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.05] w-full lg:w-auto"
        >
          {CLUSTER_OPTIONS.map((option) => {
            const active = filters.cluster === option.value;
            const clusterStyle = CLUSTER_STYLES[option.value];
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={active}
                onClick={() => onFilterChange({ ...filters, cluster: option.value })}
                className={`relative flex-1 lg:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors tactile-press ${
                  active
                    ? 'text-[#1D1D1F] dark:text-[#F5F5F7]'
                    : 'text-[#6E6E73] dark:text-[#98989D] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]'
                }`}
              >
                {active && (
                  <Motion.span
                    layoutId="cluster-segment"
                    transition={SEGMENT_SPRING}
                    className="absolute inset-0 rounded-lg bg-white dark:bg-[#2A2A32] shadow-sm ring-1 ring-black/[0.06] dark:ring-white/[0.1]"
                    aria-hidden="true"
                  />
                )}
                {clusterStyle && (
                  <span
                    className={`relative z-10 w-2 h-2 rounded-full ${clusterStyle.dot}`}
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Type Segmented Control */}
        <div
          role="group"
          aria-label="Filter by equipment type"
          className="inline-flex items-center p-1 rounded-xl bg-black/[0.045] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.05] w-full lg:w-auto"
        >
          {TYPE_OPTIONS.map((option) => {
            const active = filters.type === option.value;
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={active}
                onClick={() => onFilterChange({ ...filters, type: option.value })}
                className={`relative flex-1 lg:flex-initial inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors tactile-press ${
                  active
                    ? 'text-[#1D1D1F] dark:text-[#F5F5F7]'
                    : 'text-[#6E6E73] dark:text-[#98989D] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]'
                }`}
              >
                {active && (
                  <Motion.span
                    layoutId="type-segment"
                    transition={SEGMENT_SPRING}
                    className="absolute inset-0 rounded-lg bg-white dark:bg-[#2A2A32] shadow-sm ring-1 ring-black/[0.06] dark:ring-white/[0.1]"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative flex-1 min-w-0">
          <MdSearch
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868B] dark:text-[#8E8E93] pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            placeholder="Search by ID (e.g. RED-W7)..."
            aria-label="Search equipment by ID"
            className="w-full rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-[#F5F5F7]/80 dark:bg-white/[0.05] text-[#1D1D1F] dark:text-[#F5F5F7] pl-9 pr-9 py-2 text-sm placeholder-[#86868B] dark:placeholder-[#8E8E93] focus:outline-none focus:bg-white dark:focus:bg-[#1F1F25] focus:ring-2 focus:ring-maroon-700/35 dark:focus:ring-gold-400/40 focus:border-maroon-700/40 dark:focus:border-gold-400/40 transition-all"
          />
          {filters.search && (
            <button
              type="button"
              onClick={() => onFilterChange({ ...filters, search: '' })}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center bg-black/10 dark:bg-white/15 text-[#6E6E73] dark:text-[#AEAEB2] hover:bg-black/20 dark:hover:bg-white/25 tactile-press"
            >
              <MdClose size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Row: Status Filter Chips + Active Count */}
      <div className="mt-3 pt-3 border-t border-black/[0.05] dark:border-white/[0.07] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by status">
          {STATUS_OPTIONS.map((option) => {
            const active = filters.status === option.value;
            const statusStyle = STATUS_COLORS[option.value];
            return (
              <button
                key={option.label}
                type="button"
                aria-pressed={active}
                onClick={() => onFilterChange({ ...filters, status: option.value })}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border tactile-press ${
                  active
                    ? 'bg-maroon-700/10 text-maroon-700 border-maroon-700/25 dark:bg-gold-400/15 dark:text-gold-300 dark:border-gold-400/30'
                    : 'bg-transparent text-[#6E6E73] dark:text-[#98989D] border-black/[0.08] dark:border-white/[0.1] hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]'
                }`}
              >
                {statusStyle && (
                  <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} aria-hidden="true" />
                )}
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2.5 text-xs text-[#6E6E73] dark:text-[#98989D] tabular-nums ml-auto">
          <span>
            Showing <strong className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">{filteredCount}</strong> of {totalCount}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="font-medium text-maroon-700 dark:text-gold-300 hover:underline tactile-press"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
