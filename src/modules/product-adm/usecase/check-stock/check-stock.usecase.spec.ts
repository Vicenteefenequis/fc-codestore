import Id from "../../../@shared/domain/value-object/id.value-object";
import ProductGateway from "../../gateway/product.gateway";
import CheckStockUseCase from "./check-stock.usecase";

const MockRepository = (): ProductGateway => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue({ id: new Id("1"), stock: 10 }),
  };
};

describe("CheckStock use case test", () => {
  it("should a check stock", async () => {
    const productRepository = MockRepository();
    const usecase = new CheckStockUseCase(productRepository);

    const input = {
      productId: "1",
    };

    const output = await usecase.execute(input);

    expect(output).toBeDefined();
    expect(output.productId).toBe("1");
    expect(output.stock).toBe(10);
  });
});
