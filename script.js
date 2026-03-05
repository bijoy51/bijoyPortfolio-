// Header scroll effect
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  navToggle.classList.add('active');
  navMenu.classList.add('open');
  navOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navToggle.classList.remove('active');
  navMenu.classList.remove('open');
  navOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

navToggle.addEventListener('click', () => {
  if (navMenu.classList.contains('open')) {
    closeMenu();
  } else {
    openMenu();
  }
});

navOverlay.addEventListener('click', closeMenu);

// Close menu when a link is clicked
document.querySelectorAll('.nav__link, .nav__cta').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

    if (navLink && scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav__link').forEach(l => l.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Scroll reveal animation
const fadeElements = document.querySelectorAll(
  '.about__card, .skill__category, .project__card, .contact__form, .contact__info'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

fadeElements.forEach(el => observer.observe(el));

// Contact form - show sending state on submit
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', () => {
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
});
