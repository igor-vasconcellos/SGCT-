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

function criarChamado(titulo, descricao, prioridade, email, categoriaNome, callback) {
  // Buscar ID do usuário pelo email
  const queryUsuario = 'SELECT id_usuario FROM usuario WHERE email = ?';
  db.query(queryUsuario, [email], (err, resultsUsuario) => {
    if (err) return callback(err);
    if (resultsUsuario.length === 0) return callback(new Error("Usuário não encontrado"));

    const usuarioId = resultsUsuario[0].id_usuario;

    // Buscar ID da categoria pelo nome (value)
    const queryCategoria = 'SELECT id_categoria FROM categoria WHERE nome = ?';
    db.query(queryCategoria, [categoriaNome], (err, resultsCategoria) => {
      if (err) return callback(err);
      if (resultsCategoria.length === 0) return callback(new Error("Categoria não encontrada"));

      const categoriaId = resultsCategoria[0].id_categoria;

      // Inserir o chamado
      const queryInsert = 'INSERT INTO chamado (titulo, descricao, prioridade, usuario_id, categoria_id) VALUES (?, ?, ?, ?, ?)';
      db.query(queryInsert, [titulo, descricao, prioridade, usuarioId, categoriaId], callback);
    });
  });
}

function buscarChamados(callback) {
  const query = `
    SELECT c.id_chamado, c.titulo, c.descricao, c.status, c.prioridade,
           DATE_FORMAT(c.data_criacao, '%d/%m/%Y') AS data_criacao,
           u.email
    FROM chamado c
    JOIN usuario u ON c.usuario_id = u.id_usuario
    ORDER BY c.data_criacao DESC
  `;
  db.query(query, callback);
}

function atualizarChamado(id, status, prioridade, callback) {
  const query = 'UPDATE chamado SET status = ?, prioridade = ? WHERE id_chamado = ?';
  db.query(query, [status, prioridade, id], callback);
}

function buscarChamadoPorId(id, callback) {
  const query = `
    SELECT c.titulo, u.email FROM chamado c
    JOIN usuario u ON c.usuario_id = u.id_usuario
    WHERE c.id_chamado = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err || results.length === 0) return callback(err || new Error("Chamado não encontrado"));
    callback(null, results[0]);
  });
}

function executarQuery(sql, params, callback) {
  db.query(sql, params, callback);
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  buscarPorEmailSenha,
  criarChamado,
  buscarChamados,
  atualizarChamado,
  buscarChamadoPorId,
  executarQuery
};