import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export interface ProjectMotionProps {
  projectId: string;
}

export const ProjectMotionComposition: React.FC<ProjectMotionProps> = ({ projectId }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Unified calm timing
  const t = frame / durationInFrames;

  // 0. BESPOKE SHOWCASE: Zeynep Yıldırım Personal Portfolio Architecture (Calm, High-End Editorial 3D Showcase)
  if (projectId === 'zeynep-portfolio' || !projectId) {
    const rotation = interpolate(frame, [0, durationInFrames], [0, 360]);
    const breathe = interpolate(Math.sin((frame / fps) * Math.PI * 2), [-1, 1], [0.96, 1.04]);
    const glowPulse = interpolate(Math.sin((frame / fps) * Math.PI * 2), [-1, 1], [0.2, 0.35]);

    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#07050C',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Subtle background tech grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(168, 85, 247, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.07) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            opacity: 0.6,
          }}
        />

        {/* Ambient violet spotlight glow */}
        <div
          style={{
            position: 'absolute',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(168, 85, 247, ${glowPulse}) 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Calm 3D Monogram & Editorial Geometric Rings */}
        <div
          style={{
            position: 'relative',
            width: '130px',
            height: '130px',
            transform: `scale(${breathe})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Rotating Wireframe SVG */}
          <svg
            width="130"
            height="130"
            viewBox="0 0 100 100"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <defs>
              <linearGradient id="zy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C084FC" />
                <stop offset="100%" stopColor="#7E22CE" />
              </linearGradient>
            </defs>

            {/* Outer Diamond Polygon */}
            <polygon
              points="50,8 92,50 50,92 8,50"
              fill="none"
              stroke="url(#zy-grad)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />

            {/* Inner Diamond Polygon */}
            <polygon
              points="50,20 80,50 50,80 20,50"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              opacity="0.8"
            />

            {/* Core Circular Orbital Ring */}
            <circle
              cx="50"
              cy="50"
              r="15"
              fill="none"
              stroke="#A855F7"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          </svg>

          {/* Central Editorial Monogram */}
          <div
            style={{
              position: 'absolute',
              color: '#FFFFFF',
              fontFamily: 'serif',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textShadow: '0 0 16px rgba(168, 85, 247, 0.8)',
            }}
          >
            Z
          </div>
        </div>

        {/* High-End Editorial Caption */}
        <div
          style={{
            position: 'absolute',
            bottom: '14px',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: 'rgba(255, 255, 255, 0.5)',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: '#22C55E' }}>●</span>
          <span>CANLI PROJE MİMARİSİ</span>
          <span>•</span>
          <span style={{ color: '#C084FC' }}>ÖZGÜN TASARIM</span>
        </div>
      </AbsoluteFill>
    );
  }

  // 1. FINTECH: Aurora Capital (Growth curves, candlestick data flow)
  if (projectId === 'aurora-capital') {
    const curveSpring = spring({
      frame,
      fps,
      config: { damping: 16, mass: 0.7, stiffness: 80 },
    });

    const scanX = interpolate(frame % 90, [0, 90], [50, 450]);

    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#08060D',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'ui-monospace, monospace',
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(168, 85, 247, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.08) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            opacity: 0.6,
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            width: '260px',
            height: '260px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.18) 0%, transparent 70%)',
            left: `${scanX - 130}px`,
            top: '40px',
            pointerEvents: 'none',
          }}
        />

        <svg width="460" height="180" viewBox="0 0 460 180" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="aurora-line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7E22CE" />
              <stop offset="60%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
            <linearGradient id="aurora-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(168, 85, 247, 0.28)" />
              <stop offset="100%" stopColor="rgba(168, 85, 247, 0.0)" />
            </linearGradient>
          </defs>

          {/* Asset Curve Area Fill */}
          <path
            d={`M 30 150 Q 120 ${140 - curveSpring * 40}, 200 ${110 - curveSpring * 30} T 360 ${70 - Math.sin(t * Math.PI * 2) * 8} L 430 ${50 - Math.sin(t * Math.PI * 2) * 6} V 160 H 30 Z`}
            fill="url(#aurora-area-grad)"
          />

          {/* Main Asset Curve Stroke */}
          <path
            d={`M 30 150 Q 120 ${140 - curveSpring * 40}, 200 ${110 - curveSpring * 30} T 360 ${70 - Math.sin(t * Math.PI * 2) * 8} L 430 ${50 - Math.sin(t * Math.PI * 2) * 6}`}
            fill="none"
            stroke="url(#aurora-line-grad)"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Active Data Pulse Indicator */}
          <circle
            cx="430"
            cy={50 - Math.sin(t * Math.PI * 2) * 6}
            r="4.5"
            fill="#FFFFFF"
            stroke="#A855F7"
            strokeWidth="3"
          />

          {/* Scanning Line */}
          <line
            x1={scanX}
            y1="20"
            x2={scanX}
            y2="160"
            stroke="rgba(192, 132, 252, 0.35)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Live Metrics Floating Pill */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '28px',
            padding: '5px 12px',
            borderRadius: '9999px',
            background: 'rgba(15, 11, 26, 0.85)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            color: '#FFFFFF',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' }} />
          <span style={{ color: '#C084FC', fontWeight: 600 }}>+$140k/h</span>
          <span style={{ color: 'rgba(255,255,255,0.5)' }}>PORTFOLIO</span>
        </div>
      </AbsoluteFill>
    );
  }

  // 2. SAAS: Lumina Cloud Analytics (Real-time telemetry, node latency)
  if (projectId === 'lumina-saas') {
    const barCount = 18;
    const bars = Array.from({ length: barCount }, (_, i) => {
      const v = Math.sin((frame * 0.18) + (i * 0.5)) * 0.5 + 0.5;
      return Math.max(0.15, v);
    });

    const latency = Math.round(14 + Math.sin(frame * 0.1) * 3);

    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#07060A',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'ui-monospace, monospace',
          padding: '24px',
        }}
      >
        {/* Center Telemetry Equalizer Bars */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: '8px',
            height: '80px',
            marginBottom: '16px',
          }}
        >
          {bars.map((factor, i) => (
            <div
              key={i}
              style={{
                width: '6px',
                height: `${factor * 70 + 8}px`,
                borderRadius: '3px',
                backgroundColor: i % 2 === 0 ? '#A855F7' : '#C084FC',
                boxShadow: i % 4 === 0 ? '0 0 10px rgba(168, 85, 247, 0.7)' : 'none',
                opacity: 0.75 + factor * 0.25,
              }}
            />
          ))}
        </div>

        {/* Status Deck */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.7)',
            padding: '6px 16px',
            borderRadius: '8px',
            background: 'rgba(20, 16, 32, 0.7)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
          }}
        >
          <span style={{ color: '#22C55E' }}>● LIVE CLOUD STREAM</span>
          <span>LATENCY: {latency}ms</span>
          <span style={{ color: '#C084FC' }}>AI PIPELINE: 99.98%</span>
        </div>
      </AbsoluteFill>
    );
  }

  // 3. LUXURY: Monolith High Jewelry (Minimal editorial geometry & golden ratio)
  if (projectId === 'monolith-atelier') {
    const rotation = interpolate(frame, [0, durationInFrames], [0, 360]);
    const breathe = interpolate(Math.sin((frame / fps) * Math.PI * 2), [-1, 1], [0.95, 1.05]);

    return (
      <AbsoluteFill
        style={{
          backgroundColor: '#050507',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Soft center jewel light */}
        <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(192, 132, 252, 0.16) 0%, transparent 70%)',
          }}
        />

        {/* Rotating wireframe diamond polygon */}
        <div
          style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            transform: `scale(${breathe})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {/* Outer Diamond */}
            <polygon
              points="50,10 90,50 50,90 10,50"
              fill="none"
              stroke="#A855F7"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            {/* Inner Diamond */}
            <polygon
              points="50,22 78,50 50,78 22,50"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            {/* Core Facets */}
            <circle cx="50" cy="50" r="12" fill="none" stroke="#C084FC" strokeWidth="1" />
          </svg>

          {/* Minimal Editorial Monogram */}
          <div
            style={{
              position: 'absolute',
              color: '#FFFFFF',
              fontFamily: 'serif',
              fontSize: '12px',
              letterSpacing: '0.3em',
              fontWeight: 500,
            }}
          >
            M
          </div>
        </div>

        {/* Quiet Luxury Caption */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '9px',
            letterSpacing: '0.25em',
            color: 'rgba(255, 255, 255, 0.4)',
            textTransform: 'uppercase',
          }}
        >
          3D Facet Model • 60 FPS
        </div>
      </AbsoluteFill>
    );
  }

  // 4. DESIGN SYSTEM: Strata Multi-Brand (Morphing UI Tokens)
  const tokenState = Math.floor((frame / 30) % 3);
  const states = [
    { label: 'DEFAULT STATE', color: '#A855F7', radius: '8px', scale: 1 },
    { label: 'HOVER FOCUS', color: '#C084FC', radius: '16px', scale: 1.05 },
    { label: 'ACTIVE RIPPLE', color: '#7E22CE', radius: '24px', scale: 0.98 },
  ];
  const currentState = states[tokenState];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#08070D',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'ui-monospace, monospace',
        padding: '20px',
      }}
    >
      {/* Morphing Token Component Preview */}
      <div
        style={{
          padding: '10px 24px',
          borderRadius: currentState.radius,
          backgroundColor: 'rgba(168, 85, 247, 0.15)',
          border: `1.5px solid ${currentState.color}`,
          color: '#FFFFFF',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: `0 0 20px ${currentState.color}40`,
          transform: `scale(${currentState.scale})`,
          transition: 'all 0.3s ease',
          marginBottom: '16px',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: currentState.color,
          }}
        />
        <span>$token.action.button</span>
      </div>

      {/* Token Inspector Code Row */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          fontSize: '10px',
          color: 'rgba(255, 255, 255, 0.5)',
        }}
      >
        <span style={{ color: '#C084FC' }}>STATE: {currentState.label}</span>
        <span>•</span>
        <span>RADIUS: {currentState.radius}</span>
      </div>
    </AbsoluteFill>
  );
};
