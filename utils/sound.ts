
import { AvatarId } from '../types';

class SoundManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  
  private bgmEnabled: boolean = true;
  private sfxEnabled: boolean = true;
  private isPlayingBGM: boolean = false;
  private currentAvatar: AvatarId = 'robot'; // Default

  // BGM Logic
  private nextNoteTime: number = 0;
  private currentNoteIndex: number = 0;
  private timerID: number | null = null;
  private tempo: number = 100;
  private currentMood: 'calm' | 'upbeat' = 'calm';

  // Scales
  private calmSequence = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63]; // C Major Arp
  private upbeatSequence = [392.00, 392.00, 493.88, 587.33, 523.25, 392.00, 293.66]; // G Major-ish

  constructor() {
    this.bgmEnabled = true;
    this.sfxEnabled = true;
  }

  public init() {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!this.ctx && AudioContextClass) {
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.bgmEnabled && !this.isPlayingBGM) {
      this.startBGM();
    }
  }

  public setAvatarId(id: AvatarId) {
    this.currentAvatar = id;
  }

  public setMusicEnabled(enabled: boolean) {
    this.bgmEnabled = enabled;
    if (enabled) {
      this.init();
      this.startBGM();
    } else {
      this.stopBGM();
    }
  }

  public setSFXEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
  }

  public setMood(mood: 'calm' | 'upbeat') {
    if (this.currentMood !== mood) {
      this.currentMood = mood;
      this.tempo = mood === 'calm' ? 100 : 130;
    }
  }

  public play(type: 'click' | 'correct' | 'wrong' | 'win' | 'lose' | 'tick' | 'buy' | 'error') {
    if (!this.sfxEnabled || !this.ctx) return;
    this.init();

    // Determine Waveform & Pitch based on Avatar
    let oscType: OscillatorType = 'sine';
    let baseFreq = 440;
    let attack = 0.01;
    let decay = 0.1;

    // Avatar Sound Profiles
    switch (this.currentAvatar) {
        case 'robot': 
            oscType = 'square'; // 8-bit
            baseFreq = 220;
            break;
        case 'angel':
        case 'fairy':
            oscType = 'sine'; // Bell-like
            baseFreq = 880;
            break;
        case 'dino':
        case 'bear':
            oscType = 'sawtooth'; // Harsh/Deep
            baseFreq = 110;
            break;
        case 'cat':
        case 'bunny':
            oscType = 'triangle'; // Soft but punchy
            baseFreq = 660;
            break;
        default:
            oscType = 'sine';
            baseFreq = 440;
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.connect(gain);
    gain.connect(this.masterGain!);

    const now = this.ctx.currentTime;
    
    if (type === 'click') {
        osc.type = oscType;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 2, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);

    } else if (type === 'correct') {
        osc.type = oscType;
        // Happy Arpeggio
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.setValueAtTime(baseFreq * 1.25, now + 0.1); // Major 3rd
        osc.frequency.setValueAtTime(baseFreq * 1.5, now + 0.2);  // Perfect 5th
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        
        osc.start(now);
        osc.stop(now + 0.4);

    } else if (type === 'wrong') {
        osc.type = 'sawtooth'; // Always harsh for wrong
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(100, now + 0.3);
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        osc.start(now);
        osc.stop(now + 0.3);

    } else if (type === 'win') {
        osc.type = oscType;
        // Victory Fanfare
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.setValueAtTime(baseFreq * 1.5, now + 0.15);
        osc.frequency.setValueAtTime(baseFreq * 2, now + 0.3);
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
        
        osc.start(now);
        osc.stop(now + 1.0);

    } else if (type === 'lose') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(150, now + 0.5);
        
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        
        osc.start(now);
        osc.stop(now + 0.6);

    } else if (type === 'tick') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);

    } else if (type === 'buy') {
        // Cash Register-ish
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(1760, now + 0.1);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);

    } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    }
  }

  // Simple sequencing for BGM
  private startBGM() {
    if (this.isPlayingBGM) return;
    this.isPlayingBGM = true;
    this.currentNoteIndex = 0;
    this.nextNoteTime = this.ctx?.currentTime || 0;
    this.scheduler();
  }

  private stopBGM() {
    this.isPlayingBGM = false;
    if (this.timerID) {
      window.clearTimeout(this.timerID);
      this.timerID = null;
    }
  }

  private scheduler() {
    if (!this.isPlayingBGM || !this.ctx) return;
    
    while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
        this.playNote(this.nextNoteTime);
        const secondsPerBeat = 60.0 / this.tempo;
        this.nextNoteTime += secondsPerBeat;
    }
    
    this.timerID = window.setTimeout(() => this.scheduler(), 25);
  }

  private playNote(time: number) {
    if (!this.ctx || !this.masterGain) return;

    const sequence = this.currentMood === 'calm' ? this.calmSequence : this.upbeatSequence;
    const freq = sequence[this.currentNoteIndex % sequence.length];
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine'; // BGM is always soft sine
    osc.frequency.value = freq;
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    // Increased volume from 0.05 to 0.075 (150%)
    gain.gain.setValueAtTime(0.075, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
    
    osc.start(time);
    osc.stop(time + 0.5);
    
    this.currentNoteIndex++;
  }
}

export const soundManager = new SoundManager();
