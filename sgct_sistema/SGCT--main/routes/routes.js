const path = require('path');

const controller = require('../controllers/controller');

function autenticar(req, res, next) {
  if (!req.session.usuario) {
    return res.status(401).send('Não autorizado');
  }
  next();
}

function permitirTipo(...tiposPermitidos) {
  return (req, res, next) => {
    const tipo = req.session.usuario?.tipo;
    if (!tiposPermitidos.includes(tipo)) {
      return res.status(403).send('Acesso negado');
    }
    next();
  };
}


module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'login.html'));
  });

  app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'cadastro.html'));
  });
  
  app.get('/home', autenticar, permitirTipo('cliente'), (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'dashboard.html'));
  });
  
  app.get('/home/abrir-chamado', autenticar, permitirTipo('cliente'), (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'abrirChamado.html'));
  });
  
  app.get('/home/funcionario', autenticar, permitirTipo('tec', 'adm'), (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'dashboardTech.html'));
  });
  
  app.get('/home/funcionario/chamados', autenticar, permitirTipo('tec', 'adm'), (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'statusChamados.html'));
  });

  app.post('/cadastro', controller.criarUsuario);

  app.post('/login', controller.login);

  app.post('/home/abrir-chamado', autenticar, permitirTipo('cliente'), controller.inserirChamado);
  app.post('/api/chamados/atualizar', autenticar, permitirTipo('tec', 'adm'), controller.atualizarChamado);
  app.get('/api/chamados', autenticar, permitirTipo('tec', 'adm'), controller.listarChamados);
  app.get('/api/resumo-chamados', autenticar, permitirTipo('tec', 'adm'), controller.obterResumoChamados);
  app.get('/api/resumo-chamados-cliente', autenticar, permitirTipo('cliente'), controller.obterResumoChamadosCliente);

  app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });

  
};
