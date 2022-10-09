const router = require('express-promise-router')();
const userController = require('../controllers/usuarios.controllers');
const userClass = require('../Daos/usuarios');

var bodyParser = require('body-parser');
var timeout = require('connect-timeout');

// Rota de cadastramento de usuarios
router.post('/usuarios', userController.createUser);


router.post('/usuarios2',  timeout('5s'), bodyParser.json(), 
haltOnTimedout, function (req, res, next) { 
    savePost(req.body, function (err, id) {
      if (err) return next(err)
      if (req.timedout) return
      res.send('saved as id ' + id)
    })
 });

 function haltOnTimedout(req, res, next){
	if (!req.timedout)
		next();
}

  function savePost (post, cb) {
    setTimeout(function () {
      cb(null, ((Math.random() * 40000) >>> 0))
    }, (Math.random() * 7000) >>> 0)
  }

  app.listen(3000)
  
module.exports = router;