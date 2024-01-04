import { IPayment } from "./interface";
import axios from "axios";
import { Payment } from "./model";
import { Request, Response } from "express";

export class PaymentController {
  static async create(args: IPayment) {
    const paystackVerifyUrl = `https://api.paystack.co/transaction/verify/${args.reference}`;
    const headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
    };
    try {
      const verify = await axios.get(paystackVerifyUrl, { headers });
      return verify.data;
    } catch (error) {
      return error;
    }
  }
  static async getAllPayment(req: Request, res: Response) {
    try {
      const all = await Payment.find().populate("property user");

      return res.status(200).json({
        message: "You have all your payment",
        all,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static getOneUserPayment(req: Request, res: Response) {
    try {
      const one = Payment.findById(req.params.id);
      return res.status(200).json({
        message: "You have your payment",
        one,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
