import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.value-object";
import Client from "../domain/client.entity";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
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

    const clientRepository = new ClientRepository();

    await clientRepository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: "1" } });

    expect(clientDb.id).toEqual(client.id.id);
    expect(clientDb.name).toEqual(client.name);
    expect(clientDb.email).toEqual(client.email);
    expect(clientDb.document).toEqual(client.document);
    expect(clientDb.city).toBe(client.address.city);
    expect(clientDb.complement).toBe(client.address.complement);
    expect(clientDb.number).toBe(client.address.number);
    expect(clientDb.state).toBe(client.address.state);
    expect(clientDb.street).toBe(client.address.street);
    expect(clientDb.zipCode).toBe(client.address.zipCode);
    expect(clientDb.createdAt).toEqual(client.createdAt);
    expect(clientDb.updatedAt).toEqual(client.updatedAt);
  });

  it("should a find a client", async () => {
    const client = await ClientModel.create({
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
    });

    const repository = new ClientRepository();

    const result = await repository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.document).toBe(client.document);
    expect(result.email).toEqual(client.email);
    expect(result.address.city).toBe(client.city);
    expect(result.address.complement).toBe(client.complement);
    expect(result.address.number).toBe(client.number);
    expect(result.address.state).toBe(client.state);
    expect(result.address.street).toBe(client.street);
    expect(result.address.zipCode).toBe(client.zipCode);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});
