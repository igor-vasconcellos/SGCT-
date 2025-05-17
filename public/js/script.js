function abrirModal(id, titulo, descricao, status, prioridade, data) {
  document.getElementById('modalId').innerText = `ID: ${id}`;
  document.getElementById('modalId').dataset.chamadoId = id;
  document.getElementById('modalTitulo').innerText = titulo;
  document.getElementById('modalDescricao').innerText = descricao;

  document.getElementById('modalStatus').innerHTML = `
    <select id="statusSelect">
      <option value="aberto" ${status === 'aberto' ? 'selected' : ''}>Aberto</option>
      <option value="andamento" ${status === 'andamento' ? 'selected' : ''}>Em andamento</option>
      <option value="concluido" ${status === 'concluido' ? 'selected' : ''}>Concluído</option>
    </select>
  `;

  document.getElementById('modalPrioridade').innerHTML = `
    <select id="prioridadeSelect">
      <option value="baixa" ${prioridade === 'baixa' ? 'selected' : ''}>Baixa</option>
      <option value="media" ${prioridade === 'media' ? 'selected' : ''}>Média</option>
      <option value="alta" ${prioridade === 'alta' ? 'selected' : ''}>Alta</option>
    </select>
  `;

  document.getElementById('modalData').innerText = data;
  document.getElementById('modalOverlay').style.display = 'flex';
}

function fecharModal() {
  document.getElementById('modalOverlay').style.display = 'none';
}

document.querySelector('.save').addEventListener('click', () => {
  const id = document.getElementById('modalId').dataset.chamadoId;
  const status = document.getElementById('statusSelect').value;
  const prioridade = document.getElementById('prioridadeSelect').value;

  fetch('/api/chamados/atualizar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, status, prioridade })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.mensagem);
    location.reload();
  })
  .catch(err => console.error('Erro ao salvar alterações:', err));
});

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/chamados')
    .then(res => res.json())
    .then(chamados => {
      const cards = {
        aberto: document.querySelector('.card.aberto'),
        andamento: document.querySelector('.card.andamento'),
        concluido: document.querySelector('.card.concluidos')
      };

      chamados.forEach(c => {
        const dotClass = c.prioridade === 'alta' ? 'red' :
                         c.prioridade === 'media' ? 'yellow' : 'green';

        const chamadoHTML = `
          <div class="chamado">
            <div class="dot ${dotClass}" data-tooltip="${c.prioridade}"></div>
            <span>(${c.id_chamado}) ${c.titulo}</span>
            <a href="#" onclick="abrirModal('${c.id_chamado}', '${c.titulo}', '${c.descricao}', '${c.status}', '${c.prioridade}', '${c.data_criacao}')">Ver mais</a>
          </div>
        `;

        if (cards[c.status]) {
          cards[c.status].insertAdjacentHTML('beforeend', chamadoHTML);
        }
      });
    });
});
