import { Project, Service, Article, Stat } from '../types';

export const personalInfo = {
  name: 'Zeynep Yıldırım',
  title: 'Genç Vizyon · Web & Dijital Arayüz Geliştirici',
  tagline: 'Dijital çağın dinamizmiyle şekillenen, özgün ve modern web deneyimleri.',
  bio: 'Genç bir vizyonun enerjisini, modern tasarım zevki ve titiz bir çalışma disipliniyle birleştiriyorum. Ezbere kalıplara takılmadan; markanızı internette öne çıkaracak, hızlı, etkileyici ve yaşayan web siteleri inşa ediyorum.',
  location: 'İstanbul / Remote',
  email: 'yildirimzeynepweb@gmail.com',
  status: 'Yeni web projeleri & yaratıcı fikirler için müsait',
  social: {
    instagram: 'https://www.instagram.com/zydijital_/',
    tiktok: 'https://www.tiktok.com/@zeynepyildirimweb',
    twitter: 'https://x.com/Zeynepweb',
    linkedin: 'https://www.linkedin.com/in/zeynep-y%C4%B1ld%C4%B1r%C4%B1m-6250042a1/',
    github: 'https://github.com/zeynepyildirimm3',
  },
};

export const stats: Stat[] = [
  { value: 'Dinamik', label: 'Genç & Özgün Vizyon', detail: 'Kalıplardan Uzak Yeni Fikirler' },
  { value: '%100', label: 'Bire Bir İlgi', detail: 'Her İşe Kendi Vitrinim Gibi Özen' },
  { value: 'Hızlı', label: 'Çevik & Akıcı Süreç', detail: 'Hızlı ve Doğrudan Çözüm' },
  { value: 'Kusursuz', label: 'Mobil & Ekran Uyumu', detail: 'Tüm Cihazlarda Akıcı Deneyim' },
];

export const projects: Project[] = [
  {
    id: 'zeynep-portfolio',
    title: 'Zeynep Yıldırım · Kişisel Portfolyo & Web Platformu',
    category: 'Özel Web Sitesi',
    summary: 'Kendi kişisel markam için sıfırdan tasarlayıp geliştirdiğim; hazır kalıplardan uzak, 3D etkileşimli amblemi, derin görsel dili ve akıcı sayfa dinamikleriyle yaşayan modern bir dijital vitrin.',
    year: '2026',
    client: 'Zeynep Yıldırım (Kişisel Marka & Tasarım)',
    metrics: '%100 Özel Tasarım & Mobil Uyum',
    technologies: ['Özgün Arayüz', '3D Amblem', 'Mikro Etkileşimler', 'Mobil Uyum'],
    featured: true,
  },
];

export const services: Service[] = [
  {
    id: 'custom-web',
    title: 'Özel Tasarım Web Siteleri',
    tagline: 'Ezbere kalıplardan uzak, markanıza karakter katan modern vitrinler.',
    description: 'Kalıplaşmış hazır temaları bir kenara bırakıp; markanızın ruhunu yansıtan, mobil uyumlu, hızlı ve ilk bakışta güven veren özel web siteleri inşa ediyorum.',
    deliverables: ['Özgün Arayüz Tasarımı', 'Mobil & Masaüstü Tam Uyum', 'Hızlı ve Güvenli Altyapı', 'Canlıya Alma & Teslim'],
    timeline: '1 - 2 Hafta',
    badge: 'En Çok Tercih Edilen',
  },
  {
    id: 'google-meta-ads',
    title: 'Google & Meta Reklam Yönetimi',
    tagline: 'Doğru hedef kitle, bütçe optimizasyonu ve ölçülebilir müşteri trafiği.',
    description: 'Rastgele harcanan reklam bütçeleri yerine; doğrudan potansiyel müşterilerinizi yakalayan, Google Arama ve Meta (Instagram / Facebook) algoritmalarını doğru kullanan, ölçülebilir ve yüksek dönüşümlü reklam kampanyaları kurguluyorum.',
    deliverables: [
      'Google Arama (Search) & Harita Reklamları',
      'Instagram & Facebook Hedef Kitle Kurgusu',
      'Meta Pixel & Google Analytics Dönüşüm Takibi',
      'Reklam Metni, Görsel Stratejisi & Bütçe Yönetimi',
    ],
    timeline: 'Aylık Yönetim / Esnek Kampanya',
    badge: 'Yüksek Dönüşüm',
  },
  {
    id: 'web-consulting',
    title: 'Web & Tasarım Danışmanlığı',
    tagline: 'Projeniz veya markanız için doğru dijital yol haritası.',
    description: 'Mevcut web sitenizin eksiklerini analiz ediyor, yeni bir fikir için en doğru teknoloji ve tasarım stratejisini belirliyor, bütçenizi ve zamanınızı koruyacak net bir yol haritası sunuyorum.',
    deliverables: ['Mevcut Site / Arayüz İncelemesi', 'Kullanılabilirlik & Tasarım Geri Bildirimi', 'Teknoloji & Altyapı Rehberliği', 'Bire Bir Danışmanlık Oturumu'],
    timeline: '1 - 3 Gün',
  },
  {
    id: 'social-media',
    title: 'Sosyal Medya Danışmanlığı',
    tagline: 'Markanız ve projeleriniz için özgün, güçlü ve estetik bir dijital kimlik.',
    description: 'Rastgele paylaşımlar yerine; hedef kitlenizi yakalayan, modern görsel diliyle güven veren, video ve gönderi formatlarıyla algoritmayı lehinize çeviren tutarlı bir sosyal medya stratejisi.',
    deliverables: [
      'Görsel Dil & Profil Estetiği Düzenleme',
      'Özgün İçerik & Video Stratejisi',
      'Algoritma & Organik Büyüme Taktikleri',
      'Bire Bir Hesap Analizi & Yol Haritası',
    ],
    timeline: 'Haftalık / Aylık Program',
    badge: 'Yeni',
  },
  {
    id: 'mentorship-education',
    title: 'Eğitim & Mentorluklarım',
    tagline: 'Yazılım, yapay zeka, Python ve girişimcilik yolculuğunuza rehberlik.',
    description: 'Karmaşık teorilere takılmadan; yazılıma doğru adımlarla başlamanız, yapay zekayı bir güç çarpanı olarak kullanmanız, Python temellerini kavramanız ve fikirlerinizi dijital bir projeye dönüştürmeniz için samimi bire bir rehberlik.',
    deliverables: [
      'Yazılıma Nereden Başlamalıyım? (Yol Haritası)',
      'Etkin Yapay Zeka (AI) Araçları Kullanımı',
      'Temel Python Eğitimi & Kodlama Mantığı',
      'Girişimcilik & Dijital Proje Geliştirme',
    ],
    timeline: 'Bire Bir Seanslar / Esnek Program',
    badge: 'Kişiye Özel Mentorluk',
  },
];

