import React from 'react';
import { Blog } from '../sections/Blog';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BlogPage: React.FC = () => {
  return (
    <div className="pt-20 pb-20">
      {/* Main Blog Component */}
      <Blog />

      {/* Discussion & Feedback Banner */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-dark-850/80 border border-white/[0.08] text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 mb-4">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-editorial font-bold text-white mb-2">
              Bir Fikir Üzerine Konuşalım
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mb-6 font-light">
              Değindiğim konular hakkında aklınıza takılan bir soru varsa veya projeniz için fikir alışverişi yapmak isterseniz bana her zaman yazabilirsiniz.
            </p>
            <Link
              to="/iletisim"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 hover:brightness-110 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-md shadow-violet-600/20"
            >
              <span>Fikir Paylaş & İletişime Geç</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};