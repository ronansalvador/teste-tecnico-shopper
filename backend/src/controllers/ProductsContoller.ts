import { RequestHandler } from 'express';
import ProductsService from '../services/ProductsService';

export default class ProductsController {
  constructor(private service = new ProductsService()) {}

  public findAll:RequestHandler = async(_req, res) => {
    const result = await this.service.findAll();
    return res.status(200).json(result);
  }
}