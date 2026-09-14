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

// Contact form — submits to Web3Forms (no backend needed)
const contactForm = document.getElementById('contactForm');
const contactSubmit = document.getElementById('contactSubmit');
const contactStatus = document.getElementById('contactStatus');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  contactSubmit.disabled = true;
  contactSubmit.textContent = 'Sending...';
  contactStatus.textContent = '';
  contactStatus.classList.remove('is-error');

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(contactForm),
    });
    const result = await response.json();

    if (result.success) {
      contactStatus.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
      contactForm.reset();
    } else {
      throw new Error(result.message || 'Something went wrong.');
    }
  } catch (err) {
    contactStatus.textContent = "Couldn't send your message. Please try again or email me directly.";
    contactStatus.classList.add('is-error');
  } finally {
    contactSubmit.disabled = false;
    contactSubmit.textContent = 'Send Message';
  }
});

// Back to top
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Experience modal
const expModal = document.getElementById('expModal');
const modalImg = document.getElementById('modalImg');
const modalPeriod = document.getElementById('modalPeriod');
const modalTitle = document.getElementById('modalTitle');
const modalTags = document.getElementById('modalTags');
const modalDesc = document.getElementById('modalDesc');
const modalLive = document.getElementById('modalLive');
const modalClose = document.getElementById('modalClose');

let lastFocused = null;

function openExpModal(card) {
  const thumb = card.querySelector('.bento-media img');
  modalImg.src = thumb ? thumb.currentSrc || thumb.src : card.dataset.expImg;
  modalImg.alt = card.dataset.expTitle;
  modalPeriod.textContent = card.dataset.expPeriod;
  modalTitle.textContent = card.dataset.expTitle;
  modalDesc.textContent = card.dataset.expDesc;
  modalTags.innerHTML = card.dataset.expTags
    .split(',')
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join('');
  modalLive.href = card.dataset.expLive;

  lastFocused = document.activeElement;
  expModal.classList.add('is-open');
  expModal.setAttribute('aria-hidden', 'false');
  modalClose.focus();
  document.body.style.overflow = 'hidden';
}

function closeExpModal() {
  expModal.classList.remove('is-open');
  expModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll('.bento-item[data-exp-title]').forEach((card) => {
  card.addEventListener('click', () => openExpModal(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openExpModal(card);
    }
  });
});

modalClose.addEventListener('click', closeExpModal);
expModal.addEventListener('click', (e) => {
  if (e.target === expModal) closeExpModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && expModal.classList.contains('is-open')) closeExpModal();
});
