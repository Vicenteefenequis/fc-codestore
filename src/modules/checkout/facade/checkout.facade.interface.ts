export default interface CheckoutFacadeInterface {
  placeOrder(
    input: InputPlaceOrderFacadeDto
  ): Promise<OutputPlaceOrderFacadeDto>;
}

export interface InputPlaceOrderFacadeDto {
  clientId: string;
  products: { productId: string }[];
}

export interface OutputPlaceOrderFacadeDto {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string;
  }[];
}
