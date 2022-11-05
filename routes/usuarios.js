const router = require('express-promise-router')();
const userController = require ('../controllers/userController');


// Rota de cadastro de usuarios
router.post('/cadastro_usuarios', userController.createUser);
  

//Rota de login de usuarios
router.post('/login_usuarios', userController.login);
 

module.exports = router;