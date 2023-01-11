import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { InputAddClientDto, OutputAddClientDto } from "./add-client.dto";

export default class AddClientUseCase implements UseCaseInterface {
  constructor(private readonly clientRepository: ClientGateway) {}

  async execute(input: InputAddClientDto): Promise<OutputAddClientDto> {
    const props = {
      name: input.name,
      email: input.email,
      address: input.address,
    };

    const client = new Client(props);

    await this.clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
