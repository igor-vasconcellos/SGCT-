document.addEventListener("DOMContentLoaded", () => {
  const cadastroForm = document.getElementById("cadastroForm");
  const loginForm = document.getElementById("loginForm");

  // Cadastro de novo usuário
  if (cadastroForm) {
    cadastroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      fetch('/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, email, senha})
      });

      alert("Usuário cadastrado!");
      window.location.href = "/";
    });
  }

  // Login de usuário
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      const result = await response.json();

      if (result.sucesso) {
        localStorage.setItem("usuarioLogado", "true");
        window.location.href = result.redirecionar;
      } else {
        alert(result.erro || "Erro ao tentar logar");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao tentar logar");
    }
  });
  }
});