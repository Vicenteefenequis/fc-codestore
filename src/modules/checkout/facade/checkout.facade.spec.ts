import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import CheckoutFacade from "./checkout.facade";

const invoice = {
  id: "1i",
};

const client = {
  id: "1c",
  street: "Address",
  email: "any_client_email@mail.com",
  name: "Client Name",
};

const order = new Order({
  id: new Id("1"),
  client: new Client({
    id: new Id("1"),
    address: "address 1",
    email: "any_email@mail.com",
    name: "name1",
  }),
  status: "approved",
  products: [
    new Product({
      id: new Id("1"),
      description: "any_description",
      name: "product 1",
      salesPrice: 100,
    }),
  ],
});

const mockClientFacade = {
  add: jest.fn(),
  find: jest.fn().mockResolvedValue(client),
};

const mockRepository = {
  addOrder: jest.fn(),
  findOrder: jest.fn().mockResolvedValue(order),
};

const mockInvoice = {
  generate: jest.fn().mockResolvedValue(invoice),
  find: jest.fn(),
};

const mockPayment = {
  process: jest.fn().mockResolvedValue({ status: "approved" }),
};

const mockProductFacade = {
  addProduct: jest.fn(),
  checkStock: jest.fn().mockReturnValue({ productId: "1", stock: 5 }),
};

const mockCatalogFacade = {
  find: jest.fn().mockResolvedValue({
    id: "1",
    description: "description 1",
    name: "name 1",
    salesPrice: 100,
  }),
  findAll: jest.fn(),
};

const makeUseCase = () => {
  return new PlaceOrderUseCase(
    mockClientFacade,
    mockProductFacade,
    mockCatalogFacade,
    mockRepository,
    mockInvoice,
    mockPayment
  );
};
describe("CheckoutFacade test", () => {
  it("should place a new order", async () => {
    const facade = new CheckoutFacade({ placeOrderUseCase: makeUseCase() });
    const output = await facade.placeOrder({
      clientId: client.id,
      products: order.products.map((p) => ({ productId: p.id.id })),
    });

    expect(output.id).toBeDefined();
    expect(output.invoiceId).toBe(invoice.id);
    expect(output.status).toBe(order.status);
    expect(output.total).toBe(order.total);
    expect(output.products[0].productId).toBe(order.products[0].id.id);
  });
});
