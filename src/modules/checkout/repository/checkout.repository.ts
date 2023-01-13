import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import ClientModel from "./client.model";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await OrderModel.create(
      {
        id: order.id.id,
        client: {
          id: order.client.id.id,
          name: order.client.name,
          address: order.client.address,
          email: order.client.email,
        },
        products: order.products.map((product) => ({
          id: product.id.id,
          name: product.name,
          salesPrice: product.salesPrice,
          description: product.description,
        })),
        status: order.status,
      },
      { include: [ProductModel, ClientModel] }
    );
  }
  async findOrder(id: string): Promise<Order | null> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [ProductModel, ClientModel],
    });

    if (!orderModel) return null;

    return new Order({
      id: new Id(orderModel.id),
      status: orderModel.status,
      client: new Client({
        id: new Id(orderModel.client.id),
        address: orderModel.client.address,
        email: orderModel.client.email,
        name: orderModel.client.name,
      }),
      products: orderModel.products.map(
        (product) =>
          new Product({
            id: new Id(product.id),
            description: product.description,
            name: product.name,
            salesPrice: product.salesPrice,
          })
      ),
    });
  }
}
