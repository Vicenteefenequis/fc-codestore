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
      city: "City 1",
      complement: "Complement 1",
      document: "Document 1",
      number: "Number 1",
      state: "State 1",
      street: "Street 1",
      zipCode: "ZipCode 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await clientFacade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client.id).toBe(input.id);
    expect(client.name).toEqual(input.name);
    expect(client.email).toEqual(input.email);
    expect(client.city).toBe(input.city);
    expect(client.complement).toBe(input.complement);
    expect(client.document).toBe(input.document);
    expect(client.number).toBe(input.number);
    expect(client.state).toBe(input.state);
    expect(client.street).toBe(input.street);
    expect(client.zipCode).toBe(input.zipCode);
    expect(client.createdAt).toEqual(input.createdAt);
    expect(client.updatedAt).toEqual(input.updatedAt);
  });

  it("should find a product", async () => {
    const clientFacade = ClientAdmFacadeFactory.create();

    const props = {
      id: "1",
      name: "Client 1",
      email: "x@x.com",
      city: "City 1",
      complement: "Complement 1",
      document: "Document 1",
      number: "Number 1",
      state: "State 1",
      street: "Street 1",
      zipCode: "ZipCode 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await clientFacade.add(props);

    const input = {
      id: "1",
    };

    const result = await clientFacade.find(input);

    expect(result.id).toBeDefined();
    expect(result.name).toEqual(props.name);
    expect(result.email).toEqual(props.email);
    expect(result.city).toBe(props.city);
    expect(result.complement).toBe(props.complement);
    expect(result.document).toBe(props.document);
    expect(result.number).toBe(props.number);
    expect(result.state).toBe(props.state);
    expect(result.street).toBe(props.street);
    expect(result.zipCode).toBe(props.zipCode);
    expect(result.createdAt).toEqual(props.createdAt);
    expect(result.updatedAt).toEqual(props.updatedAt);
  });
});
