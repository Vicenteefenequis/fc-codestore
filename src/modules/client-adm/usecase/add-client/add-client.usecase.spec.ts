import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => ({ add: jest.fn(), find: jest.fn() });

describe("Add client usecase test unit", () => {
  it("should create a client", async () => {
    const clientRepository = MockRepository();
    const usecase = new AddClientUseCase(clientRepository);

    const input = {
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    };
    const output = await usecase.execute(input);

    expect(clientRepository.add).toHaveBeenCalled();

    expect(output.id).toBeDefined();
    expect(output.name).toBe("Client 1");
    expect(output.email).toBe("x@x.com");
    expect(output.address).toBe("Address 1");
  });
});
