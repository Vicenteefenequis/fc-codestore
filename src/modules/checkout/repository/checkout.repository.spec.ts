import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutRepository from "./checkout.repository";
import ClientModel from "./client.model";
import OrderModel from "./order.model";
import ProductModel from "./product.model";

describe("CheckoutRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel, ProductModel, ClientModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a order", async () => {
    const client = new Client({
      address: "any_address",
      email: "any_email@mail.com",
      name: "any_name",
      id: new Id("c1"),
    });
    const product1 = new Product({
      description: "any_description_p1",
      name: "any_name_p1",
      salesPrice: 100,
      id: new Id("p1"),
    });

    const order = new Order({
      client,
      products: [product1],
      status: "approved",
    });
    const repository = new CheckoutRepository();
    await repository.addOrder(order);

    const foundOrder = await OrderModel.findOne({
      where: { id: order.id.id },
      include: [ProductModel, ClientModel],
    });

    expect(foundOrder.id).toBe(order.id.id);
    expect(foundOrder.status).toBe(order.status);
    expect(foundOrder.client.name).toBe(client.name);
    expect(foundOrder.client.address).toBe(client.address);
    expect(foundOrder.client.email).toBe(client.email);
    expect(foundOrder.client.name).toBe(client.name);
    expect(foundOrder.client.id).toBe(client.id.id);
    expect(foundOrder.products[0].description).toBe(product1.description);
    expect(foundOrder.products[0].name).toBe(product1.name);
    expect(foundOrder.products[0].salesPrice).toBe(product1.salesPrice);
    expect(foundOrder.products[0].id).toBe(product1.id.id);
  });
});
