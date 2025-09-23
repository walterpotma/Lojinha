{
  /* 
      <div id="header-component"></div>
  
      <div id="footer-component"></div>
  
      <div id="logo-component"></div>
  */
}

document.addEventListener("DOMContentLoaded", function () {
  const headerPlaceholder = document.getElementById("header-component");
  const footerPlaceholder = document.getElementById("footer-component");
  const logoPlaceholder = document.getElementById("logo-component");

  fetch("../components/header.html")
    .then((response) => response.text())
    .then((data) => {
      headerPlaceholder.innerHTML = data;
    })
    .catch((error) => {
      console.error("Erro ao carregar o header:", error);
      headerPlaceholder.innerHTML = "<p>Erro ao carregar o header.</p>";
    });

  fetch("../components/footer.html")
    .then((response) => response.text())
    .then((data) => {
      footerPlaceholder.innerHTML = data;
    })
    .catch((error) => {
      console.error("Erro ao carregar o footer:", error);
      footerPlaceholder.innerHTML = "<p>Erro ao carregar o footer.</p>";
    });

  function loadCSS(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }

  fetch("../../components/logo.html")
    .then((response) => response.text())
    .then((logoData) => {
      logoPlaceholder.innerHTML = logoData;
      loadCSS("../../css/components.css");
    })
    .catch((error) => {
      console.error("Erro ao carregar a logo:", error);
      logoPlaceholder.innerHTML = "<p>Erro ao carregar a logo.</p>";
    });
});
