const reservSQL = require ('../js/reservSQL');

const incluir = async ({nome_reserv, id_usuario,  local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao}) =>{
    return await reservSQL.incluir({nome_reserv, id_usuario,  local_reserv, cep, data_ultlimp, data_proxlimp, tipo, descricao})
}
  
module.exports ={incluir}