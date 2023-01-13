import Order from "../domain/order.entity";
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
    return null;
  }
}
