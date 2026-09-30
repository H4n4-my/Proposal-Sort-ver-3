import React from 'react';
import { Archive, X, Trash2, Calendar } from 'lucide-react';
import { SavedProjectRecord } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedProjects: SavedProjectRecord[];
  onLoadProject: (record: SavedProjectRecord) => void;
  onDeleteProject: (id: string, e: React.MouseEvent) => void;
  onClearAll: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedProjects,
  onLoadProject,
  onDeleteProject,
  onClearAll,
}) => {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 transition-opacity"
      />

      {/* Drawer Panel */}
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <Archive className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">{t.histTitle}</h2>
              <p className="text-xs text-slate-500">{t.histSubtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scroll">
          {savedProjects.length === 0 ? (
            <div className="text-center py-16 text-slate-400 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                <Archive className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-xs font-semibold text-slate-600">{t.histNoRecords}</p>
              <p className="text-[11px] text-slate-400 mt-1 max-w-xs">
                {language === 'ms'
                  ? 'Tekan "Simpan ke Firebase Cloud" pada Matriks Eksekutif untuk menyimpan rekod di sini.'
                  : 'Click "Save to Firebase Cloud" on the Executive Matrix to persist evaluations here.'}
              </p>
            </div>
          ) : (
            savedProjects.map(item => (
              <div
                key={item.id}
                onClick={() => onLoadProject(item)}
                className="p-3.5 bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 rounded-xl cursor-pointer transition flex items-center justify-between group shadow-2xs"
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900 group-hover:text-blue-700 truncate">
                      {item.title}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-slate-700 font-semibold">{item.refCode}</span>
                    <span>&bull;</span>
                    <span>{item.optionsCount} {t.histOptionsCount}</span>
                    {item.links && item.links.length > 0 && (
                      <>
                        <span>&bull;</span>
                        <span className="text-blue-600 font-medium">
                          {item.links.length} {language === 'ms' ? 'Pautan' : 'Links'}
                        </span>
                      </>
                    )}
                    {item.organization && (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                        {item.organization}
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>
                      {new Date(item.savedAt).toLocaleDateString(language === 'ms' ? 'ms-MY' : 'en-GB')} {new Date(item.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-semibold text-blue-600 bg-white group-hover:bg-blue-600 group-hover:text-white px-2 py-0.5 rounded border border-blue-200 group-hover:border-transparent transition">
                    {t.histLoadBtn}
                  </span>
                  <button
                    onClick={e => onDeleteProject(item.id, e)}
                    title={t.histDeleteBtn}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClearAll}
            disabled={savedProjects.length === 0}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 disabled:opacity-40 disabled:hover:text-rose-600 transition cursor-pointer"
          >
            {t.histClearAll}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-lg transition cursor-pointer"
          >
            {t.brClose}
          </button>
        </div>
      </aside>
    </>
  );
};
