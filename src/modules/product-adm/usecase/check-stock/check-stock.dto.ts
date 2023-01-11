export interface InputCheckStockDto {
  productId: string;
}

export interface OutputCheckStockDto {
  productId: string;
  stock: number;
}
