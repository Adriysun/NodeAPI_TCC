const usuarioDBO = require('../js/dbo/usuarioDBO');

const login = async (req, res) => {

    if(Object.values(req.body).length > 2 || !req.params.email || !req.params.senha){
      const erro = comunicado.novo('DSP', 'Fornecimento de dados sem proposito', 'Foram fornecidos dados desnecessarios').object;        
      return res.status(422).json(erro);
      }
  
      const login = req.params
      const ret = await usuarioDBO.login(login);
  
      if (ret === null) {
          const erro = comunicado.novoComunicado('CBD', 'Sem conexao com o BD', 'Não foi possivel estabelecer conexao com o banco de dados').object;
          return res.status(500).json(erro);
  
      } else if (ret === false) {
          const erro = comunicado.novoComunicado('FNC', 'Falha no comando de SQL', 'O comando de SQL apresenta algum erro').object;
          return res.status(409).json(erro);
  
      } else if (ret.length === 0) {
          const erro = comunicado.novoComunicado('UNE', 'Usuario inexistente', 'Não há Usuario cadastrado com esse id').object;
          return res.status(404).json(erro);
  
      } else {
          return res.status(200).json(ret);
      }
  }
  
module.exports = {login}