

const API_URL = 'https://crud-api.onrender.com/api';

const form = document.getElementById('form-contato');
const tabela = document.getElementById('tabela-contatos');

let idEditando = null; // usado para saber se está editando

// Carrega todos os contatos
async function carregarContatos() {
  const resposta = await fetch(API_URL);
  const contatos = await resposta.json();

  tabela.innerHTML = '';

  contatos.forEach(contato => {
    const linha = document.createElement('tr');

    linha.innerHTML = `
      <td>${contato.nome}</td>
      <td>${contato.email || ''}</td>
      <td>${contato.telefone || ''}</td>
      <td>
        <button class="editar" onclick="editarContato('${contato._id}')">Editar</button>
        <button class="excluir" onclick="excluirContato('${contato._id}')">Excluir</button>
      </td>
    `;

    tabela.appendChild(linha);
  });
}

// Enviar formulário (salvar ou atualizar)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;

  const contato = { nome, email, telefone };

  if (idEditando) {
    // Atualizar
    const resposta = await fetch(`${API_URL}/${idEditando}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contato)
    });

    if (resposta.ok) {
      alert('Contato atualizado com sucesso!');
      idEditando = null;
      form.reset();
      carregarContatos();
    } else {
      alert('Erro ao atualizar contato');
    }
  } else {
    // Criar
    const resposta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contato)
    });

    if (resposta.ok) {
      alert('Contato salvo com sucesso!');
      form.reset();
      carregarContatos();
    } else {
      alert('Erro ao salvar contato');
    }
  }
});

// Função para excluir contato
async function excluirContato(id) {
  const confirmar = confirm('Deseja realmente excluir este contato?');
  if (!confirmar) return;

  const resposta = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (resposta.ok) {
    alert('Contato excluído!');
    carregarContatos();
  } else {
    alert('Erro ao excluir contato');
  }
}

// Função para editar contato
async function editarContato(id) {
  const resposta = await fetch(`${API_URL}`);
  const contatos = await resposta.json();

  const contato = contatos.find(c => c._id === id);
  if (!contato) return;

  document.getElementById('nome').value = contato.nome;
  document.getElementById('email').value = contato.email;
  document.getElementById('telefone').value = contato.telefone;

  idEditando = id;
}

// Inicial
carregarContatos();
