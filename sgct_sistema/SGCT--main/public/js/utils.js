// Função para validar o formato de um e-mail
function cadastrarUsuario(nome, email, senha, tipo) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const id = Date.now();
  usuarios.push({ id, nome, email, senha, tipo });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}
