import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  amount: 100,
  orderId: "1",
  status: "approved",
});

const transaction2 = new Transaction({
  id: new Id("1"),
  amount: 50,
  orderId: "1",
  status: "declined",
});

const MockRepositoryDeclined = () => ({
  save: jest.fn().mockReturnValue(Promise.resolve(transaction2)),
});

const MockRepository = () => ({
  save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
});

describe("Process payment usecase unit test", () => {
  it("should save a transaction", async () => {
    const paymentRepository = MockRepository();
    const usecase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      orderId: "1",
      amount: 100,
    };

    const result = await usecase.execute(input);

    expect(result.orderId).toBe("1");
    expect(result.transactionId).toBe("1");
    expect(result.amount).toBe(100);
    expect(result.status).toBe("approved");
    expect(paymentRepository.save).toHaveBeenCalled();

    expect(result.createdAt).toStrictEqual(transaction.createdAt);
    expect(result.updatedAt).toStrictEqual(transaction.updatedAt);
  });

  it("should decline a transaction", async () => {
    const paymentRepository = MockRepositoryDeclined();
    const usecase = new ProcessPaymentUseCase(paymentRepository);

    const input = {
      orderId: "1",
      amount: 50,
    };

    const result = await usecase.execute(input);

    expect(result.orderId).toBe("1");
    expect(result.transactionId).toBe("1");
    expect(result.amount).toBe(50);
    expect(result.status).toBe("declined");
    expect(paymentRepository.save).toHaveBeenCalled();
  });
});
