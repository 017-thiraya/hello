import pool from "../config/db.js"

export const getAllRides = async () => {
  const result = await pool.query('SELECT * FROM "Rides"')
  return result.rows
}
export const getRideById = async (id) => {
  const result = await pool.query('SELECT * FROM "Rides" WHERE ride_id = $1', [id])
  return result.rows[0]
}
