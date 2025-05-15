const db = require('../database');

function criarUsuario(nome, email, senha, callback) {
  const query = 'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, email, senha, "cliente"], callback);
}

function listarUsuarios(callback) {
  const query = 'SELECT * FROM usuarios';
  db.query(query, callback);
}

module.exports = {
  criarUsuario,
  listarUsuarios
};