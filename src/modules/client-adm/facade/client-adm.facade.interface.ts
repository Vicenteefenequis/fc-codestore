export interface InputAddClientFacadeDto {
  id?: string;
  name: string;
  email: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InputFindClientFacadeDto {
  id: string;
}

export interface OutputFindClientFacadeDto {
  id: string;
  name: string;
  email: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientAdmFacadeInterface {
  add(input: InputAddClientFacadeDto): Promise<void>;
  find(input: InputFindClientFacadeDto): Promise<OutputFindClientFacadeDto>;
}
