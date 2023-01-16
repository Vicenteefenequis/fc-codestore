import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const productFacade = ProductAdmFacadeFactory.create();
  const { description, name, purchasePrice, stock } = req.body;
  try {
    await productFacade.addProduct({ description, name, purchasePrice, stock });
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});
