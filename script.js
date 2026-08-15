// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

setTheme(localStorage.getItem('theme') || 'dark');

themeToggle.addEventListener('click', () => {
    setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.1)' : 'none';
});

// ===== Typing Animation =====
const typingElement = document.getElementById('typingText');
if (typingElement) {
    const words = ['Laravel Developer', 'PHP Developer', 'Full Stack Developer', 'Web Developer', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}

// ===== Counter Animation =====
function animateCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        if (counter.dataset.animated) return;
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.textContent = target;
                counter.dataset.animated = 'true';
            }
        };

        update();
    });
}

// ===== Scroll Animations =====
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            if (entry.target.closest('#about')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .project-card, .timeline-item, .contact-item, .about-grid').forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
});

// ===== Project Filtering =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projectCards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            card.style.display = match ? '' : 'none';
            if (match) {
                card.classList.add('visible');
            }
        });
    });
});

// ===== Project Modal =====
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');

projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.closest('.project-link')) return;

        document.getElementById('modalTitle').textContent = card.dataset.title;
        document.getElementById('modalDesc').textContent = card.dataset.desc;
        document.getElementById('modalIcon').innerHTML = `<i class="${card.dataset.icon}"></i>`;

        const modalLive = document.getElementById('modalLive');
        const modalGithub = document.getElementById('modalGithub');
        const liveUrl = card.dataset.live;
        const githubUrl = card.dataset.github;

        modalLive.style.display = (liveUrl && liveUrl !== '#') ? '' : 'none';
        modalLive.href = liveUrl || '#';
        modalGithub.style.display = (githubUrl && githubUrl !== '#') ? '' : 'none';
        modalGithub.href = githubUrl || '#';

        const tagsContainer = document.getElementById('modalTags');
        tagsContainer.innerHTML = card.dataset.tags.split(',').map(t =>
            `<span>${t.trim()}</span>`
        ).join('');

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                link.style.color = 'var(--accent)';
            } else {
                link.style.color = '';
            }
        }
    });
});

// ===== Contact Form Success Auto-hide =====
const alertSuccess = document.querySelector('.alert-success');
if (alertSuccess) {
    setTimeout(() => {
        alertSuccess.style.transition = 'opacity 0.5s';
        alertSuccess.style.opacity = '0';
        setTimeout(() => alertSuccess.remove(), 500);
    }, 5000);
}
