import {
  Column,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import ClientModel from "./client.model";
import ProductModel from "./product.model";

@Table({ tableName: "orders", timestamps: false })
export default class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  status: string;

  @HasOne(() => ClientModel)
  client: ClientModel;

  @HasMany(() => ProductModel)
  products: ProductModel[];
}
