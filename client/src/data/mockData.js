/**
 * mockData.js — VerdeCloud mock data
 *
 * IMPORTANT: Keep data layer separate from UI components.
 * When the backend is ready, replace these with API calls
 * without rewriting any component code.
 *
 * Data shape mirrors what the Express API will return.
 * Cloud costs are in INR (₹).
 */

// ── Overview StatCards ──────────────────────────────────────────
export const overviewStats = [
  {
    id: 'energy-usage',
    title: 'Energy Usage',
    value: '2,847',
    unit: 'kWh',
    change: -12.4,
    changeLabel: 'vs last month',
    trend: 'down',
    icon: 'zap',
    color: 'warning',
    accentColor: '#F59E0B',
    sparklineData: [415, 398, 421, 388, 402, 312, 295],
  },
  {
    id: 'co2-emissions',
    title: 'CO₂ Emissions',
    value: '1.24',
    unit: 'tCO₂e',
    change: -8.7,
    changeLabel: 'vs last month',
    trend: 'down',
    icon: 'cloud',
    color: 'success',
    accentColor: '#16A34A',
    sparklineData: [0.183, 0.175, 0.185, 0.171, 0.177, 0.137, 0.130],
  },
  {
    id: 'cloud-cost',
    title: 'Cloud Cost',
    value: '₹12.08L',
    unit: '',
    change: -5.2,
    changeLabel: 'vs last month',
    trend: 'down',
    icon: 'rupee',
    color: 'primary',
    accentColor: '#6366F1',
    sparklineData: [177120, 171360, 180600, 166944, 172860, 134232, 126840],
  },
  {
    id: 'resource-efficiency',
    title: 'Resource Efficiency',
    value: '73',
    unit: '%',
    change: +4.1,
    changeLabel: 'vs last month',
    trend: 'up',
    icon: 'cpu',
    color: 'primary',
    accentColor: '#0EA5E9',
    sparklineData: [70, 71, 69, 73, 72, 76, 78],
  },
];

// ── Before / After comparison data ──────────────────────────────
export const beforeAfterData = {
  title: 'Optimization Impact',
  subtitle: 'After applying VerdeCloud recommendations',
  before: {
    label: 'Before',
    period: 'Aug 2026',
    energyUsage: 3247,
    co2Emissions: 1.43,
    cloudCost: 1275120,       // INR (₹)
    efficiency: 61,
  },
  after: {
    label: 'After',
    period: 'Sep 2026',
    energyUsage: 2847,
    co2Emissions: 1.24,
    cloudCost: 1208082,       // INR (₹)
    efficiency: 73,
  },
  metrics: [
    { key: 'energyUsage',  label: 'Energy Usage',  unit: 'kWh',   lowerIsBetter: true },
    { key: 'co2Emissions', label: 'CO₂ Emissions', unit: 'tCO₂e', lowerIsBetter: true },
    { key: 'cloudCost',    label: 'Cloud Cost',    unit: '₹',     lowerIsBetter: true, prefix: '₹', isINR: true },
    { key: 'efficiency',   label: 'Efficiency',    unit: '%',     lowerIsBetter: false },
  ],
};

// ── Trend data — Weekly (last 7 days) ────────────────────────────
export const weeklyTrendData = [
  { period: 'Mon', energyUsage: 415, co2Emissions: 0.183, cloudCost: 177120, efficiency: 70 },
  { period: 'Tue', energyUsage: 398, co2Emissions: 0.175, cloudCost: 171360, efficiency: 71 },
  { period: 'Wed', energyUsage: 421, co2Emissions: 0.185, cloudCost: 180600, efficiency: 69 },
  { period: 'Thu', energyUsage: 388, co2Emissions: 0.171, cloudCost: 166944, efficiency: 73 },
  { period: 'Fri', energyUsage: 402, co2Emissions: 0.177, cloudCost: 172860, efficiency: 72 },
  { period: 'Sat', energyUsage: 312, co2Emissions: 0.137, cloudCost: 134232, efficiency: 76 },
  { period: 'Sun', energyUsage: 295, co2Emissions: 0.130, cloudCost: 126840, efficiency: 78 },
];

