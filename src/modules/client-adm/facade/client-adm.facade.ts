import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";
import {
  ClientAdmFacadeInterface,
  InputAddClientFacadeDto,
  InputFindClientFacadeDto,
  OutputFindClientFacadeDto,
} from "./client-adm.facade.interface";

type UseCase = {
  findUseCase: FindClientUseCase;
  addUseCase: AddClientUseCase;
};

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  constructor(private readonly useCase: UseCase) {}
  async add(input: InputAddClientFacadeDto): Promise<void> {
    await this.useCase.addUseCase.execute({
      id: input.id,
      document: input.document,
      email: input.email,
      name: input.name,
      address: {
        city: input.city,
        complement: input.complement,
        number: input.number,
        state: input.state,
        street: input.street,
        zipCode: input.zipCode,
      },
    });
  }
  async find(
    input: InputFindClientFacadeDto
  ): Promise<OutputFindClientFacadeDto> {
    const result = await this.useCase.findUseCase.execute(input);
    return {
      id: result.id,
      name: result.name,
      email: result.email,
      document: result.document,
      city: result.address.city,
      complement: result.address.complement,
      number: result.address.number,
      state: result.address.state,
      street: result.address.street,
      zipCode: result.address.zipCode,
      updatedAt: result.updatedAt,
      createdAt: result.createdAt,
    };
  }
}
