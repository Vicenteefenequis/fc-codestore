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
    await this.useCase.addUseCase.execute(input);
  }
  async find(
    input: InputFindClientFacadeDto
  ): Promise<OutputFindClientFacadeDto> {
    return await this.useCase.findUseCase.execute(input);
  }
}
