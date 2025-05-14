document.addEventListener("DOMContentLoaded", () => {
  const relatorio = document.getElementById("relatorio");
  const chamados = JSON.parse(localStorage.getItem("chamados")) || [];

  const total = chamados.length;
  const abertos = chamados.filter(c => c.status === "Aberto").length;
  const andamento = chamados.filter(c => c.status === "Em andamento").length;
  const concluidos = chamados.filter(c => c.status === "Concluído").length;

  relatorio.innerHTML = `
    <p>Total de Chamados: ${total}</p>
    <p>🔵 Abertos: ${abertos}</p>
    <p>🟡 Em andamento: ${andamento}</p>
    <p>🟢 Concluídos: ${concluidos}</p>
  `;
});
