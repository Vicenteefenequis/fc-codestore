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

  it("should find an order", async () => {
    const repository = new CheckoutRepository();
    const input = {
      id: "1",
      client: {
        id: "1c",
        name: "any_name",
        address: "any_address",
        email: "any_email",
      },
      products: [
        {
          id: "1p",
          name: "any_product_1",
          salesPrice: 200,
          description: "any_description",
        },
      ],
      status: "any_status",
    };

    await OrderModel.create(input, { include: [ProductModel, ClientModel] });

    const result = await repository.findOrder(input.id);

    expect(result.id.id).toBe(input.id);
    expect(result.status).toBe(input.status);
    expect(result.client.name).toBe(input.client.name);
    expect(result.client.address).toBe(input.client.address);
    expect(result.client.email).toBe(input.client.email);
    expect(result.client.name).toBe(input.client.name);
    expect(result.client.id.id).toBe(input.client.id);

    expect(result.products[0].description).toBe(input.products[0].description);
    expect(result.products[0].name).toBe(input.products[0].name);
    expect(result.products[0].salesPrice).toBe(input.products[0].salesPrice);
    expect(result.products[0].id.id).toBe(input.products[0].id);
  });
});
