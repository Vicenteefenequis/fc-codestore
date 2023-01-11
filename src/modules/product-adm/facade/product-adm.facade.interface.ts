export interface InputAddProductFacadeDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface InputCheckStockFacadeDto {
  productId: string;
}

export interface OutputCheckStockFacadeDto {
  productId: string;
  stock: number;
}

export interface ProductAdmFacadeInterface {
  addProduct(input: InputAddProductFacadeDto): Promise<void>;
  checkStock(
    input: InputCheckStockFacadeDto
  ): Promise<OutputCheckStockFacadeDto>;
}
