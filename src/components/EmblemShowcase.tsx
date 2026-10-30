import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';

export const EmblemShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // 360 Derece Döndürme Açıları
  const [rotation, setRotation] = useState({ x: -8, y: 25 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // Sürükleme başlangıç koordinatları
  const dragStartRef = useRef({ x: 0, y: 0, startRotX: 0, startRotY: 0 });
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // Sürekli Otomatik 360° Dönüş (Mouse üzerinde değilken aralıksız döner)
  useEffect(() => {
    const animate = (time: number) => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      // Kullanıcı mouse ile üzerinde değilken veya sürüklemiyorken sürekli döner
      if (!isInteracting && !isDragging) {
        setRotation((prev) => ({
          x: prev.x * 0.96 + (-8) * 0.04, // Doğal şık eğime yumuşakça dön
          y: (prev.y + (delta * 0.035)) % 360, // Kaldığı açıdan 360 derece kesintisiz akış
        }));
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isInteracting, isDragging]);

  // Mouse üzerine gelince otomatik dönüşü durdurup kontrole geç
  const handlePointerEnter = () => {
    setIsInteracting(true);
  };

  // Mouse üstünden çekilince otomatik dönüşe kaldığı yerden devam et
  const handlePointerLeave = () => {
    if (!isDragging) {
      setIsInteracting(false);
    }
  };

  // Tutup sürükleme başlangıcı
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setIsInteracting(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startRotX: rotation.x,
      startRotY: rotation.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // Mouse ile serbest 360° çevirme
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      // Sürüklerken tam serbest 360 derece döndürme
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;

      setRotation({
        x: Math.max(-65, Math.min(65, dragStartRef.current.startRotX - deltaY * 0.5)),
        y: dragStartRef.current.startRotY + deltaX * 0.8,
      });
    } else if (isInteracting && containerRef.current) {
      // Sadece mouse ile üzerinde gezinirken yumuşak 3D perspektif takibi
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      setRotation((prev) => ({
        x: Math.max(-30, Math.min(30, -relY * 35)),
        y: prev.y + relX * 1.8,
      }));
    }
  };

  // Bırakıldığında otomatik dönüşe geri dön
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setIsInteracting(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-4 select-none">
      {/* 360 Derece Döndürülebilir Bağımsız Amblem Sahnesi */}
      <div
        ref={containerRef}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative flex items-center justify-center p-8 touch-none transition-transform ${
          isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-102'
        }`}
        style={{
          perspective: '1200px',
        }}
        title="Mouse ile üzerine gelin veya sürükleyin; bırakınca otomatik dönmeye devam eder"
      >
        {/* Arka Plan Yumuşak Mor Atmosferik Işıma */}
        <div className="absolute w-64 h-64 -inset-4 bg-gradient-to-tr from-violet-600/30 via-purple-500/20 to-fuchsia-500/15 rounded-full blur-3xl opacity-75 pointer-events-none -z-10 emblem-halo" />

        {/* Dönen 3 Boyutlu Çift Taraflı Amblem */}
        <div
          className="relative flex items-center justify-center transition-transform duration-75 ease-out"
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Ön Yüz (0° - 180° arası) */}
          <div
            className="relative flex items-center justify-center filter emblem-face"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(2px)',
            }}
          >
            <Logo size="2xl" withText={false} />
          </div>

          {/* Arka Yüz (180° - 360° arası - Madalyon gibi iki taraflı) */}
          <div
            className="absolute inset-0 flex items-center justify-center filter emblem-face"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(2px)',
            }}
          >
            <Logo size="2xl" withText={false} />
          </div>

          {/* 3 Boyutlu Madalyon Kenar Kalınlığı Efekti (Z ekseni derinliği) */}
          <div
            className="absolute inset-0 rounded-[28px] border-2 border-violet-500/30 pointer-events-none emblem-3d-rim"
            style={{
              transform: 'translateZ(-2px)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
