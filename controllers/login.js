// ISSO NÃO ESTÁ SENDO USADO

const usuarioDBO = require('../js/dbo/usuarioDBO');

const login = async (req, res) => {

    if(Object.values(req.body).length > 2 || !req.params.email || !req.params.senha){
      }
  
      const login = req.params
      const ret = await usuarioDBO.login(login);
  
      if (ret === null) {
          return res.status(500).send();
  
      } else if (ret === false) {
          return res.status(409).send();
  
      } else {
          console.log('Usuario autenticado!')
          return res.status(200).json(ret);
      }
  }
  
module.exports = {login}