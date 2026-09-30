export type Language = 'ms' | 'en';

export interface TranslationDictionary {
  // Navigation & Header
  appTitle: string;
  appSubtitle: string;
  brandTag: string;
  step1: string;
  step2: string;
  step3: string;
  scope: string;
  cloudSync: string;
  cloudConnecting: string;
  savedProjects: string;
  resetSession: string;
  resetConfirm: string;
  signInSignUp: string;
  signOut: string;
  switchLang: string;

  // Screen 1: Upload & Parameters
  s1StageBadge: string;
  s1Title: string;
  s1Desc: string;
  s1LoadSampleBtn: string;
  s1DropzoneTitle: string;
  s1DropzoneSub: string;
  s1DropzoneBrowse: string;
  s1DropzoneFormats: string;
  s1AttachedFiles: string;
  s1QuotationLinks: string;
  s1QuotationLinksDesc: string;
  s1AddLinkBtn: string;
  s1HideAddLink: string;
  s1DocTitle: string;
  s1DocUrl: string;
  s1Vendor: string;
  s1SaveLinkBtn: string;
  s1SavingLink: string;
  s1OpenLink: string;
  s1DeleteLink: string;
  s1AddedBy: string;
  s1ScopeParamsTitle: string;
  s1ScopeParamsDesc: string;
  s1RefCode: string;
  s1Currency: string;
  s1EstVolume: string;
  s1FleetSize: string;
  s1MonoColorRatio: string;
  s1Mono: string;
  s1Color: string;
  s1ExtractBtn: string;
  s1Extracting: string;

  // Screen 2: Review & Normalization
  s2StageBadge: string;
  s2BatchId: string;
  s2Confidence: string;
  s2Title: string;
  s2Desc: string;
  s2SearchPlaceholder: string;
  s2AddOptionBtn: string;
  s2SaveDraftBtn: string;
  s2DraftSaved: string;
  s2ProceedBtn: string;
  s2BrandNewTab: string;
  s2RefurbishedTab: string;
  s2MonthlyRental: string;
  s2MonoClick: string;
  s2ColorClick: string;
  s2Speed: string;
  s2SlaResponse: string;
  s2Uptime: string;
  s2TonerIncluded: string;
  s2ContractDuration: string;
  s2AuditFlags: string;
  s2ResolveFlag: string;
  s2FlagResolved: string;
  s2VerifyAll: string;
  s2OptionVerified: string;
  s2DeleteOption: string;

  // Screen 3: Executive Matrix
  s3StageBadge: string;
  s3TcoAudited: string;
  s3BlindReview: string;
  s3Title: string;
  s3Desc: string;
  s3FilterAll: string;
  s3FilterBrandNew: string;
  s3FilterRefurbished: string;
  s3FilterRecommended: string;
  s3BestOverallPick: string;
  s3BudgetPick: string;
  s3PremiumPick: string;
  s3MonthlyCost: string;
  s33YrContract: string;
  s3Savings: string;
  s3ComparisonTable: string;
  s3ModelVendor: string;
  s3Category: string;
  s3RentalMo: string;
  s3ClickCostMo: string;
  s3TotalMo: string;
  s3ContractTco: string;
  s3DeltaAvg: string;
  s3SlaMatrixTitle: string;
  s3SlaMatrixDesc: string;
  s3ResponseTime: string;
  s3UptimeCommitment: string;
  s3BackupPolicy: string;
  s3DowntimePenalty: string;
  s3VendorRating: string;
  s3ExportExcel: string;
  s3SaveCloud: string;
  s3SavedCloud: string;
  s3BoardroomPresentation: string;
  s3SubmitSignoff: string;
  s3SignoffDone: string;

