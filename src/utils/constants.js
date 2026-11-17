// Google Sheets CSV URLs
export const EQUIPMENT_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRPHLo0KqsMoOj0F-DDvG74oQB_jEJOURhUGTm-QYC7wes-F8zXkWQwKj01pGLoSDVpFS_pq-cGPqun/pub?gid=0&single=true&output=csv';
export const REPORTS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRljV4iUhL9qRYaur18PhOB_ciLtLtI_b039Dew7PD8Dvw3OboUKtT-VCab0uBG-AhFGMOKDBu6pVgC/pub?gid=0&single=true&output=csv';

// Google Forms URLs
export const REPORT_ISSUE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfM4IfHhasEqStWCecgSuNBXc_9FYifUwy5jdP7uVz2-s5h9g/viewform?usp=sharing&ouid=117493956697007271173';
export const REPORT_STATUS_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSceBePXUvCJHkUCSZmFhWWj4kohRFqjLO3KaldKEBHd5VArCA/viewform?usp=sharing&ouid=117493956697007271173';

// Google Forms prefill entry IDs (Washer/dryer Status form)
export const STATUS_FORM_ENTRY_IDS = {
  CLUSTER: 'entry.1987819373',
  EQUIPMENT_ID: 'entry.1044296058',
};

export const CLUSTERS = {
  RED: 'Red',
  BLUE: 'Blue',
  YELLOW: 'Yellow',
};

export const EQUIPMENT_TYPES = {
  WASHER: 'Washer',
  DRYER: 'Dryer',
};

export const STATUS = {
  WORKING: 'Working',
  OUT_OF_ORDER: 'Out of Order',
  UNDER_MAINTENANCE: 'Under Maintenance',
};

export const STATUS_COLORS = {
  [STATUS.WORKING]: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-400/15',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-500/20 dark:border-emerald-400/25',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
  },
  [STATUS.OUT_OF_ORDER]: {
    bg: 'bg-rose-500/10 dark:bg-rose-400/15',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-500/20 dark:border-rose-400/25',
    dot: 'bg-rose-500 dark:bg-rose-400',
  },
  [STATUS.UNDER_MAINTENANCE]: {
    bg: 'bg-gold-500/15 dark:bg-gold-400/15',
    text: 'text-gold-800 dark:text-gold-300',
    border: 'border-gold-500/30 dark:border-gold-400/30',
    dot: 'bg-gold-500 dark:bg-gold-400',
  },
};

export const CLUSTER_COLORS = {
  [CLUSTERS.RED]: 'bg-rose-500',
  [CLUSTERS.BLUE]: 'bg-sky-500',
  [CLUSTERS.YELLOW]: 'bg-gold-400',
};

export const CLUSTER_STYLES = {
  [CLUSTERS.RED]: {
    dot: 'bg-rose-500',
    bar: 'bg-rose-500',
    pill: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20',
  },
  [CLUSTERS.BLUE]: {
    dot: 'bg-sky-500',
    bar: 'bg-sky-500',
    pill: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
  },
  [CLUSTERS.YELLOW]: {
    dot: 'bg-gold-400',
    bar: 'bg-gold-400',
    pill: 'bg-gold-500/15 text-gold-800 dark:text-gold-300 border-gold-500/25',
  },
};

export const ISSUE_TYPES = {
  EQUIPMENT_MALFUNCTION: 'Equipment malfunction',
  CLEANLINESS: 'Cleanliness issue',
  OTHER: 'Other',
};

export const REFRESH_INTERVAL = 60000; // 60 seconds
