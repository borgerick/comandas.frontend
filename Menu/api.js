// Shared API client for the frontend
// Edit BASE_URL to match your API host
const BASE_URL = 'http://localhost:5109';

async function fetchJson(url, options = {}) {
    const res = await fetch(url, Object.assign({
        headers: {
            'Content-Type': 'application/json'
        }
    }, options));

    if (!res.ok) {
        let text = await res.text();
        try { text = JSON.parse(text); } catch (e) { }
        throw new Error(`HTTP ${res.status}: ${text}`);
    }

    // No content
    if (res.status === 204) return;
    // Try to parse JSON, if fails return text
    try {
        return await res.json();
    } catch (e) {
        return await res.text();
    }
}

// Cardapio (CardapioItem)
async function getCardapioItems() {
    return await fetchJson(`${BASE_URL}/api/CardapioItem`);
}

async function getCardapioItem(id) {
    return await fetchJson(`${BASE_URL}/api/CardapioItem/${id}`);
}

async function createCardapioItem(payload) {
    return await fetchJson(`${BASE_URL}/api/CardapioItem`, { method: 'POST', body: JSON.stringify(payload) });
}

async function updateCardapioItem(id, payload) {
    return await fetchJson(`${BASE_URL}/api/CardapioItem/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

async function deleteCardapioItem(id) {
    return await fetchJson(`${BASE_URL}/api/CardapioItem/${id}`, { method: 'DELETE' });
}

// CategoriaCardapios
async function getCategorias() {
    return await fetchJson(`${BASE_URL}/api/CategoriaCardapios`);
}

async function getCategoria(id) {
    return await fetchJson(`${BASE_URL}/api/CategoriaCardapios/${id}`);
}

async function createCategoria(payload) {
    return await fetchJson(`${BASE_URL}/api/CategoriaCardapios`, { method: 'POST', body: JSON.stringify(payload) });
}

async function updateCategoria(id, payload) {
    return await fetchJson(`${BASE_URL}/api/CategoriaCardapios/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

async function deleteCategoria(id) {
    return await fetchJson(`${BASE_URL}/api/CategoriaCardapios/${id}`, { method: 'DELETE' });
}

// Comanda
async function getComandas() {
    return await fetchJson(`${BASE_URL}/api/Comanda`);
}
async function getComanda(id) {
    return await fetchJson(`${BASE_URL}/api/Comanda/${id}`);
}
async function createComanda(payload) {
    return await fetchJson(`${BASE_URL}/api/Comanda`, { method: 'POST', body: JSON.stringify(payload) });
}
async function updateComanda(id, payload) {
    return await fetchJson(`${BASE_URL}/api/Comanda/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}
async function deleteComanda(id) {
    return await fetchJson(`${BASE_URL}/api/Comanda/${id}`, { method: 'DELETE' });
}

// Mesa
async function getMesas() {
    return await fetchJson(`${BASE_URL}/api/Mesa`);
}
async function getMesa(id) {
    return await fetchJson(`${BASE_URL}/api/Mesa/${id}`);
}
async function createMesa(payload) {
    return await fetchJson(`${BASE_URL}/api/Mesa`, { method: 'POST', body: JSON.stringify(payload) });
}
async function updateMesa(id, payload) {
    return await fetchJson(`${BASE_URL}/api/Mesa/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}
async function deleteMesa(id) {
    return await fetchJson(`${BASE_URL}/api/Mesa/${id}`, { method: 'DELETE' });
}

// PedidoCozinha (map to Pedido pages)
async function getPedidosCozinha() {
    return await fetchJson(`${BASE_URL}/api/PedidoCozinha`);
}
async function getPedidoCozinha(id) {
    return await fetchJson(`${BASE_URL}/api/PedidoCozinha/${id}`);
}
async function createPedidoCozinha(payload) {
    return await fetchJson(`${BASE_URL}/api/PedidoCozinha`, { method: 'POST', body: JSON.stringify(payload) });
}
async function updatePedidoCozinha(id, payload) {
    return await fetchJson(`${BASE_URL}/api/PedidoCozinha/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}
async function deletePedidoCozinha(id) {
    return await fetchJson(`${BASE_URL}/api/PedidoCozinha/${id}`, { method: 'DELETE' });
}

// Reservas
async function getReservas() {
    return await fetchJson(`${BASE_URL}/api/Reservas`);
}
async function getReserva(id) {
    return await fetchJson(`${BASE_URL}/api/Reservas/${id}`);
}

async function createReserva(payload) {
    return await fetchJson(`${BASE_URL}/api/Reservas`, { method: 'POST', body: JSON.stringify(payload) });
}

async function updateReserva(id, payload) {
    return await fetchJson(`${BASE_URL}/api/Reservas/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}

async function deleteReserva(id) {
    return await fetchJson(`${BASE_URL}/api/Reservas/${id}`, { method: 'DELETE' });
}

// Usuario
async function getUsuarios() {
    return await fetchJson(`${BASE_URL}/api/Usuario`);
}
async function getUsuario(id) {
    return await fetchJson(`${BASE_URL}/api/Usuario/${id}`);
}
async function createUsuario(payload) {
    return await fetchJson(`${BASE_URL}/api/Usuario`, { method: 'POST', body: JSON.stringify(payload) });
}
async function updateUsuario(id, payload) {
    return await fetchJson(`${BASE_URL}/api/Usuario/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
}
async function deleteUsuario(id) {
    return await fetchJson(`${BASE_URL}/api/Usuario/${id}`, { method: 'DELETE' });
}

async function loginUsuario(payload) {
    return await fetchJson(`${BASE_URL}/api/Usuario/login`, { method: 'POST', body: JSON.stringify(payload) });
}

// Export to global namespace for use in pages
window.Api = {
    BASE_URL,
    getCardapioItems,
    getCardapioItem,
    createCardapioItem,
    updateCardapioItem,
    deleteCardapioItem,
    getCategorias,
    getCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    getComandas,
    getComanda,
    createComanda,
    updateComanda,
    deleteComanda,
    getMesas,
    getMesa,
    createMesa,
    updateMesa,
    deleteMesa,
    getPedidosCozinha,
    getPedidoCozinha,
    createPedidoCozinha,
    updatePedidoCozinha,
    deletePedidoCozinha,
    getReservas,
    getReserva,
    createReserva,
    updateReserva,
    deleteReserva,
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    loginUsuario
};
