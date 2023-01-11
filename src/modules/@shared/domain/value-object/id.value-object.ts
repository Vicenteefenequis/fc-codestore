import { v4 as uuid } from "uuid";
import ValueObject from "./value-object.interface";

export default class Id implements ValueObject {
  private _id: string;

  constructor(id?: string) {
    this._id = id || uuid();
  }

  get id() {
    return this._id;
  }
}
