// 主題管理相關函數
const THEME_KEY = 'msgpack_converter_theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_SYSTEM = 'system';

// 設置主題
function setTheme(theme) {
  if (theme === THEME_SYSTEM) {
    // 檢測系統主題偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', THEME_DARK);
      document.body.classList.add('dark-theme');
      updateThemeIcon(THEME_DARK);
      applyThemeToAllElements(THEME_DARK);
    } else {
      document.documentElement.setAttribute('data-theme', THEME_LIGHT);
      document.body.classList.remove('dark-theme');
      updateThemeIcon(THEME_LIGHT);
      applyThemeToAllElements(THEME_LIGHT);
    }
    
    // 監聽系統主題變化
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
      const newTheme = event.matches ? THEME_DARK : THEME_LIGHT;
      document.documentElement.setAttribute('data-theme', newTheme);
      if (newTheme === THEME_DARK) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
      updateThemeIcon(newTheme);
      applyThemeToAllElements(newTheme);
    });
    
    localStorage.setItem(THEME_KEY, THEME_SYSTEM);
    document.getElementById('theme-text').innerText = '跟隨系統';
  } else {
    // 設置明確的主題
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    
    // 設置 body 類以方便某些樣式應用
    if (theme === THEME_DARK) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    updateThemeIcon(theme);
    document.getElementById('theme-text').innerText = theme === THEME_LIGHT ? '一般模式' : '深色模式';
    applyThemeToAllElements(theme);
  }
}

// 應用主題到所有元素
function applyThemeToAllElements(theme) {
  // 強制重新應用某些樣式
  const containers = document.querySelectorAll('.container, .container-fluid');
  containers.forEach(container => {
    if (theme === THEME_DARK) {
      container.style.backgroundColor = 'var(--background-color)';
      container.style.color = 'var(--text-color)';
    } else {
      container.style.backgroundColor = '';
      container.style.color = '';
    }
  });
  
  // 刷新模態視窗樣式
  const modals = document.querySelectorAll('.modal-content');
  modals.forEach(modal => {
    if (theme === THEME_DARK) {
      modal.style.backgroundColor = '#1e1e1e';
      modal.style.color = 'var(--text-color)';
    } else {
      modal.style.backgroundColor = '';
      modal.style.color = '';
    }
  });
}

// 更新主題圖標
function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('theme-icon');
  themeIcon.className = theme === THEME_DARK ? 'bi bi-moon-fill theme-icon' : 'bi bi-sun-fill theme-icon';
}

// 初始化主題
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || THEME_LIGHT;
  setTheme(savedTheme);
}

// 立即初始化主題，避免閃爍
(function() {
  const savedTheme = localStorage.getItem(THEME_KEY) || THEME_LIGHT;
  if (savedTheme === THEME_SYSTEM) {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', THEME_DARK);
      document.body.classList.add('dark-theme');
    } else {
      document.documentElement.setAttribute('data-theme', THEME_LIGHT);
      document.body.classList.remove('dark-theme');
    }
  } else {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === THEME_DARK) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
  // 添加內嵌樣式來確保頁面載入時就能有正確的背景色
  const style = document.createElement('style');
  style.textContent = `
    [data-theme="dark"] body, 
    [data-theme="dark"] .modal-content,
    [data-theme="dark"] .container, 
    [data-theme="dark"] .container-fluid {
      background-color: #121212 !important;
      color: #e9ecef !important;
    }
  `;
  document.head.appendChild(style);
})();

// 在頁面加載時完整初始化主題（包括圖標等）
document.addEventListener('DOMContentLoaded', initTheme);
