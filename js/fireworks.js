/**
 * ATOMIKA X - Fireworks & Petasan Confetti Engine
 * High-performance, self-contained fireworks and celebratory particle physics.
 * 100% standalone, no external libraries needed.
 */

class FireworksEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.rockets = [];
    this.isRunning = false;
    this.rafId = null;

    this.colors = [
      '#ff3b30', '#ff9500', '#ffcc00', '#34c759', 
      '#00f2fe', '#4facfe', '#7928ca', '#ff0080', 
      '#ffffff', '#00e5ff', '#ff007f', '#ffd700'
    ];

    this.initCanvas();
  }

  initCanvas() {
    if (!document.body) {
      if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', () => this.initCanvas(), { once: true });
      }
      return;
    }
    if (document.getElementById('atomikaFireworksCanvas')) {
      this.canvas = document.getElementById('atomikaFireworksCanvas');
    } else {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'atomikaFireworksCanvas';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '99999';
      document.body.appendChild(this.canvas);
    }

    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  // Launch a realistic rocket that climbs and bursts into petasan / fireworks
  launchRocket(startX, startY, targetX, targetY, color = null) {
    if (!this.canvas) this.initCanvas();
    const c = color || this.colors[Math.floor(Math.random() * this.colors.length)];
    this.rockets.push({
      x: startX,
      y: startY,
      targetX: targetX,
      targetY: targetY,
      vx: (targetX - startX) / 28,
      vy: (targetY - startY) / 28,
      color: c,
      life: 28,
      trail: []
    });

    this.startLoop();
  }

  // Explode a radial firework burst with sparkling stars, cracklers, and confetti
  burst(x, y, count = 70, baseColor = null) {
    if (!this.canvas) this.initCanvas();
    const colors = baseColor ? [baseColor, '#ffffff', '#ffd700'] : this.colors;

    // Flash light ring
    this.particles.push({
      type: 'shockwave',
      x: x,
      y: y,
      radius: 4,
      maxRadius: 80,
      color: baseColor || '#ffcc00',
      alpha: 0.8,
      decay: 0.04
    });

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2;
      const c = colors[Math.floor(Math.random() * colors.length)];
      const isConfetti = Math.random() > 0.45;
      const hasSecondary = Math.random() > 0.7; // Petasan crackler spark

      this.particles.push({
        type: isConfetti ? 'confetti' : 'spark',
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (isConfetti ? 2 : 0),
        color: c,
        alpha: 1,
        decay: isConfetti ? (Math.random() * 0.012 + 0.008) : (Math.random() * 0.025 + 0.015),
        size: isConfetti ? (Math.random() * 7 + 5) : (Math.random() * 3 + 2),
        aspectRatio: Math.random() * 0.4 + 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        gravity: isConfetti ? 0.14 : 0.09,
        drag: isConfetti ? 0.96 : 0.97,
        secondary: hasSecondary,
        exploded: false,
        timer: Math.floor(Math.random() * 20 + 15)
      });
    }

    this.startLoop();
  }

  // Burst at an element's center (e.g. check button or answer card)
  burstElement(element, count = 80) {
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    this.burst(x, y, count);
  }

  // Petasan renteng (rapid cascading firecracker pops)
  firecracker(x, y, count = 8) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const ox = x + (Math.random() - 0.5) * 120;
        const oy = y + (Math.random() - 0.5) * 80;
        this.burst(ox, oy, 30);
      }, i * 90);
    }
  }

  // Full screen celebration finale (Grand Petasan & Fireworks Show)
  celebrate(durationMs = 2800) {
    if (!this.canvas) this.initCanvas();
    const w = this.width || window.innerWidth;
    const h = this.height || window.innerHeight;

    // Immediate burst near center-top
    this.burst(w * 0.5, h * 0.32, 110);
    this.burst(w * 0.3, h * 0.42, 80);
    this.burst(w * 0.7, h * 0.38, 80);

    // Sequence of shooting rockets
    const startTime = performance.now();
    const interval = setInterval(() => {
      if (performance.now() - startTime > durationMs) {
        clearInterval(interval);
        return;
      }
      const sx = w * (0.2 + Math.random() * 0.6);
      const tx = w * (0.15 + Math.random() * 0.7);
      const ty = h * (0.15 + Math.random() * 0.35);
      this.launchRocket(sx, h, tx, ty);
    }, 240);
  }

  startLoop() {
    if (this.isRunning) return;
    this.isRunning = true;
    const loop = () => {
      this.updateAndDraw();
      if (this.particles.length > 0 || this.rockets.length > 0) {
        this.rafId = requestAnimationFrame(loop);
      } else {
        this.isRunning = false;
        if (this.ctx && this.canvas) {
          this.ctx.clearRect(0, 0, this.width, this.height);
        }
      }
    };
    this.rafId = requestAnimationFrame(loop);
  }

  updateAndDraw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Update & Draw Rockets
    for (let i = this.rockets.length - 1; i >= 0; i--) {
      const r = this.rockets[i];
      r.x += r.vx;
      r.y += r.vy;
      r.life--;

      r.trail.push({ x: r.x, y: r.y, alpha: 1 });
      if (r.trail.length > 8) r.trail.shift();

      // Draw smoke / spark trail
      this.ctx.strokeStyle = r.color;
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      for (let j = 0; j < r.trail.length; j++) {
        const pt = r.trail[j];
        if (j === 0) this.ctx.moveTo(pt.x, pt.y);
        else this.ctx.lineTo(pt.x, pt.y);
      }
      this.ctx.stroke();

      // Spark head
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Rocket reached target or expired -> Detonate petasan!
      if (r.life <= 0 || r.y <= r.targetY) {
        this.burst(r.x, r.y, Math.floor(Math.random() * 30 + 60), r.color);
        if (window.soundFx && Math.random() > 0.4) {
          window.soundFx.playPetasanMini();
        }
        this.rockets.splice(i, 1);
      }
    }

    // 2. Update & Draw Particles (Sparks, Shockwaves, Confetti ribbons)
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (p.type === 'shockwave') {
        p.radius += (p.maxRadius - p.radius) * 0.18;
        p.alpha -= p.decay;
        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
        this.ctx.save();
        this.ctx.strokeStyle = p.color;
        this.ctx.globalAlpha = p.alpha;
        this.ctx.lineWidth = 2.5;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.restore();
        continue;
      }

      // Physics
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.alpha -= p.decay;
      p.rotation += p.rotationSpeed;

      // Secondary micro-spark pop (like petasan crackles)
      if (p.secondary && !p.exploded) {
        p.timer--;
        if (p.timer <= 0) {
          p.exploded = true;
          // Spawn tiny flash
          for (let k = 0; k < 4; k++) {
            const a = Math.random() * Math.PI * 2;
            this.particles.push({
              type: 'spark',
              x: p.x,
              y: p.y,
              vx: Math.cos(a) * (Math.random() * 2.5 + 1),
              vy: Math.sin(a) * (Math.random() * 2.5 + 1),
              color: '#fff',
              alpha: 0.9,
              decay: 0.06,
              size: 2,
              gravity: 0.05,
              drag: 0.92
            });
          }
        }
      }

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);

      if (p.type === 'confetti') {
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        const w = p.size;
        const h = p.size * p.aspectRatio;
        this.ctx.fillRect(-w / 2, -h / 2, w, h);
      } else {
        // Glowing round spark
        this.ctx.fillStyle = p.color;
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }
  }
}

// Global Singleton
window.fireworks = new FireworksEngine();
