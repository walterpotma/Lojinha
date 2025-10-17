document.addEventListener("DOMContentLoaded", () => {
    const btnOutros = document.getElementById("btn-outros");
    const maisCategorias = document.getElementById("mais-categorias");

    btnOutros.addEventListener("click", () => {
        maisCategorias.classList.toggle("active");

        if (maisCategorias.classList.contains("active")) {
            btnOutros.querySelector("h3").textContent = "Mostrar menos";
        } else {
            btnOutros.querySelector("h3").textContent = "Outros";
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const productGrid = document.getElementById('product-grid');
    const productCards = Array.from(productGrid.querySelectorAll('.product-card'));

    // Controles do Filtro
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const sortOptions = document.getElementById('sort-options');

    // Elementos do Popover
    const openFiltersBtn = document.getElementById('open-filters-btn');
    const filterPopover = document.getElementById('filter-popover');
    const applyFiltersBtn = document.getElementById('apply-filters-btn');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');

    // --- LÓGICA DO POPOVER ---

    // Abre/fecha o popover quando o botão de filtros é clicado
    openFiltersBtn.addEventListener('click', () => {
        filterPopover.classList.toggle('active');
    });

    // Fecha o popover se clicar fora dele
    window.addEventListener('click', (event) => {
        if (!filterPopover.contains(event.target) && !openFiltersBtn.contains(event.target)) {
            filterPopover.classList.remove('active');
        }
    });

    // --- LÓGICA DOS FILTROS ---

    // Função principal que é chamada para aplicar as mudanças
    function applyFilterAndSort() {
        const minPrice = Math.max(0, parseFloat(priceMinInput.value) || 0);
        const maxPrice = Math.max(0, parseFloat(priceMaxInput.value) || Infinity);
        const sortBy = sortOptions.value;

        // 1. Filtragem
        const visibleProducts = productCards.filter(card => {
            const cardPrice = parseFloat(card.dataset.price);
            const isVisible = cardPrice >= minPrice && cardPrice <= maxPrice;
            card.style.display = isVisible ? 'flex' : 'none';
            return isVisible;
        });

        // 2. Ordenação
        let sortedProducts;
        switch (sortBy) {
            case 'price-asc':
                sortedProducts = visibleProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
                break;
            case 'price-desc':
                sortedProducts = visibleProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
                break;
            default:
                sortedProducts = productCards.filter(card => visibleProducts.includes(card));
                break;
        }

        // 3. Atualização do DOM
        sortedProducts.forEach(card => productGrid.appendChild(card));
    }

    // Aplica os filtros e fecha o popover ao clicar em "Aplicar"
    applyFiltersBtn.addEventListener('click', () => {
        applyFilterAndSort();
        filterPopover.classList.remove('active');
    });

    // Limpa os filtros e os aplica imediatamente
    clearFiltersBtn.addEventListener('click', () => {
        priceMinInput.value = '0';
        priceMaxInput.value = '';
        sortOptions.value = 'relevance';
        applyFilterAndSort();
    });

    // Aplica a ordenação inicial ao carregar a página
    applyFilterAndSort();
});