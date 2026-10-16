/**
 * ATOMIKA X - Quantum Electron Catcher Arcade Game
 * High-speed orbital physics game for mastering electron configurations and reaction speed.
 */

class QuantumCatcherGame {
  constructor() {
    this.canvas = document.getElementById('arcadeCanvas');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 800;
    this.height = this.canvas.height = this.canvas.parentElement.clientHeight || 500;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.isRunning = false;
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('atomika_arcade_hs') || '0', 10);
    this.lives = 3;
    this.combo = 0;
    this.level = 1;
    this.electronsCaught = 0;

    // Player collector ring angle
    this.ringAngle = 0;
    this.ringRadius = 140;
    this.ringSize = 0.55; // Angle width of collector aperture

    // Spawning particles
    this.particles = [];
    this.sparkles = [];
    this.spawnTimer = 0;

    this.setupListeners();
    this.updateHUD();
  }

  setupListeners() {
    window.addEventListener('resize', () => {
      if (!this.canvas.parentElement) return;
      this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 800;
      this.height = this.canvas.height = this.canvas.parentElement.clientHeight || 500;
      this.centerX = this.width / 2;
      this.centerY = this.height / 2;
    });

    // Mouse / Touch movement controls collector ring angle
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left - this.centerX;
      const my = e.clientY - rect.top - this.centerY;
      this.ringAngle = Math.atan2(my, mx);
    });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        const mx = e.touches[0].clientX - rect.left - this.centerX;
        const my = e.touches[0].clientY - rect.top - this.centerY;
        this.ringAngle = Math.atan2(my, mx);
      }
    }, { passive: true });

    // Start / Restart buttons
    document.getElementById('btnStartArcade')?.addEventListener('click', () => this.startGame());
    document.getElementById('btnRestartArcade')?.addEventListener('click', () => this.startGame());
  }

  startGame() {
    this.isRunning = true;
    this.score = 0;
    this.lives = 3;
    this.combo = 0;
    this.level = 1;
    this.electronsCaught = 0;
    this.particles = [];
    this.sparkles = [];

    document.getElementById('arcadeStartScreen')?.classList.add('hidden');
    document.getElementById('arcadeGameOverScreen')?.classList.add('hidden');

    this.updateHUD();
    if (window.soundFx) window.soundFx.playClick();
    this.gameLoop();
  }

  updateHUD() {
    const scoreEl = document.getElementById('arcadeScore');
    const hsEl = document.getElementById('arcadeHighScore');
    const livesEl = document.getElementById('arcadeLives');
    const comboEl = document.getElementById('arcadeCombo');

    if (scoreEl) scoreEl.textContent = this.score;
    if (hsEl) hsEl.textContent = this.highScore;
    if (comboEl) comboEl.textContent = `${this.combo}x`;
    if (livesEl) {
      livesEl.textContent = "❤️".repeat(Math.max(0, this.lives));
    }
  }

  spawnParticle() {
    // Spawn from outside the canvas borders inward
    const angle = Math.random() * Math.PI * 2;
    const spawnDist = Math.max(this.width, this.height) * 0.65;
    const isObstacle = Math.random() < 0.25; // 25% cosmic rays / antimatter
    const speed = (2.2 + this.level * 0.4) * (0.8 + Math.random() * 0.4);

    this.particles.push({
      x: this.centerX + Math.cos(angle) * spawnDist,
      y: this.centerY + Math.sin(angle) * spawnDist,
      vx: -Math.cos(angle) * speed,
      vy: -Math.sin(angle) * speed,
      isObstacle: isObstacle,
      radius: isObstacle ? 9 : 7,
      color: isObstacle ? '#ff4757' : '#ffd166',
      angle: angle
    });
  }

  createSparkles(x, y, color) {
    for (let i = 0; i < 10; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = Math.random() * 3 + 1;
      this.sparkles.push({
        x: x,
        y: y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp,
        life: 1.0,
        color: color
      });
    }
  }

  gameOver() {
    this.isRunning = false;
    if (this.score > this.highScore) {
      this.highScore = this.score;
      localStorage.setItem('atomika_arcade_hs', this.highScore.toString());
    }

    if (window.soundFx) window.soundFx.playWrong();

    const goScreen = document.getElementById('arcadeGameOverScreen');
    const finalScoreEl = document.getElementById('arcadeFinalScore');
    if (finalScoreEl) finalScoreEl.textContent = this.score;
    if (goScreen) goScreen.classList.remove('hidden');
    this.updateHUD();
  }

  gameLoop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Spawning logic
    this.spawnTimer++;
    const interval = Math.max(25, 60 - this.level * 6);
    if (this.spawnTimer >= interval) {
      this.spawnParticle();
      this.spawnTimer = 0;
    }

    // 1. Draw central core nucleus
    const corePulse = Math.sin(Date.now() * 0.005) * 3;
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, 28 + corePulse, 0, Math.PI * 2);
    this.ctx.fillStyle = '#4facfe';
    this.ctx.shadowColor = '#00f2fe';
    this.ctx.shadowBlur = 20;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    this.ctx.fillStyle = '#fff';
    this.ctx.font = 'bold 12px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(`Lv.${this.level}`, this.centerX, this.centerY);

    // 2. Draw collector orbit track & player electromagnetic catcher
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.ringRadius, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.15)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Player Catcher Arc
    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX, this.centerY, this.ringRadius,
      this.ringAngle - this.ringSize, this.ringAngle + this.ringSize
    );
    this.ctx.strokeStyle = '#00f2fe';
    this.ctx.lineWidth = 8;
    this.ctx.shadowColor = '#00f2fe';
    this.ctx.shadowBlur = 15;
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // 3. Update & Draw Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;

      const dist = Math.hypot(p.x - this.centerX, p.y - this.centerY);

      // Check collision with catcher ring
      if (Math.abs(dist - this.ringRadius) < 14) {
        const particleAngle = Math.atan2(p.y - this.centerY, p.x - this.centerX);
        // Normalize angle difference
        let diff = Math.abs(this.ringAngle - particleAngle);
        while (diff > Math.PI) diff = Math.abs(diff - Math.PI * 2);

        if (diff < this.ringSize) {
          // Hit the player catcher!
          if (!p.isObstacle) {
            // Good catch!
            this.combo++;
            const points = 10 * this.combo;
            this.score += points;
            this.electronsCaught++;

            this.createSparkles(p.x, p.y, '#ffd166');
            if (window.soundFx) window.soundFx.playPop(700 + this.combo * 40);

            // Level up every 10 electrons
            if (this.electronsCaught % 8 === 0) {
              this.level++;
              if (window.soundFx) window.soundFx.playCorrect();
            }
          } else {
            // Hit obstacle/antimatter!
            this.lives--;
            this.combo = 0;
            this.createSparkles(p.x, p.y, '#ff4757');
            if (window.soundFx) window.soundFx.playWrong();

            if (this.lives <= 0) {
              this.gameOver();
              return;
            }
          }

          this.updateHUD();
          this.particles.splice(i, 1);
          continue;
        }
      }

      // Check if particle reached core without being caught
      if (dist < 28) {
        if (!p.isObstacle) {
          // Missed electron - break combo
          this.combo = 0;
          this.updateHUD();
        }
        this.particles.splice(i, 1);
        continue;
      }

      // Render Particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    // 4. Update & Draw Sparkles
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const sp = this.sparkles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.life -= 0.04;

      if (sp.life <= 0) {
        this.sparkles.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(sp.x, sp.y, 2.5 * sp.life, 0, Math.PI * 2);
      this.ctx.fillStyle = sp.color;
      this.ctx.fill();
    }

    requestAnimationFrame(() => this.gameLoop());
  }
}

window.QuantumCatcherGame = QuantumCatcherGame;
