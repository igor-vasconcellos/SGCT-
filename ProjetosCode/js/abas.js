document.addEventListener("DOMContentLoaded", () => {
  const abas = document.querySelectorAll("#abas-perfil .aba");
  const painelPerfil = document.getElementById("painel-perfil");
  const painelInformacoes = document.getElementById("painel-informacoes");

  abas.forEach((aba, index) => {
    aba.addEventListener("click", (e) => {
      e.preventDefault();

      abas.forEach((el) => el.classList.remove("ativa"));
      aba.classList.add("ativa");

      if (index === 0) {
        painelInformacoes.style.display = "none";
        painelPerfil.style.display = "flex"; // <--- aqui o display correto
        painelPerfil.offsetHeight; // força reflow opcional
      } else {
        painelPerfil.style.display = "none";
        painelInformacoes.style.display = "block";
      }
    });
  });
});


