const router = require('express-promise-router')();
const userController = require('../controllers/usuarios.controllers');
const userClass = require('../Daos/usuarios');

var bodyParser = require('body-parser');
var timeout = require('connect-timeout');

// Rota de cadastro de usuarios
router.post('/usuarios', userController.createUser);


router.post('/usuarios2', userClass.inclua);
  
module.exports = router;