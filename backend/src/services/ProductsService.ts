import ProductsModel from '../database/model/ProductsModel';
import IProduct from '../interface/IProduct';

export default class ProductsService {
  public model = ProductsModel;

  public async findAll(): Promise<IProduct[]> {
    const result = await this.model.findAll();
    return result;
  }

}