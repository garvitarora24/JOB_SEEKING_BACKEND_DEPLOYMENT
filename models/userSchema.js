import mongoose from 'mongoose';
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide your name "],
        minLength:[3,"Name must contains at least 3 characters"],
        maxLength:[30,"name cannot exceed 30 characters !"]

    },
    email:{
        type:String,
        required:[true,"please provide your email "],
        validate:[validator.isEmail,"please provide a valid email"]
    },
    phone:{
        type:Number,
        required:[true,"please provide your phone number ."]
    },
    password:{
        type:String,
        required:[true,"plesae provide your password"],
        minLength:[8,"password must contain atlesat 8 characters"],
        maxLength:[32,"password must not exceed 30 characters"],
        select:false

    },
    role:{
        type:String,
        required:[true,"please provide your role"],
        enum:["Job seeker","Employeer"]
    },
    createdAt:{
        type:Date,
        default:Date.now,

    }
});

//HASHING THE PASSWORD
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
});



// COMPARING PASSWORD
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// GENERATING A JWT TOKEN FOR AUTHORIZATION
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

export const User=mongoose.model("user",userSchema)