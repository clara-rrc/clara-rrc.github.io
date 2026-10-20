// Versão GitHub Pages: sem servidor. Só anti-tabnabbing e copiar cupom.

// Todo link externo: target="_blank" + rel="noopener noreferrer"
for (const a of document.querySelectorAll("a[href]")) {
  let url;
  try { url = new URL(a.href, location.href); } catch { continue; }
  if (url.protocol !== "http:" && url.protocol !== "https:") continue;
  if (url.origin !== location.origin) {
    a.target = "_blank";
    const rel = new Set(a.rel.split(/\s+/).filter(Boolean));
    rel.add("noopener"); rel.add("noreferrer");
    a.rel = [...rel].join(" ");
  }
}

// Copiar cupom
const toast = document.querySelector(".toast");
let timer;
function showToast(text) {
  toast.textContent = text;
  toast.dataset.show = "";
  clearTimeout(timer);
  timer = setTimeout(() => delete toast.dataset.show, 1800);
}
for (const btn of document.querySelectorAll("[data-copy]")) {
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.dataset.done = "";
      showToast(`Cupom ${btn.dataset.copy} copiado`);
    } catch {
      showToast(`Cupom: ${btn.dataset.copy}`);
    }
  });
}
