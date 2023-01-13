import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import OrderModel from "./order.model";

@Table({ tableName: "clients", timestamps: false })
export default class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @ForeignKey(() => OrderModel)
  @Column({ allowNull: false })
  order_id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  address: string;

  @BelongsTo(() => OrderModel)
  order: OrderModel;
}
