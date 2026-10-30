import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface MotionCompositionProps {
  preset?: 'brand' | 'kinetic' | 'geometry';
  title?: string;
  subtitle?: string;
}

export const BrandMotionComposition: React.FC<MotionCompositionProps> = ({
  preset = 'brand',
  title = 'ZEYNEP YILDIRIM',
  subtitle = 'PRODUCT DESIGNER & TECHNOLOGIST',
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  const isGeometryMode = preset === 'geometry';
  const isKineticMode = preset === 'kinetic';

  // Progress 0 to 1 across the video duration
  const progress = frame / durationInFrames;

  // Spring physics for snappy animations
  const logoSpring = spring({
    frame,
    fps,
    config: isGeometryMode
      ? { damping: 10, mass: 1.1, stiffness: 70 }
      : { damping: 14, mass: 0.8, stiffness: 90 },
  });

  const textSpring = spring({
    frame: frame - (isKineticMode ? 15 : 25),
    fps,
    config: isKineticMode
      ? { damping: 12, mass: 0.5, stiffness: 140 }
      : { damping: 16, mass: 0.6, stiffness: 110 },
  });

  const hudSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 18, mass: 0.5, stiffness: 120 },
  });

  // Dynamic rotations and scales
  const radarRotation = interpolate(frame, [0, durationInFrames], [0, 360]);
  const glowPulse = interpolate(
    Math.sin((frame / fps) * Math.PI * 2),
    [-1, 1],
    [0.7, 1.3]
  );
  const ringScale1 = interpolate((frame % 90) / 90, [0, 1], [0.3, 2.2]);
  const ringOpacity1 = interpolate((frame % 90) / 90, [0, 0.3, 0.8, 1], [0, 0.8, 0.4, 0]);

  const ringScale2 = interpolate(((frame + 45) % 90) / 90, [0, 1], [0.3, 2.2]);
  const ringOpacity2 = interpolate(((frame + 45) % 90) / 90, [0, 0.3, 0.8, 1], [0, 0.8, 0.4, 0]);

  // Audio equalizer simulation bars (deterministic based on frame)
  const barCount = 32;
  const bars = Array.from({ length: barCount }, (_, i) => {
    const wave =
      Math.sin((frame * 0.15) + (i * 0.4)) * 0.5 +
      Math.cos((frame * 0.08) - (i * 0.2)) * 0.3 +
      Math.sin((frame * 0.3) + i) * 0.2;
    return Math.max(0.12, Math.min(1, Math.abs(wave)));
  });

  // Vector stroke dashoffset for drawing the Z and Y
  const drawLength = 300;
  const strokeProgress = interpolate(frame, [15, 65], [drawLength, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#060608',
        color: '#FFFFFF',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      {/* 1. Deep Space Kinetic Aurora Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, ${0.18 * glowPulse}) 0%, transparent 65%),
            radial-gradient(circle at ${40 + Math.sin(frame * 0.02) * 20}% ${50 + Math.cos(frame * 0.03) * 15}%, rgba(192, 132, 252, 0.12) 0%, transparent 50%),
            radial-gradient(circle at ${60 - Math.sin(frame * 0.02) * 20}% ${60 - Math.cos(frame * 0.02) * 15}%, rgba(147, 51, 234, 0.14) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />

      {/* 2. Cyberpunk Geometric Grid Perspective */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(168, 85, 247, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168, 85, 247, 0.07) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 75%)',
          opacity: 0.8,
        }}
      />

      {/* 3. Expanding Sonic Radar Waves */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(168, 85, 247, 0.6)',
          boxShadow: '0 0 24px rgba(168, 85, 247, 0.3)',
          transform: `scale(${ringScale1})`,
          opacity: ringOpacity1,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(192, 132, 252, 0.6)',
          boxShadow: '0 0 24px rgba(192, 132, 252, 0.3)',
          transform: `scale(${ringScale2})`,
          opacity: ringOpacity2,
          pointerEvents: 'none',
        }}
      />

      {/* 4. Outer Orbital Calibrations / Compass Ring */}
      <div
        style={{
          position: 'absolute',
          width: '580px',
          height: '580px',
          borderRadius: '50%',
          border: '1px dashed rgba(255, 255, 255, 0.12)',
          transform: `rotate(${radarRotation}deg)`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '640px',
          height: '640px',
          borderRadius: '50%',
          border: '1px solid rgba(168, 85, 247, 0.15)',
          transform: `rotate(${-radarRotation * 0.5}deg)`,
          pointerEvents: 'none',
        }}
      />

      {/* 5. Center Motion Graphic: Z&Y Monogram with Animated Laser Paths */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${logoSpring})`,
          filter: `drop-shadow(0 0 ${20 * glowPulse}px rgba(168, 85, 247, 0.6))`,
          zIndex: 20,
        }}
      >
        <svg
          width="200"
          height="200"
          viewBox="0 0 100 100"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="remotion-purple-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#A855F7" floodOpacity="0.8" />
              <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#C084FC" floodOpacity="0.4" />
            </filter>
            <linearGradient id="purple-laser" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#7E22CE" />
            </linearGradient>
            <mask id="remotion-z-top-notch">
              <rect width="100" height="100" fill="white" />
              {/* Notch where Z top crosses Y left arm */}
              <circle cx="43" cy="28" r="4.5" fill="black" />
            </mask>
          </defs>

          {/* Glowing Ambient Halo behind the emblem */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(168, 85, 247, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            style={{ transform: `rotate(${frame * 1.5}deg)`, transformOrigin: '50px 50px' }}
          />

          {/* LAYER 1: Z Diagonal and Bottom Horizontal Bar (White #FFFFFF) */}
          <path
            d="M66 28 L34 72 H78"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="8.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={drawLength}
            strokeDashoffset={strokeProgress}
            mask="url(#remotion-z-top-notch)"
          />

          {/* LAYER 2: Y Letter (Solid Vibrant Neon Purple #A855F7) */}
          <g filter="url(#remotion-purple-glow)">
            {/* Y Left Arm */}
            <path
              d="M36 22 L58 48"
              fill="none"
              stroke="#A855F7"
              strokeWidth="8.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={drawLength}
              strokeDashoffset={strokeProgress}
            />
            {/* Y Right Arm */}
            <path
              d="M78 22 L58 48"
              fill="none"
              stroke="#A855F7"
              strokeWidth="8.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={drawLength}
              strokeDashoffset={strokeProgress}
            />
            {/* Y Vertical Stem */}
            <path
              d="M58 48 V80"
              fill="none"
              stroke="#A855F7"
              strokeWidth="8.5"
              strokeLinecap="round"
              strokeDasharray={drawLength}
              strokeDashoffset={strokeProgress}
            />
          </g>

          {/* LAYER 3: Z Top Horizontal Bar (Pure White) - Passing In Front of Y */}
          <path
            d="M22 28 H66"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="8.5"
            strokeLinecap="round"
            strokeDasharray={drawLength}
            strokeDashoffset={strokeProgress}
          />

          {/* Laser sparks at active stroke heads */}
          {strokeProgress > 5 && strokeProgress < drawLength - 10 && (
            <circle
              cx="58"
              cy="48"
              r="4"
              fill="#FFFFFF"
              filter="url(#remotion-purple-glow)"
            />
          )}
        </svg>

        {/* Kinetic Monogram Title */}
        <div
          style={{
            marginTop: '32px',
            textAlign: 'center',
            opacity: Math.max(0, textSpring),
            transform: `translateY(${(1 - textSpring) * 24}px)`,
          }}
        >
          <div
            style={{
              fontSize: '36px',
              fontWeight: 800,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              textShadow: '0 0 25px rgba(168, 85, 247, 0.6), 0 0 50px rgba(192, 132, 252, 0.3)',
              marginBottom: '8px',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: '#C084FC',
              fontFamily: 'ui-monospace, monospace',
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>

      {/* 6. Soundwave / Audio Equalizer Matrix at the Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '5px',
          height: '42px',
          padding: '8px 24px',
          borderRadius: '9999px',
          background: 'rgba(15, 11, 26, 0.75)',
          border: '1px solid rgba(168, 85, 247, 0.25)',
          backdropFilter: 'blur(12px)',
          zIndex: 30,
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: '10px',
            color: '#A855F7',
            marginRight: '8px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          SYNC WAVE
        </span>
        {bars.map((heightFactor, i) => (
          <div
            key={i}
            style={{
              width: '4px',
              height: `${heightFactor * 28 + 4}px`,
              borderRadius: '2px',
              background:
                i % 3 === 0
                  ? '#FFFFFF'
                  : i % 2 === 0
                  ? '#C084FC'
                  : '#A855F7',
              boxShadow: `0 0 6px ${i % 2 === 0 ? '#C084FC' : '#A855F7'}`,
              transition: 'height 0.05s ease',
            }}
          />
        ))}
      </div>

      {/* 7. HUD Telemetry Corners */}
      {/* Top Left: Frame & FPS telemetry */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '36px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.7)',
          letterSpacing: '0.1em',
          lineHeight: '1.7',
          opacity: Math.max(0, hudSpring),
          zIndex: 30,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#A855F7' }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22C55E',
              boxShadow: '0 0 8px #22C55E',
              display: 'inline-block',
            }}
          />
          <span>REMOTION MOTION ENGINE</span>
        </div>
        <div>FRAME: {String(frame).padStart(3, '0')} / {durationInFrames}</div>
        <div>FPS: {fps} (DETERMINISTIC)</div>
        <div>TIME: {(frame / fps).toFixed(2)}s</div>
      </div>

      {/* Top Right: Brand Spec & Engine */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          right: '36px',
          textAlign: 'right',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.7)',
          letterSpacing: '0.1em',
          lineHeight: '1.7',
          opacity: Math.max(0, hudSpring),
          zIndex: 30,
        }}
      >
        <div style={{ color: '#C084FC', fontWeight: 600 }}>SPEC: ZY-PORTFOLIO-2026</div>
        <div>MODE: {preset.toUpperCase()}</div>
        <div>RES: {width} × {height}</div>
        <div>CODEC: REACT VECTOR DOM</div>
        <div style={{ color: '#A855F7' }}>STATUS: 100% PROGRAMMATIC</div>
      </div>

      {/* Bottom Left: Coordinates */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '36px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '10px',
          color: 'rgba(255, 255, 255, 0.4)',
          letterSpacing: '0.12em',
          zIndex: 30,
        }}
      >
        GEO: 41.0082° N, 28.9784° E • ISTANBUL
      </div>

      {/* Bottom Right: Progress Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '36px',
          fontFamily: 'ui-monospace, monospace',
          fontSize: '10px',
          color: 'rgba(255, 255, 255, 0.4)',
          letterSpacing: '0.12em',
          zIndex: 30,
        }}
      >
        PROGRESS: {Math.round(progress * 100)}%
      </div>
    </AbsoluteFill>
  );
};
