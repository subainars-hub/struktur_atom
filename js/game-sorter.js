/**
 * ATOMIKA X - Sorter Cepat Nuklida (Isotop, Isobar, Isoton)
 * Fast-paced chemistry card sorting game with 60-second time trial.
 */

class NuclideSorterGame {
  constructor() {
    this.score = 0;
    this.timeLeft = 60;
    this.timer = null;
    this.streak = 0;
    this.currentPair = null;
    this.isPlaying = false;

    this.pairsBank = [
      {
        p1: { s: "C", a: 12, z: 6 },
        p2: { s: "C", a: 14, z: 6 },
        ans: "isotop",
        note: "Z sama-sama 6 (Karbon), nomor massa berbeda (12 dan 14)."
      },
      {
        p1: { s: "C", a: 14, z: 6 },
        p2: { s: "N", a: 14, z: 7 },
        ans: "isobar",
        note: "A sama-sama 14, nomor atom berbeda (6 dan 7)."
      },
      {
        p1: { s: "C", a: 14, z: 6 },
        p2: { s: "O", a: 16, z: 8 },
        ans: "isoton",
        note: "Jumlah neutron sama: 14 - 6 = 8 dan 16 - 8 = 8."
      },
      {
        p1: { s: "K", a: 40, z: 19 },
        p2: { s: "Ca", a: 40, z: 20 },
        ans: "isobar",
        note: "Nomor massa sama (40), nomor atom berbeda (19 dan 20)."
      },
      {
        p1: { s: "Cl", a: 35, z: 17 },
        p2: { s: "Cl", a: 37, z: 17 },
        ans: "isotop",
        note: "Keduanya isotop Klorin (Z=17), massa 35 dan 37."
      },
      {
        p1: { s: "P", a: 31, z: 15 },
        p2: { s: "S", a: 32, z: 16 },
        ans: "isoton",
        note: "Neutron sama: 31 - 15 = 16 dan 32 - 16 = 16."
      },
      {
        p1: { s: "Na", a: 24, z: 11 },
        p2: { s: "Mg", a: 24, z: 12 },
        ans: "isobar",
        note: "Nomor massa sama-sama 24."
      },
      {
        p1: { s: "H", a: 1, z: 1 },
        p2: { s: "H", a: 2, z: 1 },
        ans: "isotop",
        note: "Isotop hidrogen (Protium dan Deuterium), Z=1."
      },
      {
        p1: { s: "C", a: 13, z: 6 },
        p2: { s: "N", a: 14, z: 7 },
        ans: "isoton",
        note: "Neutron sama: 13 - 6 = 7 dan 14 - 7 = 7."
      },
      {
        p1: { s: "Ne", a: 20, z: 10 },
        p2: { s: "Ne", a: 22, z: 10 },
        ans: "isotop",
        note: "Isotop Neon, Z sama-sama 10."
      },
      {
        p1: { s: "Na", a: 23, z: 11 },
        p2: { s: "Mg", a: 24, z: 12 },
        ans: "isoton",
        note: "Neutron sama: 23 - 11 = 12 dan 24 - 12 = 12."
      },
      {
        p1: { s: "Ar", a: 40, z: 18 },
        p2: { s: "Ca", a: 40, z: 20 },
        ans: "isobar",
        note: "Nomor massa sama (40), unsur berbeda (Argon dan Kalsium)."
      },
      {
        p1: { s: "Na", a: 23, z: 11, q: "+" },
        p2: { s: "Ne", a: 20, z: 10 },
        ans: "isoelektron",
        note: "Keduanya memiliki 10 elektron (Na⁺: 11 - 1 = 10 dan Ne: 10)."
      },
      {
        p1: { s: "F", a: 19, z: 9, q: "-" },
        p2: { s: "Mg", a: 24, z: 12, q: "2+" },
        ans: "isoelektron",
        note: "Keduanya memiliki 10 elektron (F⁻: 9 + 1 = 10 dan Mg²⁺: 12 - 2 = 10)."
      },
      {
        p1: { s: "Cl", a: 35, z: 17, q: "-" },
        p2: { s: "K", a: 39, z: 19, q: "+" },
        ans: "isoelektron",
        note: "Keduanya memiliki 18 elektron (Cl⁻: 17 + 1 = 18 dan K⁺: 19 - 1 = 18)."
      },
      {
        p1: { s: "O", a: 16, z: 8, q: "2-" },
        p2: { s: "Al", a: 27, z: 13, q: "3+" },
        ans: "isoelektron",
        note: "Keduanya memiliki 10 elektron (O²⁻: 8 + 2 = 10 dan Al³⁺: 13 - 3 = 10)."
      }
    ];

    this.setupListeners();
  }

