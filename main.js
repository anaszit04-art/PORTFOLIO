const menuIcon = document.querySelector('#menu-icon');
const menuButtonIcon = document.querySelector('#menu-icon i');
const navbar = document.querySelector('#navbar');
const header = document.querySelector('#header');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    menuButtonIcon.classList.toggle('bx-menu');
    menuButtonIcon.classList.toggle('bx-x');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuButtonIcon.classList.add('bx-menu');
        menuButtonIcon.classList.remove('bx-x');
    });
});

function updateHeaderAndNav() {
    header.classList.toggle('sticky', window.scrollY > 60);

    let currentSectionId = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateHeaderAndNav);
window.addEventListener('load', updateHeaderAndNav);

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(element => revealObserver.observe(element));

const typeTarget = document.querySelector('#type-text');
const typeWords = ['Cybersécurité', 'Réseaux', 'Sécurité Informatique', 'Linux & Docker'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typeTarget) return;

    const currentWord = typeWords[wordIndex];
    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typeTarget.textContent = currentWord.substring(0, charIndex);

    let speed = isDeleting ? 55 : 95;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1300;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % typeWords.length;
        speed = 350;
    }

    setTimeout(typeEffect, speed);
}

typeEffect();

const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.counter);
        let value = 0;
        const increment = Math.max(1, Math.ceil(target / 40));

        const timer = setInterval(() => {
            value += increment;
            if (value >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = value;
            }
        }, 35);

        counterObserver.unobserve(counter);
    });
}, { threshold: 0.7 });

counters.forEach(counter => counterObserver.observe(counter));

const progressBars = document.querySelectorAll('.progress-bar span');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            bar.style.width = bar.dataset.width || '0%';
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.dataset.filter;
        projectCards.forEach(card => {
            const categories = card.dataset.category || '';
            const shouldShow = filter === 'all' || categories.includes(filter);
            card.classList.toggle('hide', !shouldShow);
        });
    });
});

const contactForm = document.querySelector('#contact-form');
const formNote = document.querySelector('#form-note');

if (contactForm) {
    contactForm.addEventListener('submit', () => {
        if (formNote) {
            formNote.textContent = 'Envoi du message en cours...';
        }
    });
}
