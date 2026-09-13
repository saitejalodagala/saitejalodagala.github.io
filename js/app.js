/**
 * app.js
 * Production client script for Sai Teja Lodagala's Portfolio
 * Systems & Control Engineering, IIT Bombay
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initFiltering();
});

// ==========================================
// 0. THEME CONTROLLER (Auto Light / Dark)
// ==========================================

function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('saiteja-theme', isDark ? 'dark' : 'light');
    showToast(isDark ? '🌙 Dark Mode (Obsidian Amber)' : '☀️ Light Mode (Alabaster)');
  });

  // Listen to OS preference changes if user hasn't explicitly overridden
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('saiteja-theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    });
  }
}

// ==========================================
// 1. FILTERING & SEARCH
// ==========================================

function initFiltering() {
  const catButtons = document.querySelectorAll('[data-category]');
  const searchInput = document.getElementById('project-search');
  const projectCards = document.querySelectorAll('[data-project-card]');

  let currentCategory = 'all';
  let searchQuery = '';

  function applyFilters() {
    let visibleCount = 0;

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const textContent = card.innerText.toLowerCase();

      const matchesCat = (currentCategory === 'all' || cardCategory === currentCategory);
      const matchesSearch = !searchQuery || textContent.includes(searchQuery.toLowerCase());

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Handle empty state if no search matches
    let noResultsMsg = document.getElementById('no-projects-msg');
    const projectsGrid = document.getElementById('projects-grid');

    if (visibleCount === 0) {
      if (!noResultsMsg && projectsGrid) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'no-projects-msg';
        noResultsMsg.className = 'col-span-full py-16 text-center text-zinc-400 glass-card';
        noResultsMsg.innerHTML = `
          <p class="text-lg font-medium text-zinc-300">No projects found matching "${searchQuery}"</p>
          <button onclick="resetFilters()" class="mt-3 px-4 py-2 text-xs font-mono text-amber-400 hover:text-amber-300 underline cursor-pointer">Reset all filters</button>
        `;
        projectsGrid.appendChild(noResultsMsg);
      }
    } else if (noResultsMsg) {
      noResultsMsg.remove();
    }
  }

  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active', 'bg-amber-500/20', 'border-amber-500/50', 'text-amber-300'));
      btn.classList.add('active', 'bg-amber-500/20', 'border-amber-500/50', 'text-amber-300');
      currentCategory = btn.getAttribute('data-category');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      applyFilters();
    });
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Modal backdrop click to close
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }
}

window.resetFilters = function() {
  const searchInput = document.getElementById('project-search');
  if (searchInput) searchInput.value = '';
  const allBtn = document.querySelector('[data-category="all"]');
  if (allBtn) allBtn.click();
};

// ==========================================
// 2. PROJECT MODAL DEEP-DIVE (With KaTeX)
// ==========================================

window.openProjectModal = function(projectId) {
  if (typeof PORTFOLIO_DATA === 'undefined') return;
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById('project-modal');
  const content = document.getElementById('project-modal-content');

  let mathHtml = '';
  if (project.math && window.katex) {
    try {
      mathHtml = katex.renderToString(project.math.trim(), { displayMode: true, throwOnError: false });
    } catch (e) {
      mathHtml = `<pre class="text-xs text-amber-400 font-mono">${project.math}</pre>`;
    }
  }

  content.innerHTML = `
    <!-- Header -->
    <div class="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-200 dark:border-zinc-800">
      <div>
        <div class="flex items-center gap-2 mb-1.5">
          <span class="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
            ${project.badge}
          </span>
          <span class="text-xs text-slate-500 dark:text-zinc-400 font-mono">${project.guide}</span>
        </div>
        <h2 class="text-2xl font-bold font-heading text-slate-900 dark:text-zinc-100">${project.title}</h2>
        <p class="text-xs text-amber-600 dark:text-amber-400 font-mono mt-1">${project.tagline}</p>
      </div>

      <button onclick="closeProjectModal()" class="p-2 text-slate-400 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <!-- Description -->
    <div class="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed mb-6">
      ${project.description}
    </div>

    <!-- Key Bullets -->
    <div class="mb-6">
      <h4 class="text-xs uppercase font-bold text-slate-500 dark:text-zinc-400 tracking-wider mb-3 flex items-center gap-2">
        <svg class="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Key Engineering Highlights
      </h4>
      <ul class="space-y-2 text-xs text-slate-700 dark:text-zinc-300">
        ${project.bullets.map(b => `
          <li class="flex items-start gap-2 bg-slate-50 dark:bg-zinc-900/50 p-2.5 rounded-lg border border-slate-200 dark:border-zinc-800/80">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400 mt-1.5 shrink-0"></span>
            <span>${b}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <!-- Mathematical Formulation -->
    ${project.math ? `
      <div class="mb-6">
        <h4 class="text-xs uppercase font-bold text-slate-500 dark:text-zinc-400 tracking-wider mb-2 flex items-center gap-2">
          <svg class="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/></svg>
          Theoretical & Mathematical Formulation
        </h4>
        <div class="p-4 rounded-lg bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-amber-500/20 overflow-x-auto text-slate-800 dark:text-zinc-200">
          ${mathHtml}
        </div>
      </div>
    ` : ''}

    <!-- Actions -->
    <div class="flex items-center justify-between gap-3 pt-4 border-t border-slate-200 dark:border-zinc-800">
      <div class="flex flex-wrap gap-1.5">
        ${project.tags.map(t => `
          <span class="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
            ${t}
          </span>
        `).join('')}
      </div>

      <a 
        href="${project.github}" 
        target="_blank" 
        rel="noopener noreferrer"
        class="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-600 hover:bg-amber-500 text-white dark:bg-amber-500 dark:hover:bg-amber-400 dark:text-zinc-950 font-heading flex items-center gap-2 transition shadow-md shadow-amber-600/20 dark:shadow-amber-500/20"
      >
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        View Full Repository
      </a>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
};

window.copyToClipboard = function(text, message = 'Copied to clipboard!') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(message);
  });
};

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
  toast.classList.add('opacity-100', 'translate-y-0');
  setTimeout(() => {
    toast.classList.remove('opacity-100', 'translate-y-0');
    toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
  }, 2500);
}