  setupListeners() {
    document.getElementById('btnStartSorter')?.addEventListener('click', () => this.startGame());

    document.querySelectorAll('.sorter-choice-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const choice = e.currentTarget.dataset.choice;
        this.makeChoice(choice, e.currentTarget);
      });
    });
  }

  startGame() {
    this.score = 0;
    this.timeLeft = 60;
    this.streak = 0;
    this.isPlaying = true;

    document.getElementById('sorterStartCard')?.classList.add('hidden');
    document.getElementById('sorterPlayCard')?.classList.remove('hidden');

    this.updateHUD();
    this.nextPair();

    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.updateHUD();
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);

    if (window.soundFx) window.soundFx.playClick();
  }

  nextPair() {
    const idx = Math.floor(Math.random() * this.pairsBank.length);
    this.currentPair = this.pairsBank[idx];

    // Render cards
    const p1 = this.currentPair.p1;
    const p2 = this.currentPair.p2;

    const el1 = document.getElementById('sorterNuclide1');
    const el2 = document.getElementById('sorterNuclide2');

    if (el1) {
      el1.innerHTML = `
        <div class="nuclide-stack">
          <span class="nuclide-mass-val">${p1.a}</span>
          <span class="nuclide-atomic-val">${p1.z}</span>
        </div>
        <span class="nuclide-element-symbol">${p1.s}</span>
        ${p1.q ? `<span class="nuclide-charge-val" style="font-size:1.4rem; align-self:flex-start; color:var(--neon-amber);">${p1.q}</span>` : ''}
      `;
    }

    if (el2) {
      el2.innerHTML = `
        <div class="nuclide-stack">
          <span class="nuclide-mass-val">${p2.a}</span>
          <span class="nuclide-atomic-val">${p2.z}</span>
        </div>
        <span class="nuclide-element-symbol">${p2.s}</span>
        ${p2.q ? `<span class="nuclide-charge-val" style="font-size:1.4rem; align-self:flex-start; color:var(--neon-amber);">${p2.q}</span>` : ''}
      `;
    }

    const noteEl = document.getElementById('sorterFeedbackNote');
    if (noteEl) noteEl.textContent = '';
  }

  makeChoice(choice, btnElement = null) {
    if (!this.isPlaying || !this.currentPair) return;

    const isCorrect = (choice === this.currentPair.ans);
    const noteEl = document.getElementById('sorterFeedbackNote');
    const playCard = document.getElementById('sorterPlayCard');

    if (isCorrect) {
      this.streak++;
      const pts = 10 * Math.min(3, Math.floor(this.streak / 3) + 1);
      this.score += pts;

      // 1. Play celebratory correct sound + mini petasan crackle
      if (window.soundFx) {
        window.soundFx.playCorrect();
        window.soundFx.playPetasanMini();
      }

      // 2. Visual fireworks burst at clicked button
      if (window.fireworks) {
        if (btnElement) {
          window.fireworks.burstElement(btnElement, 50);
        } else if (playCard) {
          const rect = playCard.getBoundingClientRect();
          window.fireworks.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
        }
      }

      // 3. Visual pulse
      if (playCard) {
        playCard.classList.remove('shake-error');
        playCard.classList.add('celebrate-pulse');
        setTimeout(() => playCard.classList.remove('celebrate-pulse'), 500);
      }

      if (noteEl) {
        noteEl.innerHTML = `<span style="color:var(--neon-emerald)">✨ Benar! (+${pts} poin) ${this.currentPair.note}</span>`;
      }
    } else {
      this.streak = 0;

      // 1. Play distinct wrong answer buzzer
      if (window.soundFx) {
        window.soundFx.playWrong();
      }

      // 2. Shake error visual
      if (btnElement) {
        btnElement.classList.remove('shake-error');
        void btnElement.offsetWidth;
        btnElement.classList.add('shake-error');
        setTimeout(() => btnElement.classList.remove('shake-error'), 450);
      }
      if (playCard) {
        playCard.classList.remove('shake-error', 'celebrate-pulse');
        void playCard.offsetWidth;
        playCard.classList.add('shake-error');
        setTimeout(() => playCard.classList.remove('shake-error'), 450);
      }

      if (noteEl) {
        noteEl.innerHTML = `<span style="color:var(--neon-crimson)">❌ Kurang tepat! Jawabannya: <strong>${this.currentPair.ans.toUpperCase()}</strong>. ${this.currentPair.note}</span>`;
      }
    }

    this.updateHUD();
    setTimeout(() => {
      if (this.isPlaying) this.nextPair();
    }, 1200);
  }

  updateHUD() {
    const scoreEl = document.getElementById('sorterScore');
    const timeEl = document.getElementById('sorterTimer');
    const streakEl = document.getElementById('sorterStreak');

    if (scoreEl) scoreEl.textContent = this.score;
    if (timeEl) timeEl.textContent = `${this.timeLeft}s`;
    if (streakEl) streakEl.textContent = `${this.streak}x`;
  }

  endGame() {
    this.isPlaying = false;
    clearInterval(this.timer);

    if (this.score > 0) {
      if (window.soundFx) {
        window.soundFx.playPetasan();
        setTimeout(() => {
          if (window.soundFx) window.soundFx.playFanfare();
        }, 280);
      }
      if (window.fireworks) {
        window.fireworks.celebrate(3000);
      }
    } else {
      if (window.soundFx) window.soundFx.playWrong();
    }

    const playCard = document.getElementById('sorterPlayCard');
    const startCard = document.getElementById('sorterStartCard');
    const introTitle = document.getElementById('sorterIntroTitle');
    const startBtn = document.getElementById('btnStartSorter');

    if (playCard) playCard.classList.add('hidden');
    if (startCard) startCard.classList.remove('hidden');

    if (introTitle) {
      introTitle.innerHTML = `Selesai! Skor Akhir: <span style="color:var(--neon-cyan)">${this.score}</span> Poin 🎉`;
    }
    if (startBtn) startBtn.textContent = "Main Lagi";
  }
}

window.NuclideSorterGame = NuclideSorterGame;
