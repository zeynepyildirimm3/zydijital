/**
 * AURELIUS & PARTNERS - ULTRA-LUXURY LAW FIRM SCRIPT
 * Clean luxury interactions, 3D model controls, live global office clocks,
 * and practice area modal dossiers. (No mouse follower, no sound).
 */

document.addEventListener('DOMContentLoaded', () => {
    // Alt sayfa ziyaretlerinde bayrak bırak: kullanıcı diğer sayfalardan ana sayfaya tıklar ise intro atlanır
    try {
        var path = window.location.pathname;
        if (!path.endsWith('index.html') && path !== '/' && path !== '') {
            sessionStorage.setItem('navigated_from_subpage', 'true');
        } else {
            // Ana sayfadayken alt sayfa bayrağını temizle (böylece F5/yenilemede intro her zaman açılır)
            sessionStorage.removeItem('navigated_from_subpage');
        }
    } catch (e) {}

/* ==========================================================================
       1. BLENDER 3D MODEL VIEWER CONTROLS
       ========================================================================== */
        const viewer = document.getElementById('scales3DViewer');
    if (viewer) {
        viewer.removeAttribute('camera-target');
        viewer.cameraOrbit = '0deg 75deg 13m';
        viewer.minCameraOrbit = 'auto 75deg 13m';
        viewer.maxCameraOrbit = 'auto 75deg 13m';
        viewer.setAttribute('disable-zoom', '');
        viewer.setAttribute('disable-pan', '');
    }
    const autoRotateBtn = document.getElementById('toggleAutoRotateBtn');
    const presetCamBtns = document.querySelectorAll('.btn-preset-cam[data-orbit]');

    if (viewer && autoRotateBtn) {
        autoRotateBtn.addEventListener('click', () => {
            const isAuto = viewer.hasAttribute('auto-rotate');
            if (isAuto) {
                viewer.removeAttribute('auto-rotate');
                autoRotateBtn.classList.remove('active');
                autoRotateBtn.innerHTML = '<i class="fa-solid fa-play text-gold"></i> Dönüşü Başlat';
            } else {
                viewer.setAttribute('auto-rotate', '');
                autoRotateBtn.classList.add('active');
                autoRotateBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate text-gold"></i> Dönüşü Durdur';
            }
        });
    }

    presetCamBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            presetCamBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const orbit = btn.getAttribute('data-orbit');
            if (viewer && orbit) {
                viewer.cameraOrbit = orbit;
            }
        });
    });

    
    /* IntersectionObserver: 3D model sadece ekranda görünürken çalışır,
       ekranda yokken WebGL durur, mobilde batarya ve işlemciyi koruyup kasmayı önler */
    if (viewer && 'IntersectionObserver' in window) {
        let isUserManuallyRotating = true;
        if (autoRotateBtn) {
            autoRotateBtn.addEventListener('click', () => {
                isUserManuallyRotating = viewer.hasAttribute('auto-rotate');
            });
        }
        const viewerPerfObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (isUserManuallyRotating) viewer.setAttribute('auto-rotate', '');
                } else {
                    viewer.removeAttribute('auto-rotate');
                }
            });
        }, { threshold: 0.05 });
        viewerPerfObserver.observe(viewer);
    }

    /* ==========================================================================
       2. PANORAMA RESİMLERİ (SEKMELERE GİDİŞ ANAHTARLARI)
       Her resim doğrudan kendi özel sekmesine/sayfasına yönlendirir.
       ========================================================================== */
    // Doğrudan HTML anchor (href) ile kesintisiz sekme geçişi sağlanır.

    /* ==========================================================================
       3. LIVE WORLD CLOCKS (ISTANBUL, LONDON, GENEVA, NEW YORK)
       ========================================================================== */
    function updateWorldClocks() {
        const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
        
        const now = new Date();
        const ist = new Intl.DateTimeFormat('tr-TR', { ...timeOptions, timeZone: 'Europe/Istanbul' }).format(now);
        const lon = new Intl.DateTimeFormat('en-GB', { ...timeOptions, timeZone: 'Europe/London' }).format(now);
        const gva = new Intl.DateTimeFormat('fr-CH', { ...timeOptions, timeZone: 'Europe/Zurich' }).format(now);
        const nyc = new Intl.DateTimeFormat('en-US', { ...timeOptions, timeZone: 'America/New_York' }).format(now);

        const elIst = document.getElementById('time-ist');
        const elLon = document.getElementById('time-lon');
        const elGva = document.getElementById('time-gva');
        const elNyc = document.getElementById('time-nyc');

        if (elIst) elIst.textContent = ist;
        if (elLon) elLon.textContent = lon;
        if (elGva) elGva.textContent = gva;
        if (elNyc) elNyc.textContent = nyc;
    }
    updateWorldClocks();
    setInterval(updateWorldClocks, 30000);

    /* ==========================================================================
       4. MOBILE DRAWER NAVIGATION
       ========================================================================== */
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const closeDrawerBtn = document.getElementById('closeDrawerBtn');

    if (mobileBtn && mobileDrawer) {
        mobileBtn.addEventListener('click', () => {
            mobileDrawer.classList.toggle('active');
        });
    }
    if (closeDrawerBtn && mobileDrawer) {
        closeDrawerBtn.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
        });
    }
    // Close drawer when link clicked
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileDrawer) mobileDrawer.classList.remove('active');
        });
    });

    /* ==========================================================================
       5. CONSULTATION FORM SUBMISSION
       ========================================================================== */
    const form = document.getElementById('consultationForm');
    const feedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('submitFormBtn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Güvenli İletim Sağlanıyor...';
            }

            setTimeout(() => {
                if (feedback) {
                    feedback.classList.remove('hidden');
                    feedback.innerHTML = `
                        <div style="font-weight: 600; color: #FFF1BD; margin-bottom: 0.35rem;">
                            <i class="fa-solid fa-circle-check text-gold"></i> Başvurunuz En Üst Düzey Gizlilik Protokolü ile Kaydedildi.
                        </div>
                        <div style="font-size: 0.8rem; color: #CBD5E1;">
                            Referans No: <strong>AP-2026-${Math.floor(100000 + Math.random() * 900000)}</strong> &bull; 
                            Kıdemli dava ortağımız en geç 2 saat içerisinde belirttiğiniz güvenli irtibat kanalı üzerinden sizinle iletişime geçecektir.
                        </div>
                    `;
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<span>Talebiniz Alındı</span> <i class="fa-solid fa-check"></i>';
                }
                form.reset();
            }, 1200);
        });
    }

    /* ==========================================================================
       6. KEYBOARD ACCESSIBILITY (ENTER / SPACE KEY FOR CARDS)
       ========================================================================== */
    const panoramaCards = document.querySelectorAll('.panorama-slice');
    panoramaCards.forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

        /* ==========================================================================
       7. SADE VE ZARİF MİNİMAL İNTRO (TEMAS BEKLEMEZ)
       ========================================================================== */
    const entranceGate = document.getElementById('luxuryEntranceGate');
    let introTimer = null;
    let gateDismissed = false;

    function dismissGate() {
        if (!entranceGate || gateDismissed) return;
        gateDismissed = true;
        if (introTimer) clearTimeout(introTimer);
        entranceGate.classList.add('gate-dismissed');
        document.body.style.overflow = '';
        setTimeout(() => {
            entranceGate.style.display = 'none';
        }, 750);
    }

    if (entranceGate) {
        document.body.style.overflow = 'hidden';

        // Sade intro: 1.7 saniye sonra sessizce ve kendiliğinden açılır
        introTimer = setTimeout(() => {
            dismissGate();
        }, 1700);

        // İsterse ekrana dokunarak beklemeden de hemen açabilir
        entranceGate.addEventListener('click', () => {
            dismissGate();
        });

        window.addEventListener('keydown', () => {
            if (!gateDismissed) {
                dismissGate();
            }
        });
    }

    /* ==========================================================================
       8. MOBİL GÖRSEL SAYFA NOKTALARI (PAGINATION DOTS) SENKRONİZASYONU
       Kaydırıldıkça o anki sayfanın noktası sarı yanar, tıklanınca o sayfaya gider.
       ========================================================================== */
    const panoramaStrip = document.getElementById('seamlessPanorama');
    const panoramaDots = document.querySelectorAll('.p-dot');

    if (panoramaStrip && panoramaDots.length > 0) {
        let scrollTimeout;

        function updateActiveDot() {
            const scrollLeft = panoramaStrip.scrollLeft;
            const cardWidth = panoramaStrip.offsetWidth || window.innerWidth;
            if (cardWidth <= 0) return;

            const activeIndex = Math.min(
                panoramaDots.length - 1, 
                Math.max(0, Math.round(scrollLeft / cardWidth))
            );

            panoramaDots.forEach((dot, idx) => {
                if (idx === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        panoramaStrip.addEventListener('scroll', () => {
            if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
            scrollTimeout = requestAnimationFrame(updateActiveDot);
        }, { passive: true });

        panoramaDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
                const cardWidth = panoramaStrip.offsetWidth || window.innerWidth;
                panoramaStrip.scrollTo({
                    left: targetIdx * cardWidth,
                    behavior: 'smooth'
                });
            });
        });

        // Sayfa yüklendiğinde ilk durumu ayarla
        updateActiveDot();
    }

});