// ── Trend data — Monthly (last 12 months) ────────────────────────
export const monthlyTrendData = [
  { period: 'Oct', energyUsage: 4200, co2Emissions: 1.85, cloudCost: 1881600, efficiency: 48 },
  { period: 'Nov', energyUsage: 4050, co2Emissions: 1.79, cloudCost: 1814400, efficiency: 50 },
  { period: 'Dec', energyUsage: 3980, co2Emissions: 1.75, cloudCost: 1781280, efficiency: 51 },
  { period: 'Jan', energyUsage: 3870, co2Emissions: 1.71, cloudCost: 1737360, efficiency: 53 },
  { period: 'Feb', energyUsage: 3740, co2Emissions: 1.65, cloudCost: 1680480, efficiency: 55 },
  { period: 'Mar', energyUsage: 3650, co2Emissions: 1.61, cloudCost: 1638600, efficiency: 57 },
  { period: 'Apr', energyUsage: 3820, co2Emissions: 1.69, cloudCost: 1461600, efficiency: 52 },
  { period: 'May', energyUsage: 3610, co2Emissions: 1.59, cloudCost: 1411200, efficiency: 56 },
  { period: 'Jun', energyUsage: 3450, co2Emissions: 1.52, cloudCost: 1360800, efficiency: 59 },
  { period: 'Jul', energyUsage: 3340, co2Emissions: 1.47, cloudCost: 1318800, efficiency: 62 },
  { period: 'Aug', energyUsage: 3247, co2Emissions: 1.43, cloudCost: 1275120, efficiency: 61 },
  { period: 'Sep', energyUsage: 2847, co2Emissions: 1.24, cloudCost: 1208082, efficiency: 73 },
];

// ── Trend data — 6 Months ─────────────────────────────────────────
export const sixMonthTrendData = [
  { period: 'Apr', energyUsage: 3820, co2Emissions: 1.69, cloudCost: 1461600, efficiency: 52 },
  { period: 'May', energyUsage: 3610, co2Emissions: 1.59, cloudCost: 1411200, efficiency: 56 },
  { period: 'Jun', energyUsage: 3450, co2Emissions: 1.52, cloudCost: 1360800, efficiency: 59 },
  { period: 'Jul', energyUsage: 3340, co2Emissions: 1.47, cloudCost: 1318800, efficiency: 62 },
  { period: 'Aug', energyUsage: 3247, co2Emissions: 1.43, cloudCost: 1275120, efficiency: 61 },
  { period: 'Sep', energyUsage: 2847, co2Emissions: 1.24, cloudCost: 1208082, efficiency: 73 },
];

// Alias for backward compatibility
export const trendData = sixMonthTrendData;

// ── Service breakdown data ───────────────────────────────────────
export const serviceBreakdownData = {
  title: 'Breakdown by Service',
  subtitle: 'CO₂ emissions and cost by cloud service type',
  services: [
    { id: 'compute',    name: 'Compute',    co2: 0.54, cost: 526000, color: '#6366F1' },
    { id: 'storage',    name: 'Storage',    co2: 0.31, cost: 302000, color: '#0EA5E9' },
    { id: 'database',   name: 'Database',   co2: 0.23, cost: 224000, color: '#F59E0B' },
    { id: 'networking', name: 'Networking', co2: 0.11, cost: 108000, color: '#16A34A' },
    { id: 'other',      name: 'Other',      co2: 0.05, cost: 48082,  color: '#9CA3AF' },
  ],
};

// ── Sustainability goal ──────────────────────────────────────────
export const sustainabilityGoal = {
  title: 'Q3–Q4 Emissions Target',
  description: '25% CO₂ reduction from Q2 baseline',
  metric: 'CO₂ Emissions',
  unit: 'tCO₂e',
  targetValue: 1.00,
  currentValue: 1.24,
  startValue: 1.69,      // beginning of quarter (Q2 baseline)
  deadline: 'Dec 31, 2026',
};

// ── Placeholder data for other features (Persons 2 & 3) ─────────
export const instancesPlaceholder = {
  count: 24,
  running: 18,
  stopped: 6,
  regions: ['us-east-1', 'eu-west-1', 'ap-southeast-1'],
};

export const recommendationsPlaceholder = {
  total: 12,
  high: 3,
  medium: 7,
  low: 2,
  estimatedSavings: 238560,
};

export const reportsPlaceholder = {
  lastGenerated: '2026-09-24T08:00:00Z',
  available: ['Monthly Summary', 'Carbon Report', 'Cost Breakdown'],
};
