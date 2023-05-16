import { Model, BIGINT, INTEGER } from 'sequelize';
import db from '.';

class Pack extends Model {
  id!: number;
  pack_id!: number;
  product_id!: number;
  qty!: number;
}

Pack.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: BIGINT
  },
  pack_id: {
    allowNull: false,
    type: BIGINT,
    references: {
      model: 'products',
      key: 'code'
    }
  },
  product_id: {
    allowNull: false,
    type: BIGINT,
    references: {
      model: 'products',
      key: 'code'
    }
  },
  qty: {
    allowNull: false,
    type: INTEGER
  }
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
});

export default Pack;
