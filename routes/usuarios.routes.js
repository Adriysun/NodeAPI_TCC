const router = require('express-promise-router')();
const userController = require('../controllers/usuarios.controllers');
const userClass = require('../Dbos/usuario')


// Rota de cadastramento de usuarios
router.post('/usuarios', userController.createUser);

router.post('/usuarios2', userClass.novoUsuario);


module.exports = router;