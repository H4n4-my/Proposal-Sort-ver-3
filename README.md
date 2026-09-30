# TenderTab v2.0 — Suite Penilaian & Penanda Aras Tender Pelbagai Pilihan

[![Versi](https://img.shields.io/badge/versi-2.0%20Eksekutif-2563eb.svg)](https://github.com/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Lesen](https://img.shields.io/badge/lesen-Apache%202.0-green.svg)](LICENSE)

> Aplikasi perbandingan cadangan tender multi-vendor bertaraf eksekutif dan penanda aras Jumlah Kos Pemilikan (*Total Cost of Ownership - TCO*) yang direka khas untuk Bahagian Perolehan Korporat, Operasi Infrastruktur IT, serta Lembaga Kelulusan Eksekutif (*C-Suite / Ahli Lembaga Pengarah*).

---

## 📌 Pengenalan & Gambaran Eksekutif

### Isu Utama (The Problem)
Dalam tender sebut harga peralatan pejabat berskala besar (seperti Mesin Pencetak Pelbagai Fungsi / MFP), pembekal biasanya mengemukakan pelbagai pilihan bagi setiap sebut harga—lazimnya pilihan **Mesin Baharu (Brand New)** yang menawarkan ketahanan tinggi dan waranti kilang, serta pilihan **Mesin Rekondisi Bertauliah (Certified Refurbished)** yang menawarkan kadar sewaan lebih rendah untuk penjimatan kos segera.

Membuat perbandingan manual merentas beberapa pembekal sering menghasilkan hamparan data (*spreadsheets*) yang berselerak, mengelirukan, dan menyukarkan pihak pengurusan melihat kos sebenar (iaitu gabungan sewa asas bulanan + caj klik cetakan B&W dan Warna sepanjang tempoh pajakan 36 hingga 60 bulan).

### Penyelesaian TenderTab (The Solution)
**TenderTab v2.0** menyediakan aliran kerja penilaian berfokus dan telus menerusi 3 peringkat:
1. **Peringkat 1 (Kemasukan & Skop Cadangan):** Penetapan skop projek tender (anggaran volum salinan bulanan, saiz armada peranti, mata wang) dan muat naik dokumen sebut harga.
2. **Peringkat 2 (Semakan & Pengesahan Mengikut Kategori):** Pengasingan data antara Mesin Baharu dan Mesin Rekondisi, lengkap dengan amaran amber bagi ketidakpatuhan SLA serta fungsi pembetulan pantas.
3. **Peringkat 3 (Matriks Keputusan & Penanda Aras TCO Eksekutif):** Paparan komprehensif untuk pengurusan atasan yang memaparkan kad rumusan KPI, carta unjuran TCO 36-bulan, tab penapis lajur interaktif, jadual matriks terperinci, akordion audit SLA & risiko, eksport fail Excel (.xlsx), serta cetakan Memorandum Kelulusan Bilik Lembaga Pengarah (*Boardroom Memorandum*).

---

## 🚀 Ciri-Ciri Utama Aplikasi

### 1. Kemasukan Skop & Penerimaan Sebut Harga PDF (Peringkat 1)
- **Konfigurasi Skop Projek**: Menyokong kemasukan Kod Rujukan Tender (*Tender Ref Code*), Tajuk Skop Projek, Mata Wang Penilaian (`MYR`, `USD`, `SGD`), anggaran volum bulanan (cth: 25,000 salinan), dan saiz armada (cth: 12 unit HQ).
- **Zon Muat Naik Interaktif**: Sokongan seret-dan-lepas (*drag & drop*) bagi fail sebut harga PDF vendor.
- **Pemuatan Data Contoh Segera**: Butang satu klik untuk memuatkan data realistik bagi 3 vendor utama: **Konica Minolta**, **Ricoh Malaysia**, dan **Sharp Electronics** (merangkumi 6 pilihan: 3 Mesin Baharu & 3 Mesin Rekondisi).

### 2. Pengesahan Manusia & Penyeragaman Data (Peringkat 2)
- **Pengasingan Kategori yang Jelas**:
  - **🆕 Pilihan Mesin Baharu (Brand New Options)**: Kitaran penggantian 5 tahun (60 bulan), peralatan baharu sepenuhnya, waranti langsung OEM.
  - **🔄 Pilihan Mesin Rekondisi Bertauliah (Refurbished Options)**: Pajakan fleksibel 3 tahun (36 bulan), baik pulih kilang, penjimatan capex sehingga 38%.
- **Paparan Imej & Spesifikasi Perkakasan**: Gambar model perkakasan, kelajuan cetakan (ppm), sewa asas bulanan, serta kadar caj klik B&W dan Warna.
- **Triage Audit Keutamaan (Amaran Warna Amber)**: Mengesan klausa perkhidmatan yang tidak mematuhi dasar tender (seperti masa respons hari bekerja berikutnya / *Next Business Day*) berserta butang penyelesaian pantas (*"Sahkan kos naik taraf SLA 4-jam"* atau *"Luluskan Sisihan"*).
- **Carian Pantas & Pengesahan Pukal**: Membolehkan carian segera mengikut nama pembekal, model, atau syarat SLA, serta butang untuk mengesahkan semua medan yang sah.
- **Tambah Pilihan Kustom**: Modal borang untuk menambah pilihan sebut harga pembekal baharu secara manual.

### 3. Matriks Tabulasi & Keputusan Eksekutif (Peringkat 3)
- **4 Kad Ringkasan KPI Utama**:
  - **Sewa Asas Mesin Baharu Terendah**: Sharp BP-50C31 pada RM 420.00/bulan.
  - **Sewa Asas Rekondisi Terendah**: Sharp MX-3071 pada RM 260.00/bulan.
  - **Penjimatan Pilihan Rekondisi**: Mengira peratusan pengurangan sewa bulanan (38.1%) dan jumlah penjimatan tahunan armada.
  - **Pemenang TCO Volum 25k Bulanan**: Ricoh Malaysia IM C3000 Mesin Baharu (kadar klik yang lebih rendah mengimbangi sewaan asas bulanan).
- **Visualisasi Taburan TCO 36-Bulan**: Carta bar tindanan (*stacked chart*) yang membandingkan nisbah sewa asas pajakan melawan kos penggunaan caj klik.
- **Tab Penapis Lajur Dinamik**:
  - `Semua Pilihan (6)`
  - `🆕 Mesin Baharu Sahaja (3)`
  - `🔄 Mesin Rekondisi Sahaja (3)`
  - `🏆 Cadangan TCO Terbaik`
  *(Menghalang jadual perbandingan daripada menjadi sesak semasa pembentangan)*.
- **Jadual Matriks 10-Kriteria Komprehensif**:
  1. Keadaan Mesin (*Machine Condition*)
  2. Cadangan Model Perkakasan (*Proposed Model*)
  3. Kelajuan Cetakan A4 (*Print & Copy Speed*)
  4. Sewaan Asas Bulanan (*Monthly Base Rental*)
  5. Kadar Klik B&W sehalaman (*B&W Click Rate*)
  6. Kadar Klik Warna sehalaman (*Color Click Rate*)
  7. Anggaran Bil Klik Bulanan (Berasaskan 80% B&W / 20% Warna)
  8. Jumlah Anggaran TCO Bulanan (Sewa + Klik)
  9. Komitmen Kontrak 3-Tahun (36 Bulan)
  10. Skop Bekalan Toner & Alat Ganti
- **Akordion Audit SLA, Penyelenggaraan & Risiko (Boleh Kembang/Kuncup)**:
  - Komitmen masa respons di lokasi (cth: jaminan 4 jam berbanding 8 jam).
  - Jaminan tahap operasi (*Uptime Commitment: 94.0% hingga 98.5%*).
  - Dasar penyediaan mesin gantian (*Loaner unit policy*).
  - Penalti kelewatan atau masa rosak (*Downtime penalty*).
  - Penarafan kestabilan pembekal (`AAA`, `AA`, `A+`, `A-`).
- **Usul Anugerah Strategik & Panel Konsensus Jawatankuasa**:
  - Rumusan cadangan sebulat suara oleh Bahagian Perolehan, Infrastruktur IT, dan Kawalan Kewangan Kumpulan.
  - Pulangan Bersih Armada (*Net Fleet Yield*: penjimatan RM 14,040 berbanding bidaan baharu terdekat).
  - 3 tandatangan rasmi jawatankuasa (CPO, VP Kewangan, Ketua Operasi IT).
  - Butang tindakan serahan kelulusan bilik lembaga pengarah (*Submit for Boardroom Signoff*).

### 4. Modul Eksport & Simpanan Rekod
- **Eksport ke Microsoft Excel (`.xlsx`)**: Menjana buku kerja hamparan data yang mengandungi jadual matriks dan audit SLA menggunakan enjin SheetJS.
- **Dossier Memorandum Bilik Lembaga (PDF / Cetakan)**: Dokumen memorandum rasmi yang sedia untuk dicetak secara fizikal atau disimpan sebagai PDF melalui dialog cetakan sistem (`window.print()`).
- **Laci Rekod Tersimpan (*History Drawer*)**: Menyimpan penilaian terdahulu ke dalam storan pelayar tempatan (*localStorage*) dengan tarikh masa, bilangan pilihan, serta fungsi pemuatan atau pemadaman rekod.

---

## 🛠️ Seni Bina & Teknologi (Tech Stack)

| Lapisan | Teknologi |
|---|---|
| **Rangka Kerja Utama** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Alat Binaan & Pelayan** | [Vite 8](https://vitejs.dev/) bersama `@tailwindcss/vite` |
| **Gaya & Reka Bentuk UI** | [Tailwind CSS v4](https://tailwindcss.com/) dengan `@import "tailwindcss";` |
| **Tipografi** | Inter, Plus Jakarta Sans, JetBrains Mono |
| **Ikonografi** | [Lucide React](https://lucide.dev/) |
| **Enjin Hamparan Data** | [SheetJS (xlsx)](https://docs.sheetjs.com/) |
| **Penyimpanan Data** | Pelayar `localStorage` (Keselamatan data terjamin tanpa penghantaran ke pelayan luar) |

---

## 📂 Struktur Fail Projek

```text
├── index.html                   # Titik masuk HTML, fon & tag meta
├── metadata.json                # Metadata aplikasi AI Studio
├── package.json                 # Pakej kebergantungan & skrip binaan
├── tsconfig.json                # Konfigurasi pengkompil TypeScript
├── vite.config.ts               # Konfigurasi Vite & pemalam Tailwind CSS v4
├── README.md                    # Dokumentasi lengkap projek
└── src/
    ├── main.tsx                 # Bootstrapping React DOM
    ├── App.tsx                  # Pengawal utama aplikasi & penghala peringkat
    ├── index.css                # Import Tailwind CSS & penggayaan global
    ├── types.ts                 # Definisi jenis data & skema TypeScript
    ├── data/
    │   └── sampleData.ts        # Data sebut harga penilaian tender sedia ada
    ├── utils/
    │   ├── calculations.ts      # Algoritma pengiraan TCO, agregasi & format mata wang
    │   └── excelExport.ts       # Logik penjanaan fail Excel SheetJS
    └── components/
        ├── Header.tsx           # Bar tajuk atas, penunjuk peringkat & laci sejarah
        ├── Footer.tsx           # Bar kaki protokol fidusiari & cop audit
        ├── Screen1Upload.tsx    # Peringkat 1: Pengambilan cadangan & tetapan skop
        ├── Screen2Review.tsx    # Peringkat 2: Pengesahan kategori & audit SLA
        ├── Screen3Matrix.tsx    # Peringkat 3: Matriks eksekutif, carta TCO & SLA
        ├── HistoryDrawer.tsx    # Laci sisi untuk projek yang disimpan
        ├── AddOptionModal.tsx   # Modal penambahan pilihan vendor kustom
        ├── BoardroomModal.tsx   # Dokumen Memorandum Bilik Lembaga sedia cetak
        └── Toast.tsx            # Sistem pemberitahuan notifikasi visual
```

---

## 🔢 Formula Pengiraan Jumlah Kos Pemilikan (TCO)

Sistem pengiraan masa nyata menyeragamkan penilaian merentas semua bidaan pembekal berdasarkan formula matematik berikut:

$$\text{Bil Klik Bulanan} = (\text{Volum} \times \%\text{Mono} \times \text{Kadar}_{\text{B\&W}}) + (\text{Volum} \times \%\text{Warna} \times \text{Kadar}_{\text{Warna}})$$

$$\text{TCO Bulanan} = \text{Sewa Asas Bulanan} + \text{Bil Klik Bulanan}$$

$$\text{Komitmen Kontrak 3-Tahun} = \text{TCO Bulanan} \times 36\text{ Bulan}$$

$$\text{Komitmen Kontrak 5-Tahun} = \text{TCO Bulanan} \times 60\text{ Bulan}$$

*Asas standard korporat lalai: 25,000 halaman sebulan (80% B&W, 20% Warna).*

---

## 💻 Panduan Pemasangan & Pembangunan Tempatan

### Keperluan Awal
- [Node.js](https://nodejs.org/) (versi 18+ atau 20+ disyorkan)
- Pengurus pakej `npm` (atau `yarn` / `pnpm`)

### Langkah Pemasangan
1. Klon repositori GitHub ini:
   ```bash
   git clone https://github.com/your-username/tendertab-executive.git
   cd tendertab-executive
   ```

2. Pasang semua pakej kebergantungan:
   ```bash
   npm install
   ```

3. Jalankan pelayan pembangunan tempatan:
   ```bash
   npm run dev
   ```
   Buka pelayar web anda di `http://localhost:3000`.

4. Bina untuk persekitaran produksi (*Production Build*):
   ```bash
   npm run build
   ```

5. Jalankan semakan kualiti kod (*Linter*):
   ```bash
   npm run lint
   ```

---

## 📄 Lesen

Projek ini dilesenkan di bawah **Lesen Apache-2.0**. Sila rujuk fail [LICENSE](LICENSE) untuk maklumat lanjut.