export const articles: Article[] = [
  {
    id: 'ozgun-tasarim-karakter',
    title: 'Dijital Dünyada Özgün Bir İz Bırakmak: Tasarımın Gücü',
    excerpt: 'Her projenin kendine has bir hikayesi vardır. Bu hikayeyi renkler, tipografi ve estetikle dijitale aktarmanın en doğal yolları.',
    date: 'Ekim 2026',
    readTime: '2 dk okuma',
    tag: 'Tasarım & Estetik',
    paragraphs: [
      'Her markanın, girişimin veya bireysel projenin anlatılacak kendine has samimi bir hikayesi vardır. Dijital dünyada bu hikayeyi en doğru şekilde hissettirmenin yolu ise markanın ruhunu yansıtan özenli dokunuşlardan geçer.',
      'Renklerin birbiriyle uyumu, yazı tiplerinin sakinliği ve sayfanın nefes almasını sağlayan ferah boşluklar; ziyaretçiye ilk andan itibaren sıcak ve samimi bir karşılama sunar.',
      'Bir web sitesini sadece bir bilgi panosu olarak değil, yaşayan ve sizin enerjinizi taşıyan dijital bir vitrin olarak kurgulamak; ziyaretçilerinizle güçlü ve doğal bir bağ kurmanın en keyifli yoludur.',
    ],
  },
  {
    id: 'ilk-bakista-guven-ve-samimiyet',
    title: 'İlk Bakışta Güven ve Samimiyet: Bir Web Sitesini Sıcak Kılan Detaylar',
    excerpt: 'İnternette gezinirken bazı sitelerde kendimizi anında rahat hissederiz. Bu huzurlu deneyimin arkasındaki küçük tasarım incelikleri.',
    date: 'Ekim 2026',
    readTime: '2 dk okuma',
    tag: 'Kullanıcı Deneyimi',
    paragraphs: [
      'İnternette gezinirken bazı sayfalara girdiğimizde kendimizi anında güvende, rahat ve huzurlu hissederiz. Bu olumlu hissin arkasında çoğu zaman fark edilmeyen ama hissedilen küçük tasarım detayları yatar.',
      'Gözü yormayan sakin renk paletleri, doğru aydınlatılmış arka planlar ve karmaşadan uzak temiz bir düzen; ziyaretçinin aradığı bilgiye kolayca ulaşmasını sağlar.',
      'Aynı zamanda sayfanın cep telefonunda da aynı akıcılık ve güzellikle açılması, ziyaretçiye verilen değerin en güzel göstergesidir. Tasarımda sadeliği benimsediğinizde, asıl öne çıkan şey sunduğunuz hizmetin kalitesi olur.',
    ],
  },
  {
    id: 'yazilim-ve-yapay-zeka-yolculugu',
    title: 'Yazılım ve Yapay Zekaya Merhaba Demek: Yeni Başlayanlar İçin Dostça İpuçları',
    excerpt: 'Teknoloji dünyasına adım atarken keyifle ilerlemenin, yapay zekayı bir çalışma arkadaşı olarak görmenin kolay ve pratik yolları.',
    date: 'Ekim 2026',
    readTime: '3 dk okuma',
    tag: 'Öğrenme & Mentorluk',
    paragraphs: [
      'Yazılım ve teknoloji dünyasına adım atmak gerçekten çok heyecan verici ve ilham dolu bir yolculuktur. Bu yolculuğun en güzel yanı, aklınızdaki bir fikri sıfırdan ekranda yaşayan bir projeye dönüştürebilme özgürlüğüdür.',
      'Öğrenirken karmaşık kurallara takılmak yerine, merak ettiğiniz küçük ve eğlenceli projelerle yola çıkmak öğrenme isteğini daima canlı tutar. Bir butonu çalıştırmak ya da küçük bir sayfa tasarlamak bile insana büyük bir üretme mutluluğu verir.',
      'Günümüzde yapay zeka araçları da bu yolculukta harika bir öğrenme arkadaşıdır. Merak ettiğiniz soruları sorabileceğiniz, birlikte beyin fırtınası yapabileceğiniz bir rehber olarak yapay zekayı yanınıza aldığınızda, yazılım öğrenmek çok daha keyifli ve akıcı bir maceraya dönüşür.',
    ],
  },
];
