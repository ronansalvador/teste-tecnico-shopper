import { Request, Response, NextFunction } from 'express';
import path = require('path');
import * as fs from 'fs';
import * as csv from 'csv-parser';

// const file = fs.readFileSync('../atualizacao_preco_exemplo.csv');
const fileProduct = path.resolve(__dirname, '..', 'atualizacao_preco_exemplo.csv');
console.log(fileProduct);

const validateFileMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // const caminhoArquivo = req.body.arquivo; // Supondo que o campo com o caminho do arquivo seja enviado no corpo da requisição
  console.log('body', req.body)

  // console.log(caminhoArquivo);

  // const requiredFields = ['campo1', 'campo2', 'campo3']; // Campos obrigatórios
  const produtos: any[] = []; // Array para armazenar os produtos

  fs.createReadStream(fileProduct)
    .pipe(csv())
    .on('data', (row: any) => {
      // Aqui você pode realizar as validações e adicionar os produtos ao array

      // // Verificar se todos os campos obrigatórios existem
      // const camposFaltando = requiredFields.filter((campo) => !(campo in row));
      // if (camposFaltando.length > 0) {
      //   return res
      //     .status(400)
      //     .json({ error: `Campos faltando: ${camposFaltando.join(', ')}` });
      // }

      // // Verificar se os códigos de produtos existem
      // const codigoProduto = row.codigo; // Supondo que o código do produto esteja na coluna 'codigo'
      // // if (!verificarExistenciaCodigoProduto(codigoProduto)) {
      // //   return res
      // //     .status(400)
      // //     .json({ error: `Código de produto inválido: ${codigoProduto}` });
      // // }

      // // Verificar se os preços estão preenchidos e são valores numéricos válidos
      // const preco = parseFloat(row.preco); // Supondo que o preço esteja na coluna 'preco'
      // if (isNaN(preco) || preco <= 0) {
      //   return res.status(400).json({ error: `Preço inválido: ${row.preco}` });
      // }

      // Adicionar o produto ao array de produtos
      produtos.push(row);
    })
    .on('end', () => {
      // Aqui você pode fazer outras ações após ler todo o arquivo

      // Armazenar os produtos no objeto de requisição para serem usados pela rota POST
      // req.produtos = produtos;
      console.log(produtos);

      next();
    });
};

export default validateFileMiddleware;
