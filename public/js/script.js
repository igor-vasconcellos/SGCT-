function abrirModal(id, titulo, descricao, status, prioridade, data) {
  document.getElementById('modalId').innerText = `ID: ${id}`;
  document.getElementById('modalTitulo').innerText = titulo;
  document.getElementById('modalDescricao').innerText = descricao;
  document.getElementById('modalStatus').innerText = status;
  document.getElementById('modalPrioridade').innerText = prioridade;
  document.getElementById('modalData').innerText = data;

  document.getElementById('modalOverlay').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

function editarCampo(tipo) {
  let novoValor = prompt(`Digite o novo valor de ${tipo}:`);
  if (novoValor) {
    document.getElementById(`modal${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`).innerText = novoValor;
  }
}