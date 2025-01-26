// Инициализация слайдера
document.addEventListener('DOMContentLoaded', () => {
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
});


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

// В инициализации
document.addEventListener('DOMContentLoaded', async () => {
    const projects = await loadProjects();
    const lang = document.documentElement.getAttribute('lang');
    const container = document.querySelector('.projects-grid');

    if(projects.length > 0) {
        container.innerHTML = projects.map(p => renderProjectCard(p, lang)).join('');
        initMiniSliders();
    } else {
        container.innerHTML = '<p data-i18n="noProjects">Проекты не найдены</p>';
    }
});