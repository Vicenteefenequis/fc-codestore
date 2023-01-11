import ProductGateway from "../../gateway/product.gateway";
import { InputCheckStockDto, OutputCheckStockDto } from "./check-stock.dto";

export default class CheckStockUseCase {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(input: InputCheckStockDto): Promise<OutputCheckStockDto> {
    const output = await this.productRepository.find(input.productId);
    return {
      productId: output.id.id,
      stock: output.stock,
    };
  }
}
