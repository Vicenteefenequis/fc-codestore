import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { InputFindInvoiceDto, OutputFindInvoiceDto } from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
  constructor(private readonly invoiceRepository: InvoiceGateway) {}

  async execute(input: InputFindInvoiceDto): Promise<OutputFindInvoiceDto> {
    const invoice = await this.invoiceRepository.find(input.id);
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      city: invoice.address.city,
      complement: invoice.address.complement,
      number: invoice.address.number,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      createdAt: invoice.createdAt,
      total: invoice.total,
    };
  }
}
