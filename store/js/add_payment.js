class PaymentMethods {
    constructor() {
        this.savedMethods = [
            {
                id: 1,
                type: 'credit',
                brand: 'Mastercard',
                last4: '1234',
                expiry: '12/2025',
                isDefault: true
            },
            {
                id: 2,
                type: 'credit', 
                brand: 'Visa',
                last4: '5678',
                expiry: '08/2026',
                isDefault: false
            }
        ];
        
        this.initializeEvents();
    }

    initializeEvents() {
        // Abrir modal
        document.getElementById('add-method-trigger').addEventListener('click', () => {
            this.openModal();
        });

        // Fechar modal
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancel-add').addEventListener('click', () => {
            this.closeModal();
        });

        // Tipo de pagamento
        document.querySelectorAll('.payment-type').forEach(type => {
            type.addEventListener('click', () => {
                this.selectPaymentType(type);
            });
        });

        // Formatar inputs e validações em tempo real
        this.initializeInputEvents();

        // Submit do formulário
        document.getElementById('payment-form').addEventListener('submit', (e) => {
            this.handleAddCard(e);
        });

        // Ações dos cartões salvos
        this.initializeSavedCardsEvents();
    }

    initializeInputEvents() {
        const cardNumber = document.getElementById('card-number');
        const cardExpiry = document.getElementById('card-expiry');
        const cardCvv = document.getElementById('card-cvv');

        // Formatar número do cartão
        cardNumber.addEventListener('input', (e) => {
            this.formatCardNumber(e.target);
            this.clearError(e.target);
        });

        // Formatar validade
        cardExpiry.addEventListener('input', (e) => {
            this.formatExpiry(e.target);
            this.clearError(e.target);
        });

        // Limitar CVV
        cardCvv.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
            this.clearError(e.target);
        });

        // Validação em tempo real ao sair do campo
        [cardNumber, cardExpiry, cardCvv, document.getElementById('card-name')].forEach(input => {
            input.addEventListener('blur', (e) => {
                this.validateField(e.target);
            });
        });
    }

    formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        input.value = value.substring(0, 19);
    }

    formatExpiry(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value.substring(0, 5);
    }

    validateField(input) {
        const value = input.value.trim();
        
        switch(input.id) {
            case 'card-number':
                if (value.replace(/\s/g, '').length !== 16) {
                    this.showFieldError(input, 'Número do cartão deve ter 16 dígitos');
                    return false;
                }
                break;
                
            case 'card-name':
                if (value.length < 3) {
                    this.showFieldError(input, 'Nome deve ter pelo menos 3 caracteres');
                    return false;
                }
                break;
                
            case 'card-expiry':
                if (!value.match(/^\d{2}\/\d{2}$/)) {
                    this.showFieldError(input, 'Formato inválido (MM/AA)');
                    return false;
                }
                break;
                
            case 'card-cvv':
                if (value.length !== 3) {
                    this.showFieldError(input, 'CVV deve ter 3 dígitos');
                    return false;
                }
                break;
        }
        
        return true;
    }

    showFieldError(input, message) {
        input.classList.add('error');
        
        // Remove mensagem de erro anterior
        let errorElement = input.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            input.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearError(input) {
        input.classList.remove('error');
        const errorElement = input.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    openModal() {
        document.getElementById('add-method-modal').classList.add('active');
        // Focar no primeiro campo
        setTimeout(() => {
            document.getElementById('card-number').focus();
        }, 300);
    }

    closeModal() {
        document.getElementById('add-method-modal').classList.remove('active');
        this.resetForm();
    }

    selectPaymentType(selectedType) {
        document.querySelectorAll('.payment-type').forEach(type => {
            type.classList.remove('selected');
        });
        selectedType.classList.add('selected');
    }

    resetForm() {
        document.getElementById('payment-form').reset();
        document.querySelector('.payment-type[data-type="credit"]').click();
        
        // Limpar erros
        document.querySelectorAll('.error').forEach(input => {
            this.clearError(input);
        });
    }

    handleAddCard(e) {
        e.preventDefault();
        
        const cardData = {
            number: document.getElementById('card-number').value,
            name: document.getElementById('card-name').value,
            expiry: document.getElementById('card-expiry').value,
            cvv: document.getElementById('card-cvv').value,
            isDefault: document.getElementById('default-card').checked,
            saveCard: document.getElementById('save-card').checked,
            type: document.querySelector('.payment-type.selected').dataset.type
        };

        // Validar todos os campos
        let isValid = true;
        const fields = ['card-number', 'card-name', 'card-expiry', 'card-cvv'];
        
        fields.forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showError('Por favor, corrija os erros no formulário');
            return;
        }

        // Simular adição do cartão
        this.addNewCard(cardData);
    }

    addNewCard(cardData) {
        // Simular API call
        console.log('Adicionando cartão:', cardData);
        
        // Aqui você faria a requisição real para o backend
        setTimeout(() => {
            this.closeModal();
            this.showSuccess('Cartão adicionado com sucesso!');
            
            // Em uma implementação real, você atualizaria a lista aqui
            // this.updateSavedMethodsList();
        }, 1000);
    }

    initializeSavedCardsEvents() {
        // Definir como padrão
        document.querySelectorAll('.btn-icon:not([disabled])').forEach(btn => {
            if (btn.querySelector('.bi-star')) {
                btn.addEventListener('click', (e) => {
                    this.setAsDefault(e);
                });
            }
        });

        // Remover cartão
        document.querySelectorAll('.btn-icon.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.removeCard(e);
            });
        });
    }

    setAsDefault(e) {
        const cardElement = e.target.closest('.payment-method-card');
        
        // Atualizar visualmente
        document.querySelectorAll('.payment-method-card').forEach(card => {
            card.classList.remove('default');
        });
        cardElement.classList.add('default');
        
        this.showSuccess('Método de pagamento definido como padrão!');
    }

    removeCard(e) {
        const cardElement = e.target.closest('.payment-method-card');
        
        if (confirm('Tem certeza que deseja remover este método de pagamento?')) {
            cardElement.style.opacity = '0';
            cardElement.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                cardElement.remove();
                this.showSuccess('Método de pagamento removido!');
                
                // Verificar se não há mais cartões
                if (document.querySelectorAll('.payment-method-card').length === 0) {
                    this.showEmptyState();
                }
            }, 300);
        }
    }

    showEmptyState() {
        const methodsList = document.getElementById('saved-methods-list');
        methodsList.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-credit-card"></i>
                <p>Nenhum método de pagamento cadastrado</p>
            </div>
        `;
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
    new PaymentMethods();
});