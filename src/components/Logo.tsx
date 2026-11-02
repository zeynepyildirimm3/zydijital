import React from 'react';
import { useEmblemVariant, type EmblemVariant } from '../hooks/useEmblemVariant';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  withText?: boolean;
  className?: string;
  variant?: EmblemVariant;
  customSize?: number;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  withText = true,
  className = '',
  variant: propVariant,
  customSize,
}) => {
  const [syncedVariant] = useEmblemVariant();
  const currentVariant = propVariant || syncedVariant;

  const sizeMap = {
    sm: { icon: 34, text: 'text-sm', sub: 'text-[10px]' },
    md: { icon: 44, text: 'text-base sm:text-lg', sub: 'text-[11px] sm:text-xs' },
    lg: { icon: 58, text: 'text-xl sm:text-2xl', sub: 'text-xs sm:text-sm' },
    xl: { icon: 96, text: 'text-3xl sm:text-4xl', sub: 'text-sm sm:text-base' },
    '2xl': { icon: 140, text: 'text-4xl sm:text-5xl', sub: 'text-base sm:text-lg' },
  };

  const { icon: defaultPx, text: titleSize } = sizeMap[size];
  const px = customSize || defaultPx;

  // Keskin, net ve şeffaf zemin renkleri
  const Z_STROKE = 'var(--zy-z-stroke, #FFFFFF)';
  const Y_STROKE = 'var(--zy-y-stroke, #A855F7)';
  const FRAME_STROKE = 'var(--zy-frame-stroke, url(#zy-frame-border))';
  const INNER_STROKE = 'var(--zy-inner-stroke, rgba(192, 132, 252, 0.3))';

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Z&Y Monogram Amblem Konteyneri */}
      <div
        className="relative group cursor-pointer"
        style={{ width: px, height: px }}
        aria-label="Zeynep Yıldırım ZY Logo Amblemi"
      >
        {/* Vector SVG Emblem Container (Gölgesiz, keskin vektör) */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full"
        >
          <defs>
            {/* Çerçeve Bordür Gradyanı - Karanlık Mod */}
            <linearGradient id="zy-frame-border" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#C084FC" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.6" />
            </linearGradient>

            {/* Çerçeve Bordür Gradyanı - Aydınlık Mod */}
            <linearGradient id="zy-frame-border-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#7E22CE" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#6B21A8" stopOpacity="0.65" />
            </linearGradient>
          </defs>

          {/* 1. SEÇENEK: Neo-Squircle (Modern Kavisli Kalkan - Varsayılan) */}
          {currentVariant === 'squircle' && (
            <>
              {/* Dış Kavisli Çerçeve (Arka plan şeffaf) */}
              <rect
                x="8"
                y="8"
                width="84"
                height="84"
                rx="22"
                fill="none"
                stroke={FRAME_STROKE}
                strokeWidth="2.5"
              />
              {/* İç Mimari Vurgu */}
              <rect
                x="14"
                y="14"
                width="72"
                height="72"
                rx="16"
                fill="none"
                stroke={INNER_STROKE}
                strokeWidth="1"
              />

              {/* 1. ADIM: Z Harfi (Tam Gövde) */}
              <path
                d="M22 28 H66 L24 68 H68"
                stroke={Z_STROKE}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 2. ADIM: Y Harfi (Z'nin köşegeninin üstünden geçer) */}
              <path
                d="M36 22 L58 48 L78 22"
                stroke={Y_STROKE}
                strokeWidth="6.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M58 48 V80"
                stroke={Y_STROKE}
                strokeWidth="6.5"
                strokeLinecap="round"
              />

              {/* 3. ADIM: Z'nin Alt Çizgisi (Y'nin dikey bacağının ÜSTÜNE biner -> Tam iç içe geçme) */}
              <path
                d="M24 68 H68"
                stroke={Z_STROKE}
                strokeWidth="6"
                strokeLinecap="round"
              />
            </>
          )}

          {/* 2. SEÇENEK: Pahlı Mimari Mühür (Octagonal Cartouche) */}
          {currentVariant === 'cartouche' && (
            <>
              <polygon
                points="30,6 70,6 94,30 94,70 70,94 30,94 6,70 6,30"
                fill="none"
                stroke={FRAME_STROKE}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <polygon
                points="32,13 68,13 87,32 87,68 68,87 32,87 13,68 13,32"
                fill="none"
                stroke={INNER_STROKE}
                strokeWidth="1"
              />

              {/* Z Harfi Gövde */}
              <path
                d="M24 28 H76 L26 69 H76"
                stroke={Z_STROKE}
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Y Harfi */}
              <path
                d="M32 20 L50 46 L68 20"
                stroke={Y_STROKE}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M50 46 V80"
                stroke={Y_STROKE}
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Z'nin Alt Çizgisi Önde */}
              <path
                d="M26 69 H76"
                stroke={Z_STROKE}
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            </>
          )}

          {/* 3. SEÇENEK: Altıgen Kalkan (Hexagonal Shield) */}
          {currentVariant === 'hexagon' && (
            <>
              <polygon
                points="50,4 92,26 92,74 50,96 8,74 8,26"
                fill="none"
                stroke={FRAME_STROKE}
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <polygon
                points="50,11 85,29 85,71 50,89 15,71 15,29"
                fill="none"
                stroke={INNER_STROKE}
                strokeWidth="1"
              />

              {/* Z Harfi Gövde */}
              <path
                d="M22 28 H64 L22 64 H64"
                stroke={Z_STROKE}
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Y Harfi */}
              <path
                d="M36 22 L60 50 L80 22"
                stroke={Y_STROKE}
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M60 50 V82"
                stroke={Y_STROKE}
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* Z'nin Alt Çizgisi Önde */}
              <path
                d="M22 64 H64"
                stroke={Z_STROKE}
                strokeWidth="5.5"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>
      </div>

      {/* Tipografi Wordmark (Üstte ZEYNEP YILDIRIM, Altta Dijital Tasarım · Web Geliştirme · Reklamcılık) */}
      {withText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-editorial font-bold tracking-[0.06em] text-slate-900 dark:text-white uppercase ${titleSize}`}>
              ZEYNEP YILDIRIM
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 dark:bg-violet-400 inline-block shadow-[0_0_6px_rgba(168,85,247,0.5)]" />
          </div>
          <span className={`font-serif tracking-[0.05em] text-violet-700 dark:text-violet-300 font-medium mt-1 text-[9.5px] min-[390px]:text-[10.5px] sm:text-xs whitespace-nowrap`}>
            Dijital Tasarım · Web Geliştirme · Reklamcılık
          </span>
        </div>
      )}
    </div>
  );
};
