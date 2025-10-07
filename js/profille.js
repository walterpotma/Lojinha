async function getAuthenticatedUser() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const response = await fetch(`${API_BASE_URL}/user/validtoken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            console.log("Status: Usuário autenticado.");
            console.log(response);
            return response.json();
        } else {
            console.log("Status: Token inválido ou expirado.");
            localStorage.removeItem('token'); // Limpa o token inválido
            return false;
        }
    } catch (error) {
        console.error("Erro de rede ao validar token:", error);
        return false;
    }
}

async function MyProfile() {
    
}