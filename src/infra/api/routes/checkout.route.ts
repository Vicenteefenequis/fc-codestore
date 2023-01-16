import express, { Request, Response } from "express";
import { CheckoutFacadeFactory } from "../../../modules/checkout/factory/checkout.facade.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const facade = CheckoutFacadeFactory.create();
  const { clientId, products } = req.body;

  try {
    const output = await facade.placeOrder({
      clientId,
      products,
    });

    res.status(201).send(output);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});
