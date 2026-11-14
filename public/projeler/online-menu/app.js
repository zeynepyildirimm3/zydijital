/**
 * ZY Restoran - Online QR Menü Uygulaması (app.js)
 * Bağımsız, saf Vanilla JS mimarisi.
 * Salt menü inceleme modu: Sipariş / sepet adımları içermez.
 */

// ==========================================================================
// 1. Yapılandırma & Çeviri Sözlüğü (i18n)
// ==========================================================================
const APP_CONFIG = {
  DEFAULT_LANG: "tr",
  STORAGE_KEYS: {
    LANG: "sumak_lang",
    THEME: "sumak_theme"
  }
};

const TRANSLATIONS = {
  tr: {
    skipLink: "İçeriğe Atla",
    allCategories: "Kategoriler",
    allSubcategories: "Tümü",
    categoryDirectoryTitle: "Menü Kategorileri",
    categoriesSummary: "{cats} kategori • {count} lezzet",
    subcategoriesSummary: "{cats} alt kategori • {count} lezzet",
    categoryItemsBadge: "{count} çeşit",
    backToCategories: "← Tüm Kategoriler",
    filtersBtn: "Filtrele",
    applyFiltersBtn: "Sonuçları Gör",
    clearSearchLabel: "Aramayı temizle",
    backToTopLabel: "Menü Başına Dön",
    containsPrefix: "İçerir:",
    filterTitle: "Menüyü Filtrele",
    resetFilters: "Temizle",
    searchPlaceholder: "Menüde ara...",
    dietLegend: "Diyet & Tercih",
    dietVegetarian: "Vejetaryen",
    dietVegan: "Vegan",
    dietGlutenFree: "Glutensiz",
    dietMild: "Acısız",
    allergenLegend: "Alerjen Gizle (İçerenleri Kaldır)",
    allergenDairy: "Süt",
    allergenNuts: "Fındık / Ceviz",
    allergenPeanuts: "Fıstık",
    allergenGluten: "Gluten",
    budgetLabel: "Maksimum Fiyat:",
    itemsCount: "{count} lezzet listeleniyor",
    noResults: "Seçtiğiniz filtrelere uygun lezzet bulunamadı.",
    soldOut: "Tükendi",
    footerTagline: "Güneydoğu ve Anadolu Lezzet Durağı",
    demoNotice: "ℹ️ Bu web sitesi bir demo ve ön izleme çalışmasıdır. ZY Restoran kurgusal bir işletmedir; fiyatlar ve bilgiler simülasyon amaçlıdır.",
    backToTop: "↑ Menü Başına Dön",
    spicyTag: "Acılı",
    prepPrefix: "Süre:",
    portionPrefix: "Porsiyon:",
    viewDetails: "İncele",
    closeModal: "Kapat",
    detailsHeading: "Lezzet Detayları",
    allergenWarningTitle: "Alerjen ve Diyet Uyarıları",
    noAllergensNote: "Belirtilen kritik alerjenleri içermez.",
    safeNotice: "Kritik alerjen içermez"
  },
  en: {
    skipLink: "Skip to Content",
    allCategories: "Categories",
    allSubcategories: "All",
    categoryDirectoryTitle: "Menu Categories",
    categoriesSummary: "{cats} categories • {count} dishes",
    subcategoriesSummary: "{cats} subcategories • {count} dishes",
    categoryItemsBadge: "{count} items",
    backToCategories: "← All Categories",
    filtersBtn: "Filters",
    applyFiltersBtn: "Show Dishes",
    clearSearchLabel: "Clear search",
    backToTopLabel: "Back to Top",
    containsPrefix: "Contains:",
    filterTitle: "Filter Menu",
    resetFilters: "Reset",
    searchPlaceholder: "Search menu...",
    dietLegend: "Dietary Preferences",
    dietVegetarian: "Vegetarian",
    dietVegan: "Vegan",
    dietGlutenFree: "Gluten-Free",
    dietMild: "Mild / Not Spicy",
    allergenLegend: "Hide Allergens (Exclude Items)",
    allergenDairy: "Dairy",
    allergenNuts: "Walnuts / Hazelnuts",
    allergenPeanuts: "Peanuts",
    allergenGluten: "Gluten",
    budgetLabel: "Max Price:",
    itemsCount: "{count} dishes shown",
    noResults: "No dishes match your selected filters.",
    soldOut: "Sold Out",
    footerTagline: "Southeastern & Anatolian Culinary Experience",
    demoNotice: "ℹ️ This website is a demo / preview showcase. ZY Restoran is a fictional venue; prices and information are for simulation only.",
    backToTop: "↑ Back to Top",
    spicyTag: "Spicy",
    prepPrefix: "Prep:",
    portionPrefix: "Portion:",
    viewDetails: "Details",
    closeModal: "Close",
    detailsHeading: "Dish Details",
    allergenWarningTitle: "Allergen & Dietary Notices",
    noAllergensNote: "Does not contain specified critical allergens.",
    safeNotice: "Free of common allergens"
  }
};

// ==========================================================================
// 2. Uygulama Durumu (State)
// ==========================================================================
const state = {
  menuData: null,
  activeCategory: "all",
  activeSubcategory: null,
  searchQuery: "",
  activeDiets: new Set(),
  activeAllergens: new Set(),
  maxPrice: 520,
  maxPossiblePrice: 520,
  currentLang: localStorage.getItem(APP_CONFIG.STORAGE_KEYS.LANG) || APP_CONFIG.DEFAULT_LANG
};

