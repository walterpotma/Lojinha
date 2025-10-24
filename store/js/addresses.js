class AddressManager {
    constructor() {
        this.savedAddresses = [
            {
                id: 1,
                name: 'Casa',
                type: 'home',
                recipient: 'João Silva',
                street: 'Rua das Flores, 123',
                neighborhood: 'Jardim das Américas',
                city: 'Curitiba',
                state: 'PR',
                cep: '81530-000',
                phone: '(41) 99999-9999',
                isDefault: true
            },
            {
                id: 2,
                name: 'Trabalho',
                type: 'work',
                recipient: 'João Silva',
                street: 'Av. República Argentina, 1234',
                neighborhood: 'Água Verde',
                city: 'Curitiba',
                state: 'PR',
                cep: '80240-210',
                phone: '(41) 98888-8888',
                isDefault: false
            }
        ];
        
        this.isEditing = false;
        this.currentEditId = null;
        
        this.initializeEvents();
    }

    initializeEvents() {
        // Abrir modal para adicionar
        document.getElementById('add-address-trigger').addEventListener('click', () => {
            this.openModal('add');
        });

        // Fechar modal
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancel-form').addEventListener('click', () => {
            this.closeModal();
        });

        // Formatar CEP
        document.getElementById('cep').addEventListener('input', (e) => {
            this.formatCEP(e.target);
        });

        // Buscar CEP (opcional)
        document.getElementById('cep').addEventListener('blur', (e) => {
            if (e.target.value.replace(/\D/g, '').length === 8) {
                this.searchCEP(e.target.value);
            }
        });

        // Submit do formulário
        document.getElementById('address-form').addEventListener('submit', (e) => {
            this.handleSaveAddress(e);
        });

        // Inicializar eventos dos endereços salvos
        this.initializeSavedAddressesEvents();
    }

    openModal(mode, addressId = null) {
        const modal = document.getElementById('address-modal');
        const title = document.getElementById('modal-title');
        
        if (mode === 'edit' && addressId) {
            this.isEditing = true;
            this.currentEditId = addressId;
            title.textContent = 'Editar Endereço';
            this.fillForm(addressId);
        } else {
            this.isEditing = false;
            this.currentEditId = null;
            title.textContent = 'Adicionar Endereço';
            this.resetForm();
        }
        
        modal.classList.add('active');
    }

    closeModal() {
        document.getElementById('address-modal').classList.remove('active');
        this.resetForm();
    }

    fillForm(addressId) {
        const address = this.savedAddresses.find(addr => addr.id == addressId);
        if (!address) return;

        document.getElementById('address-name').value = address.name;
        document.getElementById('address-type').value = address.type;
        document.getElementById('recipient-name').value = address.recipient;
        document.getElementById('cep').value = address.cep;
        document.getElementById('street').value = address.street.split(',')[0];
        document.getElementById('number').value = address.street.split(',')[1]?.trim() || '';
        document.getElementById('neighborhood').value = address.neighborhood;
        document.getElementById('city').value = address.city;
        document.getElementById('state').value = address.state;
        document.getElementById('phone').value = address.phone;
        document.getElementById('default-address').checked = address.isDefault;
    }

    resetForm() {
        document.getElementById('address-form').reset();
        this.isEditing = false;
        this.currentEditId = null;
    }

    formatCEP(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length > 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 8);
        }
        input.value = value;
    }

    async searchCEP(cep) {
        const cleanCEP = cep.replace(/\D/g, '');
        
        if (cleanCEP.length !== 8) return;

        try {
            // Simulação de busca de CEP - em produção, use uma API real
            console.log('Buscando CEP:', cleanCEP);
            
            // Exemplo de como seria com a API ViaCEP:
            // const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
            // const data = await response.json();
            
            // Por enquanto, vamos simular com dados mock
            setTimeout(() => {
                if (cleanCEP === '81530000') {
                    document.getElementById('street').value = 'Rua das Flores';
                    document.getElementById('neighborhood').value = 'Jardim das Américas';
                    document.getElementById('city').value = 'Curitiba';
                    document.getElementById('state').value = 'PR';
                }
            }, 500);
            
        } catch (error) {
            console.error('Erro ao buscar CEP:', error);
        }
    }

    handleSaveAddress(e) {
        e.preventDefault();
        
        const addressData = {
            name: document.getElementById('address-name').value,
            type: document.getElementById('address-type').value,
            recipient: document.getElementById('recipient-name').value,
            cep: document.getElementById('cep').value,
            street: document.getElementById('street').value + ', ' + document.getElementById('number').value,
            neighborhood: document.getElementById('neighborhood').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            phone: document.getElementById('phone').value,
            isDefault: document.getElementById('default-address').checked
        };

        if (!this.validateAddress(addressData)) {
            return;
        }

        if (this.isEditing) {
            this.updateAddress(this.currentEditId, addressData);
        } else {
            this.addNewAddress(addressData);
        }
    }

    validateAddress(address) {
        if (!address.name.trim()) {
            this.showError('Apelido do endereço é obrigatório');
            return false;
        }

        if (!address.recipient.trim()) {
            this.showError('Nome do destinatário é obrigatório');
            return false;
        }

        if (address.cep.replace(/\D/g, '').length !== 8) {
            this.showError('CEP inválido');
            return false;
        }

        if (!address.street.trim()) {
            this.showError('Rua é obrigatória');
            return false;
        }

        if (!address.neighborhood.trim()) {
            this.showError('Bairro é obrigatório');
            return false;
        }

        if (!address.city.trim()) {
            this.showError('Cidade é obrigatória');
            return false;
        }

        if (!address.state) {
            this.showError('Estado é obrigatório');
            return false;
        }

        return true;
    }

    addNewAddress(addressData) {
        const newAddress = {
            ...addressData,
            id: Date.now(), // ID único
            isDefault: addressData.isDefault || this.savedAddresses.length === 0
        };

        // Se definir como padrão, remove padrão dos outros
        if (newAddress.isDefault) {
            this.savedAddresses.forEach(addr => addr.isDefault = false);
        }

        this.savedAddresses.push(newAddress);
        this.closeModal();
        this.showSuccess('Endereço adicionado com sucesso!');
        this.updateAddressesList();
    }

    updateAddress(addressId, addressData) {
        const addressIndex = this.savedAddresses.findIndex(addr => addr.id == addressId);
        
        if (addressIndex === -1) return;

        // Se definir como padrão, remove padrão dos outros
        if (addressData.isDefault) {
            this.savedAddresses.forEach(addr => addr.isDefault = false);
        }

        this.savedAddresses[addressIndex] = {
            ...this.savedAddresses[addressIndex],
            ...addressData
        };

        this.closeModal();
        this.showSuccess('Endereço atualizado com sucesso!');
        this.updateAddressesList();
    }

    initializeSavedAddressesEvents() {
        // Delegation para os botões de ação
        document.getElementById('addresses-list').addEventListener('click', (e) => {
            const addressCard = e.target.closest('.address-card');
            if (!addressCard) return;

            const addressId = addressCard.dataset.id;

            if (e.target.closest('.btn-icon.delete')) {
                this.removeAddress(addressId);
            } else if (e.target.closest('.btn-icon .bi-pencil')) {
                this.openModal('edit', addressId);
            } else if (e.target.closest('.btn-icon .bi-star')) {
                this.setAsDefault(addressId);
            }
        });
    }

    removeAddress(addressId) {
        const address = this.savedAddresses.find(addr => addr.id == addressId);
        
        if (!address) return;

        if (address.isDefault) {
            this.showError('Não é possível remover o endereço principal');
            return;
        }

        if (confirm('Tem certeza que deseja remover este endereço?')) {
            this.savedAddresses = this.savedAddresses.filter(addr => addr.id != addressId);
            this.showSuccess('Endereço removido com sucesso!');
            this.updateAddressesList();
        }
    }

    setAsDefault(addressId) {
        this.savedAddresses.forEach(addr => {
            addr.isDefault = addr.id == addressId;
        });

        this.showSuccess('Endereço definido como principal!');
        this.updateAddressesList();
    }

    updateAddressesList() {
        const addressesList = document.getElementById('addresses-list');
        
        if (this.savedAddresses.length === 0) {
            addressesList.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-house-door"></i>
                    <p>Nenhum endereço cadastrado</p>
                </div>
            `;
            return;
        }

        addressesList.innerHTML = this.savedAddresses.map(address => `
            <div class="address-card ${address.isDefault ? 'default' : ''}" data-id="${address.id}">
                <div class="address-header">
                    <div>
                        <div class="address-name">${address.name}</div>
                        <span class="address-type">${this.getTypeText(address.type)}</span>
                    </div>
                </div>
                <div class="address-details">
                    <p><strong>${address.recipient}</strong></p>
                    <p>${address.street}</p>
                    <p>${address.neighborhood}</p>
                    <p>${address.city} - ${address.state}, ${address.cep}</p>
                    <p>${address.phone}</p>
                </div>
                <div class="address-actions">
                    <button class="btn-icon" title="Editar endereço">
                        <i class="bi bi-pencil"></i>
                    </button>
                    ${!address.isDefault ? `
                        <button class="btn-icon" title="Definir como principal">
                            <i class="bi bi-star"></i>
                        </button>
                    ` : ''}
                    ${!address.isDefault ? `
                        <button class="btn-icon delete" title="Remover endereço">
                            <i class="bi bi-trash"></i>
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    getTypeText(type) {
        const types = {
            'home': 'Residencial',
            'work': 'Comercial',
            'other': 'Outro'
        };
        return types[type] || 'Outro';
    }

    showSuccess(message) {
        this.showToast(message, 'success');
    }

    showError(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accent)' : 'var(--error)'};
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

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    const addressManager = new AddressManager();
    addressManager.updateAddressesList();
});