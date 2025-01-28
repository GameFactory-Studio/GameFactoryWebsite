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

    const lang = document.documentElement.getAttribute('lang');
    const container = document.getElementById('project-container');
    

    fetch(project[lang]['render-description'])
    .then(response => response.text())
    .then(render_description => {
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

document.addEventListener('DOMContentLoaded', () => {
    loadProjectDetails();
});
