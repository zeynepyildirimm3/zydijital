import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, Service } from '../types';
import {
  Lock,
  LogOut,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Check,
  Download,
  Upload,
  Shield,
  Eye,
  EyeOff,
  LayoutDashboard,
  FolderGit2,
  Briefcase,
  UserCheck,
  Mail,
  Settings,
  Sparkles,
  Clock,
  Send,
  X,
  FileCheck,
  AlertTriangle,
} from 'lucide-react';

const ADMIN_PASSWORD_KEY = 'zy_admin_password_v2';
const ADMIN_AUTH_KEY = 'zy_admin_authenticated';
const DEFAULT_PASSWORD = '3636zeynep';

type TabType = 'overview' | 'projects' | 'services' | 'profile' | 'messages' | 'settings';

export const AdminPage: React.FC = () => {
  const {
    personalInfo,
    projects,
    services,
    messages,
    updatePersonalInfo,
    addProject,
    updateProject,
    deleteProject,
    addService,
    updateService,
    deleteService,
    deleteContactMessage,
    resetToDefaults,
    exportData,
    importData,
  } = usePortfolio();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Özel Web Sitesi',
    summary: '',
    year: '2026',
    client: '',
    metrics: '%100 Özel Tasarım & Mobil Uyum',
    technologies: 'Özgün Arayüz, 3D Amblem, Mikro Etkileşimler',
    link: '',
    image: '',
    featured: true,
  });

  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    tagline: '',
    description: '',
    timeline: '1 - 2 Hafta',
    badge: '',
    deliverables: '',
  });

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: personalInfo.name,
    title: personalInfo.title,
    tagline: personalInfo.tagline,
    bio: personalInfo.bio,
    location: personalInfo.location,
    email: personalInfo.email,
    status: personalInfo.status,
    instagram: personalInfo.social.instagram,
    tiktok: personalInfo.social.tiktok,
    twitter: personalInfo.social.twitter,
    linkedin: personalInfo.social.linkedin,
    github: personalInfo.social.github,
  });

  // Password Change State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passChangeSuccess, setPassChangeSuccess] = useState(false);
  const [passChangeError, setPassChangeError] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (passwordInput === storedPassword) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      setIsAuthenticated(true);
      setLoginError('');
      triggerToast('Giriş başarılı! Yönetim paneline hoş geldiniz.');
    } else {
      setLoginError('Hatalı şifre girdiniz. Lütfen tekrar deneyin.');
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Password Change handler
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
    if (currentPass !== storedPassword) {
      setPassChangeError('Mevcut şifreniz hatalı.');
      return;
    }
    if (newPass.length < 4) {
      setPassChangeError('Yeni şifre en az 4 karakter olmalıdır.');
      return;
    }
    localStorage.setItem(ADMIN_PASSWORD_KEY, newPass);
    setPassChangeSuccess(true);
    setPassChangeError('');
    setCurrentPass('');
    setNewPass('');
    triggerToast('Yönetici şifreniz başarıyla güncellendi.');
    setTimeout(() => setPassChangeSuccess(false), 3000);
  };

  // Project Modal Openers
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      category: 'Özel Web Sitesi',
      summary: '',
      year: new Date().getFullYear().toString(),
      client: '',
      metrics: '%100 Özel Tasarım & Mobil Uyum',
      technologies: 'React, Tailwind CSS, TypeScript',
      link: '',
      image: '',
      featured: true,
    });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: Project) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      summary: proj.summary,
      year: proj.year,
      client: proj.client,
      metrics: proj.metrics,
      technologies: proj.technologies.join(', '),
      link: proj.link || '',
      image: proj.image || '',
      featured: !!proj.featured,
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = projectForm.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const projectData = {
      title: projectForm.title,
      category: projectForm.category,
      summary: projectForm.summary,
      year: projectForm.year,
      client: projectForm.client || personalInfo.name,
      metrics: projectForm.metrics,
      technologies: techArray.length ? techArray : ['Web Geliştirme'],
      link: projectForm.link || undefined,
      image: projectForm.image || undefined,
      featured: projectForm.featured,
    };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
      triggerToast('Proje başarıyla güncellendi.');
    } else {
      addProject(projectData);
      triggerToast('Yeni proje portfolyoya eklendi.');
    }
    setProjectModalOpen(false);
  };

  // Service Modal Openers
  const openNewServiceModal = () => {
    setEditingService(null);
    setServiceForm({
      title: '',
      tagline: '',
      description: '',
      timeline: '1 - 2 Hafta',
      badge: '',
      deliverables: 'Özgün Arayüz Tasarımı\nMobil Uyum\nHızlı ve Güvenli Altyapı',
    });
    setServiceModalOpen(true);
  };

  const openEditServiceModal = (srv: Service) => {
    setEditingService(srv);
    setServiceForm({
      title: srv.title,
      tagline: srv.tagline,
      description: srv.description,
      timeline: srv.timeline,
      badge: srv.badge || '',
      deliverables: srv.deliverables.join('\n'),
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const deliverablesArray = serviceForm.deliverables
      .split('\n')
      .map((d) => d.trim())
      .filter(Boolean);

    const serviceData = {
      title: serviceForm.title,
      tagline: serviceForm.tagline,
      description: serviceForm.description,
      timeline: serviceForm.timeline,
      badge: serviceForm.badge || undefined,
      deliverables: deliverablesArray.length ? deliverablesArray : ['Hizmet Teslimatı'],
    };

    if (editingService) {
      updateService(editingService.id, serviceData);
      triggerToast('Hizmet paketi güncellendi.');
    } else {
      addService(serviceData);
      triggerToast('Yeni hizmet paketi eklendi.');
    }
    setServiceModalOpen(false);
  };

  // Profile Save handler
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo({
      name: profileForm.name,
      title: profileForm.title,
      tagline: profileForm.tagline,
      bio: profileForm.bio,
      location: profileForm.location,
      email: profileForm.email,
      status: profileForm.status,
      social: {
        instagram: profileForm.instagram,
        tiktok: profileForm.tiktok,
        twitter: profileForm.twitter,
        linkedin: profileForm.linkedin,
        github: profileForm.github,
      },
    });
    triggerToast('Profil ve iletişim bilgileri kaydedildi!');
  };

  // File Import handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && importData(content)) {
        triggerToast('Yedek başarıyla içe aktarıldı ve site güncellendi!');
      } else {
        alert('Yüklenen dosya geçerli bir portfolyo yedek dosyası değil.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // If NOT authenticated, render the stylish Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center px-4 pt-28 pb-16 relative">
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl bg-dark-900/90 border border-violet-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Subtle Ambient Light */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center mb-8 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/40 text-violet-300 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/10">
              <Shield className="w-7 h-7" />
            </div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-violet-400 font-semibold block mb-1">
              Yönetici Girişi
            </span>
            <h2 className="text-2xl font-editorial font-bold text-white">
              Zeynep Yıldırım Portfolyo
            </h2>
            <p className="text-xs text-slate-400 mt-2 font-light">
              Portfolyo içeriğini, projeleri ve mesajları yönetmek için şifrenizi girin.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                Yönetici Şifresi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Şifrenizi yazın..."
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-dark-850 border border-white/[0.1] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-400 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600 hover:brightness-110 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-lg shadow-violet-500/25 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Panele Giriş Yap</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center space-y-3 relative z-10">
            <Link
              to="/"
              className="text-xs text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>← Sitenin Vitrinine Dön</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="pt-28 sm:pt-32 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-dark-900 border border-violet-500/50 shadow-2xl text-violet-200 text-xs font-mono flex items-center gap-2.5 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
              Yönetici Paneli Aktif
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-white mt-1">
            Zeynep Yıldırım · Portfolyo Yönetimi
          </h1>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            to="/"
            target="_blank"
            className="px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/[0.08] text-xs font-medium inline-flex items-center gap-2 transition-all"
          >
            <span>Canlı Siteyi Aç</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={exportData}
            title="Tüm verilerin yedeğini bilgisayara JSON olarak indir"
            className="px-3.5 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/[0.08] text-xs font-medium inline-flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-violet-400" />
            <span>Yedek Al</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 text-xs font-medium inline-flex items-center gap-1.5 transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/[0.06] scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-medium inline-flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'bg-dark-900/80 text-slate-400 hover:text-white hover:bg-dark-850 border border-white/[0.06]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Genel Bakış</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2.5 rounded-xl text-xs font-medium inline-flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'bg-dark-900/80 text-slate-400 hover:text-white hover:bg-dark-850 border border-white/[0.06]'
          }`}
        >
          <FolderGit2 className="w-4 h-4" />
          <span>Projeler ({projects.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2.5 rounded-xl text-xs font-medium inline-flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'services'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'bg-dark-900/80 text-slate-400 hover:text-white hover:bg-dark-850 border border-white/[0.06]'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Hizmetler ({services.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2.5 rounded-xl text-xs font-medium inline-flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'bg-dark-900/80 text-slate-400 hover:text-white hover:bg-dark-850 border border-white/[0.06]'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Profil & Sosyal Medya</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('messages')}
          className={`px-4 py-2.5 rounded-xl text-xs font-medium inline-flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'messages'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'bg-dark-900/80 text-slate-400 hover:text-white hover:bg-dark-850 border border-white/[0.06]'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Gelen Mesajlar</span>
          {messages.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-fuchsia-500 text-[10px] text-white font-bold">
              {messages.length}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2.5 rounded-xl text-xs font-medium inline-flex items-center gap-2 transition-all whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'bg-dark-900/80 text-slate-400 hover:text-white hover:bg-dark-850 border border-white/[0.06]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Şifre & Yedek</span>
        </button>
      </div>

      {/* TAB 1: GENEL BAKIŞ (OVERVIEW) */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-dark-900/80 border border-white/[0.08] relative overflow-hidden">
              <span className="text-xs font-mono text-violet-400 font-semibold block mb-1">
                Yayınlanan Projeler
              </span>
              <div className="text-3xl font-editorial font-bold text-white">
                {projects.length}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Vitrin sayfasında listelenen aktif çalışma
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-900/80 border border-white/[0.08] relative overflow-hidden">
              <span className="text-xs font-mono text-violet-400 font-semibold block mb-1">
                Aktif Hizmet Paketleri
              </span>
              <div className="text-3xl font-editorial font-bold text-white">
                {services.length}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Ziyaretçilere sunulan danışmanlık ve çözümler
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-900/80 border border-white/[0.08] relative overflow-hidden">
              <span className="text-xs font-mono text-violet-400 font-semibold block mb-1">
                Gelen Mesaj & Teklifler
              </span>
              <div className="text-3xl font-editorial font-bold text-white">
                {messages.length}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                İletişim formundan kaydedilen başvuru
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-900/80 border border-white/[0.08] relative overflow-hidden">
              <span className="text-xs font-mono text-violet-400 font-semibold block mb-1">
                E-Posta Adresi
              </span>
              <div className="text-sm font-mono font-medium text-white truncate mt-2">
                {personalInfo.email}
              </div>
              <p className="text-xs text-emerald-400 mt-2 font-mono">
                ✓ Doğrudan Gmail Web bağlı
              </p>
            </div>
          </div>

          {/* Quick Actions & Recent Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-dark-900/60 border border-white/[0.08]">
              <h3 className="text-lg font-editorial font-bold text-white mb-4">
                Hızlı İşlemler
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('projects');
                    openNewProjectModal();
                  }}
                  className="p-4 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-white/[0.08] hover:border-violet-500/40 text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-white">Yeni Proje Ekle</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Portfolyonuza yeni bir çalışma dahil edin
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('services');
                    openNewServiceModal();
                  }}
                  className="p-4 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-white/[0.08] hover:border-violet-500/40 text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-white">Yeni Hizmet Aç</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Yeni bir danışmanlık veya paket tanımlayın
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className="p-4 rounded-2xl bg-dark-850 hover:bg-dark-800 border border-white/[0.08] hover:border-violet-500/40 text-left transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-white">Profili Düzenle</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Biyografi ve sosyal medya linklerini güncelle
                  </p>
                </button>
              </div>

              {/* Live Preview Information */}
              <div className="mt-6 p-4 rounded-2xl bg-violet-950/20 border border-violet-500/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-violet-400 shrink-0" />
                  <p className="text-xs text-slate-300 font-light">
                    Burada yaptığınız tüm değişiklikler sitenize anında yansır ve tarayıcınızda güvenle saklanır.
                  </p>
                </div>
                <Link
                  to="/"
                  className="shrink-0 text-xs text-violet-300 hover:text-white font-medium underline"
                >
                  Siteyi Kontrol Et →
                </Link>
              </div>
            </div>

            {/* Recent Messages Mini Widget */}
            <div className="p-6 rounded-3xl bg-dark-900/60 border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-editorial font-bold text-white">
                    Son Gelen Formlar
                  </h3>
                  <button
                    type="button"
                    onClick={() => setActiveTab('messages')}
                    className="text-[11px] text-violet-400 hover:underline"
                  >
                    Tümünü Gör ({messages.length})
                  </button>
                </div>

                {messages.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    Henüz yeni bir form mesajı bulunmuyor.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {messages.slice(0, 3).map((m) => (
                      <div
                        key={m.id}
                        className="p-3 rounded-xl bg-dark-850 border border-white/[0.05] text-xs"
                      >
                        <div className="flex items-center justify-between font-medium text-white mb-1">
                          <span className="truncate">{m.name}</span>
                          <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                            {m.date.split(',')[0]}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] line-clamp-1">
                          {m.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/[0.06] mt-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className="w-full py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-xs font-medium text-slate-300 hover:text-white border border-white/[0.08] transition-all flex items-center justify-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Şifre & Güvenlik Ayarları</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PROJELER (PROJECTS) */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
            <div>
              <h2 className="text-xl font-editorial font-bold text-white">
                Portfolyo Projeleri
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Sitenin "Projeler" sayfasında listelenen çalışmalarınızı buradan yönetebilirsiniz.
              </p>
            </div>

            <button
              type="button"
              onClick={openNewProjectModal}
              className="px-4 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 text-white font-medium text-xs inline-flex items-center gap-2 shadow-md shadow-violet-500/20 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Proje Ekle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-3xl bg-dark-900/80 border border-white/[0.08] hover:border-violet-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[11px] font-medium font-mono">
                      {proj.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {proj.year}
                    </span>
                  </div>

                  <h3 className="text-lg font-editorial font-bold text-white mb-2">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-4 line-clamp-3">
                    {proj.summary}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-dark-850 text-slate-400 text-[10px] font-mono border border-white/[0.05]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Müşteri: <strong className="text-slate-200">{proj.client}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditProjectModal(proj)}
                      className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/[0.08] transition-all"
                      title="Projeyi Düzenle"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`"${proj.title}" projesini silmek istediğinize emin misiniz?`)) {
                          deleteProject(proj.id);
                          triggerToast('Proje silindi.');
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 transition-all"
                      title="Projeyi Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: HİZMETLER (SERVICES) */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
            <div>
              <h2 className="text-xl font-editorial font-bold text-white">
                Hizmet & Danışmanlık Paketleri
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Ana sayfada ve "Hizmetler" sayfasında görünen paketlerinizi düzenleyin veya yeni hizmet açın.
              </p>
            </div>

            <button
              type="button"
              onClick={openNewServiceModal}
              className="px-4 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 text-white font-medium text-xs inline-flex items-center gap-2 shadow-md shadow-violet-500/20 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Hizmet Ekle</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-3xl bg-dark-900/80 border border-white/[0.08] hover:border-violet-500/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-violet-400">
                      <Clock className="w-3 h-3" />
                      <span>{srv.timeline}</span>
                    </span>
                    {srv.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30 text-[10px] font-semibold">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-editorial font-bold text-white mb-1">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-3">
                    {srv.tagline}
                  </p>

                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-4 line-clamp-3">
                    {srv.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {srv.deliverables.map((d, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-400">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => openEditServiceModal(srv)}
                    className="p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-white/[0.08] transition-all"
                    title="Hizmeti Düzenle"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`"${srv.title}" hizmetini silmek istediğinize emin misiniz?`)) {
                        deleteService(srv.id);
                        triggerToast('Hizmet silindi.');
                      }
                    }}
                    className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 transition-all"
                    title="Hizmeti Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PROFİL & SOSYAL MEDYA (PROFILE) */}
      {activeTab === 'profile' && (
        <div className="max-w-4xl mx-auto">
          <div className="p-6 sm:p-10 rounded-3xl bg-dark-900/80 border border-white/[0.08]">
            <div className="mb-8 pb-4 border-b border-white/[0.06]">
              <h2 className="text-xl font-editorial font-bold text-white">
                Profil & İletişim Bilgileri
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Sitenin Hero alanında, hakkında sayfasında ve altbilgide görünen bilgilerinizi güncelleyin.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    required
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    E-Posta Adresi
                  </label>
                  <input
                    type="email"
                    required
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Ana Başlık / Unvan
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.title}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Kısa Slogan (Tagline)
                </label>
                <input
                  type="text"
                  required
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  Biyografi Metni
                </label>
                <textarea
                  rows={4}
                  required
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400 transition-colors resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <h3 className="text-sm font-editorial font-bold text-white mb-4">
                  Sosyal Medya Linkleri
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={profileForm.instagram}
                      onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/[0.08] text-xs text-white focus:outline-none focus:border-violet-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      TikTok URL
                    </label>
                    <input
                      type="url"
                      value={profileForm.tiktok}
                      onChange={(e) => setProfileForm({ ...profileForm, tiktok: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/[0.08] text-xs text-white focus:outline-none focus:border-violet-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      X (Twitter) URL
                    </label>
                    <input
                      type="url"
                      value={profileForm.twitter}
                      onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/[0.08] text-xs text-white focus:outline-none focus:border-violet-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/[0.08] text-xs text-white focus:outline-none focus:border-violet-400"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={profileForm.github}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/[0.08] text-xs text-white focus:outline-none focus:border-violet-400"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600 hover:brightness-110 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-violet-500/25 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Değişiklikleri Kaydet</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: GELEN MESAJLAR (MESSAGES) */}
      {activeTab === 'messages' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div>
              <h2 className="text-xl font-editorial font-bold text-white">
                Gelen Teklif & İletişim Formları
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Ziyaretçilerin sitedeki teklif formundan ilettiği mesajlar bu alanda arşivlenir.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-violet-600/20 text-violet-300 border border-violet-500/30 text-xs font-mono font-medium">
              Toplam {messages.length} Kayıt
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="py-16 text-center rounded-3xl bg-dark-900/40 border border-white/[0.06]">
              <Mail className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-editorial font-bold text-white">
                Henüz Mesaj Bulunmuyor
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                İletişim sayfasından teklif formu gönderildiğinde bildirimler burada listelenecektir.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="p-6 rounded-2xl bg-dark-900/80 border border-white/[0.08] hover:border-violet-500/30 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {m.name}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400 font-mono mt-0.5">
                        <span className="text-violet-400">{m.email}</span>
                        {m.phone && (
                          <>
                            <span>•</span>
                            <a
                              href={`tel:${m.phone}`}
                              className="text-emerald-400 hover:underline"
                              title="Numarayı Ara"
                            >
                              📞 {m.phone}
                            </a>
                          </>
                        )}
                        <span>•</span>
                        <span className="px-2 py-0.5 rounded bg-violet-500/10 text-violet-300 text-[10px]">
                          {m.service}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {m.date}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 font-light leading-relaxed whitespace-pre-wrap">
                    {m.message}
                  </p>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${m.email}&su=${encodeURIComponent(`Zeynep Yıldırım · ${m.service} Teklif Dönüşü`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 border border-violet-500/30 text-xs font-medium inline-flex items-center gap-1.5 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gmail ile Yanıtla</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
                          deleteContactMessage(m.id);
                          triggerToast('Mesaj silindi.');
                        }
                      }}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 transition-all"
                      title="Mesajı Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 6: ŞİFRE & YEDEKLEME (SETTINGS) */}
      {activeTab === 'settings' && (
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Password Change Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/80 border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-editorial font-bold text-white">
                  Yönetici Şifresini Değiştir
                </h3>
                <p className="text-xs text-slate-400">
                  Panele giriş için kullandığınız şifreyi buradan güncelleyebilirsiniz.
                </p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  required
                  value={currentPass}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  placeholder="Mevcut şifreniz..."
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="En az 4 karakter yeni şifreniz..."
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              {passChangeError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
                  {passChangeError}
                </div>
              )}

              {passChangeSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Şifreniz başarıyla değiştirildi!</span>
                </div>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-all"
              >
                Şifreyi Güncelle
              </button>
            </form>
          </div>

          {/* Backup & Restore Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/80 border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/[0.06]">
              <div className="w-10 h-10 rounded-xl bg-violet-600/20 text-violet-300 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-editorial font-bold text-white">
                  Veri Yedekleme ve İçe Aktarma
                </h3>
                <p className="text-xs text-slate-400">
                  Projelerinizi, ayarlarınızı ve mesajlarınızı JSON olarak indirebilir veya geri yükleyebilirsiniz.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-dark-850 border border-white/[0.06] flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Yedek Dosyası İndir (JSON)
                  </h4>
                  <p className="text-xs text-slate-400 font-light mb-4">
                    Tüm portfolyo içeriğini bilgisayarınıza güvenli bir JSON yedeği olarak indirir.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={exportData}
                  className="w-full py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-200 border border-white/[0.08] text-xs font-medium inline-flex items-center justify-center gap-2 transition-all"
                >
                  <Download className="w-4 h-4 text-violet-400" />
                  <span>JSON Yedeği İndir</span>
                </button>
              </div>

              <div className="p-5 rounded-2xl bg-dark-850 border border-white/[0.06] flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Yedekten Geri Yükle
                  </h4>
                  <p className="text-xs text-slate-400 font-light mb-4">
                    Daha önce indirdiğiniz bir yedek dosyasını seçerek siteyi o ana döndürür.
                  </p>
                </div>
                <label className="w-full py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-slate-200 border border-white/[0.08] text-xs font-medium inline-flex items-center justify-center gap-2 transition-all cursor-pointer">
                  <Upload className="w-4 h-4 text-violet-400" />
                  <span>Yedek Dosyası Yükle</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Reset Defaults Warning */}
            <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-red-300">
                  Fabrika Ayarlarına Dön
                </h4>
                <p className="text-[11px] text-slate-400">
                  Tüm özelleştirmeleri silip sitenin ilk orijinal verilerini geri yükler.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Tüm özel eklemeler silinecek ve orijinal varsayılan içeriğe dönülecek. Onaylıyor musunuz?')) {
                    resetToDefaults();
                    triggerToast('Orijinal portfolyo içeriğine dönüldü.');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/20 text-xs font-medium transition-all"
              >
                Sıfırla
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROJECT ADD / EDIT MODAL */}
      {projectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-dark-900 border border-violet-500/40 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <h3 className="text-lg font-editorial font-bold text-white">
                {editingProject ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}
              </h3>
              <button
                type="button"
                onClick={() => setProjectModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Proje Başlığı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Zeynep Yıldırım · Kişisel Portfolyo"
                  value={projectForm.title}
                  onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Kategori *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Özel Web Sitesi"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Yıl *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2026"
                    value={projectForm.year}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Müşteri / Marka
                </label>
                <input
                  type="text"
                  placeholder="Örn: Zeynep Yıldırım (Kişisel Marka)"
                  value={projectForm.client}
                  onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Proje Özeti & Hikayesi *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Projenin amacını ve yapılan işi anlatan samimi bir özet..."
                  value={projectForm.summary}
                  onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Kullanılan Teknolojiler & Beceriler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  placeholder="Örn: React, Tailwind CSS, 3D Amblem, Mobil Uyum"
                  value={projectForm.technologies}
                  onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Başarı / Vurgu Metriği
                </label>
                <input
                  type="text"
                  placeholder="Örn: %100 Özel Tasarım & Mobil Uyum"
                  value={projectForm.metrics}
                  onChange={(e) => setProjectForm({ ...projectForm, metrics: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Canlı Proje Bağlantısı (URL)
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={projectForm.link}
                  onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Proje Görsel URL'si (Opsiyonel)
                </label>
                <input
                  type="text"
                  placeholder="Boş bırakırsanız varsayılan vitrin görseli kullanılır"
                  value={projectForm.image}
                  onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setProjectModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-dark-850 text-slate-300 hover:text-white text-xs font-medium"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 text-white text-xs font-semibold shadow-md shadow-violet-500/20"
                >
                  {editingProject ? 'Güncellemeleri Kaydet' : 'Projeyi Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SERVICE ADD / EDIT MODAL */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl bg-dark-900 border border-violet-500/40 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <h3 className="text-lg font-editorial font-bold text-white">
                {editingService ? 'Hizmeti Düzenle' : 'Yeni Hizmet Paketi'}
              </h3>
              <button
                type="button"
                onClick={() => setServiceModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Hizmet Başlığı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Özel Tasarım Web Siteleri"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Teslimat Süresi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: 1 - 2 Hafta"
                    value={serviceForm.timeline}
                    onChange={(e) => setServiceForm({ ...serviceForm, timeline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Öne Çıkarma Rozeti (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: En Çok Tercih Edilen"
                    value={serviceForm.badge}
                    onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Kısa Slogan (Tagline) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Markanıza karakter katan modern vitrinler."
                  value={serviceForm.tagline}
                  onChange={(e) => setServiceForm({ ...serviceForm, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Detaylı Açıklama *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Hizmetin kapsamını açıklayan metin..."
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Teslim Edilecekler (Her satıra bir madde yazın)
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Özgün Arayüz Tasarımı&#10;Mobil Tam Uyum&#10;Hızlı Altyapı"
                  value={serviceForm.deliverables}
                  onChange={(e) => setServiceForm({ ...serviceForm, deliverables: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-white/[0.08] text-sm text-white focus:outline-none focus:border-violet-400"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-dark-850 text-slate-300 hover:text-white text-xs font-medium"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 text-white text-xs font-semibold shadow-md shadow-violet-500/20"
                >
                  {editingService ? 'Güncellemeleri Kaydet' : 'Hizmeti Ekle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
