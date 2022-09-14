const express = require ('express');
const router = express.Router();


router.post('/',(req, res, next) => {
    res.status(201). send({
        mensagem: 'Usando o POST dentro da rota de produtos'
    })
});

module.exports = router;

