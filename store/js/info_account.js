class AccountInfo {
    constructor() {
        this.isEditing = false;
        this.currentSection = null;
        this.initializeEvents();
    }

    initializeEvents() {
        // Botões de edição
        document.getElementById('edit-personal-btn').addEventListener('click', () => {
            this.toggleEditMode('personal');
        });

        document.getElementById('edit-password-btn').addEventListener('click', () => {
            this.toggleEditMode('password');
        });

        // Cancelar edição
        document.getElementById('cancel-edit').addEventListener('click', () => {
            this.cancelEdit();
        });

        // Submit do formulário
        document.getElementById('account-info-form').addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
    }

    toggleEditMode(section) {
        const form = document.getElementById('account-info-form');
        const actions = document.getElementById('form-actions');
        
        if (this.isEditing && this.currentSection === section) {
            // Se já está editando a mesma seção, cancela
            this.cancelEdit();
            return;
        }

        // Sai do modo de edição anterior se houver
        if (this.isEditing) {
            this.cancelEdit();
        }

        // Entra no modo de edição da nova seção
        this.isEditing = true;
        this.currentSection = section;

        // Ativa visualmente a seção sendo editada
        form.classList.add('editing');
        actions.style.display = 'flex';

        // Atualiza os botões de edição
        this.updateEditButtons();

        // Foca no primeiro campo da seção
        this.focusFirstField(section);
    }

    cancelEdit() {
        const form = document.getElementById('account-info-form');
        const actions = document.getElementById('form-actions');
        
        this.isEditing = false;
        this.currentSection = null;
        
        form.classList.remove('editing');
        actions.style.display = 'none';
        
        // Reseta os valores dos campos para os valores originais
        this.resetFormFields();
        this.updateEditButtons();
    }

    updateEditButtons() {
        const personalBtn = document.getElementById('edit-personal-btn');
        const passwordBtn = document.getElementById('edit-password-btn');

        if (this.isEditing) {
            // Atualiza o botão da seção atual para "Cancelar"
            const currentBtn = this.currentSection === 'personal' ? personalBtn : passwordBtn;
            currentBtn.innerHTML = '<i class="bi bi-x-lg"></i> Cancelar';
            currentBtn.classList.add('cancel');

            // Desabilita o outro botão
            const otherBtn = this.currentSection === 'personal' ? passwordBtn : personalBtn;
            otherBtn.disabled = true;
            otherBtn.style.opacity = '0.5';
        } else {
            // Restaura ambos os botões
            personalBtn.innerHTML = '<i class="bi bi-pencil"></i> Alterar';
            passwordBtn.innerHTML = '<i class="bi bi-key"></i> Alterar Senha';
            
            personalBtn.classList.remove('cancel');
            passwordBtn.classList.remove('cancel');
            
            personalBtn.disabled = false;
            passwordBtn.disabled = false;
            personalBtn.style.opacity = '1';
            passwordBtn.style.opacity = '1';
        }
    }

    focusFirstField(section) {
        let firstField;
        
        if (section === 'personal') {
            firstField = document.getElementById('account-name');
        } else {
            firstField = document.getElementById('current-password');
        }
        
        if (firstField) {
            firstField.focus();
        }
    }

    resetFormFields() {
        // Reseta os campos para seus valores originais
        const originalValues = {
            'account-name': 'Nome Cliente',
            'account-email': 'emailcliente@gmail.com',
            'account-phone': '(41) 99999-9999',
            'current-password': '',
            'new-password': '',
            'confirm-password': ''
        };

        for (const [id, value] of Object.entries(originalValues)) {
            const field = document.getElementById(id);
            if (field) {
                field.value = value;
            }
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.currentSection === 'password') {
            // Validação da senha
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (newPassword !== confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }
            
            if (newPassword.length > 0 && newPassword.length < 6) {
                alert('A senha deve ter no mínimo 6 caracteres!');
                return;
            }
        }

        // Aqui você faria a requisição para o backend
        this.saveChanges();
    }

    saveChanges() {
        // Simula o salvamento (substitua por chamada AJAX real)
        console.log('Salvando alterações...');
        
        // Atualiza os displays com os novos valores
        this.updateDisplays();
        
        // Mostra feedback visual
        this.showSuccessMessage();
        
        // Sai do modo de edição
        this.cancelEdit();
    }

    updateDisplays() {
        // Atualiza os campos de visualização com os novos valores
        const fieldsToUpdate = {
            'account-name': 'name-display',
            'account-email': 'email-display', 
            'account-phone': 'phone-display'
        };

        for (const [inputId, displayId] of Object.entries(fieldsToUpdate)) {
            const input = document.getElementById(inputId);
            const display = document.getElementById(displayId);
            
            if (input && display) {
                display.textContent = input.value;
            }
        }
    }

    showSuccessMessage() {
        // Cria um toast de sucesso
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
        toast.textContent = 'Alterações salvas com sucesso!';
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new AccountInfo();
});