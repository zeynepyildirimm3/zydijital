import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle2, Clock, ArrowUpRight, Sparkles } from 'lucide-react';

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { services } = usePortfolio();
  return (
    <section id="hizmetler" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold">
            Çözümler & Danışmanlık
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white mt-2">
            İşinizi Büyüten Rafine Hizmet Paketleri
          </h2>
          <p className="text-sm text-slate-300 font-light mt-3">
            Karmaşık süreçler yerine doğrudan genç ve dinamik bir yaklaşımla, şeffaf ve çevik teslimat.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-8 rounded-3xl bg-dark-900/60 border flex flex-col justify-between transition-all duration-300 relative ${
                service.badge
                  ? 'border-violet-500/40 shadow-xl shadow-violet-500/10'
                  : 'border-white/[0.08] hover:border-violet-500/30'
              }`}
            >
              {service.badge && (
                <div className="absolute -top-3 right-8 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-md shadow-violet-500/20">
                  <Sparkles className="w-3 h-3" />
                  <span>{service.badge}</span>
                </div>
              )}

              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-400 mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{service.timeline}</span>
                </div>

                <h3 className="text-2xl font-editorial font-bold text-white mb-2">
                  {service.title}
                </h3>

                <p className="text-xs font-mono text-slate-400 mb-4">
                  {service.tagline}
                </p>

                <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="space-y-2.5 mb-8 pt-4 border-t border-white/[0.06]">
                  <span className="text-xs font-mono text-slate-400 block mb-3">Teslim Edilecekler:</span>
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="#iletisim"
                onClick={() => onSelectService?.(service.title)}
                className={`w-full py-3 rounded-full text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                  service.badge
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 text-white shadow-md shadow-violet-500/20'
                    : 'bg-dark-800 hover:bg-dark-750 text-slate-200 hover:text-white border border-white/[0.08] hover:border-violet-400/40'
                }`}
              >
                <span>Bu Hizmet İçin Teklif Al</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
