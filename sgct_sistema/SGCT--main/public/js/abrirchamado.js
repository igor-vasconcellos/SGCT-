document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const titulo = document.getElementById('titulo').value;
  const descricao = document.getElementById('descricao').value;
  const prioridade = document.getElementById('prioridade').value;
  const categoria = document.getElementById('categoria').value;

  try {
    const response = await fetch('/home/abrir-chamado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ titulo, descricao, prioridade, categoria })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.mensagem);
      // Redirecionar ou limpar formulário
    } else {
      alert(data.erro);
    }
  } catch (error) {
    console.error('Erro ao enviar chamado:', error);
    alert('Erro ao enviar chamado. Tente novamente.');
  }
});
