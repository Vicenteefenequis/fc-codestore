import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "Client 1",
  email: "x@x.com",
  address: "Address 1",
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

    expect(output.id).toBe("1");
    expect(output.name).toBe("Client 1");
    expect(output.email).toBe("x@x.com");
    expect(output.address).toBe("Address 1");
  });
});
