export interface InputFindClientDto {
  id: string;
}

export interface OutputFindClientDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
