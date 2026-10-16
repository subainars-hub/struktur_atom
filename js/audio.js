/**
 * ATOMIKA X - Synthesized Web Audio API Engine
 * Completely self-contained, no external MP3/WAV files required!
 * Includes rich realistic petasan (fireworks), celebratory chimes, and distinct error sounds.
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    // Default sound to ACTIVE so user hears all sound effects immediately
    this.isMuted = false;
    try {
      localStorage.setItem('atomika_muted', 'false');
    } catch (e) {}
    this.initContext = this.initContext.bind(this);

    // Initialize AudioContext on any user interaction to comply with browser autoplay policies
    ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
      window.addEventListener(evt, () => this.unlockAudio(), { passive: true });
    });
  }

  unlockAudio() {
    this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('atomika_muted', this.isMuted.toString());
    return this.isMuted;
  }

  // Soft organic UI click
  playClick() {
    if (this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  // Subatomic particle drop pop
  playPop(freq = 600) {
    if (this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.06);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {}
  }

  // Photon emission laser harmonic
  playPhoton() {
    if (this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.15);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {}
  }

  // Correct answer harmonic chime (Bright, uplifting victory tone)
  playCorrect() {
    if (this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Cheerful pentatonic major chord progression: G4, C5, E5, G5, C6
      const notes = [
        { f: 392.00, t: 0.00, dur: 0.35, vol: 0.18 },
        { f: 523.25, t: 0.06, dur: 0.40, vol: 0.22 },
        { f: 659.25, t: 0.12, dur: 0.45, vol: 0.22 },
        { f: 783.99, t: 0.18, dur: 0.50, vol: 0.25 },
        { f: 1046.50, t: 0.25, dur: 0.65, vol: 0.28 }
      ];

      notes.forEach(({ f, t, dur, vol }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);

        gain.gain.setValueAtTime(0, now + t);
        gain.gain.linearRampToValueAtTime(vol, now + t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + t + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + t);
        osc.stop(now + t + dur);
      });
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  // Wrong answer unmistakable buzzer sound (Classic clear buzzer/thud: BZZT!)
  playWrong() {
    if (this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // Two rapid discordant low buzz pulses
      const pulses = [0, 0.14];
      pulses.forEach(offset => {
        // Sawtooth oscillator for classic buzz
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'square';

        // Detuned frequencies for dissonance (warning buzzer)
        osc1.frequency.setValueAtTime(140, now + offset);
        osc1.frequency.linearRampToValueAtTime(110, now + offset + 0.10);

        osc2.frequency.setValueAtTime(148, now + offset);
        osc2.frequency.linearRampToValueAtTime(118, now + offset + 0.10);

        gain.gain.setValueAtTime(0, now + offset);
        gain.gain.linearRampToValueAtTime(0.24, now + offset + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.11);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now + offset);
        osc2.start(now + offset);
        osc1.stop(now + offset + 0.11);
        osc2.stop(now + offset + 0.11);
      });
    } catch (e) {
      console.warn('Audio play error', e);
    }
  }

  // Synthesized realistic Petasan (Fireworks Boom + Crackling Sparks!)
  playPetasan() {
    if (this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;

      // 1. Launch Whistle / Whoosh
      const whistleOsc = this.ctx.createOscillator();
      const whistleGain = this.ctx.createGain();
      whistleOsc.type = 'sine';
      whistleOsc.frequency.setValueAtTime(400, now);
      whistleOsc.frequency.exponentialRampToValueAtTime(1400, now + 0.22);
      whistleGain.gain.setValueAtTime(0.08, now);
      whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      whistleOsc.connect(whistleGain);
      whistleGain.connect(this.ctx.destination);
      whistleOsc.start(now);
      whistleOsc.stop(now + 0.22);

      // 2. The Big Explosion Boom (Detonation at +0.22s)
      const boomTime = now + 0.22;
      const boomOsc = this.ctx.createOscillator();
      const boomGain = this.ctx.createGain();
      boomOsc.type = 'sine';
      boomOsc.frequency.setValueAtTime(180, boomTime);
      boomOsc.frequency.exponentialRampToValueAtTime(35, boomTime + 0.45);

      boomGain.gain.setValueAtTime(0.40, boomTime);
      boomGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.45);

      boomOsc.connect(boomGain);
      boomGain.connect(this.ctx.destination);
      boomOsc.start(boomTime);
      boomOsc.stop(boomTime + 0.45);

      // 3. Explosion Noise Punch
      const bufferSize = this.ctx.sampleRate * 0.4;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, boomTime);
      filter.frequency.exponentialRampToValueAtTime(150, boomTime + 0.35);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, boomTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, boomTime + 0.35);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(boomTime);
      noise.stop(boomTime + 0.4);

      // 4. Petasan Crackles (Kresek-kresek / ceceran kembang api!)
      // Multiple randomized mini crackle pops after the boom
      const crackleDelays = [0.12, 0.18, 0.24, 0.29, 0.36, 0.42, 0.49, 0.55, 0.62];
      crackleDelays.forEach(d => {
        const ct = boomTime + d;
        const cOsc = this.ctx.createOscillator();
        const cGain = this.ctx.createGain();
        cOsc.type = 'triangle';
        cOsc.frequency.setValueAtTime(800 + Math.random() * 1200, ct);
        cGain.gain.setValueAtTime(0.12 + Math.random() * 0.08, ct);
        cGain.gain.exponentialRampToValueAtTime(0.001, ct + 0.04);

        cOsc.connect(cGain);
        cGain.connect(this.ctx.destination);
        cOsc.start(ct);
        cOsc.stop(ct + 0.04);
      });

    } catch (e) {
      console.warn('Petasan audio error', e);
    }
  }

  // Mini petasan crackle pop (for quick successive pops)
  playPetasanMini() {
    if (this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

      gain.gain.setValueAtTime(0.20, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  // Victorious Fanfare celebration
  playFanfare() {
    if (this.isMuted) return;
    this.unlockAudio();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // Majestic triumphant brass chords: C5, E5, G5, C6, E6, G6
      const chords = [
        { f: 523.25, t: 0.0, dur: 0.22, vol: 0.22 },
        { f: 659.25, t: 0.14, dur: 0.22, vol: 0.22 },
        { f: 783.99, t: 0.28, dur: 0.22, vol: 0.24 },
        { f: 1046.50, t: 0.44, dur: 0.55, vol: 0.30 },
        { f: 1318.51, t: 0.58, dur: 0.65, vol: 0.32 }
      ];

      chords.forEach(c => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(c.f, now + c.t);

        gain.gain.setValueAtTime(0, now + c.t);
        gain.gain.linearRampToValueAtTime(c.vol, now + c.t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + c.t + c.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + c.t);
        osc.stop(now + c.t + c.dur);
      });
    } catch (e) {}
  }
}

// Global Sound Instance
window.soundFx = new SoundEngine();
