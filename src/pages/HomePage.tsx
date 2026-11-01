import React from 'react';
import { Hero } from '../sections/Hero';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Sparkles, Layers, Compass, Share2, GraduationCap, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const getServiceIcon = (id: string) => {
  if (id === 'web-consulting') return <Compass className="w-5 h-5" />;
  if (id === 'social-media') return <Share2 className="w-5 h-5" />;
  if (id === 'mentorship-education') return <GraduationCap className="w-5 h-5" />;
  if (id === 'google-meta-ads') return <Target className="w-5 h-5" />;
  return <Layers className="w-5 h-5" />;
};

export const HomePage: React.FC = () => {
  const { services } = usePortfolio();
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Cinematic Hero with 360° Emblem */}
      <Hero />

      {/* 2. Core Capabilities Overview (Hizmetler Özeti) */}
      <section className="py-12 relative bg-dark-900/30 border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold">
                Neler Yapıyorum?
              </span>
              <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white mt-2">
                Üretim, Danışmanlık ve Mentorluk
              </h2>
            </div>

            <Link
              to="/hizmetler"
              className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-dark-850 hover:bg-dark-800 border border-white/[0.08] hover:border-violet-400/40 text-slate-200 hover:text-white transition-all group"
            >
              <span>Tüm Detaylar & Süreç →</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-6 sm:p-7 rounded-3xl bg-dark-850/60 border border-white/[0.06] hover:border-violet-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 mb-5">
                    {getServiceIcon(srv.id)}
                  </div>
                  <h3 className="text-xl font-editorial font-bold text-white mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-mono text-violet-400/90 mb-6">
                    {srv.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Süre: {srv.timeline}</span>
                  <Link
                    to="/hizmetler"
                    className="text-violet-400 hover:text-violet-200 font-medium inline-flex items-center gap-1"
                  >
                    İncele <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Monumental Collaboration CTA Banner */}
      <section className="py-12 pb-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-dark-850 via-dark-900 to-violet-950/40 border border-violet-500/30 relative overflow-hidden shadow-2xl text-center flex flex-col items-center justify-center">
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-950/80 border border-violet-500/30 text-violet-300 text-xs font-mono tracking-wider mb-6 max-w-full text-center">
              <Sparkles className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <span>FİKRİNİZİ GERÇEĞE DÖNÜŞTÜRÜP DİJİTALDE İZ BIRAKALIM</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-white tracking-tight leading-tight max-w-3xl mb-6">
              Sektörde Standart Belirleyen Dijital Deneyimler.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-light max-w-xl mx-auto mb-8 leading-relaxed">
              İster yeni bir web sitesi hayaliniz olsun, ister yazılım ve yapay zeka yolculuğunuz için bire bir mentorluk. Tanışmak için bir mesaj bırakmanız yeterli.
            </p>

            <Link
              to="/iletisim"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600 hover:brightness-110 text-white font-semibold text-sm tracking-wide transition-all shadow-lg shadow-violet-500/25 active:scale-[0.98]"
            >
              <span>Görüşme Planlayalım</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
