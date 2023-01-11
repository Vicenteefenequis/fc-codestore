import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Transaction from "../../domain/transaction";
import PaymentGateway from "../../gateway/payment.gateway";
import {
  InputProcessPaymentDto,
  OutputProcessPaymentDto,
} from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
  constructor(private transactionRepository: PaymentGateway) {}

  async execute(
    input: InputProcessPaymentDto
  ): Promise<OutputProcessPaymentDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId,
    });
    transaction.proccess();

    const result = await this.transactionRepository.save(transaction);
    return {
      transactionId: result.id.id,
      orderId: result.orderId,
      amount: result.amount,
      status: result.status,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }
}
