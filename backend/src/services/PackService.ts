import PacksModel from '../database/model/PacksModel'


export default class PackService {
  public model = PacksModel;

  public async findByProduct(product: number) {
    const result = await this.model.findAll({where: {product_id: product}, raw: true});
    return result;
  }
}