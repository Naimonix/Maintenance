import { motion as Motion } from 'motion/react';
import { GiWashingMachine } from 'react-icons/gi';
import { MdLocalLaundryService, MdSearchOff } from 'react-icons/md';
import { EquipmentCard } from './EquipmentCard';
import { CLUSTERS, CLUSTER_STYLES, EQUIPMENT_TYPES, STATUS } from '../utils/constants';

function AvailabilityCard({ title, icon, working, total, breakdown, accent }) {
  const IconComponent = icon;
  const ratio = total > 0 ? working / total : 0;
  const percentage = Math.round(ratio * 100);

  const barColor =
    total === 0
      ? 'bg-gray-300 dark:bg-white/15'
      : ratio === 0
      ? 'bg-rose-500'
      : ratio < 0.6
      ? 'bg-gold-500'
      : 'bg-emerald-500 dark:bg-emerald-400';

  const iconStyles =
    accent === 'maroon'
      ? 'bg-maroon-700/10 text-maroon-700 dark:bg-maroon-500/20 dark:text-maroon-300 border-maroon-700/15 dark:border-maroon-400/20'
      : 'bg-gold-500/15 text-gold-700 dark:bg-gold-400/15 dark:text-gold-300 border-gold-500/25 dark:border-gold-400/25';

  return (
    <div className="bg-white/95 dark:bg-[#18181C]/95 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.04em] text-[#6E6E73] dark:text-[#98989D]">
            {title}
          </p>
          <div className="mt-1.5 flex items-baseline gap-2.5">
            <span className="display-title text-3xl font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] tabular-nums">
              {working}
              <span className="text-lg font-medium text-[#86868B] dark:text-[#8E8E93]">
                /{total}
              </span>
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-black/[0.045] dark:bg-white/[0.07] text-[#424245] dark:text-[#C7C7CC] tabular-nums">
              {total > 0 ? `${percentage}% ready` : 'None shown'}
            </span>
          </div>
        </div>

        <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 ${iconStyles}`}>
          <IconComponent className="text-2xl" aria-hidden="true" />
        </div>
      </div>

      {/* Availability Progress Bar */}
      <div className="mt-4 h-2 w-full rounded-full bg-black/[0.06] dark:bg-white/[0.08] overflow-hidden">
        <Motion.div
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', bounce: 0, duration: 0.45 }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>

      {/* Per-cluster mini breakdown */}
      {breakdown.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-[#6E6E73] dark:text-[#98989D] tabular-nums">
          {breakdown.map((entry) => {
            const dotClass = CLUSTER_STYLES[entry.cluster]?.dot || 'bg-gray-400';
            return (
              <span key={entry.cluster} className="inline-flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} aria-hidden="true" />
                <span>
                  {entry.cluster}: <strong className="font-medium text-[#1D1D1F] dark:text-[#E5E5EA]">{entry.working}/{entry.total}</strong>
                </span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ClusterView({
  equipment,
  activeClusterFilter = '',
  onReportIssue,
  onResetFilters,
}) {
  if (!equipment || equipment.length === 0) {
    return (
      <div className="bg-white/90 dark:bg-[#18181C]/90 rounded-2xl border border-black/[0.06] dark:border-white/[0.08] shadow-sm text-center py-14 px-6">
        <div className="w-12 h-12 rounded-2xl bg-maroon-700/10 dark:bg-gold-400/15 text-maroon-700 dark:text-gold-300 flex items-center justify-center mx-auto mb-3">
          <MdSearchOff size={24} aria-hidden="true" />
        </div>
        <h2 className="text-base font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
          No machines match these filters
        </h2>
        <p className="text-sm text-[#6E6E73] dark:text-[#98989D] mt-1 max-w-sm mx-auto">
          Try clearing one or more filters or searching for a different equipment ID.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 inline-flex items-center px-4 py-2 rounded-full bg-maroon-700 hover:bg-maroon-800 dark:bg-maroon-600 dark:hover:bg-maroon-500 text-white text-sm font-medium ring-1 ring-gold-400/35 tactile-press"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  const washers = equipment.filter((e) => e.type === EQUIPMENT_TYPES.WASHER);
  const workingWashers = washers.filter((e) => e.status === STATUS.WORKING).length;

  const dryers = equipment.filter((e) => e.type === EQUIPMENT_TYPES.DRYER);
  const workingDryers = dryers.filter((e) => e.status === STATUS.WORKING).length;

  const clusterOrder = [CLUSTERS.RED, CLUSTERS.BLUE, CLUSTERS.YELLOW];
  const presentClusters = Array.from(new Set(equipment.map((e) => e.cluster).filter(Boolean)));
  const orderedClusters = [
    ...clusterOrder.filter((c) => presentClusters.includes(c)),
    ...presentClusters.filter((c) => !clusterOrder.includes(c)),
  ];

  const getBreakdown = (items) =>
    orderedClusters
      .map((cluster) => {
        const subset = items.filter((item) => item.cluster === cluster);
        return {
          cluster,
          total: subset.length,
          working: subset.filter((item) => item.status === STATUS.WORKING).length,
        };
      })
      .filter((entry) => entry.total > 0);

  const shouldGroupByCluster = !activeClusterFilter && orderedClusters.length > 1;

  return (
    <div className="space-y-6">
      {/* Availability Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AvailabilityCard
          title="Washers Available"
          icon={GiWashingMachine}
          working={workingWashers}
          total={washers.length}
          breakdown={getBreakdown(washers)}
          accent="maroon"
        />
        <AvailabilityCard
          title="Dryers Available"
          icon={MdLocalLaundryService}
          working={workingDryers}
          total={dryers.length}
          breakdown={getBreakdown(dryers)}
          accent="gold"
        />
      </div>

      {/* Equipment Grid (Grouped by Cluster when viewing All) */}
      {shouldGroupByCluster ? (
        <div className="space-y-8">
          {orderedClusters.map((clusterName) => {
            const clusterItems = equipment.filter((item) => item.cluster === clusterName);
            const workingCount = clusterItems.filter(
              (item) => item.status === STATUS.WORKING
            ).length;
            const style = CLUSTER_STYLES[clusterName];

            return (
              <section key={clusterName} aria-label={`${clusterName} Cluster`}>
                <div className="flex items-center justify-between mb-3 px-0.5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${style?.dot || 'bg-gray-400'}`}
                      aria-hidden="true"
                    />
                    <h2 className="text-base sm:text-lg font-semibold tracking-[-0.015em] text-[#1D1D1F] dark:text-[#F5F5F7]">
                      {clusterName} Cluster
                    </h2>
                  </div>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-black/[0.045] dark:bg-white/[0.07] text-[#6E6E73] dark:text-[#98989D] tabular-nums">
                    {workingCount}/{clusterItems.length} working
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clusterItems.map((item) => (
                    <EquipmentCard
                      key={item.id}
                      equipment={item}
                      onReportIssue={onReportIssue}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipment.map((item) => (
            <EquipmentCard
              key={item.id}
              equipment={item}
              onReportIssue={onReportIssue}
            />
          ))}
        </div>
      )}
    </div>
  );
}
