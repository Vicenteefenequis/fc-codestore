import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientGateway from "../../gateway/client.gateway";
import {
  InputFindClientDto,
  OutputFindClientDto,
} from "./find-client.usecase.dto";

export default class FindClientUseCase implements UseCaseInterface {
  constructor(private readonly clientRepository: ClientGateway) {}

  async execute(input: InputFindClientDto): Promise<OutputFindClientDto> {
    const client = await this.clientRepository.find(input.id);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      address: {
        city: client.address.city,
        complement: client.address.complement,
        number: client.address.number,
        state: client.address.state,
        street: client.address.street,
        zipCode: client.address.zipCode,
      },
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }
}
