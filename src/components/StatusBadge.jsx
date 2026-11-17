import { STATUS_COLORS } from '../utils/constants';

export function StatusBadge({ status }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS['Working'];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
}
