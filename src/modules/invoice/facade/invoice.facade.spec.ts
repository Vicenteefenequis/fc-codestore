import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import ProductModel from "../repository/product.model";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";

describe("InvoiceFacade Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate invoice", async () => {
    const repository = new InvoiceRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);

    const facade = new InvoiceFacade({
      generateInvoiceUseCase,
      findInvoiceUseCase,
    });

    const product1 = {
      id: "1",
      name: "Product 1",
      price: 100,
    };

    const input = {
      name: "Invoice 1",
      document: "Document 1",
      city: "City 1",
      complement: "Complement 1",
      number: "Number 1",
      state: "State 1",
      street: "Street 1",
      zipCode: "ZipCode 1",
      items: [product1],
      creadetdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await facade.generate(input);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);

    expect(result.city).toBe(input.city);
    expect(result.complement).toBe(input.complement);
    expect(result.number).toBe(input.number);
    expect(result.state).toBe(input.state);
    expect(result.street).toBe(input.street);
    expect(result.zipCode).toBe(input.zipCode);

    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe(input.items[0].name);
    expect(result.items[0].price).toBe(input.items[0].price);
  });

  it("should find a invoice", async () => {
    const repository = new InvoiceRepository();
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(repository);
    const findInvoiceUseCase = new FindInvoiceUseCase(repository);

    const facade = new InvoiceFacade({
      generateInvoiceUseCase,
      findInvoiceUseCase,
    });

    const product1 = {
      id: "1",
      name: "Product 1",
      price: 100,
    };

    const input = {
      id: "1",
      name: "Invoice 1",
      document: "Document 1",
      city: "City 1",
      complement: "Complement 1",
      number: "Number 1",
      state: "State 1",
      street: "Street 1",
      zipCode: "ZipCode 1",
      products: [product1],
      creadetdAt: new Date(),
      updatedAt: new Date(),
    };

    await InvoiceModel.create(input, { include: [ProductModel] });

    const foundInvoice = await facade.find({ id: input.id });

    expect(foundInvoice.id).toBe(input.id);
    expect(foundInvoice.name).toBe(input.name);
    expect(foundInvoice.document).toBe(input.document);

    expect(foundInvoice.address.city).toBe(input.city);
    expect(foundInvoice.address.complement).toBe(input.complement);
    expect(foundInvoice.address.number).toBe(input.number);
    expect(foundInvoice.address.state).toBe(input.state);
    expect(foundInvoice.address.street).toBe(input.street);
    expect(foundInvoice.address.zipCode).toBe(input.zipCode);

    expect(foundInvoice.items.length).toBe(1);
    expect(foundInvoice.items[0].id).toBe(input.products[0].id);
    expect(foundInvoice.items[0].name).toBe(input.products[0].name);
    expect(foundInvoice.items[0].price).toBe(input.products[0].price);

    expect(foundInvoice.total).toBe(100);
  });
});
