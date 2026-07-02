let currentLang = 'en';
let allProjects = [];

/* ---------------- i18n ---------------- */
function applyTranslations(lang) {
  const dict = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  document.getElementById('langToggle').textContent = dict.lang_button;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  const activeTab = document.querySelector('.tab.active');
  renderGallery(activeTab ? activeTab.dataset.filter : 'all');
}

document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'he' : 'en';
  applyTranslations(currentLang);
});

/* ---------------- Mobile nav ---------------- */
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

/* ---------------- Gallery ---------------- */
const galleryGrid = document.getElementById('galleryGrid');

function renderGallery(filter) {
  galleryGrid.innerHTML = '';
  const items = filter === 'all' ? allProjects : allProjects.filter(p => p.category === filter);

  items.forEach(project => {
    const card = document.createElement('div');
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', project.title[currentLang]);

    const media = document.createElement('div');
    media.className = 'card-media';

    const img = document.createElement('img');
    img.src = project.image;
    img.alt = project.title[currentLang];
    img.loading = 'lazy';
    img.onerror = () => {
      img.remove();
      media.classList.add('no-image');
      const label = document.createElement('span');
      label.className = 'card-media-label';
      label.textContent = project.title[currentLang];
      media.appendChild(label);
    };
    media.appendChild(img);

    const body = document.createElement('div');
    body.className = 'card-body';
    body.innerHTML = `
      <div class="card-title">${project.title[currentLang]}</div>
      <div class="card-cat">${categoryLabels[project.category][currentLang]}</div>
    `;

    card.appendChild(media);
    card.appendChild(body);

    const open = () => openModal(project);
    card.addEventListener('click', open);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });

    galleryGrid.appendChild(card);
  });
}

document.getElementById('tabs').addEventListener('click', e => {
  const btn = e.target.closest('.tab');
  if (!btn) return;
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderGallery(btn.dataset.filter);
});

/* ---------------- Story modal ---------------- */
const modal = document.getElementById('storyModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalCat = document.getElementById('modalCat');
const modalStory = document.getElementById('modalStory');
const modalClose = document.getElementById('modalClose');
let lastFocusedEl = null;

function openModal(project) {
  lastFocusedEl = document.activeElement;
  modalImg.src = project.image;
  modalImg.alt = project.title[currentLang];
  modalImg.onerror = () => { modalImg.style.display = 'none'; };
  modalImg.onload = () => { modalImg.style.display = 'block'; };
  modalTitle.textContent = project.title[currentLang];
  modalCat.textContent = categoryLabels[project.category][currentLang];
  modalStory.textContent = project.story[currentLang];
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
  if (lastFocusedEl) lastFocusedEl.focus();
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', e => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

/* ---------------- Init ---------------- */
(async function init() {
  allProjects = await loadProjects();
  applyTranslations(currentLang);
})();
