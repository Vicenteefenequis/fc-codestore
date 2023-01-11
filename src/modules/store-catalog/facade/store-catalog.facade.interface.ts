type Product = {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
};

export interface InputFindStoreCatalogFacadeDto {
  id: string;
}

export interface OutputFindStoreCatalogFacadeDto extends Product {}

export interface OutputFindAllStoreCatalogFacadeDto {
  products: Product[];
}

export interface StoreCatalogFacadeInterface {
  find(
    input: InputFindStoreCatalogFacadeDto
  ): Promise<OutputFindStoreCatalogFacadeDto>;
  findAll(): Promise<OutputFindAllStoreCatalogFacadeDto>;
}
