import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export const CinematicIntro: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState(false);
  const [stage, setStage] = useState<'ignite' | 'reveal'>('ignite');

  // 3D Parallax & Mouse Takibi
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Global "İntroyu Tekrar Oynat" dinleyicisi
  useEffect(() => {
    const handleReplay = () => {
      setIsExiting(false);
      setStage('ignite');
      setIsVisible(true);
    };

    window.addEventListener('zy-play-intro', handleReplay);
    return () => window.removeEventListener('zy-play-intro', handleReplay);
  }, []);

  // Mouse hareketini yumuşakça takip et
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Sayfaya Otomatik Geçiş Zamanlayıcısı
  useEffect(() => {
    if (!isVisible) return;

    // Amblem ve Başlık Açılış Aşaması
    const stageTimer = setTimeout(() => {
      setStage('reveal');
    }, 400);

    // Otomatik Ana Sayfaya Geçiş (~4.0 saniye sonra akıcı şekilde ana sayfaya kayar)
    const autoEnterTimer = setTimeout(() => {
      handleEnterSite();
    }, 4000);

    return () => {
      clearTimeout(stageTimer);
      clearTimeout(autoEnterTimer);
    };
  }, [isVisible]);

  // Sayfaya Akıcı Geçiş Fonksiyonu
  const handleEnterSite = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
    }, 800);
  };

  // 60 FPS Sinematik Arka Plan Warp, Yükselen Kıvılcımlar & Nebula Canvas
  useEffect(() => {
    if (!isVisible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 1. Işık Hızı Yıldızları
    const starCount = 160;
    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.6,
      y: (Math.random() - 0.5) * height * 1.6,
      z: Math.random() * width,
      size: Math.random() * 1.8 + 0.6,
      color: Math.random() > 0.35 ? '#C084FC' : '#FFFFFF',
    }));

    // 2. Alttan Yükselen Enerji Kıvılcımları (Cyber Embers)
    const emberCount = 35;
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 100,
      speedY: Math.random() * 1.4 + 0.8,
      speedX: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.3,
      color: Math.random() > 0.5 ? 'rgba(192, 132, 252,' : 'rgba(233, 213, 255,',
    }));

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.fillStyle = '#050508';
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // 1. Canlı Dönen Sinematik Mor & Mavi Nebula
      const grad = ctx.createRadialGradient(
        centerX + Math.sin(time * 0.9) * 90,
        centerY + Math.cos(time * 0.7) * 60,
        25,
        centerX,
        centerY,
        Math.max(width, height) * 0.75
      );
      grad.addColorStop(0, 'rgba(168, 85, 247, 0.28)');
      grad.addColorStop(0.35, 'rgba(126, 34, 206, 0.16)');
      grad.addColorStop(0.7, 'rgba(30, 27, 75, 0.09)');
      grad.addColorStop(1, 'rgba(5, 5, 8, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Çift Katmanlı Anamorfik Sinematik Işık Flaresi (Hollywood Streak)
      const flareGrad = ctx.createLinearGradient(0, centerY, width, centerY);
      flareGrad.addColorStop(0, 'rgba(168, 85, 247, 0)');
      flareGrad.addColorStop(0.25, 'rgba(192, 132, 252, 0.12)');
      flareGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.55)');
      flareGrad.addColorStop(0.75, 'rgba(192, 132, 252, 0.12)');
      flareGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');

      ctx.fillStyle = flareGrad;
      const flareHeight = 2.5 + Math.sin(time * 3) * 1;
      ctx.fillRect(0, centerY - flareHeight / 2, width, flareHeight);

      // 3. 3D Warp Yıldız Hareketi
      stars.forEach((star) => {
        star.z -= 5.2;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 1.6;
          star.y = (Math.random() - 0.5) * height * 1.6;
        }

        const k = 260 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.5, (1 - star.z / width) * star.size * 2.4);
          const alpha = (1 - star.z / width) * 0.95;

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      });

      // 4. Yükselen Kıvılcımlar (Floating Embers)
      embers.forEach((ember) => {
        ember.y -= ember.speedY;
        ember.x += ember.speedX + Math.sin(time + ember.y * 0.01) * 0.4;

        if (ember.y < -20) {
          ember.y = height + 20;
          ember.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
        ctx.fillStyle = `${ember.color} ${ember.alpha})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Sinematik Tanıtım"
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 z-[9999] bg-[#050508] flex flex-col items-center justify-center overflow-hidden transition-all duration-800 select-none ${
        isExiting ? 'opacity-0 scale-110 blur-md pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 60 FPS Canlı Sinematik Video/Warp Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none cinematic-intro-canvas" />

      {/* Üst Bar: Sadece ZEYNEP YILDIRIM göstergesi ve Hızlı Geç Butonu (Ses butonu kaldırıldı) */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
          <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
            ZEYNEP YILDIRIM
          </span>
        </div>

        {/* Hızlı Geç */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleEnterSite();
          }}
          className="px-4 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-xs font-mono tracking-wider text-slate-200 hover:text-white transition-all backdrop-blur-md flex items-center gap-1.5 active:scale-95"
        >
          <span>GEÇ</span>
          <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
        </button>
      </div>

      {/* Orta Görsel & Tipografi Bölümü (Sinematik 3D Parallax & Kamera Yakınlaşması) */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${-mousePos.y * 7}deg) rotateY(${mousePos.x * 7}deg)`,
        }}
      >
        {/* 1. Faz: ZY Amblemi + Genişleyen Enerji Şok Dalgası Halkaları */}
        <div
          className={`relative transition-all duration-1000 ease-out transform mb-6 ${
            stage === 'reveal'
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-75 translate-y-6'
          }`}
        >
          <div className="relative flex items-center justify-center">
            {/* Genişleyen Dairesel Şok Dalgaları */}
            <div className="absolute w-28 h-28 rounded-full border border-violet-400/50 animate-ping pointer-events-none duration-1000" />
            <div className="absolute w-44 h-44 rounded-full border border-violet-500/25 animate-pulse pointer-events-none" />
            
            {/* Yumuşak Parıltı Haresi */}
            <div className="absolute w-32 h-32 rounded-full bg-gradient-to-tr from-violet-600/40 via-fuchsia-500/25 to-purple-600/35 blur-3xl animate-pulse" />
            
            {/* Z Harfinin Karanlıkta %100 Parlak Beyaz Olmasını Sağlayan CSS Değişkenleri */}
            <div
              className="relative transition-transform duration-700 hover:scale-105"
              style={
                {
                  '--zy-z-stroke': '#FFFFFF',
                  '--zy-y-stroke': '#C084FC',
                  '--zy-knockout': '#050508',
                  '--zy-frame-stroke': '#FFFFFF',
                  '--zy-inner-stroke': 'rgba(192, 132, 252, 0.4)',
                } as React.CSSProperties
              }
            >
              <Logo size="xl" withText={false} />
            </div>
          </div>
        </div>

        {/* 2. Faz: "ZEYNEP YILDIRIM" BAŞLIĞI (İhtişamlı, Yan Yana ve Tam Kıvamında) */}
        <div
          className={`transition-all duration-1000 delay-150 ease-out transform ${
            stage === 'reveal'
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-6'
          }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-editorial font-extrabold tracking-[0.06em] sm:tracking-[0.1em] uppercase leading-none select-none relative group whitespace-nowrap">
            {/* Arka Işık Parlaması */}
            <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-violet-600/25 via-purple-400/25 to-fuchsia-600/25 opacity-80 pointer-events-none" />

            {/* Metalik Işık Geçişli Başlık */}
            <span className="relative bg-gradient-to-b from-white via-slate-100 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_12px_40px_rgba(168,85,247,0.5)]">
              ZEYNEP YILDIRIM
            </span>
          </h1>
        </div>

        {/* 3. Faz: "Dijital Tasarım & Web Stüdyosu" */}
        <div
          className={`transition-all duration-1000 delay-300 ease-out transform mt-5 sm:mt-6 flex items-center justify-center gap-4 ${
            stage === 'reveal'
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="h-[1px] w-10 sm:w-20 md:w-28 bg-gradient-to-r from-transparent to-violet-400/70" />
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif tracking-[0.2em] sm:tracking-[0.28em] text-violet-200/95 font-medium uppercase drop-shadow-sm whitespace-nowrap">
            Dijital Tasarım & Web Stüdyosu
          </h2>
          <span className="h-[1px] w-10 sm:w-20 md:w-28 bg-gradient-to-l from-transparent to-violet-400/70" />
        </div>
      </div>
    </aside>
  );
};
