import { useState, useMemo } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { ClusterView } from './components/ClusterView';
import { ReportModal } from './components/ReportModal';
import { FloatingActionButton } from './components/FloatingActionButton';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { OfflineNotice } from './components/OfflineNotice';
import { Footer } from './components/Footer';
import { useEquipmentData } from './hooks/useEquipmentData';
import { ThemeProvider } from './contexts/ThemeContext';

const INITIAL_FILTERS = {
  cluster: '',
  type: '',
  status: '',
  search: '',
};

function AppContent() {
  const { data, loading, error, lastUpdated, refresh } = useEquipmentData(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportModalType, setReportModalType] = useState('issue');
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    setTimeout(() => setRefreshing(false), 450);
  };

  const filteredEquipment = useMemo(() => {
    return data.filter((item) => {
      if (filters.cluster && item.cluster !== filters.cluster) {
        return false;
      }
      if (filters.type && item.type !== filters.type) {
        return false;
      }
      if (filters.status && item.status !== filters.status) {
        return false;
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesId = item.id?.toLowerCase().includes(searchLower);
        if (!matchesId) {
          return false;
        }
      }
      return true;
    });
  }, [data, filters]);

  const handleReportIssue = (equipment = null, type = 'issue') => {
    setSelectedEquipment(equipment);
    setReportModalType(type);
    setReportModalOpen(true);
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] dark:bg-[#0D0D10] text-[#1D1D1F] dark:text-[#F5F5F7] transition-colors duration-300">
      <OfflineNotice />

      <Header
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onReportIssue={() => handleReportIssue(null, 'issue')}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-10">
        {error && (
          <div className="bg-rose-500/10 dark:bg-rose-500/15 border border-rose-500/25 text-rose-800 dark:text-rose-200 px-4 py-3.5 rounded-2xl mb-6">
            <p className="text-sm font-semibold">Unable to load equipment data</p>
            <p className="text-xs mt-1 opacity-90">{error}</p>
            <p className="text-xs mt-1.5 opacity-80">
              Verify your Google Sheets CSV URL in{' '}
              <code className="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded">
                src/utils/constants.js
              </code>
              .
            </p>
          </div>
        )}

        {loading && !data.length ? (
          <LoadingSkeleton />
        ) : (
          <>
            <FilterBar
              filters={filters}
              onFilterChange={setFilters}
              totalCount={data.length}
              filteredCount={filteredEquipment.length}
              onResetFilters={handleResetFilters}
            />
            <ClusterView
              equipment={filteredEquipment}
              activeClusterFilter={filters.cluster}
              onReportIssue={(equipment) => handleReportIssue(equipment, 'status')}
              onResetFilters={handleResetFilters}
            />
          </>
        )}
      </main>

      <Footer
        lastUpdated={lastUpdated}
        onReportIssue={() => handleReportIssue(null, 'issue')}
        onUpdateStatus={() => handleReportIssue(null, 'status')}
      />

      <FloatingActionButton onClick={() => handleReportIssue(null, 'issue')} />

      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => {
          setReportModalOpen(false);
          setSelectedEquipment(null);
        }}
        prefilledEquipment={selectedEquipment}
        type={reportModalType}
      />
    </div>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
