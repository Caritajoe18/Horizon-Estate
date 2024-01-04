import { ICreateAuth } from "../Auth";
import { Iproperty } from "../property/interface";

export interface IPayment {
  reference: string;
  property: Iproperty;
  amount: number;
  user: ICreateAuth;
}
