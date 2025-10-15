document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO ACORDEÃO (PERGUNTAS E RESPOSTAS) ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        questionButton.addEventListener('click', () => {
            // Fecha outros itens abertos para manter apenas um ativo por vez (opcional)
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            
            // Alterna a classe 'active' no item clicado
            item.classList.toggle('active');
        });
    });


    // --- LÓGICA DAS ABAS DE CATEGORIA ---
    const categoryButtons = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.faq-category-content');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-category');

            // Remove a classe 'active' de todos os botões e conteúdos
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));

            // Adiciona a classe 'active' ao botão clicado e ao conteúdo correspondente
            button.classList.add('active');
            document.getElementById(targetCategory).classList.add('active');
        });
    });

    // --- LÓGICA DA BARRA DE BUSCA (BÔNUS) ---
    const searchInput = document.getElementById('faq-search-input');
    const allQuestions = document.querySelectorAll('.faq-item');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        // Mostra a primeira categoria (Pagamentos) para exibir os resultados da busca
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        categoryContents.forEach(content => content.classList.remove('active'));
        document.querySelector('.category-btn[data-category="pagamentos"]').classList.add('active');
        document.getElementById('pagamentos').classList.add('active');

        allQuestions.forEach(item => {
            const questionText = item.querySelector('.faq-question').textContent.toLowerCase();
            const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();

            if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});