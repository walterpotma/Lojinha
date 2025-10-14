document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURAÇÕES DA PAGINAÇÃO ---
    const productsPerPage = 9; // Define quantos produtos por página
    const productGrid = document.querySelector('.product-grid');
    const paginationContainer = document.querySelector('.pagination');
    
    // Verifica se os elementos necessários existem na página
    if (!productGrid || !paginationContainer) {
        console.warn('Elementos para paginação não encontrados.');
        return;
    }
    
    const productCards = Array.from(productGrid.querySelectorAll('.product-card'));
    if (productCards.length <= productsPerPage) {
        // Se não houver produtos suficientes para mais de uma página, não faz nada
        return;
    }

    const totalPages = Math.ceil(productCards.length / productsPerPage);
    let currentPage = 1;

    // --- FUNÇÃO PARA MOSTRAR OS PRODUTOS DA PÁGINA CORRETA ---
    function displayPage(page) {
        currentPage = page;
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;

        // Mostra ou esconde os cards de produto
        productCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        // Atualiza os botões da paginação
        renderPaginationControls();
    }

    // --- FUNÇÃO PARA CRIAR OS BOTÕES DE NAVEGAÇÃO ---
    function renderPaginationControls() {
        paginationContainer.innerHTML = ''; // Limpa os controles antigos

        // Botão "Anterior"
        const prevLi = document.createElement('li');
        if (currentPage === 1) {
            prevLi.classList.add('disabled');
            prevLi.innerHTML = `<span>&laquo;</span>`; // Seta para a esquerda
        } else {
            prevLi.innerHTML = `<a href="#" data-page="${currentPage - 1}">&laquo;</a>`;
        }
        paginationContainer.appendChild(prevLi);

        // Botões de número de página
        for (let i = 1; i <= totalPages; i++) {
            const pageLi = document.createElement('li');
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            pageLink.dataset.page = i;
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            pageLi.appendChild(pageLink);
            paginationContainer.appendChild(pageLi);
        }

        // Botão "Próximo"
        const nextLi = document.createElement('li');
        if (currentPage === totalPages) {
            nextLi.classList.add('disabled');
            nextLi.innerHTML = `<span>&raquo;</span>`; // Seta para a direita
        } else {
            nextLi.innerHTML = `<a href="#" data-page="${currentPage + 1}">&raquo;</a>`;
        }
        paginationContainer.appendChild(nextLi);
    }

    // --- ADICIONA O EVENTO DE CLIQUE NOS BOTÕES DA PAGINAÇÃO ---
    paginationContainer.addEventListener('click', (event) => {
        event.preventDefault();
        
        const target = event.target.closest('a');
        if (target) {
            const page = parseInt(target.dataset.page, 10);
            if (page !== currentPage) {
                displayPage(page);
                // Rola a tela para o topo da lista de produtos para uma melhor experiência
                productGrid.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // --- INICIALIZAÇÃO ---
    // Exibe a primeira página assim que o site carregar
    displayPage(1);
});