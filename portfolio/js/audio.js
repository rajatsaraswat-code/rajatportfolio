/**
 * CINEMATIC SOUNDSCAPE ENGINE (Web Audio API)
 * Procedural ambient cinematic drone + tactile UI sound effects
 */

class CinematicAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.droneGain = null;
    this.filter = null;
    this.lfo = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Low-pass Filter for Cinematic Drone
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(240, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    // Drone Gain
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    this.droneGain.connect(this.filter);
    this.filter.connect(this.masterGain);

    // Create Ambient Chords (A1, E2, A2, C#3, E3 - ethereal dark cinema chord)
    const frequencies = [55.0, 82.4, 110.0, 138.6, 164.8];

    frequencies.forEach((freq, index) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      // Sawtooth & Triangle mix for organic warmth
      osc.type = index % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle detuning for analog shimmer
      const detuneAmount = (Math.random() - 0.5) * 8;
      osc.detune.setValueAtTime(detuneAmount, this.ctx.currentTime);

      // Balanced levels
      const level = index === 0 ? 0.4 : 0.18 / (index + 0.5);
      oscGain.gain.setValueAtTime(level, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.droneGain);
      osc.start();
      this.oscillators.push(osc);
    });

    // LFO for slow breathing filter sweep (creates breathing cinema feel)
    this.lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // very slow cycle (8s)
    lfoGain.gain.setValueAtTime(140, this.ctx.currentTime);
    this.lfo.connect(lfoGain);
    lfoGain.connect(this.filter.frequency);
    this.lfo.start();
  }

  toggleSound() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      // Fade in smoothly
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.55, this.ctx.currentTime + 2.0);
      this.isPlaying = true;
    } else {
      // Fade out smoothly
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      this.isPlaying = false;
    }

    return !this.isMuted;
  }

  // Micro UI interaction sound: Camera Aperture Click
  playClick() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.04);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch (e) {}
  }

  // Micro UI interaction sound: Subtle Shimmer Hover
  playHover() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.06);

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.065);
    } catch (e) {}
  }

  // Deep Cinematic Impact / Whoosh for Showreel / Modal
  playWhoosh() {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(60, now + 0.8);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    } catch (e) {}
  }
}

window.cinematicAudio = new CinematicAudioEngine();
