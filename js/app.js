/**
 * ATOMIKA X - Master Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Visualizers & Engines
  let heroVisualizer = null;
  let modelVisualizer = null;
  let buildAtomSim = null;
  let arcadeGame = null;
  let sorterGame = null;
  let quizEngine = null;

  try {
    heroVisualizer = new window.AtomVisualizer('heroAtomCanvas', { mode: 'bohr', isHero: true });
  } catch (e) {
    console.error("Hero visualizer init error:", e);
  }

  try {
    modelVisualizer = new window.AtomVisualizer('modelInteractiveCanvas', { mode: 'dalton' });
  } catch (e) {
    console.error("Model visualizer init error:", e);
  }

  try {
    buildAtomSim = new window.BuildAtomSimulator();
  } catch (e) {
    console.error("Build atom sim init error:", e);
  }

  try {
    arcadeGame = new window.QuantumCatcherGame();
  } catch (e) {
    console.error("Arcade game init error:", e);
  }

  try {
    sorterGame = new window.NuclideSorterGame();
  } catch (e) {
    console.error("Sorter game init error:", e);
  }

  try {
    quizEngine = new window.QuizEngine();
  } catch (e) {
    console.error("Quiz engine init error:", e);
  }

  // 2. Global Toast Notification Helper
  window.showToast = function(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>⚛️</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  };

  // 3. Navbar Scroll & Mobile Drawer
  const navbar = document.querySelector('.header-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');
  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
    });
  });

  // 4. Audio Toggle Button
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const updateAudioBtnUI = () => {
    if (!audioToggleBtn || !window.soundFx) return;
    if (window.soundFx.isMuted) {
      audioToggleBtn.classList.add('muted');
      audioToggleBtn.innerHTML = '🔇';
      audioToggleBtn.title = 'Nyalakan Suara';
    } else {
      audioToggleBtn.classList.remove('muted');
      audioToggleBtn.innerHTML = '🔊';
      audioToggleBtn.title = 'Matikan Suara';
    }
  };
  updateAudioBtnUI();

  audioToggleBtn?.addEventListener('click', () => {
    if (window.soundFx) {
      const isMuted = window.soundFx.toggleMute();
      updateAudioBtnUI();
      window.showToast(isMuted ? "Suara dinonaktifkan 🔇" : "Suara diaktifkan 🔊");
    }
  });

  // 5. Theme Toggle Button
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('atomika_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  if (themeToggleBtn) {
    themeToggleBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('atomika_theme', newTheme);
    themeToggleBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    if (window.soundFx) window.soundFx.playClick();
  });

  // 6. Materi Sub-Tabs Navigation
  const materiTabs = document.querySelectorAll('.materi-tab-btn');
  const materiContents = document.querySelectorAll('.materi-tab-content');

  materiTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      materiTabs.forEach(t => t.classList.remove('active'));
      materiContents.forEach(c => c.classList.remove('active'));

      const targetTab = e.currentTarget.dataset.tab;
      e.currentTarget.classList.add('active');
      document.getElementById(`materi-${targetTab}`)?.classList.add('active');
      if (window.soundFx) window.soundFx.playClick();
    });
  });

  // 7. Atomic Model Timeline Switcher
  const modelCards = document.querySelectorAll('.model-pill-card');
  const renderModelDetail = (modelId) => {
    if (!window.MATERI_DATA) return;
    const model = window.MATERI_DATA.models.find(m => m.id === modelId);
    if (!model) return;

    // Update Text Content
    document.getElementById('modelStageTitle').textContent = model.name;
    document.getElementById('modelStageYear').textContent = `Tahun ${model.year}`;
    document.getElementById('modelStageAnalogy').textContent = `Analogi: ${model.analogy}`;

    // Postulates
    const postList = document.getElementById('modelPostulatesList');
    if (postList) {
      postList.innerHTML = model.postulates.map(p => `<li>${p}</li>`).join('');
    }

    // Pros
    const prosList = document.getElementById('modelProsList');
    if (prosList) {
      prosList.innerHTML = model.pros.map(pr => `<div>✓ ${pr}</div>`).join('');
    }

    // Cons
    const consList = document.getElementById('modelConsList');
    if (consList) {
      consList.innerHTML = model.cons.map(cn => `<div>✗ ${cn}</div>`).join('');
    }

    // Update 3D Canvas visualizer mode
    if (modelVisualizer) {
      modelVisualizer.setMode(modelId);
    }
  };

  modelCards.forEach(card => {
    card.addEventListener('click', (e) => {
      modelCards.forEach(c => c.classList.remove('active'));
      const el = e.currentTarget;
      el.classList.add('active');
      const modelId = el.dataset.model;
      renderModelDetail(modelId);
      if (window.soundFx) window.soundFx.playClick();
    });
  });

  // Initial load for first model (Dalton)
  renderModelDetail('dalton');

  // 8. Games Hub Tabs Switcher
  const gameTabs = document.querySelectorAll('.game-tab-btn');
  const gameWrappers = document.querySelectorAll('.game-wrapper');

  gameTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      gameTabs.forEach(t => t.classList.remove('active'));
      gameWrappers.forEach(w => w.classList.remove('active'));

      const targetGame = e.currentTarget.dataset.game;
      e.currentTarget.classList.add('active');
      document.getElementById(`game-${targetGame}`)?.classList.add('active');
      if (window.soundFx) window.soundFx.playClick();
    });
  });

  // 9. Interactive Nuclide Calculator
  const calcSelect = document.getElementById('nuclideElementSelect');
  const calcMassInput = document.getElementById('calcMassInput');
  const calcChargeSelect = document.getElementById('calcChargeSelect');

  // Populate element dropdown
  if (calcSelect && window.MATERI_DATA) {
    window.MATERI_DATA.elements.forEach(el => {
      const opt = document.createElement('option');
      opt.value = el.z;
      opt.textContent = `${el.z}. ${el.name} (${el.s}) - Massa: ${el.a}`;
      calcSelect.appendChild(opt);
    });
    calcSelect.value = "11"; // Default Natrium
  }

  const updateNuclideCalculator = () => {
    if (!window.MATERI_DATA) return;
    const z = parseInt(calcSelect?.value || '11', 10);
    const elData = window.MATERI_DATA.elements[z - 1] || { s: 'X', a: z * 2 };
    const massA = parseInt(calcMassInput?.value || elData.a.toString(), 10);
    const charge = parseInt(calcChargeSelect?.value || '0', 10);

    const protons = z;
    const neutrons = Math.max(0, massA - z);
    const electrons = Math.max(0, z - charge);

    // Update Visual Symbol
    const symMass = document.getElementById('calcResMass');
    const symAtomic = document.getElementById('calcResAtomic');
    const symChar = document.getElementById('calcResSymbol');
    const symCharge = document.getElementById('calcResCharge');

    if (symMass) symMass.textContent = massA;
    if (symAtomic) symAtomic.textContent = z;
    if (symChar) symChar.textContent = elData.s;

    if (symCharge) {
      if (charge === 0) symCharge.textContent = '';
      else if (charge > 0) symCharge.textContent = charge === 1 ? '+' : `${charge}+`;
      else symCharge.textContent = charge === -1 ? '-' : `${Math.abs(charge)}-`;
    }

    // Update Result Numbers
    const pOut = document.getElementById('calcOutProtons');
    const nOut = document.getElementById('calcOutNeutrons');
    const eOut = document.getElementById('calcOutElectrons');

    if (pOut) pOut.textContent = protons;
    if (nOut) nOut.textContent = neutrons;
    if (eOut) eOut.textContent = electrons;
  };

  calcSelect?.addEventListener('change', () => {
    if (window.MATERI_DATA) {
      const z = parseInt(calcSelect.value, 10);
      const elData = window.MATERI_DATA.elements[z - 1];
      if (elData && calcMassInput) {
        calcMassInput.value = elData.a;
      }
    }
    updateNuclideCalculator();
    if (window.soundFx) window.soundFx.playClick();
  });

  calcMassInput?.addEventListener('input', updateNuclideCalculator);
  calcChargeSelect?.addEventListener('change', updateNuclideCalculator);
  updateNuclideCalculator();

  // 10. Interactive Configuration Generator
  const configSelect = document.getElementById('configElementSelect');
  if (configSelect && window.MATERI_DATA) {
    window.MATERI_DATA.elements.forEach(el => {
      const opt = document.createElement('option');
      opt.value = el.z;
      opt.textContent = `${el.z}. ${el.name} (${el.s})`;
      configSelect.appendChild(opt);
    });
    configSelect.value = "17"; // Default Klorin (Cl)
  }

  const updateConfigDisplay = () => {
    if (!window.MATERI_DATA) return;
    const z = parseInt(configSelect?.value || '17', 10);
    const el = window.MATERI_DATA.elements[z - 1];
    if (!el) return;

    // Bohr Shells
    const shellsWrap = document.getElementById('configBohrShells');
    if (shellsWrap) {
      const shellNames = ['K', 'L', 'M', 'N'];
      shellsWrap.innerHTML = el.bohr.map((count, idx) => `
        <div class="shell-ring-badge">
          <span class="shell-ring-letter">Kulit ${shellNames[idx]} (n=${idx + 1})</span>
          <span class="shell-ring-count">${count} e⁻</span>
        </div>
      `).join('');
    }

    // Aufbau Subshell
    const aufbauStr = document.getElementById('configAufbauStr');
    if (aufbauStr) aufbauStr.textContent = el.aufbau;

    // Valence, Period, Group
    const valEl = document.getElementById('configValence');
    const grpEl = document.getElementById('configGroup');
    const perEl = document.getElementById('configPeriod');

    if (valEl) valEl.textContent = `${el.val} elektron valensi`;
    if (grpEl) grpEl.textContent = `Golongan ${el.group}`;
    if (perEl) perEl.textContent = `Periode ${el.period}`;
  };

  configSelect?.addEventListener('change', () => {
    updateConfigDisplay();
    if (window.soundFx) window.soundFx.playClick();
  });
  updateConfigDisplay();

  // 11. Curated Video Theater Switcher
  const videoPlaylist = [
    {
      id: "video1",
      title: "Perkembangan Model Atom: Dalton hingga Mekanika Kuantum",
      duration: "12:45",
      embedUrl: "https://www.youtube.com/embed/cK7p99K96sM?autoplay=0",
      notes: [
        "Thomson membuktikan atom bukan partikel terkecil melalui penemuan elektron (sinar katoda).",
        "Rutherford menemukan inti atom bermuatan positif lewat hamburan sinar alfa pada lempeng emas.",
        "Bohr merumuskan konsep kulit energi terkuantisasi (K, L, M) dan transisi foton.",
        "Mekanika Gelombang menyatakan posisi elektron sebagai probabilitas orbital 3D."
      ]
    },
    {
      id: "video2",
      title: "Cara Cepat Menentukan Proton, Elektron, Neutron & Notasi Ion",
      duration: "10:15",
      embedUrl: "https://www.youtube.com/embed/2-zN5i_g9cM?autoplay=0",
      notes: [
        "Nomor massa A = Proton + Neutron.",
        "Nomor atom Z = Jumlah Proton = Jumlah Elektron (pada atom netral).",
        "Kation bermuatan positif: melepas elektron (e = Z - muatan).",
        "Anion bermuatan negatif: menangkap elektron (e = Z + muatan)."
      ]
    },
    {
      id: "video3",
      title: "Konfigurasi Elektron Bohr & Aturan Aufbau Mekanika Kuantum",
      duration: "14:20",
      embedUrl: "https://www.youtube.com/embed/0xI75O1B_Zg?autoplay=0",
      notes: [
        "Kapasitas kulit Bohr dihitung dengan rumus 2n².",
        "Aturan Aufbau: pengisian orbital dimulai dari tingkat energi terendah (1s, 2s, 2p, 3s...).",
        "Aturan Hund: orbital dengan energi setara diisi satu-satu dengan spin sejajar sebelum berpasangan.",
        "Larangan Pauli: tidak boleh ada 2 elektron dengan 4 bilangan kuantum identik."
      ]
    }
  ];

  const playlistItems = document.querySelectorAll('.playlist-item');
  const videoIframe = document.getElementById('videoFrame');
  const videoTitleEl = document.getElementById('currentVideoTitle');
  const videoNotesList = document.getElementById('videoNotesList');

  const switchVideo = (videoIndex) => {
    const v = videoPlaylist[videoIndex];
    if (!v) return;

    if (videoIframe) videoIframe.src = v.embedUrl;
    if (videoTitleEl) videoTitleEl.textContent = v.title;
    if (videoNotesList) {
      videoNotesList.innerHTML = v.notes.map(n => `<li>${n}</li>`).join('');
    }

    playlistItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === videoIndex);
    });
  };

  playlistItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.dataset.index, 10);
      switchVideo(idx);
      if (window.soundFx) window.soundFx.playClick();
    });
  });

  // 12. Modal Handlers
  document.querySelectorAll('.modal-close-btn, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el) {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      }
    });
  });

  // Hero Excite Button
  document.getElementById('btnHeroExcite')?.addEventListener('click', () => {
    if (heroVisualizer) heroVisualizer.exciteElectron();
  });

  // Preset button loaders for Build an Atom
  document.getElementById('presetNeutralC')?.addEventListener('click', () => {
    if (buildAtomSim) buildAtomSim.loadPreset(6, 6, 6);
  });
  document.getElementById('presetCationNa')?.addEventListener('click', () => {
    if (buildAtomSim) buildAtomSim.loadPreset(11, 12, 10);
  });
  document.getElementById('presetAnionO')?.addEventListener('click', () => {
    if (buildAtomSim) buildAtomSim.loadPreset(8, 8, 10);
  });

  // ===================================================================
  // 13. Jump to Isotop Tab from Notasi Tab CTA
  // ===================================================================
  document.getElementById('btnGoToIsotopTab')?.addEventListener('click', () => {
    document.querySelectorAll('.materi-tab-btn').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.materi-tab-content').forEach(c => c.classList.remove('active'));

    const tabBtn = document.getElementById('tabBtnIsotop');
    const content = document.getElementById('materi-isotop');
    tabBtn?.classList.add('active');
    content?.classList.add('active');

    if (window.soundFx) window.soundFx.playClick();
    content?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // ===================================================================
  // 14. Species Comparator & Classifier Interactive Lab
  // ===================================================================
  const comp1Select = document.getElementById('comp1Select');
  const comp1MassInput = document.getElementById('comp1MassInput');
  const comp1ChargeSelect = document.getElementById('comp1ChargeSelect');

  const comp2Select = document.getElementById('comp2Select');
  const comp2MassInput = document.getElementById('comp2MassInput');
  const comp2ChargeSelect = document.getElementById('comp2ChargeSelect');

  // Populate element dropdowns for both species
  if (comp1Select && comp2Select && window.MATERI_DATA) {
    window.MATERI_DATA.elements.forEach(el => {
      const opt1 = document.createElement('option');
      opt1.value = el.z;
      opt1.textContent = `${el.z}. ${el.name} (${el.s}) - Massa: ${el.a}`;
      comp1Select.appendChild(opt1);

      const opt2 = document.createElement('option');
      opt2.value = el.z;
      opt2.textContent = `${el.z}. ${el.name} (${el.s}) - Massa: ${el.a}`;
      comp2Select.appendChild(opt2);
    });

    comp1Select.value = "6"; // Default C-12
    comp2Select.value = "6"; // Default C-14
  }

  // Populate preset buttons
  const presetsContainer = document.getElementById('comparatorPresetsList');
  if (presetsContainer && window.MATERI_DATA && window.MATERI_DATA.comparatorPresets) {
    window.MATERI_DATA.comparatorPresets.forEach((preset, index) => {
      const btn = document.createElement('button');
      btn.className = `comparator-preset-btn ${index === 0 ? 'active' : ''}`;
      btn.innerHTML = `<span>${preset.label}</span> <span class="badge" style="background:${preset.tagColor}22; color:${preset.tagColor};">${preset.tag}</span>`;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.comparator-preset-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Apply preset
        if (comp1Select) comp1Select.value = preset.s1.z;
        if (comp1MassInput) comp1MassInput.value = preset.s1.a;
        if (comp1ChargeSelect) comp1ChargeSelect.value = preset.s1.q;

        if (comp2Select) comp2Select.value = preset.s2.z;
        if (comp2MassInput) comp2MassInput.value = preset.s2.a;
        if (comp2ChargeSelect) comp2ChargeSelect.value = preset.s2.q;

        updateSpeciesComparator();
        if (window.soundFx) window.soundFx.playPop(700);
      });
      presetsContainer.appendChild(btn);
    });
  }

  const updateSpeciesComparator = () => {
    if (!window.MATERI_DATA) return;

    // Species 1 Data
    const z1 = parseInt(comp1Select?.value || '6', 10);
    const el1 = window.MATERI_DATA.elements[z1 - 1] || { s: 'X', name: 'Unsur X', a: z1 * 2 };
    const a1 = parseInt(comp1MassInput?.value || el1.a.toString(), 10);
    const q1 = parseInt(comp1ChargeSelect?.value || '0', 10);

    const p1 = z1;
    const n1 = Math.max(0, a1 - z1);
    const e1 = Math.max(0, z1 - q1);

    // Species 2 Data
    const z2 = parseInt(comp2Select?.value || '6', 10);
    const el2 = window.MATERI_DATA.elements[z2 - 1] || { s: 'Y', name: 'Unsur Y', a: z2 * 2 };
    const a2 = parseInt(comp2MassInput?.value || el2.a.toString(), 10);
    const q2 = parseInt(comp2ChargeSelect?.value || '0', 10);

    const p2 = z2;
    const n2 = Math.max(0, a2 - z2);
    const e2 = Math.max(0, z2 - q2);

    // Format charge string
    const formatCharge = (q) => {
      if (q === 0) return '';
      if (q > 0) return q === 1 ? '+' : `${q}+`;
      return q === -1 ? '-' : `${Math.abs(q)}-`;
    };

    // Update Species 1 UI
    const m1Disp = document.getElementById('comp1MassDisplay');
    const z1Disp = document.getElementById('comp1AtomicDisplay');
    const s1Disp = document.getElementById('comp1SymbolDisplay');
    const q1Disp = document.getElementById('comp1ChargeDisplay');
    const p1Out = document.getElementById('comp1Protons');
    const n1Out = document.getElementById('comp1Neutrons');
    const e1Out = document.getElementById('comp1Electrons');

    if (m1Disp) m1Disp.textContent = a1;
    if (z1Disp) z1Disp.textContent = z1;
    if (s1Disp) s1Disp.textContent = el1.s;
    if (q1Disp) q1Disp.textContent = formatCharge(q1);
    if (p1Out) p1Out.textContent = p1;
    if (n1Out) n1Out.textContent = n1;
    if (e1Out) e1Out.textContent = e1;

    // Update Species 2 UI
    const m2Disp = document.getElementById('comp2MassDisplay');
    const z2Disp = document.getElementById('comp2AtomicDisplay');
    const s2Disp = document.getElementById('comp2SymbolDisplay');
    const q2Disp = document.getElementById('comp2ChargeDisplay');
    const p2Out = document.getElementById('comp2Protons');
    const n2Out = document.getElementById('comp2Neutrons');
    const e2Out = document.getElementById('comp2Electrons');

    if (m2Disp) m2Disp.textContent = a2;
    if (z2Disp) z2Disp.textContent = z2;
    if (s2Disp) s2Disp.textContent = el2.s;
    if (q2Disp) q2Disp.textContent = formatCharge(q2);
    if (p2Out) p2Out.textContent = p2;
    if (n2Out) n2Out.textContent = n2;
    if (e2Out) e2Out.textContent = e2;

    // Reset glow match
    document.querySelectorAll('.comp-counter').forEach(c => c.classList.remove('glow-match'));

    // Check relationships
    const isSameProton = (z1 === z2);
    const isSameMass = (a1 === a2);
    const isSameNeutron = (n1 === n2);
    const isSameElectron = (e1 === e2);
    const isDifferentSpecies = (z1 !== z2 || q1 !== q2 || a1 !== a2);

    let verdictClass = 'verdict-none';
    let verdictTitle = 'BUKAN KELUARGA ISO';
    let verdictIcon = '❌';
    let verdictDetails = '';
    let matchedRelation = 'none';

    // Isotop: Z sama, A beda
    if (isSameProton && !isSameMass) {
      verdictClass = 'verdict-isotop';
      verdictTitle = 'PASANGAN ISOTOP';
      verdictIcon = '⚛️';
      verdictDetails = `Kedua spesi memiliki nomor atom Z = ${z1} yang sama (unsur ${el1.name}), namun nomor massanya berbeda (${a1} vs ${a2}).`;
      matchedRelation = 'isotop';
      document.getElementById('comp1ProtonBox')?.classList.add('glow-match');
      document.getElementById('comp2ProtonBox')?.classList.add('glow-match');
    }
    // Isobar: A sama, Z beda
    else if (isSameMass && !isSameProton) {
      verdictClass = 'verdict-isobar';
      verdictTitle = 'PASANGAN ISOBAR';
      verdictIcon = '⚖️';
      verdictDetails = `Kedua spesi berasal dari unsur berbeda (${el1.name} Z=${z1} dan ${el2.name} Z=${z2}), namun memiliki nomor massa A = ${a1} yang sama persis.`;
      matchedRelation = 'isobar';
    }
    // Isoton: neutron sama, Z beda
    else if (isSameNeutron && !isSameProton) {
      verdictClass = 'verdict-isoton';
      verdictTitle = 'PASANGAN ISOTON';
      verdictIcon = '🔵';
      verdictDetails = `Kedua spesi berasal dari unsur berbeda (${el1.s} dan ${el2.s}), namun memiliki jumlah neutron sama persis yaitu ${n1} neutron (${a1} - ${z1} = ${n1} & ${a2} - ${z2} = ${n2}).`;
      matchedRelation = 'isoton';
      document.getElementById('comp1NeutronBox')?.classList.add('glow-match');
      document.getElementById('comp2NeutronBox')?.classList.add('glow-match');
    }
    // Isoelektron: e sama, spesi beda
    else if (isSameElectron && isDifferentSpecies) {
      verdictClass = 'verdict-isoelektron';
      verdictTitle = 'PASANGAN ISOELEKTRON';
      verdictIcon = '⚡';
      verdictDetails = `Kedua spesi memiliki jumlah elektron sama persis yaitu ${e1} elektron.`;
      matchedRelation = 'isoelektron';
      document.getElementById('comp1ElectronBox')?.classList.add('glow-match');
      document.getElementById('comp2ElectronBox')?.classList.add('glow-match');
    } else if (!isDifferentSpecies) {
      verdictDetails = `Kedua kartu merepresentasikan spesi atom yang identik persis.`;
    } else {
      verdictDetails = `Kedua spesi tidak memenuhi kriteria kesamaan proton (isotop), nomor massa (isobar), neutron (isoton), maupun elektron (isoelektron).`;
    }

    // Render verdict box
    const verdictBox = document.getElementById('comparatorVerdictBox');
    if (verdictBox) {
      verdictBox.innerHTML = `
        <div class="verdict-tag ${verdictClass}">
          <span>${verdictIcon}</span> <span>${verdictTitle}</span>
        </div>
        <p style="font-size:0.88rem; color:var(--text-secondary); max-width:280px; line-height:1.4; margin-top:4px;">
          ${verdictDetails}
        </p>
      `;
    }

    // Render step-by-step proof box
    const proofBox = document.getElementById('comparatorProofBox');
    if (proofBox) {
      proofBox.innerHTML = `
        <div class="proof-heading">
          <span>📋</span> <span>Analisis Matematis & Langkah Pembuktian:</span>
        </div>
        <div class="proof-steps-grid">
          <div class="proof-step-card ${isSameProton ? 'matched' : ''}">
            <span class="proof-step-title">1. Nomor Atom (Z / Proton)</span>
            <span class="proof-step-val">${z1} vs ${z2} ${isSameProton ? '✓ SAMA' : '✗ BEDA'}</span>
          </div>
          <div class="proof-step-card ${isSameMass ? 'matched' : ''}">
            <span class="proof-step-title">2. Nomor Massa (A)</span>
            <span class="proof-step-val">${a1} vs ${a2} ${isSameMass ? '✓ SAMA' : '✗ BEDA'}</span>
          </div>
          <div class="proof-step-card ${isSameNeutron ? 'matched' : ''}">
            <span class="proof-step-title">3. Neutron (n = A - Z)</span>
            <span class="proof-step-val">${n1} vs ${n2} ${isSameNeutron ? '✓ SAMA' : '✗ BEDA'}</span>
          </div>
          <div class="proof-step-card ${isSameElectron ? 'matched' : ''}">
            <span class="proof-step-title">4. Elektron (e = Z - q)</span>
            <span class="proof-step-val">${e1} vs ${e2} ${isSameElectron ? '✓ SAMA' : '✗ BEDA'}</span>
          </div>
        </div>
        <div class="proof-explanation-text">
          <strong>Kesimpulan Ilmiah:</strong> Berdasarkan data di atas, pasangan ${el1.s} dan ${el2.s} 
          ${matchedRelation !== 'none' ? `memenuhi definisi <strong style="color:var(--text-primary);">${verdictTitle}</strong> karena memiliki nilai ${matchedRelation === 'isotop' ? 'Proton (Z)' : matchedRelation === 'isobar' ? 'Nomor Massa (A)' : matchedRelation === 'isoton' ? 'Neutron (n)' : 'Elektron (e)'} yang sama persis.` : 'tidak memiliki hubungan isotop, isobar, isoton, maupun isoelektron.'}
        </div>
      `;
    }
  };

  // Attach change listeners to comparator inputs
  comp1Select?.addEventListener('change', () => {
    if (window.MATERI_DATA) {
      const z = parseInt(comp1Select.value, 10);
      const el = window.MATERI_DATA.elements[z - 1];
      if (el && comp1MassInput) comp1MassInput.value = el.a;
    }
    updateSpeciesComparator();
    if (window.soundFx) window.soundFx.playClick();
  });
  comp1MassInput?.addEventListener('input', updateSpeciesComparator);
  comp1ChargeSelect?.addEventListener('change', () => {
    updateSpeciesComparator();
    if (window.soundFx) window.soundFx.playClick();
  });

  comp2Select?.addEventListener('change', () => {
    if (window.MATERI_DATA) {
      const z = parseInt(comp2Select.value, 10);
      const el = window.MATERI_DATA.elements[z - 1];
      if (el && comp2MassInput) comp2MassInput.value = el.a;
    }
    updateSpeciesComparator();
    if (window.soundFx) window.soundFx.playClick();
  });
  comp2MassInput?.addEventListener('input', updateSpeciesComparator);
  comp2ChargeSelect?.addEventListener('change', () => {
    updateSpeciesComparator();
    if (window.soundFx) window.soundFx.playClick();
  });

  // Initial update
  updateSpeciesComparator();

  // ===================================================================
  // 15. Mini Self-Check Quiz for Isotop/Isobar/Isoton/Isoelektron
  // ===================================================================
  const miniQuizContainer = document.getElementById('miniQuizContainer');
  let miniQuizScore = 0;
  const answeredQuestions = new Set();

  const initIsoMiniQuiz = () => {
    if (!miniQuizContainer || !window.MATERI_DATA || !window.MATERI_DATA.isoMiniQuizQuestions) return;

    miniQuizContainer.innerHTML = '';
    miniQuizScore = 0;
    answeredQuestions.clear();
    const scoreBadge = document.getElementById('miniQuizScoreBadge');
    if (scoreBadge) scoreBadge.textContent = `Skor: 0 / ${window.MATERI_DATA.isoMiniQuizQuestions.length}`;

    window.MATERI_DATA.isoMiniQuizQuestions.forEach((qObj, qIdx) => {
      const item = document.createElement('div');
      item.className = 'mini-quiz-item';
      item.id = `miniQuizItem_${qObj.id}`;

      const questionTitle = document.createElement('div');
      questionTitle.className = 'mini-quiz-q';
      questionTitle.innerHTML = `<span>${qIdx + 1}.</span> <span>${qObj.q}</span>`;
      item.appendChild(questionTitle);

      const optionsGrid = document.createElement('div');
      optionsGrid.className = 'mini-quiz-options';

      const letters = ['A', 'B', 'C', 'D'];
      qObj.options.forEach((optText, optIdx) => {
        const optBtn = document.createElement('button');
        optBtn.className = 'mini-quiz-opt-btn';
        optBtn.innerHTML = `<strong>${letters[optIdx]}.</strong> <span>${optText}</span>`;

        optBtn.addEventListener('click', () => {
          if (answeredQuestions.has(qObj.id)) return;
          answeredQuestions.add(qObj.id);

          const isCorrect = (optIdx === qObj.ans);
          const allBtns = optionsGrid.querySelectorAll('.mini-quiz-opt-btn');

          allBtns.forEach((b, i) => {
            b.disabled = true;
            if (i === qObj.ans) b.classList.add('correct');
            else if (i === optIdx && !isCorrect) b.classList.add('wrong');
          });

          const feedbackEl = item.querySelector('.mini-quiz-feedback');
          if (feedbackEl) {
            feedbackEl.classList.add('show');
            if (isCorrect) {
              miniQuizScore++;
              if (window.soundFx) window.soundFx.playCorrect();
              feedbackEl.innerHTML = `<span style="color:var(--neon-emerald); font-weight:700;">✓ Benar Sekali!</span> <p style="margin-top:4px; color:var(--text-secondary);">${qObj.exp}</p>`;
            } else {
              if (window.soundFx) window.soundFx.playWrong();
              feedbackEl.innerHTML = `<span style="color:var(--neon-crimson); font-weight:700;">✗ Belum Tepat.</span> <p style="margin-top:4px; color:var(--text-secondary);">${qObj.exp}</p>`;
            }
          }

          if (scoreBadge) {
            scoreBadge.textContent = `Skor: ${miniQuizScore} / ${window.MATERI_DATA.isoMiniQuizQuestions.length}`;
            if (miniQuizScore === window.MATERI_DATA.isoMiniQuizQuestions.length) {
              scoreBadge.style.color = 'var(--neon-emerald)';
              scoreBadge.style.borderColor = 'var(--neon-emerald)';
            }
          }
        });

        optionsGrid.appendChild(optBtn);
      });

      item.appendChild(optionsGrid);

      const feedback = document.createElement('div');
      feedback.className = 'mini-quiz-feedback';
      item.appendChild(feedback);

      miniQuizContainer.appendChild(item);
    });
  };

  initIsoMiniQuiz();
});
