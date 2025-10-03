{
  /* 
      <div id="header-component"></div>
  
      <div id="footer-component"></div>
  
      <div id="logo-component"></div>
  */
}

document.addEventListener("DOMContentLoaded", function () {
  const headerPlaceholder = document.getElementById("logged-header-component");
  const footerPlaceholder = document.getElementById("logged-footer-component");
  const logoPlaceholders = Array.from(document.querySelectorAll("#logo-component"));

  function loadCSS(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }

  // Normalize to root-absolute paths for consistency across pages
  const paths = {
    header: "/components/logged/html/header.html",
    footer: "/components/logged/html/footer.html",
    logo: "/components/logo.html",
    componentsCss: "/css/components.css",
  };

  // Load header if placeholder exists
  if (headerPlaceholder) {
    const headerPath = headerPlaceholder.getAttribute("data-src") || paths.header;
    fetch(headerPath)
      .then((response) => response.text())
      .then((data) => {
        headerPlaceholder.innerHTML = data;

        // After injecting header, also load logo into any logo slots, including inside header
        if (logoPlaceholders.length === 0) {
          // Re-scan after header injection (header may contain a logo placeholder)
          const headerLogoSlots = headerPlaceholder.querySelectorAll("#logo-component");
          headerLogoSlots.forEach((slot) => injectLogo(slot));
        } else {
          logoPlaceholders.forEach((slot) => injectLogo(slot));
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar o header:", error);
        headerPlaceholder.innerHTML = "<p>Erro ao carregar o header.</p>";
      });
  }

  // Load footer if placeholder exists
  if (footerPlaceholder) {
    fetch(paths.footer)
      .then((response) => response.text())
      .then((data) => {
        footerPlaceholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Erro ao carregar o footer:", error);
        footerPlaceholder.innerHTML = "<p>Erro ao carregar o footer.</p>";
      });
  }

  // If page wants standalone logo (like login), inject it
  if (logoPlaceholders.length > 0) {
    logoPlaceholders.forEach((slot) => injectLogo(slot));
  }

  function injectLogo(targetElement) {
    fetch(paths.logo)
      .then((response) => response.text())
      .then((logoData) => {
        targetElement.innerHTML = logoData;
        loadCSS(paths.componentsCss);
      })
      .catch((error) => {
        console.error("Erro ao carregar a logo:", error);
        targetElement.innerHTML = "<p>Erro ao carregar a logo.</p>";
      });
  }
});
