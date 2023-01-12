import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/value-object/address";
import Invoice from "../domain/entity/invoice";
import Product from "../domain/entity/product";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceModel from "./invoice.model";
import ProductModel from "./product.model";

export default class InvoiceRepository implements InvoiceGateway {
  async find(id: string): Promise<Invoice> {
    const result = await InvoiceModel.findOne({
      where: { id },
      include: [{ model: ProductModel }],
    });
    return InvoiceParser.toDomain(result);
  }

  async generate(invoice: Invoice): Promise<Invoice> {
    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        city: invoice.address.city,
        complement: invoice.address.complement,
        number: invoice.address.number,
        state: invoice.address.state,
        street: invoice.address.street,
        zipCode: invoice.address.zipCode,
        products: invoice.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
        })),
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt,
      },
      { include: [{ model: ProductModel }] }
    );

    return new Invoice({
      id: invoice.id,
      name: invoice.name,
      address: invoice.address,
      document: invoice.document,
      items: invoice.items,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
}

class InvoiceParser {
  static toDomain(invoice: InvoiceModel): Invoice {
    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        city: invoice.city,
        complement: invoice.complement,
        number: invoice.number,
        state: invoice.state,
        street: invoice.street,
        zipCode: invoice.zipCode,
      }),
      items: invoice.products.map(
        (item) =>
          new Product({
            name: item.name,
            price: item.price,
            id: new Id(item.id),
          })
      ),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
}
