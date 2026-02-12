/* ═══════════════════════════════════════════════════════════════
   MsgPack Converter — Core Logic (Split View)
   ═══════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  // ── References ──
  const msgpackInput = document.getElementById("msgpack-text"); // Left Panel
  const jsonInput = document.getElementById("json-text"); // Right Panel

  const msgpackError = document.getElementById("msgpack-error");
  const jsonError = document.getElementById("json-error");

  const decodeBtn = document.getElementById("decode-btn"); // →
  const encodeBtn = document.getElementById("encode-btn"); // ←

  const msgpackFormatSel = document.getElementById("msgpack-format-selector");
  const copyMsgpackBtn = document.getElementById("copy-msgpack");
  const copyJsonBtn = document.getElementById("copy-json");

  // ── State ──
  let currentFormat = "base64"; // Controls how Left Panel is parsed/formatted

  // ═══════════════════════════════════════════════════════════════
  // FORMAT CONVERSION UTILITIES
  // ═══════════════════════════════════════════════════════════════

  /** Base64 string → Uint8Array */
  function base64ToBytes(b64) {
    const raw = atob(b64.trim());
    const bytes = new Uint8Array(raw.length);
    for (let i = 0; i < raw.length; i++) {
      bytes[i] = raw.charCodeAt(i);
    }
    return bytes;
  }

  /** Uint8Array → Base64 string */
  function bytesToBase64(bytes) {
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /** Hex string → Uint8Array */
  function hexToBytes(hex) {
    const clean = hex.replace(/0x/gi, "").replace(/[\s,\n\r]+/g, "");
    if (clean.length === 0) throw new Error("Empty hex input.");
    if (clean.length % 2 !== 0) throw new Error("Hex string must have even length.");
    if (!/^[0-9a-fA-F]+$/.test(clean)) throw new Error("Invalid hex characters.");
    const bytes = new Uint8Array(clean.length / 2);
    for (let i = 0; i < clean.length; i += 2) {
      bytes[i / 2] = parseInt(clean.substring(i, i + 2), 16);
    }
    return bytes;
  }

  /** Uint8Array → Hex string */
  function bytesToHex(bytes) {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(" ");
  }

  /** Go []byte → Uint8Array (flexible: accepts many formats) */
  function gobyteToBytes(input) {
    let content = input.trim();

    // Strip common wrappers: []byte{...}, byte[]{...}, {...}, [...]
    content = content.replace(/^\s*(\[\s*\]byte|\[\s*\]uint8|byte\s*\[\s*\])\s*/, "");

    // Remove outer braces {} or brackets []
    const braceMatch = content.match(/^\{([\s\S]*)\}$/);
    if (braceMatch) {
      content = braceMatch[1];
    } else {
      const bracketMatch = content.match(/^\[([\s\S]*)\]$/);
      if (bracketMatch) content = bracketMatch[1];
    }

    // Split by comma, semicolon, or whitespace (handles all delimiter styles)
    const parts = content
      .split(/[,;\s]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    if (parts.length === 0) throw new Error("Empty []byte input.");

    const bytes = new Uint8Array(parts.length);
    for (let i = 0; i < parts.length; i++) {
      const val = parts[i];
      let num = val.toLowerCase().startsWith("0x") ? parseInt(val, 16) : parseInt(val, 10);
      if (isNaN(num) || num < 0 || num > 255) throw new Error(`Invalid byte: "${val}"`);
      bytes[i] = num;
    }
    return bytes;
  }

  /** Uint8Array → Go []byte */
  function bytesToGobyte(bytes) {
    const values = Array.from(bytes).map((b) => "0x" + b.toString(16).padStart(2, "0"));
    return "[]byte{" + values.join(", ") + "}";
  }

  // ═══════════════════════════════════════════════════════════════
  // CORE LOGIC
  // ═══════════════════════════════════════════════════════════════

  function parseMsgPackInput(text, format) {
    switch (format) {
      case "base64":
        return base64ToBytes(text);
      case "hex":
        return hexToBytes(text);
      case "gobyte":
        return gobyteToBytes(text);
      default:
        throw new Error("Unknown format");
    }
  }

  function formatMsgPackOutput(bytes, format) {
    switch (format) {
      case "base64":
        return bytesToBase64(bytes);
      case "hex":
        return bytesToHex(bytes);
      case "gobyte":
        return bytesToGobyte(bytes);
      default:
        throw new Error("Unknown format");
    }
  }

  function showError(el, msg) {
    el.textContent = msg;
    el.classList.add("visible");
    // Auto-hide after 5s
    setTimeout(() => {
      if (el.textContent === msg) el.classList.remove("visible");
    }, 5000);
  }

  function clearError(el) {
    el.textContent = "";
    el.classList.remove("visible");
  }

  // ── DECODE: Left (MsgPack) → Right (JSON) ──
  function doDecode() {
    clearError(msgpackError);
    clearError(jsonError);

    const text = msgpackInput.value.trim();
    if (!text) {
      showError(msgpackError, "Input empty.");
      return;
    }

    try {
      const bytes = parseMsgPackInput(text, currentFormat);
      const decoded = MessagePack.decode(bytes);
      jsonInput.value = JSON.stringify(decoded, null, 2);

      // Visual feedback
      flashPanel(jsonInput);
    } catch (err) {
      showError(msgpackError, "Decode failed: " + err.message);
    }
  }

  // ── ENCODE: Right (JSON) → Left (MsgPack) ──
  function doEncode() {
    clearError(msgpackError);
    clearError(jsonError);

    const text = jsonInput.value.trim();
    if (!text) {
      showError(jsonError, "Input empty.");
      return;
    }

    try {
      const data = JSON.parse(text);
      const encoded = MessagePack.encode(data);
      msgpackInput.value = formatMsgPackOutput(encoded, currentFormat);

      // Visual feedback
      flashPanel(msgpackInput);
    } catch (err) {
      showError(jsonError, "Invalid JSON: " + err.message);
    }
  }

  function flashPanel(el) {
    el.parentElement.style.transition = "box-shadow 0.2s ease";
    el.parentElement.style.boxShadow = "0 0 0 4px rgba(61, 139, 110, 0.2)"; // Success green glow
    setTimeout(() => {
      el.parentElement.style.boxShadow = "";
    }, 400);
  }

  // ═══════════════════════════════════════════════════════════════
  // UI HANDLERS
  // ═══════════════════════════════════════════════════════════════

  // Format Switcher
  msgpackFormatSel.addEventListener("click", (e) => {
    const btn = e.target.closest(".format-btn");
    if (!btn) return;

    const newFormat = btn.dataset.format;
    const oldFormat = currentFormat;

    // Update UI
    msgpackFormatSel.querySelectorAll(".format-btn").forEach((b) => b.classList.toggle("active", b === btn));
    currentFormat = newFormat;

    // If both sides have data, re-encode from JSON to new format
    if (jsonInput.value.trim()) {
      doEncode(); // Re-generate MsgPack in new format from current JSON
    }
  });

  // Buttons
  decodeBtn.addEventListener("click", doDecode);
  encodeBtn.addEventListener("click", doEncode);

  // Copy
  function setupCopy(btn, input) {
    btn.addEventListener("click", () => {
      if (!input.value) return;
      navigator.clipboard.writeText(input.value).then(() => {
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 1500);
      });
    });
  }
  setupCopy(copyMsgpackBtn, msgpackInput);
  setupCopy(copyJsonBtn, jsonInput);

  // Shortcuts
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      // Did user focus on one specific side?
      if (document.activeElement === msgpackInput) doDecode();
      else if (document.activeElement === jsonInput) doEncode();
      // Else default to... maybe nothing to avoid confusion
    }
  });
})();
