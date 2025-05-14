document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("listaChamados");
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const chamados = JSON.parse(localStorage.getItem("chamados")) || [];

  const meusChamados = chamados.filter(c => c.tecnico_id === usuario.id);

  if (meusChamados.length === 0) {
    container.innerHTML = "<p>Nenhum chamado atribuído.</p>";
    return;
  }

  meusChamados.forEach((c, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${c.titulo}</h3>
      <p>${c.descricao}</p>
      <p>Status atual: ${c.status}</p>
      <select id="status-${i}">
        <option value="Aberto" ${c.status === "Aberto" ? "selected" : ""}>Aberto</option>
        <option value="Em andamento" ${c.status === "Em andamento" ? "selected" : ""}>Em andamento</option>
        <option value="Concluído" ${c.status === "Concluído" ? "selected" : ""}>Concluído</option>
      </select>
      <button onclick="atualizarStatus(${c.id}, 'status-${i}')">Atualizar</button>
      <hr>
    `;
    container.appendChild(div);
  });
});

function atualizarStatus(id, selectId) {
  const chamados = JSON.parse(localStorage.getItem("chamados")) || [];
  const chamado = chamados.find(c => c.id === id);
  const novoStatus = document.getElementById(selectId).value;
  chamado.status = novoStatus;
  if (novoStatus === "Concluído") chamado.data_conclusao = new Date().toISOString();
  localStorage.setItem("chamados", JSON.stringify(chamados));
  alert("Status atualizado.");
  location.reload();
}
