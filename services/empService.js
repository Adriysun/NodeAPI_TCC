const empSQL = require ('../js/empSQL');


const update = async ({id_empresa, razao_social, nome_fantasia, dtfund}) => {
    return await empSQL.update({id_empresa, razao_social, nome_fantasia, dtfund})
}

const forgetPass = async ({id_empresa, senha}) =>{
    return await empSQL.forgetPass({id_empresa, senha})
}

module.exports = {update, forgetPass}