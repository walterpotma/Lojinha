const API_BASE_URL = 'http://localhost:3200/api/v1';

async function getData() {
    try {
        const [respostaUsers, respostaProducts] = await Promise.all([
            fetch('js/data/user.json'),
            fetch('js/data/product.json')
        ]);

        const users = await respostaUsers.json();
        const products = await respostaProducts.json();

        return { users, products };
    } catch (error) {
        console.log(error);
        return { users: [], products: [], error };
    }
}

function search(searchInput, arrayToSearch, keysToSearch) {
    const searchLower = searchInput.toLowerCase();

    const filteredArray = arrayToSearch.filter(item => {
        return keysToSearch.some(key => {
            const value = item[key];
            if (typeof value === 'string') {
                return value.toLowerCase().includes(searchLower);
            }
            return false;
        });
    });

    return filteredArray;
}

function findById(id, arrayToSearch) {
    return arrayToSearch.find(item => item.id == id);
}

function paginate(items, currentPage, itemsPerPage) {
    const startIndex = (currentPage - 1) * itemsPerPage;

    const endIndex = startIndex + itemsPerPage;

    console.log("Itens na página:", items.slice(startIndex, endIndex));
    return items.slice(startIndex, endIndex);
}

// async function login(email, password) {
//     const data = await getData();
//     const user = search(email, data.users, ["email", "password"]);

//     if (user.length > 0) {
//         if (user[0].password === password) {
//             console.log("Senha correta");
//         } else {
//             console.log("Senha incorreta");
//         }
//     } else {
//         console.log("Usuário não encontrado")
//     }
// }



async function Login(event) {
    event.preventDefault();

    const email = document.getElementById("Email").value;
    const password = document.getElementById("password").value;
    try {

        console.log(email, password);

        const response = await fetch('http://localhost:3200/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Email: email, Password: password })
        });

        const result = await response.json();
        localStorage.setItem('token', result.token);
        if (response.ok) {
            console.log("Login successful:", result);
            window.location.href = "../../index.html";
        } else {
            console.log("Login failed:", result.message);
        }
    }
    catch (error) {
        console.log(error);
    }
}

async function getProducts() {
    try {
        const productGrid = document.getElementById("product-grid");
        if (!productGrid) {
            console.error("Elemento com ID 'product-grid' não encontrado.");
            return;
        }

        const response = await fetch(`${API_BASE_URL}/products`);

        if (!response.ok) {
            const errorResult = await response.json().catch(() => ({ message: "Erro desconhecido" }));
            throw new Error(errorResult.message || "Falha ao buscar produtos.");
        }

        // --- A CORREÇÃO PRINCIPAL ESTÁ AQUI ---
        // A API devolve um array diretamente, então guardamos esse array.
        const productsArray = await response.json();

        // Verificamos se o que recebemos é de facto um array.
        if (!Array.isArray(productsArray)) {
            console.error("A resposta da API não era um array de produtos.", productsArray);
            productGrid.innerHTML = `<p class="error-message">Formato de dados de produtos inesperado.</p>`;
            return;
        }

        if (productsArray.length === 0) {
            productGrid.innerHTML = `<p>Nenhum produto encontrado.</p>`;
            return;
        }

        // Agora, usamos .map() diretamente no array que recebemos.
        const productsHtml = productsArray.map(product => {
            return `
                <div class="product-card">
                    <div class="product-image-container">
                        <img
                            src="${product.imageUrl || './img/placeholder.png'}"
                            alt="${product.Name}" class="product-image"
                        />
                    </div>
                    <div class="product-info">
                        <h3 class="product-name">${product.Name}</h3> <p class="product-price">R$ ${Number(product.Price).toFixed(2).replace('.', ',')}</p> <button class="product-buy-btn" onclick="viewProduct(${product.Id})">Ver Mais</button> </div>
                </div>
            `;
        }).join('');

        productGrid.innerHTML = productsHtml;

    } catch (error) {
        console.error("Erro na função getProducts:", error);
        const productGrid = document.getElementById("product-grid");
        if (productGrid) {
            productGrid.innerHTML = `<p class="error-message">Não foi possível carregar os produtos. Tente novamente mais tarde.</p>`;
        }
    }
}

async function main() {
    console.log("Buscando dados...");
    const products = await getProducts();
    console.log(products);
}

main();