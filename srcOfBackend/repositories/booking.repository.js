import pool from "../config/db.js"

export const getAllBookings = async () => {
  const result = await pool.query('SELECT * FROM "Booking"')
  return result.rows
}

export const getBookingById = async (id) => {
  const result = await pool.query('SELECT * FROM "Booking" WHERE booking_id = $1',[id])
  return result.rows[0]
}

export const getRideById = async (rideId) => {
  const result = await pool.query(
    `SELECT * FROM "Rides" WHERE ride_id = $1`,
    [rideId]
  )
  return result.rows[0]
}

export const createBooking = async ({ user_id, total_amount, visit_date }) => {
  const result = await pool.query(
    `INSERT INTO "Booking"
    (user_id, total_amount, booking_date, visit_date)
    VALUES ($1, $2, NOW(), $3)
    RETURNING *`,
    [user_id, total_amount, visit_date]
  )
  return result.rows[0]
}

export const createFastPass = async ({ booking_id, ride_id, fast_pass_price }) => {
  await pool.query(
    `INSERT INTO "FastPass"
    (booking_id, ride_id, fast_pass_price)
    VALUES ($1, $2, $3)`,
    [booking_id, ride_id, fast_pass_price]
  )
}

export const findActiveBookingByUser = async (userId) => {
    const result = await pool.query(
      `SELECT * FROM "Booking" 
       WHERE user_id = $1 AND status != 'cancelled' 
       ORDER BY booking_date DESC LIMIT 1`, 
      [userId]
    )
    return result.rows[0]
  }
  
  export const updateBookingWithTransaction = async (bookingId, rideId, updateData) => {
    const client = await pool.connect()
    
    try {
      await client.query('BEGIN') 
  
      if (updateData.visitDate) {
        await client.query(
          `UPDATE "Booking" SET visit_date = $1, updated_at = NOW() WHERE booking_id = $2`,
          [updateData.visitDate, bookingId]
        )
      }
  
      if (updateData.isFastPass !== undefined) {
        const rideRes = await client.query(`SELECT fast_pass_price FROM "Rides" WHERE ride_id = $1`, [rideId])
        if (rideRes.rows.length === 0) throw new Error("Ride not found")
        
        const fastPassPrice = rideRes.rows[0].fast_pass_price
  
        if (updateData.isFastPass === false) {
          const deleteRes = await client.query(
            `DELETE FROM "FastPass" WHERE booking_id = $1 AND ride_id = $2 RETURNING *`,
            [bookingId, rideId]
          )
          if (deleteRes.rowCount > 0) {
            await client.query(
              `UPDATE "Booking" SET total_amount = total_amount - $1, updated_at = NOW() WHERE booking_id = $2`,
              [fastPassPrice, bookingId]
            )
          }
        } 
        
        else if (updateData.isFastPass === true) {
          const checkExist = await client.query(
            `SELECT 1 FROM "FastPass" WHERE booking_id = $1 AND ride_id = $2`,
            [bookingId, rideId]
          )
          
          if (checkExist.rowCount === 0) {
            await client.query(
              `INSERT INTO "FastPass" (booking_id, ride_id, fast_pass_price) VALUES ($1, $2, $3)`,
              [bookingId, rideId, fastPassPrice]
            )
            await client.query(
              `UPDATE "Booking" SET total_amount = total_amount + $1, updated_at = NOW() WHERE booking_id = $2`,
              [fastPassPrice, bookingId]
            )
          }
        }
      }
  
      await client.query('COMMIT') 
      
      const updatedBooking = await client.query(`SELECT * FROM "Booking" WHERE booking_id = $1`, [bookingId])
      return updatedBooking.rows[0]
  
    } catch (error) {
      await client.query('ROLLBACK') 
      throw error
    } finally {
      client.release() 
    }
  }

  export const deleteBooking = async (userId, rideId) => {
  const result = await pool.query(
    `DELETE FROM "Booking"
     WHERE booking_id IN (
       SELECT b.booking_id
       FROM "Booking" b
       JOIN "FastPass" f ON b.booking_id = f.booking_id
       WHERE b.user_id = $1 AND f.ride_id = $2
     ) RETURNING *`,
     [userId, rideId]
  )
  return result.rowCount
}