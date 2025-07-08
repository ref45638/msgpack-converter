async function setLanguage(lang) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load language file: ${lang}.json`);
      }
      const translations = await response.json();

      document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (translations[key]) {
          if (elem.hasAttribute('placeholder')) {
            elem.setAttribute('placeholder', translations[key]);
          } else {
            elem.innerHTML = translations[key];
          }
        }
      });

      document.documentElement.lang = lang;
      localStorage.setItem('language', lang);
      resolve();
    } catch (error) {
      console.error('Error setting language:', error);
      reject(error);
    }
  });
}

function getInitialLanguage() {
  const savedLang = localStorage.getItem('language');
  if (savedLang) {
    return savedLang;
  }
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith('zh')) {
    return 'zh-Hant';
  }
  return 'en';
}

document.addEventListener('DOMContentLoaded', () => {
  const initialLang = getInitialLanguage();
  setLanguage(initialLang);
});
