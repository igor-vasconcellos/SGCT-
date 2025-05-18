
const usuarioModel = require('../models/model');
const nodemailer = require('nodemailer');

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

function login(req, res) {
  const { email, senha } = req.body;

  usuarioModel.buscarPorEmailSenha(email, senha, (err, usuario) => {
    if (err) return res.status(500).json({ erro: 'Erro no servidor' });
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });

    // Salva os dados do usuário na sessão
    req.session.usuario = {
      id: usuario.id_usuario,
      email: usuario.email,
      tipo: usuario.tipo
    };

    if (usuario.tipo === 'cliente') {
      return res.json({ sucesso: true, redirecionar: '/home' });
    } else if (usuario.tipo === 'adm' || usuario.tipo === 'tec') {
      return res.json({ sucesso: true, redirecionar: '/home/funcionario' });
    } else {
      return res.status(400).json({ erro: 'Tipo de usuário inválido' });
    }
  });
}

function inserirChamado(req, res) {
  const { titulo, descricao, prioridade, categoria } = req.body;
  const email = req.session.usuario?.email; // o e-mail foi salvo na session ao fazer login

  usuarioModel.criarChamado(titulo, descricao, prioridade, email, categoria, (err, resultado) => {
    if (err) {
      console.error("Erro ao criar chamado:", err);
      return res.status(500).json({ erro: "Erro ao criar chamado" });
    }

    res.status(200).json({ mensagem: "Chamado criado com sucesso!" });
  });
}

function listarChamados(req, res) {
  usuarioModel.buscarChamados((err, chamados) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar chamados' });
    res.json(chamados);
  });
}

function atualizarChamado(req, res) {
  const { id, status, prioridade } = req.body;

  usuarioModel.atualizarChamado(id, status, prioridade, (err, resultado) => {
    if (err) return res.status(500).json({ erro: 'Erro ao atualizar chamado' });

    // RF04 – Enviar e-mail ao mudar o status
    usuarioModel.buscarChamadoPorId(id, (err, chamado) => {
      if (!err && chamado) {
        enviarEmailNotificacao(chamado.email, chamado.titulo, status);
      }
    });

    res.status(200).json({ mensagem: 'Chamado atualizado com sucesso' });
  });
}

function enviarEmailNotificacao(destinatario, tituloChamado, novoStatus) {
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'plataformapaeeja@gmail.com',
      pass: 'ensg lbzs pfet fkcj'
    }
  });

  // Verifica se o chamado foi concluído para definir a mensagem apropriada
  let mensagemTexto = '';

  if (novoStatus.toLowerCase() === 'concluido') {
    mensagemTexto = `
      Prezado(a) cliente,

      Informamos que o chamado "${tituloChamado}" foi concluído com sucesso.

      Caso ainda tenha alguma dúvida ou perceba que o problema persiste, pedimos que nos informe para que possamos oferecer o suporte necessário.

      Agradecemos pela sua paciência e confiança em nosso trabalho.

      Atenciosamente,
      Equipe de Suporte Técnico
    `;
  } else {
    mensagemTexto = `
      Prezado(a) cliente,

      Informamos que o status do seu chamado "${tituloChamado}" foi atualizado para: ${novoStatus.toUpperCase()}.

      Estamos trabalhando para atender sua solicitação com a maior brevidade possível. Caso tenha dúvidas ou precise de mais informações, fique à vontade para entrar em contato com nossa 
      equipe de suporte.

      Atenciosamente,
      Equipe de Suporte Técnico
    `;
  }

  const mailOptions = {
    from: 'plataformapaeeja@gmail.com',
    to: destinatario,
    subject: `Atualização no status do chamado: ${tituloChamado}`,
    text: mensagemTexto
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Erro ao enviar e-mail:', error);
    } else {
      console.log('E-mail enviado com sucesso:', info.response);
    }
  });
}

function obterResumoChamados(req, res) {
  const sql = `
    SELECT
      SUM(CASE WHEN status = 'aberto' THEN 1 ELSE 0 END) AS abertos,
      SUM(CASE WHEN status = 'concluido' THEN 1 ELSE 0 END) AS concluidos,
      SUM(CASE WHEN status = 'andamento' THEN 1 ELSE 0 END) AS andamento
    FROM chamado
  `;

  usuarioModel.executarQuery(sql, [], (err, resultados) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao obter resumo de chamados' });
    }
    res.json(resultados[0]);
  });
}

function obterResumoChamadosCliente(req, res) {
  const email = req.session.usuario?.email;

  // Buscar ID do usuário pelo email
  const queryUsuario = 'SELECT id_usuario FROM usuario WHERE email = ?';
  usuarioModel.executarQuery(queryUsuario, [email], (err, resultsUsuario) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      return res.status(500).json({ erro: 'Erro ao buscar usuário' });
    }

    if (resultsUsuario.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const idCliente = resultsUsuario[0].id_usuario;

    const sql = `
      SELECT
        COALESCE(SUM(CASE WHEN status = 'aberto' THEN 1 ELSE 0 END), 0) AS abertos,
        COALESCE(SUM(CASE WHEN status = 'concluido' THEN 1 ELSE 0 END), 0) AS concluidos,
        COALESCE(SUM(CASE WHEN status = 'andamento' THEN 1 ELSE 0 END), 0) AS andamento
      FROM chamado
      WHERE usuario_id = ?
    `;

    usuarioModel.executarQuery(sql, [idCliente], (err, resultados) => {
      if (err) {
        console.error('Erro ao obter resumo dos chamados:', err);
        return res.status(500).json({ erro: 'Erro ao obter resumo dos chamados do cliente' });
      }

      console.log('Resumo cliente:', resultados[0]);

      res.json(resultados[0]);
    });
  });
}

module.exports = {
  criarUsuario,
  listarUsuarios,
  login,
  inserirChamado,
  listarChamados,
  atualizarChamado,
  enviarEmailNotificacao,
  obterResumoChamados,
  obterResumoChamadosCliente
};
