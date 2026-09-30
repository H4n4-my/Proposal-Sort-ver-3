import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Wand2,
  FileText,
  UploadCloud,
  FileCheck2,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Info,
  Trash2,
  Building2,
  Link,
  Plus,
  ExternalLink,
  Cloud,
} from 'lucide-react';
import { TenderProject, QuotationLink, UserAccount } from '../types';
import {
  saveQuotationLinkToFirestore,
  deleteQuotationLinkFromFirestore,
  getQuotationLinksFromFirestore,
} from '../services/evaluationService';
import { useLanguage } from '../context/LanguageContext';

interface AttachedFile {
  id: string;
  name: string;
  size: string;
  date: string;
  vendor: string;
}

const DEFAULT_FILES: AttachedFile[] = [
  {
    id: 'f-1',
    name: 'Konica_Minolta_Tender_Proposal_C300i_C287.pdf',
    size: '2.4 MB',
    date: 'Received yesterday',
    vendor: 'Konica Minolta',
  },
  {
    id: 'f-2',
    name: 'Ricoh_Malaysia_Official_RFP_Response_2025.pdf',
    size: '3.1 MB',
    date: 'Received 2 days ago',
    vendor: 'Ricoh Malaysia',
  },
  {
    id: 'f-3',
    name: 'Sharp_Electronics_MFP_BP50C31_Quotation.pdf',
    size: '1.8 MB',
    date: 'Received today',
    vendor: 'Sharp Electronics',
  },
];

interface Screen1Props {
  project: TenderProject;
  onUpdateProjectMeta: (updates: Partial<TenderProject>) => void;
  onLoadSample: () => void;
  onExtractData: () => void;
  currentUser?: UserAccount | null;
  onShowToast?: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

export const Screen1Upload: React.FC<Screen1Props> = ({
  project,
  onUpdateProjectMeta,
  onLoadSample,
  onExtractData,
  currentUser,
  onShowToast,
}) => {
  const { t, language } = useLanguage();
  const [files, setFiles] = useState<AttachedFile[]>(DEFAULT_FILES);
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');
  const [newLinkVendor, setNewLinkVendor] = useState('Konica Minolta');
  const [showAddLink, setShowAddLink] = useState(false);
  const [isSavingLink, setIsSavingLink] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync saved quotation links from Firestore on mount
  React.useEffect(() => {
    async function loadCloudLinks() {
      try {
        const cloudLinks = await getQuotationLinksFromFirestore();
        if (cloudLinks && cloudLinks.length > 0) {
          const existingIds = new Set((project.links || []).map(l => l.id));
          const toAdd = cloudLinks.filter(cl => !existingIds.has(cl.id));
          if (toAdd.length > 0) {
            onUpdateProjectMeta({
              links: [...(project.links || []), ...toAdd],
            });
          }
        }
      } catch (err) {
        console.warn('Could not sync links from Firestore:', err);
      }
    }
    loadCloudLinks();
  }, []);

  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle.trim() || !newLinkUrl.trim()) return;

    setIsSavingLink(true);
    const newLink: QuotationLink = {
      id: `link-${Date.now()}`,
      title: newLinkTitle.trim(),
      url: newLinkUrl.trim(),
      vendor: newLinkVendor,
      uploadedAt: new Date().toLocaleDateString('ms-MY', { day: '2-digit', month: 'short', year: 'numeric' }),
      addedBy: currentUser ? `${currentUser.displayName}${currentUser.role ? ` (${currentUser.role})` : ''}` : 'Nur Fatihana (Executive)',
      organization: 'Media Prima Berhad',
    };

