import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-white border-t border-slate-200/80 py-4 px-6 mt-auto">
      <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span>&copy; {new Date().getFullYear()} {t.footerRights}</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            ISO 9001 / SOC2
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <span className="inline-flex items-center gap-1 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            {t.footerSecurity}
          </span>
          <span className="text-slate-300">|</span>
          <span className="font-mono text-slate-500">Audit Hash: #0x92BF...E42</span>
        </div>
      </div>
    </footer>
  );
};
