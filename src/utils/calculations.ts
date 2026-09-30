import { VendorOption, TenderProject } from '../types';

export interface CalculatedOptionMetrics {
  monoPages: number;
  colorPages: number;
  monthlyClickBill: number;
  totalMonthlyTCO: number;
  threeYearOutlay: number;
  fiveYearOutlay: number;
  rentalSharePct: number;
  clicksSharePct: number;
}

export function calculateOptionMetrics(
  option: VendorOption,
  project: TenderProject
): CalculatedOptionMetrics {
  const vol = project.targetVolume || 25000;
  const monoRatio = project.monoRatio || 0.8;
  const colorRatio = project.colorRatio || 0.2;

  const monoPages = Math.round(vol * monoRatio);
  const colorPages = Math.round(vol * colorRatio);

  const rental = option.monthlyRental || 0;
  const bwClick = option.bwClick || 0;
  const colorClick = option.colorClick || 0;

  const monthlyClickBill = (monoPages * bwClick) + (colorPages * colorClick);
  const totalMonthlyTCO = rental + monthlyClickBill;

  const threeYearOutlay = Math.round(totalMonthlyTCO * 36);
  const fiveYearOutlay = Math.round(totalMonthlyTCO * 60);

  const rentalSharePct = totalMonthlyTCO > 0 ? (rental / totalMonthlyTCO) * 100 : 0;
  const clicksSharePct = 100 - rentalSharePct;

  return {
    monoPages,
    colorPages,
    monthlyClickBill,
    totalMonthlyTCO,
    threeYearOutlay,
    fiveYearOutlay,
    rentalSharePct,
    clicksSharePct,
  };
}

export interface SummaryCardsData {
  lowestBrandNew: VendorOption | null;
  lowestRefurbished: VendorOption | null;
  lowestTCOOption: VendorOption | null;
  lowestTCOVal: number;
  refurbishedSavingsPct: number;
  annualSavingsFleet: number;
  lowestBwClickOption: VendorOption | null;
  lowestColorClickOption: VendorOption | null;
  maxSpeedOption: VendorOption | null;
}

export function computeSummaryMetrics(project: TenderProject): SummaryCardsData {
  const bnOptions = project.options.filter(o => o.category === 'BRAND_NEW');
  const refOptions = project.options.filter(o => o.category === 'REFURBISHED');

  const lowestBrandNew = bnOptions.length > 0
    ? bnOptions.reduce((min, o) => (o.monthlyRental < min.monthlyRental ? o : min), bnOptions[0])
    : null;

  const lowestRefurbished = refOptions.length > 0
    ? refOptions.reduce((min, o) => (o.monthlyRental < min.monthlyRental ? o : min), refOptions[0])
    : null;

  // TCO ranking
  let lowestTCOOption: VendorOption | null = null;
  let lowestTCOVal = Infinity;

  project.options.forEach(o => {
    const metrics = calculateOptionMetrics(o, project);
    if (metrics.totalMonthlyTCO < lowestTCOVal) {
      lowestTCOVal = metrics.totalMonthlyTCO;
      lowestTCOOption = o;
    }
  });

  // Calculate savings delta
  let refurbishedSavingsPct = 38.1;
  let annualSavingsFleet = 137880;

  if (lowestBrandNew && lowestRefurbished && lowestBrandNew.monthlyRental > 0) {
    const diffMo = lowestBrandNew.monthlyRental - lowestRefurbished.monthlyRental;
    refurbishedSavingsPct = Math.round((diffMo / lowestBrandNew.monthlyRental) * 1000) / 10;
    const fleet = project.fleetSize || 12;
    annualSavingsFleet = Math.round(diffMo * 12 * fleet);
  }

  // Lowest click rates
  const lowestBwClickOption = project.options.length > 0
    ? project.options.reduce((min, o) => (o.bwClick < min.bwClick ? o : min), project.options[0])
    : null;

  const lowestColorClickOption = project.options.length > 0
    ? project.options.reduce((min, o) => (o.colorClick < min.colorClick ? o : min), project.options[0])
    : null;

  const maxSpeedOption = project.options.length > 0
    ? project.options.reduce((max, o) => (o.speed > max.speed ? o : max), project.options[0])
    : null;

  return {
    lowestBrandNew,
    lowestRefurbished,
    lowestTCOOption,
    lowestTCOVal: lowestTCOVal === Infinity ? 0 : lowestTCOVal,
    refurbishedSavingsPct,
    annualSavingsFleet,
    lowestBwClickOption,
    lowestColorClickOption,
    maxSpeedOption,
  };
}

export function formatCurrency(amount: number, currency = 'RM', decimals = 2): string {
  return `${currency} ${amount.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;
}