// ==========================================================================
// 3. Yardımcı Fonksiyonlar
// ==========================================================================
function t(key, replacements = {}) {
  let str = (TRANSLATIONS[state.currentLang] && TRANSLATIONS[state.currentLang][key]) || TRANSLATIONS.tr[key] || key;
  for (const [k, v] of Object.entries(replacements)) {
    str = str.replace(new RegExp(`\\{${k}\\}`, "g"), v);
  }
  return str;
}

function announce(message) {
  const el = document.getElementById("a11y-announcer");
  if (el) {
    el.textContent = message;
  }
}

// ==========================================================================
// 4. Veri Yükleme ve Başlatma
// ==========================================================================
async function initApp() {
  // Service Worker Kaydı
  registerServiceWorker();

  // Olay Dinleyicileri Kur
  setupEventListeners();

  // Dil Düğmelerini ve Arayüzü Başlangıç Dilinde Ayarla
  updateLanguageUI(state.currentLang);

  // Tema Kontrolünü Senkronize Et
  initTheme();

  // Menü Verisini Yükle (telefonda eski HTTP önbelleğine takılmaması için sürümlü + no-store)
  try {
    const response = await fetch("menu.json?v=27", { cache: "no-store" });
    if (!response.ok) throw new Error("menu.json yüklenemedi: " + response.status);
    state.menuData = await response.json();
    
    // Header bilgilerini güncelle
    updateRestaurantHeader();

    // Fiyat Slider alt/üst sınırlarını menü fiyatlarına göre ayarla
    const minItemPrice = Math.floor(Math.min(...state.menuData.items.map(i => i.price)) / 10) * 10;
    const maxItemPrice = Math.max(...state.menuData.items.map(i => i.price), 520);
    state.maxPossiblePrice = maxItemPrice;
    const priceSlider = document.getElementById("price-range");
    if (priceSlider) {
      priceSlider.min = minItemPrice;
      priceSlider.max = maxItemPrice;
      priceSlider.value = maxItemPrice;
      state.maxPrice = maxItemPrice;
      document.getElementById("price-value-display").textContent = `${maxItemPrice} TL`;
    }

    // Kategori ve Menü Bileşenlerini Çiz
    renderCategoryTabs();
    renderMenu();
  } catch (err) {
    console.error("Menü yükleme hatası:", err);
    const container = document.getElementById("menu-container");
    if (container) {
      container.innerHTML = `
        <div style="padding: 32px; text-align: center; color: var(--color-primary);">
          <p><strong>Menü yüklenirken bir sorun oluştu.</strong></p>
          <p style="font-size: 0.875rem; color: var(--color-text-muted); margin-top: 8px;">
            Lütfen internet bağlantınızı kontrol edip sayfayı yenileyiniz.
          </p>
        </div>
      `;
    }
  }
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    const hadController = Boolean(navigator.serviceWorker.controller);
    let swRefreshing = false;

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      // Only auto-reload an already-controlled tab when a new SW replaces an older one.
      if (!hadController || swRefreshing) return;
      swRefreshing = true;
      window.location.reload();
    });

    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" })
        .then(reg => {
          reg.update();
          console.log("Service Worker başarıyla kaydedildi, kapsam:", reg.scope);
        })
        .catch(err => {
          console.warn("Service Worker kaydı başarısız:", err);
        });
    });
  }
}

// ==========================================================================
// 5. Restoran & Başlık Alanı Güncelleme
// ==========================================================================
function updateRestaurantHeader() {
  if (!state.menuData || !state.menuData.restaurant) return;
  const rest = state.menuData.restaurant;
  const lang = state.currentLang;

  if (rest.name) {
    const upperName = rest.name.toLocaleUpperCase("tr-TR");
    document.querySelectorAll(".brand-wordmark, .footer-title").forEach(el => {
      el.textContent = upperName;
    });
  }

  const hoursEl = document.getElementById("header-hours");
  if (hoursEl) hoursEl.textContent = rest.hours[lang] || rest.hours.tr;

  const addrEl = document.getElementById("header-address");
  if (addrEl) addrEl.textContent = rest.address[lang] || rest.address.tr;

  const taglineEl = document.getElementById("brand-tagline");
  if (taglineEl) taglineEl.textContent = rest.cuisine[lang] || rest.cuisine.tr;
}

