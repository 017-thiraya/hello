import * as bookingService from "../services/booking.service.js"

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings()
    return res.status(200).json(bookings)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id)
    if (!booking) return res.status(404).json({ message: "Booking not found" })
    return res.status(200).json(booking)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const createBooking = async (req, res) => {
  try {
    const { rideId, isFastPass, bookingDate } = req.body
    const userId = parseInt(req.params.userId)
    if (!rideId || !bookingDate) {
      return res.status(400).json({ message: "missing required fields" })
    }
    const booking = await bookingService.createBooking({
      userId,
      rideId,
      isFastPass,
      bookingDate
    })
    return res.status(201).json(booking)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export const updateBooking = async (req, res) => {
  try {
    const { groupId, userId, rideId } = req.params
    const { bookingDate, isFastPass } = req.body
    
    if (!bookingDate && isFastPass === undefined) {
      return res.status(400).json({ message: "No data provided to update" })
    }

    const updatedData = await bookingService.updateUserBooking(
      parseInt(userId), 
      parseInt(rideId), 
      { visitDate: bookingDate, isFastPass }
    )

    return res.status(200).json({
      message: "Booking updated successfully",
      data: updatedData
    })
  } catch (err) {
    if (err.message.includes("not found")) {
      return res.status(404).json({ message: err.message })
    }
    return res.status(500).json({ message: err.message })
  }
}

export const deleteBooking = async (req, res) => {
  try {
    const { userId, rideId } = req.params;
    await bookingService.deleteBooking(userId, rideId);
    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
