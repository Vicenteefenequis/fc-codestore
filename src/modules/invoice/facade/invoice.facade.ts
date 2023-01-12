import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, {
  InputFindInvoiceFacadeDto,
  InputGenerateInvoiceFacadeDto,
  OutputFindInvoiceFacadeDto,
  OutputGenerateInvoiceFacadeDto,
} from "./invoice.facade.interface";

interface UseCaseProps {
  generateInvoiceUseCase: GenerateInvoiceUseCase;
  findInvoiceUseCase: FindInvoiceUseCase;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _generatedInvoiceUseCase: GenerateInvoiceUseCase;
  private _findInvoiceUseCase: FindInvoiceUseCase;

  constructor(props: UseCaseProps) {
    this._findInvoiceUseCase = props.findInvoiceUseCase;
    this._generatedInvoiceUseCase = props.generateInvoiceUseCase;
  }

  async generate(
    input: InputGenerateInvoiceFacadeDto
  ): Promise<OutputGenerateInvoiceFacadeDto> {
    return await this._generatedInvoiceUseCase.execute(input);
  }

  async find(
    input: InputFindInvoiceFacadeDto
  ): Promise<OutputFindInvoiceFacadeDto> {
    const result = await this._findInvoiceUseCase.execute(input);
    return {
      id: result.id,
      name: result.name,
      document: result.document,
      address: {
        city: result.city,
        complement: result.complement,
        number: result.number,
        state: result.state,
        street: result.street,
        zipCode: result.zipCode,
      },
      items: result.items,
      total: result.total,
      createdAt: result.createdAt,
    };
  }
}
