import mongoose from "mongoose"
import validator from "validator"
const applicationschema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please provide your name"],
        minLength:[3,"name must contain atleast 3 characters"],
        maxLength:[20,"name must not exceed 20 characters"]

    },
    email:{
        type:String,
        validator:[validator.isEmail,"please provide valid email"],
        required:[true,"please provide your email"]

    },
    coverLetter:{
        type:String,
        required:[true,"please provide your cover letter! "]

    },
    phone:{
        type:Number,
        required:[true,"please provide your number"]

    },
    address:{
        type:String,
        required:[true,"please provide your address"]

    },

    resume:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    applicantID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Job seeker"],
            required:true
        }
    },

    employerID:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        role:{
            type:String,
            enum:["Employeer"],
            required:true
        }

    }

})

export const Application=mongoose.model("Application",applicationschema)