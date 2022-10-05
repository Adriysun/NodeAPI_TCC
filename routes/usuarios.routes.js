const router = require('express-promise-router')();
const userController = require('../controllers/usuarios.controllers');


// Rota de cadastramento de usuarios
router.post('/usuarios', userController.createUser);

module.exports = router;