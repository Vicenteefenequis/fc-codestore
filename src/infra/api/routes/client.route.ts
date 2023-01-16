import express, { Request, Response } from "express";
import { ClientAdmFacadeFactory } from "../../../modules/client-adm/factory/factory.facade";

export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
  const clientFacade = ClientAdmFacadeFactory.create();

  const {
    name,
    email,
    document,
    street,
    number,
    complement,
    city,
    state,
    zipCode,
  } = req.body;

  try {
    await clientFacade.add({
      name,
      email,
      document,
      street,
      number,
      complement,
      city,
      state,
      zipCode,
    });

    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});
