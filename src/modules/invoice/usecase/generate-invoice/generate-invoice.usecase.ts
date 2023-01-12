import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Address from "../../domain/value-object/address";
import Invoice from "../../domain/entity/invoice";
import Product from "../../domain/entity/product";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  InputGenerateInvoiceUseCaseDto,
  OutputGenerateInvoiceUseCaseDto,
} from "./generate-invoice.dto";
import Id from "../../../@shared/domain/value-object/id.value-object";

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(private readonly invoiceRepository: InvoiceGateway) {}

  async execute(
    input: InputGenerateInvoiceUseCaseDto
  ): Promise<OutputGenerateInvoiceUseCaseDto> {
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address: new Address({
        city: input.city,
        complement: input.complement,
        number: input.number,
        state: input.state,
        street: input.street,
        zipCode: input.zipCode,
      }),
      items: input.items.map(
        (item) =>
          new Product({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
    });

    const result = await this.invoiceRepository.generate(invoice);

    return {
      id: result.id.id,
      name: result.name,
      document: result.document,
      complement: result.address.complement,
      city: result.address.city,
      number: result.address.number,
      state: result.address.state,
      street: result.address.street,
      zipCode: result.address.zipCode,
      items: result.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: result.total,
    };
  }
}
