const express = require ('express');
const router = express.Router();


router.get('/', (req, res, next) =>{
    res.status(200).send
    ({mensagem: "Bem vindo a API do TCC - Sensor de Qualidade de Água"});
});

module.exports = router;


