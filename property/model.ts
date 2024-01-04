import { IfUnknown, model, Schema } from "mongoose";
import { Iproperty } from "./interface";

export enum status {
  VACANT = "vacant",
  OCCUPIED = "occupied",
}
const propertyModel = new Schema(
  {
    ownerName: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Duplex", "Bungalow"],
      required: true,
    },
    propertyStatus: {
      type: String,
      enum: ["Occupied", "Vacant"],
      default: status.VACANT,
    },

    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Property = model<Iproperty>("Property", propertyModel);
