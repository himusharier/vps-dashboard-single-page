/* =========================================================
   Projects & Services — app.js
   Services + live search + theme
   ========================================================= */

const SERVICES = [
  {
    id: 'portainer',
    name: 'Portainer Dashboard',
    status: 'online',
    meta: 'A lightweight web UI for managing Docker containers, images, networks and volumes—simplifying container operations and monitoring.',
    buttons: [
      { label: 'Login to Dashboard', href: 'https://192.168.0.109:9443', variant: 'ghost', icon: 'external' },
    ]
  },
  {
    id: 'pgadmin',
    name: 'pgAdmin Dashboard',
    status: 'online',
    meta: 'A secure web-based PostgreSQL administration console used to manage databases, inspect schemas, and monitor server activity with ease.',
    buttons: [
      { label: 'Login to Dashboard', href: 'http://192.168.0.109:5050', variant: 'ghost', icon: 'external' },
    ]
  },
  {
    id: 'phpmyadmin',
    name: 'phpMyAdmin Dashboard',
    status: 'online',
    meta: 'A secure web-based MySQL and MariaDB administration tool used to manage databases, tables, users, SQL queries, and server settings through an intuitive interface.',
    buttons: [
      { label: 'Login to Dashboard', href: 'http://192.168.0.109:7098', variant: 'ghost', icon: 'external' },
    ]
  },
  {
    id: 'gitea',
    name: 'Gitea Dashboard',
    status: 'online',
    meta: 'A secure web-based Git service that allows you to host and manage your own Git repositories.',
    buttons: [
      { label: 'Go to Dashboard', href: 'http://192.168.0.109:3050', variant: 'ghost', icon: 'external' },
    ]
  },
];

/* ---------------- Icons ---------------- */
const ICONS = {
  external: `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`,
  play: `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`
};

const ALLOWED_VARIANTS = ['primary', 'ghost', 'success', 'warn', 'danger'];

/* ---------------- DOM ---------------- */
const listEl       = document.getElementById('services-list');
const searchInput  = document.getElementById('searchInput');
const searchClear  = document.getElementById('searchClear');
const emptyStateEl = document.getElementById('emptyState');

/* ---------------- State ---------------- */
const state = { query: '' };

/* ---------------- Helpers ---------------- */
function statusClass(status) {
  if (status === 'down') return 'down';
  if (status === 'warn') return 'warn';
  return '';
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function matchesQuery(svc, rawQuery) {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;
  const haystack = [svc.name, svc.meta, svc.id]
    .filter(Boolean).join(' ').toLowerCase();
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

/* ---------------- Render ---------------- */
function renderButton(btn) {
  const variant = ALLOWED_VARIANTS.includes(btn.variant) ? btn.variant : 'ghost';
  const icon = btn.icon ? (ICONS[btn.icon] || '') : '';
  return `
    <a class="btn btn-${variant}"
       href="${escapeHtml(btn.href)}"
       target="_blank"
       rel="noopener noreferrer">
      <span>${escapeHtml(btn.label)}</span>${icon}
    </a>`;
}

function renderCard(svc) {
  const buttons = (svc.buttons || []).map(renderButton).join('');
  return `
    <div class="card" data-id="${escapeHtml(svc.id)}">
      <div class="card-header">
        <span class="dot ${statusClass(svc.status)}"></span>
        <div class="min-w-0 flex-1">
          <div class="card-title">${escapeHtml(svc.name)}</div>
          <div class="card-meta">${escapeHtml(svc.meta)}</div>
        </div>
      </div>
      <div class="card-actions">${buttons}</div>
    </div>`;
}

function render() {
  const filtered = SERVICES.filter((svc) => matchesQuery(svc, state.query));
  listEl.innerHTML = filtered.map(renderCard).join('');

  const isEmpty = filtered.length === 0;
  emptyStateEl.classList.toggle('hidden', !isEmpty);
  listEl.classList.toggle('hidden', isEmpty);
}

/* ---------------- Search wiring ---------------- */
function updateClearButton() {
  searchClear.classList.toggle('hidden', state.query.length === 0);
}

searchInput.addEventListener('input', (e) => {
  state.query = e.target.value;
  updateClearButton();
  render();
});

searchClear.addEventListener('click', () => {
  state.query = '';
  searchInput.value = '';
  updateClearButton();
  render();
  searchInput.focus();
});

document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement !== searchInput) {
    e.preventDefault();
    searchInput.focus();
  }
  if (e.key === 'Escape' && document.activeElement === searchInput) {
    searchClear.click();
  }
});

/* ---------------- Theme ---------------- */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const sunIcon  = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');
const html = document.documentElement;
const STORAGE_KEY = 'ps-theme';

function applyTheme(isDark) {
  html.classList.toggle('dark', isDark);
  document.body.classList.toggle('light', !isDark);
  sunIcon.classList.toggle('hidden', !isDark);
  moonIcon.classList.toggle('hidden', isDark);
  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
}

themeToggleBtn.addEventListener('click', () => {
  applyTheme(!html.classList.contains('dark'));
});

(function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    applyTheme(saved === 'dark');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark);
  }
})();

/* ---------------- First render ---------------- */
render();