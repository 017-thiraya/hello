import * as bookingRepository from "../repositories/booking.repository.js"

export const getAllBookings = async () => {
  const bookings = await bookingRepository.getAllBookings()
  return bookings
}

export const getBookingById = async (id) => {
  const booking = await bookingRepository.getBookingById(id)
  return booking
}

export const createBooking = async ({ userId, rideId, isFastPass, bookingDate }) => {
  const ride = await bookingRepository.getRideById(rideId)
  if (!ride) throw new Error("ride not found")
  let totalAmount = Number(ride.price)
  if (isFastPass) {
    totalAmount += Number(ride.fast_pass_price)
  }
  const booking = await bookingRepository.createBooking({
    user_id: userId,
    total_amount: totalAmount,
    visit_date: bookingDate
  })
  if (isFastPass) {
    await bookingRepository.createFastPass({
      booking_id: booking.booking_id,
      ride_id: rideId,
      fast_pass_price: ride.fast_pass_price
    })
  }
  return booking
}

export const updateUserBooking = async (userId, rideId, updateData) => {
  const booking = await bookingRepository.findActiveBookingByUser(userId)
  if (!booking) throw new Error("Active booking not found for this user")

  const result = await bookingRepository.updateBookingWithTransaction(
    booking.booking_id, 
    rideId, 
    updateData
  )

  return result
}

export const deleteBooking = async (userId, rideId) => {
  return await bookingRepository.deleteBooking(userId, rideId)
}