// ==========================================================================
// 6. Kategori Sekmeleri, Vitrini & Gezinme
// ==========================================================================
const CATEGORY_ICONS = {
  corba: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 12h16a8 8 0 0 1-16 0z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 5c0 1.5-1 2-1 3.5M12 4c0 1.5-1 2-1 3.5M15 5c0 1.5-1 2-1 3.5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/><line x1="7" y1="20" x2="17" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
  meze: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.75"/></svg>`,
  kebap: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 2c2.5 3.5 5 6.2 5 10a5 5 0 0 1-10 0c0-2.1 1-4.1 2.2-5.7.2 1.5 1.3 2.7 2.8 2.7.5-2.5-.2-4.7 0-7z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>`,
  pide: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M3 13c4-5 14-5 18 0-4 5-14 5-18 0z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="10" cy="13" r="1" fill="currentColor"/><circle cx="14" cy="13" r="1" fill="currentColor"/></svg>`,
  fastfood: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 11h16c0-3.5-3.6-6-8-6s-8 2.5-8 6z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="3" y1="14" x2="21" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M5 17h14v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-1z" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
  tatli: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><polygon points="12 4 21 12 12 20 3 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg>`,
  sutlu: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 13h14l-1.5 6h-11L5 13z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M6.5 13c0-3 2.5-5 5.5-5s5.5 2 5.5 5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="6" r="1.5" fill="currentColor"/></svg>`,
  modern: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M4 11l14-5 2 5v8H4v-8z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><line x1="4" y1="15" x2="20" y2="15" stroke="currentColor" stroke-width="1.75"/><circle cx="15" cy="5.5" r="1.5" fill="currentColor"/></svg>`,
  sicak: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M5 10h11v5a5 5 0 0 1-11 0v-5z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 11h2a2.5 2.5 0 0 1 0 5h-2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 4v3M12 4v3" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>`,
  soguk: `<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M7 6h10l-1.2 14H8.2L7 6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M13 6l2-4h3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="8" y1="11" x2="16" y2="11" stroke="currentColor" stroke-width="1.5"/></svg>`
};

function hasActiveFiltersOrSearch() {
  return (
    state.searchQuery.trim().length > 0 ||
    state.activeDiets.size > 0 ||
    state.activeAllergens.size > 0 ||
    state.maxPrice < state.maxPossiblePrice
  );
}

function syncStickyNavVisibility(show) {
  const stickyNav = document.getElementById("sticky-nav");
  if (stickyNav) {
    stickyNav.hidden = !show;
  }
}

