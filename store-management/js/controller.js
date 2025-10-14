document.addEventListener("DOMContentLoaded", () => {
    const sidebarPlaceholder = document.getElementById("sidebar");
    if (sidebarPlaceholder) {
        // Calcula o caminho relativo baseado na estrutura atual
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment);
        
        // Encontra a posição de "store-management" no caminho
        const storeManagementIndex = pathSegments.indexOf("store-management");
        
        // Use caminho absoluto fixo para evitar problemas de resolução em páginas aninhadas
        const sidebarPath = "/store-management/components/menu-sidebar/menu_sidebar.html";

        console.log("Carregando sidebar de:", sidebarPath);

        fetch(sidebarPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                // Insere o conteúdo do sidebar
                sidebarPlaceholder.innerHTML = data;

                // Carrega o CSS específico do sidebar
                loadSidebarCSS(sidebarPath);
                
                // Carrega o JS específico do sidebar
                loadSidebarJS(sidebarPath);
            })
            .catch(error => {
                console.error("Erro ao carregar a sidebar:", error);
                sidebarPlaceholder.innerHTML = `<p>Erro ao carregar a sidebar: ${error.message}</p>`;
            });
    }
});

function loadSidebarCSS(sidebarPath) {
    // O CSS do sidebar está em store-management/css/menu-sidebar.css relativo à raiz do projeto
    // Usamos caminho absoluto a partir da raiz para evitar erros de resolução em páginas aninhadas
    const cssHref = '/store-management/css/menu-sidebar.css';

    if (!document.querySelector(`link[href="${cssHref}"]`)) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = cssHref;
        document.head.appendChild(cssLink);
    }
}

function loadSidebarJS() {
    // Carregamos o JS do sidebar via caminho absoluto fixo
    const scriptSrc = '/store-management/components/menu-sidebar/menu-sidebar.js';

    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
        const script = document.createElement('script');
        script.src = scriptSrc;
        script.defer = true;
        document.body.appendChild(script);
    }
}