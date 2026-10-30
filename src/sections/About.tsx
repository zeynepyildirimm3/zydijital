import React from 'react';
import { Cpu, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const capabilities = [
    'Özgün Web Tasarımı',
    'Modern Arayüz (UI/UX)',
    'Sosyal Medya Danışmanlığı',
    'Mobil & Ekran Uyumu',
    'Etkin Yapay Zeka (AI)',
    'Temel Python',
    'Hızlı & Hafif Mimari',
    'Yazılıma Başlangıç Rehberliği',
    'Bire Bir Mentorluk',
  ];

  const focusPoints = [
    {
      title: 'Bire Bir Doğrudan İletişim',
      desc: 'Aracılar veya kurumsal bariyerler yok; fikirlerinizi doğrudan dinleyen, tasarımı yapan ve kodu bizzat yazan kişiyle çalışırsınız.',
    },
    {
      title: 'Kişisel Vitrin Titizliği',
      desc: 'Her projeye büyük bir özenle yaklaşıyorum; ortaya çıkan iş benim için gururla sergileyeceğim bir vitrin niteliğindedir.',
    },
    {
      title: 'Hızlı & Çevik Süreç',
      desc: 'Haftalar süren hantal toplantılar yerine; modern geliştirme araçlarıyla saniyeler içinde açılan canlı çözümler üretiyorum.',
    },
  ];

  return (
    <section id="hakkimda" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-editorial font-bold text-white tracking-tight leading-tight">
            Genç Vizyon, Modern Dokunuş
          </h2>
        </div>

        {/* 1. ÜÇ ANA TEMEL SÜTUN (Ben Kimim?, Neler Yapıyorum?, Hedefim Ne?) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10">
          {/* Ben Kimim? */}
          <div className="p-8 sm:p-9 rounded-3xl bg-dark-900/70 border border-white/[0.08] hover:border-violet-500/40 transition-all flex flex-col justify-between shadow-xl relative group">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                <h3 className="text-xl sm:text-2xl font-editorial font-bold text-white tracking-tight">
                  Ben Kimim?
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                Ben Zeynep; web geliştirici ve arayüz tasarımcısıyım. Ezbere kalıpların ötesine geçerek; markaların ruhunu yansıtan estetik, hızlı ve yaşayan modern dijital dokunuşlar kazandırmaya odaklanıyorum.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-violet-400">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>Geliştirici & Tasarımcı</span>
            </div>
          </div>

          {/* Neler Yapıyorum? */}
          <div className="p-8 sm:p-9 rounded-3xl bg-dark-900/70 border border-white/[0.08] hover:border-violet-500/40 transition-all flex flex-col justify-between shadow-xl relative group">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <h3 className="text-xl sm:text-2xl font-editorial font-bold text-white tracking-tight">
                  Neler Yapıyorum?
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                Sıfırdan özel tasarım web siteleri inşa ediyor, dijital kimlik ve sosyal medya danışmanlığı sunuyor; aynı zamanda yazılım, yapay zeka ve Python öğrenmek isteyenlere bire bir mentorluk veriyorum.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-violet-400">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>Web, Sosyal Medya & Mentorluk</span>
            </div>
          </div>

          {/* Hedefim Ne? */}
          <div className="p-8 sm:p-9 rounded-3xl bg-dark-900/70 border border-white/[0.08] hover:border-violet-500/40 transition-all flex flex-col justify-between shadow-xl relative group">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                <h3 className="text-xl sm:text-2xl font-editorial font-bold text-white tracking-tight">
                  Hedefim Ne?
                </h3>
              </div>
              <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
                Her markanın ve projenin kendine has bir karakteri olduğuna inanıyorum. Hedefim; bu kimliği en doğru şekilde yansıtan, modern, hızlı, kullanıcıda güven ve hayranlık uyandıran özgün dijital vitrinler inşa etmek.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-violet-400">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span>Özgün & Yaşayan Vitrinler</span>
            </div>
          </div>
        </div>

        {/* 2. GENİŞLETİLMİŞ BENTO İKİLİSİ (Çalışma Yaklaşımı & Yetkinlikler) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Sol Kanat: Çalışma İlkeleri ve Yaklaşım (2 Sütun) */}
          <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl bg-dark-900/60 border border-white/[0.08] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-violet-400 mb-4">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-mono uppercase tracking-[0.2em] font-semibold">
                  Çalışma Anlayışı & Ortaklık
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white mb-6">
                Her Projede Doğrudan, Şeffaf ve Bire Bir Yol Arkadaşlığı
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {focusPoints.map((point, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-dark-850/60 border border-white/[0.04] space-y-2">
                    <h4 className="text-sm font-semibold text-slate-100">
                      {point.title}
                    </h4>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
              <span>● Odak: Özel Tasarım Web Siteleri, Sosyal Medya & Mentorluk</span>
              <span className="text-violet-400 font-semibold">Tüm Cihazlarda %100 Uyum</span>
            </div>
          </div>

          {/* Sağ Kanat: Temel Yetkinlikler & Alet Çantası (1 Sütun) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-dark-900/60 border border-white/[0.08] shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-editorial font-bold text-white mb-2">
                Temel Yetkinlikler
              </h3>
              <p className="text-xs text-slate-400 font-light mb-6">
                Tasarımı, modern kodlamayı, sosyal medyayı ve mentorluğu birleştiren çağdaş yaklaşım.
              </p>

              <div className="flex flex-wrap gap-2">
                {capabilities.map((cap) => (
                  <span
                    key={cap}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono bg-dark-850 border border-white/[0.06] text-slate-200 hover:border-violet-500/40 transition-colors"
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.06]">
              <span className="text-xs font-mono text-violet-400 block">
                ● Her İşe Kendi Vitrinim Gibi %100 Bire Bir Özen
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
