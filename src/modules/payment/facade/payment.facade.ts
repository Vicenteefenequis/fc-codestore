import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import PaymentFacadeInterface, {
  InputPaymentFacadeDto,
  OutputPaymentFacadeDto,
} from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private readonly processPaymentUseCase: UseCaseInterface) {}

  async process(input: InputPaymentFacadeDto): Promise<OutputPaymentFacadeDto> {
    return await this.processPaymentUseCase.execute(input);
  }
}
