import express from "express"
const router = express.Router()
import * as bookingController from "../controllers/booking.controller.js"

router.get("/", bookingController.getAllBookings)
router.get("/:id", bookingController.getBookingById)
router.post("/users/:userId", bookingController.createBooking)
router.put("/users/:userId/rides/:rideId", bookingController.updateBooking)
router.delete("/users/:userId/rides/:rideId", bookingController.deleteBooking)

export default router