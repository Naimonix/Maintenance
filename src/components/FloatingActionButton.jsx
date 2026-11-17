import { MdAdd } from 'react-icons/md';

export function FloatingActionButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 px-4 py-3 rounded-full bg-maroon-700 hover:bg-maroon-800 dark:bg-maroon-600 dark:hover:bg-maroon-500 text-white text-sm font-medium shadow-lg shadow-maroon-900/25 ring-1 ring-gold-400/45 tactile-press sm:hidden"
      title="Report Maintenance Issue"
      aria-label="Report Maintenance Issue"
    >
      <MdAdd size={20} className="text-gold-300" />
      <span>Report Issue</span>
    </button>
  );
}
