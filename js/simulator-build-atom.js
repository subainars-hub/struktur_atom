/**
 * ATOMIKA X - Lab Simulator: Bangun Atom (Build an Atom)
 * Interactive subatomic particle lab with real-time notation, charge, stability, and challenges.
 */

class BuildAtomSimulator {
  constructor() {
    this.canvas = document.getElementById('simCanvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 500;
    this.height = this.canvas.height = this.canvas.parentElement.clientHeight || 480;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    // Particle state
    this.protons = 6;
    this.neutrons = 6;
    this.electrons = 6;

    // Challenge system
    this.currentLevel = 0;
    this.challenges = [
      {
        title: "Tantangan 1: Helium Netral",
        desc: "Rakitlah atom Helium-4 netral (⁴₂He) yang stabil!",
        target: { p: 2, n: 2, e: 2 },
        reward: "Pakar Helium"
      },
      {
        title: "Tantangan 2: Isotop Karbon-14",
        desc: "Rakitlah isotop radioaktif Karbon-14 netral (¹⁴₆C)!",
        target: { p: 6, n: 8, e: 6 },
        reward: "Arkeolog Radiokarbon"
      },
      {
        title: "Tantangan 3: Kation Natrium (Na⁺)",
        desc: "Buatlah kation Natrium bermuatan +1 dari isotop ²³₁₁Na!",
        target: { p: 11, n: 12, e: 10 },
        reward: "Master Kation"
      },
      {
        title: "Tantangan 4: Anion Oksida (O²⁻)",
        desc: "Rakitlah anion Oksigen bermuatan -2 dari isotop ¹⁶₈O!",
        target: { p: 8, n: 8, e: 10 },
        reward: "Ahli Anion"
      },
      {
        title: "Tantangan 5: Atom Aluminium Netral",
        desc: "Rakitlah atom Aluminium-27 netral (²⁷₁₃Al)!",
        target: { p: 13, n: 14, e: 13 },
        reward: "Alkimia Modern"
      }
    ];

    this.animTime = 0;
    this.setupUI();
    this.setupCanvasResize();
    this.updateData();
    this.startLoop();
  }

  setupCanvasResize() {
    window.addEventListener('resize', () => {
      if (!this.canvas.parentElement) return;
      this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 500;
      this.height = this.canvas.height = this.canvas.parentElement.clientHeight || 480;
      this.centerX = this.width / 2;
      this.centerY = this.height / 2;
    });
  }

  setupUI() {
    // Proton buttons
    document.getElementById('pMinus')?.addEventListener('click', () => this.adjustParticle('protons', -1));
    document.getElementById('pPlus')?.addEventListener('click', () => this.adjustParticle('protons', 1));

    // Neutron buttons
    document.getElementById('nMinus')?.addEventListener('click', () => this.adjustParticle('neutrons', -1));
    document.getElementById('nPlus')?.addEventListener('click', () => this.adjustParticle('neutrons', 1));

    // Electron buttons
    document.getElementById('eMinus')?.addEventListener('click', () => this.adjustParticle('electrons', -1));
    document.getElementById('ePlus')?.addEventListener('click', () => this.adjustParticle('electrons', 1));

    // Reset button
    document.getElementById('btnResetAtom')?.addEventListener('click', () => {
      this.protons = 1;
      this.neutrons = 0;
      this.electrons = 1;
      this.updateData();
      if (window.soundFx) window.soundFx.playClick();
    });

    // Challenge check button
    document.getElementById('btnCheckChallenge')?.addEventListener('click', () => this.verifyChallenge());
  }

  adjustParticle(type, delta) {
    if (delta > 0 && this[type] >= 20) return; // Limit for visual layout
    if (delta < 0 && this[type] <= 0) return;

    this[type] += delta;
    if (window.soundFx) {
      window.soundFx.playPop(type === 'protons' ? 440 : type === 'neutrons' ? 580 : 880);
    }
    this.updateData();
  }

  loadPreset(p, n, e) {
    this.protons = p;
    this.neutrons = n;
    this.electrons = e;
    this.updateData();
    if (window.soundFx) window.soundFx.playCorrect();
  }

  updateData() {
    // Update counters in UI
    const pCountEl = document.getElementById('pCount');
    const nCountEl = document.getElementById('nCount');
    const eCountEl = document.getElementById('eCount');
    if (pCountEl) pCountEl.textContent = this.protons;
    if (nCountEl) nCountEl.textContent = this.neutrons;
    if (eCountEl) eCountEl.textContent = this.electrons;

    const z = this.protons;
    const a = this.protons + this.neutrons;
    const charge = this.protons - this.electrons;

    // Find element name & symbol
    let elData = { s: "—", name: "Belum Ada Unsur" };
    if (z > 0 && window.MATERI_DATA && window.MATERI_DATA.elements[z - 1]) {
      elData = window.MATERI_DATA.elements[z - 1];
    } else if (z > 0) {
      elData = { s: `X_${z}`, name: `Unsur ${z}` };
    }

    // Update Live Symbol Box
    const symMassEl = document.getElementById('simMassNum');
    const symAtomicEl = document.getElementById('simAtomicNum');
    const symCharEl = document.getElementById('simSymbolChar');
    const symChargeEl = document.getElementById('simChargeVal');
    const elNameBadge = document.getElementById('simElementName');

    if (symMassEl) symMassEl.textContent = a;
    if (symAtomicEl) symAtomicEl.textContent = z;
    if (symCharEl) symCharEl.textContent = elData.s;

    if (symChargeEl) {
      if (charge === 0) symChargeEl.textContent = '';
      else if (charge > 0) symChargeEl.textContent = charge === 1 ? '+' : `${charge}+`;
      else symChargeEl.textContent = charge === -1 ? '-' : `${Math.abs(charge)}-`;
    }

    if (elNameBadge) {
      elNameBadge.textContent = z > 0 ? `${elData.name} (${elData.s})` : "Ruang Kosong";
    }

    // Net Charge Badge & Status
    const chargeBadge = document.getElementById('simNetCharge');
    if (chargeBadge) {
      if (charge === 0) {
        chargeBadge.textContent = "Atom Netral (Muatan: 0)";
        chargeBadge.className = "sim-element-badge";
        chargeBadge.style.color = "var(--neon-emerald)";
      } else if (charge > 0) {
        chargeBadge.textContent = `Kation Positif (+${charge})`;
        chargeBadge.className = "sim-element-badge";
        chargeBadge.style.color = "var(--color-proton)";
      } else {
        chargeBadge.textContent = `Anion Negatif (${charge})`;
        chargeBadge.className = "sim-element-badge";
        chargeBadge.style.color = "var(--neon-amber)";
      }
    }

    // Stability Calculation
    const stabilityTag = document.getElementById('simStability');
    if (stabilityTag) {
      if (z === 0) {
        stabilityTag.textContent = "Kosong";
        stabilityTag.className = "sim-stability-tag";
      } else {
        const ratio = this.neutrons / z;
        // Known light nuclear stability band
        const isStable = (z === 1 && (this.neutrons === 0 || this.neutrons === 1)) ||
                         (z === 2 && this.neutrons === 2) ||
                         (z > 2 && ratio >= 0.8 && ratio <= 1.5);

        if (isStable) {
          stabilityTag.textContent = "✓ Inti Atom Stabil";
          stabilityTag.className = "sim-stability-tag stable";
        } else {
          stabilityTag.textContent = "⚠ Tidak Stabil / Radioaktif";
          stabilityTag.className = "sim-stability-tag unstable";
        }
      }
    }

    // Update Challenge UI
    this.updateChallengeUI();
  }

  updateChallengeUI() {
    const ch = this.challenges[this.currentLevel];
    const chTitle = document.getElementById('challengeTitle');
    const chDesc = document.getElementById('challengeDesc');
    const chLvlBadge = document.getElementById('challengeLevelBadge');

    if (ch && chTitle && chDesc) {
      chTitle.textContent = ch.title;
      chDesc.textContent = ch.desc;
      if (chLvlBadge) chLvlBadge.textContent = `Level ${this.currentLevel + 1}/${this.challenges.length}`;
    }
  }

  verifyChallenge() {
    const target = this.challenges[this.currentLevel].target;
    const challengeCard = document.querySelector('.sim-challenge-card');
    const checkBtn = document.getElementById('btnCheckChallenge');

    if (this.protons === target.p && this.neutrons === target.n && this.electrons === target.e) {
      // 1. Play realistic Petasan fireworks sound & triumphant fanfare
      if (window.soundFx) {
        window.soundFx.playPetasan();
        setTimeout(() => {
          if (window.soundFx) window.soundFx.playFanfare();
        }, 250);
      }

      // 2. Visual Fireworks & Petasan Confetti Celebration!
      if (window.fireworks) {
        if (checkBtn) window.fireworks.burstElement(checkBtn, 90);
        window.fireworks.celebrate(3000);
      }

      // 3. Card visual pulse animation
      if (challengeCard) {
        challengeCard.classList.remove('shake-error');
        challengeCard.classList.add('celebrate-pulse');
        setTimeout(() => challengeCard.classList.remove('celebrate-pulse'), 600);
      }

      const reward = this.challenges[this.currentLevel].reward;
      if (window.showToast) {
        window.showToast(`🎆 BUM! Jawaban Benar! ${reward} Diraih! ✨`);
      }

      if (this.currentLevel < this.challenges.length - 1) {
        this.currentLevel++;
        setTimeout(() => this.updateChallengeUI(), 400);
      } else {
        if (window.showToast) {
          setTimeout(() => {
            window.showToast("🏆 Luar Biasa! Anda telah menuntaskan SEMUA tantangan Bangun Atom!");
          }, 1200);
        }
      }
    } else {
      // 1. Play distinct wrong answer buzzer sound
      if (window.soundFx) {
        window.soundFx.playWrong();
      }

      // 2. Visual shake error feedback on card and button
      if (challengeCard) {
        challengeCard.classList.remove('shake-error', 'celebrate-pulse');
        void challengeCard.offsetWidth; // Force DOM reflow to retrigger animation
        challengeCard.classList.add('shake-error');
        setTimeout(() => challengeCard.classList.remove('shake-error'), 450);
      }
      if (checkBtn) {
        checkBtn.classList.remove('shake-error');
        void checkBtn.offsetWidth;
        checkBtn.classList.add('shake-error');
        setTimeout(() => checkBtn.classList.remove('shake-error'), 450);
      }

      // 3. Informative hint toast
      if (window.showToast) {
        const pDiff = this.protons !== target.p ? `p=${this.protons}/${target.p}` : '';
        const nDiff = this.neutrons !== target.n ? `n=${this.neutrons}/${target.n}` : '';
        const eDiff = this.electrons !== target.e ? `e=${this.electrons}/${target.e}` : '';
        const diffs = [pDiff, nDiff, eDiff].filter(Boolean).join(', ');
        window.showToast(`❌ Jawaban Belum Tepat! (${diffs}). Sesuaikan partikel dengan target.`);
      }
    }
  }

  startLoop() {
    const render = () => {
      this.animTime += 0.025;
      this.draw();
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Calculate Bohr electron shell distribution for current electrons
    // Shell capacity: K=2, L=8, M=8/18
    let remE = this.electrons;
    const shells = [];
    const baseR = Math.min(this.width, this.height) * 0.22;

    const kCount = Math.min(remE, 2);
    remE -= kCount;
    if (kCount > 0 || this.electrons === 0) shells.push({ r: baseR * 0.7, count: kCount, name: "K" });

    const lCount = Math.min(remE, 8);
    remE -= lCount;
    if (lCount > 0 || this.electrons > 2) shells.push({ r: baseR * 1.15, count: lCount, name: "L" });

    const mCount = remE;
    if (mCount > 0 || this.electrons > 10) shells.push({ r: baseR * 1.55, count: mCount, name: "M" });

    // 1. Draw Shell Orbitals
    shells.forEach((sh, idx) => {
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, sh.r, 0, Math.PI * 2);
      this.ctx.strokeStyle = 'rgba(79, 172, 254, 0.28)';
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);

      // Shell label
      this.ctx.fillStyle = 'rgba(0, 242, 254, 0.6)';
      this.ctx.font = 'bold 11px monospace';
      this.ctx.fillText(`Kulit ${sh.name}`, this.centerX + sh.r + 4, this.centerY - 2);

      // 2. Draw Electrons on Shell
      const speed = 0.03 / (idx + 1);
      for (let i = 0; i < sh.count; i++) {
        const angle = (i / Math.max(1, sh.count)) * Math.PI * 2 + this.animTime * speed;
        const ex = this.centerX + Math.cos(angle) * sh.r;
        const ey = this.centerY + Math.sin(angle) * sh.r;

        // Glowing Electron
        this.ctx.beginPath();
        this.ctx.arc(ex, ey, 6, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffd166';
        this.ctx.shadowColor = '#ffd166';
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // Minus sign
        this.ctx.fillStyle = '#111';
        this.ctx.font = 'bold 8px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('-', ex, ey);
      }
    });

    // 3. Draw Nucleus (Protons + Neutrons clustered at center)
    const totalNucleons = this.protons + this.neutrons;
    if (totalNucleons > 0) {
      // Seeded deterministic layout based on index
      const nucleons = [];
      for (let i = 0; i < this.protons; i++) nucleons.push({ isProton: true, id: `p_${i}` });
      for (let i = 0; i < this.neutrons; i++) nucleons.push({ isProton: false, id: `n_${i}` });

      // Golden ratio spiral distribution for packing
      const goldenAngle = 2.39996;
      nucleons.forEach((nuc, idx) => {
        const radius = Math.sqrt(idx + 1) * 7.5;
        const angle = idx * goldenAngle + Math.sin(this.animTime * 2 + idx) * 0.05;
        const nx = this.centerX + Math.cos(angle) * radius;
        const ny = this.centerY + Math.sin(angle) * radius;

        this.ctx.beginPath();
        this.ctx.arc(nx, ny, 7, 0, Math.PI * 2);
        this.ctx.fillStyle = nuc.isProton ? '#ff4757' : '#4facfe';
        this.ctx.shadowColor = nuc.isProton ? '#ff4757' : '#4facfe';
        this.ctx.shadowBlur = 8;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        // Label (+ or 0)
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 8px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(nuc.isProton ? '+' : '0', nx, ny);
      });
    } else {
      // Empty nucleus guide
      this.ctx.beginPath();
      this.ctx.arc(this.centerX, this.centerY, 18, 0, Math.PI * 2);
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      this.ctx.setLineDash([3, 3]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.font = '10px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.fillText("Inti Kosong", this.centerX, this.centerY + 3);
    }
  }
}

window.BuildAtomSimulator = BuildAtomSimulator;
