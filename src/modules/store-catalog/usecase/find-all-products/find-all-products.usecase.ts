import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export default class FindAllProductUseCase implements UseCaseInterface {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(): Promise<FindAllProductsDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map((product) => ({
        description: product.description,
        id: product.id.id,
        name: product.name,
        salesPrice: product.salesPrice,
      })),
    };
  }
}
