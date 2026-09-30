/* =========================================================
   Projects & Services — app.js
   Add unlimited buttons per service via the `buttons` array.
   ========================================================= */

const SERVICES = [
  {
    id: 'portainer',
    name: 'Portainer Container Ops',
    status: 'online',
    meta: 'A lightweight web UI for managing Docker containers, images, networks and volumes—simplifying container operations and monitoring.',
    buttons: [
      { label: 'Launch Console', href: 'https://portainer.example.com', variant: 'primary', icon: 'external' },
      { label: 'Containers',     href: 'https://portainer.example.com/#!/containers', variant: 'ghost' },
      { label: 'Stacks',         href: 'https://portainer.example.com/#!/stacks', variant: 'ghost' },
      { label: 'Images',         href: 'https://portainer.example.com/#!/images', variant: 'ghost' },
      { label: 'Networks',       href: 'https://portainer.example.com/#!/networks', variant: 'ghost' },
      { label: 'Volumes',        href: 'https://portainer.example.com/#!/volumes', variant: 'ghost' }
    ]
  },
  {
    id: 'gitea',
    name: 'Gitea Code Repository',
    status: 'online',
    meta: 'git · 38 repos',
    buttons: [
      { label: 'View Repos',    href: 'https://git.example.com', variant: 'primary', icon: 'external' },
      { label: 'Pull Requests', href: 'https://git.example.com/pulls', variant: 'ghost' },
      { label: 'Issues',        href: 'https://git.example.com/issues', variant: 'ghost' },
      { label: 'Actions',       href: 'https://git.example.com/actions', variant: 'ghost' }
    ]
  },
  {
    id: 'pgadmin',
    name: 'pgAdmin Database Console',
    status: 'online',
    meta: 'postgres · 3 clusters',
    buttons: [
      { label: 'Open Studio', href: 'https://pgadmin.example.com', variant: 'primary', icon: 'external' },
      { label: 'Query Tool',  href: 'https://pgadmin.example.com/browser', variant: 'ghost' }
    ]
  },
  {
    id: 'phpmyadmin',
    name: 'phpMyAdmin MySQL',
    status: 'online',
    meta: 'mysql · 5 schemas',
    buttons: [
      { label: 'SQL Console', href: 'https://pma.example.com', variant: 'primary', icon: 'external' },
      { label: 'Export DB',   href: 'https://pma.example.com/export.php', variant: 'ghost' },
      { label: 'Import DB',   href: 'https://pma.example.com/import.php', variant: 'ghost' },
      { label: 'Users',       href: 'https://pma.example.com/user_password.php', variant: 'ghost' }
    ]
  },
  {
    id: 'codesquad',
    name: 'CodeSquad Main Dashboard',
    status: 'online',
    meta: 'web · v2.4.1',
    buttons: [
      { label: 'Visit App', href: 'https://app.codesquad.example.com', variant: 'primary', icon: 'external' },
      { label: 'Analytics', href: 'https://app.codesquad.example.com/analytics', variant: 'ghost' },
      { label: 'Settings',  href: 'https://app.codesquad.example.com/settings', variant: 'ghost' }
    ]
  },
  {
    id: 'quizfusion',
    name: 'QuizFusion Interactive',
    status: 'online',
    meta: 'web · live quiz engine',
    buttons: [
      { label: 'Play Demo',   href: 'https://quizfusion.example.com/demo', variant: 'primary', icon: 'play' },
      { label: 'Leaderboard', href: 'https://quizfusion.example.com/leaderboard', variant: 'ghost' },
      { label: 'Create Quiz', href: 'https://quizfusion.example.com/new', variant: 'success' }
    ]
  },
  {
    id: 'wewics',
    name: 'Wewics SDMS Core',
    status: 'warn',
    meta: 'api · latency 240ms',
    buttons: [
      { label: 'API Docs',   href: 'https://api.wewics.example.com/docs', variant: 'primary', icon: 'external' },
      { label: 'Swagger UI', href: 'https://api.wewics.example.com/swagger', variant: 'ghost' },
      { label: 'Health',     href: 'https://api.wewics.example.com/health', variant: 'warn' }
    ]
  },
  {
    id: 'abeco',
    name: 'ABECO Education Portal',
    status: 'online',
    meta: 'web · 1,240 students',
    buttons: [
      { label: 'Student Portal', href: 'https://portal.abeco.example.com', variant: 'primary', icon: 'external' },
      { label: 'Admin View',     href: 'https://portal.abeco.example.com/admin', variant: 'ghost' },
      { label: 'Reports',        href: 'https://portal.abeco.example.com/reports', variant: 'ghost' },
      { label: 'Reset Cache',    href: 'https://portal.abeco.example.com/cache/clear', variant: 'danger' }
    ]
  }
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
const listEl = document.getElementById('services-list');

/* ---------------- Helpers ---------------- */
function statusClass(status) {
  if (status === 'down') return 'down';
  if (status === 'warn') return 'warn';
  return '';
}

function renderButton(btn) {
  const variant = ALLOWED_VARIANTS.includes(btn.variant) ? btn.variant : 'ghost';
  const icon = btn.icon ? (ICONS[btn.icon] || '') : '';
  return `
    <a class="btn btn-${variant}"
       href="${btn.href}"
       target="_blank"
       rel="noopener noreferrer">
      <span>${btn.label}</span>${icon}
    </a>`;
}

function renderCard(svc) {
  const buttons = (svc.buttons || []).map(renderButton).join('');
  return `
    <div class="card" data-id="${svc.id}">
      <div class="card-header">
        <span class="dot ${statusClass(svc.status)}"></span>
        <div class="min-w-0 flex-1">
          <div class="card-title">${svc.name}</div>
          <div class="card-meta">${svc.meta}</div>
        </div>
      </div>
      <div class="card-actions">${buttons}</div>
    </div>`;
}

function render() {
  listEl.innerHTML = SERVICES.map(renderCard).join('');
}

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