import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/value-object/address";
import Invoice from "../domain/entity/invoice";
import Product from "../domain/entity/product";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import ProductModel from "./product.model";

const address = new Address({
  city: "City 1",
  complement: "Complement 1",
  number: "Number 1",
  state: "State 1",
  street: "Street 1",
  zipCode: "ZipCode 1",
});

const product = new Product({ id: new Id("1"), name: "Product 1", price: 100 });

const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "Document 1",
  address: address,
  items: [product],
  createdAt: new Date(),
  updatedAt: new Date(),
});

describe("InvoiceRepository test", () => {
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

  it("should create a invoice", async () => {
    const invoiceRepository = new InvoiceRepository();
    const result = await invoiceRepository.generate(invoice);

    const createdInvoice = await InvoiceModel.findOne({
      where: { id: invoice.id.id },
      include: [{ model: ProductModel }],
    });

    expect(result.id.id).toBe(createdInvoice.id);
    expect(result.name).toBe(createdInvoice.name);
    expect(result.document).toBe(createdInvoice.document);

    expect(result.address.city).toBe(createdInvoice.city);
    expect(result.address.complement).toBe(createdInvoice.complement);
    expect(result.address.number).toBe(createdInvoice.number);
    expect(result.address.state).toBe(createdInvoice.state);
    expect(result.address.street).toBe(createdInvoice.street);
    expect(result.address.zipCode).toBe(createdInvoice.zipCode);

    expect(result.items.length).toBe(1);
    expect(result.items[0].id.id).toBe(createdInvoice.products[0].id);
    expect(result.items[0].name).toBe(createdInvoice.products[0].name);
    expect(result.items[0].price).toBe(createdInvoice.products[0].price);
  });

  it("should a find invoice", async () => {
    const product = {
      id: "1",
      name: "Product 1",
      price: 100,
    };
    await InvoiceModel.create(
      {
        id: "1",
        name: "Invoice 1",
        document: "Document 1",
        city: "City 1",
        complement: "Complement 1",
        number: "Number 1",
        state: "State 1",
        street: "Street 1",
        zipCode: "ZipCode 1",
        products: [product],
        creadetdAt: new Date(),
        updatedAt: new Date(),
      },
      { include: [{ model: ProductModel }] }
    );

    const repository = new InvoiceRepository();

    const result = await repository.find("1");

    expect(result.id.id).toBe("1");
    expect(result.name).toBe("Invoice 1");
    expect(result.document).toBe("Document 1");

    expect(result.address.city).toBe("City 1");
    expect(result.address.complement).toBe("Complement 1");
    expect(result.address.number).toBe("Number 1");
    expect(result.address.state).toBe("State 1");
    expect(result.address.street).toBe("Street 1");
    expect(result.address.zipCode).toBe("ZipCode 1");

    expect(result.items.length).toBe(1);
    expect(result.items[0].id.id).toBe(product.id);
    expect(result.items[0].name).toBe(product.name);
    expect(result.items[0].price).toBe(product.price);
  });
});
