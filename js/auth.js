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
      const tipo = document.getElementById("tipo").value;

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.push({ id: Date.now(), nome, email, senha, tipo });
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      alert("Usuário cadastrado!");
      window.location.href = "index.html";
    });
  }

  // Login de usuário
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find(u => u.email === email && u.senha === senha);

      if (usuario) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        window.location.href = "dashboard.html";
      } else {
        alert("Credenciais inválidas!");
      }
    });
  }
});

if (usuario) {
  localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
  if (usuario.tipo === "admin") {
    window.location.href = "admin.html";
  } else if (usuario.tipo === "tecnico") {
    window.location.href = "tecnico.html";
  } else {
    window.location.href = "dashboard.html";
  }
}
