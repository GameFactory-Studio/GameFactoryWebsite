const translations = {
    ru: {
        logoText: "ИгроФабрика",
        games: "Игры",
        about: "О нас",
        contact: "Контакты",
        heroTitle: "Создаём игры мечты",
        heroSubtitle: "Профессиональная разработка игр с 2018 года",
        viewProjects: "Наши проекты",
        ourGames: "Наши игры",
        aboutText: "ИгроФабрика - современная студия разработки...",
        contactText: "Контакты: contact@gamefabrika.ru",
        copyright: "© 2023 ИгроФабрика. Все права защищены"
    },
    en: {
        logoText: "GameFactory",
        games: "Games",
        about: "About",
        contact: "Contact",
        heroTitle: "Creating Dream Games",
        heroSubtitle: "Professional game development since 2018",
        viewProjects: "Our Projects",
        ourGames: "Our Games",
        aboutText: "GameFactory is a modern development studio...",
        contactText: "Contacts: contact@gamefabrika.ru",
        copyright: "© 2023 GameFactory. All rights reserved"
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
    document.querySelector('.lang-toggle').textContent = lang.toUpperCase();
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Тема
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Язык
    const savedLang = localStorage.getItem('language') || 'ru';
    document.documentElement.setAttribute('lang', savedLang);
    applyTranslations(savedLang);
    updateLangButton(savedLang);
});
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
    // Остальная инициализация
});