import { Sequelize } from "sequelize-typescript";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";

describe("ProductAdmFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);

    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });
  it("should create a product", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 100,
      stock: 10,
    };

    await productFacade.addProduct(input);

    const product = await ProductModel.findOne({ where: { id: "1" } });

    expect(product.id).toBe("1");
    expect(product.description).toEqual("Description 1");
    expect(product.name).toEqual("Product 1");
    expect(product.purchasePrice).toEqual(100);
    expect(product.stock).toEqual(10);
  });

  it("should check stock a product", async () => {
    const productFacade = ProductAdmFacadeFactory.create();

    ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const input = {
      productId: "1",
    };

    const result = await productFacade.checkStock(input);

    expect(result.productId).toBe("1");
    expect(result.stock).toBe(10);
  });
});
