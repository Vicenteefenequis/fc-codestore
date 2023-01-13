import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "x@x.com",
  document: "Document 1",
  address: new Address({
    city: "City 1",
    complement: "Complement 1",
    number: "Number 1",
    state: "State 1",
    street: "Street 1",
    zipCode: "ZipCode 1",
  }),
  createdAt: new Date(),
  updatedAt: new Date(),
});

const MockRepository = () => ({
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(client)),
});

describe("Find client usecase test unit", () => {
  it("should find a client", async () => {
    const clientRepository = MockRepository();
    const usecase = new FindClientUseCase(clientRepository);

    const input = {
      id: "1",
    };
    const output = await usecase.execute(input);

    expect(clientRepository.find).toHaveBeenCalled();

    expect(output.id).toBeDefined();
    expect(output.name).toEqual(client.name);
    expect(output.email).toEqual(client.email);
    expect(output.document).toBe(client.document);
    expect(output.address.complement).toBe(client.address.complement);
    expect(output.address.city).toBe(client.address.city);
    expect(output.address.number).toBe(client.address.number);
    expect(output.address.state).toBe(client.address.state);
    expect(output.address.street).toBe(client.address.street);
    expect(output.address.zipCode).toBe(client.address.zipCode);
    expect(output.createdAt).toEqual(client.createdAt);
    expect(output.updatedAt).toEqual(client.updatedAt);
  });
});
