const BASE_URL = 'https://incluapi.vercel.app/api';

export const api = {
  // Autenticação
  login: async (document, password) => {
    const response = await fetch(`${BASE_URL}/validate/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documment: document,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer login');
    }

    return response.json();
  },

  // Cadastro de usuário
  registerUser: async (userData) => {
    const response = await fetch(`${BASE_URL}/new/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: userData.id,
        emai: userData.email,
        name: userData.name,
        password: userData.password,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar usuário');
    }

    return response.json();
  },

  // Cadastro de shopping
  registerShopping: async (shoppingData) => {
    const response = await fetch(`${BASE_URL}/new/shopping`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cep: shoppingData.cep,
        name: shoppingData.name,
        number: shoppingData.number,
        state: shoppingData.state,
        street: shoppingData.street,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao cadastrar shopping');
    }

    return response.json();
  },

  // Criar nova avaliação
  createReview: async (reviewData) => {
    const response = await fetch(`${BASE_URL}/new/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        shopping: reviewData.shopping,
        user: reviewData.user,
        rating: reviewData.rating,
        response: [{
          question: "Avaliação",
          response: reviewData.comment
        }]
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao criar avaliação');
    }

    return response.json();
  },

  // Buscar avaliações de um shopping específico
  getShoppingReviews: async (shoppingCEP) => {
    const response = await fetch(`${BASE_URL}/shopping/rate/${shoppingCEP}`);

    if (!response.ok) {
      throw new Error('Erro ao buscar avaliações do shopping');
    }

    return response.json();
  },

  // Buscar todas as avaliações
  getAllReviews: async () => {
    const response = await fetch(`${BASE_URL}/shopping/rates/`);

    if (!response.ok) {
      throw new Error('Erro ao buscar avaliações');
    }

    return response.json();
  },
}; 