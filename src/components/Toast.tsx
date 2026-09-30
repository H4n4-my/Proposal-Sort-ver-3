import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => {
        const bgColors = {
          success: 'bg-emerald-900/95 text-white border-emerald-600',
          warning: 'bg-amber-900/95 text-white border-amber-600',
          error: 'bg-rose-900/95 text-white border-rose-600',
          info: 'bg-slate-900/95 text-white border-slate-700',
        };

        const icons = {
          success: <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />,
          warning: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />,
          error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
          info: <Info className="w-4 h-4 text-blue-400 shrink-0" />,
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold shadow-xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 ${bgColors[toast.type]}`}
          >
            {icons[toast.type]}
            <span className="max-w-xs">{toast.message}</span>
            <button
              onClick={() => onDismiss(toast.id)}
              className="ml-2 text-slate-400 hover:text-white transition"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
