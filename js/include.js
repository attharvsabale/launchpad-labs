
document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (selector, file) => {
    fetch(file)
      .then(res => res.text())
      .then(data => {
        document.querySelector(selector).innerHTML = data;
      })
      .catch(err => console.error(`Error loading ${file}:`, err));
  };

  loadComponent("header[data-include]", "components/navbar.html");
  loadComponent("footer[data-include]", "components/footer.html");
});
