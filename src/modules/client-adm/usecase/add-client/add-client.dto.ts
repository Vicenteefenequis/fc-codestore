export interface InputAddClientDto {
  id?: string;
  name: string;
  email: string;
  address: string;
}

export interface OutputAddClientDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
