class SettingsManager {
    constructor() {
        this.settings = {
            emailNotifications: true,
            promotionNotifications: true,
            stockNotifications: false,
            publicProfile: false,
            shareData: true
        };
        
        this.initializeEvents();
        this.loadSettings();
    }

    initializeEvents() {
        // Switches
        document.querySelectorAll('.switch input').forEach(switchInput => {
            switchInput.addEventListener('change', (e) => {
                this.handleSettingChange(e.target);
            });
        });

        // Exportar dados
        document.querySelector('.btn-logout').addEventListener('click', () => {
            this.exportData();
        });
    }

    loadSettings() {
        // Carregar configurações salvas (simulação)
        const savedSettings = localStorage.getItem('marketplus-settings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }

        // Aplicar configurações nos switches
        this.applySettings();
    }

    applySettings() {
        document.querySelectorAll('.switch input').forEach(switchInput => {
            const settingName = this.getSettingNameFromSwitch(switchInput);
            if (settingName && this.settings[settingName] !== undefined) {
                switchInput.checked = this.settings[settingName];
            }
        });
    }

    getSettingNameFromSwitch(switchInput) {
        const labels = {
            'Notificações por Email': 'emailNotifications',
            'Notificações de Promoções': 'promotionNotifications',
            'Notificações de Estoque': 'stockNotifications',
            'Perfil Público': 'publicProfile',
            'Compartilhar Dados': 'shareData'
        };

        const settingName = switchInput.closest('.setting-item').querySelector('.setting-name').textContent;
        return labels[settingName];
    }

    handleSettingChange(switchInput) {
        const settingName = this.getSettingNameFromSwitch(switchInput);
        if (settingName) {
            this.settings[settingName] = switchInput.checked;
            this.saveSettings();
            
            // Feedback visual
            this.showToast(`Configuração ${switchInput.checked ? 'ativada' : 'desativada'}`);
        }
    }

    saveSettings() {
        localStorage.setItem('marketplus-settings', JSON.stringify(this.settings));
    }

    exportData() {
        // Simular exportação de dados
        const userData = {
            profile: {
                name: "João Silva",
                email: "joao@email.com",
                phone: "(41) 99999-9999"
            },
            orders: [
                { id: "MP-2024-001", total: 2099.70, date: "2024-01-15" },
                { id: "MP-2024-002", total: 2299.90, date: "2024-01-10" }
            ],
            addresses: [
                { name: "Casa", type: "home" },
                { name: "Trabalho", type: "work" }
            ],
            settings: this.settings
        };

        const dataStr = JSON.stringify(userData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        // Criar download
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `marketplus-dados-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showToast('Dados exportados com sucesso!');
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

// Funções globais para os modais
function openLogoutModal() {
    document.getElementById('logout-modal').classList.add('active');
}

function openDeleteModal() {
    document.getElementById('delete-modal').classList.add('active');
}

function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
}

function logout() {
    // Simular logout
    console.log('Usuário deslogado');
    alert('Você foi desconectado!');
    closeModals();
    // Redirecionar para login
    // window.location.href = '/login.html';
}

function deleteAccount() {
    // Simular exclusão de conta
    console.log('Conta excluída');
    alert('Sua conta foi excluída permanentemente!');
    closeModals();
    // Redirecionar para home
    // window.location.href = '/';
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    new SettingsManager();
});