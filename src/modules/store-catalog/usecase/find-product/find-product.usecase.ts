import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { InputFindProductDto, OutputFindProductDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface {
  constructor(private readonly productRepository: ProductGateway) {}

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id.id,
      description: product.description,
      name: product.name,
      salesPrice: product.salesPrice,
    };
  }
}
