export interface InputGenerateInvoiceFacadeDto {
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

export interface OutputGenerateInvoiceFacadeDto {
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

export interface InputFindInvoiceFacadeDto {
  id: string;
}

export interface OutputFindInvoiceFacadeDto {
  id: string;
  name: string;
  document: string;
  address: Address;
  items: Product[];
  total: number;
  createdAt: Date;
}

export default interface InvoiceFacadeInterface {
  generate(
    input: InputGenerateInvoiceFacadeDto
  ): Promise<OutputGenerateInvoiceFacadeDto>;
  find(input: InputFindInvoiceFacadeDto): Promise<OutputFindInvoiceFacadeDto>;
}

type Address = {
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

type Product = {
  id: string;
  name: string;
  price: number;
};
