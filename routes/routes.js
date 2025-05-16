const path = require('path');

const controller = require('../controllers/controller');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'login.html'));
  });

  app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'cadastro.html'));
  });
  
  app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'dashboard.html'));
  });

  app.get('/home/funcionario', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'dashboardTech.html'));
  });

  app.post('/cadastro', controller.criarUsuario);

  app.post('/login', controller.login);
  
};
