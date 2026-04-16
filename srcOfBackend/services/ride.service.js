import * as rideRepository from "../repositories/ride.repository.js"

export const getAllRides = async () => {
  const rides = await rideRepository.getAllRides()
  return rides
}

export const getRideById = async (id) => {
  const ride = await rideRepository.getRideById(id)
  return ride
}

