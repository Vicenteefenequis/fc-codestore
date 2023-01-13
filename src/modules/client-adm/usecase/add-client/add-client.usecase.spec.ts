import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => ({ add: jest.fn(), find: jest.fn() });

describe("Add client usecase test unit", () => {
  it("should create a client", async () => {
    const clientRepository = MockRepository();
    const usecase = new AddClientUseCase(clientRepository);

    const input = {
      name: "Client 1",
      email: "x@x.com",
      document: "Document 1",
      address: {
        city: "City 1",
        complement: "Complement 1",
        document: "Document 1",
        number: "Number 1",
        state: "State 1",
        street: "Street 1",
        zipCode: "ZipCode 1",
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const output = await usecase.execute(input);

    expect(clientRepository.add).toHaveBeenCalled();

    expect(output.id).toBeDefined();
    expect(output.name).toEqual(input.name);
    expect(output.email).toEqual(input.email);
    expect(output.document).toBe(input.document);
    expect(output.address.complement).toBe(input.address.complement);
    expect(output.address.city).toBe(input.address.city);
    expect(output.address.number).toBe(input.address.number);
    expect(output.address.state).toBe(input.address.state);
    expect(output.address.street).toBe(input.address.street);
    expect(output.address.zipCode).toBe(input.address.zipCode);
    expect(output.createdAt).toEqual(input.createdAt);
    expect(output.updatedAt).toEqual(input.updatedAt);
  });
});
