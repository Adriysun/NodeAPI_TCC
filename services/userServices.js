//const userController = require ('../controller/userController');
const userSQL = require ('../js/userSQL');


const update = async ({id_usuario, nome, sobrenome, dtnasci}) => {
    return await userSQL.update({id_usuario, nome, sobrenome, dtnasci})
}


module.exports = {update}