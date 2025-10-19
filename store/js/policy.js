document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.policy-section');
    const navLinks = document.querySelectorAll('.policy-nav li a');

    if (sections.length === 0 || navLinks.length === 0) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove a classe 'active' de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Adiciona a classe 'active' ao link correspondente
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.policy-nav li a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.5, // Ativa quando 50% da seção está visível
        rootMargin: "-100px 0px -50% 0px" // Ajusta a "janela" de detecção
    });

    // Observa cada seção
    sections.forEach(section => {
        observer.observe(section);
    });
});