  // Auth Modal
  authBadge: string;
  authSignInTab: string;
  authSignUpTab: string;
  authWelcomeBack: string;
  authRegisterNew: string;
  authManualSubtitle: string;
  authQuickDemoTitle: string;
  authQuickDemoTag: string;
  authInstantLoginBtn: string;
  authLoggingIn: string;
  authAutofillPrompt: string;
  authFullName: string;
  authFullNamePlaceholder: string;
  authEmail: string;
  authDepartment: string;
  authPassword: string;
  authPasswordPlaceholder: string;
  authSignInBtn: string;
  authSignUpBtn: string;
  authProcessing: string;
  authFooterProtected: string;
  authSignOutConfirm: string;
  authSignOutSuccess: string;

  // Boardroom Modal
  brTitle: string;
  brPrintBtn: string;
  brClose: string;
  brHeaderSubtitle: string;
  brExecutiveSummary: string;
  brEvaluationScope: string;
  brRecommendedAward: string;
  brFinancialComparison: string;
  brSlaCompliance: string;
  brSignoffCommittee: string;
  brSignDate: string;
  brSignature: string;

  // History Drawer
  histTitle: string;
  histSubtitle: string;
  histNoRecords: string;
  histLoadBtn: string;
  histDeleteBtn: string;
  histClearAll: string;
  histConfirmClear: string;
  histSavedOn: string;
  histOptionsCount: string;

