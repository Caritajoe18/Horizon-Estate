import { ValidationChain } from "express-validator";
import {
 
  password,
 fullName,
  email,
} from "../../lib/middleware/schema";

export const AuthSchema = (): ValidationChain[] => {
  return [ password, fullName, email];
};
export const SignInSchema = (): ValidationChain[] => {
  return [email, password];
};
