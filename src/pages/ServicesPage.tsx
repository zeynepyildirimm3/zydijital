import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { CheckCircle2, Clock, ArrowRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const { services } = usePortfolio();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const processSteps = [
    {
      step: '01',
      title: 'Keşif & Problem Tespiti',
      desc: 'İş hedeflerinizi, kullanıcı profillerini ve sektördeki rekabet haritasını analiz ederek doğru tasarım stratejisini belirliyoruz.',
    },
    {
      step: '02',
      title: 'Mimari & Wireframe',
      desc: 'Gereksiz karmaşayı eleyerek bilgi mimarisini, kullanıcı akışlarını ve sayfa iskeletlerini oluşturuyoruz.',
    },
    {
      step: '03',
      title: 'Rafine Tasarım & Prototipleme',
      desc: 'Tipografi, renk token’ları, mikro-etkileşimler ve yüksek sadakatli (Hi-Fi) interaktif prototipleri inşa ediyoruz.',
    },
    {
      step: '04',
      title: 'Modern Kodlama & Canlıya Alma',
      desc: 'React, Vite ve Tailwind ile saniyeler altında açılan, 60 FPS akıcı ve SEO uyumlu son ürünü teslim ediyoruz.',
    },
  ];

  const faqs = [
    {
      q: 'Bir web sitesi projesinin ortalama teslim süresi ne kadardır?',
      a: 'Kapsamına göre değişmekle birlikte; tek sayfalık bir açılış sayfası 5-7 gün, çok sayfalı ve kapsamlı özel bir web sitesi ise 1-2 hafta içinde anahtar teslim tamamlanır.',
    },
    {
      q: 'Web & Tasarım Danışmanlığı oturumu nasıl gerçekleşiyor?',
      a: 'Görüşme öncesinde web sitenizi ya da proje fikirlerinizi detaylıca inceliyorum. Bire bir online görüşmemizde tasarım eksiklerini, kullanıcı deneyimi hatalarını ve en doğru teknoloji seçimlerini içeren net bir aksiyon planı sunuyorum.',
    },
    {
      q: 'Sosyal Medya Danışmanlığı oturumlarında neler yapıyoruz?',
      a: 'Profilinizin vitrin estetiğini (biyografi, öne çıkanlar, renk ve görsel uyumu) baştan sona yeniliyor, hedef kitlenize uygun içerik ve video formatlarını belirliyor, organik büyümenizi hızlandıracak net ve sürdürülebilir bir strateji çıkarıyoruz.',
    },
    {
      q: 'Eğitim & Mentorluk oturumlarında hangi konuları işliyoruz?',
      a: 'Hedeflerinize göre şekillenen 4 temel başlıkta bire bir ilerliyoruz: 1) Yazılıma Nereden Başlamalıyım? yol haritası, 2) Modern Yapay Zeka (AI) araçlarını üretkenlik ve kodlamada etkin kullanma, 3) Temel Python ile kodlama mantığı ve ilk projeler, 4) Genç girişimcilik ve fikirleri dijital ürüne dönüştürme.',
    },
    {
      q: 'Ödeme ve seans takvimi nasıl belirleniyor?',
      a: 'Web projelerinde süreç başlangıç (%50) ve teslim (%50) olarak ilerler. Danışmanlık ve mentorluk görüşmelerinde ise seans başı ya da esnek haftalık paketlerle çalışıyoruz.',
    },
  ];

  const handleSelectService = (serviceTitle: string) => {
    navigate(`/iletisim?service=${encodeURIComponent(serviceTitle)}`);
  };

  return (
    <div className="pt-24 pb-20">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mb-16 text-center">
        <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold">
          Hizmetler & İş Birliği
        </span>
        <h1 className="text-4xl sm:text-6xl font-editorial font-bold text-white tracking-tight mt-3 mb-6">
          Üretim, Danışmanlık ve Mentorluk
        </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Sıfırdan özel web siteleri üretimi, stratejik web ve sosyal medya danışmanlığı veya yazılım, yapay zeka, Python ve girişimcilik için bire bir kişiselleştirilmiş mentorluk.
        </p>
      </div>

      {/* Services Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className={`p-8 rounded-3xl bg-dark-900/70 border flex flex-col justify-between transition-all duration-300 relative ${
                service.badge
                  ? 'border-violet-500/50 shadow-2xl shadow-violet-500/15'
                  : 'border-white/[0.08] hover:border-violet-500/30'
              }`}
            >
              {service.badge && (
                <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-lg shadow-violet-500/30">
                  <Sparkles className="w-3 h-3" />
                  <span>{service.badge}</span>
                </div>
              )}

              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-violet-400 mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{service.timeline}</span>
                </div>

                <h2 className="text-2xl font-editorial font-bold text-white mb-2">
                  {service.title}
                </h2>

                <p className="text-xs font-mono text-slate-400 mb-4">
                  {service.tagline}
                </p>

                <p className="text-sm text-slate-300 font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 pt-6 border-t border-white/[0.06] mb-8">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-3">
                    Teslim Edilecekler:
                  </span>
                  {service.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleSelectService(service.title)}
                className={`w-full py-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  service.badge
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:brightness-110 shadow-lg shadow-violet-500/20'
                    : 'bg-dark-850 hover:bg-dark-800 text-slate-200 hover:text-white border border-white/[0.08]'
                }`}
              >
                <span>Bu Hizmet İçin Teklif Al</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="py-20 bg-dark-900/40 border-y border-white/[0.05] mb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold">
              Metodoloji
            </span>
            <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white mt-2">
              4 Adımlı Çevik Çalışma Süreci
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-3xl bg-dark-850/60 border border-white/[0.06] hover:border-violet-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-serif font-bold text-violet-400 block mb-4">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-editorial font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold">
            Merak Edilenler
          </span>
          <h2 className="text-3xl font-editorial font-bold text-white mt-2">
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-dark-850/80 border border-white/[0.06] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-sm sm:text-base font-semibold text-white hover:text-violet-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-violet-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-white/[0.04] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
