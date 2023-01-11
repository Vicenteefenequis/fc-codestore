export interface InputProcessPaymentDto {
  amount: number;
  orderId: string;
}

export interface OutputProcessPaymentDto {
  orderId: string;
  transactionId: string;
  amount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
