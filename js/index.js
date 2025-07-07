// 顯示錯誤訊息的函數
showError = (message) => {
  const errorElement = document.getElementById("error-message");
  errorElement.textContent = message;
  errorElement.style.display = "block";

  // 5秒後自動隱藏錯誤訊息
  setTimeout(() => {
    errorElement.style.display = "none";
  }, 5000);
};

// 隱藏錯誤訊息
hideError = () => {
  const errorElement = document.getElementById("error-message");
  errorElement.style.display = "none";
};

decodeBase64 = () => {
  try {
    hideError();
    var before = document.getElementById("before").value.trim();

    if (!before) {
      showError("請輸入 base64 字串");
      return;
    }

    // 檢查是否是有效的 base64
    try {
      var decoded = window.atob(before);
    } catch (e) {
      showError("無效的 base64 字串");
      return;
    }

    var after = decode(_base64ToArrayBuffer(before));
    document.getElementById("after").value = JSON.stringify(after);
    prettyPrint();
  } catch (error) {
    showError("解碼失敗: " + error.message);
  }
};

decodeByteArray = () => {
  try {
    hideError();
    var before = document.getElementById("before").value.trim();

    if (!before) {
      showError("請輸入位元組陣列");
      return;
    }

    if (before.startsWith("[")) before = before.substr(1);
    if (before.endsWith("]")) before = before.substr(0, before.length - 1);

    var byteArray;
    try {
      if (before.includes(",")) {
        const values = before.split(",").map((s) => s.trim());
        byteArray = Uint8Array.from(values.map(Number));
      } else {
        const values = before
          .split(" ")
          .map((s) => s.trim())
          .filter((s) => s !== "");
        byteArray = Uint8Array.from(values.map(Number));
      }

      // 檢查是否有任何 NaN 值
      if (byteArray.some(isNaN)) {
        throw new Error("位元組陣列包含無效的數字");
      }
    } catch (err) {
      showError("無效的位元組陣列格式: " + err.message);
      return;
    }

    var after = decode(byteArray);
    document.getElementById("after").value = JSON.stringify(after);
    prettyPrint();
  } catch (error) {
    showError("解碼失敗: " + error.message);
  }
};

decode = (data) => {
  try {
    var after = msgpack.decode(data);
    if (typeof after === "object") {
      Object.keys(after).map((key) => {
        try {
          var afterafter = msgpack.decode(after[key]);
          if (typeof afterafter === "object") after[key] = afterafter;
        } catch (err) {
          // 這裡繼續使用原始值，不顯示錯誤
        }
      });
    }
    return after;
  } catch (error) {
    throw new Error("MsgPack 解碼失敗: " + error.message);
  }
};

encodeToBase64 = () => {
  try {
    hideError();
    var after = document.getElementById("after").value;

    if (!after) {
      showError("請輸入 JSON 資料");
      return;
    }

    var jsonData;
    try {
      jsonData = JSON.parse(after);
    } catch (err) {
      showError("無效的 JSON 格式: " + err.message);
      return;
    }

    var before = _arrayBufferToBase64(msgpack.encode(jsonData));
    document.getElementById("before").value = before;
  } catch (error) {
    showError("編碼失敗: " + error.message);
  }
};

encodeToByteArray = () => {
  try {
    hideError();
    var after = document.getElementById("after").value;

    if (!after) {
      showError("請輸入 JSON 資料");
      return;
    }

    var jsonData;
    try {
      jsonData = JSON.parse(after);
    } catch (err) {
      showError("無效的 JSON 格式: " + err.message);
      return;
    }

    var before = msgpack.encode(jsonData);

    var value = "[";
    for (var i = 0; i < before.length; i++) {
      if (i == 0) {
        value += before[i];
      } else {
        value += ", " + before[i];
      }
    }
    value += "]";

    document.getElementById("before").value = value;
  } catch (error) {
    showError("編碼失敗: " + error.message);
  }
};

_base64ToArrayBuffer = (base64) => {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
};

_arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

prettyPrint = () => {
  try {
    var ugly = document.getElementById("after").value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById("after").value = pretty;
  } catch (error) {
    showError("JSON 格式化失敗: " + error.message);
  }
};
