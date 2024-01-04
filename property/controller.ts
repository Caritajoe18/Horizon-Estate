import { Request, Response } from "express";
import { Property, status } from "./model";
import { option } from "../../lib/helper/validator";
import { PaymentSchema, propertySchema, updatePropertySchema } from "./schema";
import { Payment } from "../Payment/model";
import { AUTH, ICreateAuth } from "../Auth";
import { IRequest } from "../../interface/IRequest";
import cloudinary from "../../lib/helper/cloudinary";
import { PaymentController } from "../Payment/Controller";
import { error } from "winston";
interface PAY {
  status: boolean;
  message: string;
  data: {
    amount: number;
  };
}

export class controller {
  static async getProperties(req: Request, res: Response) {
    try {
      const getAllProperty = await Property.find({ active: true });
      return res.status(200).json({
        message: "You have all your properties",
        getAllProperty,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async createProperty(req: IRequest, res: Response) {
    try {
      const validateProperty = propertySchema.validate(req.body, option);
      if (validateProperty.error) {
        return res
          .status(400)
          .json({ error: validateProperty.error.details[0].message });
      }

      const admin = await AUTH.findById(req.user);
      if (!admin) {
        return res.status(400).json({
          msg: "You cannot create a property",
        });
      }

      const addProperties = await Property.create(req.body);
      return res.status(200).json({
        message: "You have created a property",
        addProperties,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getProperty(req: Request, res: Response) {
    try {
      const getProperty = await Property.findOne({
        active: true,
        _id: req.params.id,
      });
      if (!getProperty) {
        throw new Error("property does not exist");
      }
      return res.status(200).json({
        message: "Property Retrieved",
        getProperty,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateProperty(req: IRequest, res: Response) {
    try {
      const validateProperty = updatePropertySchema.validate(req.body, option);
      if (validateProperty.error) {
        return res.status(400).json({
          Error: validateProperty.error.details[0].message,
        });
      }
      const admin = await AUTH.findById(req.user);
      if (!admin) {
        return res.status(400).json({
          msg: "You cannot update a property",
        });
      }

      const updateProperty = await Property.findById(req.params.id);

      const updatedProperty = await Property.findByIdAndUpdate(
        { active: true, _id: req.params.id },

        { $set: req.body },
        { new: true }
      );
      return res.status(200).json({
        message: "You have successfully updated a property",
        updatedProperty,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteProperty(req: IRequest, res: Response) {
    try {
      const admin = await AUTH.findById(req.user);
      if (!admin) {
        return res.status(400).json({
          msg: "You cannot delete a property",
        });
      }
      const deleteProperty = await Property.findOne({
        active: true,
        _id: req.params.id,
      });
      if (!deleteProperty) {
        return res.status(400).json({ message: "Property deos not exist" });
      }
      deleteProperty.active = false;
      await deleteProperty.save();

      return res.status(200).json({
        message: "You have successfully deleted a property",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async imageUplaod(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const uploadedImage = await cloudinary.uploader.upload(req.file.path);

      res.status(200).json({ imageUrl: uploadedImage.secure_url });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  static async payment(req: IRequest, res: Response) {
    try {
      const validate = PaymentSchema.validate(req.body, option);
      if (validate.error) {
        return res
          .status(400)
          .json({ error: validate.error.details[0].message });
      }
      const { _id, reference } = req.body;
      const property = await Property.findOne({
        _id,
        propertyStatus: "Vacant",
      });
      if (!property) {
        return res.status(400).json({ message: "Property Not available" });
      }
      const data = (await AUTH.findOne({ _id: req.user })) as ICreateAuth;
      const info = {
        user: data,
        property,
        reference,
        amount: property.price,
      };
      const pay = (await PaymentController.create(info)) as PAY;
      if (pay.status && pay.message === "Verification successful") {
        const price = pay.data.amount / 100;
        if (price !== property.price) {
          return res.status(400).json({ error: "invalid amount" });
        }
        await Payment.create({
          user: data,
          property,
          reference,
          amount: property.price,
        });
        property.propertyStatus = "Occupied";
        await property.save();
        return res.status(200).json({ message: "successful" });
      } else {
        return res.status(400).json({ error: "Something went wrong" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async propertyCount(req: Request, res: Response) {
    try {
      const count = await Property.countDocuments({});
      return res.status(200).json({ count });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getTotalAmountPaid(req: Request, res: Response) {
    try {
      const result = await Property.aggregate([
        {
          $match: {
            propertyStatus: "Occupied"
          }
        },
        {
          $group: {
            _id: null,
            totalAmountPaid: { $sum: "$price" },
          },
        },
      ]);
  
      if (result.length > 0) {
        return res.status(200).json({ price: result[0].totalAmountPaid });
      } else {
        return res.status(400).json({ error: "No occupied properties found" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  

  static async countOccupiedProperties(req: Request, res: Response) {
    try {
      const result = await Property.aggregate([
        {
          $match: {
            propertyStatus: "Occupied"
          }
        },
        {
          $group: {
            _id: null,
            totalOccupiedProperties: { $sum: 1 }
          }
        }
      ]);
  
      if (result.length > 0) {
        return res.status(200).json(result[0].totalOccupiedProperties);
      } else {
        return res.status(400).json({ error: "No properties Found" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  
}
