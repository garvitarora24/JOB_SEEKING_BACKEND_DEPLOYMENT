import mongoose from "mongoose";

const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please provide job title"],
        minLength:[3,"job title must contain atleast 3 characters"],
        maxLength:[50,"job title cannot exceed 50 characters"]
    },
    description:{
        type:String,
        required:[true,"please provide jobdescription"],
        minLength:[3,"job description must contain atleast 3 characters"],
        maxLength:[350,"job description cannot exceed 350 characters"]  
    },
    category:{
        type:String,
        required:[true,"job category is required"]
    },
    country:{
        type:String,
        required:[true,"job country is required"]
    },
   city:{
        type:String,
        required:[true,"job city is required"]
    },
    location:{
        type:String,
        required:[true,"please provide exact location"],
        minLength:[10,"job location must contain atleast 10 characters"]
    },
    fixedSalary:{
        type:Number,
        minLength:[4,"fixed salary must contain atleast 4 digits"],
        maxLength:[9,"fixed salary must not exceed 9 digits"]
    },
    salaryFrom:{
        type:Number,
        minLength:[4,"salary form  must contain atleast 4 digits"],
        maxLength:[9,"salary from must not exceed 9 digits"]
    },
    salaryTo:{
        type:Number,
        minLength:[4,"salaryTo must contain atleast 4 digits"],
        maxLength:[9,"salaryTo must not exceed 9 digits"]
    },
    expired:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },


})

export const Job=mongoose.model("job ",jobSchema)