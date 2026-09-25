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
    change: -12.4,          // negative = improvement (less energy)
    changeLabel: 'vs last month',
    trend: 'down',          // "down" is good for energy/emissions
    icon: 'zap',
    color: 'warning',
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
  },
  {
    id: 'cloud-cost',
    title: 'Cloud Cost',
    value: '₹12.08L',       // INR — lakhs format
    unit: '',
    change: -5.2,
    changeLabel: 'vs last month',
    trend: 'down',
    icon: 'dollar',
    color: 'primary',
  },
  {
    id: 'resource-efficiency',
    title: 'Resource Efficiency',
    value: '73',
    unit: '%',
    change: +4.1,           // positive = improvement for efficiency
    changeLabel: 'vs last month',
    trend: 'up',
    icon: 'cpu',
    color: 'primary',
  },
];

// ── Before / After comparison data ──────────────────────────────
export const beforeAfterData = {
  title: 'Optimization Impact',
  subtitle: 'After applying VerdeCloud recommendations',
  before: {
    label: 'Before',
    period: 'Aug 2026',
    energyUsage: 3247,        // kWh
    co2Emissions: 1.43,       // tCO₂e
    cloudCost: 1275120,       // INR (₹)
    efficiency: 61,           // %
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

// ── Trend data — Weekly (last 7 days, daily granularity) ─────────
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

// Keep trendData as an alias for backward compatibility
export const trendData = sixMonthTrendData;

// ── Placeholder data for other features (Persons 2 & 3) ─────────
// These will be replaced by real API data when other devs build their features.

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
  estimatedSavings: 238560,  // INR/month
};

export const reportsPlaceholder = {
  lastGenerated: '2026-09-24T08:00:00Z',
  available: ['Monthly Summary', 'Carbon Report', 'Cost Breakdown'],
};
