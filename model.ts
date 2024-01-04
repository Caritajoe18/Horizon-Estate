import { model, Schema } from "mongoose";
import { IPayment } from "./interface";

const paymentSchema = new Schema(
  {
    reference: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "auth",
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
    },
  },
  { timestamps: true }
);

export const Payment = model<IPayment>("payment", paymentSchema);
