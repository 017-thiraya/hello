import express from "express";
import cors from 'cors';
import rideRouter from "./routes/ride.route.js";
import bookingRouter from "./routes/booking.route.js"
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/groups/:groupId/rides", rideRouter);

app.use("/api/groups/:groupId/bookings", bookingRouter)

export default app;