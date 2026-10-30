import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface NavItem {
  label: string;
  href: string;
  type?: 'primary' | 'accent' | 'default';
}

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavItem[] = [
    { label: 'Ana Sayfa', href: '/', type: 'accent' },
    { label: 'Hakkımda', href: '/hakkimda', type: 'default' },
    { label: 'Projeler', href: '/projeler', type: 'default' },
    { label: 'Hizmetler', href: '/hizmetler', type: 'default' },
    { label: 'İletişim', href: '/iletisim', type: 'accent' },
  ];

  const isCurrentActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/[0.08] py-3.5 shadow-sm dark:shadow-2xl'
          : 'bg-white/75 dark:bg-black/75 backdrop-blur-md border-b border-slate-200/60 dark:border-white/[0.05] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Z+Y Emblem */}
        <Link to="/" className="focus-visible:ring-2 focus-visible:ring-violet-400 rounded-lg outline-none">
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/90 dark:bg-dark-900/90 border border-slate-200/90 dark:border-white/[0.08] px-3 py-1.5 rounded-full shadow-inner">
          {navLinks.map((link) => {
            const active = isCurrentActive(link.href);

            if (link.type === 'accent') {
              // Ana Sayfa ve İletişim: Elektrik Moru Işıltılı ve Belirgin Tasarım
              return (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-violet-400 outline-none ${
                    active
                      ? 'text-white bg-violet-600/40 border border-violet-400 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                      : 'text-violet-200 hover:text-white bg-violet-600/20 hover:bg-violet-600/35 border border-violet-500/40 hover:border-violet-400 shadow-[0_0_14px_rgba(168,85,247,0.3)]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#C084FC] ${active ? 'scale-125 animate-ping' : 'animate-pulse'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            }

            // Standart Sekmeler (Hakkımda, Projeler, Hizmetler, Düşünceler)
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`px-3.5 py-1.5 text-xs transition-colors duration-200 rounded-full focus-visible:ring-2 focus-visible:ring-violet-400 outline-none flex items-center gap-1.5 ${
                  active
                    ? 'text-white font-semibold bg-white/[0.09] shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.05] font-medium'
                }`}
              >
                {active && <span className="w-1 h-1 rounded-full bg-violet-400 shadow-[0_0_6px_#C084FC]" />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <Link
            to="/iletisim"
            className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold px-4.5 py-2 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600 text-white hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-md shadow-violet-500/20 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-violet-400 outline-none"
          >
            <span>Görüşme Planlayalım</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Menüyü Kapat' : 'Menüyü Aç'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-dark-850 border border-white/[0.08] focus-visible:ring-2 focus-visible:ring-violet-400 outline-none"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 dark:bg-dark-950/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const active = isCurrentActive(link.href);

              if (link.type === 'accent') {
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 text-sm font-semibold rounded-xl flex items-center justify-between shadow-[0_0_12px_rgba(168,85,247,0.2)] ${
                      active
                        ? 'text-white bg-violet-600/35 border border-violet-400'
                        : 'text-violet-200 bg-violet-600/20 border border-violet-500/30'
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_#C084FC] animate-pulse" />
                  </Link>
                );
              }

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-2.5 text-sm rounded-lg transition-colors flex items-center justify-between ${
                    active
                      ? 'text-white font-semibold bg-white/[0.08]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04] font-medium'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 border-t border-white/[0.06]">
            <Link
              to="/iletisim"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 w-full text-center text-xs font-semibold py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white"
            >
              <span>Teklif Al & İletişim</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
