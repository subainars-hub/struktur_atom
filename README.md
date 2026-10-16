# ⚛️ ATOMIKA X - Media Interaktif Pembelajaran Kimia Struktur Atom Kelas X SMA

Selamat datang di **ATOMIKA X**, media pembelajaran berbasis web interaktif modern yang dirancang khusus untuk mata pelajaran **Kimia SMA Kelas X** (Fase E - Kurikulum Merdeka & K-13) materi pokok **Struktur Atom & Sistem Periodik Unsur**.

---

## 🌟 Fitur Utama Aplikasi

### 1. 📚 Modul Materi Pembelajaran Lengkap & Interaktif
- **Perkembangan Model Atom (3D Interactive Stage)**:
  - **John Dalton (1803)**: Model bola pejal, hukum kekekalan massa & perbandingan tetap.
  - **J.J. Thomson (1897)**: Model roti kismis, tabung sinar katoda, penemuan elektron.
  - **Ernest Rutherford (1911)**: Eksperimen hamburan sinar alfa lempeng tipis emas, penemuan inti atom padat bermuatan positif dan ruang hampa.
  - **Niels Bohr (1913)**: Kulit/tingkat energi stasioner terkuantisasi (K, L, M, N), eksitasi dan de-eksitasi foton cahaya ($\Delta E = h \cdot f$).
  - **Mekanika Kuantum / Gelombang**: Asas ketidakpastian Heisenberg, dualisme gelombang-partikel de Broglie, persamaan Schrödinger, dan awan orbital probabilitas 3D ($s, p, d, f$).
  - *Dilengkapi kanvas 3D interaktif yang dapat diputar dengan kursor dan tombol Eksitasi Foton*.
- **Partikel Dasar Penyusun Atom ($p, e, n$)**:
  - Kartu interaktif Proton, Neutron, dan Elektron lengkap dengan muatan relatif, muatan coulomb, massa relatif (sma), massa kilogram, eksperimen penemuan, dan penemunya.
- **Notasi Atom & Kalkulator Nuklida Interaktif**:
  - Penjelasan notasi atom ($^A_Z\text{X}^{\pm q}$), kation positif, anion negatif.
  - Kalkulator real-time: pilih unsur dan muatan untuk melihat penguraian jumlah proton, neutron, dan elektron secara visual.
  - Kartu konsep & contoh konkret: **Isotop** (proton sama), **Isobar** (massa sama), **Isoton** (neutron sama), dan **Isoelektron** (elektron sama).
- **Konfigurasi Elektron & Generator 36 Unsur**:
  - Konfigurasi kulit Bohr ($2n^2$, aturan oktet, elektron valensi).
  - Konfigurasi subkulit berdasarkan Prinsip Aufbau, Aturan Hund, dan Asas Larangan Pauli.
  - Generator otomatis untuk 36 unsur pertama (H hingga Kr) lengkap dengan visualisasi cincin kulit, notasi Aufbau, penentuan golongan dan periode.

---

### 2. 🎮 Zona Games & Lab Simulator
- **Lab Simulator: Bangun Atom (Build an Atom)**:
  - Simulator interaktif ala PhET di mana siswa dapat menambahkan/mengurangi proton, neutron, dan elektron.
  - Pembaruan real-time: nama unsur, lambang notasi, muatan netto (netral/kation/anion), dan indikator kestabilan inti (stabil vs radioaktif).
  - Mode Tantangan: 5 level misi laboratorium bertingkat (Helium netral, Karbon-14, Kation Natrium, Anion Oksida, Atom Aluminium).
- **Arcade: Quantum Electron Catcher**:
  - Mini-game aksi bertema fisika kuantum dengan kanvas 60 FPS.
  - Pemain mengendalikan cincin penangkap elektromagnetik untuk mengumpulkan elektron dan mengorbitkannya ke inti atom sambil menghindari partikel antimateri dan radiasi kosmik liar.
  - Fitur kombo berlipat, nyawa (3 hearts), dan penyimpanan skor tertinggi (*high score*).
- **Tantangan Sortir Kilat Nuklida (60 Detik)**:
  - Game kuis kilat mencocokkan pasangan nuklida apakah termasuk Isotop, Isobar, atau Isoton.
  - Dilengkapi *streak multiplier* dan pembahasan konsep instan setiap menjawab.

---

### 3. 🎬 Video Pembelajaran Pilihan Guru
- *Theater player* dengan 3 video pembelajaran kurikulum SMA:
  1. *Perkembangan Model Atom: Dari Dalton hingga Mekanika Kuantum*.
  2. *Trik Cepat Menentukan Notasi Atom, Proton, Elektron, dan Neutron*.
  3. *Konfigurasi Elektron Bohr dan Aturan Subkulit Aufbau*.
