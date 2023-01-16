import { ClientAdmFacadeFactory } from "../../client-adm/factory/factory.facade";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import CheckoutFacadeInterface from "../facade/checkout.facade.interface";
import CheckoutRepository from "../repository/checkout.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export class CheckoutFacadeFactory {
  static create(): CheckoutFacadeInterface {
    const repository = new CheckoutRepository();
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const usecase = new PlaceOrderUseCase(
      clientFacade,
      productFacade,
      catalogFacade,
      repository,
      invoiceFacade,
      paymentFacade
    );
    return new CheckoutFacade({ placeOrderUseCase: usecase });
  }
}
