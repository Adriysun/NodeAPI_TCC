const express = require ('express');
const router = express.Router();
const app = express ();


router.get('/', (req, res, next) =>{
    res.status(200).send({mensagem: "O ADM ESTÀ ONLINE!!!"});
});

module.exports = router;

/*
router.post('/',(req, res, next) => {
    res.status(201). send({
        mensagem: 'Usando o POST dentro da rota de produtos'
    })
});

module.exports = router;
*/