function selectCategory(catId, shouldScroll = true) {
  state.activeCategory = catId;
  state.activeSubcategory = null;
  syncStickyNavVisibility(catId !== "all" || hasActiveFiltersOrSearch());

  const bar = document.getElementById("category-bar");
  if (bar) {
    bar.querySelectorAll(".category-tab").forEach(tabEl => {
      const active = tabEl.dataset.categoryId === catId;
      tabEl.classList.toggle("active", active);
      tabEl.setAttribute("aria-selected", active ? "true" : "false");
      if (active) {
        tabEl.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    });
  }

  renderMenu();

  if (shouldScroll) {
    if (catId !== "all") {
      const target = document.getElementById("menu-container") || document.getElementById("menu-content");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
}

function selectSubcategory(subId, shouldScroll = true) {
  state.activeSubcategory = subId;
  renderMenu();

  if (shouldScroll) {
    const target = document.getElementById("menu-container") || document.getElementById("menu-content");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function renderCategoryTabs() {
  const container = document.getElementById("category-bar");
  if (!container || !state.menuData) return;

  const categories = state.menuData.categories;
  const lang = state.currentLang;

  let html = `
    <button type="button" class="category-tab ${state.activeCategory === 'all' ? 'active' : ''}" 
      data-category-id="all" role="tab" aria-selected="${state.activeCategory === 'all'}">
      ${t("allCategories")}
    </button>
  `;

  categories.forEach(cat => {
    const isSelected = state.activeCategory === cat.id;
    html += `
      <button type="button" class="category-tab ${isSelected ? 'active' : ''}" 
        data-category-id="${cat.id}" role="tab" aria-selected="${isSelected}">
        ${cat.title[lang] || cat.title.tr}
      </button>
    `;
  });

  container.innerHTML = html;

  container.querySelectorAll(".category-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      selectCategory(tab.dataset.categoryId, true);
    });
  });
}

function updateFilterUI() {
  const priceFiltered = state.maxPrice < state.maxPossiblePrice ? 1 : 0;
  const activeCount = state.activeDiets.size + state.activeAllergens.size + priceFiltered;
  const hasSearch = state.searchQuery.trim().length > 0;

  const badgeEl = document.getElementById("active-filter-badge");
  const toggleBtn = document.getElementById("toggle-filters-btn");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  const inlineResetBtn = document.getElementById("reset-filters-btn");

  if (badgeEl) {
    badgeEl.textContent = String(activeCount);
    badgeEl.hidden = activeCount === 0;
  }
  if (toggleBtn) {
    toggleBtn.classList.toggle("has-active", activeCount > 0);
  }
  if (clearSearchBtn) {
    clearSearchBtn.hidden = state.searchQuery.length === 0;
  }
  if (inlineResetBtn) {
    inlineResetBtn.hidden = activeCount === 0 && !hasSearch;
  }
}

// ==========================================================================
// 7. Kategori Vitrini & Menü Kartları Render / Filtreleme
// ==========================================================================
function renderDirectoryCard({ attrName, id, title, subtitle, image, iconKey, count }) {
  const iconSvg = CATEGORY_ICONS[iconKey] || CATEGORY_ICONS.kebap;
  const thumbHtml = image
    ? `<img class="category-card-img" src="${image}?v=10" alt="" width="48" height="48" decoding="async">`
    : iconSvg;

  return `
    <button type="button" class="category-card" ${attrName}="${id}">
      <span class="category-card-icon" aria-hidden="true">${thumbHtml}</span>
      <div class="category-card-info">
        <h3 class="category-card-title">${title}</h3>
        ${subtitle ? `<p class="category-card-sub">${subtitle}</p>` : ""}
      </div>
      <div class="category-card-meta">
        <span class="category-card-count">${t("categoryItemsBadge", { count })}</span>
        <span class="category-card-arrow" aria-hidden="true">→</span>
      </div>
    </button>
  `;
}

function renderCategoryDirectory(container, categories, items, lang) {
  const countDisplay = document.getElementById("filtered-count-text");
  if (countDisplay) {
    countDisplay.textContent = t("categoriesSummary", {
      cats: categories.length,
      count: items.length
    });
  }

  const cardsHtml = categories.map(cat => renderDirectoryCard({
    attrName: "data-category-card",
    id: cat.id,
    title: cat.title[lang] || cat.title.tr,
    subtitle: cat.subtitle ? (cat.subtitle[lang] || cat.subtitle.tr) : "",
    image: cat.image,
    iconKey: cat.icon,
    count: items.filter(i => i.categoryId === cat.id).length
  })).join("");

  container.innerHTML = `
    <section class="category-directory" id="category-directory" aria-labelledby="directory-heading">
      <h2 class="directory-heading" id="directory-heading">${t("categoryDirectoryTitle")}</h2>
      <div class="category-grid">
        ${cardsHtml}
      </div>
    </section>
  `;

  container.querySelectorAll("[data-category-card]").forEach(cardBtn => {
    cardBtn.addEventListener("click", () => {
      selectCategory(cardBtn.dataset.categoryCard, true);
    });
  });
}

function renderSubcategoryDirectory(container, cat, items, lang) {
  const catItems = items.filter(i => i.categoryId === cat.id);
  const catTitle = cat.title[lang] || cat.title.tr;

  const countDisplay = document.getElementById("filtered-count-text");
  if (countDisplay) {
    countDisplay.textContent = t("subcategoriesSummary", {
      cats: cat.subcategories.length,
      count: catItems.length
    });
  }

  const cardsHtml = cat.subcategories.map(sub => renderDirectoryCard({
    attrName: "data-subcategory-card",
    id: sub.id,
    title: sub.title[lang] || sub.title.tr,
    subtitle: sub.subtitle ? (sub.subtitle[lang] || sub.subtitle.tr) : "",
    image: sub.image !== undefined ? sub.image : (sub.icon ? null : cat.image),
    iconKey: sub.icon || cat.icon,
    count: catItems.filter(i => i.subcategoryId === sub.id).length
  })).join("");

  container.innerHTML = `
    <div class="category-back-bar">
      <button type="button" class="btn-back-categories" id="back-to-categories-btn">
        ${t("backToCategories")}
      </button>
    </div>
    <section class="category-directory" id="subcategory-directory" aria-labelledby="subcategory-directory-heading">
      <h2 class="directory-heading" id="subcategory-directory-heading">${catTitle}</h2>
      <div class="category-grid">
        ${cardsHtml}
      </div>
    </section>
  `;

  const backBtn = document.getElementById("back-to-categories-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => selectCategory("all", true));
  }

  container.querySelectorAll("[data-subcategory-card]").forEach(cardBtn => {
    cardBtn.addEventListener("click", () => {
      selectSubcategory(cardBtn.dataset.subcategoryCard, true);
    });
  });
}

function renderMenu() {
  const container = document.getElementById("menu-container");
  if (!container || !state.menuData) return;

  const { items, categories } = state.menuData;
  const lang = state.currentLang;
  const query = state.searchQuery.toLowerCase().trim();

  updateFilterUI();

  // İlk giriş görünümü: Kategori seçili değilse ve arama/filtre aktif değilse önce kategorileri göster
  if (state.activeCategory === "all" && !hasActiveFiltersOrSearch()) {
    syncStickyNavVisibility(false);
    renderCategoryDirectory(container, categories, items, lang);
    return;
  }

  syncStickyNavVisibility(true);

  const activeCatObj = categories.find(c => c.id === state.activeCategory);
  if (
    activeCatObj &&
    Array.isArray(activeCatObj.subcategories) &&
    activeCatObj.subcategories.length > 0 &&
    state.activeSubcategory === null &&
    !hasActiveFiltersOrSearch()
  ) {
    renderSubcategoryDirectory(container, activeCatObj, items, lang);
    return;
  }

  // 1. Filtreleme Uygulaması
  const filteredItems = items.filter(item => {
    if (state.activeCategory !== "all" && item.categoryId !== state.activeCategory) {
      return false;
    }

    if (item.price > state.maxPrice) {
      return false;
    }

    if (query) {
      const name = (item.name[lang] || item.name.tr).toLowerCase();
      const story = (item.story[lang] || item.story.tr).toLowerCase();
      if (!name.includes(query) && !story.includes(query)) {
        return false;
      }
    }

    for (const diet of state.activeDiets) {
      if (!item.tags.includes(diet)) {
        return false;
      }
    }

    for (const allergen of state.activeAllergens) {
      if (item.allergens && item.allergens.includes(allergen)) {
        return false;
      }
    }

    return true;
  });

  const hasSelectedSub =
    activeCatObj &&
    Array.isArray(activeCatObj.subcategories) &&
    activeCatObj.subcategories.length > 0 &&
    state.activeSubcategory &&
    state.activeSubcategory !== "all";

  const displayedCount = hasSelectedSub
    ? filteredItems.filter(i => i.subcategoryId === state.activeSubcategory).length
    : filteredItems.length;

  // Sayacı Güncelle
  const countDisplay = document.getElementById("filtered-count-text");
  if (countDisplay) {
    countDisplay.textContent = t("itemsCount", { count: displayedCount });
  }

  let backBarHtml = "";
  if (state.activeCategory !== "all") {
    const activeCatTitle = activeCatObj ? (activeCatObj.title[lang] || activeCatObj.title.tr) : "";
    const subBackBtn = activeCatObj && Array.isArray(activeCatObj.subcategories) && activeCatObj.subcategories.length > 0 && state.activeSubcategory !== null
      ? `<button type="button" class="btn-back-categories" id="back-to-subcategories-btn">← ${activeCatTitle}</button>`
      : "";
    const catBackClass = subBackBtn ? "btn-back-categories btn-back-secondary" : "btn-back-categories";
    backBarHtml = `
      <div class="category-back-bar">
        ${subBackBtn}
        <button type="button" class="${catBackClass}" id="back-to-categories-btn">
          ${t("backToCategories")}
        </button>
      </div>
    `;
  }

  // Sonuç Yoksa Uyarı Göster
  if (filteredItems.length === 0) {
    container.innerHTML = `
      ${backBarHtml}
      <div style="padding: 48px 16px; text-align: center; color: var(--color-text-muted);">
        <p style="font-size: 1.125rem; font-weight: 600; margin-bottom: 8px;">${t("noResults")}</p>
        <button type="button" class="btn-text-reset" style="margin: 12px auto 0;" id="clear-filters-empty">
          ${t("resetFilters")}
        </button>
      </div>
    `;
    const emptyResetBtn = document.getElementById("clear-filters-empty");
    if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetAllFilters);
    const backBtn = document.getElementById("back-to-categories-btn");
    if (backBtn) backBtn.addEventListener("click", () => selectCategory("all", true));
    const subBackBtnEl = document.getElementById("back-to-subcategories-btn");
    if (subBackBtnEl) subBackBtnEl.addEventListener("click", () => selectCategory(state.activeCategory, true));
    return;
  }

  // Kategorilere göre grupla (varsa alt kategorilere böl)
  let html = backBarHtml;
  categories.forEach(cat => {
    const catItems = filteredItems.filter(i => i.categoryId === cat.id);
    if (catItems.length === 0) return;

    html += renderCategorySection(cat, catItems, lang);
  });

  container.innerHTML = html;

  const backBtn = document.getElementById("back-to-categories-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => selectCategory("all", true));
  }

  const subBackBtnEl = document.getElementById("back-to-subcategories-btn");
  if (subBackBtnEl) {
    subBackBtnEl.addEventListener("click", () => selectCategory(state.activeCategory, true));
  }

  const emptySubResetBtn = document.getElementById("clear-filters-empty");
  if (emptySubResetBtn) {
    emptySubResetBtn.addEventListener("click", resetAllFilters);
  }

  container.querySelectorAll(".subcategory-pill").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activeSubcategory = btn.dataset.subcategory;
      renderMenu();
    });
  });
}

