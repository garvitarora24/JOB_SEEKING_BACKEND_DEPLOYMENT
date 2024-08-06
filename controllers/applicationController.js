import { catchAsyncError } from "../middlewares/catchAsyncerror.js"
import ErrorHandler from "../middlewares/error.js"
import { Application } from "../models/applicationSchema.js";
import {Job} from "../models/jobSchema.js"
import cloudnary from "cloudinary"

export const employeerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job seeker") {
        return next(new ErrorHandler("job seeker is not allowed to access this resources", 400))
    }
    const { id } = req.params;

    const { _id } = req.user;
    const applications = await Application.find({ "employerID.user": _id })
    res.status(200).json({
        sucess: true,
        applications
    })
})


export const jobSeekerGetAllApplications = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employeer") {
        return next(new ErrorHandler("employeer is not allowed to access this resources", 400))
    }
    const { id } = req.params;

    const { _id } = req.user;
    const applications = await Application.find({ "applicantID.user": _id })
    res.status(200).json({
        sucess: true,
        applications
    })
})


export const jobSeekerDeleteApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employeer") {
        return next(new ErrorHandler("employeer is not allowed to access this resources", 400))
    }
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
        return next(new ErrorHandler("Oops,application not found", 404));

    }
    await application.deleteOne();
    res.status(200).json({
        success: true,
        message: "application deleted succesfully"
    })
})

export const postApplication = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Employeer") {
        return next(new ErrorHandler("employeer is not allowed to access this resources", 400))
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("resume file required"))
    }
    const { resume } = req.files;
    // const {name}=req.body;
    const allowedFormats = ["image/png", "image/jpg", "image/webp"];
    if (!allowedFormats.includes(resume.mimetype)) {
        return next(new ErrorHandler("invalid file type. please upload a png ,jpg or webp format"), 400)
    }
    const cloudinaryResponse = await cloudnary.uploader.upload(
        resume.tempFilePath
    );

    // console.log(cloudinaryResponse)

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("cloudinary error ", cloudinaryResponse.err || "unknown cloudinary error");
        return next(new ErrorHandler("failed to upload resume", 500))
    }
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    const applicantID = {
        user: req.user._id,
        role: "Job seeker"
    }
    if (!jobId) {
        return next(new ErrorHandler("job not found", 400));
    }

    const jobdetails = await Job.findById(jobId);
    if (!jobdetails) {
        return next(new ErrorHandler("job not found", 404))
    }
    const employerID = {
        user: jobdetails.postedBy,
        role: "Employeer",
    }

    if (!name || !email || !coverLetter || !phone || !address || !resume || !applicantID  || !employerID) {
        return next(new ErrorHandler("please fill all fields", 400));
    }

    const application = await Application.create({
        name, email, coverLetter, phone, address, applicantID, employerID,
        resume: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).send({
        sucess:"true",
        message:"application submitted",
        application,
    });




})