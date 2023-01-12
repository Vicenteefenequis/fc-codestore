import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.value-object";
import Invoice from "../../domain/invoice";
import Product from "../../domain/product";
import InvoiceGateway from "../../gateway/invoice.gateway";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

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
  find: jest.fn(),
  generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
});

describe("GenerateInvoiceUseCase test unit", () => {
  it("should generate invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      city: "City 1",
      complement: "Complement 1",
      number: "Number 1",
      state: "State 1",
      street: "Street 1",
      zipCode: "ZipCode 1",
      document: "Document 1",
      items: [{ id: "1", name: "Product 1", price: 100 }],
      name: "Invoice 1",
    };

    const result = await usecase.execute(input);

    expect(result.id).toBe("1");
    expect(result.document).toBe("Document 1");
    expect(result.name).toBe("Invoice 1");

    expect(result.complement).toBe("Complement 1");
    expect(result.number).toBe("Number 1");
    expect(result.state).toBe("State 1");
    expect(result.street).toBe("Street 1");
    expect(result.zipCode).toBe("ZipCode 1");

    expect(result.items.length).toBe(1);
    expect(result.items[0].id).toBe("1");
    expect(result.items[0].name).toBe("Product 1");
    expect(result.items[0].price).toBe(100);
  });
});