- Dilengkapi lembar intisari rangkuman materi di samping pemutar video.

---

### 4. 🏆 Arena Kuis & Sertifikat Kelulusan Digital
- **15 Butir Soal Komprehensif** mencakup level kognitif C1 hingga C4 berstandar ujian kimia SMA.
- **2 Mode Uji**:
  - *Mode Latihan*: Bebas waktu dengan pembahasan lengkap langkah demi langkah yang langsung muncul seketika setelah memilih jawaban.
  - *Mode Ujian Berwaktu*: Ujian 15 menit dengan skor akhir, persentase akurasi, dan lencana kompetensi (*Master Struktur Atom*, *Pakar Kimia Kuantum*, dll.).
- **Sertifikat Kelulusan Siswa**:
  - Renders otomatis ke kanvas grafis beresolusi tinggi dengan Nama Siswa, Asal Sekolah, Nilai, Tanggal, dan Kode Verifikasi Resmi.
  - Tombol **Unduh Gambar (PNG)** untuk disimpan atau dicetak sebagai bukti tugas/portofolio siswa.

---

### 5. 🔊 Web Audio API Synthesizer
- Seluruh efek suara (klik antarmuka, pop partikel, suara foton, nada benar, nada salah, dan musik perayaan/fanfare) disintesis secara dinamis langsung melalui **Web Audio API** browser.
- **100% offline**, tidak membutuhkan file MP3/WAV eksternal sehingga tidak ada resiko audio rusak atau tertunda.
- Tombol *Mute/Unmute* yang tersimpan di memori browser (*localStorage*).

---

## 🚀 Cara Menjalankan Aplikasi

Aplikasi ini dibangun menggunakan teknologi web murni (**Vanilla HTML5, CSS3, dan JavaScript modern ES6+**) tanpa memerlukan instalasi node modules atau build-step rumit!

### Cara 1: Buka Langsung (Offline)
1. Buka folder `/Users/subainarm/Downloads/struktur-atom-interaktif/`.
2. Klik ganda file `index.html` untuk langsung membukanya di browser favoritmu (Google Chrome, Safari, Microsoft Edge, Mozilla Firefox, dll.).

### Cara 2: Menjalankan via Local Web Server (Direkomendasikan)
Jika ingin menjalankan melalui server lokal:
```bash
cd /Users/subainarm/Downloads/struktur-atom-interaktif
python3 -m http.server 8085
```
Lalu buka browser di alamat:
👉 **`http://localhost:8085`**

---

## 📁 Struktur Berkas

```
struktur-atom-interaktif/
├── index.html                      # Halaman utama aplikasi
├── README.md                       # Dokumentasi lengkap
├── css/
│   ├── main.css                    # Variabel warna neon, dark/light theme, typography
│   ├── components.css              # Glassmorphic cards, buttons, badges, modals, toasts
│   ├── navbar.css                  # Navbar sticky, drawer navigasi mobile, audio toggle
│   ├── hero.css                    # Hero section, stats, kanvas 3D atom
│   ├── materi.css                  # Sub-tabs materi, timeline model atom, kalkulator notasi
│   ├── games.css                   # Layout simulator Bangun Atom & arcade Quantum Catcher
│   ├── video.css                   # Video theater & playlist sidebar
│   └── kuis.css                    # Arena kuis, pilihan ganda, HUD, dan sertifikat
├── js/
│   ├── audio.js                    # Web Audio API sound synthesizer
│   ├── data-materi.js              # Database kurikulum: 5 model atom, partikel, 36 unsur
│   ├── data-kuis.js                # 15 bank soal kimia Kelas X + pembahasan lengkap
│   ├── atom3d.js                   # Visualizer 3D model atom canvas
│   ├── simulator-build-atom.js     # Engine simulasi Bangun Atom + 5 level tantangan
│   ├── game-quantum-catcher.js     # Engine game arcade Quantum Electron Catcher
│   ├── game-sorter.js              # Engine mini-game sortir nuklida 60 detik
│   ├── quiz-engine.js              # State machine kuis & generator sertifikat Canvas
│   └── app.js                      # Controller utama aplikasi
└── assets/
    ├── atom_hero_banner.jpg        # Banner 3D laboratorium atom
    ├── model_atom_history.jpg      # Infografis garis waktu 5 model atom
    ├── rutherford_gold_foil.jpg    # Diagram eksperimen lempeng emas Rutherford
    ├── bohr_energy_shells.jpg      # Diagram tingkat energi kulit Bohr & emisi foton
    └── quantum_orbitals.jpg        # Diagram bentuk orbital s & p mekanika kuantum
```
# struktur_atom
