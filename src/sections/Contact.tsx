import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Copy, Check, Send, ArrowUpRight } from 'lucide-react';

interface ContactProps {
  selectedService?: string;
}

export const Contact: React.FC<ContactProps> = ({ selectedService }) => {
  const { personalInfo, addContactMessage } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    service: selectedService || 'Özel Tasarım Web Siteleri',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to Admin Panel Messages
    addContactMessage({
      name: formState.name,
      email: formState.email,
      phone: formState.phone,
      service: formState.service,
      message: formState.message,
    });

    const subject = encodeURIComponent(`Yeni Proje Talebi: ${formState.service} - ${formState.name}`);
    const body = encodeURIComponent(
      `Merhaba Zeynep,\n\nBenim adım: ${formState.name}\nE-posta adresim: ${formState.email}\nTelefon numaram: ${formState.phone || 'Belirtilmedi'}\nİlgilendiğim konu: ${formState.service}\n\nProje Detayı:\n${formState.message}\n`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        name: '',
        email: '',
        phone: '',
        service: 'Özel Tasarım Web Siteleri',
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="iletisim" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold">
            İletişim & Randevu
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white mt-2 leading-tight">
            Yeni Bir Başlangıç İçin Tanışalım.
          </h2>
          <p className="text-sm text-slate-300 font-light mt-3 leading-relaxed">
            Aklınızdaki fikri, hedeflerinizi veya marka vizyonunuzu konuşmak için doğrudan bir mesaj bırakın. En geç 24 saat içinde dönüş yapıyorum.
          </p>
        </div>

        {/* 1. TOP: Proje Detaylarını İletin (Form) */}
        <div className="p-8 sm:p-10 rounded-3xl bg-dark-900/75 border border-white/[0.08] shadow-2xl relative mb-8">
          <h3 className="text-xl font-editorial font-bold text-white mb-6">
            Proje Detaylarını İletin
          </h3>

          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white">
                Mesajınız Başarıyla İletildi!
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Talebinizi aldım. Proje detaylarınızı inceledikten sonra 24 saat içinde sizinle iletişime geçeceğim.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-2">
                    Adınız / Şirketiniz *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Örn: Ayşe Yılmaz"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-400/70 focus:ring-1 focus:ring-violet-400/70 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-2">
                    E-Posta Adresiniz *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    spellCheck={false}
                    placeholder="adiniz@sirket.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-400/70 focus:ring-1 focus:ring-violet-400/70 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="service" className="block text-xs font-mono text-slate-300 mb-2">
                    İlgilendiğiniz Konu
                  </label>
                  <select
                    id="service"
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-slate-200 focus:outline-none focus:border-violet-400/70 focus:ring-1 focus:ring-violet-400/70 transition-colors"
                  >
                    <option value="Özel Tasarım Web Siteleri">Özel Tasarım Web Siteleri</option>
                    <option value="Web & Tasarım Danışmanlığı">Web & Tasarım Danışmanlığı</option>
                    <option value="Sosyal Medya Danışmanlığı">Sosyal Medya Danışmanlığı</option>
                    <option value="Eğitim & Mentorluk (Yazılım, AI, Python, Girişimcilik)">Eğitim & Mentorluk (Yazılım, AI, Python, Girişimcilik)</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-mono text-slate-300 mb-2">
                    Telefon Numaranız
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-400/70 focus:ring-1 focus:ring-violet-400/70 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-2">
                  Proje Hedefiniz & Zaman Planı *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Projenizin kapsamından, hedeflerinizden ve tahmini bütçe/zaman planınızdan kısaca bahsedin…"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-violet-400/70 focus:ring-1 focus:ring-violet-400/70 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600 hover:brightness-110 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-violet-500/25 active:scale-[0.98]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Teklif Talebini Gönder</span>
              </button>
            </form>
          )}
        </div>

        {/* 2. BOTTOM: Doğrudan İletişime Geçin & Tıklanabilir E-Posta Kutusu */}
        <div className="max-w-lg mx-auto pt-2">
          <div className="mb-4 text-center">
            <h4 className="text-xl sm:text-2xl font-editorial font-bold text-white tracking-tight">
              Doğrudan İletişime Geçin
            </h4>
          </div>

          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}&su=${encodeURIComponent('Proje & İletişim Talebi')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-2xl bg-dark-900/80 border border-white/[0.08] hover:border-violet-500/40 hover:bg-dark-850/80 transition-all duration-300 block group shadow-lg hover:shadow-violet-500/10 cursor-pointer"
            title="Gmail web üzerinden e-posta göndermek için tıklayın"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-violet-400 font-semibold block mb-0.5">
                  E-Posta
                </span>
                <span className="text-sm sm:text-base font-mono font-medium text-white group-hover:text-violet-300 transition-colors block truncate">
                  {personalInfo.email}
                </span>
                <span className="text-[11px] text-slate-400 font-light mt-1 block group-hover:text-slate-300 transition-colors">
                  Tıklayarak doğrudan Gmail üzerinden mail atabilirsiniz →
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCopyEmail();
                  }}
                  aria-label="E-posta adresini kopyala"
                  title="E-posta adresini panoya kopyala"
                  className="p-2 sm:p-2.5 rounded-xl bg-dark-800 text-slate-300 hover:text-white border border-white/[0.08] hover:border-violet-500/40 transition-all active:scale-95 shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400 group-hover:scale-105 group-hover:bg-violet-600/25 transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>

            {copied && (
              <span className="text-[11px] font-mono text-emerald-400 mt-2 block animate-fade-in text-center sm:text-left">
                ✓ E-posta adresi panoya kopyalandı!
              </span>
            )}
          </a>
        </div>
      </div>
    </section>
  );
};