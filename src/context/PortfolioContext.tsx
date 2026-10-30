import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Service, Stat } from '../types';
import { personalInfo as defaultPersonalInfo, stats as defaultStats, projects as defaultProjects, services as defaultServices } from '../data/content';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  date: string;
}

export interface PortfolioData {
  personalInfo: typeof defaultPersonalInfo;
  stats: Stat[];
  projects: Project[];
  services: Service[];
  messages: ContactMessage[];
}

interface PortfolioContextType {
  personalInfo: typeof defaultPersonalInfo;
  stats: Stat[];
  projects: Project[];
  services: Service[];
  messages: ContactMessage[];
  updatePersonalInfo: (data: Partial<typeof defaultPersonalInfo>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, updated: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'date'>) => void;
  deleteContactMessage: (id: string) => void;
  resetToDefaults: () => void;
  exportData: () => void;
  importData: (jsonStr: string) => boolean;
}

const STORAGE_KEY = 'zy_portfolio_data_v1';

const getInitialData = (): PortfolioData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const savedSocial = parsed.personalInfo?.social || {};
      const mergedSocial = {
        ...defaultPersonalInfo.social,
        ...savedSocial,
        instagram: (!savedSocial.instagram || savedSocial.instagram.includes('zeynepyildirimweb'))
          ? defaultPersonalInfo.social.instagram
          : savedSocial.instagram,
      };

      return {
        personalInfo: { 
          ...defaultPersonalInfo, 
          ...(parsed.personalInfo || {}),
          social: mergedSocial
        },
        stats: parsed.stats?.length ? parsed.stats : defaultStats,
        projects: parsed.projects?.length ? parsed.projects : defaultProjects,
        services: parsed.services?.length ? parsed.services : defaultServices,
        messages: (parsed.messages || []).filter((m: ContactMessage) => m.id !== 'msg-sample-1'),
      };
    }
  } catch (e) {
    console.error('Failed to parse portfolio data from localStorage', e);
  }
  return {
    personalInfo: defaultPersonalInfo,
    stats: defaultStats,
    projects: defaultProjects,
    services: defaultServices,
    messages: [],
  };
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(getInitialData);

  // Auto-sync with localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to localStorage', e);
    }
  }, [data]);

  const updatePersonalInfo = (newInfo: Partial<typeof defaultPersonalInfo>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...newInfo,
        social: {
          ...prev.personalInfo.social,
          ...(newInfo.social || {}),
        },
      },
    }));
  };

  const addProject = (projectData: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
  };

  const updateProject = (id: string, updated: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updated } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addService = (serviceData: Omit<Service, 'id'>) => {
    const newSrv: Service = {
      ...serviceData,
      id: `srv-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      services: [...prev.services, newSrv],
    }));
  };

  const updateService = (id: string, updated: Partial<Service>) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const deleteService = (id: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'date'>) => {
    const now = new Date();
    const dateFormatted = `${now.getDate()} ${
      ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][
        now.getMonth()
      ]
    } ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: dateFormatted,
    };
    setData((prev) => ({
      ...prev,
      messages: [newMsg, ...prev.messages],
    }));
  };

  const deleteContactMessage = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id),
    }));
  };

  const resetToDefaults = () => {
    const defaultData: PortfolioData = {
      personalInfo: defaultPersonalInfo,
      stats: defaultStats,
      projects: defaultProjects,
      services: defaultServices,
      messages: [],
    };
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `zeynep-yildirim-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.personalInfo || parsed.projects || parsed.services) {
        setData({
          personalInfo: { ...defaultPersonalInfo, ...(parsed.personalInfo || {}) },
          stats: parsed.stats || defaultStats,
          projects: parsed.projects || defaultProjects,
          services: parsed.services || defaultServices,
          messages: parsed.messages || [],
        });
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON file format', e);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo: data.personalInfo,
        stats: data.stats,
        projects: data.projects,
        services: data.services,
        messages: data.messages,
        updatePersonalInfo,
        addProject,
        updateProject,
        deleteProject,
        addService,
        updateService,
        deleteService,
        addContactMessage,
        deleteContactMessage,
        resetToDefaults,
        exportData,
        importData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
