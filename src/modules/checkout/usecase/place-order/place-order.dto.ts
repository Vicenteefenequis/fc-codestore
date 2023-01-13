export interface InputPlaceOrderDto {
  clientId: string;
  products: { productId: string }[];
}

export interface OutputPlaceOrderDto {
  id: string;
  invoiceId: string;
  status: string;
  total: number;
  products: {
    productId: string;
  }[];
}
