document.addEventListener("DOMContentLoaded", () => {
    const navbarPlaceholder = document.getElementById("navbar-component");
    if (navbarPlaceholder) {
        // Detecta o caminho correto conforme a pasta
        let navbarPath = "components/menu-sidebar/menu_sidebar.html";
        if (window.location.pathname.includes("/store-management/")) {
            navbarPath = "../../components/menu-sidebar/menu_sidebar.html";
        }
        fetch(navbarPath)
            .then(response => response.text())
            .then(data => {
                // Extrai só o <nav> do componente, ignora <html>, <head>, <body>
                const temp = document.createElement("div");
                temp.innerHTML = data;
                const nav = temp.querySelector("nav#sidebar");
                if (nav) {
                    navbarPlaceholder.appendChild(nav);
                } else {
                    navbarPlaceholder.innerHTML = "<p>Navbar não encontrada.</p>";
                }
            })
            .catch(error => {
                console.error("Erro ao carregar a navbar:", error);
                navbarPlaceholder.innerHTML = "<p>Erro ao carregar a navbar.</p>";
            });
    }
});