/**
 * ATOMIKA X - 15 Comprehensive Chemistry Quiz Questions (Kelas X SMA)
 */

const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: "Model Atom",
    question: "Eksperimen hamburan sinar alfa yang dilakukan oleh Ernest Rutherford dengan menembakkan partikel alfa bermuatan positif pada lempeng tipis emas menghasilkan fakta bahwa sebagian besar partikel alfa diteruskan lurus tanpa hambatan. Kesimpulan utama dari fakta ini adalah...",
    options: [
      "Atom merupakan bola pejal yang padat dan bermuatan positif",
      "Sebagian besar volume atom merupakan ruang hampa",
      "Elektron tersebar merata di seluruh bagian atom bagai kismis",
      "Massa elektron jauh lebih besar daripada massa partikel alfa"
    ],
    answer: 1,
    explanation: "Sebagian besar partikel alfa diteruskan tanpa pembelokan membuktikan bahwa atom bukanlah bola pejal padat, melainkan sebagian besar terdiri atas RUANG HAMPA. Hanya sebagian sangat kecil yang dibelokkan atau dipantulkan karena menabrak inti atom yang sangat kecil namun sangat padat dan bermuatan positif di pusat."
  },
  {
    id: 2,
    category: "Notasi Atom & Ion",
    question: "Diketahui ion kation ²⁷₁₃Al³⁺. Jumlah proton, elektron, dan neutron yang terdapat dalam ion tersebut berturut-turut adalah...",
    options: [
      "13 proton, 13 elektron, 14 neutron",
      "13 proton, 10 elektron, 14 neutron",
      "10 proton, 13 elektron, 14 neutron",
      "13 proton, 16 elektron, 14 neutron"
    ],
    answer: 1,
    explanation: "Pada lambang ²⁷₁₃Al³⁺:\n- Nomor atom (Z) = 13 → Jumlah proton = 13\n- Nomor massa (A) = 27 → Jumlah neutron = A - Z = 27 - 13 = 14 neutron\n- Ion Al³⁺ melepas 3 elektron → Jumlah elektron = Z - 3 = 13 - 3 = 10 elektron.\nJadi, jumlahnya berturut-turut adalah 13 proton, 10 elektron, dan 14 neutron."
  },
  {
    id: 3,
    category: "Model Atom Bohr",
    question: "Menurut teori atom Niels Bohr, spektrum garis diskrit yang dipancarkan oleh atom hidrogen terjadi ketika elektron...",
    options: [
      "Berputar mengitari inti atom pada lintasan stasioner tanpa perubahan energi",
      "Menyerap energi foton dan meloncat ke kulit lintasan yang lebih luar",
      "Berpindah (bertransisi) dari tingkat energi yang lebih tinggi ke tingkat energi yang lebih rendah dengan memancarkan foton",
      "Mengalami percepatan sentripetal sehingga energinya terus berkurang hingga menabrak inti"
    ],
    answer: 2,
    explanation: "Spektrum garis diskrit (emisi) terjadi saat elektron mengalami de-eksitasi, yaitu berpindah dari kulit berenergi lebih tinggi (misal n=3 atau n=4) ke kulit berenergi lebih rendah (misal n=2 atau n=1) sambil MEMANCARKAN kelebihan energi dalam bentuk gelombang cahaya (foton) dengan rumus ΔE = h·f."
  },
  {
    id: 4,
    category: "Isotop, Isobar, Isoton",
    question: "Pasangan nuklida berikut ini yang tergolong pasangan ISOBAR adalah...",
    options: [
      "¹²₆C dan ¹⁴₆C",
      "¹⁴₆C dan ¹⁴₇N",
      "¹⁴₆C dan ¹⁶₈O",
      "³¹₁₅P dan ³²₁₆S"
    ],
    answer: 1,
    explanation: "ISOBAR adalah atom-atom yang memiliki NOMOR MASSA (A) SAMA tetapi NOMOR ATOM (Z) BERBEDA (unsur berbeda). Pada pasangan ¹⁴₆C dan ¹⁴₇N, keduanya sama-sama memiliki nomor massa A = 14, sedangkan Z masing-masing adalah 6 dan 7."
  },
  {
    id: 5,
    category: "Partikel Subatomik",
    question: "Partikel dasar penyusun atom yang memiliki massa paling kecil (kurang lebih 1/1836 dari massa proton) dan ditemukan oleh J.J. Thomson melalui percobaan tabung sinar katoda adalah...",
    options: [
      "Proton",
      "Neutron",
      "Positron",
      "Elektron"
    ],
    answer: 3,
    explanation: "Partikel tersebut adalah ELEKTRON. Elektron memiliki massa hanya sekitar 9,109 × 10⁻³¹ kg (~ 0,00055 sma) dan bermuatan negatif (-1). Elektron ditemukan oleh J.J. Thomson pada tahun 1897 lewat eksperimen tabung sinar katoda (Crookes)."
  },
  {
    id: 6,
    category: "Konfigurasi Bohr",
    question: "Unsur Kalsium memiliki nomor atom 20. Menurut teori Bohr, susunan konfigurasi elektron pada kulit K, L, M, dan N serta jumlah elektron valensinya adalah...",
    options: [
      "2, 8, 10 dengan elektron valensi 10",
      "2, 18 dengan elektron valensi 8",
      "2, 8, 8, 2 dengan elektron valensi 2",
      "2, 8, 9, 1 dengan elektron valensi 1"
    ],
    answer: 2,
    explanation: "Kulit K maksimum 2 elektron, kulit L maksimum 8 elektron. Sisa 10 elektron tidak boleh langsung diisikan ke kulit M (karena aturan kulit terluar/valensi tidak boleh melebihi 8 sebelum kulit berikutnya diisi untuk unsur utama). Maka kulit M diisi 8 elektron, dan 2 elektron sisanya masuk ke kulit N. Konfigurasi: 2, 8, 8, 2 dengan elektron valensi = 2."
  },
  {
    id: 7,
    category: "Notasi Atom & Anion",
    question: "Suatu atom unsur X memiliki 16 proton dan 16 neutron. Jika atom tersebut membentuk ion X²⁻, maka jumlah elektron dan nomor massanya adalah...",
    options: [
      "14 elektron dan nomor massa 32",
      "18 elektron dan nomor massa 32",
      "18 elektron dan nomor massa 16",
      "16 elektron dan nomor massa 34"
    ],
    answer: 1,
    explanation: "Atom netral memiliki 16 proton dan 16 elektron. Membentuk ion X²⁻ artinya atom MENANGKAP 2 elektron tambahan → Jumlah elektron = 16 + 2 = 18 elektron. Nomor massa (A) = proton + neutron = 16 + 16 = 32 (Nomor massa tidak berubah saat atom menjadi ion karena hanya elektron yang bertambah)."
  },
  {
    id: 8,
    category: "Mekanika Kuantum",
    question: "Prinsip yang menyatakan bahwa 'Tidak mungkin kita dapat menentukan kedudukan dan momentum suatu partikel (seperti elektron) secara bersamaan dengan ketelitian mutlak' dirumuskan oleh...",
    options: [
      "Louis de Broglie",
      "Erwin Schrödinger",
      "Werner Heisenberg",
      "Wolfgang Pauli"
    ],
    answer: 2,
    explanation: "Prinsip tersebut adalah ASAS KETIDAKPASTIAN HEISENBERG (Heisenberg Uncertainty Principle) yang dirumuskan oleh Werner Heisenberg pada tahun 1927: Δx · Δp ≥ h / (4π). Karena posisi elektron tidak dapat dipastikan secara eksak, mekanika kuantum menggunakan konsep orbital (kebolehjadian menemukan elektron)."
  },
  {
    id: 9,
    category: "Isoton",
    question: "Manakah pasangan atom di bawah ini yang merupakan pasangan ISOTON (memiliki jumlah neutron yang sama)?",
    options: [
      "¹³₆C dan ¹⁴₇N",
      "¹²₆C dan ¹³₆C",
      "²⁴₁₂Mg dan ²⁴₁₁Na",
      "³⁹₁₉K dan ⁴⁰₁₉K"
    ],
    answer: 0,
    explanation: "Isoton adalah atom dengan jumlah neutron sama (A - Z sama).\n- Pada ¹³₆C: neutron = 13 - 6 = 7 neutron.\n- Pada ¹⁴₇N: neutron = 14 - 7 = 7 neutron.\nKarena keduanya sama-sama memiliki 7 neutron, maka ¹³₆C dan ¹⁴₇N adalah pasangan ISOTON."
  },
  {
    id: 10,
    category: "Konfigurasi Subkulit",
    question: "Konfigurasi elektron unsur Besi (₂₆Fe) berdasarkan prinsip Aufbau adalah...",
    options: [
      "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁸",
      "1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶",
      "1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹ 3d⁷",
      "1s² 2s² 2p⁶ 3s² 3p⁴ 4s² 3d⁸"
    ],
    answer: 1,
    explanation: "Urutan pengisian subkulit berdasarkan tingkat energi Aufbau:\n1s² (2) → 2s² (4) → 2p⁶ (10) → 3s² (12) → 3p⁶ (18) → 4s² (20) → 3d⁶ (26).\nNotasi singkat: [Ar] 4s² 3d⁶ atau [Ar] 3d⁶ 4s²."
  },
  {
    id: 11,
    category: "Sistem Periodik",
    question: "Suatu atom netral memiliki konfigurasi elektron 1s² 2s² 2p⁶ 3s² 3p⁵. Letak unsur tersebut dalam tabel periodik unsur adalah...",
    options: [
      "Golongan VA, Periode 2",
      "Golongan VIIA, Periode 3",
      "Golongan VIIB, Periode 3",
      "Golongan IIIA, Periode 3"
    ],
    answer: 1,
    explanation: "Kulit terbesar (n) = 3 → Periode 3.\nElektron valensi pada kulit ke-3 (3s² 3p⁵) = 2 + 5 = 7 elektron, berakhir pada subkulit p (unsur golongan utama/A) → Golongan VIIA (Halogen, unsur Klorin/Cl)."
  },
  {
    id: 12,
    category: "Isoelektron",
    question: "Spesi-spesi berikut ini yang semuanya memiliki jumlah elektron yang sama (isoelektron) adalah...",
    options: [
      "₁₁Na⁺, ₁₂Mg²⁺, dan ₉F⁻",
      "₁₇Cl⁻, ₁₈Ar, dan ₁₁Na⁺",
      "₈O²⁻, ₉F⁻, dan ₁₃Al",
      "₁₉K⁺, ₂₀Ca²⁺, dan ₁₀Ne"
    ],
    answer: 0,
    explanation: "Mari hitung jumlah elektron masing-masing:\n- ₁₁Na⁺ : 11 - 1 = 10 elektron\n- ₁₂Mg²⁺ : 12 - 2 = 10 elektron\n- ₉F⁻ : 9 + 1 = 10 elektron\nKetiganya sama-sama memiliki 10 elektron sehingga merupakan pasangan isoelektron."
  },
  {
    id: 13,
    category: "Sejarah Partikel",
    question: "Neutron adalah partikel tak bermuatan di dalam inti atom yang keberadaannya diprediksi oleh Rutherford namun baru berhasil dibuktikan secara eksperimen pada tahun 1932 oleh...",
    options: [
      "James Chadwick",
      "Robert Millikan",
      "Eugen Goldstein",
      "Henry Moseley"
    ],
    answer: 0,
    explanation: "James Chadwick membuktikan keberadaan neutron pada tahun 1932 melalui percobaan penembakan lempeng tipis berilium menggunakan partikel alfa, yang memancarkan radiasi berdaya tembus tinggi tanpa dipengaruhi medan listrik/magnet (partikel netral bermassa hampir setara proton)."
  },
  {
    id: 14,
    category: "Kaidah Kuantum",
    question: "Pernyataan bahwa 'Dalam satu atom tidak boleh ada dua elektron yang memiliki keempat bilangan kuantum (n, l, m, s) yang identik' merupakan rumusan dari...",
    options: [
      "Aturan Hund",
      "Prinsip Aufbau",
      "Asas Larangan Pauli",
      "Hukum Kekekalan Massa"
    ],
    answer: 2,
    explanation: "Prinsip tersebut adalah ASAS LARANGAN PAULI (Pauli Exclusion Principle) yang diajukan oleh Wolfgang Pauli pada tahun 1925. Akibat larangan ini, satu orbital maksimum hanya dapat ditempati oleh 2 elektron dengan arah spin berlawanan (s = +½ dan s = -½)."
  },
  {
    id: 15,
    category: "Model Atom Dalton",
    question: "Salah satu kelemahan teori atom John Dalton yang berhasil dipatahkan oleh penemuan spektrometer massa dan reaksi fusi/fisi nuklir adalah...",
    options: [
      "Dalton menyatakan bahwa atom suatu unsur identik dalam segala hal, padahal di alam ditemukan adanya isotop (massa berbeda)",
      "Dalton mengemukakan bahwa atom memiliki lintasan elektron berbentuk lingkaran",
      "Dalton menyatakan bahwa inti atom bermuatan positif",
      "Dalton menyatakan bahwa elektron dapat mengalami eksitasi foton"
    ],
    answer: 0,
    explanation: "Postulat Dalton menyebutkan bahwa atom suatu unsur identik dalam segala hal termasuk massanya. Penemuan spektrometer massa membuktikan adanya ISOTOP (seperti Karbon-12 dan Karbon-14 yang merupakan unsur sama namun memiliki massa berbeda), serta reaksi inti membuktikan atom dapat terurai menjadi partikel subatomik."
  }
];

window.QUIZ_QUESTIONS = QUIZ_QUESTIONS;
