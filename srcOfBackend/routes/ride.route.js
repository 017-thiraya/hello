import express from "express"
const router = express.Router()
import * as rideController from "../controllers/ride.controller.js"

router.get("/", rideController.getAllRides)
router.get("/:id", rideController.getRideById)

export default router