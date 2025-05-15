
const usuarioModel = require('../models/model');

function criarUsuario(req, res) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios' });
  }

  usuarioModel.criarUsuario(nome, email, senha, (err, resultado) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      return res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
    }

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso', id: resultado.insertId });
  });
}

function listarUsuarios(req, res) {
  usuarioModel.listarUsuarios((err, resultados) => {
    if (err) {
      console.error('Erro ao listar usuários:', err);
      return res.status(500).json({ erro: 'Erro ao buscar usuários' });
    }

    res.json(resultados);
  });
}

module.exports = {
  criarUsuario,
  listarUsuarios
};
