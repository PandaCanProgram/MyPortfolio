// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Inert links/buttons — visually clickable, no action (placeholders for future functionality)
document.querySelectorAll('[data-inert]').forEach((el) => {
  el.addEventListener('click', (e) => e.preventDefault());
});

// Contact form — inert, no submission logic yet
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
});

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
