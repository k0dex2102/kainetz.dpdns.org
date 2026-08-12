const title = document.getElementById("title");
const content = document.getElementById("content");
const preview = document.getElementById("preview");
const status = document.getElementById("status");

function load() {
  title.value = localStorage.getItem("kai-note-title") || "";
  content.value = localStorage.getItem("kai-note-content") || "";
  preview.textContent = content.value || "Noch keine Notiz.";
}
document.getElementById("save").onclick = () => {
  localStorage.setItem("kai-note-title", title.value);
  localStorage.setItem("kai-note-content", content.value);
  preview.textContent = content.value || "Noch keine Notiz.";
  status.textContent = "Gespeichert ✓";
  setTimeout(() => (status.textContent = ""), 1500);
};
document.getElementById("clear").onclick = () => {
  title.value = "";
  content.value = "";
  localStorage.removeItem("kai-note-title");
  localStorage.removeItem("kai-note-content");
  preview.textContent = "Noch keine Notiz.";
  status.textContent = "Gelöscht";
};
load();
