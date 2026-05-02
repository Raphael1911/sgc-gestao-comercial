const API_URL = 'http://localhost:3000/api';

export const buscarItens = async () => {
  const resposta = await fetch(`${API_URL}/itens`);
  if (!resposta.ok) throw new Error('Erro ao buscar itens');
  return resposta.json();
};

export const criarItem = async (item: any) => {
  const resposta = await fetch(`${API_URL}/itens`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!resposta.ok) throw new Error('Erro ao criar item');
  return resposta.json();
};

export const atualizarItem = async (id: string, item: any) => {
  const resposta = await fetch(`${API_URL}/itens/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!resposta.ok) throw new Error('Erro ao atualizar item');
  return resposta.json();
};

export const deletarItem = async (id: string) => {
  const resposta = await fetch(`${API_URL}/itens/${id}`, {
    method: 'DELETE',
  });
  if (!resposta.ok) throw new Error('Erro ao deletar item');
  return resposta.json();
};