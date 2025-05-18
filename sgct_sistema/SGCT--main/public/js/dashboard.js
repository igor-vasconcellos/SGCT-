document.addEventListener("DOMContentLoaded", () => {
  const painel = document.getElementById("painel");
  const chamados = JSON.parse(localStorage.getItem("chamados")) || [];

  const resumo = {
    abertos: chamados.filter(c => c.status === "Aberto").length,
    andamento: chamados.filter(c => c.status === "Em andamento").length,
    concluidos: chamados.filter(c => c.status === "Concluído").length
  };

  painel.innerHTML = `
    <p>Chamados Abertos: ${resumo.abertos}</p>
    <p>Em Andamento: ${resumo.andamento}</p>
    <p>Concluídos: ${resumo.concluidos}</p>
  `;
});
