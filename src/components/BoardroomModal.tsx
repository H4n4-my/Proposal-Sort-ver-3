import React from 'react';
import { X, Printer, CheckCircle, FileText, Building2 } from 'lucide-react';
import { TenderProject } from '../types';
import { calculateOptionMetrics, formatCurrency } from '../utils/calculations';
import { useLanguage } from '../context/LanguageContext';

interface BoardroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: TenderProject;
}

export const BoardroomModal: React.FC<BoardroomModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const isMs = language === 'ms';

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-150">
        {/* Modal Action Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {t.brTitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.brPrintBtn}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Boardroom Memorandum Document */}
        <div className="p-8 sm:p-10 space-y-6 text-slate-800 bg-white" id="boardroom-printable-area">
          {/* Memorandum Header */}
          <div className="border-b-2 border-slate-900 pb-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-widest mb-1">
                <Building2 className="w-4 h-4" />
                <span>{isMs ? 'Lembaga Penilaian Perolehan Eksekutif' : 'Executive Procurement Review Board'} &bull; Media Prima Berhad</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {isMs ? 'USUL STRATEGIK PEMBERIAN KONTRAK & PENANDA ARAS TCO' : 'STRATEGIC AWARD MOTION & TCO BENCHMARK'}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {t.brHeaderSubtitle}
              </p>
            </div>

            <div className="text-right text-xs space-y-1 font-mono">
              <div className="font-bold text-slate-900">REF: {project.refCode}</div>
              <div className="text-slate-500">
                {isMs ? 'Tarikh' : 'Date'}: {new Date().toLocaleDateString(isMs ? 'ms-MY' : 'en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <div className="text-slate-500">{isMs ? 'Skop' : 'Scope'}: {project.title}</div>
            </div>
          </div>

          {/* Key Executive Rationale */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs leading-relaxed space-y-2">
            <div className="font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>
                {isMs
                  ? 'Syor Sepakat Jawatankuasa: Ricoh Malaysia (IM C3000 Mesin Baharu)'
                  : 'Unanimous Committee Recommendation: Ricoh Malaysia (IM C3000 Brand New)'}
              </span>
            </div>
            <p className="text-blue-950">
              {isMs ? (
                <>
                  Dinilai merentasi kumpulan <strong>{project.fleetSize} unit</strong> mesin dengan volum asas bulanan sebanyak{' '}
                  <strong>{project.targetVolume.toLocaleString()} salinan</strong> (80% Hitam Putih / 20% Warna). Walaupun Sharp Electronics menawarkan sewa asas awal lebih rendah pada RM 420.00/bulan, Ricoh Malaysia memperoleh Kos Pemilikan Keseluruhan (TCO) 3 tahun terendah sebanyak <strong>RM 121,680</strong> (penjimatan <strong>RM 14,040</strong> berbanding bidaan mesin baharu terdekat) hasil daripada kadar klik yang kompetitif iaitu RM 0.0350 HP dan RM 0.3600 Warna.
                </>
              ) : (
                <>
                  Evaluated across a fleet of <strong>{project.fleetSize} units</strong> at a monthly baseline volume of{' '}
                  <strong>{project.targetVolume.toLocaleString()} copies</strong> (80% B&amp;W / 20% Color). While Sharp Electronics presented an initial lower base rental of RM 420.00/mo, Ricoh Malaysia secures the decisive lowest 3-year Total Cost of Ownership (TCO) of <strong>RM 121,680</strong> (saving <strong>RM 14,040</strong> against nearest equal new bids) due to premier meterage click rates of RM 0.0350 B&amp;W and RM 0.3600 Color.
                </>
              )}
            </p>
          </div>

          {/* TCO Matrix Summary Table */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              {isMs ? 'Jadual Matriks Penilaian Pelbagai Opsyen' : 'Tabulated Multi-Option Evaluation Matrix'}
            </h2>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-2.5">{isMs ? 'Opsyen Pembekal' : 'Vendor Option'}</th>
                    <th className="p-2.5">{isMs ? 'Keadaan' : 'Condition'}</th>
                    <th className="p-2.5 font-mono">{isMs ? 'Sewa Bulanan' : 'Monthly Base'}</th>
                    <th className="p-2.5 font-mono">{isMs ? 'Klik HP' : 'B&W Click'}</th>
                    <th className="p-2.5 font-mono">{isMs ? 'Klik Warna' : 'Color Click'}</th>
                    <th className="p-2.5 font-mono">{isMs ? 'TCO Bulanan' : 'Monthly TCO'}</th>
                    <th className="p-2.5 font-mono">{isMs ? 'TCO 3 Tahun' : '3-Yr Contract Outlay'}</th>
                    <th className="p-2.5">{isMs ? 'Masa SLA' : 'SLA Response'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {project.options.map(opt => {
                    const metrics = calculateOptionMetrics(opt, project);
                    const isWinner = opt.id === 'opt-ricoh-a';

                    return (
                      <tr key={opt.id} className={isWinner ? 'bg-blue-50/80 font-bold' : ''}>
                        <td className="p-2.5">
                          <span className={isWinner ? 'text-blue-900' : 'text-slate-800'}>
                            {opt.vendor} ({opt.model})
                          </span>
                        </td>
                        <td className="p-2.5">
                          {opt.category === 'BRAND_NEW' 
                            ? (isMs ? 'Mesin Baharu' : 'Brand New')
                            : (isMs ? 'Rekondisi' : 'Refurbished')}
                        </td>
                        <td className="p-2.5 font-mono">{formatCurrency(opt.monthlyRental, project.currency)}</td>
                        <td className="p-2.5 font-mono">{formatCurrency(opt.bwClick, project.currency, 3)}</td>
                        <td className="p-2.5 font-mono">{formatCurrency(opt.colorClick, project.currency, 3)}</td>
                        <td className="p-2.5 font-mono text-blue-900 font-bold">
                          {formatCurrency(metrics.totalMonthlyTCO, project.currency)}
                        </td>
                        <td className="p-2.5 font-mono">
                          {formatCurrency(metrics.threeYearOutlay, project.currency, 0)}
                        </td>
                        <td className="p-2.5">{opt.slaResponseTime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* SLA & Risk Warranties */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="font-bold text-slate-800 block">
                {isMs ? 'Jaminan Uptime & Gantian Sementara' : 'Uptime & Replacement Warranties'}
              </span>
              <p className="text-slate-600">
                {isMs
                  ? 'Jaminan masa tindak balas 4 jam di tapak, 98.5% komitmen uptime SLA, dan penyediaan unit gantian dalam 24 jam sekiranya kerosakan tidak dapat diselesaikan.'
                  : 'Guaranteed 4-hour on-site response time, 98.5% uptime SLA, and guaranteed loaner unit dispatch within 24 hours of unresolved fault.'}
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="font-bold text-slate-800 block">
                {isMs ? 'Skop Bahan Habis & Penyelenggaraan' : 'Consumables & Maintenance Scope'}
              </span>
              <p className="text-slate-600">
                {isMs
                  ? '100% alat ganti tulen OEM, fuser, kotak buangan toner, dan dram termasuk penghantaran automatik berasaskan IoT.'
                  : '100% Genuine OEM parts, fuser, waste boxes, and drum coverage included with automated IoT replenishment.'}
              </p>
            </div>
          </div>

          {/* Signatures Block */}
          <div className="pt-6 border-t-2 border-slate-900">
            <div className="grid grid-cols-3 gap-6 text-xs text-center">
              <div className="space-y-4">
                <div className="font-serif italic text-slate-700 text-sm">Nur Fatihana</div>
                <div className="border-t border-slate-300 pt-1">
                  <strong className="block text-slate-800">Executive, Procurement</strong>
                  <span className="text-[11px] text-slate-500">Group Sourcing &amp; Procurement</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="font-serif italic text-slate-700 text-sm">A. Lim</div>
                <div className="border-t border-slate-300 pt-1">
                  <strong className="block text-slate-800">VP Financial Control</strong>
                  <span className="text-[11px] text-slate-500">Group Finance &amp; Audit</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="font-serif italic text-slate-700 text-sm">M. Razak</div>
                <div className="border-t border-slate-300 pt-1">
                  <strong className="block text-slate-800">Head of IT Infrastructure</strong>
                  <span className="text-[11px] text-slate-500">Digital Workplace Operations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
