export interface FindAllProductsDto {
  products: Product[];
}

type Product = {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
};
