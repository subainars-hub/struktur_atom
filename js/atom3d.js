/**
 * ATOMIKA X - 3D Interactive Atom & Model Visualizer (HTML5 Canvas)
 * Supports 3D rotation, zoom, electron excitation, photon emission, and 5 historical model modes.
 */

class AtomVisualizer {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.mode = options.mode || 'bohr'; // 'dalton' | 'thomson' | 'rutherford' | 'bohr' | 'quantum'
    this.isHero = options.isHero || false;

    // Viewport & 3D camera
    this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 400;
    this.height = this.canvas.height = this.canvas.parentElement.clientHeight || 400;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;

    this.rotX = options.rotX !== undefined ? options.rotX : 0.4;
    this.rotY = options.rotY !== undefined ? options.rotY : 0.6;
    this.rotZ = 0;
    this.zoom = options.zoom || 1.0;

    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.autoRotate = options.autoRotate !== false;
    this.animTime = 0;

    // Excitation & Photons
    this.photons = [];
    this.excitationLevel = 0;

    // Initialize particles & orbits for current mode
    this.initModelData();
    this.setupListeners();
    this.startLoop();
  }

  setMode(newMode) {
    this.mode = newMode;
    this.initModelData();
  }

  initModelData() {
    this.electrons = [];
    this.nucleusParticles = [];
    this.quantumClouds = [];

    const baseRadius = Math.min(this.width, this.height) * 0.28;

    if (this.mode === 'dalton') {
      // Solid sphere only
    } else if (this.mode === 'thomson') {
      // Positive pudding sphere with embedded electrons
      const count = 12;
      for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = (baseRadius * 0.7) * Math.cbrt(Math.random());
        this.electrons.push({
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          vz: (Math.random() - 0.5) * 0.3,
          radius: 6
        });
      }
    } else if (this.mode === 'rutherford') {
      // Tiny dense positive nucleus, wide vacuum, 3 tilted planetary electron orbits
      for (let i = 0; i < 8; i++) {
        this.nucleusParticles.push({
          x: (Math.random() - 0.5) * 16,
          y: (Math.random() - 0.5) * 16,
          z: (Math.random() - 0.5) * 16,
          isProton: Math.random() > 0.4
        });
      }
      this.orbits = [
        { tiltX: 0.3, tiltY: 0.5, r: baseRadius * 0.9, speed: 0.04, angle: 0 },
        { tiltX: -0.6, tiltY: 0.8, r: baseRadius * 1.1, speed: 0.035, angle: 2.1 },
        { tiltX: 0.8, tiltY: -0.4, r: baseRadius * 1.25, speed: 0.028, angle: 4.2 }
      ];
    } else if (this.mode === 'bohr') {
      // Concentric quantized energy levels K (n=1), L (n=2), M (n=3)
      for (let i = 0; i < 14; i++) {
        this.nucleusParticles.push({
          x: (Math.random() - 0.5) * 24,
          y: (Math.random() - 0.5) * 24,
          z: (Math.random() - 0.5) * 24,
          isProton: i % 2 === 0
        });
      }
      this.bohrShells = [
        { n: 1, name: "K", r: baseRadius * 0.45, electrons: [0, Math.PI], speed: 0.045 },
        { n: 2, name: "L", r: baseRadius * 0.8, electrons: [0, 0.78, 1.57, 2.35, 3.14, 3.92, 4.71, 5.49], speed: 0.03 },
        { n: 3, name: "M", r: baseRadius * 1.18, electrons: [0.5, 2.6, 4.7], speed: 0.02 }
      ];
    } else if (this.mode === 'quantum') {
      // 3D Probability Density Cloud (|Ψ|²)
      const pointCount = 350;
      for (let i = 0; i < pointCount; i++) {
        // Sample radial probability distribution
        const u = Math.random();
        const r = (baseRadius * 1.1) * (Math.pow(u, 1.8) + 0.1);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        // Dumbbell dumbbell lobes for p-orbitals
        const isP = Math.random() > 0.4;
        let scale = 1.0;
        if (isP) {
          scale = Math.abs(Math.cos(phi)) * 1.4;
        }

        this.quantumClouds.push({
          baseX: r * scale * Math.sin(phi) * Math.cos(theta),
          baseY: r * scale * Math.sin(phi) * Math.sin(theta),
          baseZ: r * scale * Math.cos(phi),
          size: Math.random() * 2.5 + 1.2,
          alpha: Math.random() * 0.6 + 0.2,
          phase: Math.random() * Math.PI * 2,
          color: isP ? 'rgba(157, 78, 221,' : 'rgba(0, 242, 254,'
        });
      }
    }
  }

  setupListeners() {
    window.addEventListener('resize', () => {
      if (!this.canvas.parentElement) return;
      this.width = this.canvas.width = this.canvas.parentElement.clientWidth || 400;
      this.height = this.canvas.height = this.canvas.parentElement.clientHeight || 400;
      this.centerX = this.width / 2;
      this.centerY = this.height / 2;
      this.initModelData();
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.lastMouseX;
      const dy = e.clientY - this.lastMouseY;
      this.rotY += dx * 0.01;
      this.rotX += dy * 0.01;
      this.lastMouseX = e.clientX;
      this.lastMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
    });

    // Touch support for mobile devices
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.lastMouseX = e.touches[0].clientX;
        this.lastMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!this.isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - this.lastMouseX;
      const dy = e.touches[0].clientY - this.lastMouseY;
      this.rotY += dx * 0.01;
      this.rotX += dy * 0.01;
      this.lastMouseX = e.touches[0].clientX;
      this.lastMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.isDragging = false;
    });

    // Zoom on wheel
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.zoom += e.deltaY * -0.001;
      this.zoom = Math.min(Math.max(0.6, this.zoom), 1.8);
    }, { passive: false });

    // Excite electron on click
    this.canvas.addEventListener('click', () => {
      this.exciteElectron();
    });
  }

  exciteElectron() {
    if (window.soundFx) {
      window.soundFx.playPhoton();
    }

    // Spawn photon wave packet
    const angle = Math.random() * Math.PI * 2;
    this.photons.push({
      x: 0,
      y: 0,
      vx: Math.cos(angle) * 4.5,
      vy: Math.sin(angle) * 4.5,
      life: 1.0,
      waveFreq: 24,
      color: '#00f2fe'
    });

    this.excitationLevel = 1.0;
  }

  // 3D rotation projection helper
  project(x, y, z) {
    // Rotate Y
    let cosY = Math.cos(this.rotY);
    let sinY = Math.sin(this.rotY);
    let x1 = x * cosY + z * sinY;
    let y1 = y;
    let z1 = -x * sinY + z * cosY;

    // Rotate X
    let cosX = Math.cos(this.rotX);
    let sinX = Math.sin(this.rotX);
    let x2 = x1;
    let y2 = y1 * cosX - z1 * sinX;
    let z2 = y1 * sinX + z1 * cosX;

    // Perspective projection
    const fov = 400;
    const scale = (fov / (fov + z2 * 0.6)) * this.zoom;
    return {
      x: this.centerX + x2 * scale,
      y: this.centerY + y2 * scale,
      scale: scale,
      depth: z2
    };
  }

  startLoop() {
    const render = () => {
      this.animTime += 0.02;
      if (this.autoRotate && !this.isDragging) {
        this.rotY += 0.004;
      }
      if (this.excitationLevel > 0) {
        this.excitationLevel = Math.max(0, this.excitationLevel - 0.02);
      }

      this.draw();
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.mode === 'dalton') {
      this.drawDalton();
    } else if (this.mode === 'thomson') {
      this.drawThomson();
    } else if (this.mode === 'rutherford') {
      this.drawRutherford();
    } else if (this.mode === 'bohr') {
      this.drawBohr();
    } else if (this.mode === 'quantum') {
      this.drawQuantum();
    }

    // Render photons
    this.drawPhotons();
  }

  drawDalton() {
    const p = this.project(0, 0, 0);
    const r = Math.min(this.width, this.height) * 0.26 * p.scale;

    // 3D Metallic Sphere Shader
    const grad = this.ctx.createRadialGradient(
      p.x - r * 0.35, p.y - r * 0.35, r * 0.05,
      p.x, p.y, r
    );
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.2, '#70a1ff');
    grad.addColorStop(0.6, '#1e3799');
    grad.addColorStop(1, '#0c2461');

    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    this.ctx.fillStyle = grad;
    this.ctx.shadowColor = 'rgba(79, 172, 254, 0.4)';
    this.ctx.shadowBlur = 30;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Specular highlight rim
    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }

  drawThomson() {
    const p = this.project(0, 0, 0);
    const r = Math.min(this.width, this.height) * 0.28 * p.scale;

    // Positive pudding matrix
    const grad = this.ctx.createRadialGradient(
      p.x - r * 0.2, p.y - r * 0.2, r * 0.1,
      p.x, p.y, r
    );
    grad.addColorStop(0, '#ff9ff3');
    grad.addColorStop(0.5, '#f368e0');
    grad.addColorStop(0.9, 'rgba(238, 82, 83, 0.85)');
    grad.addColorStop(1, 'rgba(150, 40, 60, 0.9)');

    this.ctx.beginPath();
    this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    this.ctx.fillStyle = grad;
    this.ctx.shadowColor = 'rgba(243, 104, 224, 0.35)';
    this.ctx.shadowBlur = 25;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Draw '+' sign in center background
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    this.ctx.font = `bold ${Math.round(r * 0.6)}px sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('+', p.x, p.y);

    // Sort electrons by depth
    const projectedElectrons = this.electrons.map(e => {
      // gentle wobble
      e.x += e.vx; e.y += e.vy; e.z += e.vz;
      const dist = Math.sqrt(e.x*e.x + e.y*e.y + e.z*e.z);
      if (dist > r * 0.75 / p.scale) {
        e.vx *= -1; e.vy *= -1; e.vz *= -1;
      }
      const proj = this.project(e.x, e.y, e.z);
      return { proj, r: e.radius };
    });

    projectedElectrons.sort((a, b) => a.proj.depth - b.proj.depth);

    projectedElectrons.forEach(item => {
      const ep = item.proj;
      const er = item.r * ep.scale;

      this.ctx.beginPath();
      this.ctx.arc(ep.x, ep.y, er, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffd166';
      this.ctx.shadowColor = '#ffd166';
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;

      // Minus sign
      this.ctx.fillStyle = '#111';
      this.ctx.font = `bold ${Math.round(er * 1.2)}px sans-serif`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('-', ep.x, ep.y);
    });
  }

  drawRutherford() {
    // Central dense nucleus
    this.drawNucleusGroup();

    // Planetary rings & electrons
    this.orbits.forEach(orb => {
      orb.angle += orb.speed;

      // Draw orbit path in 3D
      this.ctx.beginPath();
      const steps = 48;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        let ox = Math.cos(a) * orb.r;
        let oy = Math.sin(a) * orb.r * Math.cos(orb.tiltX);
        let oz = Math.sin(a) * orb.r * Math.sin(orb.tiltX);

        // Apply tiltY
        let ox2 = ox * Math.cos(orb.tiltY) - oz * Math.sin(orb.tiltY);
        let oz2 = ox * Math.sin(orb.tiltY) + oz * Math.cos(orb.tiltY);

        const pt = this.project(ox2, oy, oz2);
        if (i === 0) this.ctx.moveTo(pt.x, pt.y);
        else this.ctx.lineTo(pt.x, pt.y);
      }
      this.ctx.strokeStyle = 'rgba(0, 242, 254, 0.25)';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();

      // Electron position
      let ex = Math.cos(orb.angle) * orb.r;
      let ey = Math.sin(orb.angle) * orb.r * Math.cos(orb.tiltX);
      let ez = Math.sin(orb.angle) * orb.r * Math.sin(orb.tiltX);
      let ex2 = ex * Math.cos(orb.tiltY) - ez * Math.sin(orb.tiltY);
      let ez2 = ex * Math.sin(orb.tiltY) + ez * Math.cos(orb.tiltY);

      const ep = this.project(ex2, ey, ez2);
      this.ctx.beginPath();
      this.ctx.arc(ep.x, ep.y, 5 * ep.scale, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffd166';
      this.ctx.shadowColor = '#ffd166';
      this.ctx.shadowBlur = 12;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }

  drawBohr() {
    // Concentric orbital shells with electrons and labels
    this.drawNucleusGroup();

    this.bohrShells.forEach((shell, idx) => {
      // Draw shell orbit circle
      this.ctx.beginPath();
      const steps = 60;
      for (let i = 0; i <= steps; i++) {
        const a = (i / steps) * Math.PI * 2;
        const pt = this.project(Math.cos(a) * shell.r, Math.sin(a) * shell.r, 0);
        if (i === 0) this.ctx.moveTo(pt.x, pt.y);
        else this.ctx.lineTo(pt.x, pt.y);
      }
      this.ctx.strokeStyle = this.excitationLevel > 0 && idx === 1 
        ? 'rgba(255, 209, 102, 0.7)' 
        : 'rgba(79, 172, 254, 0.35)';
      this.ctx.lineWidth = this.excitationLevel > 0 && idx === 1 ? 2.5 : 1.5;
      this.ctx.stroke();

      // Shell label (K, L, M)
      const labelPt = this.project(shell.r, 0, 0);
      this.ctx.fillStyle = 'rgba(0, 242, 254, 0.7)';
      this.ctx.font = 'bold 11px monospace';
      this.ctx.fillText(`${shell.name} (n=${shell.n})`, labelPt.x + 8, labelPt.y - 4);

      // Move electrons
      shell.electrons.forEach((angle, eIdx) => {
        const currentAngle = angle + this.animTime * shell.speed;
        const ex = Math.cos(currentAngle) * shell.r;
        const ey = Math.sin(currentAngle) * shell.r;
        const ep = this.project(ex, ey, 0);

        this.ctx.beginPath();
        this.ctx.arc(ep.x, ep.y, 5.5 * ep.scale, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffd166';
        this.ctx.shadowColor = '#ffd166';
        this.ctx.shadowBlur = 12;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      });
    });
  }

  drawQuantum() {
    // Central tiny nucleus
    const np = this.project(0, 0, 0);
    this.ctx.beginPath();
    this.ctx.arc(np.x, np.y, 7 * np.scale, 0, Math.PI * 2);
    this.ctx.fillStyle = '#ff4757';
    this.ctx.shadowColor = '#ff4757';
    this.ctx.shadowBlur = 15;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Probability Point Cloud with Heisenberg Jitter
    this.quantumClouds.forEach(pt => {
      // Small jitter simulating wave fluctuation
      const jitter = Math.sin(this.animTime * 3 + pt.phase) * 2;
      const proj = this.project(pt.baseX + jitter, pt.baseY + jitter, pt.baseZ + jitter);

      this.ctx.beginPath();
      this.ctx.arc(proj.x, proj.y, pt.size * proj.scale, 0, Math.PI * 2);
      this.ctx.fillStyle = `${pt.color}${pt.alpha})`;
      this.ctx.fill();
    });
  }

  drawNucleusGroup() {
    const projectedNucleons = this.nucleusParticles.map(p => {
      const proj = this.project(p.x, p.y, p.z);
      return { proj, isProton: p.isProton };
    });

    projectedNucleons.sort((a, b) => a.proj.depth - b.proj.depth);

    projectedNucleons.forEach(item => {
      const p = item.proj;
      const r = 6 * p.scale;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      this.ctx.fillStyle = item.isProton ? '#ff4757' : '#4facfe';
      this.ctx.shadowColor = item.isProton ? '#ff4757' : '#4facfe';
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });
  }

  drawPhotons() {
    for (let i = this.photons.length - 1; i >= 0; i--) {
      const ph = this.photons[i];
      ph.x += ph.vx;
      ph.y += ph.vy;
      ph.life -= 0.02;

      if (ph.life <= 0) {
        this.photons.splice(i, 1);
        continue;
      }

      // Draw sinusoidal photon wave packet
      const proj = this.project(ph.x, ph.y, 0);
      this.ctx.save();
      this.ctx.translate(proj.x, proj.y);
      const rot = Math.atan2(ph.vy, ph.vx);
      this.ctx.rotate(rot);

      this.ctx.beginPath();
      for (let s = -20; s <= 20; s += 2) {
        const waveY = Math.sin((s + this.animTime * 20) * 0.4) * 5 * ph.life;
        if (s === -20) this.ctx.moveTo(s, waveY);
        else this.ctx.lineTo(s, waveY);
      }
      this.ctx.strokeStyle = `rgba(0, 242, 254, ${ph.life})`;
      this.ctx.lineWidth = 2.5;
      this.ctx.shadowColor = '#00f2fe';
      this.ctx.shadowBlur = 10;
      this.ctx.stroke();
      this.ctx.restore();
    }
  }
}

window.AtomVisualizer = AtomVisualizer;