function renderCategorySection(cat, catItems, lang) {
  const catTitle = cat.title[lang] || cat.title.tr;
  const hasSubs = Array.isArray(cat.subcategories) && cat.subcategories.length > 0;

  if (!hasSubs) {
    return `
      <section class="menu-category-section" id="cat-section-${cat.id}" aria-labelledby="cat-title-${cat.id}">
        <h2 class="category-title" id="cat-title-${cat.id}">
          <span>${catTitle}</span>
          <span class="category-count">${catItems.length}</span>
        </h2>
        <div class="items-grid">
          ${catItems.map(item => renderItemCard(item, lang)).join("")}
        </div>
      </section>
    `;
  }

  const showSubBar = state.activeCategory === cat.id && state.activeSubcategory !== null;
  const subBarHtml = showSubBar
    ? `
      <div class="subcategory-bar" role="group" aria-label="${catTitle}">
        <button type="button" class="subcategory-pill ${state.activeSubcategory === "all" ? "active" : ""}"
          data-subcategory="all" aria-pressed="${state.activeSubcategory === "all"}">
          ${t("allSubcategories")} <span class="subcategory-pill-count">(${catItems.length})</span>
        </button>
        ${cat.subcategories.map(sub => {
          const count = catItems.filter(i => i.subcategoryId === sub.id).length;
          if (count === 0) return "";
          const active = state.activeSubcategory === sub.id;
          return `
            <button type="button" class="subcategory-pill ${active ? "active" : ""}"
              data-subcategory="${sub.id}" aria-pressed="${active}">
              ${sub.title[lang] || sub.title.tr} <span class="subcategory-pill-count">(${count})</span>
            </button>
          `;
        }).join("")}
      </div>
    `
    : "";

  const effectiveSub = showSubBar && state.activeSubcategory ? state.activeSubcategory : "all";
  const visibleSubs = effectiveSub === "all"
    ? cat.subcategories
    : cat.subcategories.filter(s => s.id === effectiveSub);

  const visibleItemsCount = visibleSubs.reduce(
    (sum, sub) => sum + catItems.filter(i => i.subcategoryId === sub.id).length,
    0
  );

  const subGroupsHtml = visibleItemsCount > 0
    ? visibleSubs.map(sub => {
        const subItems = catItems.filter(i => i.subcategoryId === sub.id);
        if (subItems.length === 0) return "";
        return `
          <div class="subcategory-group" id="sub-group-${sub.id}">
            <h3 class="subcategory-title">
              <span>${sub.title[lang] || sub.title.tr}</span>
              <span class="subcategory-count">${subItems.length}</span>
            </h3>
            <div class="items-grid">
              ${subItems.map(item => renderItemCard(item, lang)).join("")}
            </div>
          </div>
        `;
      }).join("")
    : `
      <div style="padding: 32px 16px; text-align: center; color: var(--color-text-muted);">
        <p style="font-size: 1rem; font-weight: 600; margin-bottom: 8px;">${t("noResults")}</p>
        <button type="button" class="btn-text-reset" style="margin: 10px auto 0;" id="clear-filters-empty">
          ${t("resetFilters")}
        </button>
      </div>
    `;

  return `
    <section class="menu-category-section" id="cat-section-${cat.id}" aria-labelledby="cat-title-${cat.id}">
      <h2 class="category-title" id="cat-title-${cat.id}">
        <span>${catTitle}</span>
        <span class="category-count">${visibleItemsCount}</span>
      </h2>
      ${subBarHtml}
      ${subGroupsHtml}
    </section>
  `;
}

