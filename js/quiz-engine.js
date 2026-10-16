/**
 * ATOMIKA X - Gamified Quiz Engine & Certificate Generator
 */

class QuizEngine {
  constructor() {
    this.questions = window.QUIZ_QUESTIONS || [];
    this.currentIndex = 0;
    this.userAnswers = [];
    this.mode = 'practice'; // 'practice' | 'exam'
    this.examTimeLeft = 900; // 15 mins (900s)
    this.examTimer = null;
    this.score = 0;

    this.setupListeners();
  }

  setupListeners() {
    // Mode Selection Cards
    document.querySelectorAll('.quiz-mode-card').forEach(card => {
      card.addEventListener('click', (e) => {
        document.querySelectorAll('.quiz-mode-card').forEach(c => c.classList.remove('selected'));
        const el = e.currentTarget;
        el.classList.add('selected');
        this.mode = el.dataset.mode;
        if (window.soundFx) window.soundFx.playClick();
      });
    });

    // Start Quiz Button
    document.getElementById('btnStartQuiz')?.addEventListener('click', () => this.startQuiz());

    // Next Question Button
    document.getElementById('btnNextQuestion')?.addEventListener('click', () => this.nextQuestion());

    // Restart Quiz Button
    document.getElementById('btnRestartQuiz')?.addEventListener('click', () => this.resetQuiz());

    // Open Certificate Modal Button
    document.getElementById('btnOpenCertModal')?.addEventListener('click', () => this.openCertModal());

    // Generate Certificate on Canvas Button
    document.getElementById('btnGenerateCert')?.addEventListener('click', () => this.renderCertificate());

    // Download Certificate Button
    document.getElementById('btnDownloadCert')?.addEventListener('click', () => this.downloadCertificate());
  }

  startQuiz() {
    this.currentIndex = 0;
    this.userAnswers = new Array(this.questions.length).fill(null);
    this.score = 0;

    document.getElementById('quizWelcomeCard')?.classList.remove('active');
    document.getElementById('quizWelcomeCard').style.display = 'none';
    document.getElementById('quizResultCard')?.classList.remove('active');
    document.getElementById('quizResultCard').style.display = 'none';

    const arena = document.getElementById('quizArenaCard');
    arena.style.display = 'block';
    arena.classList.add('active');

    // Timer handling for exam mode
    const timerBox = document.getElementById('quizTimerBox');
    if (this.mode === 'exam') {
      if (timerBox) timerBox.style.display = 'inline-flex';
      this.examTimeLeft = 900;
      if (this.examTimer) clearInterval(this.examTimer);
      this.examTimer = setInterval(() => {
        this.examTimeLeft--;
        this.updateTimerDisplay();
        if (this.examTimeLeft <= 0) {
          this.finishQuiz();
        }
      }, 1000);
    } else {
      if (timerBox) timerBox.style.display = 'none';
      if (this.examTimer) clearInterval(this.examTimer);
    }

    if (window.soundFx) window.soundFx.playClick();
    this.loadQuestion(this.currentIndex);
  }