  // Footer
  footerRights: string;
  footerSecurity: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  ms: {
    // Navigation & Header
    appTitle: 'TenderTab',
    appSubtitle: 'Penilaian & Penanda Aras Sebut Harga Tender Korporat',
    brandTag: 'Media Prima Berhad',
    step1: '1. Muat Naik & Ekstrak',
    step2: '2. Semakan Mengikut Kategori',
    step3: '3. Matriks Eksekutif',
    scope: 'Skop',
    cloudSync: 'Firebase Awan',
    cloudConnecting: 'Menyambung...',
    savedProjects: 'Projek Disimpan',
    resetSession: 'Set Semula Sesi',
    resetConfirm: 'Adakah anda pasti mahu mengosongkan sesi tender semasa?',
    signInSignUp: 'Log Masuk / Daftar',
    signOut: 'Log Keluar',
    switchLang: 'Tukar Bahasa / Switch Language',

    // Screen 1: Upload & Parameters
    s1StageBadge: 'Peringkat 1: Pengambilan Dokumen & Tetapan Sebut Harga',
    s1Title: 'Pengekstrakan Data RFP Pelbagai Pembekal',
    s1Desc: 'Konfigurasikan metadata projek dan muat naik dokumen sebut harga pembekal MFP atau suntik data penanda aras rasmi.',
    s1LoadSampleBtn: 'Muat Data Contoh Rasmi (3 Pembekal)',
    s1DropzoneTitle: 'Muat Naik Dokumen Sebut Harga & RFP (PDF / Excel)',
    s1DropzoneSub: 'Seret dan lepas dokumen di sini, atau klik untuk memilih fail daripada komputer anda.',
    s1DropzoneBrowse: 'Pilih Dokumen',
    s1DropzoneFormats: 'Menyokong PDF, XLS, XLSX, CSV, DOCX (Maksimum 25MB setiap fail)',
    s1AttachedFiles: 'Dokumen Sebut Harga Dimuat Naik',
    s1QuotationLinks: 'Pautan Dokumen & Sebut Harga (Firebase Firestore Cloud)',
    s1QuotationLinksDesc: 'Semua pautan disimpan terus ke pangkalan data awan Firebase Firestore untuk akses pelbagai pegawai.',
    s1AddLinkBtn: 'Tambah Pautan Sebut Harga / Cloud Storage',
    s1HideAddLink: 'Batal',
    s1DocTitle: 'Tajuk Dokumen / Sebut Harga',
    s1DocUrl: 'URL Pautan (Google Drive, Cloud Storage, PDF Awam)',
    s1Vendor: 'Nama Pembekal / Syarikat',
    s1SaveLinkBtn: 'Simpan Pautan ke Firebase',
    s1SavingLink: 'Menyimpan ke Awan...',
    s1OpenLink: 'Buka Dokumen',
    s1DeleteLink: 'Padam Pautan',
    s1AddedBy: 'Ditambah oleh',
    s1ScopeParamsTitle: 'Parameter Skop Tender Korporat',
    s1ScopeParamsDesc: 'Tetapan asas bagi pengiraan volum cetakan bulanan dan saiz perolehan sewa.',
    s1RefCode: 'Kod Rujukan Tender',
    s1Currency: 'Mata Wang Penilaian',
    s1EstVolume: 'Anggaran Cetakan Bulanan (Keping)',
    s1FleetSize: 'Saiz Unit Mesin (HQ Media Prima)',
    s1MonoColorRatio: 'Nisbah Cetakan Hitam Putih / Warna',
    s1Mono: 'Hitam Putih (Mono)',
    s1Color: 'Warna (Color)',
    s1ExtractBtn: 'Ekstrak & Teruskan ke Semakan Opsyen',
    s1Extracting: 'Mengekstrak Data...',

    // Screen 2: Review & Normalization
    s2StageBadge: 'Peringkat 2: Penyeragaman & Verifikasi Proposal',
    s2BatchId: 'Kelompok ID #PAR-8921-X',
    s2Confidence: 'Ketepatan Ekstraksi',
    s2Title: 'Semakan Manusia Mengikut Kategori & Verifikasi Medan',
    s2Desc: 'Semak dan laraskan metrik sebut harga merentasi 3 pembekal dan 6 pilihan. Garisan jingga menandakan medan yang memerlukan pengesahan pegawai.',
    s2SearchPlaceholder: 'Cari pembekal, model, SLA...',
    s2AddOptionBtn: 'Tambah Opsyen Baharu',
    s2SaveDraftBtn: 'Simpan Draf Sesi',
    s2DraftSaved: 'Draf Disimpan!',
    s2ProceedBtn: 'Buka Matriks Perbandingan Eksekutif',
    s2BrandNewTab: 'Mesin Baharu (Brand New)',
    s2RefurbishedTab: 'Mesin Rekondisi (Refurbished)',
    s2MonthlyRental: 'Sewa Bulanan / Unit',
    s2MonoClick: 'Caj Klik Mono / Helaian',
    s2ColorClick: 'Caj Klik Warna / Helaian',
    s2Speed: 'Kelajuan Enjin (PPM)',
    s2SlaResponse: 'Masa Tindak Balas SLA',
    s2Uptime: 'Jaminan Uptime',
    s2TonerIncluded: 'Kemasukan Toner',
    s2ContractDuration: 'Tempoh Kontrak (Bulan)',
    s2AuditFlags: 'Audit Klausa Sebut Harga',
    s2ResolveFlag: 'Sahkan & Selesaikan Isu',
    s2FlagResolved: 'Telah Disahkan & Diluluskan',
    s2VerifyAll: 'Tandakan Semua Sebagai Disahkan',
    s2OptionVerified: 'Disahkan Oleh Pegawai',
    s2DeleteOption: 'Padam Opsyen Ini',

    // Screen 3: Executive Matrix
    s3StageBadge: 'Peringkat 3: Penilaian C-Level & Matriks Keputusan',
    s3TcoAudited: 'TCO Kontrak 3 Tahun Diaudit',
    s3BlindReview: 'Semakan Bebas Pelbagai Pembekal',
    s3Title: 'Jadual Perbandingan Eksekutif & Penanda Aras TCO',
    s3Desc: 'Analisis kewangan menyeluruh, perbandingan caj sewa, kos klik cetakan, dan komitmen SLA perkhidmatan pembekal bagi Media Prima Berhad.',
    s3FilterAll: 'Semua 6 Opsyen',
    s3FilterBrandNew: 'Mesin Baharu Sahaja',
    s3FilterRefurbished: 'Mesin Rekondisi Sahaja',
    s3FilterRecommended: 'Pilihan Disyorkan',
    s3BestOverallPick: 'Pilihan Terbaik Keseluruhan (TCO Terendah)',
    s3BudgetPick: 'Pilihan Mesra Bajet (Rekondisi)',
    s3PremiumPick: 'Pilihan Mesin Baharu Terulung',
    s3MonthlyCost: 'Kos Bulanan Bersih',
    s33YrContract: 'Jumlah Kontrak (3 Tahun)',
    s3Savings: 'Penjimatan Berbanding Purata',
    s3ComparisonTable: 'Jadual Perbandingan Terperinci & TCO',
    s3ModelVendor: 'Model & Pembekal',
    s3Category: 'Kategori',
    s3RentalMo: 'Sewa Bulanan',
    s3ClickCostMo: 'Kos Klik Bulanan',
    s3TotalMo: 'Jumlah Anggaran Bulanan',
    s3ContractTco: 'Jumlah TCO (3 Tahun)',
    s3DeltaAvg: 'Perbezaan vs Purata',
    s3SlaMatrixTitle: 'Matriks Penanda Aras SLA & Komitmen Servis',
    s3SlaMatrixDesc: 'Perbandingan jaminan masa tindak balas di tapak, unit gantian kecemasan, dan penalti kelewatan pembekal.',
    s3ResponseTime: 'Masa Tindak Balas Di Tapak',
    s3UptimeCommitment: 'Komitmen Uptime Enjin',
    s3BackupPolicy: 'Dasar Mesin Gantian Sementara',
    s3DowntimePenalty: 'Penalti Gangguan Perkhidmatan',
    s3VendorRating: 'Penarafan Prinsipal',
    s3ExportExcel: 'Eksport Excel (.xlsx)',
    s3SaveCloud: 'Simpan ke Firebase Cloud',
    s3SavedCloud: 'Tersimpan di Firebase!',
    s3BoardroomPresentation: 'Paparan Bilik Mesyuarat (Boardroom)',
    s3SubmitSignoff: 'Hantar Kelulusan Jawatankuasa',
    s3SignoffDone: 'Usul Telah Dihantar!',

    // Auth Modal
    authBadge: 'Media Prima Berhad',
    authSignInTab: 'Log Masuk (Sign In)',
    authSignUpTab: 'Daftar Akaun (Sign Up)',
    authWelcomeBack: 'Log Masuk Pengguna',
    authRegisterNew: 'Daftar Pengguna Baharu',
    authManualSubtitle: 'Akaun rasmi di bawah Media Prima Berhad',
    authQuickDemoTitle: 'Akses Pantas Akaun Contoh (Demo)',
    authQuickDemoTag: 'Pengujian Pantas',
    authInstantLoginBtn: 'Log Masuk Terus: Nur Fatihana (Executive)',
    authLoggingIn: 'Sedang Log Masuk...',
    authAutofillPrompt: 'atau isi maklumat akaun ini ke dalam borang di bawah',
    authFullName: 'Nama Penuh Pegawai',
    authFullNamePlaceholder: 'cth: Nur Fatihana',
    authEmail: 'Alamat Emel Korporat',
    authDepartment: 'Bahagian / Jabatan',
    authPassword: 'Kata Laluan',
    authPasswordPlaceholder: 'Minima 6 aksara',
    authSignInBtn: 'Log Masuk Media Prima',
    authSignUpBtn: 'Daftar Akaun Media Prima',
    authProcessing: 'Sedang Memproses...',
    authFooterProtected: 'Hak Milik Terpelihara Media Prima Berhad • Dilindungi Firebase',
    authSignOutConfirm: 'Adakah anda pasti mahu log keluar?',
    authSignOutSuccess: 'Anda telah log keluar daripada sistem Media Prima Berhad.',

    // Boardroom Modal
    brTitle: 'Pratonton & Cetakan Dosir Eksekutif Lembaga Pengarah',
    brPrintBtn: 'Cetak / Simpan PDF',
    brClose: 'Tutup',
    brHeaderSubtitle: 'Kertas Cadangan Perolehan Mesin Multi-Function Printer (MFP) HQ Media Prima Berhad',
    brExecutiveSummary: 'Ringkasan Eksekutif & Cadangan Pemilihan',
    brEvaluationScope: 'Skop Penilaian & Parameter Volum',
    brRecommendedAward: 'Cadangan Pemberian Kontrak Tender',
    brFinancialComparison: 'Perbandingan Kewangan & Analisis TCO 3 Tahun',
    brSlaCompliance: 'Pematuhan Tahap Perkhidmatan (SLA)',
    brSignoffCommittee: 'Tandatangan Jawatankuasa Penilaian Tender',
    brSignDate: 'Tarikh Kelulusan',
    brSignature: 'Tandatangan Pegawai',

    // History Drawer
    histTitle: 'Rekod Penilaian Tender Tersimpan',
    histSubtitle: 'Diselaraskan ke Firebase Firestore Cloud DB',
    histNoRecords: 'Tiada projek tersimpan dijumpai.',
    histLoadBtn: 'Muat Projek',
    histDeleteBtn: 'Padam',
    histClearAll: 'Kosongkan Semua',
    histConfirmClear: 'Adakah anda pasti mahu memadam semua rekod?',
    histSavedOn: 'Disimpan pada',
    histOptionsCount: 'Opsyen Sebut Harga',

    // Footer
    footerRights: 'TenderTab Procurement Systems • Media Prima Berhad',
    footerSecurity: 'Disulitkan & Dilindungi Firebase Cloud',
  },

