import React, { useState } from 'react';
import { articles } from '../data/content';
import { Article } from '../types';
import { BookOpen, Clock, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Blog: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="dusunceler" className="py-16 sm:py-24 relative bg-dark-900/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold">
            Fikirler & Gözlemler
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white mt-2">
            Tasarım ve Teknoloji Notları
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light mt-3 leading-relaxed">
            Kalıp şablonların ötesine geçmek, kullanıcı psikolojisi ve yazılıma doğru adımlarla başlamak üzerine kısa, pratik notlar.
          </p>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group p-7 rounded-3xl bg-dark-850/70 border border-white/[0.07] hover:border-violet-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-violet-500/5"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 font-medium text-[11px]">
                    {art.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-editorial font-bold text-white group-hover:text-violet-300 transition-colors mb-3 leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-300 font-light leading-relaxed mb-6">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
                <span>{art.date}</span>
                <span className="font-semibold text-violet-400 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Yazıyı Oku <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md"
        >
          <div className="relative w-full max-w-2xl bg-dark-900 border border-white/[0.1] rounded-3xl p-6 sm:p-10 shadow-2xl max-h-[85vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              aria-label="Kapat"
              className="absolute top-6 right-6 p-2 rounded-full bg-dark-800 text-slate-300 hover:text-white border border-white/[0.08]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-violet-400 mb-3">
              <BookOpen className="w-4 h-4" />
              <span>{selectedArticle.tag} · {selectedArticle.readTime}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-editorial font-bold text-white mb-6 leading-snug">
              {selectedArticle.title}
            </h3>

            {/* Excerpt Box */}
            <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/20 text-violet-200 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              {selectedArticle.excerpt}
            </div>

            {/* Real Paragraphs */}
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
              {selectedArticle.paragraphs?.map((p, idx) => (
                <p
                  key={idx}
                  className={
                    p.startsWith('1.') || p.startsWith('2.') || p.startsWith('3.') || p.startsWith('4.')
                      ? 'pl-3.5 border-l-2 border-violet-500/50 text-slate-200 font-normal my-2'
                      : ''
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-6 mt-8 border-t border-white/[0.08] flex items-center justify-between gap-3 flex-wrap">
              <Link
                to="/iletisim"
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-semibold text-violet-300 hover:text-white inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Bu Konuda Fikir Almak İster misiniz? →</span>
              </Link>

              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-dark-800 hover:bg-dark-750 text-slate-200 border border-white/[0.08] transition-colors"
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