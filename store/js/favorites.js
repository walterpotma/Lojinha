class FavoritesManager {
    constructor() {
        this.favorites = [
            {
                id: 1,
                name: 'AMD Ryzen 7 5800X',
                category: 'processador',
                price: 1499.90,
                oldPrice: 1799.90,
                image: '/img/products/ryzen7.jpg',
                dateAdded: '2024-01-15'
            },
            {
                id: 2,
                name: 'RTX 4060 8GB GDDR6',
                category: 'placa-video',
                price: 2299.90,
                image: '/img/products/rtx4060.jpg',
                dateAdded: '2024-01-12'
            },
            {
                id: 3,
                name: 'Corsair 16GB DDR4 3200MHz',
                category: 'memoria',
                price: 299.90,
                oldPrice: 349.90,
                image: '/img/products/ram-corsair.jpg',
                dateAdded: '2024-01-10'
            }
        ];
        
        this.initializeEvents();
        this.displayFavorites();
    }

    initializeEvents() {
        // Filtros
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.filterFavorites();
        });

        document.getElementById('sort-filter').addEventListener('change', (e) => {
            this.sortFavorites(e.target.value);
        });
    }

    filterFavorites() {
        const category = document.getElementById('category-filter').value;
        const filtered = category ? this.favorites.filter(item => item.category === category) : this.favorites;
        this.displayFavorites(filtered);
    }

    sortFavorites(sortBy) {
        let sorted = [...this.favorites];
        
        switch(sortBy) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'recent':
            default:
                sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
        }
        
        this.displayFavorites(sorted);
    }

    displayFavorites(favorites = this.favorites) {
        const grid = document.getElementById('favorites-grid');
        
        if (favorites.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-heart"></i>
                    <h3>Nenhum produto favoritado</h3>
                    <p>Você ainda não adicionou nenhum produto aos favoritos. Explore nossa loja e adicione os produtos que você mais gosta!</p>
                    <a href="../product/offers.html" class="btn-explore">
                        <i class="bi bi-bag"></i> Explorar Produtos
                    </a>
                </div>
            `;
            return;
        }

        grid.innerHTML = favorites.map(product => `
            <div class="product-card" data-id="${product.id}" data-category="${product.category}">
                <button class="favorite-btn" onclick="toggleFavorite(${product.id})">
                    <i class="bi bi-heart-fill"></i>
                </button>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">
                    <div class="placeholder">
                        <i class="bi bi-${this.getCategoryIcon(product.category)}"></i>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${this.getCategoryName(product.category)}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price">
                        R$ ${product.price.toFixed(2).replace('.', ',')}
                        ${product.oldPrice ? `
                            <span class="product-old-price">R$ ${product.oldPrice.toFixed(2).replace('.', ',')}</span>
                            <span class="product-discount">-${Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
                        ` : ''}
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="addToCart(${product.id})">
                        <i class="bi bi-cart-plus"></i> Comprar
                    </button>
                    <button class="btn-icon" title="Remover dos favoritos" onclick="removeFromFavorites(${product.id})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    getCategoryIcon(category) {
        const icons = {
            'processador': 'cpu',
            'placa-video': 'gpu-card',
            'memoria': 'memory',
            'placa-mae': 'motherboard',
            'fonte': 'lightning-charge'
        };
        return icons[category] || 'pc';
    }

    getCategoryName(category) {
        const names = {
            'processador': 'Processador',
            'placa-video': 'Placa de Vídeo',
            'memoria': 'Memória RAM',
            'placa-mae': 'Placa Mãe',
            'fonte': 'Fonte'
        };
        return names[category] || category;
    }

    removeFavorite(productId) {
        this.favorites = this.favorites.filter(item => item.id !== productId);
        this.displayFavorites();
        this.showToast('Produto removido dos favoritos');
    }

    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--accent);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Funções globais
function toggleFavorite(productId) {
    // Em uma implementação real, isso alternaria o estado de favorito
    console.log('Toggle favorite:', productId);
}

function removeFromFavorites(productId) {
    if (confirm('Remover este produto dos favoritos?')) {
        favoritesManager.removeFavorite(productId);
    }
}

function addToCart(productId) {
    // Simular adição ao carrinho
    console.log('Adicionar ao carrinho:', productId);
    alert('Produto adicionado ao carrinho!');
}

// Inicializar
let favoritesManager;
document.addEventListener('DOMContentLoaded', () => {
    favoritesManager = new FavoritesManager();
});