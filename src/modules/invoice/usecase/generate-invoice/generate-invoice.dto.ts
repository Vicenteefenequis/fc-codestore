export interface InputGenerateInvoiceUseCaseDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: Product[];
}

export interface OutputGenerateInvoiceUseCaseDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: Product[];
  total: number;
}

type Product = {
  id: string;
  name: string;
  price: number;
};
