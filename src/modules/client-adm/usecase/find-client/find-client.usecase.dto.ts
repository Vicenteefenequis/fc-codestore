export interface InputFindClientDto {
  id: string;
}

export interface OutputFindClientDto {
  id: string;
  name: string;
  email: string;
  document: string;
  address: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
