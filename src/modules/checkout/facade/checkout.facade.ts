import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import CheckoutFacadeInterface, {
  InputPlaceOrderFacadeDto,
  OutputPlaceOrderFacadeDto,
} from "./checkout.facade.interface";

type UseCaseProps = {
  placeOrderUseCase: PlaceOrderUseCase;
};
export default class CheckoutFacade implements CheckoutFacadeInterface {
  private _placeOrderUseCase: PlaceOrderUseCase;
  constructor(useCaseProps: UseCaseProps) {
    this._placeOrderUseCase = useCaseProps.placeOrderUseCase;
  }

  async placeOrder(
    input: InputPlaceOrderFacadeDto
  ): Promise<OutputPlaceOrderFacadeDto> {
    return await this._placeOrderUseCase.execute(input);
  }
}
