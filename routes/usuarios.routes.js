const router = require('express-promise-router')();
const userController = require('../controllers/usuarios.controllers');

// Rota de cadastro de usuarios
router.post('/cadastro_Usuario', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;