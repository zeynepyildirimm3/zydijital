import React from 'react';
import { Logo } from './Logo';
import { usePortfolio } from '../context/PortfolioContext';
import { Github, Linkedin, Instagram, ArrowUp, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { personalInfo } = usePortfolio();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200/70 dark:border-white/[0.06] bg-white/75 dark:bg-black/75 backdrop-blur-md py-16 relative transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-slate-200/70 dark:border-white/[0.06]">
          {/* Logo with Z+Y Emblem */}
          <Logo size="md" />

          {/* Social Links: Instagram, TikTok, Twitter/X, LinkedIn, GitHub */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profili"
              className="p-2.5 rounded-full bg-white dark:bg-dark-900 border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-violet-500/40 transition-all shadow-sm"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Profili"
              className="p-2.5 rounded-full bg-white dark:bg-dark-900 border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-violet-500/40 transition-all flex items-center justify-center shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
              </svg>
            </a>
            <a
              href={personalInfo.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profili"
              className="p-2.5 rounded-full bg-white dark:bg-dark-900 border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-violet-500/40 transition-all flex items-center justify-center shadow-sm"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profili"
              className="p-2.5 rounded-full bg-white dark:bg-dark-900 border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-violet-500/40 transition-all shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profili"
              className="p-2.5 rounded-full bg-white dark:bg-dark-900 border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-violet-500/40 transition-all shadow-sm"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Sayfanın Başına Dön"
              className="ml-4 p-2.5 rounded-full bg-white dark:bg-dark-850 border border-slate-200/80 dark:border-white/[0.08] text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors shadow-sm"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Credits, Legal & Intro Replay */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <p>© 2026 Zeynep Yıldırım. Tüm hakları saklıdır.</p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('zy-play-intro'))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-950/60 hover:bg-violet-900/60 border border-violet-500/30 text-violet-300 hover:text-white transition-all text-xs"
            title="Giriş introyu baştan oynat"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Sinematik İntroyu Oynat</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
