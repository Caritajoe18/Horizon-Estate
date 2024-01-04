import { option, registerUserSchema } from "../../lib/helper/validator";
import { ICreateAuth } from "./interface";
import { AUTH } from "./model";
import {Util} from "../../utils"
import {sendMail} from "../../lib/helper/sendMail"

  interface Custom extends Error{
    message:string,
    code:number
  }
export class Service {

    static async signup (args:ICreateAuth):Promise<Record<string, string|number>>{
        try {
          

           
                const exist = await AUTH.findOne({email: args.email})
                if(exist){
                  throw new Error  ("email already exist")
                }
           
            const auth = await AUTH.create(args) as unknown as  {[key:string]: string}
            
            return auth
        } catch (error) {
          const err = error as Custom
          return {error:err.message, code:err.code}
        }
    }
    static async sendVerificationCode(input: {
      email: string
      id: string
    }): Promise<Record<string, string| number>> {
      const user = await AUTH.findOne({ _id: input.id })
      if (!user) return ({error:'Invalid credentials'})
      if (user.email !== input.email) return({error:'Invalid credentials'})
  
      const code = Util.generateCode()
  
      const expiry = new Date().getTime() + 600000
  
      user.verificationCode = code
   
  
       user.emailVerificationExpiration = expiry
  
       user.emailVerificationStatus = true
  
     await user.save()
     const info = {
      from:"priceblings@gmail.com",
      to:user.email,
      subject:"verification code",
      text:`verification code is ${code}`
     }
  
      await sendMail(info)
    
  
     return { message: `verification code is ${code}`}
    }
  
    static async verifyCode(
      input: {
        email: string
        code: string
      },
    
    ): Promise<Record<string, string|number> | string> {
      const user = await AUTH.findOne({ email: input.email })
      if (!user) return({error:'user nof found'})
      
   
  
      if (user.isVerified) return ({error:"email already verified"})
      const now = new Date().getTime()
  
      if (user.verificationCode !== Number(input.code)) return {error:"invalid verification code"} 
      if(user.emailVerificationExpiration){
        if (now > user.emailVerificationExpiration) return {error:"OTP has expired"}
        
      

      }
  
      if (user.emailVerificationStatus === false) return {error:"verification code is not valid"} 
     
  
     
      user.isVerified = true
     
  
      await user.save()
  
      return 'Verification successful'
    }
  
}