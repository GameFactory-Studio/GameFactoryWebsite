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

        loadProjectDetails();

        const langToggle = document.getElementById('langToggle');
        langToggle.addEventListener('change', BindToggleLanguageProjectInfo);
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

async function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');

    if(!projectId) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch('./data/projects.json');
        const data = await response.json();
        const project = data.projects.find(p => p.id == projectId);
        
        if(!project) throw new Error('Project not found');
        renderProjectDetails(project);
    } catch (error) {
        console.error('Error:', error);
        //window.location.href = 'index.html';
    }
}

function renderProjectDetails(project) {
    if(project["isEnableView"] == false) return;
    console.log(project);
    const lang = localStorage.getItem('language');
    const container = document.getElementById('project-container');
    
    
    fetch(project[lang]['render-description'])
    .then(response => response.text())
    .then(render_description => {
        console.log(render_description);
        const html = `
        <div class="project-slider">
            ${renderSlider(project.images)}
        </div>

        <div class="project-info">
            <h1>${project[lang].title}</h1>
            <div class="project-meta">
                <span>${project[lang].release_date}</span>
                <span>${project[lang].platforms}</span>
            </div>
            <p class="project-description">${render_description}</p>
            
            <div class="project-links">
                <!-- <a href="${project.links.demo}" class="btn" data-i18n="playDemo">Играть в демо</a>-->
                <!-- <a href="${project.links.trailer}" class="btn" data-i18n="viewTrailer">Смотреть трейлер</a>-->
                <a href="index.html#projects" class="btn back-btn" data-i18n="backToProjects">← К проектам</a>
            </div>
        </div>
        `;

        container.innerHTML = html;
        applyTranslations(lang); // Применяем переводы
        initSlider(); // Инициализация слайдера
    });


}

function renderSlider(images) {
    return `
        <div class="slides">
            ${images.map((img, index) => {
                if(index == 0) 
                    return `<div class="slide active">
                                <img src="${img}" alt="Иллюстрация проекта">
                            </div>`; 
                else return `<div class="slide">
                                <img src="${img}" alt="Иллюстрация проекта">
                            </div>`;
            }).join('')}
            <button class="slider-btn prev">❮</button>
            <button class="slider-btn next">❯</button>
        </div>
        <div class="dots"></div>
    `;
}


function initSlider(){
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.dots');
    let currentSlide = 0;

    // Создание точек
    slides.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if(idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => changeSlide(idx));
        dotsContainer.appendChild(dot);
    });

    // Кнопки навигации
    document.querySelector('.prev').addEventListener('click', () => {
        changeSlide(currentSlide - 1);
    });

    document.querySelector('.next').addEventListener('click', () => {
        changeSlide(currentSlide + 1);
    });

    function changeSlide(n) {
        currentSlide = (n + slides.length) % slides.length;
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === currentSlide);
        });
        document.querySelectorAll('.dot').forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    }
}


async function BindToggleLanguageProjectInfo() {
    const lang = localStorage.getItem('language');
    loadProjectDetails();
    applyTranslations(lang);
}