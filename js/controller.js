{/* 
    <div id="header-component"></div>

    <div id="footer-component"></div> 
*/}



document.addEventListener("DOMContentLoaded", function () {
    const headerPlaceholder = document.getElementById('header-component');
    const footerPlaceholder = document.getElementById('footer-component');

    fetch('../components/header.html')
        .then(response => response.text())
        .then(data => {
            headerPlaceholder.innerHTML = data;
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
            console.error('Erro ao carregar o header:', error);
            footerPlaceholder.innerHTML = "<p>Erro ao carregar o header.</p>";
        });
});