import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/value-object/address";
import Invoice from "../../domain/entity/invoice";
import Product from "../../domain/entity/product";
import InvoiceGateway from "../../gateway/invoice.gateway";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1"),
  address: new Address({
    city: "City 1",
    complement: "Complement 1",
    number: "Number 1",
    state: "State 1",
    street: "Street 1",
    zipCode: "ZipCode 1",
  }),
  document: "Document 1",
  items: [new Product({ id: new Id("1"), name: "Product 1", price: 100 })],
  name: "Invoice 1",
});

const MockRepository = (): InvoiceGateway => ({
  find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  generate: jest.fn(),
});

describe("FindInvoiceUseCase test unit", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(result.id).toBe(invoice.id.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);

    expect(result.city).toBe(invoice.address.city);
    expect(result.complement).toBe(invoice.address.complement);
    expect(result.number).toBe(invoice.address.number);
    expect(result.state).toBe(invoice.address.state);
    expect(result.street).toBe(invoice.address.street);
    expect(result.zipCode).toBe(invoice.address.zipCode);

    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe("Product 1");
    expect(result.items[0].price).toBe(100);
    expect(result.total).toBe(invoice.total);
  });
});
