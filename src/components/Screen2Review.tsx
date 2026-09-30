import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Search,
  Plus,
  ArrowRight,
  ArrowLeft,
  Save,
  Calculator,
  BellRing,
  Flag,
  Trash2,
} from 'lucide-react';
import { TenderProject, VendorOption } from '../types';
import { calculateOptionMetrics, formatCurrency } from '../utils/calculations';
import { useLanguage } from '../context/LanguageContext';

interface Screen2Props {
  project: TenderProject;
  onUpdateOption: (optionId: string, updates: Partial<VendorOption>) => void;
  onRemoveOption: (optionId: string) => void;
  onOpenAddModal: () => void;
  onNavigateStep: (step: number) => void;
  onShowToast: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
}

export const Screen2Review: React.FC<Screen2Props> = ({
  project,
  onUpdateOption,
  onRemoveOption,
  onOpenAddModal,
  onNavigateStep,
  onShowToast,
}) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [draftSaved, setDraftSaved] = useState(false);
  const [allVerifiedMode, setAllVerifiedMode] = useState(false);

  const brandNewOptions = project.options.filter(o => o.category === 'BRAND_NEW');
  const refurbishedOptions = project.options.filter(o => o.category === 'REFURBISHED');

  const filteredBrandNew = brandNewOptions.filter(o =>
    o.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.sla.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRefurbished = refurbishedOptions.filter(o =>
    o.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.sla.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate averages for section pills
  const avgBnRental =
    brandNewOptions.length > 0
      ? brandNewOptions.reduce((acc, o) => acc + o.monthlyRental, 0) / brandNewOptions.length
      : 0;

  const avgBnColor =
    brandNewOptions.length > 0
      ? brandNewOptions.reduce((acc, o) => acc + o.colorClick, 0) / brandNewOptions.length
      : 0;

  // Unresolved flagged fields count
  const flaggedCount = project.options.filter(o => o.hasFlaggedField && !o.flagResolved).length;

  const handleBatchVerify = () => {
    setAllVerifiedMode(true);
    project.options.forEach(o => {
      if (!o.hasFlaggedField) {
        onUpdateOption(o.id, { isVerified: true });
      }
    });
    onShowToast('All standard metrics marked verified and locked for formula audit.', 'success');
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    onShowToast('Draft evaluation state stored in local session.', 'info');
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const handleResolveFlag = (optionId: string, customMessage: string) => {
    onUpdateOption(optionId, {
      flagResolved: true,
      isVerified: true,
      notes: customMessage,
    });
    onShowToast(`Audit clause resolved: ${customMessage}`, 'success');
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Top Context Stream */}
      <div className="w-full bg-white shadow-xs border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 py-6 flex flex-col gap-4">
          {/* Stage Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-900 font-semibold uppercase tracking-wider text-[11px]">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                {t.s2StageBadge}
              </span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500 font-medium">Media Prima Berhad</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t.s2Confidence}: <strong className="text-slate-900">94.8%</strong></span>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">{language === 'ms' ? 'Disimpan: Baru sebentar tadi' : 'Last saved: Just now'}</span>
            </div>
          </div>

          {/* Title & Top Action Bar */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-3xl">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {t.s2Title}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                {t.s2Desc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Quick Search */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder={t.s2SearchPlaceholder}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                />
              </div>

              {/* Add Custom Option */}
              <button
                onClick={onOpenAddModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 shadow-xs transition cursor-pointer"
              >
                <Plus className="w-4 h-4 text-blue-600" />
                <span>{t.s2AddOptionBtn}</span>
              </button>

              {/* Generate Executive View */}
              <button
                onClick={() => onNavigateStep(3)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition cursor-pointer"
              >
                <span>{t.s2ProceedBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Verification Status Banner */}
          <div className="w-full bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 shrink-0">
                <BellRing className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-amber-950">
                    {flaggedCount > 0 ? `${flaggedCount} of 48 fields flagged for review` : 'All 48 fields verified and audited'}
                  </span>
                  {flaggedCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-[10px] font-bold">
                      Priority Triage
                    </span>
                  )}
                </div>
                <p className="text-xs text-amber-900/80 mt-0.5">
                  Review SLA response times and consumable coverage before finalizing. Confirmed values feed real-time TCO formulas in the Executive Matrix.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  const el = document.getElementById('flagged-card-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100/50 text-xs font-semibold shadow-xs transition"
              >
                Jump to Flagged Fields
              </button>
              <button
                onClick={handleBatchVerify}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition"
              >
                {allVerifiedMode ? 'All Verified ✓' : 'Mark All Non-Amber Verified'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas: Two Categorical Matrix Tiers */}
      <div className="max-w-[1600px] w-full mx-auto px-6 py-8 space-y-10">
        {/* SECTION 1: Brand New Machine Options */}
        <section className="space-y-4">
          {/* Section Divider & Metrics */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-bold shadow-xs">
                1
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>{t.s2BrandNewTab}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                    {brandNewOptions.length} {language === 'ms' ? 'Proposal' : 'Proposals'}
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  {language === 'ms'
                    ? 'Kitaran penggantian 5 tahun korporat. Alat ganti OEM penuh & kontrak penyelenggaraan langsung.'
                    : 'Standard corporate 5-year replacement cycle. Full OEM parts & direct maintenance contract.'}
                </p>
              </div>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>
                  Avg. Rental: <strong className="font-mono text-slate-900">{formatCurrency(avgBnRental, project.currency)}/mo</strong>
                </span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5 text-slate-600">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span>
                  Avg. Color Click: <strong className="font-mono text-slate-900">{formatCurrency(avgBnColor, project.currency, 3)}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* 3-Column Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBrandNew.map(opt => {
              const metrics = calculateOptionMetrics(opt, project);
              const isFlagged = opt.hasFlaggedField && !opt.flagResolved;

              return (
                <div
                  key={opt.id}
                  id={isFlagged ? 'flagged-card-section' : undefined}
                  className={`flex flex-col bg-white rounded-xl shadow-xs border transition-all overflow-hidden ${
                    isFlagged ? 'border-amber-300 shadow-amber-500/10' : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  {/* Top Accent Strip */}
                  <div className={`h-1.5 w-full ${isFlagged ? 'bg-amber-500' : 'bg-blue-600'}`} />

                  <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                    {/* Card Header */}
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            {opt.label}
                          </span>
                          <h3 className="text-base font-bold text-slate-900">{opt.vendor}</h3>
                          <span className="text-xs text-slate-500">{opt.vendorSubtext || 'Direct Manufacturer'}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {isFlagged ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-[10px] font-bold animate-pulse">
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              Action Required ⚠️
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Verified ✓
                            </span>
                          )}

                          <button
                            onClick={() => onRemoveOption(opt.id)}
                            title="Delete Option"
                            className="text-slate-300 hover:text-rose-600 p-1 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Visual Hardware Snapshot */}
                      <div className="relative w-full h-32 rounded-lg bg-slate-100 overflow-hidden border border-slate-200/80 mb-4 group">
                        {opt.imageUrl ? (
                          <img
                            src={opt.imageUrl}
                            alt={opt.model}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 font-mono text-xs">
                            {opt.model}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                          <span className="text-xs font-semibold text-white font-mono">
                            Model: {opt.model} ({opt.speed} ppm)
                          </span>
                        </div>
                      </div>

                      {/* Editable Form Inputs */}
                      <div className="space-y-3 text-xs">
                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-slate-500 font-medium mb-1">Print Speed</label>
                            <div className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-mono font-semibold text-slate-800">
                              {opt.speed} ppm
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-500 font-medium mb-1">Monthly Rental</label>
                            <div className="relative">
                              <span className="absolute left-2.5 top-1.5 text-slate-400 font-semibold font-mono">
                                {project.currency}
                              </span>
                              <input
                                type="number"
                                step="0.01"
                                value={opt.monthlyRental}
                                onChange={e => onUpdateOption(opt.id, { monthlyRental: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-9 pr-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold text-right focus:bg-white focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-slate-500 font-medium mb-1">B&amp;W Click Rate</label>
                            <div className="relative">
                              <span className="absolute left-2.5 top-1.5 text-slate-400 font-semibold font-mono">
                                {project.currency}
                              </span>
                              <input
                                type="number"
                                step="0.001"
                                value={opt.bwClick}
                                onChange={e => onUpdateOption(opt.id, { bwClick: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-9 pr-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-mono text-right focus:bg-white focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-500 font-medium mb-1">Color Click Rate</label>
                            <div className="relative">
                              <span className="absolute left-2.5 top-1.5 text-slate-400 font-semibold font-mono">
                                {project.currency}
                              </span>
                              <input
                                type="number"
                                step="0.001"
                                value={opt.colorClick}
                                onChange={e => onUpdateOption(opt.id, { colorClick: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-9 pr-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-mono text-right focus:bg-white focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-slate-500 font-medium mb-1">Contract Term</label>
                            <div className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-slate-800">
                              {opt.contractDuration} Months
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-500 font-medium mb-1">Toner &amp; Drums</label>
                            <input
                              type="text"
                              value={opt.tonerInclusion}
                              onChange={e => onUpdateOption(opt.id, { tonerInclusion: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-emerald-800 font-semibold text-xs focus:bg-white"
                            />
                          </div>
                        </div>

                        {/* SLA Specification or Soft Amber Flag */}
                        {isFlagged ? (
                          <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-300 shadow-xs space-y-2 mt-2">
                            <div className="flex items-center justify-between text-amber-900 font-semibold text-[11px]">
                              <span className="flex items-center gap-1">
                                <Flag className="w-3.5 h-3.5 text-amber-700" />
                                SLA Commitment (Tender Alert)
                              </span>
                              <span className="text-rose-700 font-bold">Non-Compliant</span>
                            </div>
                            <p className="text-slate-700 text-[11px] leading-snug">{opt.flagMessage}</p>
                            <div className="flex items-center justify-between pt-1 border-t border-amber-200/60">
                              <span className="text-[10px] text-slate-500">Review required:</span>
                              <button
                                onClick={() =>
                                  handleResolveFlag(opt.id, 'Confirmed 4-hr SLA upgrade (+RM 25/mo) included')
                                }
                                className="px-2.5 py-1 rounded bg-white hover:bg-emerald-50 text-slate-800 border border-slate-300 hover:border-emerald-400 text-[10px] font-bold transition shadow-xs"
                              >
                                {opt.flagActionLabel || 'Resolve Deviation'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1 mt-2">
                            <label className="block text-slate-500 font-medium flex items-center justify-between">
                              <span>SLA Commitment</span>
                              <span className="text-emerald-700 font-semibold text-[11px]">{opt.slaTag || '98% Uptime SLA'}</span>
                            </label>
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px] leading-snug">
                              {opt.sla}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Operational Footprint */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/70 -mx-5 -mb-5 px-5 py-3">
                      <span className="text-[11px] text-slate-500">
                        Est. {opt.contractDuration / 12}-Yr TCO ({project.targetVolume / 1000}k p/m)
                      </span>
                      <span className="font-mono font-bold text-slate-900 text-xs">
                        {formatCurrency(
                          opt.contractDuration === 60 ? metrics.fiveYearOutlay : metrics.threeYearOutlay,
                          project.currency
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: Certified Refurbished Machine Options */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-sm font-bold shadow-xs">
                2
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>{t.s2RefurbishedTab}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                    {refurbishedOptions.length} {language === 'ms' ? 'Proposal' : 'Proposals'}
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  {language === 'ms'
                    ? 'Pilihan sewaan fleksibel 36 bulan. Sesuai untuk pejabat satelit atau pemuliharaan bajet.'
                    : 'Agile 36-month lease alternatives. Optimal for satellite offices, rapid ramp-ups, or capital conservation.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-lg border border-emerald-200 text-xs font-semibold">
              <span>Average Capex Savings: Up to 38% vs. Brand New</span>
            </div>
          </div>

          {/* Refurbished Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRefurbished.map(opt => {
              const metrics = calculateOptionMetrics(opt, project);
              const isFlagged = opt.hasFlaggedField && !opt.flagResolved;

              return (
                <div
                  key={opt.id}
                  className={`flex flex-col bg-white rounded-xl shadow-xs border transition-all overflow-hidden ${
                    isFlagged ? 'border-amber-300 shadow-amber-500/10' : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className={`h-1.5 w-full ${isFlagged ? 'bg-amber-500' : 'bg-emerald-600'}`} />

                  <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            {opt.label}
                          </span>
                          <h3 className="text-base font-bold text-slate-900">{opt.vendor}</h3>
                          <span className="text-xs text-emerald-800 font-medium">{opt.vendorSubtext || 'Eco Fleet'}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {isFlagged ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-[10px] font-bold animate-pulse">
                              <AlertTriangle className="w-3 h-3 text-amber-600" />
                              Review SLA
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Verified ✓
                            </span>
                          )}

                          <button
                            onClick={() => onRemoveOption(opt.id)}
                            title="Delete Option"
                            className="text-slate-300 hover:text-rose-600 p-1 transition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Visual Hardware Snapshot */}
                      <div className="relative w-full h-32 rounded-lg bg-slate-100 overflow-hidden border border-slate-200/80 mb-4 group">
                        {opt.imageUrl ? (
                          <img
                            src={opt.imageUrl}
                            alt={opt.model}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-400 font-mono text-xs">
                            {opt.model}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2.5">
                          <span className="text-xs font-semibold text-white font-mono">
                            Model: {opt.model} ({opt.speed} ppm)
                          </span>
                        </div>
                      </div>

                      {/* Editable Form Inputs */}
                      <div className="space-y-3 text-xs">
                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-slate-500 font-medium mb-1">Print Speed</label>
                            <div className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-mono font-semibold text-slate-800">
                              {opt.speed} ppm
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-500 font-medium mb-1 flex items-center justify-between">
                              <span>Monthly Rental</span>
                              <span className="text-emerald-700 font-semibold text-[10px]">
                                {opt.monthlyRental === 260 ? 'Lowest' : '-38%'}
                              </span>
                            </label>
                            <div className="relative">
                              <span className="absolute left-2.5 top-1.5 text-slate-400 font-semibold font-mono">
                                {project.currency}
                              </span>
                              <input
                                type="number"
                                step="0.01"
                                value={opt.monthlyRental}
                                onChange={e => onUpdateOption(opt.id, { monthlyRental: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-9 pr-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-emerald-800 font-mono font-bold text-right focus:bg-white focus:ring-1 focus:ring-emerald-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-slate-500 font-medium mb-1">B&amp;W Click Rate</label>
                            <div className="relative">
                              <span className="absolute left-2.5 top-1.5 text-slate-400 font-semibold font-mono">
                                {project.currency}
                              </span>
                              <input
                                type="number"
                                step="0.001"
                                value={opt.bwClick}
                                onChange={e => onUpdateOption(opt.id, { bwClick: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-9 pr-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-mono text-right focus:bg-white focus:ring-1 focus:ring-emerald-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-500 font-medium mb-1">Color Click Rate</label>
                            <div className="relative">
                              <span className="absolute left-2.5 top-1.5 text-slate-400 font-semibold font-mono">
                                {project.currency}
                              </span>
                              <input
                                type="number"
                                step="0.001"
                                value={opt.colorClick}
                                onChange={e => onUpdateOption(opt.id, { colorClick: parseFloat(e.target.value) || 0 })}
                                className="w-full pl-9 pr-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-mono text-right focus:bg-white focus:ring-1 focus:ring-emerald-500"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-slate-500 font-medium mb-1">Contract Term</label>
                            <div className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 font-mono text-slate-800">
                              {opt.contractDuration} Months
                            </div>
                          </div>

                          <div>
                            <label className="block text-slate-500 font-medium mb-1">Parts Warranty</label>
                            <input
                              type="text"
                              value={opt.tonerInclusion}
                              onChange={e => onUpdateOption(opt.id, { tonerInclusion: e.target.value })}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 font-medium text-xs focus:bg-white"
                            />
                          </div>
                        </div>

                        {/* SLA Flag / Specification */}
                        {isFlagged ? (
                          <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-300 shadow-xs space-y-2 mt-2">
                            <div className="flex items-center justify-between text-amber-900 font-semibold text-[11px]">
                              <span className="flex items-center gap-1">
                                <Flag className="w-3.5 h-3.5 text-amber-700" />
                                SLA Window (Slow turnaround)
                              </span>
                              <span className="text-amber-800 font-bold">8-Hour Turnaround</span>
                            </div>
                            <p className="text-slate-700 text-[11px] leading-snug">{opt.flagMessage}</p>
                            <div className="flex items-center justify-between pt-1 border-t border-amber-200/60">
                              <span className="text-[10px] text-slate-500">Tender policy requires 4-hr:</span>
                              <button
                                onClick={() => handleResolveFlag(opt.id, 'Deviation approved by Procurement Director')}
                                className="px-2.5 py-1 rounded bg-white hover:bg-emerald-50 text-slate-800 border border-slate-300 hover:border-emerald-400 text-[10px] font-bold transition shadow-xs"
                              >
                                {opt.flagActionLabel || 'Authorize Deviation'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1 mt-2">
                            <label className="block text-slate-500 font-medium">SLA Commitment</label>
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-[11px] leading-snug">
                              {opt.sla}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/70 -mx-5 -mb-5 px-5 py-3">
                      <span className="text-[11px] text-slate-500">
                        Est. {opt.contractDuration / 12}-Yr TCO ({project.targetVolume / 1000}k p/m)
                      </span>
                      <span className="font-mono font-bold text-slate-900 text-xs">
                        {formatCurrency(metrics.threeYearOutlay, project.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footnote: TCO Formula Rigor */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-100">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">TCO Benchmark Logic Active</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Formula: [Monthly Rental &times; Months] + [(Monthly Mono Pages &times; RM Mono Click) + (Monthly Color Pages &times; RM Color Click)] &times; Months. Normalized across {project.targetVolume.toLocaleString()} monthly pages (80% mono, 20% color).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              Fiduciary Audit Ready
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Operational Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
        <div className="max-w-[1600px] mx-auto px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onNavigateStep(1)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Upload &amp; Scope</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>
              <strong className="text-slate-800 font-semibold">{project.options.length} Proposals Loaded</strong> (
              {brandNewOptions.length} Brand New, {refurbishedOptions.length} Refurbished)
            </span>
            <span className="text-slate-300">|</span>
            <span>
              Monthly Baseline: <strong className="text-slate-800">{project.targetVolume.toLocaleString()} pages</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200 transition"
            >
              <Save className="w-3.5 h-3.5 text-blue-600" />
              <span>{draftSaved ? 'Draft Saved ✓' : 'Save Draft'}</span>
            </button>

            <button
              onClick={() => onNavigateStep(3)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition"
            >
              <span>Proceed to Executive Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
