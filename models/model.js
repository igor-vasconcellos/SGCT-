const db = require('../database');

function criarUsuario(nome, email, senha, callback) {
  const query = 'INSERT INTO usuario (nome, email, senha, tipo) VALUES (?, ?, ?, ?)';
  db.query(query, [nome, email, senha, "cliente"], callback);
}

function listarUsuarios(callback) {
  const query = 'SELECT * FROM usuarios';
  db.query(query, callback);
}

function buscarPorEmailSenha(email, senha, callback) {
  const sql = 'SELECT * FROM usuario WHERE email = ? AND senha = ?';
  db.query(sql, [email, senha], (err, results) => {
    if (err) return callback(err, null);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]); 
  });
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarPorEmailSenha
};