  en: {
    // Navigation & Header
    appTitle: 'TenderTab',
    appSubtitle: 'Multi-Option MFP Tender Evaluation & Benchmarking',
    brandTag: 'Media Prima Berhad',
    step1: '1. Upload & Extract',
    step2: '2. Categorized Review',
    step3: '3. Executive Matrix',
    scope: 'Scope',
    cloudSync: 'Firebase Cloud',
    cloudConnecting: 'Connecting...',
    savedProjects: 'Saved Projects',
    resetSession: 'Reset Session',
    resetConfirm: 'Are you sure you want to reset the current tender session?',
    signInSignUp: 'Sign In / Sign Up',
    signOut: 'Sign Out',
    switchLang: 'Switch Language / Tukar Bahasa',

    // Screen 1: Upload & Parameters
    s1StageBadge: 'Stage 1: Ingestion & Proposal Setup',
    s1Title: 'Multi-Vendor RFP Data Extraction',
    s1Desc: 'Configure project metadata and upload MFP vendor quotation documents or inject official benchmark evaluation data.',
    s1LoadSampleBtn: 'Load Official Sample Data (3 Vendors)',
    s1DropzoneTitle: 'Upload Quotation Documents & RFP (PDF / Excel)',
    s1DropzoneSub: 'Drag and drop documents here, or click to choose files from your computer.',
    s1DropzoneBrowse: 'Browse Documents',
    s1DropzoneFormats: 'Supports PDF, XLS, XLSX, CSV, DOCX (Max 25MB per file)',
    s1AttachedFiles: 'Uploaded Quotation Documents',
    s1QuotationLinks: 'Document & Quotation Links (Firebase Firestore Cloud)',
    s1QuotationLinksDesc: 'All links are saved directly to Firebase Firestore cloud database for multi-user access.',
    s1AddLinkBtn: 'Add Quotation Link / Cloud Storage',
    s1HideAddLink: 'Cancel',
    s1DocTitle: 'Document Title / Quotation Ref',
    s1DocUrl: 'URL Link (Google Drive, Cloud Storage, Public PDF)',
    s1Vendor: 'Vendor / Company Name',
    s1SaveLinkBtn: 'Save Link to Firebase',
    s1SavingLink: 'Saving to Cloud...',
    s1OpenLink: 'Open Document',
    s1DeleteLink: 'Delete Link',
    s1AddedBy: 'Added by',
    s1ScopeParamsTitle: 'Corporate Tender Scope Parameters',
    s1ScopeParamsDesc: 'Baseline settings for monthly copy volume calculation and procurement fleet sizing.',
    s1RefCode: 'Tender Reference Code',
    s1Currency: 'Evaluation Currency',
    s1EstVolume: 'Est. Monthly Copies (Sheets)',
    s1FleetSize: 'Fleet Size (Units HQ Media Prima)',
    s1MonoColorRatio: 'Mono / Color Print Ratio',
    s1Mono: 'Monochrome (Black & White)',
    s1Color: 'Color',
    s1ExtractBtn: 'Extract & Proceed to Option Review',
    s1Extracting: 'Extracting Data...',

    // Screen 2: Review & Normalization
    s2StageBadge: 'Stage 2: Proposal Normalization & Verification',
    s2BatchId: 'Batch Run ID #PAR-8921-X',
    s2Confidence: 'Extraction Confidence',
    s2Title: 'Categorized Human Review & Field Verification',
    s2Desc: 'Review and adjust pre-parsed vendor quotation metrics across 3 vendors and 6 options. Soft amber outlines indicate fields requiring officer sign-off.',
    s2SearchPlaceholder: 'Search vendor, model, SLA...',
    s2AddOptionBtn: 'Add New Option',
    s2SaveDraftBtn: 'Save Draft Session',
    s2DraftSaved: 'Draft Saved!',
    s2ProceedBtn: 'Open Executive Comparison Matrix',
    s2BrandNewTab: 'Brand New MFP',
    s2RefurbishedTab: 'Refurbished MFP',
    s2MonthlyRental: 'Monthly Rental / Unit',
    s2MonoClick: 'Mono Click Rate / Page',
    s2ColorClick: 'Color Click Rate / Page',
    s2Speed: 'Engine Speed (PPM)',
    s2SlaResponse: 'SLA Response Time',
    s2Uptime: 'Uptime Commitment',
    s2TonerIncluded: 'Toner Inclusion',
    s2ContractDuration: 'Contract Duration (Months)',
    s2AuditFlags: 'Quotation Audit Clause',
    s2ResolveFlag: 'Verify & Resolve Clause',
    s2FlagResolved: 'Verified & Approved',
    s2VerifyAll: 'Mark All as Verified',
    s2OptionVerified: 'Officer Verified',
    s2DeleteOption: 'Delete This Option',

    // Screen 3: Executive Matrix
    s3StageBadge: 'Stage 3: C-Level Evaluation & Decision Matrix',
    s3TcoAudited: '3-Year Contract TCO Audited',
    s3BlindReview: 'Strict Multi-Vendor Blind Review',
    s3Title: 'Executive Multi-Option Tabulation & TCO Benchmark',
    s3Desc: 'Comprehensive financial breakdown, rental rates comparison, copy click expenditures, and SLA commitments for Media Prima Berhad.',
    s3FilterAll: 'All 6 Options',
    s3FilterBrandNew: 'Brand New Only',
    s3FilterRefurbished: 'Refurbished Only',
    s3FilterRecommended: 'Recommended Picks',
    s3BestOverallPick: 'Best Overall Pick (Lowest TCO)',
    s3BudgetPick: 'Budget-Friendly Pick (Refurbished)',
    s3PremiumPick: 'Premium Brand New Pick',
    s3MonthlyCost: 'Net Monthly Cost',
    s33YrContract: 'Total Contract (3 Years)',
    s3Savings: 'Savings vs Average',
    s3ComparisonTable: 'Detailed Comparison Table & TCO',
    s3ModelVendor: 'Model & Vendor',
    s3Category: 'Category',
    s3RentalMo: 'Monthly Rental',
    s3ClickCostMo: 'Monthly Click Cost',
    s3TotalMo: 'Total Estimated Monthly',
    s3ContractTco: 'Total TCO (3 Years)',
    s3DeltaAvg: 'Difference vs Average',
    s3SlaMatrixTitle: 'SLA Benchmarking & Service Commitments Matrix',
    s3SlaMatrixDesc: 'Comparison of on-site response guarantees, emergency standby replacement units, and downtime service penalties.',
    s3ResponseTime: 'On-Site Response Time',
    s3UptimeCommitment: 'Engine Uptime Guarantee',
    s3BackupPolicy: 'Standby Backup Unit Policy',
    s3DowntimePenalty: 'Service Downtime Penalty',
    s3VendorRating: 'Principal Rating',
    s3ExportExcel: 'Export Excel (.xlsx)',
    s3SaveCloud: 'Save to Firebase Cloud',
    s3SavedCloud: 'Saved to Firebase!',
    s3BoardroomPresentation: 'Boardroom Presentation View',
    s3SubmitSignoff: 'Submit for Committee Sign-off',
    s3SignoffDone: 'Motion Submitted!',

    // Auth Modal
    authBadge: 'Media Prima Berhad',
    authSignInTab: 'Sign In',
    authSignUpTab: 'Sign Up',
    authWelcomeBack: 'User Sign In',
    authRegisterNew: 'Register New User',
    authManualSubtitle: 'Official account under Media Prima Berhad',
    authQuickDemoTitle: 'Quick Demo Account Access',
    authQuickDemoTag: 'Fast Testing',
    authInstantLoginBtn: 'Instant Sign-In: Nur Fatihana (Executive)',
    authLoggingIn: 'Signing In...',
    authAutofillPrompt: 'or autofill this account info into the form below',
    authFullName: 'Officer Full Name',
    authFullNamePlaceholder: 'e.g. Nur Fatihana',
    authEmail: 'Corporate Email Address',
    authDepartment: 'Department / Division',
    authPassword: 'Password',
    authPasswordPlaceholder: 'Minimum 6 characters',
    authSignInBtn: 'Sign In Media Prima',
    authSignUpBtn: 'Register Media Prima Account',
    authProcessing: 'Processing...',
    authFooterProtected: 'All Rights Reserved Media Prima Berhad • Secured with Firebase',
    authSignOutConfirm: 'Are you sure you want to sign out?',
    authSignOutSuccess: 'You have signed out of Media Prima Berhad system.',

    // Boardroom Modal
    brTitle: 'Boardroom Executive Dossier Preview & Print',
    brPrintBtn: 'Print / Save as PDF',
    brClose: 'Close',
    brHeaderSubtitle: 'Proposal Paper for Multi-Function Printer (MFP) Fleet Procurement HQ Media Prima Berhad',
    brExecutiveSummary: 'Executive Summary & Award Recommendation',
    brEvaluationScope: 'Evaluation Scope & Volume Parameters',
    brRecommendedAward: 'Recommended Contract Awardee',
    brFinancialComparison: 'Financial Comparison & 3-Year TCO Analysis',
    brSlaCompliance: 'Service Level Agreement (SLA) Compliance',
    brSignoffCommittee: 'Tender Evaluation Committee Signatures',
    brSignDate: 'Approval Date',
    brSignature: 'Authorized Officer Signature',

    // History Drawer
    histTitle: 'Saved Tender Evaluations',
    histSubtitle: 'Synced to Firebase Firestore Cloud DB',
    histNoRecords: 'No saved projects found.',
    histLoadBtn: 'Load Project',
    histDeleteBtn: 'Delete',
    histClearAll: 'Clear All',
    histConfirmClear: 'Are you sure you want to delete all saved records?',
    histSavedOn: 'Saved on',
    histOptionsCount: 'Quotation Options',

    // Footer
    footerRights: 'TenderTab Procurement Systems • Media Prima Berhad',
    footerSecurity: 'Enterprise Encrypted & Firebase Cloud Protected',
  },
};
