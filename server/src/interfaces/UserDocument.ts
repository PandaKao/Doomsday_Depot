import type { IBasketItem } from "../models/BasketItem";
import type { Types } from "mongoose";

export default interface IUserDocument {
  _id: Types.ObjectId | string;
  username: string | null;
  email: string | null;
  isCorrectPassword(password: string): Promise<boolean>;
  basket: IBasketItem[];
  basketCount: number | null;
  basketTotal: number | null;
}
