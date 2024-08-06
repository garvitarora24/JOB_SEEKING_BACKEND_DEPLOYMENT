import express from "express"
import {employeerGetAllApplications,jobSeekerDeleteApplication,jobSeekerGetAllApplications,
    postApplication} from "../controllers/applicationController.js"
import { isAuthorized } from "../middlewares/auth.js";


const router=express.Router();

router.get("/jobseeker/getall",isAuthorized,jobSeekerGetAllApplications);
router.get("/employeer/getall",isAuthorized,employeerGetAllApplications)
router.delete("/delete/:id",isAuthorized,jobSeekerDeleteApplication)
router.post("/post",isAuthorized,postApplication)
export default router;