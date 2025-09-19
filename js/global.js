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

async function login(email, password) {
    const data = await getData();
    const user = search(email, data.users, ["email", "password"]);

    if (user.length > 0) {
        if (user[0].password === password) {
            console.log("Senha correta");
        } else {
            console.log("Senha incorreta");
        }
    } else {
        console.log("Usuário não encontrado")
    }
}

async function main() {
    console.log("Buscando dados...");
    const data = await getData();
}

main();