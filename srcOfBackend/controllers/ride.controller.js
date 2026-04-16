import * as rideService from "../services/ride.service.js"

export const getAllRides = async (req, res) => {
  try {
    const rides = await rideService.getAllRides()
    return res.status(200).json(rides)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
export const getRideById = async (req, res) => {
  try {
    const ride = await rideService.getRideById(req.params.id)
    if (!ride) return res.status(404).json({ message: "Ride not found" })
    return res.status(200).json(ride)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}