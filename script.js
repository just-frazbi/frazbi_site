// ну чтобы пкм нельзя быо тык
document.addEventListener('contextmenu', e => e.preventDefault());

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