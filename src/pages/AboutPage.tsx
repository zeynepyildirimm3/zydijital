import React from 'react';
import { About } from '../sections/About';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20">
      {/* 1. Core About Section (Ben Kimim, Neler Yapıyorum, Hedefim Ne & Yetkinlikler) */}
      <About />

      {/* 2. Direct Collaboration Call to Action */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-dark-850/80 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-editorial font-bold text-white mb-1">
              Fikrinizi Birlikte Hayata Geçirelim
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              İster markanız için modern bir web vitrini, ister yazılım ve yapay zeka için bire bir mentorluk.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/iletisim"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-all shadow-md shadow-violet-600/25 active:scale-95"
            >
              <span>Görüşme Planlayalım</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
