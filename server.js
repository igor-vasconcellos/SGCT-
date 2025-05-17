const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session');

app.use(session({
  secret: 'tec05gerenciar',
  resave: false,
  saveUninitialized: false
}));

require("./routes/routes")(app);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}...`);
});