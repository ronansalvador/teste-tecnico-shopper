import { RequestHandler } from 'express';
import ProductsService from '../services/ProductsService';
import PackService from '../services/PackService';
import { Readable } from 'stream';
import * as readLine from 'readline';
import IProduct from '../interface/IProduct';
import IUpdateProduct from '../interface/IUpdateProduct';


export default class ProductsController {
  constructor(
    private service = new ProductsService(),
    private servicePack = new PackService
    ) {}

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
    const addProducts: IUpdateProduct[] = [];
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

   

    for await (let product of products) {
      const oldProduct = await this.service.findById(Number(product.code));

      if (!oldProduct) {
        const infoProduct: IUpdateProduct ={
          code: product.code,
          new_price: product.sales_price,
          status: "Produto não encontrado",
        }
        addProducts.push(infoProduct)
      }

      const validateProduct = (oldProduct: IProduct) => {
        let status = 'ok'
        if (oldProduct.sales_price > product.sales_price) {
          status = 'o novo valor de venda não pode ser menor que o valor de custo'
        }

        const percentageDifference = Math.abs(product.sales_price - oldProduct.sales_price) / oldProduct.sales_price * 100;
        // rever regra de negocio de porcentagem
        if (percentageDifference > 10) {
          status = 'O reajuste excede o limite de 10%.'
        }

        if (!product.sales_price) {
          status = 'O valor de venda não pode ser nulo';
        }
        return status;

      }

      if(oldProduct) {
        const infoProduct: IUpdateProduct ={
          name: oldProduct.name,
          code: oldProduct.code,
          current_price: oldProduct.sales_price,
          new_price: product.sales_price,
          status: validateProduct(oldProduct),
        }
        addProducts.push(infoProduct)

      }
    }

    console.log(products);
    return res.send(addProducts);
  }

  }

  public updatePrice = async (oldProduct: IUpdateProduct) => {
    const update = await this.service.updatePrice(Number(oldProduct.new_price), Number(oldProduct.code))
    const pack = await this.servicePack.findByProduct(Number(oldProduct.code));
    console.log('pack', pack);
    if(pack.length > 0) {
      for await (let productPack of pack) {
      const newPrice = productPack.qty * Number(oldProduct.new_price)
      const updatepack = this.service.updatePrice(Number(newPrice), Number(productPack.pack_id))
      console.log('updatepack', updatepack)
    }
    // se ele existir no pack preciso fazer um novo update passando o valor do pack.
  }
  }
  public updateAll:RequestHandler = async(req, res) => {
    const {products} = req.body
    console.log(products)
    const updatedProducts: IUpdateProduct[] = [];
    for await (let product of products) {
    const teste = this.updatePrice(product)
    if (!teste) {
      continue
    }
    updatedProducts.push(product);
    }
    return res.send(updatedProducts);
}
}