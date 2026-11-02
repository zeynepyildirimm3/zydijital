import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AmbientCanvas } from './components/AmbientCanvas';
import { ScrollToTop } from './components/ScrollToTop';
import { CinematicIntro } from './components/CinematicIntro';

// Dedicated Page Components
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { PortfolioProvider } from './context/PortfolioContext';

// Dynamic Browser Tab Title Manager
const PageTitleWatcher: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'Zeynep Yıldırım | Web Geliştirme, Tasarım & Dijital Reklamcılık',
      '/hakkimda': 'Hakkımda | Zeynep Yıldırım',
      '/projeler': 'Seçkin Projeler | Zeynep Yıldırım',
      '/hizmetler': 'Hizmetler & Süreç | Zeynep Yıldırım',
      '/iletisim': 'İletişim & Randevu | Zeynep Yıldırım',
      '/admin': 'Yönetim Paneli | Zeynep Yıldırım',
    };
    document.title = titles[location.pathname] || 'Zeynep Yıldırım | Web Geliştirme, Tasarım & Dijital Reklamcılık';
  }, [location.pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        {/* Dynamic Browser Tab Title */}
        <PageTitleWatcher />

        {/* Scroll Position Reset on Page Navigation */}
        <ScrollToTop />

        <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col font-sans selection:bg-violet-500/25 selection:text-violet-200 relative">
          {/* Tam Ekran Sinematik ZY Digital İntrosu */}
          <CinematicIntro />

          {/* Sitenin Her Yerinde Sürekli ve Kesintisiz Çalışan Global Parçacık/Aurora Animasyonu */}
          <AmbientCanvas />

          {/* Global Persistent Navbar */}
          <Navbar />

          {/* Dynamic Route Pages */}
          <main className="flex-1 relative z-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hakkimda" element={<AboutPage />} />
              <Route path="/projeler" element={<ProjectsPage />} />
              <Route path="/hizmetler" element={<ServicesPage />} />
              <Route path="/iletisim" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Persistent Footer */}
          <Footer />
        </div>
      </BrowserRouter>
    </PortfolioProvider>
  );
};

export default App;
