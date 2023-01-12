export interface InputFindInvoiceDto {
  id: string;
}

export interface OutputFindInvoiceDto {
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
}

type Product = {
  id: string;
  name: string;
  price: number;
};
