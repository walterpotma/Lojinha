// Função para carregar dados do usuário (se necessário)
function loadUserData() {
    // Simulação de dados do usuário
    const userData = {
        name: "Nome Cliente",
        email: "emailcliente@gmail.com",
        photo: "../../img/batata.png"
    };
    
    // Atualizar elementos da página
    document.querySelector('.customer_data h3').textContent = userData.name;
    document.querySelector('.customer_data p').textContent = userData.email;
    document.querySelector('.profile_photo').src = userData.photo;
}

// Função para editar foto de perfil
function setupProfilePhotoEdit() {
    const editOverlay = document.querySelector('.overlay');
    const profilePhoto = document.querySelector('.profile_photo');
    
    editOverlay.addEventListener('click', function() {
        // Simular upload de imagem
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    profilePhoto.src = event.target.result;
                    // Aqui você faria o upload para o servidor
                    console.log('Foto atualizada:', file.name);
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    setupProfilePhotoEdit();
    
    // Adicionar efeitos de hover nos cards
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.borderColor = 'var(--primary)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = 'var(--bg-light)';
            this.style.boxShadow = 'none';
        });
    });
});