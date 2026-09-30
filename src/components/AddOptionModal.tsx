import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { OptionCategory, VendorOption } from '../types';

interface AddOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: string;
  onAddOption: (option: VendorOption) => void;
}

export const AddOptionModal: React.FC<AddOptionModalProps> = ({
  isOpen,
  onClose,
  currency,
  onAddOption,
}) => {
  const [vendor, setVendor] = useState('');
  const [category, setCategory] = useState<OptionCategory>('BRAND_NEW');
  const [model, setModel] = useState('');
  const [speed, setSpeed] = useState<number>(30);
  const [monthlyRental, setMonthlyRental] = useState<number>(380);
  const [bwClick, setBwClick] = useState<number>(0.035);
  const [colorClick, setColorClick] = useState<number>(0.350);
  const [duration, setDuration] = useState<number>(36);
  const [tonerInclusion, setTonerInclusion] = useState('100% Genuine OEM');
  const [sla, setSla] = useState('4-hour on-site guaranteed response, parts included');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendor || !model) return;

    const newOption: VendorOption = {
      id: `opt-custom-${Date.now()}`,
      vendor: vendor.trim(),
      vendorSubtext: 'Direct Tender Submission',
      category,
      label: category === 'BRAND_NEW' ? 'Option A (New)' : 'Option B (Refurbished)',
      model: model.trim(),
      speed: Number(speed) || 30,
      monthlyRental: Number(monthlyRental) || 0,
      bwClick: Number(bwClick) || 0,
      colorClick: Number(colorClick) || 0,
      contractDuration: Number(duration) || 36,
      tonerInclusion: tonerInclusion.trim() || 'Included',
      sla: sla.trim() || 'Standard Response SLA',
      slaTag: 'Standard SLA',
      isVerified: true,
      slaResponseTime: '4 Hours',
      slaResponseNumHours: 4,
      uptimeCommitment: 97.5,
      backupPolicy: 'Guaranteed within 48 hrs',
      downtimePenalty: '1% credit/hr',
      vendorRating: 'AA (Direct OEM)',
      isRecommended: false,
    };

    onAddOption(newOption);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-blue-600" />
            <span>Add Custom Vendor Option</span>
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Vendor Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={vendor}
                onChange={e => setVendor(e.target.value)}
                placeholder="e.g. Canon Marketing"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Option Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as OptionCategory)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium bg-slate-50"
              >
                <option value="BRAND_NEW">🆕 Brand New</option>
                <option value="REFURBISHED">🔄 Certified Refurbished</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Model &amp; Series <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={model}
                onChange={e => setModel(e.target.value)}
                placeholder="e.g. imageRUNNER ADV DX C3830i"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Print Speed (ppm)</label>
              <input
                type="number"
                required
                value={speed}
                onChange={e => setSpeed(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Monthly Rental ({currency})</label>
              <input
                type="number"
                step="0.01"
                required
                value={monthlyRental}
                onChange={e => setMonthlyRental(Number(e.target.value))}
                className="w-full px-2.5 py-2 border border-slate-300 rounded-lg font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">B&amp;W Click ({currency})</label>
              <input
                type="number"
                step="0.001"
                required
                value={bwClick}
                onChange={e => setBwClick(Number(e.target.value))}
                className="w-full px-2.5 py-2 border border-slate-300 rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Color Click ({currency})</label>
              <input
                type="number"
                step="0.001"
                required
                value={colorClick}
                onChange={e => setColorClick(Number(e.target.value))}
                className="w-full px-2.5 py-2 border border-slate-300 rounded-lg font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contract Duration (Months)</label>
              <select
                value={duration}
                onChange={e => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono bg-slate-50"
              >
                <option value={36}>36 Months</option>
                <option value={60}>60 Months</option>
                <option value={24}>24 Months</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Consumables / Inclusions</label>
              <input
                type="text"
                value={tonerInclusion}
                onChange={e => setTonerInclusion(e.target.value)}
                placeholder="100% Genuine OEM"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">SLA Commitment Summary</label>
            <input
              type="text"
              value={sla}
              onChange={e => setSla(e.target.value)}
              placeholder="e.g. 4-hour on-site response"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm shadow-blue-500/20 transition"
            >
              Save Option
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
