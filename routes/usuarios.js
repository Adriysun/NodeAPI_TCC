const router = require('express-promise-router')();
const userController = require ('../controllers/userController');


// Rota de cadastro de usuarios
router.post('/usuarios', userController.createUser);
  
//Rota de login de usuarios
router.get('/usuarios/:email/:senha', userController.login1);

router.get('/login');

module.exports = router;