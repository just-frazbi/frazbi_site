// ну чтобы пкм нельзя быо тык
document.addEventListener('contextmenu', e => e.preventDefault());

// =============================================
// INTRO — LIQUID GLASS + LETTERS ASSEMBLE
// =============================================
(function () {
    const intro = document.getElementById('intro-screen');
    if (!intro) return;

    document.body.classList.add('intro-active');

    const letters = Array.from(document.querySelectorAll('.il'));
    const sub     = document.getElementById('intro-sub');
    const line    = document.getElementById('ig-line');

    // Each letter flies in from a different edge/direction
    // Directions: spread evenly from 6 sides so word "assembles"
    const origins = [
        { x: -140, y: -120, r: -35, s: 0.4 },  // f  — top-left
        { x:  0,   y: -160, r:  15, s: 0.45 },  // r  — top
        { x:  130, y: -100, r:  28, s: 0.4 },   // a  — top-right
        { x: -130, y:  110, r: -25, s: 0.45 },  // z  — bottom-left
        { x:  0,   y:  155, r: -12, s: 0.4 },   // b  — bottom
        { x:  140, y:  100, r:  30, s: 0.38 },  // 1  — bottom-right
    ];

    // Scale by screen size
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const scale = Math.max(vw, 600) / 600;

    // Set initial scattered positions
    letters.forEach((el, i) => {
        const o = origins[i];
        const tx = o.x * scale * (1.8 + Math.random() * 0.6);
        const ty = o.y * scale * (1.8 + Math.random() * 0.6);
        el.style.transition = 'none';
        el.style.opacity    = '0';
        el.style.transform  = `translate(${tx}px, ${ty}px) rotate(${o.r * 2}deg) scale(${o.s})`;
    });

    // --- Progress line animation (JS driven for smoothness) ---
    let lineProgress = 0;
    const TOTAL_MS   = 5200; // total intro duration
    const lineStart  = performance.now();
    function tickLine(now) {
        const elapsed = now - lineStart;
        const t = Math.min(elapsed / TOTAL_MS, 1);
        // ease: slow start, fast middle, slow end
        const eased = t < 0.5
            ? 2 * t * t
            : 1 - Math.pow(-2 * t + 2, 2) / 2;
        lineProgress = eased * 100;
        if (line) line.style.width = lineProgress + '%';
        if (t < 1) requestAnimationFrame(tickLine);
    }
    requestAnimationFrame(tickLine);

    // Phase 1: flash letters in at random positions (barely visible)
    setTimeout(() => {
        letters.forEach((el) => {
            el.style.transition = 'opacity 0.8s ease';
            el.style.opacity    = '0.15';
        });
    }, 250);

    // Phase 2: letters assemble into word — staggered
    const ASSEMBLE_START = 1100;
    const STAGGER        = 160; // ms between each letter

    letters.forEach((el, i) => {
        setTimeout(() => {
            el.style.transition = `transform 1.6s cubic-bezier(0.16, 1, 0.3, 1),
                                   opacity  0.9s ease`;
            el.style.transform  = 'translate(0,0) rotate(0deg) scale(1)';
            el.style.opacity    = '1';
        }, ASSEMBLE_START + i * STAGGER);
    });

    // Phase 3: after last letter lands, show "портфолио"
    const LAST_LETTER_DONE = ASSEMBLE_START + (letters.length - 1) * STAGGER + 1600 + 250;
    setTimeout(() => {
        if (sub) sub.classList.add('sub-show');
    }, LAST_LETTER_DONE);

    // Phase 4: iris-close exit
    const EXIT_AT = LAST_LETTER_DONE + 1200;
    setTimeout(() => {
        intro.classList.add('intro-exit');
        document.body.classList.remove('intro-active');
        document.body.classList.add('intro-done');

        setTimeout(() => {
            intro.remove();
            document.body.classList.remove('intro-done');
        }, 1500);
    }, EXIT_AT);
})();


// =============================================
// НОВОЕ: ТЕМА
// =============================================
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;

function applyTheme(theme) {
    document.documentElement.classList.remove('dark-theme', 'light-theme');
    document.body.classList.remove('dark-theme', 'light-theme');
    document.documentElement.classList.add(theme + '-theme');
    if (themeIcon) themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('fraz_theme', theme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark-theme');
        applyTheme(isDark ? 'light' : 'dark');
        if (themeIcon) {
            themeIcon.style.transform = 'rotate(360deg) scale(1.3)';
            setTimeout(() => { themeIcon.style.transform = ''; }, 350);
        }
    });
}

applyTheme(localStorage.getItem('fraz_theme') || 'dark');

// =============================================
// НОВОЕ: МОБИЛЬНОЕ МЕНЮ
// =============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksEl = document.getElementById('nav-links');

if (mobileMenuBtn && navLinksEl) {
    mobileMenuBtn.addEventListener('click', () => {
        const isOpen = navLinksEl.classList.toggle('open');
        mobileMenuBtn.classList.toggle('open', isOpen);
    });

    navLinksEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinksEl.classList.remove('open');
            mobileMenuBtn.classList.remove('open');
        });
    });
}

// =============================================
// ОРИГИНАЛЬНЫЙ КОД (не тронут)
// =============================================

