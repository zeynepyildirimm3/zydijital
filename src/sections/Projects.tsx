import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Project } from '../types';
import { ArrowRight, Sparkles, X, Smartphone, Tablet, Monitor, RotateCcw } from 'lucide-react';
import websitePreview from '../assets/website-preview.png';

export const Projects: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [livePreviewProject, setLivePreviewProject] = useState<Project | null>(null);
  const [deviceView, setDeviceView] = useState<'mobile' | 'tablet' | 'desktop'>('mobile');
  const [iframeKey, setIframeKey] = useState<number>(0);

  const handleOpenLive = (project: Project) => {
    // Online menü mobil öncelikli olduğu için mobilde başlasın
    setDeviceView(project.id === 'zy-online-menu' ? 'mobile' : 'desktop');
    setLivePreviewProject(project);
    setSelectedProject(null);
  };

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
                <div 
                  onClick={() => handleOpenLive(project)}
                  className="mb-6 h-56 sm:h-80 rounded-2xl overflow-hidden border border-white/[0.08] bg-dark-950 group-hover:border-violet-500/40 transition-all relative shadow-inner cursor-pointer"
                  title="Projeyi canlı gezmek için tıklayın"
                >
                  <img
                    src={project.image || websitePreview}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-dark-900/80 backdrop-blur-md border border-white/[0.1] text-xs font-mono text-white inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span>Canlı Gez</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-editorial font-bold text-white group-hover:text-violet-300 transition-colors mb-3">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Technologies pills */}
                {project.technologies && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {/* Action Buttons (Proje Detayları & Canlı Projeyi Gez) */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-medium text-slate-300 hover:text-white px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all cursor-pointer"
                  >
                    Proje Detayları
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenLive(project)}
                    className="text-xs font-semibold text-white px-5 py-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 shadow-sm shadow-violet-500/20 inline-flex items-center gap-1.5 transition-all group-hover:scale-[1.02] cursor-pointer"
                  >
                    <span>Canlı Projeyi Gez</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
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

      {/* 1. INTERACTIVE LIVE PROJECT VIEWER (Aynı Sekmede Canlı Gezinme) */}
      {livePreviewProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-dark-950/95 backdrop-blur-xl animate-in fade-in duration-200"
        >
          {/* Top Control Bar */}
          <header className="h-16 px-4 sm:px-6 border-b border-white/[0.08] bg-dark-900/90 flex items-center justify-between gap-4 flex-shrink-0">
            {/* Project Title & Badge */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">
                  {livePreviewProject.title}
                </h3>
                <span className="text-[11px] font-mono text-violet-400 block truncate">
                  Canlı Etkileşimli Önizleme · Aynı Sekmede Gezinme
                </span>
              </div>
            </div>

            {/* Device Switcher (Telefon / Tablet / Geniş Ekran) */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-dark-850 border border-white/[0.08]">
              <button
                type="button"
                onClick={() => setDeviceView('mobile')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono inline-flex items-center gap-1.5 transition-all ${
                  deviceView === 'mobile'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Mobil Telefon Görünümü"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobil</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('tablet')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono inline-flex items-center gap-1.5 transition-all ${
                  deviceView === 'tablet'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Tablet Görünümü"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceView('desktop')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono inline-flex items-center gap-1.5 transition-all ${
                  deviceView === 'desktop'
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Geniş Ekran Görünümü"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Geniş Ekran</span>
              </button>
            </div>

            {/* Right Action: Yenile + Kapat Butonu */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIframeKey((prev) => prev + 1)}
                aria-label="Yeniden Yükle"
                className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white border border-white/[0.08] transition-all"
                title="Demoyu Yeniden Yükle"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setLivePreviewProject(null)}
                aria-label="Kapat ve Projelere Dön"
                className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-200 hover:text-white border border-white/[0.08] text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
              >
                <X className="w-4 h-4" />
                <span>Kapat</span>
              </button>
            </div>
          </header>

          {/* Interactive Live Screen Container */}
          <div className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-6 bg-dark-950/60">
            <div
              className={`transition-all duration-300 relative bg-dark-900 overflow-hidden shadow-2xl flex flex-col ${
                deviceView === 'mobile'
                  ? 'w-[390px] h-[780px] max-h-[85vh] rounded-[44px] border-[10px] border-dark-800 shadow-[0_0_50px_rgba(168,85,247,0.15)] ring-1 ring-white/10'
                  : deviceView === 'tablet'
                  ? 'w-[768px] h-[85vh] rounded-[32px] border-[10px] border-dark-800 shadow-[0_0_50px_rgba(168,85,247,0.15)] ring-1 ring-white/10'
                  : 'w-full h-full rounded-2xl border border-white/[0.08]'
              }`}
            >
              {/* iPhone Mockup Dynamic Island / Speaker notch for mobile view */}
              {deviceView === 'mobile' && (
                <div className="h-6 bg-dark-800 flex items-center justify-center flex-shrink-0">
                  <div className="w-24 h-3.5 bg-dark-950 rounded-full" />
                </div>
              )}

              {/* Live Iframe */}
              <iframe
                key={iframeKey}
                src={livePreviewProject.link || '/'}
                title={livePreviewProject.title}
                className="w-full flex-1 border-0 bg-dark-950"
                allow="camera; microphone; geolocation"
              />
            </div>
          </div>
        </div>
      )}

      {/* 2. PROJECT DETAIL MODAL (Metin & Vaka Analizi Görünümü) */}
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

            {/* Showcase Image */}
            <div className="mb-6 rounded-2xl overflow-hidden border border-white/[0.08] bg-dark-950 relative shadow-2xl h-56 sm:h-72">
              <img
                src={selectedProject.image || websitePreview}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="space-y-6 mb-8 text-left">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-violet-400 font-semibold block mb-2">
                  Projenin Amacı & Yaklaşımı
                </span>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                  {selectedProject.summary}
                </p>
              </div>

              {selectedProject.technologies && (
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-3">
                    Kullanılan Teknolojiler
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="p-2.5 rounded-xl bg-dark-850/80 border border-white/[0.05] text-xs text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Butonları */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.08] flex-wrap">
              <button
                type="button"
                onClick={() => handleOpenLive(selectedProject)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 text-white inline-flex items-center gap-1.5 shadow-md shadow-violet-500/20 cursor-pointer"
              >
                <span>Canlı Projeyi Gez</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

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