  updateTimerDisplay() {
    const el = document.getElementById('quizTimerVal');
    if (!el) return;
    const m = Math.floor(this.examTimeLeft / 60);
    const s = this.examTimeLeft % 60;
    el.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  loadQuestion(index) {
    const q = this.questions[index];
    if (!q) return;

    // Update Progress
    const progText = document.getElementById('quizProgText');
    const progFill = document.getElementById('quizProgFill');
    if (progText) progText.textContent = `Soal ${index + 1} dari ${this.questions.length}`;
    if (progFill) progFill.style.width = `${((index + 1) / this.questions.length) * 100}%`;

    // Question Category & Text
    const catEl = document.getElementById('questionCategory');
    const txtEl = document.getElementById('questionText');
    if (catEl) catEl.textContent = q.category;
    if (txtEl) txtEl.textContent = q.question;

    // Explanation Box Hide
    const expBox = document.getElementById('quizExplanationBox');
    if (expBox) expBox.classList.remove('show');

    // Render Options
    const optList = document.getElementById('quizOptionsList');
    if (!optList) return;
    optList.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="option-letter">${letters[optIdx]}</span>
        <span class="option-text">${optText}</span>
      `;

      btn.addEventListener('click', () => this.handleOptionClick(optIdx, btn));
      optList.appendChild(btn);
    });

    // Next button state
    const nextBtn = document.getElementById('btnNextQuestion');
    if (nextBtn) {
      nextBtn.disabled = true;
      nextBtn.textContent = index === this.questions.length - 1 ? 'Selesai & Lihat Skor' : 'Soal Berikutnya ➜';
    }
  }

  handleOptionClick(optIdx, btnEl) {
    const q = this.questions[this.currentIndex];
    const isCorrect = (optIdx === q.answer);

    // Save answer
    this.userAnswers[this.currentIndex] = {
      chosen: optIdx,
      correct: isCorrect
    };

    // Disable all options
    const allBtns = document.querySelectorAll('.option-btn');
    allBtns.forEach(b => b.disabled = true);

    // Reveal states
    if (isCorrect) {
      btnEl.classList.add('correct', 'celebrate-pulse');
      if (window.soundFx) {
        window.soundFx.playCorrect();
        window.soundFx.playPetasanMini();
      }
      if (window.fireworks) {
        window.fireworks.burstElement(btnEl, 55);
      }
    } else {
      btnEl.classList.add('wrong', 'shake-error');
      allBtns[q.answer].classList.add('correct');
      if (window.soundFx) {
        window.soundFx.playWrong();
      }
    }

    // If Practice mode, reveal full explanation
    if (this.mode === 'practice') {
      const expBox = document.getElementById('quizExplanationBox');
      const expText = document.getElementById('quizExplanationText');
      if (expBox && expText) {
        expText.textContent = q.explanation;
        expBox.classList.add('show');
      }
    }

    // Enable next button
    const nextBtn = document.getElementById('btnNextQuestion');
    if (nextBtn) nextBtn.disabled = false;
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      if (window.soundFx) window.soundFx.playClick();
      this.loadQuestion(this.currentIndex);
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    if (this.examTimer) clearInterval(this.examTimer);

    // Calculate score
    let correctCount = 0;
    this.userAnswers.forEach(ans => {
      if (ans && ans.correct) correctCount++;
    });

    const totalQuestions = this.questions.length;
    const finalScore = Math.round((correctCount / totalQuestions) * 100);
    this.score = finalScore;

    // Hide arena, show result
    const arena = document.getElementById('quizArenaCard');
    arena.style.display = 'none';
    arena.classList.remove('active');

    const resultCard = document.getElementById('quizResultCard');
    resultCard.style.display = 'block';
    resultCard.classList.add('active');

    // Update Result UI
    const scoreNum = document.getElementById('resScoreNum');
    const badgeIcon = document.getElementById('resBadgeIcon');
    const badgeTitle = document.getElementById('resBadgeTitle');
    const resCorrect = document.getElementById('resCorrectCount');
    const resWrong = document.getElementById('resWrongCount');
    const resAccuracy = document.getElementById('resAccuracy');

    if (scoreNum) scoreNum.textContent = finalScore;
    if (resCorrect) resCorrect.textContent = correctCount;
    if (resWrong) resWrong.textContent = totalQuestions - correctCount;
    if (resAccuracy) resAccuracy.textContent = `${finalScore}%`;

    let badgeText = "Pakar Struktur Atom";
    let icon = "🏆";
    if (finalScore >= 90) {
      badgeText = "🌟 Master Struktur Atom - Luar Biasa!";
      icon = "👑";
    } else if (finalScore >= 75) {
      badgeText = "🥇 Pakar Kimia Kuantum";
      icon = "⚛️";
    } else if (finalScore >= 60) {
      badgeText = "🥈 Penjelajah Atom Terampil";
      icon = "🔬";
    } else {
      badgeText = "📚 Pejuang Struktur Atom - Tetap Semangat!";
      icon = "💡";
    }

    if (badgeIcon) badgeIcon.textContent = icon;
    if (badgeTitle) badgeTitle.textContent = badgeText;

    if (finalScore >= 60) {
      if (window.soundFx) {
        window.soundFx.playPetasan();
        setTimeout(() => {
          if (window.soundFx) window.soundFx.playFanfare();
        }, 280);
      }
      if (window.fireworks) {
        window.fireworks.celebrate(3500);
      }
    } else {
      if (window.soundFx) window.soundFx.playWrong();
    }
  }

  resetQuiz() {
    document.getElementById('quizResultCard')?.classList.remove('active');
    document.getElementById('quizResultCard').style.display = 'none';

    const welcome = document.getElementById('quizWelcomeCard');
    welcome.style.display = 'block';
    welcome.classList.add('active');

    if (window.soundFx) window.soundFx.playClick();
  }

  openCertModal() {
    const modal = document.getElementById('certModal');
    if (!modal) return;
    modal.classList.add('active');
    this.renderCertificate();
  }

  renderCertificate() {
    const canvas = document.getElementById('certCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 700;

    const studentName = document.getElementById('certStudentName')?.value || "Peserta Didik Kimia";
    const schoolName = document.getElementById('certSchoolName')?.value || "SMA Negeri / Swasta";
    const dateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

    // 1. Dark Futuristic Certificate Background
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#0a0e17');
    bgGrad.addColorStop(0.5, '#111827');
    bgGrad.addColorStop(1, '#0c1322');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Ornate Glowing Borders
    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    ctx.strokeStyle = 'rgba(157, 78, 221, 0.4)';
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Corner decorative brackets
    const corners = [
      [30, 30], [canvas.width - 30, 30],
      [30, canvas.height - 30], [canvas.width - 30, canvas.height - 30]
    ];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = '#00f2fe';
      ctx.fillRect(cx - 5, cy - 5, 10, 10);
    });

    // 3. Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('ATOMIKA X - MEDIA INTERAKTIF KIMIA KELAS X', canvas.width / 2, 85);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 38px sans-serif';
    ctx.fillText('SERTIFIKAT KELULUSAN', canvas.width / 2, 135);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.fillText('Sertifikat ini diberikan sebagai apresiasi pencapaian kompetensi kepada:', canvas.width / 2, 175);

    // 4. Student Name
    ctx.fillStyle = '#ffd166';
    ctx.font = '900 42px sans-serif';
    ctx.fillText(studentName, canvas.width / 2, 235);

    // Underline
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 200, 255);
    ctx.lineTo(canvas.width / 2 + 200, 255);
    ctx.stroke();

    // School Name
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 20px sans-serif';
    ctx.fillText(schoolName, canvas.width / 2, 290);

    // Course Achievement
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px sans-serif';
    ctx.fillText('Telah berhasil menyelesaikan Uji Kompetensi Terpadu pada materi:', canvas.width / 2, 340);

    ctx.fillStyle = '#00f2fe';
    ctx.font = 'bold 24px sans-serif';
    ctx.fillText('STRUKTUR ATOM, MODEL ATOM & KONFIGURASI ELEKTRON', canvas.width / 2, 380);

    // Score & Grade Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.fillRect(canvas.width / 2 - 180, 420, 360, 80);
    ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
    ctx.strokeRect(canvas.width / 2 - 180, 420, 360, 80);

    ctx.fillStyle = '#06d6a0';
    ctx.font = '900 36px monospace';
    ctx.fillText(`NILAI: ${this.score} / 100`, canvas.width / 2, 470);

    // 5. Signatures & Date
    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Tanggal: ${dateStr}`, 80, 580);
    ctx.fillText(`Verifikasi ID: ATMX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`, 80, 605);

    ctx.textAlign = 'right';
    ctx.fillText('Pengembang Media Pembelajaran Kimia', canvas.width - 80, 580);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('Tim Edukasi Sains ATOMIKA X', canvas.width - 80, 605);

    // Digital Seal Hologram
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 595, 36, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffd166';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('VERIFIED', canvas.width / 2, 592);
    ctx.fillText('EXCELLENCE', canvas.width / 2, 606);
  }

  downloadCertificate() {
    const canvas = document.getElementById('certCanvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Sertifikat-Struktur-Atom-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    if (window.soundFx) window.soundFx.playCorrect();
    if (window.showToast) window.showToast("✓ Sertifikat berhasil diunduh!");
  }
}

window.QuizEngine = QuizEngine;
