import { Model, INTEGER, STRING, BIGINT, DECIMAL } from 'sequelize';
import db from '.';

class Product extends Model {
  code!: number;
  name!: string;
  cost_price!: number;
  sales_price!: number
}

Product.init({
  code: {
    allowNull: false,
    primaryKey: true,
    type: BIGINT,
  },
  name: {
    allowNull: false,
    type: STRING,
  },
  cost_price : {
    allowNull: false,
    type: DECIMAL(9,2),
  },
  sales_price: {
    allowNull: false,
    type: DECIMAL(9,2),
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
});

export default Product;