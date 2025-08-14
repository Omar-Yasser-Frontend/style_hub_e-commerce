const token = document.getElementById("accessToken").innerText;
if (!token) {
  window.close();
}
window.opener.postMessage(token, "http://localhost:3000");
window.close();
