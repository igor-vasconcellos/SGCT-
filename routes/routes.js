const path = require('path');

const controller = require('../controllers/controller');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'login.html'));
  });

  app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'cadastro.html'));
  });

  app.post('/cadastro', controller.criarUsuario);
  
};
