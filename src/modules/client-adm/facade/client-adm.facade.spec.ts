import { Sequelize } from "sequelize-typescript";
import { ClientAdmFacadeFactory } from "../factory/factory.facade";
import ClientModel from "../repository/client.model";

describe("ClientAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should create a client", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    };

    await clientFacade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client.id).toBe(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.address).toEqual(input.address);
  });

  it("should find a product", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();

    await clientFacade.add({
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      address: "Address 1",
    });

    const input = {
      id: "1",
    };

    const result = await clientFacade.find(input);

    expect(result.id).toBe("1");
    expect(result.name).toBe("Client 1");
    expect(result.email).toBe("x@x.com");
    expect(result.address).toBe("Address 1");
  });
});
