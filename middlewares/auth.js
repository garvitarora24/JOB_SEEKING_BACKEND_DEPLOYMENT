import {catchAsyncError} from './catchAsyncerror.js'
import ErrorHandler from "./error.js"
import jwt from 'jsonwebtoken'
import { User } from '../models/userSchema.js'
export const isAuthorized=catchAsyncError(async(req,res,next)=>{
    // console.log("Cookies received: ", req.cookies);
    const {token}=req.cookies;
    // console.log("token is " + token);
    if(!token){
        // console.log("token is undefined")
        return next(new ErrorHandler("USER not authorized",400))

    }
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user=await User.findById(decoded.id);
        next();
            
    } catch (error) {
        console.log("error in  auth.js okay na?" )
        return next(new ErrorHandler('Invalid token', 403)); // 403 for forbidden
        
    }
    
})