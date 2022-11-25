//const userController = require ('../controller/userController');
const userSQL = require ('../js/userSQL');


const update = async ({id_usuario, nome, sobrenome, dtnasci}) => {
    return await userSQL.update({id_usuario, nome, sobrenome, dtnasci})
}

const forgetPass = async ({id_usuario, senha}) =>{
    return await userSQL.forgetPass({id_usuario, senha})
}

module.exports = {update, forgetPass}