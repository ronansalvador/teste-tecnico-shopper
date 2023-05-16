import ProductsModel from '../database/model/ProductsModel';
import IProduct from '../interface/IProduct';

export default class ProductsService {
  public model = ProductsModel;

  public async findAll(): Promise<IProduct[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async findById(id: number): Promise<IProduct | null> {
      const result = await this.model.findByPk(id)
      if (result) {
        return result;
      }
      return null;
    }

  public async updatePrice(price: number, code: number) {
    console.log('update service')

    const result = await this.model.update(
          { sales_price: price },
          { where: { code } }
        );
     console.log(result);
  }
}