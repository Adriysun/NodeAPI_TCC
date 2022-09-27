const express = require ('express');
const router = express.Router();
const app = express ();
const pool = require ('../app');


router.get('/', (req, res, next) =>{
    res.status(200).send({mensagem: "O ADM ESTÀ ONLINE!!!"});
});

module.exports = router;


