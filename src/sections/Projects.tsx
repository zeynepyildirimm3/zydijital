import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { ArrowRight, Sparkles, X } from 'lucide-react';
import websitePreview from '../assets/website-preview.png';

export const Projects: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projeler" className="py-16 sm:py-24 relative bg-dark-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold">
            Portfolyo & Üretim
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white mt-2">
            Öne Çıkan Projelerim
          </h2>
        </div>

        {/* Projects List Showcase */}
        <div className="space-y-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group p-6 sm:p-8 rounded-3xl bg-dark-850/60 border border-white/[0.07] hover:border-violet-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-violet-500/10 relative overflow-hidden"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-medium">
                    {project.category}
                  </span>
                  <span className="text-violet-400 font-medium">{project.year} · Aktif Vitrin</span>
                </div>

                {/* Real Website Showcase Image */}
                <div className="mb-6 h-56 sm:h-80 rounded-2xl overflow-hidden border border-white/[0.08] bg-dark-950 group-hover:border-violet-500/40 transition-all relative shadow-inner">
                  <img
                    src={project.image || websitePreview}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/40 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-editorial font-bold text-white group-hover:text-violet-300 transition-colors mb-4">
                  {project.title}
                </h3>
              </div>

              <div>
                {/* Action Buttons (Proje Detayları & Canlı Projeyi Gez) */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-medium text-slate-300 hover:text-white px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
                  >
                    Proje Detayları
                  </button>

                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-white px-5 py-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 shadow-sm shadow-violet-500/20 inline-flex items-center gap-1.5 transition-all group-hover:scale-[1.02]"
                    >
                      <span>Canlı Projeyi Gez</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <Link
                      to="/"
                      className="text-xs font-semibold text-white px-5 py-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 shadow-sm shadow-violet-500/20 inline-flex items-center gap-1.5 transition-all group-hover:scale-[1.02]"
                    >
                      <span>Canlı Projeyi Gez</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Authenticity & Transparency Note */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-dark-850/40 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 flex-shrink-0 mt-0.5 sm:mt-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-slate-300 font-light leading-relaxed">
              <strong className="text-white font-medium">Şeffaflık İlkesi:</strong> Bu portfolyoda hayali şirket veya yapay referanslara yer verilmemektedir. Tamamlanan her gerçek proje, süreci ve sonuçlarıyla zamanla bu alana eklenecektir.
            </p>
          </div>
          <Link
            to="/iletisim"
            className="whitespace-nowrap px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 hover:text-white border border-white/[0.08] transition-colors font-medium text-center self-start sm:self-auto"
          >
            Birlikte Üretelim →
          </Link>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md overflow-y-auto"
        >
          <div className="relative w-full max-w-2xl bg-dark-900 border border-white/[0.1] rounded-3xl p-6 sm:p-10 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Kapat"
              className="absolute top-6 right-6 p-2 rounded-full bg-dark-800 text-slate-300 hover:text-white border border-white/[0.08]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold block mb-2">
              {selectedProject.category} · {selectedProject.year}
            </span>

            <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white mb-4">
              {selectedProject.title}
            </h3>

            {/* Real Website Showcase Image (Modal View) */}
            <div className="mb-6 rounded-2xl overflow-hidden border border-white/[0.08] bg-dark-950 relative shadow-2xl h-56 sm:h-72">
              <img
                src={websitePreview}
                alt="Zeynep Yıldırım Web Sitesi Önizleme"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Reklamsız, Detaylı ve Samimi Proje Tanıtımı */}
            <div className="space-y-6 mb-8 text-left">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold block mb-2">
                  Projenin Amacı & Yaklaşımı
                </span>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  Hazır şablonların ve birbirinin kopyası arayüzlerin ötesine geçerek; bir web sitesinin hem özgün bir tasarım kadar estetik, hem de yaşayan bir dijital vitrin kadar hızlı ve işlevsel olabileceğini göstermek amacıyla sıfırdan inşa edildi.
                </p>
              </div>

              {/* Öne Çıkan Tasarım Ayrıntıları */}
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-3">
                  Öne Çıkan Tasarım Detayları
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-dark-850/80 border border-white/[0.05]">
                    <span className="font-semibold text-white block mb-1">🟣 3D İnteraktif Kimlik</span>
                    <span className="text-slate-400 font-light leading-relaxed">
                      Ziyaretçinin ekranına ve fare hareketlerine yumuşakça tepki veren üç boyutlu yaşayan amblem.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-dark-850/80 border border-white/[0.05]">
                    <span className="font-semibold text-white block mb-1">🟣 Sakin & Derin Renk Dengesi</span>
                    <span className="text-slate-400 font-light leading-relaxed">
                      Obsidyen siyahı ve elektrik morunun uyumuyla gözü yormayan, modern ve prestijli görsel dil.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-dark-850/80 border border-white/[0.05]">
                    <span className="font-semibold text-white block mb-1">🟣 Kusursuz Mobil Deneyim</span>
                    <span className="text-slate-400 font-light leading-relaxed">
                      Masaüstünden akıllı telefonlara kadar tüm ekranlarda hiçbir bozulma yaşamayan esnek mizanpaj.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-dark-850/80 border border-white/[0.05]">
                    <span className="font-semibold text-white block mb-1">🟣 Doğrudan İletişim Akışı</span>
                    <span className="text-slate-400 font-light leading-relaxed">
                      Kaybolan formlar yerine, tek tıkla e-postaya veya sosyal medya hesaplarına bağlanan net yapı.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-dark-850 border border-white/[0.06] text-xs">
                <span className="text-slate-400 block mb-1 font-mono">Kapsam & Mimari</span>
                <span className="text-slate-200 font-medium leading-relaxed block">
                  Sıfırdan Özel Tasarım, İnteraktif Arayüz Geliştirme ve Kişisel Marka Mimarisi.
                </span>
              </div>
            </div>

            {/* Modal Butonları */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.08] flex-wrap">
              <Link
                to="/"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 text-white inline-flex items-center gap-1.5 shadow-md shadow-violet-500/20"
              >
                <span>Canlı Projeyi Gez</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-dark-800"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};