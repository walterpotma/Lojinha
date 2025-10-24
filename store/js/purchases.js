class PurchasesManager {
    constructor() {
        this.orders = [
            {
                id: 'MP-2024-001',
                date: '2024-01-15',
                status: 'delivered',
                total: 2099.70,
                items: [
                    {
                        name: 'Processador AMD Ryzen 7 5800X',
                        category: 'Processadores',
                        price: 1499.90,
                        quantity: 1,
                        image: '/img/products/processor.jpg'
                    },
                    {
                        name: 'Memória RAM Corsair 16GB DDR4',
                        category: 'Memória RAM',
                        price: 299.90,
                        quantity: 2,
                        image: '/img/products/ram.jpg'
                    }
                ],
                tracking: {
                    steps: [
                        { status: 'confirmed', label: 'Pedido Confirmado', date: '10/01', completed: true },
                        { status: 'preparing', label: 'Preparando', date: '11/01', completed: true },
                        { status: 'shipped', label: 'Em Transporte', date: '12/01', completed: true },
                        { status: 'delivered', label: 'Entregue', date: '15/01', completed: true }
                    ]
                }
            },
            {
                id: 'MP-2024-002',
                date: '2024-01-10',
                status: 'shipped',
                total: 2299.90,
                items: [
                    {
                        name: 'Placa de Vídeo RTX 4060 8GB',
                        category: 'Placas de Vídeo',
                        price: 2299.90,
                        quantity: 1,
                        image: '/img/products/gpu.jpg'
                    }
                ],
                tracking: {
                    steps: [
                        { status: 'confirmed', label: 'Pedido Confirmado', date: '10/01', completed: true },
                        { status: 'preparing', label: 'Preparando', date: '11/01', completed: true },
                        { status: 'shipped', label: 'Em Transporte', date: '12/01', completed: false },
                        { status: 'delivered', label: 'Entregue', date: '-', completed: false }
                    ]
                }
            },
            {
                id: 'MP-2024-003',
                date: '2024-01-08',
                status: 'processing',
                total: 699.90,
                items: [
                    {
                        name: 'Placa Mãe B550M',
                        category: 'Placas Mãe',
                        price: 699.90,
                        quantity: 1,
                        image: '/img/products/motherboard.jpg'
                    }
                ]
            }
        ];
        
        this.initializeEvents();
    }

    initializeEvents() {
        // Filtros
        document.getElementById('search-orders').addEventListener('input', (e) => {
            this.filterOrders();
        });

        document.getElementById('status-filter').addEventListener('change', () => {
            this.filterOrders();
        });

        document.getElementById('period-filter').addEventListener('change', () => {
            this.filterOrders();
        });

        // Modal
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        // Fechar modal ao clicar fora
        document.getElementById('order-modal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('order-modal')) {
                this.closeModal();
            }
        });
    }

    filterOrders() {
        const searchTerm = document.getElementById('search-orders').value.toLowerCase();
        const statusFilter = document.getElementById('status-filter').value;
        const periodFilter = document.getElementById('period-filter').value;

        const filteredOrders = this.orders.filter(order => {
            // Filtro de busca
            const matchesSearch = searchTerm === '' || 
                order.id.toLowerCase().includes(searchTerm) ||
                order.items.some(item => item.name.toLowerCase().includes(searchTerm));

            // Filtro de status
            const matchesStatus = statusFilter === '' || order.status === statusFilter;

            // Filtro de período
            let matchesPeriod = true;
            if (periodFilter) {
                const orderDate = new Date(order.date);
                const daysAgo = new Date();
                daysAgo.setDate(daysAgo.getDate() - parseInt(periodFilter));
                matchesPeriod = orderDate >= daysAgo;
            }

            return matchesSearch && matchesStatus && matchesPeriod;
        });

        this.displayOrders(filteredOrders);
    }

    displayOrders(orders) {
        const container = document.getElementById('purchases-list');
        
        if (orders.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-cart-x"></i>
                    <h3>Nenhum pedido encontrado</h3>
                    <p>Não encontramos pedidos correspondentes aos seus filtros.</p>
                    <button class="btn btn-primary" onclick="clearFilters()">
                        <i class="bi bi-arrow-clockwise"></i> Limpar Filtros
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = orders.map(order => this.createOrderHTML(order)).join('');
    }

    createOrderHTML(order) {
        const statusText = {
            'pending': 'Pendente',
            'processing': 'Processando',
            'shipped': 'Em Transporte',
            'delivered': 'Entregue',
            'cancelled': 'Cancelado'
        };

        const statusClass = {
            'pending': 'pending',
            'processing': 'processing',
            'shipped': 'shipped',
            'delivered': 'delivered',
            'cancelled': 'cancelled'
        };

        const formattedDate = new Date(order.date).toLocaleDateString('pt-BR');
        const formattedTotal = order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        return `
            <div class="purchase-card" data-id="${order.id}">
                <div class="purchase-header">
                    <div class="purchase-info">
                        <div class="purchase-id">Pedido #${order.id}</div>
                        <div class="purchase-date">Realizado em ${formattedDate}</div>
                    </div>
                    <div class="purchase-status">
                        <span class="status-badge ${statusClass[order.status]}">${statusText[order.status]}</span>
                    </div>
                </div>
                
                <div class="purchase-items">
                    ${order.items.map(item => `
                        <div class="purchase-item">
                            <div class="item-image">
                                <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
                                <i class="bi bi-${this.getItemIcon(item.category)}" style="font-size: 1.5rem; color: var(--text-muted);"></i>
                            </div>
                            <div class="item-details">
                                <div class="item-name">${item.name}</div>
                                <div class="item-category">${item.category}</div>
                                <div class="item-price">${item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                                <div class="item-quantity">Quantidade: ${item.quantity}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                ${order.tracking ? this.createTrackingHTML(order.tracking) : ''}
                
                <div class="purchase-footer">
                    <div class="purchase-total">
                        <div class="total-label">Total do pedido</div>
                        <div class="total-value">${formattedTotal}</div>
                    </div>
                    <div class="purchase-actions">
                        ${this.createActionButtons(order)}
                    </div>
                </div>
            </div>
        `;
    }

    createTrackingHTML(tracking) {
        return `
            <div class="delivery-tracking">
                <div class="tracking-title">
                    <i class="bi bi-truck"></i>
                    Acompanhar Entrega
                </div>
                <div class="tracking-steps">
                    ${tracking.steps.map(step => `
                        <div class="tracking-step">
                            <div class="step-icon ${step.completed ? 'completed' : (step.status === 'shipped' ? 'active' : '')}">
                                ${step.completed ? '<i class="bi bi-check-lg"></i>' : 
                                  step.status === 'shipped' ? '<i class="bi bi-truck"></i>' : 
                                  '<i class="bi bi-clock"></i>'}
                            </div>
                            <div class="step-label">${step.label}</div>
                            <div class="step-date">${step.date}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    createActionButtons(order) {
        const baseButtons = `
            <button class="btn btn-outline" onclick="viewOrderDetails('${order.id}')">
                <i class="bi bi-eye"></i> Ver Detalhes
            </button>
        `;

        switch(order.status) {
            case 'delivered':
                return baseButtons + `
                    <button class="btn btn-secondary">
                        <i class="bi bi-download"></i> Nota Fiscal
                    </button>
                    <button class="btn btn-primary">
                        <i class="bi bi-arrow-repeat"></i> Comprar Novamente
                    </button>
                `;
            case 'shipped':
                return baseButtons + `
                    <button class="btn btn-secondary">
                        <i class="bi bi-geo-alt"></i> Rastrear
                    </button>
                `;
            case 'processing':
                return baseButtons + `
                    <button class="btn btn-secondary" onclick="cancelOrder('${order.id}')">
                        <i class="bi bi-x-circle"></i> Cancelar Pedido
                    </button>
                `;
            case 'pending':
                return baseButtons + `
                    <button class="btn btn-secondary" onclick="cancelOrder('${order.id}')">
                        <i class="bi bi-x-circle"></i> Cancelar Pedido
                    </button>
                `;
            default:
                return baseButtons;
        }
    }

    getItemIcon(category) {
        const icons = {
            'Processadores': 'cpu',
            'Placas de Vídeo': 'gpu-card',
            'Memória RAM': 'memory',
            'Placas Mãe': 'motherboard',
            'Fontes': 'lightning-charge',
            'Armazenamento': 'hdd'
        };
        return icons[category] || 'pc';
    }

    viewOrderDetails(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (!order) return;

        const modal = document.getElementById('order-modal');
        const content = document.getElementById('order-details-content');
        
        content.innerHTML = this.createOrderDetailsHTML(order);
        modal.classList.add('active');
    }

    createOrderDetailsHTML(order) {
        const formattedDate = new Date(order.date).toLocaleDateString('pt-BR');
        const formattedTotal = order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        return `
            <div class="purchase-info">
                <h3>Pedido #${order.id}</h3>
                <p>Realizado em: ${formattedDate}</p>
            </div>
            
            <div class="purchase-items">
                <h4>Itens do Pedido</h4>
                ${order.items.map(item => `
                    <div class="purchase-item">
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
                            <i class="bi bi-${this.getItemIcon(item.category)}" style="font-size: 1.5rem; color: var(--text-muted);"></i>
                        </div>
                        <div class="item-details">
                            <div class="item-name">${item.name}</div>
                            <div class="item-category">${item.category}</div>
                            <div class="item-price">${item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
                            <div class="item-quantity">Quantidade: ${item.quantity}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="purchase-total">
                <h4>Resumo do Pedido</h4>
                <p><strong>Total: ${formattedTotal}</strong></p>
            </div>
        `;
    }

    closeModal() {
        document.getElementById('order-modal').classList.remove('active');
    }
}

// Funções globais para uso nos botões
function viewOrderDetails(orderId) {
    purchasesManager.viewOrderDetails(orderId);
}

function clearFilters() {
    document.getElementById('search-orders').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('period-filter').value = '';
    purchasesManager.filterOrders();
}

function cancelOrder(orderId) {
    if (confirm('Tem certeza que deseja cancelar este pedido?')) {
        // Simular cancelamento
        console.log('Cancelando pedido:', orderId);
        alert('Pedido cancelado com sucesso!');
        // Em produção, faria uma requisição para a API
    }
}

// Inicializar quando o DOM carregar
let purchasesManager;
document.addEventListener('DOMContentLoaded', () => {
    purchasesManager = new PurchasesManager();
    purchasesManager.filterOrders();
});