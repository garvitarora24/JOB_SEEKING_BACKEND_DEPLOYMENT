import express from "express"
import {getAllJobs, getMyJobs, postJob,updateJob,deleteJob, getSingleJob} from "../controllers/jobController.js"
import {isAuthorized} from "../middlewares/auth.js"

const router=express.Router();

router.get("/getall",getAllJobs)
router.post("/post",isAuthorized,postJob)
router.get("/getmyjobs",isAuthorized,getMyJobs)
router.put("/updatejob/:id",isAuthorized,updateJob)
router.delete("/deletejob/:id",isAuthorized,deleteJob)
router.get("/:id",isAuthorized,getSingleJob)
export default router;