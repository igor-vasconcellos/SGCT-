document.addEventListener("DOMContentLoaded", () => {
  const formChamado = document.getElementById("formChamado");
  const categoriaSelect = document.getElementById("categoria");

  const categorias = [
    { id: 1, nome: "Infraestrutura" },
    { id: 2, nome: "Software" },
    { id: 3, nome: "Hardware" },
  ];

  categorias.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat.id;
    opt.textContent = cat.nome;
    categoriaSelect.appendChild(opt);
  });

  formChamado.addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const prioridade = document.getElementById("prioridade").value;
    const categoriaId = parseInt(document.getElementById("categoria").value);
    const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

    const chamados = JSON.parse(localStorage.getItem("chamados")) || [];
    chamados.push({
      id: Date.now(),
      titulo,
      descricao,
      status: "Aberto",
      prioridade,
      data_criacao: new Date().toISOString(),
      data_conclusao: null,
      usuario_id: usuario.id,
      tecnico_id: null,
      categoriaId
    });
    localStorage.setItem("chamados", JSON.stringify(chamados));
    alert("Chamado aberto com sucesso!");
    window.location.href = "dashboard.html";
  });
});
