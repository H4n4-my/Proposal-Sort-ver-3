import React from 'react';
import { RotateCcw, FolderOpen, Table, Check, Cloud, LogOut, Building2 } from 'lucide-react';
import { UserAccount } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  currentStep: number;
  onNavigateStep: (step: number) => void;
  scopeRef: string;
  savedCount: number;
  onOpenHistory: () => void;
  onResetSession: () => void;
  isCloudConnected?: boolean;
  currentUser?: UserAccount | null;
  onSignOut?: () => void;
  onOpenAuthModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onNavigateStep,
  scopeRef,
  savedCount,
  onOpenHistory,
  onResetSession,
  isCloudConnected = true,
  currentUser,
  onSignOut,
  onOpenAuthModal,
}) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-3.5 min-w-max">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">TenderTab</span>
              <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-blue-50 text-blue-700 rounded-full border border-blue-200/70 uppercase">
                v2.0 Executive
              </span>
              <span className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold bg-slate-100 text-slate-700 rounded-md border border-slate-200">
                <Building2 className="w-3 h-3 text-blue-600" />
                {t.brandTag}
              </span>
            </div>
            <p className="hidden md:block text-xs text-slate-500 font-medium truncate max-w-sm">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Stepper / Breadcrumbs */}
        <nav className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/70 text-xs font-semibold">
          <button
            onClick={() => onNavigateStep(1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentStep === 1
                ? 'bg-white text-blue-900 font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                currentStep > 1
                  ? 'bg-emerald-600 text-white'
                  : currentStep === 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-300 text-slate-700'
              }`}
            >
              {currentStep > 1 ? <Check className="w-2.5 h-2.5" /> : '1'}
            </span>
            <span>{t.step1}</span>
          </button>

          <span className="text-slate-300">/</span>

          <button
            onClick={() => onNavigateStep(2)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentStep === 2
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                currentStep === 2
                  ? 'bg-white text-blue-700'
                  : currentStep > 2
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-300 text-slate-700'
              }`}
            >
              {currentStep > 2 ? <Check className="w-2.5 h-2.5" /> : '2'}
            </span>
            <span>{t.step2}</span>
          </button>

          <span className="text-slate-300">/</span>

          <button
            onClick={() => onNavigateStep(3)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentStep === 3
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                currentStep === 3 ? 'bg-white text-blue-700' : 'bg-slate-300 text-slate-700'
              }`}
            >
              3
            </span>
            <span>{t.step3}</span>
          </button>
        </nav>

        {/* Right Tools, Language Switcher & User Info */}
        <div className="flex items-center gap-3 min-w-max">
          {/* Bilingual Language Switcher (BM / EN) */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg border border-slate-200/90 text-xs font-bold shadow-2xs">
            <button
              type="button"
              onClick={() => setLanguage('ms')}
              title="Tukar ke Bahasa Melayu"
              className={`px-2 py-1 rounded-md text-[11px] transition-all flex items-center gap-1 cursor-pointer ${
                language === 'ms'
                  ? 'bg-white text-blue-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>🇲🇾</span>
              <span>BM</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              title="Switch to English"
              className={`px-2 py-1 rounded-md text-[11px] transition-all flex items-center gap-1 cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-blue-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200 text-xs">
            <span className="text-[10px] font-semibold text-slate-500 uppercase">{t.scope}</span>
            <span className="font-mono font-semibold text-slate-800">{scopeRef}</span>
          </div>

          {/* Firebase Cloud Sync Badge */}
          <div
            title={isCloudConnected ? 'Connected to Firebase Firestore Cloud DB' : 'Connecting to Firebase...'}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold"
          >
            <Cloud className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isCloudConnected ? t.cloudSync : t.cloudConnecting}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>

          <button
            onClick={onOpenHistory}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 rounded-lg border border-slate-300 shadow-sm transition cursor-pointer"
          >
            <FolderOpen className="w-4 h-4 text-blue-600" />
            <span>{t.savedProjects}</span>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-700 border border-slate-200">
              {savedCount}
            </span>
          </button>

          <button
            onClick={onResetSession}
            title={t.resetSession}
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition border border-transparent hover:border-rose-200 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex flex-col text-right">
                <div className="flex items-center justify-end gap-1.5 leading-tight">
                  <span className="text-xs font-bold text-slate-900">
                    {currentUser.displayName}
                  </span>
                  {currentUser.role && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                      {currentUser.role}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 truncate max-w-[150px]">
                  {currentUser.department || 'Media Prima Berhad'}
                </span>
              </div>
              <div
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-900 to-indigo-800 text-white flex items-center justify-center text-xs font-bold shadow-sm ring-2 ring-blue-100"
                title={`${currentUser.displayName} (${currentUser.role || 'Pegawai'}) - ${currentUser.email}`}
              >
                {currentUser.displayName.slice(0, 2).toUpperCase()}
              </div>
              <button
                onClick={onSignOut}
                title={t.signOut}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="px-3 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition cursor-pointer"
            >
              {t.signInSignUp}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
