/**
 * ATOMIKA X - Chemical Curriculum Knowledge Base (SMA Kelas X)
 */

const MATERI_DATA = {
  // 1. Perkembangan Model Atom
  models: [
    {
      id: "dalton",
      name: "John Dalton",
      year: "1803",
      title: "Model Bola Pejal",
      analogy: "Bola Biliar / Kelereng Pejal",
      summary: "Atom adalah partikel terkecil materi yang pejal, keras, dan tidak dapat dibagi-bagi lagi menjadi bagian yang lebih kecil.",
      postulates: [
        "Materi tersusun atas partikel-partikel terkecil yang disebut atom.",
        "Atom suatu unsur identik dalam segala hal (massa, ukuran, sifat), berbeda dengan atom unsur lain.",
        "Atom tidak dapat diciptakan, dimusnahkan, atau diubah menjadi atom lain melalui reaksi kimia (Hukum Kekekalan Massa Lavoisier).",
        "Senyawa terbentuk dari penggabungan atom-atom unsur berbeda dalam perbandingan bulat dan sederhana (Hukum Kelipatan Perbandingan Proust & Dalton)."
      ],
      pros: [
        "Mampu membangkitkan minat riset ilmiah modern tentang struktur materi.",
        "Mampu menjelaskan Hukum Kekekalan Massa dan Hukum Perbandingan Tetap secara matematis."
      ],
      cons: [
        "Tidak dapat menjelaskan sifat listrik pada materi (seperti penggaris digosok menarik kertas).",
        "Tidak menjelaskan adanya partikel subatomik (proton, elektron, neutron) serta isotop unsur."
      ]
    },
    {
      id: "thomson",
      name: "J.J. Thomson",
      year: "1897 - 1904",
      title: "Model Roti Kismis (Plum Pudding)",
      analogy: "Roti Kismis / Semangka Berbiji",
      summary: "Atom berupa bola pejal bermuatan positif homogen yang di permukaannya tersebar elektron bermuatan negatif bagaikan kismis dalam kue.",
      postulates: [
        "Menemukan partikel bermuatan negatif yang dinamakan 'elektron' melalui percobaan tabung sinar katoda (Tabung Crookes).",
        "Atom bersifat netral secara kelistrikan: jumlah muatan positif bola sama persis dengan total muatan negatif elektron yang tersebar.",
        "Menentukan rasio perbandingan muatan terhadap massa elektron (e/m = -1,76 × 10⁸ C/g)."
      ],
      pros: [
        "Berhasil membuktikan bahwa atom bukanlah partikel terkecil (ada partikel subatom elektron).",
        "Mampu menjelaskan sifat kelistrikan materi dan terbentuknya ion secara mendasar."
      ],
      cons: [
        "Tidak dapat menjelaskan susunan muatan positif dan negatif secara dinamis dalam atom.",
        "Tidak dapat menjelaskan fenomena penghamburan sinar alfa yang dibuktikan oleh Rutherford kemudian."
      ]
    },
    {
      id: "rutherford",
      name: "Ernest Rutherford",
      year: "1911",
      title: "Model Inti Atom (Planet)",
      analogy: "Tata Surya / Planet Mengitari Matahari",
      summary: "Atom terdiri atas inti atom yang sangat kecil bermuatan positif dan memusatkan hampir seluruh massa atom, dikelilingi oleh elektron pada jarak yang sangat jauh (sebagian besar ruang hampa).",
      postulates: [
        "Melakukan Eksperimen Hamburan Sinar Alfa pada lempeng tipis emas bersama Hans Geiger dan Ernest Marsden.",
        "Sebagian besar partikel alfa menembus lurus tanpa hambatan → membuktikan atom sebagian besar adalah RUANG HAMPA.",
        "Sebagian kecil dibelokkan dan sedikit sekali dipantulkan balik (1 dari 20.000) → membuktikan adanya INTI ATOM padat bermuatan positif di pusat.",
        "Elektron beredar mengitari inti atom pada orbitnya, seperti planet mengitari matahari."
      ],
      pros: [
        "Menemukan konsep INTI ATOM (nucleus) dan membuktikan adanya ruang hampa luas dalam atom.",
        "Menjadi fondasi pemahaman fisika inti modern."
      ],
      cons: [
        "Bertentangan dengan Teori Elektrodinamika Klasik Maxwell: partikel bermuatan yang bergerak melingkar dipercepat seharusnya memancarkan energi (radiasi), sehingga lintasannya makin menyempit dan elektron akhirnya jatuh menabrak inti.",
        "Tidak mampu menjelaskan mengapa spektrum atom hidrogen bersifat garis/diskrit (bukan kontinu)."
      ]
    },
    {
      id: "bohr",
      name: "Niels Bohr",
      year: "1913",
      title: "Model Orbit Tingkat Energi",
      analogy: "Anak Tangga Energi (Kulit K, L, M, N)",
      summary: "Elektron mengitari inti atom pada lintasan stasioner melingkar tertentu dengan tingkat energi terkuantisasi tanpa memancarkan radiasi energi.",
      postulates: [
        "Elektron mengelilingi inti hanya pada orbit-orbit tertentu (kulit atom n = 1, 2, 3, 4 atau K, L, M, N) dengan momentum sudut terkuantisasi L = n(h / 2π).",
        "Selama elektron berada pada lintasan stasionernya, elektron tidak menyerap maupun memancarkan energi (keadaan stasioner).",
        "Elektron dapat berpindah (transisi) dari tingkat energi rendah ke tinggi dengan MENYERAP foton (eksitasi).",
        "Elektron berpindah dari tingkat energi tinggi ke rendah dengan MEMANCARKAN foton (de-eksitasi / emisi) dengan energi: ΔE = E₂ - E₁ = h·f = h·c / λ."
      ],
      pros: [
        "Berhasil mengatasi kelemahan model Rutherford terkait stabilitas atom dan keruntuhan lintasan.",
        "Mampu menghitung spektrum garis atom Hidrogen dan spesi mirip hidrogen (He⁺, Li²⁺) dengan sangat presisi."
      ],
      cons: [
        "Hanya sukses untuk atom dengan 1 elektron (Hidrogen), gagal menerangkan spektrum atom berelektron banyak.",
        "Tidak dapat menerangkan efek Zeeman (pembelahan garis spektrum dalam medan magnet) dan efek Stark (dalam medan listrik).",
        "Masih menganggap elektron bergerak pada lintasan pasti 2 dimensi seperti lingkaran."
      ]
    },
    {
      id: "quantum",
      name: "Mekanika Gelombang / Kuantum",
      year: "1926 - Sekarang",
      title: "Model Awan Elektron (Orbital)",
      analogy: "Awan Probabilitas Elektron (Orbital s, p, d, f)",
      summary: "Kedudukan elektron tidak dapat dipastikan dengan lintasan garis edar pasti, melainkan dinyatakan dalam bentuk ORBITAL yaitu daerah ruang tiga dimensi dengan kebolehjadian (probabilitas) terbesar menemukan elektron.",
      postulates: [
        "Hipotesis Louis de Broglie (1924): Partikel bermassa kecil yang bergerak cepat (seperti elektron) memiliki sifat DUALISME gelombang-partikel (λ = h / p).",
        "Prinsip Ketidakpastian Werner Heisenberg (1927): Tidak mungkin menentukan posisi dan momentum elektron secara bersamaan dengan ketelitian sempurna (Δx · Δp ≥ h / 4π).",
        "Persamaan Gelombang Erwin Schrödinger (1926): Menghasilkan fungsi gelombang (Ψ) dan rapat probabilitas (|Ψ|²) untuk menggambarkan bentuk-bentuk orbital 3 dimensi (orbital s bentuk bola, orbital p bentuk balon terpilin/dumbbell, d, dan f).",
        "Dinyatakan oleh 4 Bilangan Kuantum: Utama (n), Azimut (l), Magnetik (m), dan Spin (s)."
      ],
      pros: [
        "Model atom paling mutakhir, akurat, dan diterima secara universal oleh fisika dan kimia modern.",
        "Mampu menjelaskan struktur elektronik seluruh unsur dalam sistem periodik, ikatan kimia, serta sifat magnetik dan optik."
      ],
      cons: [
        "Sangat kompleks secara matematis, membutuhkan pemahaman kalkulus diferensial parsial tinggi untuk kalkulasi eksak."
      ]
    }
  ],

  // 2. Partikel Penyusun Atom
  particles: {
    proton: {
      name: "Proton",
      symbol: "p⁺ atau ₁¹p",
      chargeRel: "+1",
      chargeC: "+1,602 × 10⁻¹⁹ Coulomb",
      massSma: "1,0073 sma",
      massKg: "1,673 × 10⁻²⁷ kg",
      discoverer: "Eugen Goldstein (1886) & Ernest Rutherford (1919)",
      experiment: "Percobaan Tabung Sinar Saluran / Sinar Terusan (Anoda)",
      location: "Di dalam Inti Atom (Nukleus)"
    },
    neutron: {
      name: "Neutron",
      symbol: "n⁰ atau ₀¹n",
      chargeRel: "0 (Netral)",
      chargeC: "0 Coulomb",
      massSma: "1,0087 sma",
      massKg: "1,675 × 10⁻²⁷ kg",
      discoverer: "James Chadwick (1932)",
      experiment: "Penembakan lempeng Berilium (Be) dengan partikel alfa (α)",
      location: "Di dalam Inti Atom bersama proton (Nukleon)"
    },
    electron: {
      name: "Elektron",
      symbol: "e⁻ atau ₋₁⁰e",
      chargeRel: "-1",
      chargeC: "-1,602 × 10⁻¹⁹ Coulomb",
      massSma: "0,00055 sma (~ 1/1836 massa proton)",
      massKg: "9,109 × 10⁻³¹ kg",
      discoverer: "J.J. Thomson (1897) & Robert Millikan (muatan, 1909)",
      experiment: "Tabung Sinar Katoda (Crookes) & Percobaan Tetes Minyak Millikan",
      location: "Mengelilingi inti pada orbital / kulit atom"
    }
  },

  // 3. Konsep Isotop, Isobar, Isoton, Isoelektron
  nuclideConcepts: {
    isotop: {
      title: "Isotop",
      keyLetter: "P",
      color: "var(--neon-cyan)",
      mnemonic: "Ingat huruf akhir 'P' = Jumlah PROTON sama (Nomor Atom Z sama)",
      rule: "Unsur SAMA (Z sama), Nomor Massa (A) BERBEDA, Neutron BERBEDA",
      definition: "Atom-atom dari unsur yang SAMA (memiliki nomor atom Z yang identik), namun memiliki NOMOR MASSA (A) yang berbeda dikarenakan perbedaan jumlah neutron di dalam inti atomnya.",
      formula: "Z₁ = Z₂  dan  A₁ ≠ A₂",
      nature: "Memiliki sifat kimia yang identik karena jumlah elektron valensinya sama, namun sifat fisikanya (seperti titik didih, massa jenis, dan laju difusi) sedikit berbeda.",
      abundanceInfo: "Adanya isotop menyebabkan massa atom relatif (Ar) unsur pada tabel periodik berupa bilangan desimal, dihitung dari rata-rata tertimbang kelimpahan isotop di alam: Ar = Σ (% kelimpahan × massa isotop).",
      examples: [
        { pair: "¹²₆C, ¹³₆C, ¹⁴₆C", note: "Isotop Karbon di alam. C-12 (98,9%), C-13 (1,1%), dan C-14 radioaktif yang digunakan untuk penanggalan usia fosil purbakala (radiocarbon dating)." },
        { pair: "¹₁H (Protium), ²₁H (Deuterium), ³₁H (Tritium)", note: "Isotop Hidrogen. Deuterium digunakan dalam pembuatan air berat (D₂O) reaktor nuklir, Tritium bersifat radioaktif." },
        { pair: "³⁵₁₇Cl dan ³⁷₁₇Cl", note: "Isotop Klorin di alam (rasio ~75% : 25%), menghasilkan massa atom relatif Ar Cl = 35,5 sma." },
        { pair: "²³⁵₉₂U dan ²³⁸₉₂U", note: "Isotop Uranium. U-235 digunakan sebagai bahan bakar fisi pembangkit listrik tenaga nuklir (PLTN)." }
      ],
      applications: [
        { label: "Medis", desc: "Iodium-131 (¹³¹I) untuk terapi & diagnosis kelenjar tiroid; Kobalt-60 (⁶⁰Co) untuk radioterapi sel kanker." },
        { label: "Arkeologi", desc: "Karbon-14 (¹⁴C) untuk menentukan umur fosil makhluk hidup purbakala hingga 50.000 tahun." },
        { label: "Pertanian & Industri", desc: "Fosfor-32 (³²P) sebagai perunut penyerapan pupuk fosfat; Natrium-24 (²⁴Na) untuk mendeteksi kebocoran pipa bawah tanah." }
      ]
    },
    isobar: {
      title: "Isobar",
      keyLetter: "BAR",
      color: "var(--neon-purple)",
      mnemonic: "Ingat suku kata 'BAR' = BERAT / Nomor Massa (A) sama",
      rule: "Unsur BERBEDA (Z berbeda), Nomor Massa (A) SAMA",
      definition: "Atom-atom dari unsur yang BERBEDA (memiliki nomor atom Z berbeda), namun memiliki NOMOR MASSA (A) yang SAMA persis.",
      formula: "A₁ = A₂  dan  Z₁ ≠ Z₂",
      nature: "Karena nomor atom Z berbeda, susunan elektron dan konfigurasi elektronnya sangat berbeda. Akibatnya, sifat kimia maupun sifat fisikanya sama sekali berbeda.",
      originInfo: "Isobar sering kali terbentuk dari hasil peluruhan radioaktif sinar beta (β⁻), di mana neutron berubah menjadi proton dengan memancarkan elektron, sehingga nomor massa tetap konstan tetapi nomor atom bertambah 1.",
      examples: [
        { pair: "¹⁴₆C dan ¹⁴₇N", note: "Keduanya memiliki nomor massa A = 14, namun unsur berbeda (Karbon Z=6 dan Nitrogen Z=7)." },
        { pair: "⁴⁰₁₈Ar, ⁴⁰₁₉K, dan ⁴⁰₂₀Ca", note: "Tiga isobar dengan nomor massa sama persis A = 40 (Gas mulia Argon, Logam alkali Kalium, dan Logam alkali tanah Kalsium)." },
        { pair: "²⁴₁₁Na dan ²⁴₁₂Mg", note: "Nomor massa sama-sama A = 24, Natrium memiliki 11 proton dan Magnesium memiliki 12 proton." },
        { pair: "³H dan ³He", note: "Nomor massa sama-sama A = 3 (Tritium dan Helium-3)." }
      ],
      applications: [
        { label: "Fisika Inti", desc: "Mempelajari garis isobarik pada bagan nuklida dan peluruhan beta negatif/positif." },
        { label: "Geokronologi", desc: "Penanggalan Kalium-Argon (K-Ar) pada batuan vulkanik berdasarkan rasio isotop/isobar ⁴⁰K menjadi ⁴⁰Ar." }
      ]
    },
    isoton: {
      title: "Isoton",
      keyLetter: "N",
      color: "var(--neon-amber)",
      mnemonic: "Ingat huruf akhir 'N' = Jumlah NEUTRON sama (A - Z sama)",
      rule: "Unsur BERBEDA (Z berbeda), Nomor Massa (A) BERBEDA, Jumlah Neutron (n) SAMA",
      definition: "Atom-atom dari unsur yang BERBEDA (Z berbeda dan A berbeda), namun memiliki JUMLAH NEUTRON yang SAMA PERSIS di dalam inti atomnya (dihitung dari rumus n = A - Z).",
      formula: "n₁ = (A₁ - Z₁) = (A₂ - Z₂) = n₂",
      nature: "Karena berasal dari unsur berbeda dengan konfigurasi elektron berbeda, pasangan isoton memiliki sifat kimia dan fisika yang berlainan.",
      stabilityInfo: "Kesamaan jumlah neutron penting dalam kajian stabilitas inti atom (rasio neutron terhadap proton, n/p, pada pita kestabilan inti).",
      examples: [
        { pair: "¹⁴₆C dan ¹⁶₈O", note: "Neutron Karbon-14: 14 - 6 = 8 neutron. Neutron Oksigen-16: 16 - 8 = 8 neutron. Keduanya sama-sama memiliki 8 neutron." },
        { pair: "³¹₁₅P dan ³²₁₆S", note: "Neutron Fosfor: 31 - 15 = 16 neutron. Neutron Belerang: 32 - 16 = 16 neutron." },
        { pair: "³⁹₁₉K dan ⁴⁰₂₀Ca", note: "Neutron Kalium: 39 - 19 = 20 neutron. Neutron Kalsium: 40 - 20 = 20 neutron." },
        { pair: "¹³₆C dan ¹⁴₇N", note: "Neutron Karbon-13: 13 - 6 = 7 neutron. Neutron Nitrogen-14: 14 - 7 = 7 neutron." }
      ],
      applications: [
        { label: "Kestabilan Inti", desc: "Membantu fisikawan nuklir memahami bilangan ajaib (magic numbers) neutron: 2, 8, 20, 28, 50, 82, 126 yang memberikan stabilitas inti ekstra." }
      ]
    },
    isoelektron: {
      title: "Isoelektron",
      keyLetter: "ELEKTRON",
      color: "var(--neon-emerald)",
      mnemonic: "Ingat kata 'ELEKTRON' = Total ELEKTRON sama (setelah membentuk ion/netral)",
      rule: "Spesi atom atau ion yang memiliki JUMLAH ELEKTRON SAMA dan Konfigurasi Elektron IDENTIK",
      definition: "Spesi-spesi kimia (dapat berupa atom netral kation bermuatan positif, maupun anion bermuatan negatif) yang memiliki JUMLAH ELEKTRON yang SAMA PERSIS dan susunan konfigurasi elektron yang identik.",
      formula: "e₁ = (Z₁ - q₁) = (Z₂ - q₂) = e₂  (dengan q = muatan spesi)",
      nature: "Meskipun konfigurasi elektronnya sama, sifat spesi isoelektronik tetap dipengaruhi oleh jumlah proton inti (Z). Semakin besar Z, tarikan inti semakin kuat sehingga jari-jari ion semakin kecil.",
      ionicRadiusRule: "KAIDAH EMAS UTBK: Pada spesi isoelektronik, semakin BESAR nomor atom (Z), semakin KECIL jari-jari atom/ion karena muatan inti efektif (gaya tarik proton terhadap elektron) semakin kuat!",
      examples: [
        { pair: "₇N³⁻, ₈O²⁻, ₉F⁻, ₁₀Ne, ₁₁Na⁺, ₁₂Mg²⁺, ₁₃Al³⁺", note: "Deret Isoelektronik 10 Elektron (semua e = 10, konfigurasi 1s² 2s² 2p⁶). Urutan jari-jari ion: N³⁻ > O²⁻ > F⁻ > Ne > Na⁺ > Mg²⁺ > Al³⁺." },
        { pair: "₁₅P³⁻, ₁₆S²⁻, ₁₇Cl⁻, ₁₈Ar, ₁₉K⁺, ₂₀Ca²⁺", note: "Deret Isoelektronik 18 Elektron (semua e = 18, konfigurasi [Ne] 3s² 3p⁶). Urutan jari-jari ion: P³⁻ > S²⁻ > Cl⁻ > Ar > K⁺ > Ca²⁺." },
        { pair: "₁H⁻, ₂He, ₃Li⁺, ₄Be²⁺", note: "Deret Isoelektronik 2 Elektron (semua e = 2, konfigurasi 1s²)." }
      ],
      applications: [
        { label: "Ikatan Kimia", desc: "Atom-atom cenderung melepas atau menangkap elektron agar mencapai konfigurasi isoelektronik stabil seperti gas mulia (Kaidah Oktet & Duplet Lewis)." },
        { label: "Prediksi Sifat Periodik", desc: "Membandingkan energi ionisasi dan ukuran jari-jari ion dalam kristal senyawa ionik." }
      ]
    }
  },

  // Preset Pasangan untuk Laboratorium Komparator Spesi
  comparatorPresets: [
    {
      id: "preset-c12-c14",
      label: "¹²₆C & ¹⁴₆C",
      tag: "Isotop",
      tagColor: "var(--neon-cyan)",
      s1: { z: 6, a: 12, q: 0, s: "C", name: "Karbon-12" },
      s2: { z: 6, a: 14, q: 0, s: "C", name: "Karbon-14" },
      expected: "isotop"
    },
    {
      id: "preset-c14-n14",
      label: "¹⁴₆C & ¹⁴₇N",
      tag: "Isobar",
      tagColor: "var(--neon-purple)",
      s1: { z: 6, a: 14, q: 0, s: "C", name: "Karbon-14" },
      s2: { z: 7, a: 14, q: 0, s: "N", name: "Nitrogen-14" },
      expected: "isobar"
    },
    {
      id: "preset-c14-o16",
      label: "¹⁴₆C & ¹⁶₈O",
      tag: "Isoton",
      tagColor: "var(--neon-amber)",
      s1: { z: 6, a: 14, q: 0, s: "C", name: "Karbon-14" },
      s2: { z: 8, a: 16, q: 0, s: "O", name: "Oksigen-16" },
      expected: "isoton"
    },
    {
      id: "preset-na-ne",
      label: "²³₁₁Na⁺ & ²⁰₁₀Ne",
      tag: "Isoelektron",
      tagColor: "var(--neon-emerald)",
      s1: { z: 11, a: 23, q: 1, s: "Na", name: "Ion Natrium" },
      s2: { z: 10, a: 20, q: 0, s: "Ne", name: "Neon Netral" },
      expected: "isoelektron"
    },
    {
      id: "preset-f-mg",
      label: "¹⁹₉F⁻ & ²⁴₁₂Mg²⁺",
      tag: "Isoelektron",
      tagColor: "var(--neon-emerald)",
      s1: { z: 9, a: 19, q: -1, s: "F", name: "Ion Fluorida" },
      s2: { z: 12, a: 24, q: 2, s: "Mg", name: "Ion Magnesium" },
      expected: "isoelektron"
    },
    {
      id: "preset-k40-ca40",
      label: "⁴⁰₁₉K & ⁴⁰₂₀Ca",
      tag: "Isobar",
      tagColor: "var(--neon-purple)",
      s1: { z: 19, a: 40, q: 0, s: "K", name: "Kalium-40" },
      s2: { z: 20, a: 40, q: 0, s: "Ca", name: "Kalsium-40" },
      expected: "isobar"
    },
    {
      id: "preset-p31-s32",
      label: "³¹₁₅P & ³²₁₆S",
      tag: "Isoton",
      tagColor: "var(--neon-amber)",
      s1: { z: 15, a: 31, q: 0, s: "P", name: "Fosfor-31" },
      s2: { z: 16, a: 32, q: 0, s: "S", name: "Belerang-32" },
      expected: "isoton"
    },
    {
      id: "preset-cl-k",
      label: "³⁵₁₇Cl⁻ & ³⁹₁₉K⁺",
      tag: "Isoelektron",
      tagColor: "var(--neon-emerald)",
      s1: { z: 17, a: 35, q: -1, s: "Cl", name: "Ion Klorida" },
      s2: { z: 19, a: 39, q: 1, s: "K", name: "Ion Kalium" },
      expected: "isoelektron"
    }
  ],

  // Kuis Kilat Mandiri khusus materi Isotop, Isobar, Isoton, Isoelektron
  isoMiniQuizQuestions: [
    {
      id: 1,
      q: "Pasangan spesi berikut yang tergolong ISOELEKTRONIK adalah...",
      options: [
        "₁₁Na⁺ dan ₁₉K⁺",
        "₁₁Na⁺ dan ₁₀Ne",
        "¹²₆C dan ¹⁴₆C",
        "⁴⁰₁₉K dan ⁴⁰₂₀Ca"
      ],
      ans: 1,
      exp: "Ion ₁₁Na⁺ melepaskan 1 elektron sehingga jumlah elektronnya = 11 - 1 = 10. Atom netral ₁₀Ne memiliki 10 elektron. Karena keduanya memiliki jumlah elektron sama (10 e⁻) dan konfigurasi 1s² 2s² 2p⁶, maka keduanya adalah pasangan ISOELEKTRONIK."
    },
    {
      id: 2,
      q: "Nuklida ³¹₁₅P dan ³²₁₆S tergolong sebagai pasangan...",
      options: [
        "Isotop karena berada pada periode yang sama",
        "Isobar karena nomor massanya hampir sama",
        "Isoton karena keduanya memiliki 16 neutron",
        "Isoelektron karena elektron valensinya sama"
      ],
      ans: 2,
      exp: "Jumlah neutron P = 31 - 15 = 16 neutron. Jumlah neutron S = 32 - 16 = 16 neutron. Karena jumlah neutronnya sama persis (16) sedangkan nomor atomnya berbeda (15 dan 16), maka pasangan ini tergolong ISOTON."
    },
    {
      id: 3,
      q: "Pernyataan yang PALING TEPAT mengenai pasangan ISOBAR adalah...",
      options: [
        "Memiliki nomor atom sama dan nomor massa sama",
        "Memiliki nomor massa sama tetapi berasal dari unsur berbeda",
        "Memiliki sifat kimia yang identik karena nomor massanya sama",
        "Merupakan atom-atom dari unsur yang sama dengan neutron berbeda"
      ],
      ans: 1,
      exp: "ISOBAR adalah atom-atom dari unsur berbeda (nomor atom Z berbeda) yang kebetulan memiliki NOMOR MASSA (A) yang sama persis (misal ¹⁴₆C dan ¹⁴₇N). Karena nomor atomnya berbeda, sifat kimianya juga sangat berlainan."
    },
    {
      id: 4,
      q: "Di antara spesi isoelektronik ₇N³⁻, ₈O²⁻, ₉F⁻, dan ₁₁Na⁺, spesi yang memiliki JARI-JARI PALING KECIL adalah...",
      options: [
        "₇N³⁻ karena muatan negatifnya paling besar",
        "₈O²⁻ karena nomor atomnya genap",
        "₉F⁻ karena merupakan halogen paling elektronegatif",
        "₁₁Na⁺ karena memiliki muatan inti (proton) paling besar"
      ],
      ans: 3,
      exp: "Seluruh spesi tersebut memiliki 10 elektron. Namun ₁₁Na⁺ memiliki 11 proton di dalam inti (paling banyak di antara keempatnya), sehingga gaya tarik inti terhadap elektron-elektron terluar paling kuat dan menarik awan elektron lebih dekat ke pusat, menghasilkan jari-jari paling kecil!"
    }
  ],

  // 4. Data 36 Unsur Pertama untuk Kalkulator & Game
  elements: [
    { z: 1, s: "H", name: "Hidrogen", a: 1, bohr: [1], aufbau: "1s¹", group: "IA", period: 1, val: 1 },
    { z: 2, s: "He", name: "Helium", a: 4, bohr: [2], aufbau: "1s²", group: "VIIIA", period: 1, val: 2 },
    { z: 3, s: "Li", name: "Litium", a: 7, bohr: [2, 1], aufbau: "1s² 2s¹", group: "IA", period: 2, val: 1 },
    { z: 4, s: "Be", name: "Berilium", a: 9, bohr: [2, 2], aufbau: "1s² 2s²", group: "IIA", period: 2, val: 2 },
    { z: 5, s: "B", name: "Boron", a: 11, bohr: [2, 3], aufbau: "1s² 2s² 2p¹", group: "IIIA", period: 2, val: 3 },
    { z: 6, s: "C", name: "Karbon", a: 12, bohr: [2, 4], aufbau: "1s² 2s² 2p²", group: "IVA", period: 2, val: 4 },
    { z: 7, s: "N", name: "Nitrogen", a: 14, bohr: [2, 5], aufbau: "1s² 2s² 2p³", group: "VA", period: 2, val: 5 },
    { z: 8, s: "O", name: "Oksigen", a: 16, bohr: [2, 6], aufbau: "1s² 2s² 2p⁴", group: "VIA", period: 2, val: 6 },
    { z: 9, s: "F", name: "Fluorin", a: 19, bohr: [2, 7], aufbau: "1s² 2s² 2p⁵", group: "VIIA", period: 2, val: 7 },
    { z: 10, s: "Ne", name: "Neon", a: 20, bohr: [2, 8], aufbau: "1s² 2s² 2p⁶", group: "VIIIA", period: 2, val: 8 },
    { z: 11, s: "Na", name: "Natrium", a: 23, bohr: [2, 8, 1], aufbau: "[Ne] 3s¹", group: "IA", period: 3, val: 1 },
    { z: 12, s: "Mg", name: "Magnesium", a: 24, bohr: [2, 8, 2], aufbau: "[Ne] 3s²", group: "IIA", period: 3, val: 2 },
    { z: 13, s: "Al", name: "Aluminium", a: 27, bohr: [2, 8, 3], aufbau: "[Ne] 3s² 3p¹", group: "IIIA", period: 3, val: 3 },
    { z: 14, s: "Si", name: "Silikon", a: 28, bohr: [2, 8, 4], aufbau: "[Ne] 3s² 3p²", group: "IVA", period: 3, val: 4 },
    { z: 15, s: "P", name: "Fosfor", a: 31, bohr: [2, 8, 5], aufbau: "[Ne] 3s² 3p³", group: "VA", period: 3, val: 5 },
    { z: 16, s: "S", name: "Belerang", a: 32, bohr: [2, 8, 6], aufbau: "[Ne] 3s² 3p⁴", group: "VIA", period: 3, val: 6 },
    { z: 17, s: "Cl", name: "Klorin", a: 35, bohr: [2, 8, 7], aufbau: "[Ne] 3s² 3p⁵", group: "VIIA", period: 3, val: 7 },
    { z: 18, s: "Ar", name: "Argon", a: 40, bohr: [2, 8, 8], aufbau: "[Ne] 3s² 3p⁶", group: "VIIIA", period: 3, val: 8 },
    { z: 19, s: "K", name: "Kalium", a: 39, bohr: [2, 8, 8, 1], aufbau: "[Ar] 4s¹", group: "IA", period: 4, val: 1 },
    { z: 20, s: "Ca", name: "Kalsium", a: 40, bohr: [2, 8, 8, 2], aufbau: "[Ar] 4s²", group: "IIA", period: 4, val: 2 },
    { z: 21, s: "Sc", name: "Skandium", a: 45, bohr: [2, 8, 9, 2], aufbau: "[Ar] 3d¹ 4s²", group: "IIIB", period: 4, val: 2 },
    { z: 22, s: "Ti", name: "Titanium", a: 48, bohr: [2, 8, 10, 2], aufbau: "[Ar] 3d² 4s²", group: "IVB", period: 4, val: 2 },
    { z: 23, s: "V", name: "Vanadium", a: 51, bohr: [2, 8, 11, 2], aufbau: "[Ar] 3d³ 4s²", group: "VB", period: 4, val: 2 },
    { z: 24, s: "Cr", name: "Kromium", a: 52, bohr: [2, 8, 13, 1], aufbau: "[Ar] 3d⁵ 4s¹ (Anomali Kestabilan Setengah Penuh)", group: "VIB", period: 4, val: 1 },
    { z: 25, s: "Mn", name: "Mangan", a: 55, bohr: [2, 8, 13, 2], aufbau: "[Ar] 3d⁵ 4s²", group: "VIIB", period: 4, val: 2 },
    { z: 26, s: "Fe", name: "Besi", a: 56, bohr: [2, 8, 14, 2], aufbau: "[Ar] 3d⁶ 4s²", group: "VIIIB", period: 4, val: 2 },
    { z: 27, s: "Co", name: "Kobalt", a: 59, bohr: [2, 8, 15, 2], aufbau: "[Ar] 3d⁷ 4s²", group: "VIIIB", period: 4, val: 2 },
    { z: 28, s: "Ni", name: "Nikel", a: 59, bohr: [2, 8, 16, 2], aufbau: "[Ar] 3d⁸ 4s²", group: "VIIIB", period: 4, val: 2 },
    { z: 29, s: "Cu", name: "Tembaga", a: 64, bohr: [2, 8, 18, 1], aufbau: "[Ar] 3d¹⁰ 4s¹ (Anomali Kestabilan Penuh)", group: "IB", period: 4, val: 1 },
    { z: 30, s: "Zn", name: "Seng", a: 65, bohr: [2, 8, 18, 2], aufbau: "[Ar] 3d¹⁰ 4s²", group: "IIB", period: 4, val: 2 },
    { z: 31, s: "Ga", name: "Galium", a: 70, bohr: [2, 8, 18, 3], aufbau: "[Ar] 3d¹⁰ 4s² 4p¹", group: "IIIA", period: 4, val: 3 },
    { z: 32, s: "Ge", name: "Germanium", a: 73, bohr: [2, 8, 18, 4], aufbau: "[Ar] 3d¹⁰ 4s² 4p²", group: "IVA", period: 4, val: 4 },
    { z: 33, s: "As", name: "Arsenik", a: 75, bohr: [2, 8, 18, 5], aufbau: "[Ar] 3d¹⁰ 4s² 4p³", group: "VA", period: 4, val: 5 },
    { z: 34, s: "Se", name: "Selenium", a: 79, bohr: [2, 8, 18, 6], aufbau: "[Ar] 3d¹⁰ 4s² 4p⁴", group: "VIA", period: 4, val: 6 },
    { z: 35, s: "Br", name: "Bromin", a: 80, bohr: [2, 8, 18, 7], aufbau: "[Ar] 3d¹⁰ 4s² 4p⁵", group: "VIIA", period: 4, val: 7 },
    { z: 36, s: "Kr", name: "Kripton", a: 84, bohr: [2, 8, 18, 8], aufbau: "[Ar] 3d¹⁰ 4s² 4p⁶", group: "VIIIA", period: 4, val: 8 }
  ]
};

window.MATERI_DATA = MATERI_DATA;
