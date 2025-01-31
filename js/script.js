const translations = {
    ru: {
        logoText: "ИгроФабрика",
        projects: "Проекты",
        about: "О нас",
        contact: "Контакты",
        heroTitle: "Формируем будущее вместе",
        heroSubtitle: "Профессиональная разработка с 2024 года",
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
        heroTitle: "Shaping the future together",
        heroSubtitle: "Professional development since 2024",
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


 // Загрузка header
 fetch('./widgets/nav.html')
 .then(response => response.text())
 .then(data => {

    document.getElementById('navbar').innerHTML = data;

    // Загрузка footer
    fetch('./widgets/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('contact').innerHTML = data;
        initSwitches();
        applyTranslations(localStorage.getItem('language'));
    });
 });


 function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

function toggleLanguage() {
    //const currentLang = document.documentElement.getAttribute('lang');
    const currentLang = localStorage.getItem('language');
    
    const newLang = currentLang === 'ru' ? 'en' : 'ru';

    document.documentElement.setAttribute('lang', newLang);
    localStorage.setItem('language', newLang);
    applyTranslations(newLang);
    updateLangButton(newLang);
}


function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        //console.log(el, key, lang, translations[lang]);
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
    //themeToggle.checked = localStorage.getItem('theme') === 'light';
    //themeToggle.addEventListener('change', toggleTheme);
    
    // Язык
    langToggle.checked = localStorage.getItem('language') === 'en';
    langToggle.addEventListener('change', toggleLanguage);
}


async function loadProjects() {
    try {
        const response = await fetch('./data/projects.json');
        if (!response.ok) throw new Error('Network error');
        const data = await response.json();
        return data.projects;
    } catch (error) {
        console.error('Error loading projects:', error);
        return [];
    }
}

function renderProjectCard(project, lang) {
    if(project["isEnableView"] == false) return '';
    return `
        <div class="project-card">
            <div class="mini-slider">
                <div class="slides-container">
                    ${project.images.map((img, index) => `
                        <div class="mini-slide ${index === 0 ? 'active' : ''}">
                            <img src="${img}" alt="${project[lang].title}">
                        </div>
                    `).join('')}
                </div>
                <div class="mini-dots">
                    ${project.images.map((_, index) => `
                        <span class="mini-dot ${index === 0 ? 'active' : ''}"></span>
                    `).join('')}
                </div>
            </div>
            <div class="project-info">
                <h3>${project[lang].title}</h3>
                <p>${project[lang].description}</p>
            </div>
            <div class="project-actions">
                <a href="project.html?id=${project.id}" class="btn" data-i18n="viewDetails">Подробнее</a>
            </div>
        </div>
    `;
}



// Инициализация мини-слайдеров
function initMiniSliders() {
    document.querySelectorAll('.project-card').forEach(card => {
        const slides = card.querySelectorAll('.mini-slide');
        const dots = card.querySelectorAll('.mini-dot');
        let currentSlide = 0;

        // Автопереключение
        const autoSlide = () => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        let interval = setInterval(autoSlide, 5000);

        // Обработчики для точек
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(interval);
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                currentSlide = index;
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
                interval = setInterval(autoSlide, 5000);
            });
        });

        // Пауза при наведении
        card.addEventListener('mouseenter', () => clearInterval(interval));
        card.addEventListener('mouseleave', () => interval = setInterval(autoSlide, 5000));
    });
}

async function BindToggleLanguage() {
    const projects = await loadProjects();
    const lang = localStorage.getItem('language');
    const container = document.querySelector('.projects-grid');

    if(projects.length > 0) {
        container.innerHTML = projects.map(p => renderProjectCard(p, lang)).join('');
        initMiniSliders();
    } else {
        container.innerHTML = '<p data-i18n="noProjects">Проекты не найдены</p>';
    }
    applyTranslations(lang);
}




// В инициализации
document.addEventListener('DOMContentLoaded', async () => {
    const projects = await loadProjects();
    const lang = localStorage.getItem('language');
    const container = document.querySelector('.projects-grid');

    if(projects.length > 0) {
        container.innerHTML = projects.map(p => renderProjectCard(p, lang)).join('');
        initMiniSliders();
    } else {
        container.innerHTML = '<p data-i18n="noProjects">Проекты не найдены</p>';
    }

    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('change', BindToggleLanguage);
});

