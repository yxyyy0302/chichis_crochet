(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("themeToggle");
  const year = document.getElementById("year");
  const modal = document.getElementById("contactModal");

  const contactBtnIds = ["contactBtn", "contactBtn2", "contactBtn3"];
  const sendBtn = document.getElementById("fakeSend");
  const sendNote = document.getElementById("sendNote");

  year.textContent = new Date().getFullYear();

  // Load saved theme (if any)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    root.setAttribute("data-theme", savedTheme);
  }
  syncToggleUI();

  // Theme toggle
  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    syncToggleUI();
  });

  function syncToggleUI() {
    const t = root.getAttribute("data-theme") || "light";
    const icon = toggle.querySelector(".theme-toggle__icon");
    const text = toggle.querySelector(".theme-toggle__text");
    if (t === "dark") {
      icon.textContent = "☀️";
      text.textContent = "Light";
    } else {
      icon.textContent = "🌙";
      text.textContent = "Dark";
    }
  }

  // Contact modal open buttons
  contactBtnIds.forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener("click", () => {
      sendNote.hidden = true;
      if (typeof modal.showModal === "function") modal.showModal();
      else alert("Your browser does not support <dialog>."); // fallback
    });
  });

  // Demo send action
  sendBtn.addEventListener("click", () => {
    sendNote.hidden = false;
    // In real use, you would POST to your backend here.
    // Example: fetch("/api/contact", { method: "POST", body: ... })
  });
})();