import React from 'react';
import { Projects } from '../sections/Projects';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="pt-20 pb-20">
      {/* Main Interactive Projects Component (with Remotion 60 FPS Micro-Demos & Detail Modal) */}
      <Projects />

      {/* Project Custom Collaboration Banner */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-dark-850/80 border border-white/[0.08] text-center flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white mb-3">
              Kendi Projenizi Hayata Geçirelim
            </h3>
            <p className="text-slate-400 text-sm max-w-lg mb-6 font-light">
              Projenizin kapsamını, hedeflerini ve zaman planını konuşmak üzere hemen bir görüşme planlayın.
            </p>
            <Link
              to="/iletisim"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white text-xs font-semibold inline-flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-violet-500/20"
            >
              <span>Yeni Bir Proje Başlat</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
