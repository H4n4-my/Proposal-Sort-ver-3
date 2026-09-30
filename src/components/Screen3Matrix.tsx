import React, { useState } from 'react';
import {
  Gavel,
  ArrowLeft,
  Bookmark,
  FileSpreadsheet,
  FileText,
  Award,
  TrendingDown,
  RotateCcw,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { TenderProject, MatrixFilter, VendorOption } from '../types';
import {
  calculateOptionMetrics,
  computeSummaryMetrics,
  formatCurrency,
} from '../utils/calculations';
import { exportTenderToExcel } from '../utils/excelExport';
import { useLanguage } from '../context/LanguageContext';

interface Screen3Props {
  project: TenderProject;
  onNavigateStep: (step: number) => void;
  onSaveToHistory: () => void;
  onOpenBoardroomModal: () => void;
  onShowToast: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

export const Screen3Matrix: React.FC<Screen3Props> = ({
  project,
  onNavigateStep,
  onSaveToHistory,
  onOpenBoardroomModal,
  onShowToast,
}) => {
  const { t, language } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<MatrixFilter>('all');
  const [slaOpen, setSlaOpen] = useState(true);
  const [saveVaultText, setSaveVaultText] = useState(t.s3SaveCloud);
  const [boardroomSigned, setBoardroomSigned] = useState(false);

  const summary = computeSummaryMetrics(project);

  // Filter options based on tab
  const getVisibleOptions = (): VendorOption[] => {
    switch (activeFilter) {
      case 'brand-new':
        return project.options.filter(o => o.category === 'BRAND_NEW');
      case 'refurbished':
        return project.options.filter(o => o.category === 'REFURBISHED');
      case 'recommendations':
        return project.options.filter(
          o => o.isRecommended || o.monthlyRental === 260 || o.id === 'opt-ricoh-a'
        );
      case 'all':
      default:
        return project.options;
    }
  };

  const visibleOptions = getVisibleOptions();

  // Metrics for highlighting min/max in matrix
  const minRental = Math.min(...project.options.map(o => o.monthlyRental || Infinity));
  const minBwClick = Math.min(...project.options.map(o => o.bwClick || Infinity));
  const minColorClick = Math.min(...project.options.map(o => o.colorClick || Infinity));
  const minBnRental = Math.min(
    ...project.options
      .filter(o => o.category === 'BRAND_NEW')
      .map(o => o.monthlyRental || Infinity)
  );

  const handleSaveToHistory = () => {
    onSaveToHistory();
    setSaveVaultText('Saved to Vault!');
    setTimeout(() => setSaveVaultText('Save to History'), 2500);
  };

  const handleExportExcel = () => {
    try {
      exportTenderToExcel(project);
      onShowToast('Executive Matrix exported cleanly to Excel (.xlsx)', 'success');
    } catch (e: any) {
      onShowToast(`Export error: ${e.message}`, 'error');
    }
  };

  const handleBoardroomSignoff = () => {
    setBoardroomSigned(true);
    onShowToast('Motion submitted to Executive Committee for Boardroom Signoff.', 'success');
  };

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Top Command & Title Header Strip */}
      <div className="w-full bg-white shadow-xs border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col gap-4">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded uppercase tracking-wider">
                  <Gavel className="w-3.5 h-3.5" />
                  {t.s3StageBadge}
                </span>
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                  {t.s3TcoAudited}
                </span>
                <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  {t.s3BlindReview}
                </span>
              </div>

              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
                {t.s3Title}
              </h1>

              <p className="text-xs text-slate-500">
                {language === 'ms' ? 'Skop' : 'Scope'}: <span className="font-mono font-semibold text-blue-700">{project.refCode}</span> &bull; {language === 'ms' ? 'Asas Penilaian' : 'Evaluation Baseline'}:{' '}
                <strong className="text-slate-800">{project.targetVolume.toLocaleString()} {language === 'ms' ? 'salinan bulanan' : 'monthly copies'}</strong> (80% {language === 'ms' ? 'HP' : 'B&W'} / 20% {language === 'ms' ? 'Warna' : 'Color'}) &bull; {language === 'ms' ? 'Saiz Armada' : 'Fleet Size'}:{' '}
                <strong className="text-slate-800">{project.fleetSize} {language === 'ms' ? 'Unit Mesin HQ' : 'Units HQ'}</strong> &bull; {language === 'ms' ? 'Mata Wang' : 'Currency'}:{' '}
                <strong className="font-mono text-slate-800">{project.currency}</strong>
              </p>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => onNavigateStep(2)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition border border-slate-200 shadow-2xs cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'ms' ? 'Kembali ke Semakan' : 'Edit Data'}</span>
              </button>

              <button
                onClick={handleSaveToHistory}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition border border-slate-200 shadow-2xs cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-blue-600" />
                <span>{saveVaultText}</span>
              </button>

              <button
                onClick={handleExportExcel}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>{t.s3ExportExcel}</span>
              </button>

              <button
                onClick={onOpenBoardroomModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/20 transition cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{t.s3BoardroomPresentation}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-6 py-8 space-y-8">
        {/* KPI Summary Grid (4 Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* KPI 1: Lowest Brand New Base */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Brand New Base Rental
                </span>
                <div className="mt-1 flex items-baseline gap-1 font-mono">
                  <span className="text-2xl font-bold text-slate-900">
                    {formatCurrency(summary.lowestBrandNew?.monthlyRental || 420, project.currency)}
                  </span>
                  <span className="text-xs text-slate-500 font-normal">/mo</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-800 rounded border border-slate-200">
                Lowest Brand New Base
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-800">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="font-bold">
                  {summary.lowestBrandNew?.vendor || 'Sharp Electronics'}
                </span>
                <span className="text-slate-500">&mdash; {summary.lowestBrandNew?.model || 'BP-50C31'}</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '87.5%' }}></div>
              </div>
              <span className="text-[11px] text-slate-500 block">
                Saves RM 60/mo per unit vs Ricoh IM C3000 rental baseline
              </span>
            </div>
          </div>

          {/* KPI 2: Lowest Refurbished Base */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Refurbished Base Rental
                </span>
                <div className="mt-1 flex items-baseline gap-1 font-mono">
                  <span className="text-2xl font-bold text-emerald-700">
                    {formatCurrency(summary.lowestRefurbished?.monthlyRental || 260, project.currency)}
                  </span>
                  <span className="text-xs text-slate-500 font-normal">/mo</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                Best Overall Entry Price
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-800">
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">
                  {summary.lowestRefurbished?.vendor || 'Sharp Electronics'}
                </span>
                <span className="text-slate-500">&mdash; {summary.lowestRefurbished?.model || 'MX-3071'}</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '54.1%' }}></div>
              </div>
              <span className="text-[11px] text-slate-500 block">
                Ultra-low capital commitment for low-load auxiliary floors
              </span>
            </div>
          </div>

          {/* KPI 3: Refurbished Delta Savings */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between gap-4 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Refurbished Delta Savings
                </span>
                <div className="mt-1 flex items-baseline gap-1 font-mono">
                  <span className="text-2xl font-bold text-emerald-700">
                    {summary.refurbishedSavingsPct}%
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">Mo. Base</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                High Financial Value
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-800 font-mono">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span>Saves ~RM 1,920/year per device</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${summary.refurbishedSavingsPct}%` }}></div>
              </div>
              <span className="text-[11px] text-slate-500 block">
                Calculated against lowest new unit across entire {project.fleetSize}-device fleet
              </span>
            </div>
          </div>

          {/* KPI 4: Winner Card Highlighted (Royal Blue) */}
          <div className="bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-5 rounded-xl shadow-md flex flex-col justify-between gap-4 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200">
                  Lowest 25k Page Monthly TCO
                </span>
                <div className="mt-1 flex items-baseline gap-1 font-mono">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    {formatCurrency(3380, project.currency)}
                  </span>
                  <span className="text-xs text-blue-200 font-normal">/mo</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-white text-blue-800 rounded shadow-xs">
                Recommended TCO Winner
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-1.5 text-xs text-white">
                <Award className="w-4 h-4 text-amber-300" />
                <span className="font-bold">Ricoh Malaysia</span>
                <span className="text-blue-100">&mdash; (Brand New IM C3000)</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
              <span className="text-[11px] text-blue-100 block">
                Cheaper click rates (RM 0.035 B&amp;W) offset higher monthly rental
              </span>
            </div>
          </div>
        </section>

        {/* Visual Benchmarking: 36-Month Total Cost of Ownership (TCO) Projected Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">
                36-Month Total Cost of Ownership (TCO) Projected Distribution
              </h2>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-blue-600"></span> Rental Baseline
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-slate-400"></span> Estimated Click Usage (25k/mo)
              </span>
            </div>
          </div>

          {/* 6-Column Visual Bar Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
            {project.options.map(opt => {
              const metrics = calculateOptionMetrics(opt, project);
              const isWinner = opt.id === 'opt-ricoh-a';

              // Visual comparison delta vs Ricoh
              const ricohMetrics = calculateOptionMetrics(
                project.options.find(o => o.id === 'opt-ricoh-a') || project.options[0],
                project
              );
              const diffOutlay = metrics.threeYearOutlay - ricohMetrics.threeYearOutlay;

              return (
                <div
                  key={opt.id}
                  className={`p-3 rounded-lg flex flex-col gap-1.5 transition-all ${
                    isWinner
                      ? 'bg-blue-50/90 border-2 border-blue-600 shadow-xs'
                      : 'bg-slate-50 border border-slate-200/80 hover:bg-slate-100/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold truncate ${isWinner ? 'text-blue-900' : 'text-slate-800'}`}>
                      {opt.vendor.replace(' Malaysia', '').replace(' Electronics', '')}
                    </span>
                    <span
                      className={`text-[10px] px-1 rounded font-semibold ${
                        isWinner
                          ? 'bg-blue-600 text-white'
                          : opt.category === 'BRAND_NEW'
                          ? 'text-slate-500'
                          : 'text-emerald-700'
                      }`}
                    >
                      {isWinner ? 'RANK #1' : opt.category === 'BRAND_NEW' ? 'Brand New' : 'Refurbished'}
                    </span>
                  </div>

                  <div className={`font-mono font-bold text-sm ${isWinner ? 'text-blue-700' : 'text-slate-900'}`}>
                    {formatCurrency(metrics.threeYearOutlay, project.currency, 0)}
                  </div>

                  {/* Stacked TCO Visual Bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded flex overflow-hidden">
                    <div className="bg-blue-600 h-full" style={{ width: `${metrics.rentalSharePct}%` }} />
                    <div className="bg-slate-400 h-full" style={{ width: `${metrics.clicksSharePct}%` }} />
                  </div>

                  <span
                    className={`text-[11px] font-semibold ${
                      isWinner
                        ? 'text-blue-700'
                        : diffOutlay > 20000
                        ? 'text-rose-600'
                        : 'text-slate-500'
                    }`}
                  >
                    {isWinner
                      ? 'TCO Benchmark Winner'
                      : `+RM ${diffOutlay.toLocaleString()} vs Ricoh`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Filter Tabs & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {t.s3FilterAll} ({project.options.length})
            </button>

            <button
              onClick={() => setActiveFilter('brand-new')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeFilter === 'brand-new'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              🆕 {t.s3FilterBrandNew} ({project.options.filter(o => o.category === 'BRAND_NEW').length})
            </button>

            <button
              onClick={() => setActiveFilter('refurbished')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeFilter === 'refurbished'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              🔄 {t.s3FilterRefurbished} ({project.options.filter(o => o.category === 'REFURBISHED').length})
            </button>

            <button
              onClick={() => setActiveFilter('recommendations')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeFilter === 'recommendations'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              🏆 {t.s3FilterRecommended}
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              {language === 'ms'
                ? `Memaparkan ${visibleOptions.length} daripada ${project.options.length} Penyerahan`
                : `Displaying ${visibleOptions.length} of ${project.options.length} Submissions`}
            </span>
          </div>
        </div>

        {/* Comprehensive Matrix Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto custom-scroll w-full">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <th className="p-4 w-[240px] sticky left-0 bg-slate-50 z-20 border-r border-slate-200">
                    Evaluation Criteria / Metric
                  </th>
                  {visibleOptions.map(opt => {
                    const isWinner = opt.id === 'opt-ricoh-a';
                    return (
                      <th
                        key={opt.id}
                        className={`p-4 min-w-[200px] border-r border-slate-200 align-top ${
                          isWinner ? 'bg-blue-50/70' : ''
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className={`font-bold text-xs ${isWinner ? 'text-blue-900' : 'text-slate-900'}`}>
                              {opt.vendor}
                            </span>
                            {isWinner ? (
                              <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-bold uppercase">
                                RECOMMENDED
                              </span>
                            ) : opt.monthlyRental === 260 ? (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-bold">
                                LOW BASE
                              </span>
                            ) : null}
                          </div>
                          <span className={`text-[11px] font-medium ${isWinner ? 'text-blue-700' : 'text-slate-500'}`}>
                            {opt.label} &bull; {opt.category === 'BRAND_NEW' ? 'New' : 'Refurbished'}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs text-slate-800 font-medium">
                {/* Row 1: Machine Condition */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-600 sticky left-0 bg-white border-r border-slate-200 z-10">
                    1. Machine Condition
                  </td>
                  {visibleOptions.map(opt => (
                    <td key={opt.id} className={`p-4 border-r border-slate-200 ${opt.id === 'opt-ricoh-a' ? 'bg-blue-50/30' : ''}`}>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-semibold text-[11px] ${
                          opt.category === 'BRAND_NEW'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {opt.category === 'BRAND_NEW' ? '🆕 Brand New' : '🔄 Cert. Refurbished'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Row 2: Model */}
                <tr className="bg-slate-50/30 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-600 sticky left-0 bg-slate-50/50 border-r border-slate-200 z-10">
                    2. Proposed Hardware Model
                  </td>
                  {visibleOptions.map(opt => (
                    <td key={opt.id} className={`p-4 border-r border-slate-200 font-bold ${opt.id === 'opt-ricoh-a' ? 'bg-blue-50/30 text-blue-900' : 'text-slate-900'}`}>
                      {opt.model}
                    </td>
                  ))}
                </tr>

                {/* Row 3: Speed */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-600 sticky left-0 bg-white border-r border-slate-200 z-10">
                    3. Print &amp; Copy Speed (A4)
                  </td>
                  {visibleOptions.map(opt => (
                    <td key={opt.id} className={`p-4 border-r border-slate-200 font-mono font-semibold ${opt.id === 'opt-ricoh-a' ? 'bg-blue-50/30 text-blue-700' : ''}`}>
                      {opt.speed} ppm
                    </td>
                  ))}
                </tr>

                {/* Row 4: Monthly Base Rental */}
                <tr className="bg-slate-50/30 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-600 sticky left-0 bg-slate-50/50 border-r border-slate-200 z-10">
                    4. Monthly Base Rental
                  </td>
                  {visibleOptions.map(opt => {
                    const isMinNew = opt.monthlyRental === minBnRental && opt.category === 'BRAND_NEW';
                    const isMinOverall = opt.monthlyRental === minRental;

                    return (
                      <td key={opt.id} className={`p-4 border-r border-slate-200 font-mono ${opt.id === 'opt-ricoh-a' ? 'bg-blue-50/30' : ''}`}>
                        <div className="flex items-center justify-between gap-1">
                          <span className={`font-bold ${isMinOverall ? 'text-emerald-700 text-sm' : 'text-slate-900'}`}>
                            {formatCurrency(opt.monthlyRental, project.currency)}
                          </span>
                          {isMinNew && (
                            <span className="text-[10px] bg-blue-50 text-blue-700 px-1 py-0.5 rounded font-bold border border-blue-200">
                              Lowest New
                            </span>
                          )}
                          {isMinOverall && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1 py-0.5 rounded font-bold border border-emerald-200">
                              Best Overall
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Row 5: B&W Click */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-600 sticky left-0 bg-white border-r border-slate-200 z-10">
                    5. B&amp;W Click Rate (per page)
                  </td>
                  {visibleOptions.map(opt => {
                    const isLowest = opt.bwClick === minBwClick;
                    return (
                      <td key={opt.id} className={`p-4 border-r border-slate-200 font-mono ${opt.id === 'opt-ricoh-a' ? 'bg-blue-50/30' : ''}`}>
                        <div className="flex items-center justify-between gap-1">
                          <span className={`font-semibold ${isLowest ? 'text-blue-700 font-bold' : 'text-slate-800'}`}>
                            {formatCurrency(opt.bwClick, project.currency, 4)}
                          </span>
                          {isLowest && (
                            <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">
                              Lowest
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Row 6: Color Click */}
                <tr className="bg-slate-50/30 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-600 sticky left-0 bg-slate-50/50 border-r border-slate-200 z-10">
                    6. Color Click Rate (per page)
                  </td>
                  {visibleOptions.map(opt => {
                    const isLowest = opt.colorClick === minColorClick;
                    return (
                      <td key={opt.id} className={`p-4 border-r border-slate-200 font-mono ${opt.id === 'opt-ricoh-a' ? 'bg-blue-50/30' : ''}`}>
                        <div className="flex items-center justify-between gap-1">
                          <span className={`font-semibold ${isLowest ? 'text-blue-700 font-bold' : 'text-slate-800'}`}>
                            {formatCurrency(opt.colorClick, project.currency, 4)}
                          </span>
                          {isLowest && (
                            <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">
                              Lowest
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Row 7: Monthly Click Bill */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-600 sticky left-0 bg-white border-r border-slate-200 z-10">
                    7. Monthly Click Bill (20k B&amp;W + 5k Color)
                  </td>
                  {visibleOptions.map(opt => {
                    const metrics = calculateOptionMetrics(opt, project);
                    const isRicoh = opt.id === 'opt-ricoh-a';
                    return (
                      <td key={opt.id} className={`p-4 border-r border-slate-200 font-mono ${isRicoh ? 'bg-blue-50/30 font-bold text-blue-700' : 'text-slate-800'}`}>
                        {formatCurrency(metrics.monthlyClickBill, project.currency)}
                      </td>
                    );
                  })}
                </tr>

                {/* Row 8: Total Monthly TCO */}
                <tr className="bg-blue-50/20 font-bold hover:bg-blue-50/40 transition-colors">
                  <td className="p-4 font-extrabold text-slate-900 sticky left-0 bg-blue-50/60 border-r border-slate-200 z-10">
                    8. Total Est. Monthly TCO (Rental + Clicks)
                  </td>
                  {visibleOptions.map(opt => {
                    const metrics = calculateOptionMetrics(opt, project);
                    const isWinner = opt.id === 'opt-ricoh-a';

                    return (
                      <td key={opt.id} className={`p-4 border-r border-slate-200 font-mono ${isWinner ? 'bg-blue-100/50' : ''}`}>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1">
                            <span className={`text-sm ${isWinner ? 'text-blue-900 font-extrabold' : 'text-slate-900'}`}>
                              {formatCurrency(metrics.totalMonthlyTCO, project.currency)}
                            </span>
                            {isWinner && <Award className="w-4 h-4 text-amber-500 shrink-0" />}
                          </div>
                          {isWinner && (
                            <span className="text-[10px] text-blue-700 font-sans font-normal mt-0.5">
                              *(Adjusted Base: RM 3,380)
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Row 9: 3-Year Contract Outlay */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-600 sticky left-0 bg-white border-r border-slate-200 z-10">
                    9. 3-Year Contract Outlay (36 Months)
                  </td>
                  {visibleOptions.map(opt => {
                    const metrics = calculateOptionMetrics(opt, project);
                    const isWinner = opt.id === 'opt-ricoh-a';
                    return (
                      <td key={opt.id} className={`p-4 border-r border-slate-200 font-mono ${isWinner ? 'bg-blue-50/30 text-blue-900 font-bold' : 'text-slate-800 font-semibold'}`}>
                        {formatCurrency(metrics.threeYearOutlay, project.currency, 0)}
                      </td>
                    );
                  })}
                </tr>

                {/* Row 10: Toner & Consumables */}
                <tr className="bg-slate-50/30 hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-600 sticky left-0 bg-slate-50/50 border-r border-slate-200 z-10">
                    10. Toner &amp; Parts Inclusions
                  </td>
                  {visibleOptions.map(opt => (
                    <td key={opt.id} className={`p-4 border-r border-slate-200 text-xs ${opt.id === 'opt-ricoh-a' ? 'bg-blue-50/30 font-semibold text-blue-900' : 'text-slate-600'}`}>
                      {opt.tonerInclusion}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Collapsible Comprehensive SLA, Maintenance & Risk Accordion */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <button
            onClick={() => setSlaOpen(prev => !prev)}
            className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  📋 Comprehensive SLA, Maintenance &amp; Risk Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Commitment guarantees, uptime warranties, backup fleet, and financial solvency auditing
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
              <span>{slaOpen ? 'Collapse Details' : 'Expand Details'}</span>
              {slaOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {slaOpen && (
            <div className="overflow-x-auto custom-scroll w-full border-t border-slate-200">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold text-xs uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 w-[240px]">SLA &amp; Support Dimension</th>
                    {visibleOptions.map(opt => (
                      <th
                        key={opt.id}
                        className={`p-4 min-w-[180px] ${
                          opt.id === 'opt-ricoh-a' ? 'bg-blue-50 text-blue-900 font-bold' : ''
                        }`}
                      >
                        {opt.vendor} ({opt.model})
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                  {/* Row: Response Time */}
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-4 font-bold text-slate-600">On-Site Response Time</td>
                    {visibleOptions.map(opt => {
                      const isGuaranteed = opt.id === 'opt-ricoh-a';
                      const isSlow = opt.slaResponseNumHours && opt.slaResponseNumHours > 6;
                      return (
                        <td
                          key={opt.id}
                          className={`p-4 font-mono ${
                            isGuaranteed
                              ? 'bg-blue-50/40 font-bold text-blue-700'
                              : isSlow
                              ? 'text-rose-600 font-bold'
                              : ''
                          }`}
                        >
                          {opt.slaResponseTime}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Row: Uptime */}
                  <tr className="bg-slate-50/30 hover:bg-slate-50/60">
                    <td className="p-4 font-bold text-slate-600">Uptime Commitment (%)</td>
                    {visibleOptions.map(opt => (
                      <td
                        key={opt.id}
                        className={`p-4 font-mono ${
                          opt.id === 'opt-ricoh-a'
                            ? 'bg-blue-50/40 font-bold text-emerald-700'
                            : opt.uptimeCommitment >= 98
                            ? 'font-bold text-slate-900'
                            : 'text-slate-600'
                        }`}
                      >
                        {opt.uptimeCommitment.toFixed(1)}% {opt.id === 'opt-ricoh-a' ? '(High Tier)' : ''}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Backup Loaner Policy */}
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-4 font-bold text-slate-600">Backup / Loaner Machine Policy</td>
                    {visibleOptions.map(opt => (
                      <td
                        key={opt.id}
                        className={`p-4 ${
                          opt.id === 'opt-ricoh-a'
                            ? 'bg-blue-50/40 font-bold text-blue-900'
                            : opt.backupPolicy.includes('Not')
                            ? 'text-rose-600 font-semibold'
                            : ''
                        }`}
                      >
                        {opt.backupPolicy}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Downtime Penalty */}
                  <tr className="bg-slate-50/30 hover:bg-slate-50/60">
                    <td className="p-4 font-bold text-slate-600">Default / Downtime Penalty</td>
                    {visibleOptions.map(opt => (
                      <td
                        key={opt.id}
                        className={`p-4 ${
                          opt.id === 'opt-ricoh-a'
                            ? 'bg-blue-50/40 font-bold text-blue-900'
                            : opt.downtimePenalty.includes('No penalty')
                            ? 'text-rose-600 font-semibold'
                            : ''
                        }`}
                      >
                        {opt.downtimePenalty}
                      </td>
                    ))}
                  </tr>

                  {/* Row: Vendor Stability */}
                  <tr className="hover:bg-slate-50/60">
                    <td className="p-4 font-bold text-slate-600">Vendor Stability Rating</td>
                    {visibleOptions.map(opt => (
                      <td
                        key={opt.id}
                        className={`p-4 ${opt.id === 'opt-ricoh-a' ? 'bg-blue-50/40' : ''}`}
                      >
                        <span
                          className={`font-mono font-bold ${
                            opt.vendorRating.startsWith('AAA')
                              ? 'text-blue-700'
                              : 'text-slate-800'
                          }`}
                        >
                          {opt.vendorRating}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Boardroom Recommendation Callout Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
          {/* Left Blue Strategic Block */}
          <div className="bg-blue-700 text-white p-6 flex flex-col justify-between md:w-[320px] shrink-0 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-amber-300 text-xs uppercase tracking-wider font-bold">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Committee Consensus</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">Strategic Award Motion</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Unanimous recommendation formulated by Procurement, IT Infrastructure, and Group Financial Control.
              </p>
            </div>

            <div className="bg-blue-800/80 p-3.5 rounded-xl border border-blue-500/30 flex flex-col gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">
                Net Fleet Yield
              </span>
              <span className="text-2xl font-extrabold font-mono text-white">RM 14,040</span>
              <span className="text-[11px] text-blue-200">
                Total 3-Year Savings vs Nearest Equal Brand-New Bid
              </span>
            </div>
          </div>

          {/* Right Detailed Narrative & Signatures */}
          <div className="p-6 flex-1 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200 uppercase">
                  Option Recommended: Ricoh Malaysia (IM C3000 Brand New)
                </span>
                <span className="text-xs text-slate-500 font-medium">36-Month Term</span>
              </div>

              <div className="text-xs text-slate-700 space-y-2.5 leading-relaxed">
                <p>
                  While <strong>Sharp Electronics BP-50C31</strong> presents a lower upfront base rental of RM 420.00/month,{' '}
                  <strong>Ricoh Malaysia's IM C3000</strong> secures decisive mathematical dominance at our baseline volume of 25,000 monthly pages.
                  Ricoh's competitive per-click rates (<span className="font-semibold text-blue-700">RM 0.0350 B&amp;W</span> and{' '}
                  <span className="font-semibold text-blue-700">RM 0.3600 Color</span>) save approximately RM 250.00 every month in meterage fees alone.
                </p>
                <p>
                  Furthermore, Ricoh provides an unmatched direct OEM principal SLA offering a{' '}
                  <strong>4-hour guaranteed on-site response</strong>, <strong>98.5% operational uptime warranty</strong>, and a pre-staged replacement machine guarantee within 24 hours of unresolved hardware stoppage.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    JS
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    AL
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    MR
                  </div>
                </div>
                <div className="flex flex-col text-xs">
                  <span className="font-bold text-slate-900">3 Signatures Captured</span>
                  <span className="text-slate-500">CPO, VP Finance, Head of IT Ops</span>
                </div>
              </div>

              <button
                onClick={handleBoardroomSignoff}
                disabled={boardroomSigned}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm transition ${
                  boardroomSigned
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                }`}
              >
                {boardroomSigned ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Motion Submitted to Board</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit for Boardroom Signoff</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
