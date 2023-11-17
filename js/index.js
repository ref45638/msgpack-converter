decodeBase64 = () => {
  var before = document.getElementById("before").value.trim();
  var after = decode(_base64ToArrayBuffer(before));
  document.getElementById("after").value = JSON.stringify(after);
  prettyPrint();
};

decodeByteArray = () => {
  var before = document.getElementById("before").value.trim();

  if (before.startsWith("[")) before = before.substr(1);
  else if (before.endsWith("]")) before = before.substr(0, before.length - 2);

  var after;
  if (before.includes(",")) {
    after = decode(Uint8Array.from(before.split(",")));
  } else {
    after = decode(Uint8Array.from(before.split(" ")));
  }
  document.getElementById("after").value = JSON.stringify(after);
  prettyPrint();
};

decode = (data) => {
  var after = msgpack.decode(data);
  if (typeof after === "object") {
    Object.keys(after).map((key) => {
      try {
        var afterafter = msgpack.decode(after[key]);
        if (typeof afterafter === "object") after[key] = afterafter;
      } catch (err) {}
    });
  }
  return after;
};

encodeToBase64 = () => {
  var after = document.getElementById("after").value;
  var before = _arrayBufferToBase64(msgpack.encode(JSON.parse(after)));
  document.getElementById("before").value = before;
};

encodeToByteArray = () => {
  var after = document.getElementById("after").value;
  var before = msgpack.encode(JSON.parse(after));

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
  var ugly = document.getElementById("after").value;
  var obj = JSON.parse(ugly);
  var pretty = JSON.stringify(obj, undefined, 4);
  document.getElementById("after").value = pretty;
};