// язычки
const translations = {
    ru: {
        nav_home: "Главная", nav_about: "Обо мне", nav_projects: "Проекты",
        discord_label: "Дискорд для контакта",
        copy_hint: "Кликните, чтобы скопировать",
        copy_success: "Скопировано!",
        about_title: "Обо мне",
        about_p1: "Привет, меня зовут Фразби (frazb1). Я фронтенд разработчик и занимаюсь программированием.",
        about_p2: "Я создаю современные сайты, разрабатываю кастомные плагины и занимаюсь комплексной разработкой Minecraft серверов.",
        about_p3: "Также я делаю серверы на заказ и создаю уникальные системы для игровых проектов.",
        about_p4: "А также кроме плагинов, я хорошо владею Photoshop'ом - делаю префиксы, ресурспаки на сервера.",
        about_p5: "Я активно участвую в жизни сообщества: публикую бесплатные плагины на Modrinth.",
        projects_title: "Текущие проекты",
        old_title: "Старые проекты",
        status_dev: "В разработке", 
        status_active: "Активно",
        status_closed: "Закрыт",
        onevnl_desc: `OneVnl — уникальный Vanilla+ сервер моего друга <a href="https://elytrya.icu" target="_blank" class="elytrya-link">elytrya</a>. На этом проекте я создаю уникальные префиксы, провожу ивенты и строю лобби при каждом новом вайпе.`,
        multy_desc: "Сервер анархии на заказ. 30% функционала реализовано через мои кастомные плагины.",
        worldclans_desc: "Кастомный проект сервера анархии. Включал уникальную клановую систему.",
        artheria_desc: "Европейский проект. Разработка сложных механик и кастомных плагинов под ключ.",
        linked_with: "Связан с ",
        modrinth_text: "Я публикую бесплатные плагины для Minecraft в своем профиле. Поддержите Open Source проекты.",
        modrinth_btn: "Открыть профиль",
        footer_note: "сделано с любовьюююю 🩷"
    },
    en: {
        nav_home: "Home", nav_about: "About", nav_projects: "Projects",
        discord_label: "Discord for contact",
        copy_hint: "Click to copy",
        copy_success: "Copied!",
        about_title: "About Me",
        about_p1: "Hi, my name is Frazbi (frazb1). I'm a developer and enthusiast.",
        about_p2: "I create websites, plugins and handle complex Minecraft server dev.",
        about_p3: "I also make custom servers and create unique systems for gaming projects.",
        about_p4: "Besides plugins, I am also proficient in Photoshop - I make prefixes and resource packs for servers.",        
        about_p5: "I'm actively involved in the community, publishing free plugins on Modrinth.",
        projects_title: "Current Projects",
        old_title: "Archive",
        status_dev: "Developing", 
        status_active: "Active",
        status_closed: "Closed",
        onevnl_desc: `OneVnl — a unique Vanilla+ server by my friend <a href="https://elytrya.icu" target="_blank" class="elytrya-link">elytrya</a>. I create custom prefixes, host events and build lobbies for every wipe.`,
        multy_desc: "Commissioned anarchy server. 30% built on my custom plugins.",
        worldclans_desc: "Custom server project with unique clan system.",
        artheria_desc: "European project. Complex mechanics and custom dev.",
        linked_with: "Linked with ",
        modrinth_text: "I publish free plugins for Minecraft on my profile.",
        modrinth_btn: "View Profile",
        footer_note: "made with love 🩷"
    }
};

function changeLanguage(lang) {
    const overlay = document.getElementById('fade-overlay');
    const indicator = document.getElementById('lang-indicator');
    if (indicator) indicator.style.left = lang === 'en' ? '44px' : '4px';
    overlay.style.opacity = '0';
    
    setTimeout(() => {
        localStorage.setItem('fraz_lang', lang);
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            if (translations[lang][key]) {
                if (key === 'onevnl_desc') {
                    el.innerHTML = translations[lang][key];
                } else {
                    el.textContent = translations[lang][key];
                }
            }
        });
        document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.getElementById(`btn-${lang}`);
        if (activeBtn) activeBtn.classList.add('active');
        overlay.style.opacity = '1';
    }, 400);
}

// курсор   
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
window.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    outline.animate({ left: (e.clientX - 17) + 'px', top: (e.clientY - 17) + 'px' }, { duration: 400, fill: "forwards" });
});

// навигатион
let lastScrollTop = 0;
const navbar = document.getElementById("main-nav");
window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 250) {
        navbar.classList.add("nav-hidden");
        if (navLinksEl) navLinksEl.classList.remove('open');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('open');
    } else {
        navbar.classList.remove("nav-hidden");
    }
    lastScrollTop = scrollTop;
});

// копировать дс
function copyDiscordTag() {
    const tag = "@goo_23";
    const status = document.getElementById("copy-status");
    const currentLang = localStorage.getItem('fraz_lang') || 'ru';
    navigator.clipboard.writeText(tag).then(() => {
        status.textContent = translations[currentLang].copy_success;
        status.style.opacity = "1";
        setTimeout(() => {
            status.style.opacity = "0";
            setTimeout(() => { status.textContent = translations[currentLang].copy_hint; }, 300);
        }, 2000);
    });
}

// скорл эффекты
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1 });

window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    changeLanguage(localStorage.getItem('fraz_lang') || 'ru');
});