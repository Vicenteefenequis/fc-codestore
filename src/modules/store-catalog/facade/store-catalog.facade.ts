import FindAllProductUseCase from "../usecase/find-all-products/find-all-products.usecase";
import FindProductUseCase from "../usecase/find-product/find-product.usecase";
import {
  InputFindStoreCatalogFacadeDto,
  OutputFindAllStoreCatalogFacadeDto,
  OutputFindStoreCatalogFacadeDto,
  StoreCatalogFacadeInterface,
} from "./store-catalog.facade.interface";

export interface UseCaseProps {
  findUseCase: FindProductUseCase;
  findAllUseCase: FindAllProductUseCase;
}

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private findUseCase: FindProductUseCase;
  private findAllUseCase: FindAllProductUseCase;

  constructor(props: UseCaseProps) {
    this.findUseCase = props.findUseCase;
    this.findAllUseCase = props.findAllUseCase;
  }

  async find(
    input: InputFindStoreCatalogFacadeDto
  ): Promise<OutputFindStoreCatalogFacadeDto> {
    return await this.findUseCase.execute(input);
  }

  async findAll(): Promise<OutputFindAllStoreCatalogFacadeDto> {
    return await this.findAllUseCase.execute();
  }
}
