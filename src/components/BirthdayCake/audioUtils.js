class SoundEffects {
  constructor() {
    this.ctx = null;
    this.audioElement = null;
    this.customMusicUrl = import.meta.env.VITE_MUSIC_PATH || "/audio/music.mp3";
    this.isAmbientPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Set a custom audio file path at runtime
  setMusicSource(url) {
    this.customMusicUrl = url;
    if (this.audioElement) {
      const wasPlaying = !this.audioElement.paused;
      this.audioElement.src = url;
      if (wasPlaying) {
        this.audioElement.play().catch(() => {});
      }
    }
  }

  // Soft wind swoosh when blowing out the candle
  playBlowSound() {
    try {
      this.init();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 1.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pinkish noise for wind
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.96 * b1 + white * 0.11;
        b2 = 0.86 * b2 + white * 0.25;
        data[i] = (b0 + b1 + b2) * 0.3;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(180, this.ctx.currentTime + 1.2);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.5, this.ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 1.2);
    } catch (e) {
      console.warn("Audio playback failed:", e);
    }
  }

  // Sparkling celestial chimes when making a wish or candles light up
  playSparkleSound() {
    try {
      this.init();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C5, E5, G5, C6, E6, G6
      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + index * 0.08);

        const startTime = this.ctx.currentTime + index * 0.08;
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.7);
      });
    } catch (e) {
      console.warn("Audio playback failed:", e);
    }
  }

  // Celebratory birthday fanfare chords
  playFanfare() {
    try {
      this.init();
      if (!this.ctx) return;

      // Happy Birthday Melody Snippet: G4, G4, A4, G4, C5, B4
      const melody = [
        { note: 392.00, dur: 0.25, time: 0 },
        { note: 392.00, dur: 0.25, time: 0.28 },
        { note: 440.00, dur: 0.45, time: 0.56 },
        { note: 392.00, dur: 0.45, time: 1.05 },
        { note: 523.25, dur: 0.50, time: 1.55 },
        { note: 493.88, dur: 0.90, time: 2.10 },
      ];

      melody.forEach(({ note, dur, time }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        const startTime = this.ctx.currentTime + time;
        osc.frequency.setValueAtTime(note, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.18, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + dur);
      });
    } catch (e) {
      console.warn("Fanfare failed:", e);
    }
  }

  // Custom Audio File with fallback to Synthesized Piano Arpeggio
  startAmbientMusic() {
    this.isAmbientPlaying = true;
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("ambient-music-started"));
    }

    // 1. Try playing custom audio file if provided
    if (this.customMusicUrl) {
      if (!this.audioElement) {
        this.audioElement = new Audio(this.customMusicUrl);
        this.audioElement.loop = true;
        this.audioElement.volume = 0.5;
      } else {
        this.audioElement.src = this.customMusicUrl;
      }

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio file played successfully
          })
          .catch((err) => {
            console.info("Custom audio file not found or blocked, using synthesized piano ambience.", err);
            this.startSynthesizedMusic();
          });
        return;
      }
    }

    this.startSynthesizedMusic();
  }

  // Synthesized fallback ambient loop
  startSynthesizedMusic() {
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ambientTimer) return;

      const chords = [
        [261.63, 329.63, 392.00, 523.25], // C Major
        [220.00, 261.63, 329.63, 440.00], // A minor
        [174.61, 220.00, 261.63, 349.23], // F Major
        [196.00, 246.94, 293.66, 392.00], // G Major
      ];

      let chordIndex = 0;

      const playChordArp = () => {
        if (!this.isAmbientPlaying || !this.ctx) return;
        const currentChord = chords[chordIndex % chords.length];
        chordIndex++;

        currentChord.forEach((note, noteIdx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = "sine";
          const startTime = this.ctx.currentTime + noteIdx * 0.45;
          osc.frequency.setValueAtTime(note, startTime);

          gain.gain.setValueAtTime(0.0001, startTime);
          gain.gain.linearRampToValueAtTime(0.045, startTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.2);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(startTime);
          osc.stop(startTime + 2.2);
        });
      };

      playChordArp();
      this.ambientTimer = setInterval(playChordArp, 2000);
    } catch (e) {
      console.warn("Ambient music failed:", e);
    }
  }

  stopAmbientMusic() {
    this.isAmbientPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    if (this.ambientTimer) {
      clearInterval(this.ambientTimer);
      this.ambientTimer = null;
    }
  }

  toggleAmbientMusic() {
    if (this.isAmbientPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic();
      return true;
    }
  }
}

export const sounds = new SoundEffects();