    try {
      // 1. Save directly into Firebase Firestore
      await saveQuotationLinkToFirestore(newLink);
      
      // 2. Update active project metadata
      const currentLinks = project.links || [];
      onUpdateProjectMeta({
        links: [newLink, ...currentLinks],
      });

      setNewLinkTitle('');
      setNewLinkUrl('');
      setShowAddLink(false);
      onShowToast?.(`Pautan sebut harga '${newLink.title}' berjaya disimpan ke Firebase!`, 'success');
    } catch (err: any) {
      console.error('Error saving link to Firebase:', err);
      // Fallback update in state
      const currentLinks = project.links || [];
      onUpdateProjectMeta({
        links: [newLink, ...currentLinks],
      });
      setNewLinkTitle('');
      setNewLinkUrl('');
      setShowAddLink(false);
      onShowToast?.('Pautan disimpan ke projek (mod sandaran).', 'info');
    } finally {
      setIsSavingLink(false);
    }
  };

  const handleRemoveLink = async (linkId: string) => {
    try {
      await deleteQuotationLinkFromFirestore(linkId);
      const currentLinks = project.links || [];
      onUpdateProjectMeta({
        links: currentLinks.filter(l => l.id !== linkId),
      });
      onShowToast?.('Pautan dipadam daripada Firebase Firestore.', 'info');
    } catch (err) {
      console.warn('Error deleting link from Firestore:', err);
      const currentLinks = project.links || [];
      onUpdateProjectMeta({
        links: currentLinks.filter(l => l.id !== linkId),
      });
      onShowToast?.('Pautan dipadam daripada projek.', 'info');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesAdded(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesAdded(Array.from(e.target.files));
    }
  };

  const handleFilesAdded = (newFiles: File[]) => {
    const formatted: AttachedFile[] = newFiles.map((f, idx) => ({
      id: `f-uploaded-${Date.now()}-${idx}`,
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      date: 'Just uploaded',
      vendor: f.name.includes('Canon')
        ? 'Canon'
        : f.name.includes('Xerox')
        ? 'Fuji Xerox'
        : 'Vendor Proposal',
    }));
    setFiles(prev => [...prev, ...formatted]);
  };

  const handleRemoveFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleExtractClick = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      onExtractData();
    }, 600);
  };

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      {/* Top Banner & Action */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.s1StageBadge}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {t.s1Title}
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            {t.s1Desc}
          </p>
        </div>

        <button
          onClick={onLoadSample}
          className="group inline-flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl shadow-xs transition hover:shadow-sm cursor-pointer"
        >
          <Wand2 className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform" />
          <span>{t.s1LoadSampleBtn}</span>
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Scope & Metadata */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-4">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>{t.s1ScopeParamsTitle}</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="projectTitle">
                  {language === 'ms' ? 'Tajuk Projek / Skop Tender' : 'Project / Scope Title'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="projectTitle"
                  value={project.title}
                  onChange={e => onUpdateProjectMeta({ title: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition"
                  placeholder={language === 'ms' ? 'cth: Ringkasan Sebut Harga Mesin MFP Media Prima' : 'e.g. Data Summarize On Proposal For MFP'}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="tenderRef">
                  {t.s1RefCode}
                </label>
                <input
                  type="text"
                  id="tenderRef"
                  value={project.refCode}
                  onChange={e => onUpdateProjectMeta({ refCode: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition"
                  placeholder="e.g. RFP-2025-MFP-HQ01"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="currencySelect">
                    {t.s1Currency}
                  </label>
                  <select
                    id="currencySelect"
                    value={project.currency}
                    onChange={e => onUpdateProjectMeta({ currency: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg font-medium text-slate-800"
                  >
                    <option value="RM">MYR (RM)</option>
                    <option value="USD">USD ($)</option>
                    <option value="SGD">SGD (S$)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="targetVolume">
                    {t.s1EstVolume}
                  </label>
                  <input
                    type="number"
                    id="targetVolume"
                    value={project.targetVolume}
                    onChange={e => onUpdateProjectMeta({ targetVolume: parseInt(e.target.value) || 25000 })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="fleetSize">
                  {t.s1FleetSize}
                </label>
                <input
                  type="number"
                  id="fleetSize"
                  value={project.fleetSize}
                  onChange={e => onUpdateProjectMeta({ fleetSize: parseInt(e.target.value) || 12 })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg font-mono text-slate-800"
                />
              </div>

              <div className="pt-2">
                <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs text-amber-900 flex items-start gap-2.5 leading-relaxed">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">
                      {language === 'ms' ? 'Logik Dwipilihan (Dual-Option): ' : 'Dual-Option Matrix Logic: '}
                    </span>
                    {language === 'ms'
                      ? 'Pembekal biasanya mengemukakan pilihan Mesin Baharu (kebolehpercayaan tinggi) dan Mesin Rekondisi Bertauliah bagi penjimatan kos serta merta.'
                      : 'Vendors typically present both Brand New (higher reliability, higher capex/rental) and Certified Refurbished options to offer immediate cost savings.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: PDF Ingestion & Files */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between min-h-[460px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>{t.s1AttachedFiles}</span>
                </h2>
                <span className="text-xs text-slate-400 font-medium">.PDF, .XLSX, .CSV</span>
              </div>

              {/* Interactive Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all group ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50/50'
                    : 'border-slate-300 hover:border-blue-400 bg-slate-50/60 hover:bg-blue-50/30'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept=".pdf,.doc,.docx,.xlsx"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white border border-slate-200 group-hover:border-blue-300 flex items-center justify-center text-slate-500 group-hover:text-blue-600 shadow-xs transition">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <p className="text-sm font-semibold text-slate-800">
                  {t.s1DropzoneTitle} &bull;{' '}
                  <span className="text-blue-600 hover:underline">{t.s1DropzoneBrowse}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  {t.s1DropzoneFormats}
                </p>
              </div>

              {/* Staged Files List */}
              <div className="mt-5 space-y-2">
                <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
                  {t.s1AttachedFiles} ({files.length}):
                </div>

                <div className="space-y-2">
                  {files.map(file => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs hover:border-blue-200 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                          <FileCheck2 className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <span className="font-semibold text-slate-800 block truncate">{file.name}</span>
                          <span className="text-[11px] text-slate-400">
                            {file.size} &bull; {file.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded text-[10px] border border-emerald-200">
                          {language === 'ms' ? 'Sedia Dianalisis' : 'Ready for Parser'}
                        </span>
                        <button
                          onClick={e => handleRemoveFile(file.id, e)}
                          title={language === 'ms' ? 'Buang Fail' : 'Remove File'}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Firebase Cloud Links Repository */}
              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      {t.s1QuotationLinks}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowAddLink(!showAddLink)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{showAddLink ? t.s1HideAddLink : t.s1AddLinkBtn}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 mb-2">
                  {t.s1QuotationLinksDesc}
                </p>

                {showAddLink && (
                  <form onSubmit={handleAddLink} className="p-3.5 mb-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs animate-in fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">{t.s1DocTitle}</label>
                        <input
                          type="text"
                          required
                          value={newLinkTitle}
                          onChange={e => setNewLinkTitle(e.target.value)}
                          placeholder={language === 'ms' ? 'cth: Ricoh Official RFP Response 2025' : 'e.g. Ricoh Official RFP Response 2025'}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">{t.s1Vendor}</label>
                        <select
                          value={newLinkVendor}
                          onChange={e => setNewLinkVendor(e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white font-medium"
                        >
                          <option value="Konica Minolta">Konica Minolta</option>
                          <option value="Ricoh Malaysia">Ricoh Malaysia</option>
                          <option value="Sharp Electronics">Sharp Electronics</option>
                          <option value="Canon Marketing">Canon Marketing</option>
                          <option value="Fuji Xerox">Fuji Xerox</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">{t.s1DocUrl}</label>
                      <input
                        type="url"
                        required
                        value={newLinkUrl}
                        onChange={e => setNewLinkUrl(e.target.value)}
                        placeholder="https://storage.googleapis.com/... atau https://drive.google.com/..."
                        className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white font-mono text-[11px]"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowAddLink(false)}
                        className="px-2.5 py-1 rounded-md text-slate-600 hover:bg-slate-200 cursor-pointer"
                      >
                        {t.s1HideAddLink}
                      </button>
                      <button
                        type="submit"
                        disabled={isSavingLink}
                        className="px-3.5 py-1 rounded-md bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold shadow-xs disabled:opacity-60 cursor-pointer"
                      >
                        {isSavingLink ? t.s1SavingLink : t.s1SaveLinkBtn}
                      </button>
                    </div>
                  </form>
                )}

                <div className="space-y-1.5">
                  {(project.links || []).length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic">
                      {language === 'ms' ? 'Tiada pautan dokumen disimpan lagi.' : 'No quotation links stored yet.'}
                    </p>
                  ) : (
                    (project.links || []).map(link => (
                      <div
                        key={link.id}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs hover:border-blue-200 transition"
                      >
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          <Link className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <div className="truncate">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-semibold text-blue-700 hover:underline inline-flex items-center gap-1 truncate"
                            >
                              <span>{link.title}</span>
                              <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                            </a>
                            <span className="text-[10px] text-slate-400 block truncate font-mono">
                              {link.vendor} &bull; {link.uploadedAt} {link.addedBy ? `&bull; ${link.addedBy}` : ''}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveLink(link.id)}
                          title={t.s1DeleteLink}
                          className="p-1 text-slate-400 hover:text-rose-600 transition shrink-0 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Media Prima Berhad &bull; Firebase Firestore Secured</span>
              </div>

              <button
                onClick={handleExtractClick}
                disabled={isExtracting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-sm shadow-blue-500/20 transition disabled:opacity-75 cursor-pointer"
              >
                <Cpu className={`w-4 h-4 ${isExtracting ? 'animate-spin' : ''}`} />
                <span>{isExtracting ? t.s1Extracting : t.s1ExtractBtn}</span>
                {!isExtracting && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
