import { GiWashingMachine } from 'react-icons/gi';
import { MdLocalLaundryService, MdNotes } from 'react-icons/md';
import { formatDistanceToNow, isValid } from 'date-fns';
import { StatusBadge } from './StatusBadge';
import { EQUIPMENT_TYPES, CLUSTER_COLORS } from '../utils/constants';

function formatLastUpdated(value) {
  if (!value || typeof value !== 'string') {
    return 'Unknown';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return 'Unknown';
  }

  // Normalize "YYYY-MM-DD HH:MM:SS" to ISO-like format for consistent cross-browser parsing
  const isoCandidate = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}(:\d{2})?$/.test(trimmed)
    ? trimmed.replace(' ', 'T')
    : trimmed;

  let parsed = new Date(isoCandidate);
  if (!isValid(parsed)) {
    parsed = new Date(trimmed);
  }

  if (!isValid(parsed)) {
    return 'Unknown';
  }

  return formatDistanceToNow(parsed, { addSuffix: true });
}

export function EquipmentCard({ equipment, onReportIssue }) {
  const isWasher = equipment.type === EQUIPMENT_TYPES.WASHER;
  const Icon = isWasher ? GiWashingMachine : MdLocalLaundryService;

  const clusterColor = CLUSTER_COLORS[equipment.cluster] || 'bg-gray-400';
  const lastUpdated = formatLastUpdated(equipment.last_updated);

  return (
    <article className="bg-white dark:bg-[#18181C] rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_28px_rgba(0,0,0,0.07)] dark:hover:shadow-[0_10px_28px_rgba(0,0,0,0.4)] transition-shadow duration-200 p-4 flex flex-col justify-between">
      <div>
        {/* Header with Cluster Bar & Icon */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-1 h-10 rounded-full shrink-0 ${clusterColor}`}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <h3 className="text-base font-semibold tracking-[-0.015em] text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
                {equipment.id}
              </h3>
              <p className="text-xs text-[#6E6E73] dark:text-[#98989D] truncate">
                {equipment.cluster} Cluster · {equipment.type}
              </p>
            </div>
          </div>

          <div className="w-10 h-10 rounded-xl bg-[#F5F5F7] dark:bg-white/[0.05] border border-black/[0.05] dark:border-white/[0.07] flex items-center justify-center shrink-0">
            <Icon className="text-xl text-[#424245] dark:text-[#C7C7CC]" aria-hidden="true" />
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-3">
          <StatusBadge status={equipment.status} />
        </div>

        {/* Optional Notes */}
        {equipment.notes && (
          <div className="mb-2 flex items-start gap-2 p-2.5 bg-[#F5F5F7] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.05] rounded-xl">
            <MdNotes
              size={15}
              className="text-gold-600 dark:text-gold-400 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="text-xs text-[#424245] dark:text-[#AEAEB2] leading-relaxed">
              {equipment.notes}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-black/[0.05] dark:border-white/[0.07]">
        <p className="text-xs text-[#86868B] dark:text-[#8E8E93] truncate">
          Updated {lastUpdated}
        </p>
        <button
          type="button"
          onClick={() => onReportIssue(equipment)}
          className="shrink-0 text-xs font-medium px-3 py-1.5 rounded-full text-maroon-700 dark:text-gold-300 bg-maroon-700/[0.07] hover:bg-maroon-700/[0.14] dark:bg-gold-400/10 dark:hover:bg-gold-400/20 tactile-press"
        >
          Update Status
        </button>
      </div>
    </article>
  );
}
