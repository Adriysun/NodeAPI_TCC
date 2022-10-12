const db = require("../js/_database");

exports.createEmpresa = async (req, res) =>{
     const {cnpj, razao_social, nome_fantasia, email_emp, senha, atv_eco, dtfund, imagemreserv} = req.body;
      const { rows } = await db.query(
        'INSERT INTO usuario (cnpj, razao_social, nome_fantasia, email_emp, senha, atv_eco, dtfund) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [req.body.cnpj, razao_social, nome_fantasia, email_emp, senha, atv_eco, dtfund]
      );
  
      res.status(201).send({
          message: "Empresa cadastrada com sucesso!",
          body: {
            user: {cnpj, razao_social, nome_fantasia, email_emp, hash, atv_eco, dtfund}
          },
        });
  
        console.log("Empresa cadastrada com sucesso!");
      };

