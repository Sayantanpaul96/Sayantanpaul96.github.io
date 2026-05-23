function toggleMobileMenu() {
  document.getElementById("menu").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  function setupCollapsible(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const collapsibleHeaders = container.querySelectorAll(
      ".collapsible-header"
    );

    collapsibleHeaders.forEach((header) => {
      header.addEventListener("click", function () {
        const content = this.nextElementSibling;

        this.classList.toggle("active");

        if (content.style.maxHeight) {
          // Collapse the content
          content.style.maxHeight = null;
          content.style.padding = "0";
        } else {
          // Expand the content
          console.log("content", content);
          content.style.maxHeight = content.scrollHeight + 100 + "px";
          content.style.padding = "10px";
        }
      });
    });
  }

  // Initialize collapsible functionality for each article
  setupCollapsible(".professional-projects");
  setupCollapsible(".personal-projects");
});
