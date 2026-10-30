import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { EmblemShowcase } from '../components/EmblemShowcase';

export const Hero: React.FC = () => {
  const { personalInfo, stats } = usePortfolio();
  return (
    <section id="anasayfa" className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Ambience: Subtle Neon Violet Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-violet-600/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Monumental Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-bold text-white tracking-tight leading-[1.12] max-w-5xl mx-auto mb-6">
          Genç Bir Vizyonla Şekillenen{' '}
          <span className="purple-gradient-text italic font-normal">
            Özgün, Modern Web
          </span>{' '}
          ve Dijital Deneyimler.
        </h1>

        {/* Lead Subtitle */}
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-8 text-balance">
          {personalInfo.bio}
        </p>

        {/* Interactive 3D Z+Y Emblem Hologram Centerpiece */}
        <div className="mb-10 max-w-sm mx-auto">
          <EmblemShowcase />
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/hakkimda"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600 hover:brightness-110 text-white font-semibold text-sm tracking-wide transition-all duration-200 shadow-lg shadow-violet-500/25 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-violet-400 outline-none"
          >
            <span>Beni Tanıyın</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/iletisim"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-dark-850/80 hover:bg-dark-800 text-slate-200 hover:text-white border border-white/[0.1] hover:border-violet-400/40 font-medium text-sm transition-all duration-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-violet-400 outline-none"
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span>Görüşme Planlayalım</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/[0.06]">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-dark-900/50 border border-white/[0.05] text-left hover:border-violet-500/30 transition-colors backdrop-blur-sm"
            >
              <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-violet-400 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
