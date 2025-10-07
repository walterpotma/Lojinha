'use strict';

const paths = {
    header: "/components/unlogged/html/header.html",
    loggedHeader: "/components/logged/html/header.html",
    footer: "/components/unlogged/html/footer.html",
    footerLogged: "/components/logged/html/footer.html",
    logo: "/components/logo.html",
    componentsCss: "/css/components.css",
    
};

document.addEventListener("DOMContentLoaded", initializePage);

async function initializePage() {
    loadCSS(paths.componentsCss);

    const user = await getAuthenticatedUser();
    console.log(user);

    const headerPlaceholder = document.getElementById("header-component");
    const footerPlaceholder = document.getElementById("footer-component");

    await Promise.all([
        loadHeader(headerPlaceholder, user),
        loadFooter(footerPlaceholder, user)
    ]);

    loadLogos();
}

async function loadHeader(placeholder, user) {
    if (!placeholder) return;

    try {
        const isLoggedIn = !!user;
        const headerPath = isLoggedIn ? paths.loggedHeader : paths.header;

        // 1. Primeiro, injeta o HTML do header (seja logado ou não)
        await injectComponent(placeholder, headerPath);

        // 2. DEPOIS, APENAS se estiver logado, manipula o DOM para adicionar o nome
        if (isLoggedIn) {
            console.log("Utilizador autenticado, a tentar inserir o nome:", user);
            const nomeUserElement = document.getElementById("NomeUser");
            if (nomeUserElement) {
                // Acede de forma segura, pois já sabemos que 'user' existe
                nomeUserElement.textContent = user.user.Name;
            }
        }

        // 3. A lógica do logo continua a ser executada no final
        loadLogos(placeholder);

    } catch (error) {
        console.error("Falha crítica ao carregar o header:", error);
        placeholder.innerHTML = "<p>Erro ao carregar o cabeçalho.</p>";
    }
}

async function loadFooter(placeholder, user) {
    if (!placeholder) return;
    try {
        const isLoggedIn = !!user;
        const footerPath = isLoggedIn ? paths.footerLogged : paths.footer;
        await injectComponent(placeholder, footerPath);
    }
    catch (error) {
        console.error("Falha crítica ao carregar o footer:", error);
        placeholder.innerHTML = "<p>Erro ao carregar o rodapé.</p>";
    }
}

async function loadLogos(scope = document) {
    const logoPlaceholders = scope.querySelectorAll("#logo-component");
    const promises = Array.from(logoPlaceholders).map(slot => injectComponent(slot, paths.logo));
    await Promise.all(promises);
}

async function getAuthenticatedUser() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const response = await fetch(`${API_BASE_URL}/user/validtoken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log("Status: Usuário autenticado.");
            console.log(response);
            return response.json();
        } else {
            console.log("Status: Token inválido ou expirado.");
            localStorage.removeItem('token'); // Limpa o token inválido
            return false;
        }
    } catch (error) {
        console.error("Erro de rede ao validar token:", error);
        return false;
    }
}

async function injectComponent(placeholder, path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Arquivo não encontrado: ${path}`);
        const html = await response.text();
        placeholder.innerHTML = html;
    } catch (error) {
        console.error(`Falha ao injetar componente de "${path}":`, error);
        placeholder.innerHTML = `<p>Erro ao carregar componente.</p>`;
    }
}

function loadCSS(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
    }
}