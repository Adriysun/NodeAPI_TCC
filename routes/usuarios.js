const router = require('express-promise-router')();
const userController = require ('../controllers/userController');
const controll = require ('../controllers/login');


// Rota de cadastro de usuarios
router.post('/usuarios', userController.createUser);
  
//Rota de login de usuarios
router.get('/usuarios/:email/:senha', controll.login);


module.exports = router;