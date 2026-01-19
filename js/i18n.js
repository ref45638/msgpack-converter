const translations = {
  en: {
    "nav.demo": "Demo",
    "nav.help": "Instructions",
    "nav.github": "Github",
    "nav.myIntro": "My Intro",
    "theme.title": "Theme",
    "theme.light": "Light",
    "theme.dark": "Dark",
    "theme.system": "System",
    "header.title": "MsgPack Converter - Handles BASE64 or Byte Array formats",
    "header.helpLink": "Not sure how to use? Click on 'Instructions' in the navigation bar for details.",
    "header.helpButton": "Instructions",
    "error.message": "Error message will be displayed here",
    "input.title": "base64 or []byte",
    "input.placeholder": "Enter MsgPack data in base64 or byte array format",
    "output.title": "JSON",
    "output.placeholder": "JSON result will be displayed here",
    "button.decodeBase64": "decode base64 ›",
    "button.decodeHex": "decode hex ›",
    "button.decodeByteArray": "decode []byte ›",
    "button.encodeBase64": "‹ encode to base64",
    "button.encodeHex": "‹ encode to hex",
    "button.encodeByteArray": "‹ encode to []byte",
    "modal.title": "MsgPack Converter Instructions",
    "modal.close": "Close",
    "help.whatIsMsgpack.title": "What is MsgPack?",
    "help.whatIsMsgpack.content":
      "MessagePack is an efficient binary serialization format. It lets you exchange data among multiple languages like JSON but it's faster and smaller.",
    "help.whatIsMsgpack.tip":
      "<strong>Tip:</strong> MessagePack is typically 20-40% smaller than JSON after serialization, while maintaining good readability and ease of use.",
    "help.howToUse.title": "How to use this tool?",
    "help.decodeBase64.title": "Decode MsgPack from Base64",
    "help.decodeBase64.step1": "Enter Base64 formatted MsgPack data in the left text box",
    "help.decodeBase64.step2": 'Click the "decode base64 ›" button',
    "help.decodeBase64.step3": "The result will be displayed in the right text box",
    "help.decodeBase64.exampleInput": "<strong>Example Input:</strong><br><code>gaVoZWxsb6V3b3JsZA==</code>",
    "help.decodeBase64.exampleOutput": '<strong>Example Output:</strong><br><code>{"hello":"world"}</code>',
    "help.decodeByteArray.title": "Decode MsgPack from Byte Array",
    "help.decodeByteArray.step1":
      "Enter byte array formatted MsgPack data in the left text box (e.g., [129, 165, 104, 101, 108, 108, 111, 165, 119, 111, 114, 108, 100])",
    "help.decodeByteArray.step2": 'Click the "decode []byte ›" button',
    "help.decodeByteArray.step3": "The result will be displayed in the right text box",
    "help.decodeByteArray.exampleInput":
      "<strong>Example Input:</strong><br><code>[129, 165, 104, 101, 108, 108, 111, 165, 119, 111, 114, 108, 100]</code>",
    "help.decodeByteArray.exampleOutput": '<strong>Example Output:</strong><br><code>{"hello":"world"}</code>',
    "help.encodeJson.title": "Encode JSON to MsgPack",
    "help.encodeJson.step1": "Enter valid JSON data in the right text box",
    "help.encodeJson.step2": 'Click "‹ encode to base64" for Base64 formatted MsgPack',
    "help.encodeJson.step3": 'Click "‹ encode to []byte" for byte array formatted MsgPack',
    "help.encodeJson.exampleInput": '<strong>Example Input:</strong><br><code>{"hello":"world"}</code>',
    "help.encodeJson.exampleOutputBase64": "<strong>Base64 Output Example:</strong><br><code>gaVoZWxsb6V3b3JsZA==</code>",
    "help.encodeJson.exampleOutputByteArray":
      "<strong>Byte Array Output Example:</strong><br><code>[129, 165, 104, 101, 108, 108, 111, 165, 119, 111, 114, 108, 100]</code>",
    "help.errorHandling.title": "Error Handling",
    "help.errorHandling.content": "If invalid data is entered, an error message will be displayed at the top of the page. Common errors include:",
    "help.errorHandling.error1": "Invalid Base64 string",
    "help.errorHandling.error2": "Invalid byte array format",
    "help.errorHandling.error3": "Invalid JSON format",
    "help.errorHandling.error4": "MsgPack decoding or encoding failed",
    "help.themeSettings.title": "Theme Settings",
    "help.themeSettings.content":
      "This tool supports three display modes, which can be switched from the theme menu in the upper right corner of the page:",
    "help.themeSettings.mode1": "<strong>Light Mode</strong>: Traditional light interface",
    "help.themeSettings.mode2": "<strong>Dark Mode</strong>: Reduces brightness and eye strain, suitable for night use",
    "help.themeSettings.mode3": "<strong>System</strong>: Automatically switches between light or dark mode based on your system settings",
    "help.themeSettings.note": "Your theme preference will be saved and automatically applied on your next visit.",
    "help.tips.title": "Usage Tips",
    "help.tips.tip1": "The tool supports automatic decoding of nested MsgPack structures",
    "help.tips.tip2": "The encoded result is formatted JSON for easy reading",
    "help.tips.tip3": "Supports various JSON data types, including strings, numbers, booleans, arrays, and objects",
    "help.tips.tip4":
      "For complex data structures, it is recommended to first use the encoding function to generate MsgPack, and then use the decoding function to test the results",
    "help.tips.tip5": "Large data may require slightly longer processing time, please be patient",
    "language.title": "Language",
    "language.en": "English",
    "language.zh-Hant": "繁體中文",
  },
  "zh-Hant": {
    "nav.demo": "Demo",
    "nav.help": "使用說明",
    "nav.github": "Github",
    "nav.myIntro": "My Intro",
    "theme.title": "外觀主題",
    "theme.light": "一般模式",
    "theme.dark": "深色模式",
    "theme.system": "跟隨系統",
    "header.title": "MsgPack 轉換工具 - 可處理 BASE64 或位元組陣列格式",
    "header.helpLink": "不確定如何使用？點擊導航欄中的「使用說明」了解詳情。",
    "header.helpButton": "使用說明",
    "error.message": "錯誤訊息將顯示在這裡",
    "input.title": "base64 or []byte",
    "input.placeholder": "輸入 base64 或位元組陣列格式的 MsgPack 數據",
    "output.title": "JSON",
    "output.placeholder": "這裡將顯示 JSON 結果",
    "button.decodeBase64": "decode base64 ›",
    "button.decodeHex": "decode hex ›",
    "button.decodeByteArray": "decode []byte ›",
    "button.encodeBase64": "‹ encode to base64",
    "button.encodeHex": "‹ encode to hex",
    "button.encodeByteArray": "‹ encode to []byte",
    "modal.title": "MsgPack Converter 使用說明",
    "modal.close": "關閉",
    "help.whatIsMsgpack.title": "什麼是 MsgPack？",
    "help.whatIsMsgpack.content": "MessagePack 是一種高效的二進位序列化格式。它允許您像 JSON 一樣在不同的語言之間交換數據，但更快更小。",
    "help.whatIsMsgpack.tip": "<strong>小知識：</strong> MessagePack 在序列化後的大小通常比 JSON 小 20-40%，同時仍保持良好的可讀性和易用性。",
    "help.howToUse.title": "如何使用本工具？",
    "help.decodeBase64.title": "Base64 格式的 MsgPack 解碼",
    "help.decodeBase64.step1": "在左側文本框中輸入 Base64 格式的 MsgPack 數據",
    "help.decodeBase64.step2": '點擊 "decode base64 ›" 按鈕',
    "help.decodeBase64.step3": "結果將顯示在右側文本框中",
    "help.decodeBase64.exampleInput": "<strong>示例輸入:</strong><br><code>gaVoZWxsb6V3b3JsZA==</code>",
    "help.decodeBase64.exampleOutput": '<strong>示例輸出:</strong><br><code>{"hello":"world"}</code>',
    "help.decodeByteArray.title": "位元組陣列格式的 MsgPack 解碼",
    "help.decodeByteArray.step1":
      "在左側文本框中輸入位元組陣列格式的 MsgPack 數據 (如 [129, 165, 104, 101, 108, 108, 111, 165, 119, 111, 114, 108, 100])",
    "help.decodeByteArray.step2": '點擊 "decode []byte ›" 按鈕',
    "help.decodeByteArray.step3": "結果將顯示在右側文本框中",
    "help.decodeByteArray.exampleInput":
      "<strong>示例輸入:</strong><br><code>[129, 165, 104, 101, 108, 108, 111, 165, 119, 111, 114, 108, 100]</code>",
    "help.decodeByteArray.exampleOutput": '<strong>示例輸出:</strong><br><code>{"hello":"world"}</code>',
    "help.encodeJson.title": "JSON 編碼為 MsgPack",
    "help.encodeJson.step1": "在右側文本框中輸入有效的 JSON 數據",
    "help.encodeJson.step2": '點擊 "‹ encode to base64" 按鈕可獲得 Base64 格式的 MsgPack',
    "help.encodeJson.step3": '點擊 "‹ encode to []byte" 按鈕可獲得位元組陣列格式的 MsgPack',
    "help.encodeJson.exampleInput": '<strong>示例輸入:</strong><br><code>{"hello":"world"}</code>',
    "help.encodeJson.exampleOutputBase64": "<strong>Base64 輸出示例:</strong><br><code>gaVoZWxsb6V3b3JsZA==</code>",
    "help.encodeJson.exampleOutputByteArray":
      "<strong>位元組陣列輸出示例:</strong><br><code>[129, 165, 104, 101, 108, 108, 111, 165, 119, 111, 114, 108, 100]</code>",
    "help.errorHandling.title": "錯誤處理",
    "help.errorHandling.content": "如果輸入了無效的數據，頁面頂部會顯示錯誤訊息。常見的錯誤包括：",
    "help.errorHandling.error1": "無效的 Base64 字串",
    "help.errorHandling.error2": "無效的位元組陣列格式",
    "help.errorHandling.error3": "無效的 JSON 格式",
    "help.errorHandling.error4": "MsgPack 解碼或編碼失敗",
    "help.themeSettings.title": "主題設定",
    "help.themeSettings.content": "本工具支援三種顯示模式，可以從頁面右上角的主題選單中切換：",
    "help.themeSettings.mode1": "<strong>一般模式</strong>：傳統的亮色界面",
    "help.themeSettings.mode2": "<strong>深色模式</strong>：降低亮度，減少眼睛疲勞，適合夜間使用",
    "help.themeSettings.mode3": "<strong>跟隨系統</strong>：根據您的系統設定自動切換亮色或深色模式",
    "help.themeSettings.note": "您的主題偏好會被保存，下次訪問時會自動應用。",
    "help.tips.title": "使用技巧",
    "help.tips.tip1": "工具支援巢狀 MsgPack 結構的自動解碼",
    "help.tips.tip2": "編碼結果是格式化的 JSON，便於閱讀",
    "help.tips.tip3": "支援各種 JSON 數據類型，包括字串、數字、布爾值、陣列和物件",
    "help.tips.tip4": "對於複雜的數據結構，建議先使用編碼功能生成 MsgPack，再使用解碼功能測試結果",
    "help.tips.tip5": "大型數據可能需要稍長的處理時間，請耐心等待",
    "language.title": "語言",
    "language.en": "English",
    "language.zh-Hant": "繁體中文",
  },
};

async function setLanguage(lang) {
  return new Promise(async (resolve, reject) => {
    try {
      const langTranslations = translations[lang];
      if (!langTranslations) {
        throw new Error(`Failed to load language file: ${lang}`);
      }

      document.querySelectorAll("[data-i18n]").forEach((elem) => {
        const key = elem.getAttribute("data-i18n");
        if (langTranslations[key]) {
          if (elem.hasAttribute("placeholder")) {
            elem.setAttribute("placeholder", langTranslations[key]);
          } else {
            elem.innerHTML = langTranslations[key];
          }
        }
      });

      document.documentElement.lang = lang;
      localStorage.setItem("language", lang);
      resolve();
    } catch (error) {
      console.error("Error setting language:", error);
      reject(error);
    }
  });
}

function getInitialLanguage() {
  const savedLang = localStorage.getItem("language");
  if (savedLang) {
    return savedLang;
  }
  const browserLang = navigator.language || navigator.userLanguage;
  if (browserLang.startsWith("zh")) {
    return "zh-Hant";
  }
  return "en";
}

document.addEventListener("DOMContentLoaded", () => {
  const initialLang = getInitialLanguage();
  setLanguage(initialLang);
});
