{/* 
    <div id="header-component"></div>

    <div id="footer-component"></div>
    
    <div id="logo-component"></div>
*/}



document.addEventListener("DOMContentLoaded", function () {
    const headerPlaceholder = document.getElementById('header-component');
    const footerPlaceholder = document.getElementById('footer-component');


    fetch('../components/header.html')
        .then(response => response.text())
        .then(data => {
            headerPlaceholder.innerHTML = data;

    
            const logoPlaceholder = document.getElementById('logo-component');
            if (logoPlaceholder) {
                fetch('../components/logo.html')
                    .then(response => response.text())
                    .then(logoData => {
                        logoPlaceholder.innerHTML = logoData;
                    })
                    .catch(error => {
                        console.error('Erro ao carregar a logo:', error);
                        logoPlaceholder.innerHTML = "<p>Erro ao carregar a logo.</p>";
                    });
            }
        })
        .catch(error => {
            console.error('Erro ao carregar o header:', error);
            headerPlaceholder.innerHTML = "<p>Erro ao carregar o header.</p>";
        });
 
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(data => {
            footerPlaceholder.innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar o footer:', error);
            footerPlaceholder.innerHTML = "<p>Erro ao carregar o footer.</p>";
        });
});