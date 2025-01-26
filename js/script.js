const translations = {
    ru: {
        logoText: "ИгроФабрика",
        projects: "Проекты",
        about: "О нас",
        contact: "Контакты",
        heroTitle: "Создаём игры мечты",
        heroSubtitle: "Профессиональная разработка игр с 2024 года",
        viewProjects: "Наши проекты",
        ourGames: "Наши игры",
        ourProjects: "Наши проекты",
        aboutText: 'Мы крутое сообщество создателей ПО и контента "ИгроФабрика" 😎 Переходи на нашу сторону! 😉.',
        contactText: "Контакты: *В разработке*",
        copyright: "© 2025 ИгроФабрика. Все права защищены",
        socialTitle: "Мы в соцсетях",
        socialVK: "ВКонтакте",
        socialTG: "Telegram",
        socialYT: "YouTube",
        usefulLinks: "Полезные ссылки",
        linkDocs: "Документация",
        linkBlog: "Блог разработчиков",
        linkCareers: "Вакансии",
        cooperation: "Сотрудничество",
        linksTitle: "Полезное",
        linkPress: "Пресс-центр",
        projectTitle: "Детали проекта",
        projectName: "Космические Рейнджеры",
        releaseDate: "Дата выхода:",
        platforms: "Платформы:",
        playDemo: "Играть в демо",
        viewTrailer: "Смотреть трейлер",
        backToProjects: "← К проектам",
        viewDetails: "Подробнее",
        noProjects: "Проекты не найдены",
    },
    en: {
        logoText: "GameFactory",
        projects: "Projects",
        about: "About",
        contact: "Contact",
        heroTitle: "Creating Dream Games",
        heroSubtitle: "Professional game development since 2024",
        viewProjects: "Our Projects",
        ourProjects: "Our Projects",
        aboutText: 'We are a cool community of creators of software and content "Game Factory" 😎 Come over to our side! 😉.',
        contactText: "Contacts: *Develop*",
        copyright: "© 2025 GameFactory. All rights reserved",
        socialTitle: "Follow Us",
        socialVK: "VKontakte",
        socialTG: "Telegram",
        socialYT: "YouTube",
        usefulLinks: "Useful Links",
        linkDocs: "Documentation",
        linkBlog: "Dev Blog",
        linkCareers: "Careers",
        cooperation: "Partnership",
        linksTitle: "Resources",
        linkPress: "Press Center",
        projectTitle: "Project Details",
        projectName: "Space Rangers",
        releaseDate: "Release Date:",
        platforms: "Platforms:",
        playDemo: "Play Demo",
        viewTrailer: "Watch Trailer",
        backToProjects: "← Back to Projects",
        viewDetails: "View Details",
        noProjects: "No projects found",
    }
};

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function toggleLanguage() {
    const currentLang = document.documentElement.getAttribute('lang');
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('language', newLang);
    applyTranslations(newLang);
    updateLangButton(newLang);
}

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = translations[lang][key];
    });
}

function updateLangButton(lang) {
    //document.querySelector('.lang-toggle').textContent = lang.toUpperCase();
}

// Инициализация переключателей
function initSwitches() {
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    
    // Тема
    themeToggle.checked = localStorage.getItem('theme') === 'light';
    themeToggle.addEventListener('change', toggleTheme);
    
    // Язык
    langToggle.checked = localStorage.getItem('language') === 'en';
    langToggle.addEventListener('change', toggleLanguage);
}

// Обновленный toggleTheme
function toggleTheme() {
    const newTheme = this.checked ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Обновленный toggleLanguage
function toggleLanguage() {
    const newLang = this.checked ? 'en' : 'ru';
    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('language', newLang);
    applyTranslations(newLang);
    updateLangSwitch(newLang);
}

// Обновление положения языкового переключателя
function updateLangSwitch(lang) {
    const langToggle = document.getElementById('langToggle');
    langToggle.checked = lang === 'en';
}

// В init функциях
document.addEventListener('DOMContentLoaded', () => {
    initSwitches();
    
    // Тема
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Язык
    const savedLang = localStorage.getItem('language') || 'ru';
    document.documentElement.setAttribute('lang', savedLang);
    applyTranslations(savedLang);
    updateLangButton(savedLang);
});