// Tek Bir Ürün Kartının HTML'i (Sade, Dikkat Edilecek Kısımlar & İncele Butonu)
function renderItemCard(item, lang) {
  const isSoldOut = item.available === false;
  const itemName = item.name[lang] || item.name.tr;

  // Diyet Etiketleri
  const tagLabels = {
    vegetarian: t("dietVegetarian"),
    vegan: t("dietVegan"),
    "gluten-free": t("dietGlutenFree"),
    mild: t("dietMild"),
    spicy: t("spicyTag")
  };

  const allergenLabels = {
    dairy: t("allergenDairy"),
    nuts: t("allergenNuts"),
    peanuts: t("allergenPeanuts"),
    gluten: t("allergenGluten")
  };

  const hasBadges = (item.tags && item.tags.length > 0) || (item.allergens && item.allergens.length > 0);

  return `
    <article class="item-card ${isSoldOut ? 'is-sold-out' : ''}" id="item-${item.id}" data-id="${item.id}" role="button" tabindex="0" aria-label="${itemName}, ${item.price} TL. ${t("viewDetails")}">
      ${isSoldOut ? `<span class="sold-out-badge">${t("soldOut")}</span>` : ''}
      
      <div class="item-header">
        <h3 class="item-name">${itemName}</h3>
        <span class="item-price">${item.price} TL</span>
      </div>

      <div class="item-card-row">
        <div class="item-badges" aria-label="Uyarılar">
          ${(item.tags || []).map(tKey => `
            <span class="tag-badge ${tKey === 'spicy' ? 'spicy' : ''}">${tagLabels[tKey] || tKey}</span>
          `).join("")}

          ${(item.allergens || []).map(aKey => `
            <span class="allergen-tag danger" title="${t("containsPrefix")} ${allergenLabels[aKey] || aKey}">⚠ ${t("containsPrefix")} ${allergenLabels[aKey] || aKey}</span>
          `).join("")}

          ${!hasBadges && !isSoldOut ? `
            <span class="allergen-safe-text">${t("safeNotice")}</span>
          ` : ''}
        </div>

        <button type="button" class="btn-item-detail" data-detail-id="${item.id}" aria-label="${itemName} ${t("viewDetails")}">
          <span>${t("viewDetails")}</span>
          <span class="btn-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  `;
}

// ==========================================================================
// 8. Dil Değiştirme Sistemi (TR / EN)
// ==========================================================================
function setLanguage(lang) {
  if (lang !== "tr" && lang !== "en") return;
  state.currentLang = lang;
  localStorage.setItem(APP_CONFIG.STORAGE_KEYS.LANG, lang);

  updateLanguageUI(lang);
  updateRestaurantHeader();
  renderCategoryTabs();
  renderMenu();

  announce(lang === "tr" ? "Dil Türkçe olarak değiştirildi." : "Language changed to English.");
}

function updateLanguageUI(lang) {
  document.documentElement.lang = lang;

  const trBtn = document.getElementById("lang-tr");
  const enBtn = document.getElementById("lang-en");
  if (trBtn && enBtn) {
    trBtn.classList.toggle("active", lang === "tr");
    trBtn.setAttribute("aria-pressed", lang === "tr" ? "true" : "false");
    enBtn.classList.toggle("active", lang === "en");
    enBtn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
  }

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (key && TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.textContent = TRANSLATIONS[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (key && TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
      el.placeholder = TRANSLATIONS[lang][key];
    }
  });

  const clearSearchBtn = document.getElementById("clear-search-btn");
  if (clearSearchBtn) clearSearchBtn.setAttribute("aria-label", t("clearSearchLabel"));

  const scrollTopBtn = document.getElementById("scroll-top-btn");
  if (scrollTopBtn) {
    scrollTopBtn.setAttribute("aria-label", t("backToTopLabel"));
    scrollTopBtn.setAttribute("title", t("backToTopLabel"));
  }
}

// ==========================================================================
// 9. Tema Yönetimi (Varsayılan Koyu Tema)
// ==========================================================================
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;

  // Varsayılan koyu tema; kullanıcı ancak elle "light" seçtiyse açık mod uygulanır
  const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME);
  const initialTheme = saved === "light" ? "light" : "dark";
  
  document.documentElement.setAttribute("data-theme", initialTheme);
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (meta) meta.content = initialTheme;

  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    if (meta) meta.content = newTheme;
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, newTheme);

    announce(newTheme === "dark" ? "Koyu tema açıldı." : "Açık tema açıldı.");
  });
}



