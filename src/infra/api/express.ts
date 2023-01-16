import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";

import { ProductModel as StoreCatalogModel } from "../../modules/store-catalog/repository/product.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import ClientAdmModel from "../../modules/client-adm/repository/client.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import { clientRoute } from "./routes/client.route";
import { productRoute } from "./routes/product.route";
import { checkoutRoute } from "./routes/checkout.route";

export const app: Express = express();

app.use(express.json());
app.use("/client", clientRoute);
app.use("/product", productRoute);
app.use("/checkout", checkoutRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
    logging: false,
    models: [
      ClientAdmModel,
      ProductModel,
      StoreCatalogModel,
      TransactionModel,
      InvoiceModel,
      OrderModel,
    ],
  });

  await sequelize.sync();
}

setupDb();
