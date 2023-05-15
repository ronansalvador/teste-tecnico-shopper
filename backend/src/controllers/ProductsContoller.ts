import { RequestHandler } from 'express';
import ProductsService from '../services/ProductsService';
import { Readable } from 'stream';
import * as readLine from 'readline';
import IProduct from '../interface/IProduct';


export default class ProductsController {
  constructor(private service = new ProductsService()) {}

  public findAll:RequestHandler = async(_req, res) => {
    const result = await this.service.findAll();
    return res.status(200).json(result);
  }

  public addFile:RequestHandler = async(req, res) => {
    const {file} = req;

    if (file) {
    const { buffer } = file;
    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);
    
    const productLine = readLine.createInterface({
      input: readableFile,
    });

    const products: IProduct[] = [];
    let isFirstLine = true; // Variável para rastrear a primeira linha

    for await (let line of productLine) {
      if (isFirstLine) {
        isFirstLine = false;
        continue; // Pula para a próxima iteração do loop sem processar o resto do código
      }

      const productData = line.split(",");
      const product: IProduct = {
        code: Number(productData[0]),
        sales_price: parseFloat(productData[1]),
      };

      products.push(product);
    }

    console.log(products);
    return res.send(products);
  }

  }
}