// ==========================================================================
// 10. Filtre Olay Dinleyicileri
// ==========================================================================
function setupEventListeners() {
  // Dil butonları
  const trBtn = document.getElementById("lang-tr");
  const enBtn = document.getElementById("lang-en");
  if (trBtn) trBtn.addEventListener("click", () => setLanguage("tr"));
  if (enBtn) enBtn.addEventListener("click", () => setLanguage("en"));

  // Filtre Çekmecesi Aç/Kapa
  const toggleFiltersBtn = document.getElementById("toggle-filters-btn");
  const filterDrawer = document.getElementById("filter-drawer");
  const closeFiltersBtn = document.getElementById("close-filters-btn");
  if (toggleFiltersBtn && filterDrawer) {
    toggleFiltersBtn.addEventListener("click", () => {
      const willOpen = filterDrawer.hidden;
      filterDrawer.hidden = !willOpen;
      toggleFiltersBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  }
  if (closeFiltersBtn && filterDrawer && toggleFiltersBtn) {
    closeFiltersBtn.addEventListener("click", () => {
      filterDrawer.hidden = true;
      toggleFiltersBtn.setAttribute("aria-expanded", "false");
    });
  }

  // Arama Girişi ve Hızlı Temizleme
  const searchInput = document.getElementById("search-input");
  const clearSearchBtn = document.getElementById("clear-search-btn");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      renderMenu();
    });
  }
  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      state.searchQuery = "";
      renderMenu();
      searchInput.focus();
    });
  }

  // Mobilde Hızlı Yukarı Çıkma Butonu
  const scrollTopBtn = document.getElementById("scroll-top-btn");
  if (scrollTopBtn) {
    const syncScrollTopVisibility = () => {
      scrollTopBtn.hidden = window.scrollY < 320;
    };
    window.addEventListener("scroll", syncScrollTopVisibility, { passive: true });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Diyet Filtre Çipleri
  const dietChips = document.getElementById("diet-chips");
  if (dietChips) {
    dietChips.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const diet = chip.dataset.diet;
        if (state.activeDiets.has(diet)) {
          state.activeDiets.delete(diet);
          chip.setAttribute("aria-pressed", "false");
        } else {
          state.activeDiets.add(diet);
          chip.setAttribute("aria-pressed", "true");
        }
        renderMenu();
      });
    });
  }

  // Alerjen Gizleme Çipleri
  const allergenChips = document.getElementById("allergen-chips");
  if (allergenChips) {
    allergenChips.querySelectorAll(".chip-allergen").forEach(chip => {
      chip.addEventListener("click", () => {
        const allergen = chip.dataset.allergen;
        if (state.activeAllergens.has(allergen)) {
          state.activeAllergens.delete(allergen);
          chip.setAttribute("aria-pressed", "false");
        } else {
          state.activeAllergens.add(allergen);
          chip.setAttribute("aria-pressed", "true");
        }
        renderMenu();
      });
    });
  }

  // Fiyat Slider'ı
  const priceSlider = document.getElementById("price-range");
  const priceDisplay = document.getElementById("price-value-display");
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener("input", (e) => {
      const val = parseInt(e.target.value, 10);
      state.maxPrice = val;
      priceDisplay.textContent = `${val} TL`;
      renderMenu();
    });
  }

  // Filtreleri Sıfırla Butonları
  const resetBtn = document.getElementById("reset-filters-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetAllFilters);
  }
  const drawerResetBtn = document.getElementById("drawer-reset-btn");
  if (drawerResetBtn) {
    drawerResetBtn.addEventListener("click", resetAllFilters);
  }

  // Menü Kartı ve İncele Tıklama (Event Delegation)
  const menuContainer = document.getElementById("menu-container");
  if (menuContainer) {
    menuContainer.addEventListener("click", (e) => {
      const detailBtn = e.target.closest(".btn-item-detail");
      const card = e.target.closest(".item-card");
      if (detailBtn) {
        e.stopPropagation();
        const itemId = detailBtn.getAttribute("data-detail-id");
        if (itemId) openItemDetailModal(itemId);
      } else if (card) {
        const itemId = card.getAttribute("data-id");
        if (itemId) openItemDetailModal(itemId);
      }
    });

    menuContainer.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const card = e.target.closest(".item-card");
        if (card && e.target === card) {
          e.preventDefault();
          const itemId = card.getAttribute("data-id");
          if (itemId) openItemDetailModal(itemId);
        }
      }
    });
  }

  // Modal Kapatma Olayları
  const detailModal = document.getElementById("item-detail-modal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalCloseIconBtn = document.getElementById("modal-close-icon-btn");
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeItemDetailModal);
  if (modalCloseIconBtn) modalCloseIconBtn.addEventListener("click", closeItemDetailModal);
  if (detailModal) {
    detailModal.addEventListener("click", (e) => {
      if (e.target === detailModal) closeItemDetailModal();
    });
  }
}

