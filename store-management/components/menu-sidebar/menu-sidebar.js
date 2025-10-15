// menu-sidebar.js
function toggleSidebar(){
    const sidebar = document.getElementById('sidebar');
    
    sidebar.classList.toggle('close');
    
    // Se estiver fechando o sidebar, fecha todos os submenus
    if(sidebar.classList.contains('close')){
        closeAllSubMenus();
    } else {
        // Se estiver abrindo o sidebar, reabre os submenus necessários
        setTimeout(() => {
            restoreActiveSubMenus();
        }, 100);
    }
}

function toggleSubMenu(button){
    const sidebar = document.getElementById('sidebar');

    if(!button.nextElementSibling.classList.contains('show')){
        closeAllSubMenus();
    }

    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');

    if(sidebar.classList.contains('close')){
        sidebar.classList.toggle('close');
    }
}

function closeAllSubMenus(){
    const sidebar = document.getElementById('sidebar');
    Array.from(sidebar.getElementsByClassName('show')).forEach(ul => {
        ul.classList.remove('show');
        ul.previousElementSibling.classList.remove('rotate');
    });
}

// Função para restaurar submenus ativos quando o sidebar é aberto
function restoreActiveSubMenus() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // Remove extensão .html para comparação
            const cleanHref = href.replace(/\.html$/, '').replace(/^\//, '');
            const cleanCurrentPath = currentPath.replace(/\.html$/, '').replace(/^\//, '');
            
            // Verifica se o caminho atual corresponde ao href
            const isMatch = cleanCurrentPath === cleanHref || 
                           cleanCurrentPath.endsWith(cleanHref) ||
                           cleanHref.endsWith(cleanCurrentPath);
            
            if (isMatch) {
                // Se for uma página de submenu, reabre o menu pai
                const parentLi = link.closest('li');
                if (parentLi) {
                    const parentSubMenu = parentLi.closest('.sub-menu');
                    if (parentSubMenu) {
                        const parentButton = parentSubMenu.previousElementSibling;
                        if (parentButton) {
                            parentSubMenu.classList.add('show');
                            parentButton.classList.add('rotate');
                        }
                    }
                }
            }
        }
    });
    
    // Se não encontrou match exato, tenta match parcial para páginas aninhadas
    const hasActiveSubMenu = document.querySelector('#sidebar .sub-menu.show');
    if (!hasActiveSubMenu) {
        const pathSegments = currentPath.split('/').filter(segment => segment);
        
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const hrefSegments = href.split('/').filter(segment => segment);
                const lastSegment = pathSegments[pathSegments.length - 1];
                const lastHrefSegment = hrefSegments[hrefSegments.length - 1]?.replace(/\.html$/, '');
                
                if (lastSegment === lastHrefSegment) {
                    const parentLi = link.closest('li');
                    if (parentLi) {
                        const parentSubMenu = parentLi.closest('.sub-menu');
                        if (parentSubMenu) {
                            const parentButton = parentSubMenu.previousElementSibling;
                            if (parentButton) {
                                parentSubMenu.classList.add('show');
                                parentButton.classList.add('rotate');
                            }
                        }
                    }
                }
            }
        });
    }
}

// Função para destacar a página ativa
function highlightActivePage() {
    const currentPath = window.location.pathname;
    const sidebarLinks = document.querySelectorAll('#sidebar a');
    
    // Remove a classe 'active' de todos os itens
    document.querySelectorAll('#sidebar li').forEach(li => {
        li.classList.remove('active');
    });
    
    // Remove classes de submenu abertos
    document.querySelectorAll('.sub-menu').forEach(submenu => {
        submenu.classList.remove('show');
    });
    document.querySelectorAll('.dropdown-btn').forEach(btn => {
        btn.classList.remove('rotate');
    });
    
    // Procura pelo link que corresponde à página atual
    let foundMatch = false;
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            // Remove extensão .html para comparação
            const cleanHref = href.replace(/\.html$/, '').replace(/^\//, '');
            const cleanCurrentPath = currentPath.replace(/\.html$/, '').replace(/^\//, '');
            
            // Verifica se o caminho atual corresponde ao href
            if (cleanCurrentPath === cleanHref || 
                cleanCurrentPath.endsWith(cleanHref) ||
                cleanHref.endsWith(cleanCurrentPath)) {
                
                // Adiciona a classe 'active' ao li pai
                const parentLi = link.closest('li');
                if (parentLi) {
                    parentLi.classList.add('active');
                    foundMatch = true;
                    
                    // Se for uma página de submenu, também destaca o menu pai
                    const parentSubMenu = parentLi.closest('.sub-menu');
                    if (parentSubMenu) {
                        const parentButton = parentSubMenu.previousElementSibling;
                        if (parentButton) {
                            parentSubMenu.classList.add('show');
                            parentButton.classList.add('rotate');
                        }
                    }
                }
            }
        }
    });
    
    // Se não encontrou match exato, tenta match parcial para páginas aninhadas
    if (!foundMatch) {
        const pathSegments = currentPath.split('/').filter(segment => segment);
        
        sidebarLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const hrefSegments = href.split('/').filter(segment => segment);
                const lastSegment = pathSegments[pathSegments.length - 1];
                const lastHrefSegment = hrefSegments[hrefSegments.length - 1]?.replace(/\.html$/, '');
                
                if (lastSegment === lastHrefSegment) {
                    const parentLi = link.closest('li');
                    if (parentLi) {
                        parentLi.classList.add('active');
                        
                        // Se for uma página de submenu, também destaca o menu pai
                        const parentSubMenu = parentLi.closest('.sub-menu');
                        if (parentSubMenu) {
                            const parentButton = parentSubMenu.previousElementSibling;
                            if (parentButton) {
                                parentSubMenu.classList.add('show');
                                parentButton.classList.add('rotate');
                            }
                        }
                    }
                }
            }
        });
    }
}

// Adiciona event listeners quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Aguarda um pouco para garantir que o sidebar foi carregado
    setTimeout(highlightActivePage, 100);
});