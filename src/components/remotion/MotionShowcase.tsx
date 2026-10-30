import React, { useRef, useState } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { BrandMotionComposition } from './BrandMotionComposition';
import { Play, Pause, RotateCcw, Sparkles, Layers, Cpu, Maximize2 } from 'lucide-react';

export const MotionShowcase: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<'brand' | 'kinetic' | 'geometry'>('brand');

  const presets = [
    { id: 'brand', label: 'Marka İntrosu', subtitle: 'Z&Y Monogram & Lazer Çizim' },
    { id: 'kinetic', label: 'Kinetik Tipografi', subtitle: 'Spring Fizik & Metin Akışı' },
    { id: 'geometry', label: 'Siber Izgara & Radar', subtitle: '60 FPS Vektör Telemetrisi' },
  ];

  const handleTogglePlay = () => {
    if (!playerRef.current) return;
    if (playerRef.current.isPlaying()) {
      playerRef.current.pause();
      setIsPlaying(false);
    } else {
      playerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    if (!playerRef.current) return;
    playerRef.current.seekTo(0);
    playerRef.current.play();
    setIsPlaying(true);
  };

  const handleFullscreen = () => {
    const el = document.getElementById('remotion-cinema-frame');
    if (el) {
      if (!document.fullscreenElement) {
        el.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <section id="motion" className="py-24 relative overflow-hidden bg-dark-900/40 border-y border-white/[0.05]">
      {/* Background Neon Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-violet-600/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 text-violet-300 text-xs font-mono tracking-wider mb-4 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Cpu className="w-3.5 h-3.5 text-violet-400" />
            <span>REMOTION PROGRAMMATIC VIDEO</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-white tracking-tight leading-tight mb-4">
            Kod ile Canlanan{' '}
            <span className="purple-gradient-text italic font-normal">
              Hareketli Grafikler.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Remotion kütüphanesi sayesinde video ve hareketli grafikleri harici video dosyaları (mp4/gif) yüklemeden,
            <span className="text-violet-300 font-medium"> %100 saf React, SVG ve matematiksel formüllerle</span> doğrudan tarayıcıda 60 FPS olarak render ediyoruz.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {presets.map((p) => {
            const isActive = activePreset === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setActivePreset(p.id as any);
                  handleRestart();
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  isActive
                    ? 'bg-violet-600/30 text-white border-violet-500/50 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                    : 'bg-dark-850/80 text-slate-400 hover:text-slate-200 border-white/[0.06] hover:bg-white/[0.04]'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-violet-300' : 'text-slate-500'}`} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* High-End Cinema Display Container */}
        <div
          id="remotion-cinema-frame"
          className="relative rounded-3xl bg-dark-950/90 border border-white/[0.1] shadow-2xl shadow-violet-500/10 overflow-hidden backdrop-blur-xl transition-all"
        >
          {/* Cinema Top Telemetry Bar */}
          <div className="px-5 py-3.5 bg-dark-900/90 border-b border-white/[0.07] flex items-center justify-between text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-violet-500" />
              </span>
              <span className="font-semibold text-slate-200 tracking-wider">REMOTION PLAYER ENGINE</span>
              <span className="hidden sm:inline text-white/30">•</span>
              <span className="hidden sm:inline text-slate-400">1920×1080 @ 60 FPS</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden md:inline px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 text-[10px]">
                REACT VIRTUAL DOM
              </span>
              <button
                type="button"
                onClick={handleFullscreen}
                aria-label="Tam Ekran"
                className="p-1 hover:text-white transition-colors text-slate-400"
                title="Tam Ekran Yap"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actual Remotion Player Viewport */}
          <div className="relative aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
            <Player
              ref={playerRef}
              component={BrandMotionComposition}
              inputProps={{
                preset: activePreset,
                title:
                  activePreset === 'brand'
                    ? 'ZEYNEP YILDIRIM'
                    : activePreset === 'kinetic'
                    ? 'KİNETİK TASARIM'
                    : 'VEKTÖR MATRİSİ',
                subtitle:
                  activePreset === 'brand'
                    ? 'PRODUCT DESIGNER & TECHNOLOGIST'
                    : activePreset === 'kinetic'
                    ? 'MATEMATİKSEL AKIŞ & TİPOGRAFİ'
                    : '60 FPS HESAPLANAN DİJİTAL SİSTEM',
              }}
              durationInFrames={180}
              compositionWidth={1920}
              compositionHeight={1080}
              fps={60}
              loop
              autoPlay
              style={{
                width: '100%',
                height: '100%',
              }}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Cinema Bottom Control Deck */}
          <div className="px-5 py-4 bg-dark-900/90 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={handleTogglePlay}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs transition-colors shadow-lg shadow-violet-600/30"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Durdur' : 'Oynat'}</span>
              </button>

              {/* Restart Button */}
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/[0.08] text-xs transition-colors"
                title="Başa Sar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Başa Sar</span>
              </button>
            </div>

            {/* Explanatory Technical Feature Pills */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-dark-850 border border-white/[0.05]">
                <Layers className="w-3 h-3 text-violet-400" />
                <span>Interpolate & Springs</span>
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-dark-850 border border-white/[0.05] text-slate-300">
                0 KB Video Bandwidth (Saf Kod)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-dark-850 border border-white/[0.05] text-violet-300">
                60 FPS Butter Smooth
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