// ==========================================================================
// 11. Ürün Detay Modalı (Dialog)
// ==========================================================================
function openItemDetailModal(itemId) {
  if (!state.menuData || !state.menuData.items) return;
  const item = state.menuData.items.find(i => i.id === itemId);
  if (!item) return;

  const modal = document.getElementById("item-detail-modal");
  if (!modal) return;

  const lang = state.currentLang;
  const itemName = item.name[lang] || item.name.tr;
  const itemStory = item.story[lang] || item.story.tr;
  const prepTime = item.prepTime ? (item.prepTime[lang] || item.prepTime.tr) : null;
  const portion = item.portion ? (item.portion[lang] || item.portion.tr) : null;
  const isSoldOut = item.available === false;

  const tagLabels = {
    vegetarian: t("dietVegetarian"),
    vegan: t("dietVegan"),
    "gluten-free": t("dietGlutenFree"),
    mild: t("dietMild"),
    spicy: t("spicyTag")
  };

  const allergenLabels = {
    dairy: t("allergenDairy"),
    nuts: t("allergenNuts"),
    peanuts: t("allergenPeanuts"),
    gluten: t("allergenGluten")
  };

  // Başlık ve Fiyat
  const titleEl = document.getElementById("modal-item-title");
  const priceEl = document.getElementById("modal-item-price");
  if (titleEl) titleEl.textContent = itemName;
  if (priceEl) priceEl.textContent = `${item.price} TL`;

  // Tükendi Uyarısı
  const soldOutEl = document.getElementById("modal-sold-out-alert");
  if (soldOutEl) {
    if (isSoldOut) {
      soldOutEl.textContent = `⚠️ Bu lezzet şu anda tükenmiştir (${t("soldOut")}).`;
      soldOutEl.removeAttribute("hidden");
    } else {
      soldOutEl.setAttribute("hidden", "");
    }
  }

  // Hikaye / Açıklama
  const storyEl = document.getElementById("modal-item-story");
  if (storyEl) storyEl.textContent = itemStory;

  // Hazırlık Süresi ve Porsiyon
  const metaGrid = document.getElementById("modal-meta-grid");
  if (metaGrid) {
    let metaHtml = "";
    if (prepTime) {
      metaHtml += `
        <div class="modal-meta-card">
          <span class="modal-meta-label">
            <svg class="icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="12 6 12 12 15 14" fill="none" stroke="currentColor" stroke-width="2"/></svg>
            ${t("prepPrefix")}
          </span>
          <span class="modal-meta-val">${prepTime}</span>
        </div>
      `;
    }
    if (portion) {
      metaHtml += `
        <div class="modal-meta-card">
          <span class="modal-meta-label">
            <svg class="icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
            ${t("portionPrefix")}
          </span>
          <span class="modal-meta-val">${portion}</span>
        </div>
      `;
    }
    metaGrid.innerHTML = metaHtml;
  }

  // Diyet & Alerjen Bilgileri
  const badgesList = document.getElementById("modal-badges-list");
  if (badgesList) {
    const tags = item.tags || [];
    const allergens = item.allergens || [];
    let bHtml = "";

    if (tags.length === 0 && allergens.length === 0) {
      bHtml = `<span class="modal-badge-neutral">${t("noAllergensNote")}</span>`;
    } else {
      tags.forEach(tKey => {
        bHtml += `<span class="tag-badge ${tKey === 'spicy' ? 'spicy' : ''}">${tagLabels[tKey] || tKey}</span>`;
      });
      allergens.forEach(aKey => {
        bHtml += `<span class="allergen-tag danger" title="${t("containsPrefix")} ${allergenLabels[aKey] || aKey}">⚠️ ${t("containsPrefix")} ${allergenLabels[aKey] || aKey}</span>`;
      });
    }
    badgesList.innerHTML = bHtml;
  }

  // Etiketler & Buton Çevirileri
  const closeBtn = document.getElementById("modal-close-btn");
  if (closeBtn) closeBtn.textContent = t("closeModal");
  const closeIconBtn = document.getElementById("modal-close-icon-btn");
  if (closeIconBtn) closeIconBtn.setAttribute("aria-label", t("closeModal"));
  const allergenHeading = document.getElementById("modal-allergen-heading");
  if (allergenHeading) allergenHeading.textContent = t("allergenWarningTitle");

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }

  announce(`${itemName} detayları açıldı.`);
}

function closeItemDetailModal() {
  const modal = document.getElementById("item-detail-modal");
  if (!modal) return;
  if (typeof modal.close === "function") {
    modal.close();
  } else {
    modal.removeAttribute("open");
  }
}

function resetAllFilters() {
  state.searchQuery = "";
  state.activeSubcategory = null;
  state.activeDiets.clear();
  state.activeAllergens.clear();
  
  const searchInput = document.getElementById("search-input");
  if (searchInput) searchInput.value = "";

  document.querySelectorAll("#diet-chips .chip").forEach(c => c.setAttribute("aria-pressed", "false"));
  document.querySelectorAll("#allergen-chips .chip-allergen").forEach(c => c.setAttribute("aria-pressed", "false"));

  if (state.menuData) {
    const maxItemPrice = Math.max(...state.menuData.items.map(i => i.price), 520);
    state.maxPrice = maxItemPrice;
    const priceSlider = document.getElementById("price-range");
    const priceDisplay = document.getElementById("price-value-display");
    if (priceSlider && priceDisplay) {
      priceSlider.value = maxItemPrice;
      priceDisplay.textContent = `${maxItemPrice} TL`;
    }
  }

  renderMenu();
  announce(state.currentLang === "tr" ? "Filtreler temizlendi." : "Filters reset.");
}

// Sayfa yüklendiğinde başlat
document.addEventListener("DOMContentLoaded", initApp);
