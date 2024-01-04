import { Router } from "express";
import { PaymentController } from "./Controller";
import { AuthMiddleware } from "../../lib/middleware/AuthMiddleware";

const router = Router();

router.get(
  "/all",
  AuthMiddleware.Authenticate(["user"]),
  PaymentController.getAllPayment
);

export const PaymentRouter = router;
