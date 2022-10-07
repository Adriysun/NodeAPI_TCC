const router = require('express-promise-router')();
const userController = require('../controllers/usuarios.controllers');
const userClass = require('../Daos/usuarios');


// Rota de cadastramento de usuarios
router.post('/usuarios', userController.createUser);

router.post('/usuarios2', userClass.inclua);


module.exports = router;