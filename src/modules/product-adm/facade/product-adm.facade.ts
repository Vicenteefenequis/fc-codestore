import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import {
  InputAddProductFacadeDto,
  InputCheckStockFacadeDto,
  OutputCheckStockFacadeDto,
  ProductAdmFacadeInterface,
} from "./product-adm.facade.interface";

interface UseCaseProps {
  addProductUseCase: UseCaseInterface;
  checkStockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addProductUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._addProductUseCase = useCaseProps.addProductUseCase;
    this._checkStockUseCase = useCaseProps.checkStockUseCase;
  }

  addProduct(input: InputAddProductFacadeDto): Promise<void> {
    return this._addProductUseCase.execute(input);
  }

  checkStock(
    input: InputCheckStockFacadeDto
  ): Promise<OutputCheckStockFacadeDto> {
    return this._checkStockUseCase.execute(input);
  }
}
